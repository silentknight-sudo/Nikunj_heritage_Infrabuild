/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  MapPin,
  Compass,
  Award,
  Calendar,
  Layers,
  FileCheck,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  HelpCircle,
  Clock,
  Sparkles,
  PlayCircle,
  FileText,
  Download
} from "lucide-react";
import { getPropertyBySlug, createLead } from "../lib/firestore";
import { Property } from "../types";
import { formatPrice } from "../lib/utils";
import { toast } from "react-hot-toast";
import { getPropertyMedia } from "../content/projectMedia";
import { SeoHead } from "../components/seo/SeoHead";
import { SITE_URL } from "../lib/seo";

export const PropertyDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  // Form Lead Submission States
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadNote, setLeadNote] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);

  useEffect(() => {
    async function fetchProperty() {
      if (!slug) return;
      setLoading(true);
      try {
        const item = await getPropertyBySlug(slug);
        if (item) {
          setProperty(item);
        } else {
          toast.error("Property not found in directory.");
        }
      } catch (err) {
        console.error("Property details fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProperty();
  }, [slug]);

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone) {
      toast.error("Pranam! Please provide at least your Name and Phone.");
      return;
    }
    setIsSubmiting(true);
    try {
      await createLead({
        name: leadName,
        phone: leadPhone,
        email: leadEmail || "no-email@nikunj.com",
        propertyType: property?.bhk || "Property Spec Inquiry",
        locationInterest: property?.title || "Nikunj Asset",
        message: leadNote || `Interested in property: ${property?.title}`,
        preferredCallback: "Within 2 Hours",
        sourceUrl: window.location.href
      });

      toast.success("Enquiry registered! Our Brijbhoomi guide will reach out to you within 2 hours.");
      setLeadName("");
      setLeadPhone("");
      setLeadEmail("");
      setLeadNote("");
    } catch (err) {
      toast.error("Submit failed. Please use WhatsApp for instant booking.");
    } finally {
      setIsSubmiting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#FAF6F0] min-h-screen py-20 flex flex-col items-center justify-center">
        <div className="animate-spin h-8 w-8 text-[#C45C1A] border-4 border-[#C45C1A]/20 border-t-[#C45C1A] rounded-full"></div>
        <span className="font-serif text-[#6B1A2A] text-sm font-semibold mt-4">Loading divine property specs...</span>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="bg-[#FAF6F0] min-h-screen py-20 text-center flex flex-col items-center justify-center">
        <h2 className="font-serif text-3xl font-bold text-[#6B1A2A]">Asset Not Found</h2>
        <p className="text-slate-500 mt-2 max-w-sm font-sans text-sm">
          The requested heavenly site is not mapped or has been archived. Click below to view our entire portfolio catalog.
        </p>
        <Link to="/properties" className="mt-6 px-6 py-3 bg-[#C45C1A] text-white rounded font-serif shadow font-bold text-sm">
          Return to Portfolio
        </Link>
      </div>
    );
  }

  const mediaBundle = getPropertyMedia(property);

  return (
    <div className="bg-[#FAF6F0] min-h-screen text-[#1A1A2E] py-12" id={`property-details-view-${property.id}`}>
      <SeoHead
        title={property.seoTitle || `${property.title} | Property in Vrindavan & Mathura | Nikunj Heritage`}
        description={
          property.seoDescription ||
          `${property.title} by Nikunj Heritage Infrabuild. Explore pricing, area, location highlights, amenities, floor plans, and buyer guidance for this Vrindavan-Mathura property opportunity.`
        }
        pathname={`/properties/${property.slug}`}
        image={property.imageUrls?.[0] || `${SITE_URL}/og-cover.jpg`}
        keywords={[
          property.title,
          property.bhk,
          "Vrindavan property listing",
          "Mathura property detail",
          property.reraNumber || "RERA approved property",
        ]}
        type="article"
        schema={{
          "@context": "https://schema.org",
          "@type": "RealEstateListing",
          name: property.title,
          description: property.seoDescription || property.description,
          url: `${SITE_URL}/properties/${property.slug}`,
          image: property.imageUrls,
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb trails */}
        <div className="mb-6 text-xs text-slate-500 flex items-center space-x-1 font-mono">
          <Link to="/" className="hover:text-[#C45C1A]">HOME</Link>
          <span>/</span>
          <Link to="/properties" className="hover:text-[#C45C1A]">PROPERTIES</Link>
          <span>/</span>
          <span className="text-[#6B1A2A] font-bold line-clamp-1">{property.title.toUpperCase()}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Specs Left Area */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Header Titles block */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-1 text-[10px] font-bold font-mono tracking-wider bg-[#0E7B6C] text-white rounded uppercase shadow-sm">
                  {property.status}
                </span>
                {property.reraNumber && (
                  <span className="px-2.5 py-1 text-[10px] font-bold font-mono tracking-wider bg-amber-100 border border-amber-300 text-amber-800 rounded flex items-center space-x-1 shadow-sm">
                    <Award className="h-3.5 w-3.5 text-amber-600" />
                    <span>RERA APPROVED: {property.reraNumber}</span>
                  </span>
                )}
              </div>
              <h1 className="font-serif text-2xl sm:text-4xl text-[#6B1A2A] font-bold tracking-tight leading-tight">
                {property.title}
              </h1>
              <div className="flex items-center space-x-1.5 text-slate-500 mt-2 text-xs sm:text-sm">
                <MapPin className="h-4 w-4 text-[#C45C1A]" />
                <span>Dwarka to Brij Core Road, Vrindavan, Uttar Pradesh, India</span>
              </div>
            </div>

            {/* Slider / Image Showcase */}
            <div className="relative bg-black rounded-2xl overflow-hidden shadow-xl aspect-video max-h-[480px]">
              {property.imageUrls && property.imageUrls.length > 0 ? (
                <>
                  <img
                    src={property.imageUrls[activeImgIdx]}
                    alt={`${property.title} - View ${activeImgIdx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Slider controls arrow */}
                  {property.imageUrls.length > 1 && (
                    <>
                      <button
                        onClick={() => setActiveImgIdx(prev => (prev - 1 + property.imageUrls.length) % property.imageUrls.length)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/70 hover:bg-white text-slate-800 transition shadow"
                        aria-label="Previous view"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => setActiveImgIdx(prev => (prev + 1) % property.imageUrls.length)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/70 hover:bg-white text-slate-800 transition shadow"
                        aria-label="Next view"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}

                  {/* Indicators dots */}
                  {property.imageUrls.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/40 px-3 py-1.5 rounded-full flex space-x-1.5 z-10">
                      {property.imageUrls.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImgIdx(idx)}
                          className={`h-2.5 w-2.5 rounded-full transition-colors ${
                            idx === activeImgIdx ? "bg-[#C45C1A]" : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-900 text-[#C9A84C]">
                  <span>Celestial Sanctuary Visuals</span>
                </div>
              )}
            </div>

            {/* Key Grid Specifications */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4" id="essential-specifications-banner">
              <div className="bg-white border border-[#C9A84C]/25 p-4 rounded-xl text-center shadow-sm">
                <span className="block text-[10px] text-slate-400 font-mono uppercase">Asking Price</span>
                <span className="block font-serif text-base sm:text-lg font-bold text-[#6B1A2A] mt-1">{formatPrice(property.price)}</span>
              </div>
              <div className="bg-white border border-[#C9A84C]/25 p-4 rounded-xl text-center shadow-sm">
                <span className="block text-[10px] text-slate-400 font-mono uppercase">Carpet Area</span>
                <span className="block font-serif text-base sm:text-lg font-bold text-slate-800 mt-1">{property.area} Sq Ft</span>
              </div>
              <div className="bg-white border border-[#C9A84C]/25 p-4 rounded-xl text-center shadow-sm">
                <span className="block text-[10px] text-slate-400 font-mono uppercase">Configs</span>
                <span className="block font-serif text-base sm:text-lg font-bold text-slate-800 mt-1">{property.bhk}</span>
              </div>
              <div className="bg-white border border-[#C9A84C]/25 p-4 rounded-xl text-center shadow-sm">
                <span className="block text-[10px] text-slate-400 font-mono uppercase font-semibold">Vastu Facing</span>
                <span className="block font-serif text-base sm:text-lg font-bold text-[#0E7B6C] mt-1">{property.facing || "Northeast Divine"}</span>
              </div>
            </div>

            {/* Overview / Story Description with custom formatting */}
            <div className="bg-white p-6 rounded-2xl border border-[#C9A84C]/20 shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-xl text-[#6B1A2A] border-b border-[#C9A84C]/10 pb-2 flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-[#C9A84C]" />
                <span>Spiritual Asset Story</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans whitespace-pre-line">
                {property.description}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#C9A84C]/20 shadow-sm overflow-hidden">
              <div className="grid lg:grid-cols-2">
                <div className="p-6 sm:p-8">
                  <span className="text-[11px] uppercase tracking-[0.28em] text-[#C45C1A] font-bold">{mediaBundle.eyebrow}</span>
                  <h3 className="font-serif text-2xl text-[#6B1A2A] font-bold mt-3">{mediaBundle.title}</h3>
                  <p className="text-sm text-slate-600 mt-3 leading-relaxed">{mediaBundle.summary}</p>
                  {mediaBundle.contextNote && (
                    <div className="mt-4 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                      {mediaBundle.contextNote}
                    </div>
                  )}
                  <div className="space-y-2 mt-5">
                    {mediaBundle.highlights.map((item) => (
                      <div key={item} className="flex items-start gap-2 text-sm text-slate-700">
                        <CheckCircle className="h-4 w-4 mt-0.5 text-[#0E7B6C] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3 mt-6">
                    {mediaBundle.brochureUrl && (
                      <a href={mediaBundle.brochureUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#6B1A2A] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">
                        <FileText className="h-4 w-4" />
                        <span>Open Brochure</span>
                      </a>
                    )}
                    {mediaBundle.floorPlanUrl && (
                      <a href={mediaBundle.floorPlanUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/40 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#6B1A2A]">
                        <Download className="h-4 w-4" />
                        <span>Floor Plan PDF</span>
                      </a>
                    )}
                  </div>
                </div>
                <div className="bg-[#F6F0E7]">
                  <video
                    className="h-full w-full object-cover"
                    poster={mediaBundle.videoPoster}
                    controls
                    preload="metadata"
                  >
                    {mediaBundle.videoUrl && <source src={mediaBundle.videoUrl} type="video/mp4" />}
                  </video>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#C9A84C]/20 shadow-sm">
              <div className="flex items-center justify-between gap-4 mb-5">
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#6B1A2A]">
                    {mediaBundle.isThirdPartyReference ? "Reference Gallery" : "Project Gallery"}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    {mediaBundle.isThirdPartyReference
                      ? "This gallery is shown only as contextual reference media and should be used with explicit association."
                      : "Images sourced from the supplied PDFs and arranged by context."}
                  </p>
                </div>
                <PlayCircle className="h-6 w-6 text-[#C45C1A] shrink-0" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {mediaBundle.gallery.map((item) => (
                  <div key={item.title} className="rounded-2xl overflow-hidden border border-[#C9A84C]/15 bg-[#FCFAF6]">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-serif text-lg font-bold text-[#6B1A2A]">{item.title}</h4>
                      <p className="text-sm text-slate-500 mt-1">{item.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#C9A84C]/20 shadow-sm">
              <div className="flex items-center justify-between gap-4 mb-5">
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#6B1A2A]">
                    {mediaBundle.isThirdPartyReference ? "Reference Plans & Layout Sheets" : "Floor Plans & Layout Sheets"}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    {mediaBundle.isThirdPartyReference
                      ? "Keep these sheets under associated-project or market-reference context."
                      : "Useful for serious evaluation, not just visual browsing."}
                  </p>
                </div>
                {mediaBundle.sitePlanUrl && (
                  <a href={mediaBundle.sitePlanUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-wider text-[#C45C1A] underline underline-offset-4">
                    Open Layout PDF
                  </a>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {mediaBundle.floorPlans.map((plan) => (
                  <div key={plan.title} className="rounded-2xl overflow-hidden border border-[#C9A84C]/15 bg-[#FCFAF6]">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img src={plan.image} alt={plan.title} className="h-full w-full object-cover" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-serif text-base font-bold text-[#6B1A2A]">{plan.title}</h4>
                      <p className="text-sm text-slate-500 mt-1">{plan.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Architectural Floor Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-xl border border-[#C9A84C]/20">
                <h4 className="font-serif font-bold text-[#6B1A2E] text-base mb-3 border-b border-[#C9A84C]/10 pb-1 flex items-center space-x-1.5">
                  <Layers className="h-4 w-4 text-[#C45C1A]" />
                  <span>Technical Blueprint</span>
                </h4>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-2.5 font-mono">
                  <li className="flex justify-between">
                    <span>Possession Target:</span>
                    <span className="font-bold text-[#0E7B6C]">{property.possessionDate || "Immediate"}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Total Blocks:</span>
                    <span className="font-bold text-slate-800">Brij Tower Sector A-E</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Authorized Water:</span>
                    <span className="font-bold text-[#0E7B6C]">Sweet sweet ground water</span>
                  </li>
                </ul>
              </div>

              {/* Legal validation checks */}
              <div className="bg-white p-5 rounded-xl border border-[#C9A84C]/20">
                <h4 className="font-serif font-bold text-[#6B1A2E] text-base mb-3 border-b border-[#C9A84C]/10 pb-1 flex items-center space-x-1.5">
                  <FileCheck className="h-4 w-4 text-[#0E7B6C]" />
                  <span>Administrative Clearances</span>
                </h4>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-2.5">
                  <li className="flex justify-between items-center">
                    <span>Registry Papers verified:</span>
                    <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded font-bold text-[10px]">100% CLEAR</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Sewer Connection license:</span>
                    <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded font-bold text-[10px]">OBTAINED</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Bank Loan Affiliations:</span>
                    <span className="text-xs font-mono font-bold text-[#0E7B6C]">SBI, HDFC, ICICI Approved</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Shrines and Proximity Distances */}
            {property.landmarks && property.landmarks.length > 0 && (
              <div className="bg-white p-6 rounded-2xl border border-[#C9A84C]/20 shadow-sm">
                <h3 className="font-serif font-bold text-lg text-[#6B1A2A] mb-4 pb-2 border-b border-[#C9A84C]/10 flex items-center space-x-2">
                  <Compass className="h-5 w-5 text-[#0E7B6C]" />
                  <span>Proximity to Sacred Shrines (Parikrama Corridor)</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {property.landmarks.map((l, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-[#FAF6F0] px-4 py-3 rounded-lg border border-[#C9A84C]/10">
                      <div className="flex items-center space-x-2">
                        <span className="h-2 w-2 rounded-full bg-[#C45C1A]" />
                        <span className="text-xs sm:text-sm font-medium text-slate-800">{l.name}</span>
                      </div>
                      <span className="text-xs font-mono font-extrabold text-[#0E7B6C]">{l.distance}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Consultation Enquiry Form Sidebar Right */}
          <div className="lg:col-span-4" id="consultation-form-sidebar">
            <div className="bg-white border-2 border-[#C9A84C]/45 rounded-2xl p-6 shadow-xl sticky top-24 space-y-6">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#C45C1A] block font-mono">Brijbhoomi Desk</span>
                <h3 className="font-serif text-[#6B1A2A] text-xl font-bold mt-0.5">Secure This Sanctum</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Connect instantly with our representative to setup an exclusive VIP pilgrimage site visit.
                </p>
              </div>

              {/* Consultation submission form */}
              <form onSubmit={handleEnquirySubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 font-mono">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Acharya Sharma"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-200 outline-none focus:border-[#C45C1A] text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 font-mono">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g., +91 97199 20888"
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-200 outline-none focus:border-[#C45C1A] text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 font-mono">Email ID (Optional)</label>
                  <input
                    type="email"
                    placeholder="e.g., info@brijvas.com"
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-200 outline-none focus:border-[#C45C1A] text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 font-mono">Enquiry Note</label>
                  <textarea
                    rows={3}
                    placeholder="Ask about payment plans, car pick-ups, or Vastu direction custom plans..."
                    value={leadNote}
                    onChange={(e) => setLeadNote(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-200 outline-none resize-none focus:border-[#C45C1A] text-slate-800"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmiting}
                  className="w-full py-3 bg-[#6B1A2A] hover:bg-[#6B1A2A]/90 text-white font-bold rounded-lg text-xs tracking-wider uppercase shadow flex items-center justify-center font-serif"
                >
                  {isSubmiting ? "Signing entry..." : "Confirm Site Booking"}
                </button>
              </form>

              {/* Instant Alternate phone/chat paths */}
              <div className="pt-4 border-t border-slate-100 flex flex-col space-y-3">
                <a
                  href={`https://wa.me/919719920888?text=Pranam%21+I+would+like+to+inquire+about+${encodeURIComponent(property.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-[#0E7B6C] hover:bg-[#0E7B6C]/90 text-white rounded-lg text-center font-bold text-xs uppercase shadow transition-all flex items-center justify-center space-x-1.5"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>WhatsApp Inquiries</span>
                </a>

                {/* Local Helplines Details */}
                <div className="flex items-center space-x-2 text-xs text-slate-500 justify-center">
                  <Phone className="h-4 w-4 text-[#C45C1A]" />
                  <span>Advisory Hotline: +91 9719920888</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
export default PropertyDetail;
