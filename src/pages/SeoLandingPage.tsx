import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, MapPin, ShieldCheck, TrendingUp } from "lucide-react";
import { SeoHead } from "../components/seo/SeoHead";
import { DEFAULT_OG_IMAGE, SITE_URL } from "../lib/seo";

interface LandingConfig {
  path: string;
  eyebrow: string;
  title: string;
  description: string;
  keywords: string[];
  h1: string;
  intro: string;
  locations: string[];
  propertyTypes: string[];
  faqs: { question: string; answer: string }[];
}

const landingPages: Record<string, LandingConfig> = {
  "/mathura-real-estate": {
    path: "/mathura-real-estate",
    eyebrow: "Mathura Property Advisory",
    title: "Mathura Real Estate | Property in Mathura, Plots, Villas & Commercial Spaces",
    description:
      "Explore Mathura real estate opportunities with Nikunj Heritage Infrabuild, including residential properties, commercial spaces, plots, and investment-ready locations near Vrindavan corridors.",
    keywords: [
      "Mathura real estate",
      "Mathura realestate",
      "property in Mathura",
      "Mathura property",
      "plots in Mathura",
      "commercial property in Mathura",
      "Mathura Vrindavan property investment",
    ],
    h1: "Mathura Real Estate",
    intro:
      "Nikunj Heritage Infrabuild helps buyers compare Mathura property options with practical location study, verified documentation guidance, and investment-focused advisory across residential, commercial, and plotted segments.",
    locations: ["Mathura City Center", "Mathura-Vrindavan Road", "NH-2 Highway Corridor", "Rukmini Vihar Approach", "Govardhan Connector"],
    propertyTypes: ["Residential apartments", "Freehold plots", "Commercial shops and offices", "Luxury villas", "Investment land parcels"],
    faqs: [
      {
        question: "Is Mathura real estate good for investment?",
        answer:
          "Mathura benefits from religious tourism, improving connectivity, and spillover demand from Vrindavan, making selected verified locations attractive for long-term buyers and investors.",
      },
      {
        question: "Which Mathura locations are important for property buyers?",
        answer:
          "Key buyer zones include Mathura City Center, Mathura-Vrindavan Road, NH-2 corridor pockets, and areas with clean access to Vrindavan, Govardhan, and railway connectivity.",
      },
    ],
  },
  "/vrindavan-real-estate": {
    path: "/vrindavan-real-estate",
    eyebrow: "Vrindavan Property Advisory",
    title: "Vrindavan Real Estate | Properties, Villas, Flats & Plots in Vrindavan",
    description:
      "Find Vrindavan real estate opportunities including flats, villas, plots, spiritual retreats, and commercial property near Banke Bihari, Prem Mandir, ISKCON, and Rukmini Vihar.",
    keywords: [
      "Vrindavan real estate",
      "Vrindavan realestate",
      "property in Vrindavan",
      "properties in Vrindavan",
      "plots in Vrindavan",
      "villas in Vrindavan",
      "flats in Vrindavan",
      "Rukmini Vihar property",
      "property near Prem Mandir",
      "property near Banke Bihari Temple",
    ],
    h1: "Vrindavan Real Estate",
    intro:
      "Vrindavan buyers often look beyond generic property filters. Temple proximity, peaceful access, registry clarity, and long-term spiritual tourism demand all matter. Nikunj Heritage Infrabuild organizes those factors into clear buyer guidance.",
    locations: ["Rukmini Vihar", "Prem Mandir Belt", "Banke Bihari Access Zone", "ISKCON Vrindavan Area", "Yamuna View Pockets"],
    propertyTypes: ["Flats in Vrindavan", "Luxury haveli villas", "Spiritual retreat homes", "Commercial frontage", "Registry-ready plots"],
    faqs: [
      {
        question: "Which property type is popular in Vrindavan?",
        answer:
          "Flats, second homes, haveli-style villas, and freehold plots are popular because buyers often want temple access, family use, and long-term appreciation potential.",
      },
      {
        question: "What should buyers check before buying property in Vrindavan?",
        answer:
          "Buyers should check title clarity, RERA status where applicable, registry records, approach road access, parking, water, local services, and real distance from key temples.",
      },
    ],
  },
  "/properties-in-vrindavan-mathura": {
    path: "/properties-in-vrindavan-mathura",
    eyebrow: "Braj Property Search",
    title: "Properties in Vrindavan and Mathura | Flats, Villas, Plots & Commercial Property",
    description:
      "Compare properties in Vrindavan and Mathura with Nikunj Heritage Infrabuild, including flats, villas, plots, commercial spaces, and investment-ready locations.",
    keywords: [
      "properties in Vrindavan and Mathura",
      "property in Vrindavan and Mathura",
      "Mathura Vrindavan properties",
      "Vrindavan Mathura real estate",
      "Braj property investment",
      "flats villas plots Mathura Vrindavan",
    ],
    h1: "Properties in Vrindavan and Mathura",
    intro:
      "Nikunj Heritage Infrabuild brings Mathura and Vrindavan property options into one clear buyer journey so families, investors, NRIs, and devotional second-home buyers can compare location, price, documents, and future value.",
    locations: ["Vrindavan", "Mathura", "Govardhan", "Barsana", "Mathura-Vrindavan Ring Road"],
    propertyTypes: ["Ready-to-move flats", "Premium villas", "Commercial spaces", "Plots and land", "Spiritual retreat properties"],
    faqs: [
      {
        question: "How do I compare properties in Vrindavan and Mathura?",
        answer:
          "Compare budget, exact location, legal status, amenities, access roads, temple proximity, and resale potential. Nikunj Heritage helps shortlist verified options across both markets.",
      },
      {
        question: "Are Vrindavan and Mathura suitable for NRI property buyers?",
        answer:
          "Yes, many out-of-town and NRI buyers look at this belt for second homes, spiritual stays, and long-term investments, provided documentation and local due diligence are handled carefully.",
      },
    ],
  },
};

export const SeoLandingPage: React.FC<{ page: keyof typeof landingPages }> = ({ page }) => {
  const data = landingPages[page];

  return (
    <div className="bg-[#FAF6F0] min-h-screen text-[#0F172A]">
      <SeoHead
        title={data.title}
        description={data.description}
        pathname={data.path}
        keywords={data.keywords}
        image={DEFAULT_OG_IMAGE}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            name: "Nikunj Heritage Infrabuild",
            url: SITE_URL,
            areaServed: data.locations,
            serviceType: data.h1,
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: data.faqs.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          },
        ]}
      />

      <section className="relative overflow-hidden bg-[#0F172A] text-white">
        <img
          src="/projects/images/vrindavan-cover.png"
          alt={`${data.h1} by Nikunj Heritage Infrabuild`}
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/80 to-[#0F172A]/30" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.28em] text-[#FACC15]">{data.eyebrow}</span>
          <h1 className="mt-4 max-w-4xl font-serif text-3xl font-black leading-tight text-white sm:text-5xl md:text-6xl">
            {data.h1}
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">{data.intro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              to="/properties"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#FB923C] px-5 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#EA580C]"
            >
              Explore Properties <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact-us"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-5 py-3 text-sm font-bold uppercase tracking-wider text-white backdrop-blur transition-colors hover:bg-white/15"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="rounded-lg border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <MapPin className="h-7 w-7 text-[#FB923C]" />
          <h2 className="mt-4 font-serif text-2xl font-bold">Important Locations</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {data.locations.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <Building2 className="h-7 w-7 text-[#0F6E56]" />
          <h2 className="mt-4 font-serif text-2xl font-bold">Property Types</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {data.propertyTypes.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <ShieldCheck className="h-7 w-7 text-[#FACC15]" />
          <h2 className="mt-4 font-serif text-2xl font-bold">Buyer Checks</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            We help verify location fit, registry readiness, RERA status where applicable, access roads, amenities, floor plans, and buyer suitability before a site visit.
          </p>
        </div>
      </section>

      <section className="border-y border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-6 w-6 text-[#FB923C]" />
            <h2 className="font-serif text-3xl font-bold">Why Buyers Search This Market</h2>
          </div>
          <p className="mt-5 max-w-4xl text-base leading-8 text-slate-600">
            Mathura and Vrindavan real estate demand is shaped by temple access, devotional tourism, retirement and second-home interest, road connectivity, and long-term land scarcity near established spiritual neighborhoods. Nikunj Heritage Infrabuild positions each recommendation around these ground realities instead of generic property marketing.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="text-center font-serif text-3xl font-bold">Frequently Asked Questions</h2>
        <div className="mt-8 space-y-4">
          {data.faqs.map((item) => (
            <div key={item.question} className="rounded-lg border border-[#E2E8F0] bg-white p-5">
              <h3 className="font-serif text-xl font-bold">{item.question}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SeoLandingPage;
