/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sparkles,
  Search,
  ChevronRight,
  TrendingUp,
  MapPin,
  Compass,
  FileCheck,
  Award,
  Users,
  ShieldCheck,
  Calendar,
  Layers,
  CheckCircle,
  HelpCircle,
  FileText,
  PlayCircle,
  X,
  MessageSquare
} from "lucide-react";
import {
  getProperties,
  getCategories,
  getLocations,
  getBlogs,
  getTestimonials,
  getSiteConfig,
  createLead
} from "../lib/firestore";
import { Property, Category, Location, Blog, Testimonial, SiteConfig } from "../types";
import { formatPrice } from "../lib/utils";
import { ROICalculator } from "../components/home/ROICalculator";
import { PropertyCard } from "../components/property/PropertyCard";
import { toast } from "react-hot-toast";
import { HeroSlider } from "../components/home/HeroSlider";
import { ThreeDCard, ScrollFade, ParticleGlow, SacredPropertyBackdrop } from "../components/common/MotionWrapper";
import { homeMediaShowcase } from "../content/projectMedia";
import { SeoHead } from "../components/seo/SeoHead";
import { DEFAULT_OG_IMAGE, SITE_URL } from "../lib/seo";
import { motion } from "motion/react";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [config, setConfig] = useState<SiteConfig | null>(null);

  // States for search and newsletter
  const [searchQuery, setSearchQuery] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [consultationName, setConsultationName] = useState("");
  const [consultationPhone, setConsultationPhone] = useState("");
  const [enquiryType, setEnquiryType] = useState("Property Enquiry");
  const [consultationEmail, setConsultationEmail] = useState("");
  const [isConsulting, setIsConsulting] = useState(false);
  const [showEnquiryWidget, setShowEnquiryWidget] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const c = await getSiteConfig();
        setConfig(c);

        const cats = await getCategories();
        setCategories(cats);

        const locs = await getLocations();
        setLocations(locs);

        const props = await getProperties();
        setProperties(props);

        const blgs = await getBlogs();
        setBlogs(blgs.slice(0, 3)); // show top 3

        const tst = await getTestimonials();
        setTestimonials(tst.filter(t => t.approved));
      } catch (err) {
        console.error("Home page data loading error:", err);
      }
    }
    loadData();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/properties?search=${searchQuery}`);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    toast.success("Pranam! Thank you for subscribing to our Brijbhoomi newsletter.");
    setNewsletterEmail("");
  };

  const handleConsultationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultationName || !consultationPhone) {
      toast.error("Please enter both Name and Phone.");
      return;
    }
    setIsConsulting(true);
    try {
      await createLead({
        name: consultationName,
        phone: consultationPhone,
        email: consultationEmail || "guest-callback@nikunj.com",
        locationInterest: "Vrindavan / Mathura Core Belt",
        propertyType: enquiryType,
        message: `Unified Enquiry Submission: ${enquiryType}. Safe routing active.`,
        preferredCallback: "As soon as possible",
        sourceUrl: window.location.href
      });
      toast.success(`Callback request submitted for ${enquiryType}! Our advisor will contact you shortly.`);
      setConsultationName("");
      setConsultationPhone("");
      setConsultationEmail("");
      setEnquiryType("Property Enquiry");
    } catch (err) {
      toast.error("Consultation submit failed. Please try WhatsApp.");
    } finally {
      setIsConsulting(false);
    }
  };

  const featuredProperties = properties.filter(p => p.featured || p.newLaunch).slice(0, 3);

  const marketHighlights = [
    { label: "Verified Braj Listings", value: `${properties.length || 24}+`, icon: Layers, tone: "from-[#0F6E56] to-[#0F172A]" },
    { label: "Active Buyer Enquiries", value: "1,200+", icon: Users, tone: "from-[#FB923C] to-[#C45C1A]" },
    { label: "Temple Proximity Audits", value: "100%", icon: ShieldCheck, tone: "from-[#6B1A2A] to-[#1A1A2E]" },
    { label: "Site Visit Support", value: "24/7", icon: Calendar, tone: "from-[#C9A84C] to-[#C45C1A]" }
  ];

  const advisoryJourney = [
    "Search by temple, budget, location and property type",
    "Compare verified listings, floor plans, documents and RERA details",
    "Book guided Mathura-Vrindavan site visit with advisor support",
    "Complete registry, possession and post-sale support"
  ];

  const quickActionPanels = [
    {
      title: "Continue Property Search",
      text: "Resume browsing flats, plots, villas and commercial spaces across Mathura-Vrindavan.",
      cta: "Explore Listings",
      href: "/properties",
      icon: Search
    },
    {
      title: "Saved Shortlist",
      text: "Keep your favourite opportunities ready before speaking to our advisory team.",
      cta: "View Wishlist",
      href: "/properties",
      icon: CheckCircle
    },
    {
      title: "Compare Options",
      text: "Compare budget, area, temple proximity, RERA status and possession readiness.",
      cta: "Compare Now",
      href: "/compare-properties",
      icon: Layers
    }
  ];

  const propertyIntentCards = [
    {
      title: "Residential",
      subtitle: "Flats, villas and family homes near devotional neighbourhoods.",
      href: "/properties?category=residential-apartments",
      image: "/projects/images/ai-buyer-residential.jpg"
    },
    {
      title: "Commercial",
      subtitle: "Shops, office frontage and investor-grade business pockets.",
      href: "/properties?category=commercial-spaces",
      image: "/projects/images/ai-buyer-commercial.jpg"
    },
    {
      title: "Plots & Land",
      subtitle: "Registry-ready plotted opportunities around growth corridors.",
      href: "/properties?category=plots-and-land",
      image: "/projects/images/ai-buyer-plots-land.jpg"
    },
    {
      title: "Spiritual Retreats",
      subtitle: "Second-home and ashram-style living near temples and ghats.",
      href: "/properties?category=spiritual-retreats",
      image: "/projects/images/ai-buyer-spiritual-retreat.jpg"
    }
  ];

  const marketRows = [
    "Rukmini Vihar residential demand near Prem Mandir and ISKCON",
    "Mathura-Vrindavan Road commercial visibility and highway access",
    "Govardhan and Barsana spiritual second-home demand",
    "Verified registry, RERA and possession support for outstation buyers"
  ];

  const faqItems = [
    {
      question: "Is Nikunj Heritage a property portal or advisory company?",
      answer: "Nikunj Heritage Infrabuild is positioned as a local Mathura-Vrindavan real estate advisory and infrabuild brand, helping buyers shortlist verified residential, commercial and plotted opportunities."
    },
    {
      question: "Can I compare Vrindavan properties before visiting?",
      answer: "Yes. You can use the property listing and compare flow to evaluate budget, area, location, temple proximity, amenities and documentation before booking a guided site visit."
    },
    {
      question: "Which locations are important for investment?",
      answer: "Important buyer zones include Rukmini Vihar, Prem Mandir belt, Banke Bihari access zones, Mathura-Vrindavan Road, Govardhan corridor and selected commercial pockets in Mathura."
    },
    {
      question: "How do I book a site visit?",
      answer: "Use the enquiry form, call button or WhatsApp CTA. The team can coordinate a personal consultation and guided local visit across shortlisted properties."
    }
  ];

  // Hardcoded Static Why Choose Us values as fallback/compliment to match guidelines
  const whyChooseUsCards = [
    {
      title: "Sacred Authenticity",
      text: "Every asset is scrutinized to verify proximity metrics directly with traditional Braj hills, temples, and rivers.",
      icon: Compass
    },
    {
      title: "100% RERA Clearance",
      text: "We only promote assets satisfying complete regulatory compliances under active UP RERA licenses.",
      icon: FileCheck
    },
    {
      title: "Direct Builder Terms",
      text: "Zero backdoor broker markups. Rest easy with pristine transparent pricing and clean title deeds.",
      icon: Award
    },
    {
      title: "Divine Temple Proximity",
      text: "Villas and apartments positioned elegant steps away from Prem Mandir, Banke Bihari, and ISKCON Vrindavan.",
      icon: MapPin
    },
    {
      title: "Seamless Registration",
      text: "We guide you from initial title searches directly through complete local registry execution handovers.",
      icon: ShieldCheck
    },
    {
      title: "24/7 Brijbhoomi Desk",
      text: "Our dedicated guides belong here in Mathura & Vrindavan, guaranteeing round-the-clock ground assistance.",
      icon: Users
    }
  ];

  const timelineSteps = [
    { title: "Sacred Intention", desc: "Share your specific budget and desired vicinity near sacred temple roots with our guides." },
    { title: "Curated Matching", desc: "Receive customized haveli villa proposals or flats fitting your specific parikrama aspirations." },
    { title: "Shrines Proximity Assessment", desc: "We evaluate real walking distances directly to major shrines, Yamuna ghats, and access gates." },
    { title: "UPRERA Audits", desc: "Rest assured that all legal paperwork, master deeds, and registries satisfy complete security validations." },
    { title: "Guided Brijvas Visits", desc: "Experience vip-style, completely free personal site visits guided by local Mathura/Vrindavan natives." },
    { title: "Hassle-Free Registry Handovers", desc: "We manage complete land registry (Dastawez) filings with Zero administrative friction." },
    { title: "Griha Pravesh Bliss", desc: "Celebrate stepping into your divine retreat with traditional sacred sweets and priest arrangements." }
  ];

    return (
    <div className="relative min-h-screen overflow-hidden bg-[color:var(--brand-sandstone)] text-[color:var(--brand-night)]" id="homepage-container">
      <SeoHead
        title="Nikunj Heritage Infrabuild | Property in Vrindavan, Mathura & Braj Investment Opportunities"
        description="Explore verified residential apartments, luxury villas, commercial spaces, and plotted developments in Vrindavan and Mathura with Nikunj Heritage Infrabuild."
        pathname="/"
        image={DEFAULT_OG_IMAGE}
        keywords={[
          "property in Vrindavan",
          "Vrindavan real estate investment",
          "Mathura property dealer",
          "Rukmini Vihar property",
          "commercial property Mathura",
        ]}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": `${SITE_URL}/#organization`,
            name: "Nikunj Heritage Infrabuild",
            url: SITE_URL,
            logo: `${SITE_URL}/logo.svg`,
            image: `${SITE_URL}/logo.svg`,
            telephone: "+91-9719920888",
            email: "info@nikunjheritageinfrabuild.com",
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            url: SITE_URL,
            name: "Nikunj Heritage Infrabuild",
            publisher: {
              "@id": `${SITE_URL}/#organization`,
            },
            potentialAction: {
              "@type": "SearchAction",
              target: `${SITE_URL}/properties?search={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            "@id": `${SITE_URL}/#real-estate`,
            name: "Nikunj Heritage Infrabuild",
            url: SITE_URL,
            logo: `${SITE_URL}/logo.svg`,
            image: DEFAULT_OG_IMAGE,
            telephone: "+91-9719920888",
            email: "info@nikunjheritageinfrabuild.com",
            address: {
              "@type": "PostalAddress",
              streetAddress: "21/s3, Sec-3 Rukmani Vihar",
              addressLocality: "Vrindavan",
              addressRegion: "Uttar Pradesh",
              postalCode: "281121",
              addressCountry: "IN",
            },
            areaServed: ["Vrindavan", "Mathura", "Govardhan", "Barsana"],
          },
        ]}
      />
      <SacredPropertyBackdrop />
      <div className="relative z-10">
      {showEnquiryWidget ? (
          <div className="fixed left-3 right-3 top-[4.75rem] z-50 sm:left-auto sm:right-4 sm:top-20 sm:w-[calc(100vw-2rem)] sm:max-w-sm">
          <div className="overflow-hidden rounded-2xl border border-[color:var(--brand-border)] bg-white/95 shadow-2xl backdrop-blur-md">
            <div className="flex items-start justify-between gap-3 bg-[color:var(--brand-night)] px-4 py-3 text-white sm:px-5 sm:py-4">
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-[0.28em] text-[color:var(--brand-gold)]">Instant Enquiry</span>
                <h2 className="mt-1 font-serif text-lg font-bold text-[color:var(--brand-saffron)]">
                  Book Callback On Opening
                </h2>
                <p className="text-xs text-white/80 mt-1">Website khulte hi enquiry visible rahegi aur page scroll bhi normal chalega.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowEnquiryWidget(false)}
                className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
                aria-label="Close enquiry widget"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleConsultationSubmit} className="max-h-[calc(100svh-14rem)] space-y-3 overflow-y-auto p-4 sm:max-h-none sm:p-5">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 font-mono">Enquiry Type</label>
                <select
                  value={enquiryType}
                  onChange={(e) => setEnquiryType(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-800 outline-none focus:border-[color:var(--brand-saffron)]"
                >
                  <option>Property Enquiry</option>
                  <option>Site Visit</option>
                  <option>Commercial Space</option>
                  <option>Plots & Land</option>
                  <option>Investment Consultation</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 font-mono">Full Name</label>
                <input
                  type="text"
                  value={consultationName}
                  onChange={(e) => setConsultationName(e.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-xs text-slate-800 outline-none focus:border-[color:var(--brand-saffron)]"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 font-mono">Phone Number</label>
                <input
                  type="tel"
                  value={consultationPhone}
                  onChange={(e) => setConsultationPhone(e.target.value)}
                  placeholder="+91..."
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-xs text-slate-800 outline-none focus:border-[color:var(--brand-saffron)]"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 font-mono">Email</label>
                <input
                  type="email"
                  value={consultationEmail}
                  onChange={(e) => setConsultationEmail(e.target.value)}
                  placeholder="Optional"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-xs text-slate-800 outline-none focus:border-[color:var(--brand-saffron)]"
                />
              </div>
              <button
                type="submit"
                disabled={isConsulting}
                className="w-full rounded-lg bg-[color:var(--brand-saffron)] px-4 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:opacity-95"
              >
                {isConsulting ? "Submitting..." : "Request Callback"}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowEnquiryWidget(true)}
          className="fixed right-4 bottom-24 z-50 inline-flex items-center gap-2 rounded-full bg-[#FB923C] px-4 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-xl hover:bg-[#EA580C] transition-colors sm:bottom-6"
        >
          <MessageSquare className="h-4 w-4" />
          <span>Open Enquiry</span>
        </button>
      )}

      
      {/* 1. HERO SLIDER IMMERSIVE EXPERIENCE */}
      <div className="relative pb-24 sm:pb-0" id="immersive-hero-slider-container">
        <HeroSlider />
        
        {/* Floating Overlapping Search Bar with 3D Depth */}
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 z-30 w-full max-w-2xl px-4 pointer-events-auto sm:-bottom-7 sm:w-[95%]">
          <form onSubmit={handleSearchSubmit} className="flex flex-col gap-2.5 rounded-xl border border-[color:var(--brand-border)] bg-white p-2.5 shadow-2xl transition-all duration-300 hover:shadow-[0_20px_45px_rgba(11,16,48,0.12)] sm:flex-row">
            <div className="flex-grow flex items-center px-3 gap-2 border-b sm:border-b-0 sm:border-r border-slate-200 pb-2 sm:pb-0">
              <Search className="h-5 w-5 shrink-0 text-[color:var(--brand-saffron)]" />
              <input
                type="text"
                placeholder="Search flats near Prem Mandir, plots in Govardhan..."
                value={searchQuery}
                aria-label="Property Search Field"
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 text-sm py-1 font-sans focus:ring-0"
              />
            </div>
            <button
              type="submit"
              className="flex shrink-0 items-center justify-center space-x-1.5 rounded-lg bg-[color:var(--brand-saffron)] px-6 py-3 font-serif text-xs font-bold text-white transition-all hover:opacity-95 sm:text-sm"
            >
              <span>Explore Assets</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Wealth-style trust cockpit: search, proof and advisory journey */}
      <section className="relative z-10 px-4 pb-6 pt-2 sm:pt-8" id="wealth-style-trust-cockpit">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.21, 0.85, 0.45, 1.01] }}
            className="lg:col-span-8 rounded-[28px] border border-[#EAD9C0] bg-white/90 p-5 shadow-2xl shadow-[#6B1A2A]/5 backdrop-blur-xl sm:p-7"
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <span className="text-[11px] font-black uppercase tracking-[0.28em]" style={{ color: "var(--brand-gold)" }}>Braj Property Command Center</span>
                <h2 className="mt-2 font-serif text-2xl font-black leading-tight sm:text-3xl" style={{ color: "var(--brand-night)" }}>
                  Find, compare and visit verified Mathura-Vrindavan opportunities faster.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                  Built for serious buyers of Mathura and Vrindavan property with temple-proximity filters, registry clarity, and local advisory support.
                </p>
              </div>
              <Link
                to="/compare-properties"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[color:var(--brand-night)] px-5 py-3 text-xs font-black uppercase tracking-wider text-white transition-all hover:-translate-y-0.5 hover:opacity-95"
              >
                Compare Now
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {marketHighlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.08 }}
                    className="group overflow-hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${item.tone} text-white shadow-lg`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="font-serif text-2xl font-black text-[#0F172A]">{item.value}</div>
                    <div className="mt-1 text-[11px] font-bold uppercase tracking-wider text-slate-500">{item.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.21, 0.85, 0.45, 1.01] }}
            className="lg:col-span-4 rounded-[28px] bg-[color:var(--brand-night)] p-5 text-white shadow-2xl shadow-[#0F172A]/20 sm:p-7"
          >
            <span className="text-[11px] font-black uppercase tracking-[0.28em] text-[#FACC15]">Buyer Flow</span>
            <h3 className="mt-2 font-serif text-2xl font-black">From online search to site visit</h3>
            <div className="mt-6 space-y-4">
              {advisoryJourney.map((step, index) => (
                <div key={step} className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#FACC15]/40 bg-white/10 text-xs font-black text-[#FACC15]">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-6 text-white/80">{step}</p>
                </div>
              ))}
            </div>
            <Link
              to="/contact-us"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FB923C] px-5 py-3 text-xs font-black uppercase tracking-wider text-white transition-all hover:bg-[#EA580C]"
            >
              Book Free Advisory
              <ChevronRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 px-4 py-8" id="wealth-style-quick-actions">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-3">
          {quickActionPanels.map((panel, index) => {
            const Icon = panel.icon;
            return (
              <motion.div
                key={panel.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="group rounded-3xl border border-[color:var(--brand-border)] bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-[rgba(11,16,48,0.1)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[color:var(--brand-saffron)]/10 text-[color:var(--brand-saffron)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <Link to={panel.href} className="text-xs font-black uppercase tracking-wider" style={{ color: "var(--brand-saffron)" }}>
                    {panel.cta}
                  </Link>
                </div>
                <h3 className="mt-5 font-serif text-xl font-black text-[color:var(--brand-night)]">{panel.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{panel.text}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="relative z-10 px-4 py-8" id="wealth-style-property-intent">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-[11px] font-black uppercase tracking-[0.28em]" style={{ color: "var(--brand-saffron)" }}>Choose Property Type</span>
              <h2 className="mt-2 font-serif text-3xl font-black text-[color:var(--brand-night)] sm:text-4xl">Explore by buyer intent</h2>
            </div>
            <Link to="/properties" className="inline-flex w-fit items-center gap-2 rounded-full bg-[color:var(--brand-night)] px-5 py-3 text-xs font-black uppercase tracking-wider text-white">
              View All Properties
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {propertyIntentCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
              >
                  <Link to={card.href} className="group block overflow-hidden rounded-[28px] bg-[color:var(--brand-night)] shadow-xl shadow-[#0F172A]/10">
                  <div className="relative h-56 overflow-hidden">
                    <img src={card.image} alt={card.title} className="h-full w-full object-cover opacity-75 transition-transform duration-700 group-hover:scale-110" onError={(event) => { event.currentTarget.src = "/projects/images/ai-buyer-residential.jpg"; }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--brand-night)] via-[color:var(--brand-night)]/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                      <h3 className="font-serif text-2xl font-black">{card.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-white/80">{card.subtitle}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC CATEGORIES GRID */}
      <section className="py-10 sm:py-16 px-4 max-w-7xl mx-auto scroll-mt-20" id="categories-grid-section">
        <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-[11px] uppercase tracking-widest font-bold font-mono" style={{ color: "var(--brand-saffron)" }}>Select Your Vibe</span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold mt-1 shadow-sm" style={{ color: "var(--brand-night)" }}>
            Property categories for Mathura and Vrindavan buyers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-xl mx-auto leading-relaxed">
            Browse residential, commercial, and spiritual retreat opportunities with the context buyers actually ask for.
          </p>
        </div>

        {categories.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-32 bg-slate-300 animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (
          <ScrollFade direction="up">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
              {categories.map((cat) => (
                <ThreeDCard key={cat.id} className="h-40">
                  <Link
                    to={`/properties?category=${cat.slug}`}
                    className="group relative h-full w-full rounded-xl overflow-hidden flex flex-col justify-end p-4 block"
                  >
                    <div className="absolute inset-0 bg-[#1A1A2E] z-0">
                      <img
                        src={cat.imageUrl}
                        alt={cat.name}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover opacity-65 group-hover:scale-110 transition-transform duration-500"
                        onError={(event) => { event.currentTarget.src = "/projects/images/ai-buyer-residential.jpg"; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E] via-[#1A1A2E]/40 to-transparent"></div>
                    </div>
                    <div className="relative z-10 text-left">
                      <span className="text-[10px] text-[color:var(--brand-gold)] font-mono font-semibold uppercase">{cat.slug.replace("-", " ")}</span>
                      <h3 className="font-serif font-bold text-sm sm:text-base tracking-wide leading-tight text-white">
                        {cat.name}
                      </h3>
                    </div>
                  </Link>
                </ThreeDCard>
              ))}
            </div>
          </ScrollFade>
        )}
      </section>

      {/* 3. BROCHURE + VIDEO STORYTELLING */}
      <section className="py-12 sm:py-16 px-4" id="brochure-media-section">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-[11px] font-black uppercase tracking-[0.28em]" style={{ color: "var(--brand-saffron)" }}>Why Vrindavan</span>
              <h2 className="mt-2 font-serif text-3xl font-black text-[#0F172A] sm:text-4xl">
                A destination-focused view of Vrindavan’s spiritual and investment momentum
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-600">
              Shortlist guidance for buyers comparing Mathura and Vrindavan properties, with temple access, trust signals, and a direct path to enquiry.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7 overflow-hidden rounded-[28px] border border-[#C9A84C]/20 bg-white shadow-sm">
              <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                <div className="relative min-h-[26rem] overflow-hidden bg-[#6B1A2A] text-white">
                  <img
                    src={homeMediaShowcase.overview.gallery[0].image}
                    alt={homeMediaShowcase.overview.gallery[0].title}
                    className="absolute inset-0 h-full w-full object-cover opacity-40"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/95 via-[#6B1A2A]/55 to-[#6B1A2A]/15" />
                  <div className="relative flex h-full flex-col justify-end p-6 sm:p-8">
                    <span className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--brand-gold)] font-bold">Market Lens</span>
                    <h3 className="mt-3 max-w-xl font-serif text-3xl font-black leading-tight text-white">
                      {homeMediaShowcase.overview.title}
                    </h3>
                    <p className="mt-4 max-w-xl text-sm leading-7 text-white/85">
                      {homeMediaShowcase.overview.summary}
                    </p>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {homeMediaShowcase.overview.highlights.map((item) => (
                        <div key={item} className="flex items-start gap-2 rounded-2xl border border-white/10 bg-white/10 p-3 text-sm text-white/90 backdrop-blur-sm">
                          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#F6D7A8]" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <a href={homeMediaShowcase.overview.brochureUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-wider text-[color:var(--brand-night)]">
                        <FileText className="h-4 w-4" />
                        <span>Open Docket</span>
                      </a>
                      <a href="/contact-us" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-black uppercase tracking-wider text-white">
                        <Layers className="h-4 w-4" />
                        <span>Request Consultation</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 bg-[#F8FAFC] p-5 sm:p-6">
                  <div className="rounded-[24px] border border-[#C9A84C]/20 bg-white p-5 shadow-sm">
                    <span className="text-[11px] font-black uppercase tracking-[0.28em] text-[#C45C1A]">Nikunj Promise</span>
                    <h3 className="mt-3 font-serif text-2xl font-black leading-tight text-[#0F172A]">
                      Company-first, buyer-first, and rooted in Braj context.
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      The homepage should speak about Nikunj Heritage, local market clarity, and serious buyer guidance before it speaks about any single asset.
                    </p>
                    <div className="mt-4 flex items-center gap-2 rounded-2xl bg-[#0F6E56]/10 px-4 py-3 text-sm font-semibold text-[#0F6E56]">
                      <Sparkles className="h-4 w-4 shrink-0" />
                      <span>Temple access, registry clarity, and investor confidence in one view.</span>
                    </div>
                    <a href="/about-us" className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-[color:var(--brand-saffron)] px-4 py-2 text-xs font-black uppercase tracking-wider text-white">
                      <PlayCircle className="h-4 w-4" />
                      <span>About Nikunj Heritage</span>
                    </a>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {homeMediaShowcase.overview.gallery.slice(1).map((plan) => (
                      <div key={plan.title} className="overflow-hidden rounded-[24px] border border-[#C9A84C]/15 bg-white shadow-sm">
                        <div className="aspect-[4/3] overflow-hidden bg-[#F6F0E7]">
                          <img src={plan.image} alt={plan.title} className="h-full w-full object-cover" />
                        </div>
                        <div className="p-4">
                          <h4 className="font-serif text-base font-bold text-[#6B1A2A]">{plan.title}</h4>
                          <p className="mt-1 text-sm text-slate-500">{plan.subtitle}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 grid gap-4">
              {homeMediaShowcase.overview.gallery.map((item, index) => (
                <div key={item.title} className="overflow-hidden rounded-[24px] border border-[#C9A84C]/15 bg-white shadow-sm">
                  <div className="grid grid-cols-[1.05fr_0.95fr]">
                    <div className="p-5 sm:p-6">
                      <div className="mb-3 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.28em] text-[#0E7B6C]">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#0E7B6C]/10 text-[11px]">{index + 1}</span>
                        <span>{index === 0 ? "Cover Story" : "Supporting Sheet"}</span>
                      </div>
                      <h3 className="font-serif text-2xl font-black leading-tight text-[color:var(--brand-night)]">{item.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{item.subtitle}</p>
                    </div>
                    <div className="min-h-[11rem] bg-[#F6F0E7]">
                      <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white px-4 py-14" id="wealth-style-right-property-guide">
        <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[#F8FAFC] lg:block" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -34 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <span className="text-[11px] font-black uppercase tracking-[0.28em]" style={{ color: "var(--brand-saffron)" }}>Find The Right Property</span>
            <h2 className="mt-3 font-serif text-3xl font-black leading-tight text-[color:var(--brand-night)] sm:text-5xl">
              Advisory-first buying for Mathura and Vrindavan.
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-600">
              The experience helps buyers move from search to shortlist to comparison. Every step is shaped around temple access, registry clarity, and local Braj market realities.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link to="/properties" className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--brand-saffron)] px-6 py-3 text-xs font-black uppercase tracking-wider text-white">
                Search Properties
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link to="/contact-us" className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--brand-border)] bg-white px-6 py-3 text-xs font-black uppercase tracking-wider text-[color:var(--brand-night)]">
                Talk To Advisor
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 34 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {marketRows.map((item, index) => (
                <div key={item} className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0F6E56]/10 text-[#0F6E56]">
                    {index + 1}
                  </div>
                  <p className="mt-4 text-sm font-semibold leading-7 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. DYNAMIC FEATURED ASSETS (CAROUSEL GRID) */}
      <section className="py-10 sm:py-16 bg-[#FAF6F0]/60 border-y border-[#C9A84C]/10 scroll-mt-20" id="featured-assets-sliders">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10">
            <div>
              <span className="text-[11px] uppercase tracking-widest text-[#C45C1A] font-bold font-mono">Premium Hand-Pick</span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#6B1A2A] font-bold mt-1">
                Featured Heritage Listings
              </h2>
            </div>
            <Link
              to="/properties?featured=true"
              className="mt-3 sm:mt-0 text-xs sm:text-sm font-semibold text-[#C45C1A] hover:text-[#6B1A2E] flex items-center space-x-1 underline underline-offset-4"
            >
              <span>View All Premium Properties</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {featuredProperties.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-72 bg-slate-300 animate-pulse rounded-lg" />
              ))}
            </div>
          ) : (
            <ScrollFade direction="up">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProperties.map((prop) => (
                  <PropertyCard key={prop.id} property={prop} />
                ))}
              </div>
            </ScrollFade>
          )}
        </div>
      </section>

      {/* 5. DYNAMIC LOCATIONS (AREAS GRID) */}
      <section className="py-10 sm:py-16 px-4 max-w-7xl mx-auto scroll-mt-20" id="locations-grid">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[11px] uppercase tracking-widest text-[#0E7B6C] font-bold font-mono">Pilgrim Corridors</span>
          <h2 className="font-serif text-2xl sm:text-4xl text-[#6B1A2A] font-bold mt-1">
            Properties by Divine Location
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-xl mx-auto">
            Choose your residence near historical landmarks including Banke Bihari Temple, Prem Mandir, Govardhan Parikrama or barsana hills.
          </p>
        </div>

        {locations.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-40 bg-slate-200 animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (
          <ScrollFade direction="up">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {locations.map((loc) => (
                <ThreeDCard key={loc.id} className="h-48">
                  <Link
                    to={`/properties?location=${loc.slug}`}
                    className="group relative h-full w-full rounded-xl overflow-hidden pb-4 px-4 flex flex-col justify-end block"
                  >
                    <div className="absolute inset-0 bg-[#1A1A2E] z-0">
                      <img
                        src={loc.imageUrl}
                        alt={loc.name}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-500"
                        onError={(event) => { event.currentTarget.src = "/projects/images/ai-buyer-plots-land.jpg"; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent"></div>
                    </div>
                    <div className="relative z-10 text-white text-left">
                      <span className="text-[9px] uppercase tracking-widest font-bold font-mono text-[#FDE68A]">
                        Region: {loc.city}
                      </span>
                      <h3
                        className="font-serif font-bold text-base sm:text-lg tracking-wide shadow-sm mt-0.5 line-clamp-1 text-white"
                        style={{ color: "#FFFFFF" }}
                      >
                        {loc.name}
                      </h3>
                      <p className="text-[11px] text-[#FEF3C7] line-clamp-2 mt-1 leading-snug">
                        {loc.description}
                      </p>
                    </div>
                  </Link>
                </ThreeDCard>
              ))}
            </div>
          </ScrollFade>
        )}
      </section>

      {/* 5. WHY CHOOSE US - CARDS SECTION */}
      <section className="py-12 sm:py-20 bg-[#1A1A2E] text-[#FAF6F0] border-t-2 border-[#C9A84C]/40 scroll-mt-20" id="why-choose-us-section">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
            <span className="text-[11px] uppercase tracking-widest text-[#C9A84C] font-bold font-mono">Brijvas Heritage Pledge</span>
            <h2 className="font-serif text-2xl sm:text-4xl text-white font-bold mt-1" style={{ color: "#FFFFFF" }}>
              Why Nikunj Heritage Infrabuild?
            </h2>
            <div className="h-0.5 w-16 bg-[#C45C1A] mx-auto mt-4"></div>
          </div>

          <ScrollFade direction="up">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyChooseUsCards.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <ThreeDCard key={idx} className="relative overflow-hidden h-full rounded-2xl">
                    <div className="relative bg-white/5 border border-[#FAF6F0]/10 p-6 rounded-2xl h-full flex items-start space-x-4">
                      {/* Aura Ambient particle glow that looks like glowing spiritual aura */}
                      <ParticleGlow color="#C9A84C" />
                      
                      <div className="p-3 bg-[#C45C1A]/20 border border-[#C9A84C]/45 rounded-xl text-[#C9A84C] shrink-0 relative z-10">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="relative z-10 text-left">
                        <h3 className="font-serif font-bold text-lg text-white mb-2">{card.title}</h3>
                        <p className="text-xs sm:text-sm text-[#FAF6F0]/75 leading-relaxed font-sans">{card.text}</p>
                      </div>
                    </div>
                  </ThreeDCard>
                );
              })}
            </div>
          </ScrollFade>
        </div>
      </section>

      {/* 6. HOW WE WORK (TIMELINE) */}
      <section className="py-12 sm:py-20 bg-[#FAF6F0] scroll-mt-20" id="how-we-work-timeline">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-[11px] uppercase tracking-widest text-[#C45C1A] font-bold font-mono">The Sacred Journey</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#6B1A2A] font-bold mt-1">
              How We Guide You Home
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-xl mx-auto">
              Our refined 7-step timeline ensures absolute clarity, security and celebration as you transition step-by-step into Brijbhoomi.
            </p>
          </div>

          {/* Timeline Node Chain with scroll triggers */}
          <ScrollFade direction="up">
            <div className="relative border-l border-[#C9A84C]/40 pl-6 sm:pl-8 ml-3 sm:ml-4 space-y-12">
              {timelineSteps.map((step, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline ball marker featuring miniature lotus icon */}
                  <div className="absolute -left-[35px] sm:-left-[43px] top-1 h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-[#1A1A2E] border-2 border-[#C9A84C] flex items-center justify-center text-[10px] text-[#C9A84C] font-bold shadow-md">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#1A1A2E] group-hover:text-[#C45C1A] transition-colors mb-1 text-left">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl font-sans text-left">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollFade>
        </div>
      </section>

      {/* 7. ROI CALCULATOR INTEGRATOR */}
      <section className="py-10 sm:py-16 bg-slate-50 border-t border-b border-[#C9A84C]/15 px-4" id="roi-calculator-section">
        <div className="text-center max-w-2xl mx-auto mb-4">
          <span className="text-[11px] uppercase tracking-widest font-bold font-mono" style={{ color: "var(--brand-saffron)" }}>Return Projections</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-1 text-[color:var(--brand-night)]">
            Maximize Your Brijbhoomi Return
          </h2>
        </div>
        <ROICalculator />
      </section>

      {/* 8. BOOKING CALL DIRECT DIALOGS / QUICK CALLBACK */}
      <section className="py-12 sm:py-16 px-4 bg-gradient-to-br from-[color:var(--brand-night)] to-[#11193c] text-white border-y border-[color:var(--brand-gold)]/30 relative overflow-hidden" id="homepage-callback">
        {/* Subtle decorative mandalas */}
        <div className="absolute -right-16 -bottom-16 h-48 w-48 opacity-10 border-4 border-[#C9A84C] rounded-full"></div>
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-center relative z-10">
          <div className="md:col-span-7 space-y-4">
            <span className="text-xs uppercase text-[color:var(--brand-gold)] tracking-widest font-semibold font-mono block">Zero Cost Consultation</span>
            <h2
              className="font-serif text-2xl sm:text-4xl font-bold tracking-wide text-white"
              style={{ color: "#FFFFFF" }}
            >
              Book a Free Personal Site Visit & Consultation
            </h2>
            <p className="text-xs sm:text-sm text-[#FAF6F0]/80 leading-relaxed max-w-xl font-sans">
              Pranam! Experience Mathura-Vrindavan like a native. Our team can help you shortlist the right property, arrange a guided visit, and answer the questions buyers usually ask before they enquire.
            </p>
          </div>

          {/* Quick Callback Submit Form */}
          <div className="md:col-span-5 bg-white text-[#1A1A2E] p-6 rounded-2xl border border-[#C9A84C]/35 shadow-2xl">
            <h3 className="font-serif font-bold text-lg text-[#6B1A2A] mb-4">
              Request Advisory Callback
            </h3>
            <form onSubmit={handleConsultationSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Enquiry Type</label>
                <select
                  value={enquiryType}
                  onChange={(e) => setEnquiryType(e.target.value)}
                  className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200 outline-none focus:border-[#C45C1A] text-slate-800 bg-slate-50"
                >
                  <option value="Property Enquiry">Property Enquiry (Vrindavan, Mathura, Omaxe, Serviced Suites)</option>
                  <option value="Job Enquiry">Job Enquiry (Careers inside Nikunj Heritage)</option>
                  <option value="Channel Partner Enquiry">Channel Partner Enquiry (Real Estate Network integration)</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Rajesh Chaturvedi"
                  value={consultationName}
                  onChange={(e) => setConsultationName(e.target.value)}
                  className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-200 outline-none focus:border-[#C45C1A] text-slate-800"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">WhatsApp/Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g., +91 9719920888"
                  value={consultationPhone}
                  onChange={(e) => setConsultationPhone(e.target.value)}
                  className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-200 outline-none focus:border-[#C45C1A] text-slate-800"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Email Address (Optional)</label>
                <input
                  type="email"
                  placeholder="e.g., name@example.com"
                  value={consultationEmail}
                  onChange={(e) => setConsultationEmail(e.target.value)}
                  className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-200 outline-none focus:border-[#C45C1A] text-slate-800"
                />
              </div>
              <button
                type="submit"
                disabled={isConsulting}
                className="w-full rounded-lg bg-[color:var(--brand-saffron)] py-3 text-sm font-bold uppercase tracking-wider text-white shadow transition-colors hover:opacity-95 flex items-center justify-center font-serif"
              >
                {isConsulting ? "Submitting..." : "Submit Enquiry"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 9. LATEST BLOGS CARDS */}
      <section className="py-16 max-w-7xl mx-auto px-4 scroll-mt-20" id="blogs-section">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10">
          <div>
          <span className="text-[11px] uppercase tracking-widest font-bold font-mono" style={{ color: "var(--brand-saffron)" }}>Brijbhoomi Journal</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-1" style={{ color: "var(--brand-night)" }}>
              Latest Insights & Guides
            </h2>
          </div>
          <Link
            to="/blogs"
            className="mt-2 sm:mt-0 text-xs sm:text-sm font-semibold text-[#C45C1A] hover:text-[#6B1A2A] flex items-center space-x-1 underline underline-offset-4"
          >
            <span>Read All Literature</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {blogs.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-56 bg-slate-200 animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <article key={blog.id} className="bg-white rounded-xl overflow-hidden border border-[#C9A84C]/15 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
                <div>
                  <img
                    src={blog.coverUrl}
                    alt={blog.title}
                    className="w-full h-44 object-cover"
                    onError={(event) => { event.currentTarget.src = "/projects/images/ai-buyer-spiritual-retreat.jpg"; }}
                  />
                  <div className="p-4">
                    <span className="text-[10px] uppercase tracking-widest font-bold font-mono" style={{ color: "var(--brand-saffron)" }}>
                      Category • {blog.category}
                    </span>
                    <Link to={`/blogs/${blog.slug}`} className="block block-title mt-1.5 mb-2.5">
                      <h3 className="font-serif font-bold text-[#1A1A2E] text-base leading-snug hover:text-[#C45C1A] line-clamp-2">
                        {blog.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                      {blog.content.replace(/[#*`_]/g, "").slice(0, 150)}...
                    </p>
                  </div>
                </div>
                <div className="p-4 pt-0">
                  <Link
                    to={`/blogs/${blog.slug}`}
                    className="inline-flex items-center text-xs font-semibold text-[#6B1A2A] hover:text-[#C45C1A] font-mono"
                  >
                    <span>Read Article</span>
                    <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="bg-white px-4 py-14" id="wealth-style-faq-section">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
              <span className="text-[11px] font-black uppercase tracking-[0.28em]" style={{ color: "var(--brand-saffron)" }}>Buyer Questions</span>
            <h2 className="mt-3 font-serif text-3xl font-black leading-tight text-[color:var(--brand-night)] sm:text-4xl">
              Frequently asked before buying in Braj.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Quick clarity for families, investors, NRIs and devotional second-home buyers comparing Mathura-Vrindavan property options.
            </p>
          </div>
          <div className="space-y-4 lg:col-span-8">
            {faqItems.map((item, index) => (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="rounded-3xl border border-slate-100 bg-[#FAF8F4] p-5"
              >
                <div className="flex gap-4">
                  <HelpCircle className="mt-1 h-5 w-5 shrink-0 text-[#FB923C]" />
                  <div>
                    <h3 className="font-serif text-lg font-black text-[#0F172A]">{item.question}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{item.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[color:var(--brand-gold)]/20 bg-[color:var(--brand-night)] px-4 py-12 text-white" id="wealth-style-seo-service-areas">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="text-[11px] font-black uppercase tracking-[0.28em] text-[color:var(--brand-gold)]">Mathura Vrindavan Real Estate</span>
              <h2 className="mt-3 font-serif text-3xl font-black">Premium property advisory across sacred growth corridors.</h2>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3 lg:col-span-7">
              {[
                "Property in Vrindavan",
                "Mathura Real Estate",
                "Rukmini Vihar Flats",
                "Plots in Govardhan",
                "Commercial Property Mathura",
                "Villas near Prem Mandir",
                "Banke Bihari Access Zone",
                "ISKCON Vrindavan Homes",
                "Braj Investment Property"
              ].map((keyword) => (
                <Link
                  key={keyword}
                  to="/properties"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/75 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {keyword}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 10. NEWSLETTER SIGNUP BOX */}
      <section className="py-16 bg-[#FAF6F0] px-4 max-w-4xl mx-auto text-center border-t border-[#C9A84C]/25" id="newsletter-signup-tray">
        <h3 className="font-serif text-[#6B1A2A] text-xl sm:text-2xl font-bold tracking-wide">
          Subscribe to Divine Dwelling Updates
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto mt-2 leading-relaxed font-sans">
          Be the absolute first to receive alerts on new land launches, haveli launches, and price appreciation indices in Mathura-Vrindavan.
        </p>
        <form onSubmit={handleNewsletterSubmit} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input
            type="email"
            required
            placeholder="Enter your email address"
            value={newsletterEmail}
            onChange={(e) => setNewsletterEmail(e.target.value)}
            className="flex-grow px-4 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm outline-none focus:border-[#C45C1A] bg-white shadow-inner"
          />
          <button
            type="submit"
            className="bg-[#1A1A2E] hover:bg-[#1A1A2E]/90 text-[#C9A84C] font-bold text-xs sm:text-sm px-6 py-2.5 rounded-lg transition-colors shadow font-serif uppercase tracking-widest"
          >
            Join Registry
          </button>
        </form>
      </section>
      </div>
    </div>
  );
};
export default Home;
