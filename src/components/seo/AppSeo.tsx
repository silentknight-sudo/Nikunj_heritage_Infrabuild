import React from "react";
import { useLocation } from "react-router-dom";
import { SeoHead } from "./SeoHead";
import { DEFAULT_OG_IMAGE, SITE_NAME } from "../../lib/seo";

const routeMeta: Record<string, { title: string; description: string; keywords: string[]; type?: "website" | "article"; noindex?: boolean }> = {
  "/": {
    title: "Nikunj Heritage Infrabuild | Vrindavan Property, Mathura Real Estate & Investment",
    description:
      "Discover verified villas, apartments, commercial spaces, and land opportunities in Vrindavan and Mathura with Nikunj Heritage Infrabuild.",
    keywords: ["Vrindavan investment property", "Mathura villas", "property dealer in Vrindavan", "real estate consultant Mathura"],
  },
  "/properties": {
    title: "Properties in Vrindavan & Mathura | Nikunj Heritage Infrabuild",
    description:
      "Browse residential apartments, luxury villas, freehold land plots, and commercial properties in Vrindavan, Mathura, Govardhan, and Barsana.",
    keywords: ["Vrindavan apartments", "Mathura plots", "commercial property in Vrindavan", "luxury villa Vrindavan"],
  },
  "/about-us": {
    title: "About Nikunj Heritage Infrabuild | Vrindavan Real Estate Company",
    description:
      "Learn about Nikunj Heritage Infrabuild, our Vrindavan-first real estate vision, legal diligence, and buyer advisory approach across Mathura and Braj.",
    keywords: ["about Nikunj Heritage Infrabuild", "Vrindavan real estate company", "Mathura property advisory"],
  },
  "/contact-us": {
    title: "Contact Nikunj Heritage Infrabuild | Vrindavan Office & Site Visits",
    description:
      "Contact Nikunj Heritage Infrabuild for site visits, project details, property investment guidance, and verified real estate support in Vrindavan and Mathura.",
    keywords: ["contact Vrindavan property dealer", "Nikunj Heritage office", "site visit Vrindavan property"],
  },
  "/blogs": {
    title: "Vrindavan Property Blog | Nikunj Heritage Infrabuild",
    description:
      "Read insights on Vrindavan property trends, Mathura real estate updates, buyer guides, legal checks, and investment perspectives.",
    keywords: ["Vrindavan property blog", "Mathura real estate news", "property investment guide Vrindavan"],
  },
  "/news": {
    title: "Vrindavan Real Estate News | Nikunj Heritage Infrabuild",
    description:
      "Follow real estate, infrastructure, regulation, and market updates shaping Vrindavan, Mathura, Govardhan, and the wider Braj investment belt.",
    keywords: ["Vrindavan real estate news", "Mathura infrastructure news", "Braj property market updates"],
  },
  "/developers": {
    title: "Developers & Delivery Standards | Nikunj Heritage Infrabuild",
    description:
      "Explore the build philosophy, legal diligence, delivery standards, and development milestones that support Nikunj Heritage Infrabuild projects.",
    keywords: ["Vrindavan developer", "RERA approved developer Vrindavan", "Mathura real estate developer"],
  },
  "/roi-calculator": {
    title: "Vrindavan ROI Calculator | Nikunj Heritage Infrabuild",
    description:
      "Estimate property appreciation scenarios, entry budgets, and investment outcomes for Vrindavan and Mathura real estate opportunities.",
    keywords: ["Vrindavan ROI calculator", "property return calculator", "Mathura investment calculator"],
  },
  "/compare-properties": {
    title: "Compare Vrindavan Properties | Nikunj Heritage Infrabuild",
    description:
      "Compare location, price, area, and buyer suitability across multiple Vrindavan and Mathura real estate opportunities in one place.",
    keywords: ["compare Vrindavan property", "Mathura project comparison"],
  },
  "/events": {
    title: "Events & Site Visit Experiences | Nikunj Heritage Infrabuild",
    description:
      "View upcoming site visits, investment events, and community experiences organized around Vrindavan and Mathura property opportunities.",
    keywords: ["Vrindavan site visit", "property events Mathura"],
  },
  "/career": {
    title: "Careers at Nikunj Heritage Infrabuild",
    description:
      "Explore career opportunities with Nikunj Heritage Infrabuild across sales, advisory, marketing, and customer support functions.",
    keywords: ["real estate jobs Vrindavan", "careers Nikunj Heritage"],
  },
  "/testimonials": {
    title: "Client Testimonials | Nikunj Heritage Infrabuild",
    description:
      "See customer experiences, trust signals, and buyer feedback about Nikunj Heritage Infrabuild’s Vrindavan and Mathura property guidance.",
    keywords: ["Nikunj Heritage reviews", "Vrindavan property testimonials"],
  },
  "/life-at-nhi": {
    title: "Life at NHI | Community & Buyer Experience",
    description:
      "Explore the community experience, spiritual setting, and lifestyle perspectives behind the Nikunj Heritage Infrabuild brand.",
    keywords: ["life at nikunj heritage", "Vrindavan buyer lifestyle"],
  },
  "/admin": {
    title: "Admin Panel | Nikunj Heritage Infrabuild",
    description: "Administrative access for Nikunj Heritage Infrabuild content, leads, and publishing workflows.",
    keywords: [],
    noindex: true,
  },
};

export const AppSeo: React.FC = () => {
  const location = useLocation();
  const meta = routeMeta[location.pathname] || {
    title: `${SITE_NAME} | Vrindavan Real Estate`,
    description: "Verified property guidance and real estate information for Vrindavan, Mathura, and Braj investment corridors.",
    keywords: ["Vrindavan real estate", "Mathura property"],
  };

  return (
    <SeoHead
      title={meta.title}
      description={meta.description}
      keywords={meta.keywords}
      pathname={location.pathname}
      type={meta.type}
      noindex={meta.noindex}
      image={DEFAULT_OG_IMAGE}
    />
  );
};
