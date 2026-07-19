import { Property } from "../types";

export interface MediaCard {
  title: string;
  subtitle: string;
  image: string;
}

export interface ProjectMediaBundle {
  eyebrow: string;
  title: string;
  summary: string;
  contextNote?: string;
  isThirdPartyReference?: boolean;
  brochureUrl?: string;
  floorPlanUrl?: string;
  sitePlanUrl?: string;
  videoUrl?: string;
  videoPoster?: string;
  highlights: string[];
  gallery: MediaCard[];
  floorPlans: MediaCard[];
}

const vrindavanOverview: ProjectMediaBundle = {
  eyebrow: "Buyer Enquiry Story",
  title: "Why buyers shortlist Vrindavan for property, returns, and trust",
  summary:
    "This section is built to move visitors toward enquiry: it explains why Vrindavan and Mathura attract serious buyers, what makes the micro-market credible, and how Nikunj Heritage can guide a shortlist, site visit, and purchase decision.",
  brochureUrl: "/projects/documents/vrindavan-investment-docket.pdf",
  videoUrl: "/projects/videos/vrindavan-township-drive.mp4",
  videoPoster: "/projects/images/vrindavan-township-drive-poster.jpg",
  highlights: [
    "Clear reasons to enquire: temple proximity, market trust, and liveability",
    "Site-visit support and comparison guidance for serious buyers",
    "A practical path from interest to shortlist to booking"
  ],
  gallery: [
    {
      title: "Enquiry Ready View",
      subtitle: "Premium real-estate setting with strong buyer intent",
      image: "/projects/images/mathura-vrindavan-hero-enquiry.jpg"
    },
    {
      title: "Guided Site Visit",
      subtitle: "Advisory-led walkthrough for property buyers",
      image: "/projects/images/mathura-vrindavan-site-visit.jpg"
    },
    {
      title: "Growth Corridor",
      subtitle: "Connectivity and appreciation story",
      image: "/projects/images/mathura-vrindavan-growth-corridor.jpg"
    },
    {
      title: "Livability Aerial",
      subtitle: "Aerial context for family buyers and investors",
      image: "/projects/images/mathura-vrindavan-aerial-livability.jpg"
    }
  ],
  floorPlans: [
    {
      title: "Shortlist Map",
      subtitle: "A simple comparison reference for buyers",
      image: "/projects/images/mathura-vrindavan-growth-corridor.jpg"
    }
  ]
};

const courtyardCommercial: ProjectMediaBundle = {
  eyebrow: "Associated Market Reference",
  title: "Commercial reference visuals and planning sheets",
  summary:
    "This media is kept only as a contextual market reference for commercial scale, frontage, and planning language. It should not be presented as a Nikunj Heritage-owned flagship unless there is a formal association to state clearly.",
  contextNote:
    "Reference media only. Use this section only when the project is being shown as an associated project, market study, or authorized partner inventory.",
  isThirdPartyReference: true,
  brochureUrl: "/projects/documents/courtyard-vrindavan-brochure.pdf",
  floorPlanUrl: "/projects/documents/courtyard-floor-plan-booklet.pdf",
  sitePlanUrl: "/projects/documents/omaxe-eternity-layout-plan.pdf",
  videoUrl: "/projects/videos/courtyard-walkthrough.mp4",
  videoPoster: "/projects/images/courtyard-walkthrough-poster.jpg",
  highlights: [
    "Commercial facade renders for first-impression impact",
    "Atrium visuals to communicate premium retail ambience",
    "Floor-by-floor planning sheets for serious buyers"
  ],
  gallery: [
    {
      title: "Reference Brochure Cover",
      subtitle: "Associated commercial project identity",
      image: "/projects/images/courtyard-brochure-cover.png"
    },
    {
      title: "Location and Highlights",
      subtitle: "Map-led positioning and key advantages",
      image: "/projects/images/courtyard-highlights-map.png"
    },
    {
      title: "Commercial Frontage",
      subtitle: "Reference for arrival and visibility",
      image: "/projects/images/commercial-exterior-evening.png"
    },
    {
      title: "Premium Atrium",
      subtitle: "Central retail ambience and circulation",
      image: "/projects/images/commercial-atrium.png"
    },
    {
      title: "Fountain Court",
      subtitle: "High-footfall interior destination zone",
      image: "/projects/images/commercial-fountain-atrium.png"
    }
  ],
  floorPlans: [
    {
      title: "Site Plan",
      subtitle: "Overall placement and circulation",
      image: "/projects/images/floorplan-site-plan.png"
    },
    {
      title: "Ground Floor Plan",
      subtitle: "Primary commercial level",
      image: "/projects/images/floorplan-ground-floor.png"
    },
    {
      title: "First Floor Plan",
      subtitle: "Upper retail planning",
      image: "/projects/images/floorplan-first-floor.png"
    },
    {
      title: "Second Floor Plan",
      subtitle: "Additional trading layer",
      image: "/projects/images/floorplan-second-floor.png"
    },
    {
      title: "Third Floor Plan",
      subtitle: "Expanded program distribution",
      image: "/projects/images/floorplan-third-floor.png"
    },
    {
      title: "Fourth Floor Plan",
      subtitle: "Top-level planning reference",
      image: "/projects/images/floorplan-fourth-floor.png"
    }
  ]
};

export const homeMediaShowcase = {
  overview: vrindavanOverview,
  commercial: courtyardCommercial
};

export function getPropertyMedia(property: Property): ProjectMediaBundle {
  if (
    property.slug === "the-vrinda-bazaar-retail-plaza" ||
    property.slug === "shree-vrindavan-commercial-hub-offices" ||
    property.categoryId === "commercial-spaces"
  ) {
    return courtyardCommercial;
  }

  return vrindavanOverview;
}
