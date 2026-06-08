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
  HelpCircle
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
  const [isConsulting, setIsConsulting] = useState(false);

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
        email: "guest-callback@nikunj.com",
        locationInterest: "Vrindavan (Rukmani Vihar)",
        propertyType: "Immediate Callback Consultation",
        message: "Free homepage site visit consultation request.",
        preferredCallback: "As soon as possible",
        sourceUrl: window.location.href
      });
      toast.success("Callback request submitted! Our Brijbhoomi advisor will call you shortly.");
      setConsultationName("");
      setConsultationPhone("");
    } catch (err) {
      toast.error("Consultation submit failed. Please try WhatsApp.");
    } finally {
      setIsConsulting(false);
    }
  };

  const featuredProperties = properties.filter(p => p.featured || p.newLaunch).slice(0, 3);

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
    <div className="bg-[#FAF6F0] min-h-screen text-[#1A1A2E]" id="homepage-container">
      
      {/* 1. HERO SECTION */}
      <header className="relative min-h-[90vh] bg-[#1A1A2E] flex items-center justify-center overflow-hidden border-b-2 border-[#C9A84C]/40" id="hero-banner">
        {/* Divine Background Video or Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={config?.heroCoverUrl || "https://images.unsplash.com/photo-1545229765-7018d6ff02bd?auto=format&fit=crop&q=80&w=1600"}
            alt="Divine Vrindavan Temple"
            className="w-full h-full object-cover opacity-35 scale-105 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E] via-transparent to-black/40"></div>
        </div>

        {/* Hero Interactive Contents */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
          
          {/* Saffron Sanskrit traditional welcome chip */}
          <div className="inline-flex items-center space-x-2 bg-[#C45C1A] text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-widest uppercase shadow-md mb-6 border border-[#C9A84C]/40 animate-bounce">
            <Sparkles className="h-4 w-4 text-[#C9A84C]" />
            <span>स्वागतम् • SWAGATAM</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-extrabold tracking-wide leading-tight max-w-4xl shadow-sm filter drop-shadow">
            {config?.heroTitle || "Where Divinity Meets Luxury Living"}
          </h1>

          <p className="mt-4 text-xs sm:text-sm md:text-base text-[#FAF6F0]/80 font-sans tracking-wide max-w-2xl leading-relaxed">
            {config?.heroSubtitle || "Explore premium apartments, traditional haveli villas and freehold registry plots nearby Prem Mandir, Krishna Janmabhoomi, ISKCON and Govardhan Parikrama."}
          </p>

          {/* Real-time Integrated Search Bar */}
          <form onSubmit={handleSearchSubmit} className="mt-8 bg-white p-2.5 rounded-xl shadow-xl w-full max-w-2xl flex flex-col sm:flex-row gap-2.5 border border-[#C9A84C]/30">
            <div className="flex-grow flex items-center px-3 gap-2 border-b sm:border-b-0 sm:border-r border-slate-200 pb-2 sm:pb-0">
              <Search className="h-5 w-5 text-[#C45C1A] shrink-0" />
              <input
                type="text"
                placeholder="Search flats near Prem Mandir, plots in Govardhan..."
                value={searchQuery}
                aria-label="Property Search Field"
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 text-sm py-1 font-sans"
              />
            </div>
            <button
              type="submit"
              className="bg-[#C45C1A] hover:bg-[#C45C1A]/90 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-lg flex items-center justify-center space-x-1.5 shrink-0 transition-all font-serif"
            >
              <span>Explore Assets</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </form>

          {/* Quick Stats banner */}
          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-6 bg-white/5 backdrop-blur-sm border border-[#FAF6F0]/15 p-5 sm:p-6 rounded-xl max-w-4xl w-full">
            <div className="text-center border-r border-[#FAF6F0]/10 last:border-0">
              <span className="block font-serif text-xl sm:text-3xl font-extrabold text-[#C9A84C]">{config?.statSqFt || "10L+"}</span>
              <span className="block text-[9px] sm:text-xs uppercase text-[#FAF6F0]/70 tracking-widest font-semibold mt-1">Sq Ft Sold</span>
            </div>
            <div className="text-center sm:border-r border-[#FAF6F0]/10 last:border-0">
              <span className="block font-serif text-xl sm:text-3xl font-extrabold text-[#C9A84C]">{config?.statDelivered || "1500+"}</span>
              <span className="block text-[9px] sm:text-xs uppercase text-[#FAF6F0]/70 tracking-widest font-semibold mt-1">Delivered</span>
            </div>
            <div className="text-center border-r border-[#FAF6F0]/10 last:border-0">
              <span className="block font-serif text-xl sm:text-3xl font-extrabold text-[#C9A84C]">{config?.statExperience || "15+"}</span>
              <span className="block text-[9px] sm:text-xs uppercase text-[#FAF6F0]/70 tracking-widest font-semibold mt-1">Years Experience</span>
            </div>
            <div className="text-center last:border-0">
              <span className="block font-serif text-xl sm:text-3xl font-extrabold text-[#C9A84C]">{config?.statFamilies || "1200+"}</span>
              <span className="block text-[9px] sm:text-xs uppercase text-[#FAF6F0]/70 tracking-widest font-semibold mt-1">Happy Families</span>
            </div>
          </div>

        </div>
      </header>

      {/* 2. DYNAMIC CATEGORIES GRID */}
      <section className="py-16 px-4 max-w-7xl mx-auto scroll-mt-20" id="categories-grid-section">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[11px] uppercase tracking-widest text-[#C45C1A] font-bold font-mono">Select Your Vibe</span>
          <h2 className="font-serif text-2xl sm:text-4xl text-[#6B1A2A] font-bold mt-1 shadow-sm">
            Celestial Property Sectors
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-xl mx-auto leading-relaxed">
            Manage your Brijbhoomi investments across dedicated residential, plots registry, haveli villas, and spiritual ashrams categories.
          </p>
        </div>

        {categories.length === 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-32 bg-slate-300 animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/properties?category=${cat.slug}`}
                className="group relative h-40 rounded-xl overflow-hidden shadow border border-[#C9A84C]/25 flex flex-col justify-end p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 block"
              >
                <div className="absolute inset-0 bg-[#1A1A2E] z-0">
                  <img
                    src={cat.imageUrl}
                    alt={cat.name}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-65 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E] via-[#1A1A2E]/40 to-transparent"></div>
                </div>
                <div className="relative z-10">
                  <span className="text-[10px] text-[#C9A84C] font-mono font-semibold uppercase">{cat.slug.replace("-", " ")}</span>
                  <h3 className="font-serif text-white font-bold text-sm sm:text-base tracking-wide leading-tight">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* 3. DYNAMIC FEATURED ASSETS (CAROUSEL GRID) */}
      <section className="py-16 bg-[#FAF6F0]/60 border-y border-[#C9A84C]/10 scroll-mt-20" id="featured-assets-sliders">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. DYNAMIC LOCATIONS (AREAS GRID) */}
      <section className="py-16 px-4 max-w-7xl mx-auto scroll-mt-20" id="locations-grid">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((loc) => (
              <Link
                key={loc.id}
                to={`/properties?location=${loc.slug}`}
                className="group relative h-48 rounded-xl overflow-hidden shadow border border-[#C9A84C]/25 pb-4 px-4 flex flex-col justify-end transition-transform duration-300 hover:scale-[1.02] block"
              >
                <div className="absolute inset-0 bg-[#1A1A2E] z-0">
                  <img
                    src={loc.imageUrl}
                    alt={loc.name}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
                </div>
                <div className="relative z-10 text-white">
                  <span className="text-[9px] uppercase tracking-widest font-bold font-mono text-[#C9A84C]">
                    Region: {loc.city}
                  </span>
                  <h3 className="font-serif font-bold text-base sm:text-lg tracking-wide shadow-sm mt-0.5 line-clamp-1">
                    {loc.name}
                  </h3>
                  <p className="text-[11px] text-slate-200 line-clamp-2 mt-1 leading-snug">
                    {loc.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* 5. WHY CHOOSE US - CARDS SECTION */}
      <section className="py-20 bg-[#1A1A2E] text-[#FAF6F0] border-t-2 border-[#C9A84C]/40 scroll-mt-20" id="why-choose-us-section">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] uppercase tracking-widest text-[#C9A84C] font-bold font-mono">Brijvas Heritage Pledge</span>
            <h2 className="font-serif text-2xl sm:text-4xl text-white font-bold mt-1">
              Why Nikunj Heritage Infrabuild?
            </h2>
            <div className="h-0.5 w-16 bg-[#C45C1A] mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUsCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className="bg-white/5 border border-[#FAF6F0]/10 p-6 rounded-xl hover:border-[#C9A84C]/40 transition-colors duration-300 flex items-start space-x-4"
                >
                  <div className="p-3 bg-[#C45C1A]/25 border border-[#C45C1A] rounded-lg text-[#C9A84C] shrink-0">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-white mb-2">{card.title}</h3>
                    <p className="text-xs sm:text-sm text-[#FAF6F0]/70 leading-relaxed font-sans">{card.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. HOW WE WORK (TIMELINE) */}
      <section className="py-20 bg-[#FAF6F0] scroll-mt-20" id="how-we-work-timeline">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[11px] uppercase tracking-widest text-[#C45C1A] font-bold font-mono">The Sacred Journey</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#6B1A2A] font-bold mt-1">
              How We Guide You Home
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-xl mx-auto">
              Our refined 7-step timeline ensures absolute clarity, security and celebration as you transition step-by-step into Brijbhoomi.
            </p>
          </div>

          {/* Timeline Node Chain */}
          <div className="relative border-l border-[#C9A84C]/40 pl-6 sm:pl-8 ml-3 sm:ml-4 space-y-12">
            {timelineSteps.map((step, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline ball marker featuring miniature lotus icon */}
                <div className="absolute -left-[35px] sm:-left-[43px] top-1 h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-[#1A1A2E] border-2 border-[#C9A84C] flex items-center justify-center text-[10px] text-[#C9A84C] font-bold shadow-md">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1A1A2E] group-hover:text-[#C45C1A] transition-colors mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl font-sans">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. ROI CALCULATOR INTEGRATOR */}
      <section className="py-16 bg-slate-50 border-t border-b border-[#C9A84C]/15 px-4" id="roi-calculator-section">
        <div className="text-center max-w-2xl mx-auto mb-4">
          <span className="text-[11px] uppercase tracking-widest text-[#6B1A2A] font-bold font-mono">Return Projections</span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1A2E] font-bold mt-1">
            Maximize Your Brijbhoomi Return
          </h2>
        </div>
        <ROICalculator />
      </section>

      {/* 8. BOOKING CALL DIRECT DIALOGS / QUICK CALLBACK */}
      <section className="py-16 px-4 bg-gradient-to-br from-[#6B1A2A] to-[#1A1A2E] text-white border-y border-[#C9A84C]/40 relative overflow-hidden" id="homepage-callback">
        {/* Subtle decorative mandalas */}
        <div className="absolute -right-16 -bottom-16 h-48 w-48 opacity-10 border-4 border-[#C9A84C] rounded-full"></div>
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-center relative z-10">
          <div className="md:col-span-7 space-y-4">
            <span className="text-xs uppercase text-[#C9A84C] tracking-widest font-semibold font-mono block">Zero Cost Consultation</span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-wide">
              Book a Free Personal Site Visit & Consultation
            </h2>
            <p className="text-xs sm:text-sm text-[#FAF6F0]/80 leading-relaxed max-w-xl font-sans">
              Pranam! Experience Mathura-Vrindavan like a native. Our personal air-conditioned car will transport you and your family directly from Mathura junction or central hotels to all certified ready-to-move projects.
            </p>
          </div>

          {/* Quick Callback Submit Form */}
          <div className="md:col-span-5 bg-white text-[#1A1A2E] p-6 rounded-2xl border border-[#C9A84C]/35 shadow-2xl">
            <h3 className="font-serif font-bold text-lg text-[#6B1A2A] mb-4">
              Request Callback Call
            </h3>
            <form onSubmit={handleConsultationSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Your Full Name</label>
                <input
                  type="text"
                  placeholder="e.g., Rajesh Chaturvedi"
                  value={consultationName}
                  onChange={(e) => setConsultationName(e.target.value)}
                  className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-200 outline-none focus:border-[#C45C1A] text-slate-800"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Whatsapp/Phone Number</label>
                <input
                  type="tel"
                  placeholder="e.g., +91 9719920888"
                  value={consultationPhone}
                  onChange={(e) => setConsultationPhone(e.target.value)}
                  className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-200 outline-none focus:border-[#C45C1A] text-slate-800"
                />
              </div>
              <button
                type="submit"
                disabled={isConsulting}
                className="w-full py-3 bg-[#6B1A2A] text-white font-bold rounded-lg text-sm transition-colors hover:bg-[#6B1A2A]/90 shadow flex items-center justify-center"
              >
                {isConsulting ? "Submitting..." : "Schedule Callback Visit"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 9. LATEST BLOGS CARDS */}
      <section className="py-16 max-w-7xl mx-auto px-4 scroll-mt-20" id="blogs-section">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-[#C45C1A] font-bold font-mono">Brijbhoomi Journal</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#6B1A2A] font-bold mt-1">
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
                  />
                  <div className="p-4">
                    <span className="text-[10px] text-[#C45C1A] uppercase tracking-widest font-bold font-mono">
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

      {/* Floating Saffron WhatsApp CTA */}
      <div className="fixed bottom-6 right-6 z-40 block" id="floating-whatsapp-cta">
        <a
          href="https://wa.me/919719920888?text=Pranam%21+I+would+like+to+inquire+about+residential+plots+and+villas+at+Nikunj+Heritage+Infrabuild."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center h-14 w-14 rounded-full bg-[#0E7B6C] hover:bg-[#0E7B6C]/90 text-white shadow-2xl transition-transform hover:scale-110 active:scale-95 border border-[#C9A84C]/50"
          title="Direct WhatsApp Helpline"
          type="button"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-white">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003  5.37 5.378 0 12.01 0c3.21.002 6.23 1.251 8.5 3.518s3.511 5.291 3.51 8.5c-.003 6.642-5.378 12.01-12.01 12.01-2.002-.001-3.974-.5-5.789-1.455L0 24zm6.27-5.908c1.716 1.018 3.411 1.554 5.733 1.555 5.539 0 10.05-4.512 10.052-10.051-.001-2.684-1.047-5.205-2.946-7.104s-4.421-2.947-7.107-2.947c-5.541 0-10.053 4.512-10.055 10.052-.001 2.222.569 4.398 1.656 6.271L2.613 21.36l5.714-1.268z M15.753 13.916c-.23-.115-1.364-.672-1.576-.75s-.364-.115-.515.115c-.152.23-.584.75-.716.901-.132.15-.264.17-.494.053-.23-.115-.972-.358-1.851-1.144-.684-.61-1.146-1.363-1.28-1.595-.132-.23-.014-.354.1-.471.103-.105.23-.264.346-.396.115-.132.15-.23.23-.383.078-.15.038-.283-.02-.383-.058-.115-.515-1.242-.705-1.701-.186-.447-.373-.383-.51-.39-.133-.008-.285-.008-.438-.008s-.402.057-.611.282c-.21.225-.8.78-.8 1.901s.815 2.202.93 2.353c.115.15 1.6 2.443 3.878 3.424.542.233.965.373 1.294.478.544.173 1.039.148 1.43.09.436-.064 1.364-.557 1.556-1.096.191-.538.191-1.002.134-1.096-.06-.115-.213-.17-.442-.284z"/>
          </svg>
        </a>
      </div>

    </div>
  );
};
export default Home;
