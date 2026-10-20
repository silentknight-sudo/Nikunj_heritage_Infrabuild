/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  MapPin,
  Building2,
  Home as HomeIcon,
  Store,
  Trees,
  Landmark,
  ShieldCheck,
  FileCheck,
  Award,
  Users,
  Compass,
  Headphones,
  Calculator,
  Scale,
  Wallet,
  Star,
  Quote,
  PhoneCall,
  MessageSquare,
  X,
  CheckCircle2,
  TrendingUp,
  FileText,
  CalendarCheck
} from "lucide-react";
import {
  getProperties,
  getCategories,
  getLocations,
  getBlogs,
  getTestimonials,
  createLead
} from "../lib/firestore";
import { Property, Category, Location, Blog, Testimonial } from "../types";
import { formatPrice } from "../lib/utils";
import { PropertyCard } from "../components/property/PropertyCard";
import { toast } from "react-hot-toast";
import { SeoHead } from "../components/seo/SeoHead";
import { DEFAULT_OG_IMAGE, SITE_URL } from "../lib/seo";
import { motion, AnimatePresence } from "motion/react";

const PHONE = "+919719920888";
const WHATSAPP_URL =
  "https://wa.me/919719920888?text=Pranam%21+I+would+like+to+inquire+about+properties+at+Nikunj+Heritage+Infrabuild.";

const searchTabs = [
  { label: "All", category: "all" },
  { label: "Residential", category: "residential-apartments" },
  { label: "Villas", category: "luxury-villas" },
  { label: "Commercial", category: "commercial-spaces" },
  { label: "Plots", category: "plots-and-land" },
  { label: "Retreats", category: "spiritual-retreats" }
];

const budgetOptions = [
  { label: "Any budget", value: "" },
  { label: "Under ₹30 Lac", value: "3000000" },
  { label: "Under ₹50 Lac", value: "5000000" },
  { label: "Under ₹1 Cr", value: "10000000" },
  { label: "Under ₹2 Cr", value: "20000000" }
];

const popularSearches = [
  { label: "Flats near Prem Mandir", href: "/properties?search=Prem Mandir" },
  { label: "Plots in Govardhan", href: "/properties?category=plots-and-land" },
  { label: "Shops on NH-2", href: "/properties?category=commercial-spaces" },
  { label: "Villas in Vrindavan", href: "/properties?category=luxury-villas" },
  { label: "Ready to move", href: "/properties?search=Ready" }
];

const categoryIcons: Record<string, React.ElementType> = {
  "residential-apartments": Building2,
  "luxury-villas": HomeIcon,
  "commercial-spaces": Store,
  "plots-and-land": Trees,
  "spiritual-retreats": Landmark
};

const whyChooseUs = [
  { title: "100% Verified Listings", text: "Every project is checked for title, approvals and UP RERA status before it reaches you.", icon: ShieldCheck },
  { title: "Direct Builder Pricing", text: "No hidden broker markups. Transparent price sheets and payment plans upfront.", icon: Wallet },
  { title: "Legal & Registry Support", text: "End-to-end help with documentation, loans, registry and possession handover.", icon: FileCheck },
  { title: "Temple-Proximity Insights", text: "Real walking distances to Prem Mandir, Banke Bihari, ISKCON and Yamuna ghats.", icon: Compass },
  { title: "Free Guided Site Visits", text: "Local advisors show you shortlisted properties in a single, planned visit.", icon: CalendarCheck },
  { title: "After-Sale Assistance", text: "Rental, resale and property management guidance long after you buy.", icon: Headphones }
];

const howItWorks = [
  { title: "Tell us what you need", text: "Share your budget, preferred location and property type." },
  { title: "Get a verified shortlist", text: "Receive matching projects with prices, plans and documents." },
  { title: "Visit with an advisor", text: "Free guided site visit across Mathura–Vrindavan." },
  { title: "Book & register safely", text: "We handle paperwork, loans and registry with you." }
];

const faqItems = [
  {
    question: "Is Nikunj Heritage a builder or a property advisor?",
    answer: "Nikunj Heritage Infrabuild is a local Mathura–Vrindavan real estate advisory and infrabuild company. We help buyers shortlist verified residential, commercial and plotted projects and support them till registry."
  },
  {
    question: "Can I compare Vrindavan properties before visiting?",
    answer: "Yes. Use the listings and Compare tool to evaluate budget, area, location, temple proximity, amenities and documentation before booking a site visit."
  },
  {
    question: "Which locations are best for investment?",
    answer: "Popular zones include Rukmini Vihar, the Prem Mandir belt, Banke Bihari access zones, Mathura–Vrindavan Road, the Govardhan corridor and selected commercial pockets in Mathura."
  },
  {
    question: "Do you help with home loans?",
    answer: "Yes. We work with leading banks and NBFCs and can help you check eligibility, compare interest rates and complete the loan process."
  },
  {
    question: "How do I book a site visit?",
    answer: "Fill the enquiry form, call us or message on WhatsApp. Site visits are free and can be scheduled on any day of the week."
  }
];

const seoKeywords = [
  "Property in Vrindavan",
  "Mathura Real Estate",
  "Rukmini Vihar Flats",
  "Plots in Govardhan",
  "Commercial Property Mathura",
  "Villas near Prem Mandir",
  "Banke Bihari Access Zone",
  "ISKCON Vrindavan Homes",
  "Braj Investment Property"
];

const SectionHeader: React.FC<{
  eyebrow: string;
  title: string;
  subtitle?: string;
  action?: { label: string; href: string };
}> = ({ eyebrow, title, subtitle, action }) => (
  <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
    <div className="max-w-2xl">
      <span className="text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--brand-saffron)]">{eyebrow}</span>
      <h2 className="mt-1.5 font-sans text-2xl font-extrabold tracking-tight text-[color:var(--brand-night)] sm:text-3xl">{title}</h2>
      {subtitle && <p className="mt-2 text-sm leading-6 text-slate-500">{subtitle}</p>}
    </div>
    {action && (
      <Link
        to={action.href}
        className="inline-flex w-fit shrink-0 items-center gap-1 text-sm font-bold text-[color:var(--brand-saffron)] hover:underline"
      >
        {action.label}
        <ChevronRight className="h-4 w-4" />
      </Link>
    )}
  </div>
);

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Hero search
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLocation, setSearchLocation] = useState("all");
  const [searchBudget, setSearchBudget] = useState("");

  // Lead capture
  const [consultationName, setConsultationName] = useState("");
  const [consultationPhone, setConsultationPhone] = useState("");
  const [enquiryType, setEnquiryType] = useState("Property Enquiry");
  const [isConsulting, setIsConsulting] = useState(false);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const featuredRailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [cats, locs, props, blgs, tst] = await Promise.all([
          getCategories(),
          getLocations(),
          getProperties(),
          getBlogs(),
          getTestimonials()
        ]);
        setCategories(cats);
        setLocations(locs);
        setProperties(props);
        setBlogs(blgs.slice(0, 3));
        setTestimonials(tst.filter((t) => t.approved));
      } catch (err) {
        console.error("Home page data loading error:", err);
      } finally {
        setLoaded(true);
      }
    }
    loadData();
  }, []);

  // Open the enquiry popup once per session, a few seconds after landing
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("nh_enquiry_seen") === "1";
    } catch {
      seen = false;
    }
    if (seen) return;
    const timer = window.setTimeout(() => {
      setShowEnquiryModal(true);
      try {
        sessionStorage.setItem("nh_enquiry_seen", "1");
      } catch {
        // storage unavailable; popup will simply show again next visit
      }
    }, 8000);
    return () => window.clearTimeout(timer);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set("search", searchQuery.trim());
    if (activeTab !== "all") params.set("category", activeTab);
    if (searchLocation !== "all") params.set("location", searchLocation);
    if (searchBudget) params.set("maxPrice", searchBudget);
    navigate(`/properties${params.toString() ? `?${params.toString()}` : ""}`);
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
        locationInterest: "Vrindavan / Mathura Core Belt",
        propertyType: enquiryType,
        message: `Homepage enquiry: ${enquiryType}.`,
        preferredCallback: "As soon as possible",
        sourceUrl: window.location.href
      });
      toast.success("Thank you! Our advisor will call you shortly.");
      setConsultationName("");
      setConsultationPhone("");
      setEnquiryType("Property Enquiry");
      setShowEnquiryModal(false);
    } catch (err) {
      toast.error("Could not submit right now. Please try WhatsApp.");
    } finally {
      setIsConsulting(false);
    }
  };

  const featuredProperties = useMemo(() => {
    const picks = properties.filter((p) => p.featured || p.newLaunch);
    return (picks.length ? picks : properties).slice(0, 8);
  }, [properties]);

  const spotlight = useMemo(
    () => properties.find((p) => p.newLaunch && p.imageUrls?.length) || properties.find((p) => p.imageUrls?.length),
    [properties]
  );

  const countByCategory = (id: string) => properties.filter((p) => p.categoryId === id).length;
  const countByLocation = (id: string) => properties.filter((p) => p.locationId === id).length;
  const startingPrice = properties.length ? Math.min(...properties.map((p) => p.price)) : 0;

  const heroStats = [
    { value: `${properties.length || 24}+`, label: "Verified projects" },
    { value: `${locations.length || 7}+`, label: "Prime localities" },
    { value: "1,200+", label: "Happy buyers" },
    { value: "100%", label: "RERA focused" }
  ];

  const scrollRail = (dir: 1 | -1) => {
    const rail = featuredRailRef.current;
    if (!rail) return;
    rail.scrollBy({ left: dir * rail.clientWidth * 0.85, behavior: "smooth" });
  };

  const renderLeadForm = (compact = false) => (
    <form onSubmit={handleConsultationSubmit} className="space-y-3">
      <select
        value={enquiryType}
        onChange={(e) => setEnquiryType(e.target.value)}
        aria-label="Enquiry type"
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800 outline-none focus:border-[color:var(--brand-saffron)] focus:ring-2 focus:ring-[color:var(--brand-saffron)]/15"
      >
        <option>Property Enquiry</option>
        <option>Site Visit</option>
        <option>Commercial Space</option>
        <option>Plots & Land</option>
        <option>Home Loan Help</option>
        <option>Channel Partner Enquiry</option>
      </select>
      <input
        type="text"
        required
        value={consultationName}
        onChange={(e) => setConsultationName(e.target.value)}
        placeholder="Your name"
        aria-label="Your name"
        className="w-full rounded-lg border border-slate-200 px-3 py-3 text-sm text-slate-800 outline-none focus:border-[color:var(--brand-saffron)] focus:ring-2 focus:ring-[color:var(--brand-saffron)]/15"
      />
      <div className="flex overflow-hidden rounded-lg border border-slate-200 focus-within:border-[color:var(--brand-saffron)] focus-within:ring-2 focus-within:ring-[color:var(--brand-saffron)]/15">
        <span className="flex items-center border-r border-slate-200 bg-slate-50 px-3 text-sm text-slate-500">+91</span>
        <input
          type="tel"
          required
          value={consultationPhone}
          onChange={(e) => setConsultationPhone(e.target.value)}
          placeholder="Mobile number"
          aria-label="Mobile number"
          className="w-full px-3 py-3 text-sm text-slate-800 outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={isConsulting}
        className="w-full rounded-lg bg-[color:var(--brand-saffron)] px-4 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#d4661d] disabled:opacity-70"
      >
        {isConsulting ? "Submitting..." : "Get a Free Callback"}
      </button>
      {!compact && (
        <p className="text-center text-[11px] text-slate-400">By submitting, you agree to be contacted by our advisors.</p>
      )}
    </form>
  );

  return (
    <div className="relative min-h-screen bg-white text-[color:var(--brand-night)]" id="homepage-container">
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
            logo: `${SITE_URL}/logo-512.png`,
            image: `${SITE_URL}/logo-512.png`,
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
            logo: `${SITE_URL}/logo-512.png`,
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
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          },
        ]}
      />

      {/* 1. HERO WITH PORTAL SEARCH */}
      <section className="relative isolate overflow-hidden" id="hero-search">
        <img
          src="/projects/images/mathura-vrindavan-hero-enquiry.jpg"
          alt="Aerial view of Vrindavan"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          onError={(event) => { event.currentTarget.src = "/projects/images/mathura-vrindavan-aerial-livability.jpg"; }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0b1030]/90 via-[#0b1030]/70 to-[#0b1030]/40" />

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:grid-cols-12 lg:px-8 lg:pb-24 lg:pt-20">
          <div className="lg:col-span-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                <ShieldCheck className="h-3.5 w-3.5 text-[color:var(--brand-gold)]" />
                Mathura–Vrindavan's trusted property advisor
              </span>
              <h1 className="mt-4 font-sans text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl" style={{ color: "#FFFFFF" }}>
                Find your perfect property in <span className="text-[color:var(--brand-gold)]">Braj Bhoomi</span>
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-white/80 sm:text-base">
                Verified flats, villas, plots and commercial spaces near Prem Mandir, Banke Bihari and the Yamuna — with free site visits and registry support.
              </p>
            </motion.div>

            {/* Search card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-7 overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
              <div className="flex gap-1 overflow-x-auto border-b border-slate-100 px-2 pt-2 [scrollbar-width:none]" role="tablist" aria-label="Property type">
                {searchTabs.map((tab) => {
                  const active = activeTab === tab.category;
                  return (
                    <button
                      key={tab.category}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveTab(tab.category)}
                      className={`relative shrink-0 px-4 py-3 text-sm font-bold transition-colors ${
                        active ? "text-[color:var(--brand-saffron)]" : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      {tab.label}
                      {active && <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-[color:var(--brand-saffron)]" />}
                    </button>
                  );
                })}
              </div>
              <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 gap-2 p-3 sm:grid-cols-12 sm:gap-0 sm:p-2">
                <label className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 sm:col-span-4 sm:rounded-none sm:border-0 sm:border-r">
                  <Search className="h-5 w-5 shrink-0 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search project, locality or landmark"
                    value={searchQuery}
                    aria-label="Search properties"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                  />
                </label>
                <label className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 sm:col-span-3 sm:rounded-none sm:border-0 sm:border-r">
                  <MapPin className="h-4 w-4 shrink-0 text-slate-400" />
                  <select
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    aria-label="Location"
                    className="w-full bg-transparent py-3 text-sm text-slate-800 outline-none"
                  >
                    <option value="all">All localities</option>
                    {locations.map((loc) => (
                      <option key={loc.id} value={loc.id}>{loc.name}</option>
                    ))}
                  </select>
                </label>
                <label className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 sm:col-span-3 sm:rounded-none sm:border-0">
                  <Wallet className="h-4 w-4 shrink-0 text-slate-400" />
                  <select
                    value={searchBudget}
                    onChange={(e) => setSearchBudget(e.target.value)}
                    aria-label="Budget"
                    className="w-full bg-transparent py-3 text-sm text-slate-800 outline-none"
                  >
                    {budgetOptions.map((b) => (
                      <option key={b.label} value={b.value}>{b.label}</option>
                    ))}
                  </select>
                </label>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-lg bg-[color:var(--brand-saffron)] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#d4661d] sm:col-span-2"
                >
                  <Search className="h-4 w-4" />
                  Search
                </button>
              </form>
            </motion.div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-white/70">Popular:</span>
              {popularSearches.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white backdrop-blur transition-colors hover:bg-white/20"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Hero lead form (desktop) */}
          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="hidden self-end rounded-2xl bg-white p-6 shadow-2xl lg:col-span-4 lg:block"
          >
            <h2 className="font-sans text-lg font-extrabold text-[color:var(--brand-night)]">Book a free site visit</h2>
            <p className="mb-4 mt-1 text-sm text-slate-500">Get a call back from a local advisor within 30 minutes.</p>
            {renderLeadForm()}
          </motion.aside>
        </div>

        {/* Stats strip */}
        <div className="border-t border-white/10 bg-[#0b1030]/70 backdrop-blur">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-white/10 px-4 sm:px-6 md:grid-cols-4 md:divide-x lg:px-8">
            {heroStats.map((stat) => (
              <div key={stat.label} className="px-2 py-4 text-center md:py-5">
                <div className="text-xl font-extrabold text-white sm:text-2xl">{stat.value}</div>
                <div className="text-xs text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. BROWSE BY PROPERTY TYPE */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8" id="categories-grid-section">
        <SectionHeader
          eyebrow="Explore"
          title="Browse by property type"
          subtitle="Homes, investments and retreats across Mathura, Vrindavan, Govardhan and Barsana."
          action={{ label: "View all properties", href: "/properties" }}
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 sm:gap-4">
          {(categories.length ? categories : searchTabs.slice(1).map((t) => ({ id: t.category, slug: t.category, name: t.label, imageUrl: "" } as Category))).map((cat) => {
            const Icon = categoryIcons[cat.slug] || Building2;
            const count = countByCategory(cat.id);
            return (
              <Link
                key={cat.id}
                to={`/properties?category=${cat.id}`}
                className="group flex flex-col items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-[color:var(--brand-saffron)]/50 hover:shadow-lg sm:p-5"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--brand-saffron)]/10 text-[color:var(--brand-saffron)] transition-colors group-hover:bg-[color:var(--brand-saffron)] group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-sans text-sm font-bold text-[color:var(--brand-night)] sm:text-base">{cat.name}</h3>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {loaded ? `${count} ${count === 1 ? "property" : "properties"}` : "Loading…"}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. FEATURED PROJECTS RAIL */}
      <section className="bg-slate-50 py-14" id="featured-assets-sliders">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div className="flex-1">
              <SectionHeader
                eyebrow="Handpicked"
                title="Featured projects"
                subtitle={startingPrice ? `Verified listings starting at ${formatPrice(startingPrice)}` : "Verified listings across Braj"}
              />
            </div>
            <div className="mb-8 hidden gap-2 sm:flex">
              <button type="button" onClick={() => scrollRail(-1)} aria-label="Previous projects" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-100">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button type="button" onClick={() => scrollRail(1)} aria-label="Next projects" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-100">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {!loaded ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-96 animate-pulse rounded-2xl bg-slate-200" />
              ))}
            </div>
          ) : featuredProperties.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
              New projects are being added. <Link to="/contact-us" className="font-bold text-[color:var(--brand-saffron)]">Talk to an advisor</Link> for current inventory.
            </p>
          ) : (
            <div
              ref={featuredRailRef}
              className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:mx-0 sm:px-0"
            >
              {featuredProperties.map((prop) => (
                <div key={prop.id} className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]">
                  <PropertyCard property={prop} />
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 text-center">
            <Link to="/properties" className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand-night)] px-6 py-2.5 text-sm font-bold text-[color:var(--brand-night)] transition-colors hover:bg-[color:var(--brand-night)] hover:text-white">
              Explore all projects
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. SPOTLIGHT / NEW LAUNCH */}
      {spotlight && (
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8" id="project-spotlight">
          <div className="grid overflow-hidden rounded-3xl bg-[color:var(--brand-night)] text-white shadow-xl lg:grid-cols-2">
            <div className="relative min-h-[16rem] lg:min-h-[24rem]">
              <img
                src={spotlight.imageUrls[0]}
                alt={spotlight.title}
                className="absolute inset-0 h-full w-full object-cover"
                onError={(event) => { event.currentTarget.src = "/projects/images/ai-buyer-residential.jpg"; }}
              />
              <span className="absolute left-4 top-4 rounded-full bg-[color:var(--brand-saffron)] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                {spotlight.newLaunch ? "New Launch" : "Spotlight"}
              </span>
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-10">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--brand-gold)]">Project spotlight</span>
              <h2 className="mt-2 font-sans text-2xl font-extrabold sm:text-3xl" style={{ color: "#FFFFFF" }}>{spotlight.title}</h2>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/75">{spotlight.description}</p>
              <dl className="mt-6 grid grid-cols-3 gap-3 border-y border-white/10 py-5">
                <div>
                  <dt className="text-xs text-white/50">Starting at</dt>
                  <dd className="mt-1 text-lg font-extrabold text-[color:var(--brand-gold)]">{formatPrice(spotlight.price)}</dd>
                </div>
                <div>
                  <dt className="text-xs text-white/50">Size</dt>
                  <dd className="mt-1 text-lg font-extrabold">{spotlight.area} sq ft</dd>
                </div>
                <div>
                  <dt className="text-xs text-white/50">Possession</dt>
                  <dd className="mt-1 text-lg font-extrabold">{spotlight.possessionDate || spotlight.status}</dd>
                </div>
              </dl>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to={`/properties/${spotlight.slug}`} className="inline-flex items-center gap-2 rounded-lg bg-[color:var(--brand-saffron)] px-5 py-3 text-sm font-bold text-white hover:bg-[#d4661d]">
                  View project
                  <ChevronRight className="h-4 w-4" />
                </Link>
                {spotlight.brochureUrl && (
                  <a href={spotlight.brochureUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-5 py-3 text-sm font-bold text-white hover:bg-white/10">
                    <FileText className="h-4 w-4" />
                    Brochure
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. POPULAR LOCALITIES */}
      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8" id="locations-grid">
        <SectionHeader
          eyebrow="Localities"
          title="Popular localities in Braj"
          subtitle="Choose a home near Banke Bihari, Prem Mandir, the Govardhan Parikrama or Barsana hills."
        />
        {!loaded ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-56 animate-pulse rounded-2xl bg-slate-200" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {locations.slice(0, 8).map((loc) => {
              const count = countByLocation(loc.id);
              return (
                <Link
                  key={loc.id}
                  to={`/properties?location=${loc.id}`}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="relative h-36 overflow-hidden bg-slate-100">
                    <img
                      src={loc.imageUrl}
                      alt={loc.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(event) => { event.currentTarget.src = "/projects/images/ai-buyer-plots-land.jpg"; }}
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-[color:var(--brand-night)]">
                      {loc.city}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3 p-4">
                    <div className="min-w-0">
                      <h3 className="truncate font-sans text-sm font-bold text-[color:var(--brand-night)]">{loc.name}</h3>
                      <p className="mt-0.5 text-xs text-slate-500">{count} {count === 1 ? "property" : "properties"}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-[color:var(--brand-saffron)]" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* 6. BROWSE BY BUDGET */}
      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8" id="browse-by-budget">
        <div className="rounded-3xl bg-gradient-to-br from-[#fff4ea] to-[#fdf8ef] p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-sans text-xl font-extrabold text-[color:var(--brand-night)] sm:text-2xl">Shop by budget</h2>
              <p className="mt-1 text-sm text-slate-600">Jump straight to properties that fit your plan.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {budgetOptions.slice(1).map((b) => (
                <Link
                  key={b.value}
                  to={`/properties?maxPrice=${b.value}`}
                  className="rounded-full border border-[color:var(--brand-saffron)]/30 bg-white px-4 py-2 text-sm font-semibold text-[color:var(--brand-night)] transition-colors hover:border-[color:var(--brand-saffron)] hover:bg-[color:var(--brand-saffron)] hover:text-white"
                >
                  {b.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHY CHOOSE US */}
      <section className="border-y border-slate-100 bg-slate-50 py-14" id="why-choose-us-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Why Nikunj Heritage"
            title="Buy with confidence, not guesswork"
            subtitle="A local team that knows every lane of Mathura and Vrindavan."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[color:var(--brand-verified)]/10 text-[color:var(--brand-verified)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-sans text-base font-bold text-[color:var(--brand-night)]">{card.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-500">{card.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8" id="how-we-work-timeline">
        <SectionHeader eyebrow="Simple process" title="How it works" />
        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((step, idx) => (
            <li key={step.title} className="relative rounded-2xl border border-slate-200 bg-white p-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--brand-night)] text-sm font-extrabold text-white">
                {idx + 1}
              </span>
              <h3 className="mt-4 font-sans text-base font-bold text-[color:var(--brand-night)]">{step.title}</h3>
              <p className="mt-1 text-sm leading-6 text-slate-500">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 9. BUYER TOOLS */}
      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8" id="buyer-tools">
        <SectionHeader eyebrow="Tools" title="Plan your purchase" subtitle="Free tools to help you decide faster." />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { title: "ROI & EMI Calculator", text: "Estimate returns, rental yield and monthly EMI.", href: "/roi-calculator", icon: Calculator },
            { title: "Compare Properties", text: "Put up to 3 projects side by side on price, size and location.", href: "/compare-properties", icon: Scale },
            { title: "Home Loan Partners", text: "See current rates from banks and NBFCs.", href: "/finance", icon: TrendingUp }
          ].map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.title}
                to={tool.href}
                className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-[color:var(--brand-saffron)]/50 hover:shadow-lg"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[color:var(--brand-night)] text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-sans text-base font-bold text-[color:var(--brand-night)]">{tool.title}</h3>
                  <p className="mt-0.5 text-sm text-slate-500">{tool.text}</p>
                </div>
                <ChevronRight className="h-5 w-5 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-[color:var(--brand-saffron)]" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* 10. TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="bg-[color:var(--brand-night)] py-14 text-white" id="testimonials-section">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--brand-gold)]">Testimonials</span>
                <h2 className="mt-1.5 font-sans text-2xl font-extrabold tracking-tight sm:text-3xl" style={{ color: "#FFFFFF" }}>What our buyers say</h2>
              </div>
              <Link to="/testimonials" className="inline-flex w-fit items-center gap-1 text-sm font-bold text-[color:var(--brand-gold)] hover:underline">
                Read all reviews
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {testimonials.slice(0, 3).map((t) => (
                <figure key={t.id} className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6">
                  <Quote className="h-6 w-6 text-[color:var(--brand-gold)]" />
                  <blockquote className="mt-3 flex-1 text-sm leading-6 text-white/80 line-clamp-5">{t.text}</blockquote>
                  <figcaption className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--brand-saffron)] text-sm font-bold text-white">
                      {t.name.charAt(0)}
                    </span>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-bold text-white">{t.name}</div>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`h-3.5 w-3.5 ${i < t.stars ? "fill-[color:var(--brand-gold)] text-[color:var(--brand-gold)]" : "text-white/20"}`} />
                        ))}
                      </div>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 11. BLOGS */}
      {blogs.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8" id="blogs-section">
          <SectionHeader
            eyebrow="Insights"
            title="Latest news & guides"
            action={{ label: "View all articles", href: "/blogs" }}
          />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {blogs.map((blog) => (
              <Link
                key={blog.id}
                to={`/blogs/${blog.slug}`}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:shadow-lg"
              >
                <div className="h-44 overflow-hidden bg-slate-100">
                  <img
                    src={blog.coverUrl}
                    alt={blog.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(event) => { event.currentTarget.src = "/projects/images/ai-buyer-spiritual-retreat.jpg"; }}
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-bold text-[color:var(--brand-saffron)]">{blog.category}</span>
                  <h3 className="mt-1.5 line-clamp-2 font-sans text-base font-bold leading-snug text-[color:var(--brand-night)] group-hover:text-[color:var(--brand-saffron)]">
                    {blog.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                    {blog.content.replace(/[#*`_]/g, "").slice(0, 140)}…
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 12. FAQ */}
      <section className="border-t border-slate-100 bg-slate-50 py-14" id="faq-section">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-4">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--brand-saffron)]">FAQs</span>
            <h2 className="mt-1.5 font-sans text-2xl font-extrabold tracking-tight text-[color:var(--brand-night)] sm:text-3xl">
              Questions buyers ask us
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Can't find your answer? <Link to="/contact-us" className="font-bold text-[color:var(--brand-saffron)]">Contact our team</Link>.
            </p>
          </div>
          <div className="space-y-3 lg:col-span-8">
            {faqItems.map((item, index) => {
              const open = openFaq === index;
              return (
                <div key={item.question} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : index)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-sans text-sm font-bold text-[color:var(--brand-night)] sm:text-base">{item.question}</span>
                    <ChevronDown className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="px-5 pb-5 text-sm leading-6 text-slate-600">{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 13. CTA BAND */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8" id="homepage-callback">
        <div className="grid items-center gap-8 overflow-hidden rounded-3xl bg-gradient-to-br from-[color:var(--brand-saffron)] to-[#c4511a] p-6 text-white sm:p-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="font-sans text-2xl font-extrabold sm:text-3xl" style={{ color: "#FFFFFF" }}>
              Looking for the right property in Vrindavan?
            </h2>
            <p className="mt-2 max-w-xl text-sm text-white/85 sm:text-base">
              Share your requirement and get a verified shortlist with a free guided site visit.
            </p>
            <ul className="mt-5 grid gap-2 text-sm text-white/90 sm:grid-cols-2">
              {["Verified, RERA-focused projects", "No hidden charges", "Home loan assistance", "Registry & possession support"].map((point) => (
                <li key={point} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-[color:var(--brand-night)] hover:bg-white/90">
                <PhoneCall className="h-4 w-4" />
                +91 97199 20888
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-5 py-3 text-sm font-bold text-white hover:bg-white/10">
                <MessageSquare className="h-4 w-4" />
                WhatsApp us
              </a>
            </div>
          </div>
          <div className="rounded-2xl bg-white p-5 text-[color:var(--brand-night)] shadow-xl lg:col-span-5">
            <h3 className="mb-3 font-sans text-base font-extrabold">Request a callback</h3>
            {renderLeadForm(true)}
          </div>
        </div>
      </section>

      {/* 14. SEO SERVICE AREAS */}
      <section className="border-t border-slate-100 py-10" id="seo-service-areas">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-sans text-sm font-bold uppercase tracking-wider text-slate-500">Popular searches</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {seoKeywords.map((keyword) => (
              <Link
                key={keyword}
                to={`/properties?search=${encodeURIComponent(keyword.split(" ").slice(-1)[0])}`}
                className="rounded-full border border-slate-200 px-3 py-1.5 text-xs text-slate-600 transition-colors hover:border-[color:var(--brand-saffron)] hover:text-[color:var(--brand-saffron)]"
              >
                {keyword}
              </Link>
            ))}
            <Link to="/vrindavan-real-estate" className="rounded-full border border-slate-200 px-3 py-1.5 text-xs text-slate-600 hover:border-[color:var(--brand-saffron)] hover:text-[color:var(--brand-saffron)]">Vrindavan real estate guide</Link>
            <Link to="/mathura-real-estate" className="rounded-full border border-slate-200 px-3 py-1.5 text-xs text-slate-600 hover:border-[color:var(--brand-saffron)] hover:text-[color:var(--brand-saffron)]">Mathura real estate guide</Link>
          </div>
        </div>
      </section>

      {/* Floating enquiry trigger */}
      {!showEnquiryModal && (
        <button
          type="button"
          onClick={() => setShowEnquiryModal(true)}
          className="fixed bottom-24 right-4 z-40 hidden items-center gap-2 rounded-full bg-[color:var(--brand-night)] px-4 py-3 text-xs font-bold text-white shadow-xl transition-colors hover:bg-[color:var(--brand-night-soft)] sm:bottom-24 sm:inline-flex"
        >
          <Users className="h-4 w-4" />
          Enquire now
        </button>
      )}

      {/* Enquiry modal */}
      <AnimatePresence>
        {showEnquiryModal && (
          <div className="fixed inset-0 z-[120] flex items-end justify-center p-0 sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-label="Enquiry form">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEnquiryModal(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-md overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
            >
              <div className="flex items-start justify-between gap-3 bg-[color:var(--brand-night)] px-5 py-4 text-white">
                <div>
                  <h2 className="font-sans text-lg font-extrabold" style={{ color: "#FFFFFF" }}>Get the best deals in Vrindavan</h2>
                  <p className="mt-0.5 text-xs text-white/70">Free site visit · Verified projects · Loan help</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowEnquiryModal(false)}
                  className="rounded-full bg-white/10 p-1.5 text-white hover:bg-white/20"
                  aria-label="Close enquiry form"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
                {renderLeadForm()}
                <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Award className="h-3.5 w-3.5 text-[color:var(--brand-gold)]" /> Trusted advisor</span>
                  <span className="flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5 text-[color:var(--brand-verified)]" /> 100% secure</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default Home;
