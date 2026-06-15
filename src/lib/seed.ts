/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { doc, writeBatch, collection, getDocs, deleteDoc, Timestamp, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import { PropertyStatus } from "../types";

export const CATEGORIES_SEED = [
  {
    id: "residential-apartments",
    name: "Residential Apartments",
    slug: "residential-apartments",
    icon: "Building",
    description: "Peaceful modern flats near the Yamuna River, steps away from divine shrines & temples.",
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=600",
    sortOrder: 1,
    active: true
  },
  {
    id: "luxury-villas",
    name: "Luxury Villas",
    slug: "luxury-villas",
    icon: "Home",
    description: "Sprawling traditional villas with private internal courtyards, inspired by Indian heritage havelis.",
    imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=600",
    sortOrder: 2,
    active: true
  },
  {
    id: "commercial-spaces",
    name: "Commercial Spaces",
    slug: "commercial-spaces",
    icon: "Briefcase",
    description: "Prime retail showrooms and office spaces in Mathura's fast-expanding commercial zones.",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600",
    sortOrder: 3,
    active: true
  },
  {
    id: "plots-and-land",
    name: "Plots & Land",
    slug: "plots-and-land",
    icon: "Trees",
    description: "Invest in secure, freehold sacred parcels of land near Govardhan Hill and Vrindavan corridor.",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=600",
    sortOrder: 4,
    active: true
  },
  {
    id: "spiritual-retreats",
    name: "Spiritual Retreats",
    slug: "spiritual-retreats",
    icon: "Flame",
    description: "Spiritual ashram-style weekend gateway homes with meditation spaces and organic gardens.",
    imageUrl: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&q=80&w=600",
    sortOrder: 5,
    active: true
  }
];

export const LOCATIONS_SEED = [
  {
    id: "vrindavan-bihari",
    name: "Vrindavan (Rukmani Vihar)",
    slug: "vrindavan-rukmani-vihar",
    city: "Vrindavan",
    description: "Highly sought-after spiritual residential zone near Banke Bihari, Prem Mandir and ISKCON temples.",
    imageUrl: "https://images.unsplash.com/photo-1545229765-7018d6ff02bd?auto=format&fit=crop&q=80&w=600",
    latitude: 27.565,
    longitude: 77.685,
    active: true
  },
  {
    id: "mathura-city",
    name: "Mathura City Center",
    slug: "mathura-city-center",
    city: "Mathura",
    description: "In the heart of the ancient city, steps from Sri Krishna Janmabhoomi Temple and Dwarkadhish Mandir.",
    imageUrl: "https://images.unsplash.com/photo-1561361531-79f20c41fcde?auto=format&fit=crop&q=80&w=600",
    latitude: 27.492,
    longitude: 77.673,
    active: true
  },
  {
    id: "govardhan-hill",
    name: "Govardhan Corridor",
    slug: "govardhan-corridor",
    city: "Govardhan",
    description: "Serene sacred lands flanking the divine path of the historic Govardhan Parikrama hill.",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=600",
    latitude: 27.498,
    longitude: 77.467,
    active: true
  },
  {
    id: "nh2-corridor",
    name: "NH-2 Highway Corridor",
    slug: "nh2-highway-corridor",
    city: "Mathura",
    description: "High-octane central commercial zone connecting Delhi-NCR to central Agra, perfect for trade.",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600",
    latitude: 27.512,
    longitude: 77.661,
    active: true
  },
  {
    id: "barsana-heritage",
    name: "Barsana Sanctuary",
    slug: "barsana-sanctuary",
    city: "Barsana",
    description: "Spiritual heritage retreat enclave at the roots of Radha Rani's divine childhood home hill.",
    imageUrl: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&q=80&w=600",
    latitude: 27.649,
    longitude: 77.375,
    active: true
  },
  {
    id: "ring-road-junction",
    name: "Mathura-Vrindavan Ring Road",
    slug: "mathura-vrindavan-ring-road",
    city: "Mathura",
    description: "The fastest-scaling smart transit network connecting old Mathura and Vrindavan high-rises.",
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=600",
    latitude: 27.535,
    longitude: 77.695,
    active: true
  }
];

export const PROPERTIES_SEED = [
  {
    id: "keshav-heights-2bhk",
    title: "Keshav Divine Heights - 2 BHK",
    slug: "keshav-divine-heights-2bhk",
    categoryId: "residential-apartments",
    locationId: "vrindavan-bihari",
    status: PropertyStatus.NEW_LAUNCH,
    price: 4800000, // 48 L
    area: 1150,
    bhk: "2 BHK Apartment",
    floor: "4th of 10 Floors",
    facing: "East (Temple Facing)",
    possessionDate: "December 2027",
    reraNumber: "UPRERAPRJ982361",
    developerId: "Nikunj Infrabuild",
    description: "Waking up to the distant temple bells of Rukmani Vihar. This spacious vastu-compliant apartment features wide open balconies offering side-views of the incoming Vrindavan pilgrim routes. It is fitted with imported marble, smart safety gates, and is placed inside a boundary-walled secure enclave with 24/7 power backup and direct access to clean ground water filters.",
    imageUrls: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800"
    ],
    amenities: ["24/7 Security", "Vastu Compliant", "Temple View Balcony", "Power Backup", "Meditation Hall", "Kids Play Area"],
    landmarks: [
      { name: "Prem Mandir", distance: "1.2 km" },
      { name: "ISKCON Vrindavan", distance: "1.8 km" },
      { name: "Banke Bihari Temple", distance: "2.5 km" },
      { name: "Yamuna Ghat", distance: "3.0 km" }
    ],
    featured: true,
    newLaunch: true,
    exclusive: false
  },
  {
    id: "gopal-nivas-villa",
    title: "Gopal Nivas Heritage Mansion",
    slug: "gopal-nivas-heritage-mansion",
    categoryId: "luxury-villas",
    locationId: "vrindavan-bihari",
    status: PropertyStatus.READY,
    price: 18500000, // 1.85 Cr
    area: 3200,
    bhk: "4 BHK Luxury Haveli Villa",
    floor: "G + 1 Independent Haveli",
    facing: "North-East Facing",
    possessionDate: "Immediate Possession",
    reraNumber: "UPRERAPRJ114522",
    developerId: "Nikunj Infrabuild",
    description: "Step into an ancient royal shelter loaded with modern hyper-luxury assets. Gopal Nivas is structured with hand-carved pillars, red sandstone ornamental arches inspired by Vrindavan's legendary court temples, and a sacred central courtyard featuring a floating marble Tulsi Vrindavan altar. Complete with customized royal swing fixtures, high-height timber wood ceilings, and state-of-the-art modular kitchen platforms.",
    imageUrls: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800"
    ],
    amenities: ["Private Courtyard", "Sandstone Carved Arches", "Tulsi Altar Setup", "Personal Parking", "Home Automation", "Private Terrace Garden"],
    landmarks: [
      { name: "Banke Bihari Temple", distance: "1.5 km" },
      { name: "Radha Raman Temple", distance: "1.9 km" },
      { name: "Nidhivan Forest Gate", distance: "1.4 km" }
    ],
    featured: true,
    newLaunch: false,
    exclusive: true
  },
  {
    id: "yamuna-breeze-luxury",
    title: "Yamuna Breeze Premium Apartments",
    slug: "yamuna-breeze-premium-apartments",
    categoryId: "residential-apartments",
    locationId: "mathura-city",
    status: PropertyStatus.CONSTRUCTION,
    price: 6500000, // 65 Lacs
    area: 1450,
    bhk: "3 BHK Apartment",
    floor: "8th of 12 Floors",
    facing: "East (Yamuna River Facing)",
    possessionDate: "August 2026",
    reraNumber: "UPRERAPRJ428172",
    developerId: "Heritage Promoters",
    description: "Experience the eternal tranquility of Mathura. Placed elegantly at a hand-shake distance to historic Yamuna ghat paths, this high-rise 3 BHK offers panoramic visuals of morning Yamuna Aarti right from your masters balcony. Includes structural earthquake-proof styling, high-speed lift bays and immediate connectivity into local main commercial bazaars.",
    imageUrls: [
      "https://images.unsplash.com/photo-1545229765-7018d6ff02bd?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=800"
    ],
    amenities: ["Yamuna Aarti View", "Rooftop Yoga Center", "Underground Parking", "Water Treatment Plant", "Gymnasium", "24/7 Security Surveillance"],
    landmarks: [
      { name: "Krishna Janmabhoomi", distance: "1.8 km" },
      { name: "Dwarkadhish Temple", distance: "1.0 km" },
      { name: "Yamuna Ghat Pathway", distance: "0.2 km" },
      { name: "Mathura Junction station", distance: "2.8 km" }
    ],
    featured: false,
    newLaunch: false,
    exclusive: false
  },
  {
    id: "vrinda-bazaar-plaza",
    title: "The Vrinda Bazaar Retail Plaza",
    slug: "the-vrinda-bazaar-retail-plaza",
    categoryId: "commercial-spaces",
    locationId: "nh2-corridor",
    status: PropertyStatus.CONSTRUCTION,
    price: 11000000, // 1.1 Cr
    area: 850,
    bhk: "Premium Ground Floor Retail Space",
    floor: "Ground Level Showroom",
    facing: "Front High-Traffic Entrance",
    possessionDate: "March 2027",
    reraNumber: "UPRERAPRJ882191",
    developerId: "Nikunj Infrabuild",
    description: "Take profit from our highly integrated location inside Mathura's fastest expanding transport corridor. Vrinda Bazaar Retail Plaza features giant double-height storefront spaces, standard utility outlets, and central air ventilation. Perfect for sweet brand flagships, luxury textile stores, or high-footfall organic Ayurvedic pharmacos.",
    imageUrls: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80&w=800"
    ],
    amenities: ["Central Air Conditioning", "Power Smart Grid", "Escalators and Lifts", "Spacious Visitor Parking", "Wet Loading Dock", "Fiber Internet"],
    landmarks: [
      { name: "Mathura Toll Gate", distance: "3.5 km" },
      { name: "Highway Plaza Junction", distance: "0.5 km" },
      { name: "Vrindavan Entry Arch", distance: "4.0 km" }
    ],
    featured: true,
    newLaunch: false,
    exclusive: false
  },
  {
    id: "govardhan-krishna-plots",
    title: "Govardhan Giri Freehold Plots",
    slug: "govardhan-giri-freehold-plots",
    categoryId: "plots-and-land",
    locationId: "govardhan-hill",
    status: PropertyStatus.NEW_LAUNCH,
    price: 3500000, // 35 Lacs
    area: 1800, // in sq ft
    bhk: "Residential Plot (200 Square Yards)",
    floor: "N/A - Prime Ground Plot",
    facing: "Giriraj Parikrama Road Facing",
    possessionDate: "Immediate Boundary Delivery",
    reraNumber: "UPRERAPRJ292122",
    developerId: "Krishna Brij Estates",
    description: "An unbelievable investment prospect right alongside the historic parikrama route of holy Govardhan Hill. These fully demarcated premium plot blocks are freehold, registry-cleared out, and ready for double-height villa construct permissions under RERA directives. Includes solid boundary roads, standard plumbing provisions, and dense plantation setups.",
    imageUrls: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&q=80&w=800"
    ],
    amenities: ["Gated Colony Boundary", "Blacktop Roads", "Streetlighting", "Aroma Alleys", "Dedicated Tube-well Water", "RERA Approved"],
    landmarks: [
      { name: "Govardhan Parikrama Path", distance: "0.1 km" },
      { name: "Dan Ghati Temple", distance: "1.4 km" },
      { name: "Radha Kund", distance: "3.2 km" }
    ],
    featured: false,
    newLaunch: true,
    exclusive: true
  },
  {
    id: "radha-madhav-retreat",
    title: "Radha Madhav Shanti Retreat",
    slug: "radha-madhav-shanti-retreat",
    categoryId: "spiritual-retreats",
    locationId: "barsana-heritage",
    status: PropertyStatus.READY,
    price: 22000000, // 2.2 Cr
    area: 4500,
    bhk: "5 BHK Spiritual Villa",
    floor: "G + 2 Spiritual Haveli Layout",
    facing: "West (Mountain Facing)",
    possessionDate: "Immediate Handover",
    reraNumber: "UPRERAPRJ882291",
    developerId: "Nikunj Infrabuild",
    description: "An oasis of divine stillness situated directly among the hills of pristine Barsana, the sacred home of Sri Radha Rani. This luxurious retreat boasts an indoor open-skylight lotus pond, water fountains, and custom deep-carved ashram arches. Surrounded by an ancient organic sanctuary orchard with organic vegetable harvesting and deep meditation platforms.",
    imageUrls: [
      "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=800"
    ],
    amenities: ["Central Lotus Pond", "Organic Kitchen Garden", "Yoga & Meditation Shala", "Ashram-Style Arches", "Rainwater Harvesting", "Sanskrit Library Study"],
    landmarks: [
      { name: "Radha Rani Temple Barsana", distance: "0.8 km" },
      { name: "Maan Mandir", distance: "1.2 km" },
      { name: "Pili Pokhra Water Body", distance: "1.5 km" }
    ],
    featured: true,
    newLaunch: false,
    exclusive: true
  },
  {
    id: "nh2-executive-suite",
    title: "Shree Vrindavan Commercial Hub Offices",
    slug: "shree-vrindavan-commercial-hub-offices",
    categoryId: "commercial-spaces",
    locationId: "nh2-corridor",
    status: PropertyStatus.READY,
    price: 7500000, // 75 L
    area: 1200,
    bhk: "Modern Executive Office Space",
    floor: "3rd Floor Office Room",
    facing: "North-West Facing",
    possessionDate: "Ready to Move",
    reraNumber: "UPRERAPRJ111224",
    developerId: "Heritage Promoters",
    description: "Premium corner office space equipped with full high-speed network points, heavy fire safety sensors, and direct parking accesses. Outstanding for chartered accounts, corporate real estate advisory teams, or digital healthcare operations in Mathura.",
    imageUrls: [
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=800"
    ],
    amenities: ["Corner Glass Bay", "Professional Reception Desk", "Smart Card Access Doors", "Power Backup", "Premium Cafeteria Access", "Central Elevator"],
    landmarks: [
      { name: "Mathura Highway Plaza", distance: "0.2 km" },
      { name: "Yamuna Highway Bridge", distance: "2.1 km" }
    ],
    featured: false,
    newLaunch: false,
    exclusive: false
  },
  {
    id: "vraj-greenfield-plots",
    title: "Vraj Greenfield Gated Land Parcels",
    slug: "vraj-greenfield-gated-land-parcels",
    categoryId: "plots-and-land",
    locationId: "ring-road-junction",
    status: PropertyStatus.SOLD_OUT,
    price: 2500000, // 25 Lacs
    area: 1200,
    bhk: "Residential Plot Block",
    floor: "N/A - Plot",
    facing: "West Facing",
    possessionDate: "Ready for Registration",
    reraNumber: "UPRERAPRJ885562",
    developerId: "Krishna Brij Estates",
    description: "Demarcated plots with secure boundary block fencing, wide tarmac routes, and municipal water connections. Located right on the Mathura-Vrindavan Ring Road, yielding excellent returns on future retail and storage developments.",
    imageUrls: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800"
    ],
    amenities: ["Gated Enclave Security", "Tarmac Roads", "Plumbing Outlets", "Green Ridge Landscaping"],
    landmarks: [
      { name: "Yamuna Expressway Toll", distance: "6.0 km" },
      { name: "Vrindavan Rail Halt", distance: "2.5 km" }
    ],
    featured: false,
    newLaunch: false,
    exclusive: false
  }
];

export const BLOGS_SEED = [
  {
    id: "vrindavan-growth-hub",
    title: "Why Vrindavan Real Estate is India's Next Big Spiritual Investment Destination",
    slug: "why-vrindavan-real-estate-next-big-destination",
    content: `Vrindavan, once a peaceful hamlet of divine groves and historical temples, has fast evolved into one of India's most lucrative and high-demand micro-markets for luxury second homes and retirement spaces. 

### The Cultural Resonance & Identity
Over the last ten years, millions of Indian diaspora and domestic investors have sought to reconnect with their roots. With modern architectural advancements meeting classic temple geometry, developments like Rukmani Vihar offer a perfect sanctuary. Buyers don't just secure a flat; they invest in arene morning prayers, clean organic temple offerings, and an environment of peace.

### Surging Infrastructure Connectivity
- **Yamuna Expressway:** High-speed, seamless transit connections cut down travel time from New Delhi, Noida and Gurugram to under two and a half hours.
- **Proposed Mathura-Vrindavan Heritage Transit:** Planned zero-emission heritage trams and ring roads will ensure that tourists and pilgrims experience traffic-free local transit.
- **New Jewar International Airport:** Prone to trigger high real-estate appreciation due to the airport being just 45 minutes away from Mathura districts.

### Superior ROI Dynamics
Freehold plots near Govardhan Hill and luxury villas in Rukmani Vihar have witnessed an annual capital hike of 18-24% year-over-year. High-yielding rental requests from short-term spiritual retreats have further accelerated investor interest.`,
    author: "Shailendra Tiwari (MD, Nikunj Heritage)",
    coverUrl: "https://images.unsplash.com/photo-1545229765-7018d6ff02bd?auto=format&fit=crop&q=80&w=800",
    category: "Investments",
    tags: "Vrindavan, Property Investment, Real Estate, Yamuna Expressway",
    status: "Published"
  },
  {
    id: "top-localities-mathura",
    title: "Top 5 Localities to Buy Premium Properties in Mathura & Vrindavan in 2026",
    slug: "top-5-localities-mathura-vrindavan-2026",
    content: `Are you planning on purchasing a spiritual home, a modern retirement flat, or commercial shops in the land of Lord Krishna? Choosing the perfect location is essential. Here is our comprehensive advisory list:

### 1. Rukmani Vihar (Vrindavan)
The crown jewel of Vrindavan's planned development. Rukmani Vihar hosts highly security-gated townships, large avenues, manicured parks, and is situated near ISKCON, Prem Mandir and Banke Bihari.

### 2. Govardhan Corridor
Blessed by the majestic aura of Giriraj Hill. It is the premier location for tranquil spiritual cottages, retirement retreats, and farmhouse orchards where development rules protect the natural parikrama route.

### 3. Mathura-Vrindavan Ring Road
Connecting key transit belts, this area offers affordable, newly launched apartment towers and spacious plots.

### 4. NH-2 Highway Corridor
A highly commercial transit route linking major commerce hubs of Mathura, Agra, and Delhi. If you want high-yield warehouses, showrooms or modern corporate offices, look no further.

### 5. Barsana Heritage Sanctum
A hilly, serene spiritual oasis. Indicated for premium eco-resorts, organic ashrams, and luxury villas steps from Radha Rani's historical birthplace palace.`,
    author: "Aditi Sharma (Chief Investment Advisor)",
    coverUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800",
    category: "Area Guide",
    tags: "Mathura Guide, Localities, Rukmani Vihar, Barsana",
    status: "Published"
  },
  {
    id: "luxury-villas-guide",
    title: "Luxury Villas Near Prem Mandir: A Complete Buyer's Guide to Haveli Living",
    slug: "luxury-villas-near-prem-mandir-haveli-guide",
    content: `Buying a premium second home or haveli-style villa in Vrindavan is more than just secure land purchasing—it is about choosing a legacy lifestyle blessed by divinity.

### Modern Havelis: Traditional Shells, Smart Real Estate
Ancient Indian courtyard housing (Havelis) has made a dramatic comeback. The internal courtyard allows light and fresh air to travel smoothly, while providing a secure private space for yoga and private family temple altars.

### Essential Specifications to Verify
1. **RERA Clearance:** Verify the unique RERA code (e.g., UPRERAPRJ114522) to avoid construction delivery delays.
2. **Access Security Gates:** Ensure the township offers high-end smart access cards, central compound guards, and remote camera monitoring when you are away.
3. **Eco-Friendly Features:** In-house water filtration grids (especially considering Vrindavan's hard water tables), rooftop solar, and rainwater channels.
4. **Distance to Shrines:** Choosing projects located within 1-3 kilometers from Banke Bihari, ISKCON, and Prem Mandir preserves ease of access during massive festival cycles (Janmashtami, Holi, etc.).`,
    author: "Shailendra Tiwari (Founder)",
    coverUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=800",
    category: "Buyer Guide",
    tags: "Prem Mandir, Luxury Havelis, Vrindavan Villas",
    status: "Published"
  }
];

export const TESTIMONIALS_SEED = [
  {
    id: "test1",
    name: "Dr. Rajesh K. Chaturvedi",
    role: "Retired Chief Cardiologist, Delhi",
    text: "After retirement, my absolute ultimate dream was to live near Lord Banke Bihari's supreme temple. Nikunj Heritage Infrabuild built the perfect, serene, premium haveli villa for us. Their team took care of all registry tasks and local permits with maximum transparency. Every morning is a divine blessing!",
    stars: 5,
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    videoUrl: "",
    approved: true
  },
  {
    id: "test2",
    name: "Meenakshi & Alok Dwivedi",
    role: "Software Architects, Gurugram",
    text: "We bought an apartment in Keshav Divine Heights from Nikunj Heritage as a weekend spiritual retreat for our family. The distance to Prem Mandir is incredibly close, the society maintains top-tier hygiene, and our parents enjoy the daily meditation gatherings in the central compound.",
    stars: 5,
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    videoUrl: "",
    approved: true
  },
  {
    id: "test3",
    name: "Sunil G. Singhal",
    role: "Director, Singhal Textile Trade",
    text: "Securing commercial prime properties along the NH-2 Corridor with Nikunj group has yielded massive footfalls for our newly launched apparel brand center. Highly recommended for complete adherence to timelines, legal RERA procedures, and prime commercial planning properties.",
    stars: 5,
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    videoUrl: "",
    approved: true
  }
];

export async function runDatabaseSeed(): Promise<{ success: boolean; count: number }> {
  try {
    const listCount = { categories: 0, locations: 0, properties: 0, blogs: 0, testimonials: 0 };
    
    // Check if we already have seeded items using Categories
    const existingCats = await getDocs(collection(db, "categories"));
    if (!existingCats.empty) {
      console.log("Database already seeded with demo data.");
      return { success: true, count: existingCats.size };
    }

    const batch = writeBatch(db);

    // 1. Categories
    CATEGORIES_SEED.forEach((cat) => {
      const docRef = doc(db, "categories", cat.id);
      batch.set(docRef, cat);
      listCount.categories++;
    });

    // 2. Locations
    LOCATIONS_SEED.forEach((loc) => {
      const docRef = doc(db, "locations", loc.id);
      batch.set(docRef, loc);
      listCount.locations++;
    });

    // 3. Properties
    PROPERTIES_SEED.forEach((prop) => {
      const docRef = doc(db, "properties", prop.id);
      batch.set(docRef, {
        ...prop,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      listCount.properties++;
    });

    // 4. Blogs
    BLOGS_SEED.forEach((blog) => {
      const docRef = doc(db, "blogs", blog.id);
      batch.set(docRef, {
        ...blog,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      listCount.blogs++;
    });

    // 5. Testimonials
    TESTIMONIALS_SEED.forEach((test) => {
      const docRef = doc(db, "testimonials", test.id);
      batch.set(docRef, {
        ...test,
        createdAt: serverTimestamp()
      });
      listCount.testimonials++;
    });

    await batch.commit();

    // Seal the database as seeded to lock unauthorized modifications
    try {
      const sealBatch = writeBatch(db);
      sealBatch.set(doc(db, "settings", "seedingCompleted"), {
        completed: true,
        createdAt: serverTimestamp()
      });
      await sealBatch.commit();
    } catch (sealError) {
      console.warn("Sealing database failed:", sealError);
    }

    return { success: true, count: listCount.properties };
  } catch (error) {
    console.error("Database seeding exception:", error);
    return { success: false, count: 0 };
  }
}

// Cleanout database helper for developers / sandbox testing
export async function cleanDatabase(): Promise<void> {
  const collections = ["categories", "locations", "properties", "blogs", "testimonials", "leads", "pages"];
  for (const colName of collections) {
    const snap = await getDocs(collection(db, colName));
    for (const docItem of snap.docs) {
      await deleteDoc(doc(db, colName, docItem.id));
    }
  }
}
