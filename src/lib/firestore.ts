/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp
} from "firebase/firestore";
import { db, auth } from "./firebase";
import { Property, Category, Location, Lead, Blog, Testimonial, Developer, Event, Page, SiteConfig, LeadStatus, PropertyStatus, BlogStatus } from "../types";

// ERROR HANDLER AS REQUIRED BY SKILL.MD
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error("Firestore Exception Caught: ", JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// --- CONFIG ACTIONS ---
export async function getSiteConfig(): Promise<SiteConfig> {
  const path = "settings/siteConfig";
  try {
    const d = await getDoc(doc(db, "settings", "siteConfig"));
    if (d.exists()) {
      return d.data() as SiteConfig;
    }
    // Return Default SiteConfig matching brand assets
    return {
      companyName: "Nikunj Heritage Infrabuild",
      tagline: "Where Divinity Meets Luxury Living",
      phone: "+91-9719920888",
      whatsappNumber: "+919719920888",
      email: "info@nikunjheritageinfrabuild.com",
      address: "21/s3, Sec-3 Rukmani Vihar, Near Ramada Hotel, Burja Road, Vrindavan 281121",
      facebookUrl: "https://facebook.com",
      instagramUrl: "https://instagram.com",
      youtubeUrl: "https://youtube.com",
      twitterUrl: "https://twitter.com",
      heroTitle: "Elegance Blessed by Divinity",
      heroSubtitle: "Premium residential apartments, haveli villas, and plots steps away from the banks of Yamuna and historic Vrindavan Temples.",
      heroCoverUrl: "https://images.unsplash.com/photo-1545229765-7018d6ff02bd?auto=format&fit=crop&q=80&w=1600",
      reranumbers: ["UPRERAPRJ12345", "RERA-2026-MATHURA-77"],
      footerDisclaimer: "All properties described on this portal are duly registered or are undergoing registration with U.P. Real Estate Regulatory Authority (RERA). Dimensions and images are representations of architectural layouts.",
      statSqFt: "10L+",
      statDelivered: "1500+",
      statExperience: "15+",
      statFamilies: "1200+"
    };
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
    throw error;
  }
}

export async function updateSiteConfig(config: Partial<SiteConfig>): Promise<void> {
  const path = "settings/siteConfig";
  try {
    await setDoc(doc(db, "settings", "siteConfig"), config, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// --- ADMIN LIST ---
export async function checkIsAdmin(uid: string): Promise<boolean> {
  const path = `admins/${uid}`;
  try {
    // If user is our bootstrapped developer mail, bypass to support easy initial testing
    const currentUserEmail = auth.currentUser?.email;
    if (currentUserEmail === "vksp207@gmail.com") {
      return true;
    }
    const adminDoc = await getDoc(doc(db, "admins", uid));
    return adminDoc.exists();
  } catch (e) {
    console.warn("Permission check failed, returning false or checking fallback email:", e);
    return auth.currentUser?.email === "vksp207@gmail.com";
  }
}

export async function addAdmin(uid: string, email: string): Promise<void> {
  const path = `admins/${uid}`;
  try {
    await setDoc(doc(db, "admins", uid), {
      email,
      createdAt: Timestamp.now()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// --- CATEGORIES CRUD ---
export async function getCategories(): Promise<Category[]> {
  const path = "categories";
  try {
    const qSnap = await getDocs(query(collection(db, "categories"), orderBy("sortOrder", "asc")));
    return qSnap.docs.map(d => ({ id: d.id, ...d.data() } as Category));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    throw error;
  }
}

export async function addCategory(category: Omit<Category, "id">): Promise<string> {
  const path = "categories";
  try {
    const docRef = await addDoc(collection(db, "categories"), category);
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
    throw error;
  }
}

export async function updateCategory(id: string, category: Partial<Category>): Promise<void> {
  const path = `categories/${id}`;
  try {
    await updateDoc(doc(db, "categories", id), category);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function deleteCategory(id: string): Promise<void> {
  const path = `categories/${id}`;
  try {
    await deleteDoc(doc(db, "categories", id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// --- LOCATIONS CRUD ---
export async function getLocations(): Promise<Location[]> {
  const path = "locations";
  try {
    const qSnap = await getDocs(collection(db, "locations"));
    return qSnap.docs.map(d => ({ id: d.id, ...d.data() } as Location));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    throw error;
  }
}

export async function addLocation(loc: Omit<Location, "id">): Promise<string> {
  const path = "locations";
  try {
    const docRef = await addDoc(collection(db, "locations"), loc);
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
    throw error;
  }
}

export async function updateLocation(id: string, loc: Partial<Location>): Promise<void> {
  const path = `locations/${id}`;
  try {
    await updateDoc(doc(db, "locations", id), loc);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function deleteLocation(id: string): Promise<void> {
  const path = `locations/${id}`;
  try {
    await deleteDoc(doc(db, "locations", id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// --- PROPERTIES CRUD ---
export async function getProperties(): Promise<Property[]> {
  const path = "properties";
  try {
    const qSnap = await getDocs(query(collection(db, "properties"), orderBy("createdAt", "desc")));
    return qSnap.docs.map(d => ({ id: d.id, ...d.data() } as Property));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    throw error;
  }
}

export async function addProperty(prop: Omit<Property, "id" | "createdAt" | "updatedAt">): Promise<string> {
  const path = "properties";
  try {
    const docRef = await addDoc(collection(db, "properties"), {
      ...prop,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
    throw error;
  }
}

export async function updateProperty(id: string, prop: Partial<Property>): Promise<void> {
  const path = `properties/${id}`;
  try {
    await updateDoc(doc(db, "properties", id), {
      ...prop,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function deleteProperty(id: string): Promise<void> {
  const path = `properties/${id}`;
  try {
    await deleteDoc(doc(db, "properties", id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// --- LEADS / ENQUIRIES ---
export async function getLeads(): Promise<Lead[]> {
  const path = "leads";
  try {
    const qSnap = await getDocs(query(collection(db, "leads"), orderBy("createdAt", "desc")));
    return qSnap.docs.map(d => ({ id: d.id, ...d.data() } as Lead));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    throw error;
  }
}

export async function createLead(lead: Omit<Lead, "id" | "status" | "createdAt">): Promise<string> {
  const path = "leads";
  try {
    // Lead is generated securely via random ID so we format safe ID
    const randomId = doc(collection(db, "leads")).id; 
    const docRef = doc(db, "leads", randomId);
    await setDoc(docRef, {
      ...lead,
      status: LeadStatus.NEW,
      createdAt: Timestamp.now()
    });
    return randomId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
    throw error;
  }
}

export async function updateLead(id: string, lead: Partial<Lead>): Promise<void> {
  const path = `leads/${id}`;
  try {
    await updateDoc(doc(db, "leads", id), lead);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function deleteLead(id: string): Promise<void> {
  const path = `leads/${id}`;
  try {
    await deleteDoc(doc(db, "leads", id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// --- BLOGS CRUD ---
export async function getBlogs(): Promise<Blog[]> {
  const path = "blogs";
  try {
    const qSnap = await getDocs(query(collection(db, "blogs"), orderBy("createdAt", "desc")));
    return qSnap.docs.map(d => ({ id: d.id, ...d.data() } as Blog));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    throw error;
  }
}

export async function addBlog(blog: Omit<Blog, "id" | "createdAt" | "updatedAt">): Promise<string> {
  const path = "blogs";
  try {
    const docRef = await addDoc(collection(db, "blogs"), {
      ...blog,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
    throw error;
  }
}

export async function updateBlog(id: string, blog: Partial<Blog>): Promise<void> {
  const path = `blogs/${id}`;
  try {
    await updateDoc(doc(db, "blogs", id), {
      ...blog,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function deleteBlog(id: string): Promise<void> {
  const path = `blogs/${id}`;
  try {
    await deleteDoc(doc(db, "blogs", id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// --- TESTIMONIALS ---
export async function getTestimonials(): Promise<Testimonial[]> {
  const path = "testimonials";
  try {
    const qSnap = await getDocs(query(collection(db, "testimonials"), orderBy("createdAt", "desc")));
    return qSnap.docs.map(d => ({ id: d.id, ...d.data() } as Testimonial));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    throw error;
  }
}

export async function addTestimonial(test: Omit<Testimonial, "id" | "approved" | "createdAt">): Promise<string> {
  const path = "testimonials";
  try {
    const randomId = doc(collection(db, "testimonials")).id;
    const docRef = doc(db, "testimonials", randomId);
    await setDoc(docRef, {
      ...test,
      approved: false, // Default moderation gate active
      createdAt: Timestamp.now()
    });
    return randomId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
    throw error;
  }
}

export async function addTestimonialDirect(test: Omit<Testimonial, "id" | "createdAt">): Promise<string> {
  const path = "testimonials";
  try {
    const docRef = await addDoc(collection(db, "testimonials"), {
      ...test,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
    throw error;
  }
}

export async function updateTestimonial(id: string, test: Partial<Testimonial>): Promise<void> {
  const path = `testimonials/${id}`;
  try {
    await updateDoc(doc(db, "testimonials", id), test);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function deleteTestimonial(id: string): Promise<void> {
  const path = `testimonials/${id}`;
  try {
    await deleteDoc(doc(db, "testimonials", id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// --- DYNAMIC EXTRA CMS PAGES ---
export async function getPages(): Promise<Page[]> {
  const path = "pages";
  try {
    const qSnap = await getDocs(collection(db, "pages"));
    return qSnap.docs.map(d => ({ id: d.id, ...d.data() } as Page));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    throw error;
  }
}

export async function addPage(p: Omit<Page, "id" | "updatedAt">): Promise<string> {
  const path = "pages";
  try {
    const docRef = await addDoc(collection(db, "pages"), {
      ...p,
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
    throw error;
  }
}

export async function updatePage(id: string, p: Partial<Page>): Promise<void> {
  const path = `pages/${id}`;
  try {
    await updateDoc(doc(db, "pages", id), {
      ...p,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function deletePage(id: string): Promise<void> {
  const path = `pages/${id}`;
  try {
    await deleteDoc(doc(db, "pages", id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// --- PARTNER DEVELOPERS ---
export async function getDevelopers(): Promise<Developer[]> {
  const path = "developers";
  try {
    const qSnap = await getDocs(collection(db, "developers"));
    return qSnap.docs.map(d => ({ id: d.id, ...d.data() } as Developer));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    throw error;
  }
}

export async function addDeveloper(dev: Omit<Developer, "id">): Promise<string> {
  const path = "developers";
  try {
    const docRef = await addDoc(collection(db, "developers"), dev);
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
    throw error;
  }
}

export async function updateDeveloper(id: string, dev: Partial<Developer>): Promise<void> {
  const path = `developers/${id}`;
  try {
    await updateDoc(doc(db, "developers", id), dev);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function deleteDeveloper(id: string): Promise<void> {
  const path = `developers/${id}`;
  try {
    await deleteDoc(doc(db, "developers", id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// --- SPIRITUAL PROPERTY EVENTS ---
export async function getEvents(): Promise<Event[]> {
  const path = "events";
  try {
    const qSnap = await getDocs(collection(db, "events"));
    return qSnap.docs.map(d => ({ id: d.id, ...d.data() } as Event));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    throw error;
  }
}

export async function addEvent(ev: Omit<Event, "id">): Promise<string> {
  const path = "events";
  try {
    const docRef = await addDoc(collection(db, "events"), ev);
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
    throw error;
  }
}

export async function updateEvent(id: string, ev: Partial<Event>): Promise<void> {
  const path = `events/${id}`;
  try {
    await updateDoc(doc(db, "events", id), ev);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function deleteEvent(id: string): Promise<void> {
  const path = `events/${id}`;
  try {
    await deleteDoc(doc(db, "events", id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  const path = `properties/slug/${slug}`;
  try {
    const qSnap = await getDocs(query(collection(db, "properties"), where("slug", "==", slug), limit(1)));
    if (qSnap.empty) return null;
    const firstDoc = qSnap.docs[0];
    return { id: firstDoc.id, ...firstDoc.data() } as Property;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
    throw error;
  }
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const path = `blogs/slug/${slug}`;
  try {
    const qSnap = await getDocs(query(collection(db, "blogs"), where("slug", "==", slug), limit(1)));
    if (qSnap.empty) return null;
    const firstDoc = qSnap.docs[0];
    return { id: firstDoc.id, ...firstDoc.data() } as Blog;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
    throw error;
  }
}
