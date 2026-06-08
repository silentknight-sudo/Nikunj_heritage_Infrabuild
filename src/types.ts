/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum PropertyStatus {
  READY = "Ready to Move",
  CONSTRUCTION = "Under Construction",
  NEW_LAUNCH = "New Launch",
  SOLD_OUT = "Sold Out"
}

export interface LandmarkDistance {
  name: string;
  distance: string; // e.g., "500m", "2.5 km"
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  categoryId: string;
  locationId: string;
  status: PropertyStatus;
  price: number; // in Rupees, e.g. 7500000 for 75 Lacs
  area: number; // in sq ft
  bhk: string; // e.g. "2 BHK", "3 BHK Villa"
  floor?: string;
  facing?: string;
  possessionDate?: string;
  reraNumber?: string;
  developerId?: string;
  description: string;
  imageUrls: string[];
  floorPlanUrl?: string;
  brochureUrl?: string;
  videoUrl?: string; // YouTube or Vimeo ID / link
  amenities: string[];
  landmarks: LandmarkDistance[];
  seoTitle?: string;
  seoDescription?: string;
  featured: boolean;
  newLaunch: boolean;
  exclusive: boolean;
  createdAt: any; // Firestore Timestamp
  updatedAt: any; // Firestore Timestamp
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string; // Lucide icon name
  description: string;
  imageUrl: string;
  sortOrder: number;
  active: boolean;
}

export interface Location {
  id: string;
  name: string;
  slug: string;
  city: string; // Mathura, Vrindavan, Barsana, Govardhan, etc.
  description: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
  active: boolean;
}

export enum LeadStatus {
  NEW = "New",
  CONTACTED = "Contacted",
  SITE_VISIT = "Site Visit Scheduled",
  BOOKED = "Booked",
  CLOSED = "Closed",
  NOT_INTERESTED = "Not Interested"
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  locationInterest?: string;
  propertyType?: string;
  message?: string;
  preferredCallback?: string; // Date/time or label
  sourceUrl?: string;
  status: LeadStatus;
  assignedTo?: string;
  notes?: string;
  createdAt: any; // Firestore Timestamp
}

export enum BlogStatus {
  DRAFT = "Draft",
  PUBLISHED = "Published"
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  coverUrl: string;
  category: string;
  tags?: string; // Comma separated
  status: BlogStatus;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: any;
  updatedAt: any;
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  text: string;
  stars: number;
  imageUrl?: string;
  videoUrl?: string;
  approved: boolean;
  createdAt: any;
}

export interface Developer {
  id: string;
  name: string;
  description?: string;
  logoUrl?: string;
  website?: string;
  activeProjects?: number;
}

export interface Event {
  id: string;
  name: string;
  date: string;
  time?: string;
  location: string;
  description?: string;
  registrationUrl?: string;
  coverUrl?: string;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  heroUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  showInFooter: boolean;
  status: "Draft" | "Published";
  updatedAt: any;
}

export interface SiteConfig {
  companyName: string;
  tagline: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  address: string;
  facebookUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  twitterUrl?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroCoverUrl?: string;
  reranumbers?: string[];
  footerDisclaimer?: string;
  statSqFt?: string;
  statDelivered?: string;
  statExperience?: string;
  statFamilies?: string;
}
