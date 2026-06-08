/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Building,
  Users,
  Layers,
  MapPin,
  BookOpen,
  FileText,
  Settings,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  Clock,
  LogOut,
  Save,
  AlertCircle
} from "lucide-react";
import { useAuth } from "../lib/auth";
import {
  getProperties,
  addProperty as createProperty,
  updateProperty,
  deleteProperty,
  getCategories,
  addCategory as createCategory,
  deleteCategory,
  getLocations,
  addLocation as createLocation,
  deleteLocation,
  getLeads,
  updateLead,
  getBlogs,
  addBlog as createBlog,
  deleteBlog,
  getPages,
  addPage as createPage,
  deletePage,
  getSiteConfig,
  updateSiteConfig
} from "../lib/firestore";
import {
  Property,
  Category,
  Location as LocType,
  Lead,
  Blog,
  Page,
  SiteConfig,
  PropertyStatus,
  LeadStatus,
  BlogStatus
} from "../types";
import { formatPrice } from "../lib/utils";
import { toast } from "react-hot-toast";

type TabType = "properties" | "leads" | "categories" | "locations" | "blogs" | "pages" | "settings";

export const AdminDashboard: React.FC = () => {
  const { user, isAdmin, loading: authLoading, logout, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  // Active sub-navigation tab state
  const [activeTab, setActiveTab] = useState<TabType>("properties");

  // Core Data States
  const [properties, setProperties] = useState<Property[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [locations, setLocations] = useState<LocType[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [pages, setPages] = useState<Page[]>([]);
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);

  // General Loading state
  const [loading, setLoading] = useState(true);

  // Property Form State
  const [propFormOpen, setPropFormOpen] = useState(false);
  const [editingPropId, setEditingPropId] = useState<string | null>(null);
  const [propTitle, setPropTitle] = useState("");
  const [propDesc, setPropDesc] = useState("");
  const [propPrice, setPropPrice] = useState(5000000);
  const [propArea, setPropArea] = useState(1200);
  const [propBhk, setPropBhk] = useState("3 BHK Builder Floor");
  const [propFacing, setPropFacing] = useState("East");
  const [propStatus, setPropStatus] = useState<PropertyStatus>(PropertyStatus.CONSTRUCTION);
  const [propCatId, setPropCatId] = useState("");
  const [propLocId, setPropLocId] = useState("");
  const [propImagesText, setPropImagesText] = useState(""); // newline separated URL specs
  const [propFeatured, setPropFeatured] = useState(false);

  // Blog Form State
  const [blogFormOpen, setBlogFormOpen] = useState(false);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogCat, setBlogCat] = useState("Property Guide");
  const [blogTime, setBlogTime] = useState("5 min read");
  const [blogCover, setBlogCover] = useState("");
  const [blogContent, setBlogContent] = useState("");

  // Page Form State
  const [pageFormOpen, setPageFormOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState("");
  const [pageSlug, setPageSlug] = useState("");
  const [pageContent, setPageContent] = useState("");

  // Site Config update states representation
  const [confTitle, setConfTitle] = useState("");
  const [confSubtitle, setConfSubtitle] = useState("");
  const [confPhone, setConfPhone] = useState("");
  const [confReras, setConfReras] = useState(""); // Comma separated

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      toast.error("Access Forbidden! Dedicated Administrative eyes only.");
    }
  }, [isAdmin, authLoading]);

  // Load Admin panel items
  const loadPanelData = async () => {
    setLoading(true);
    try {
      const ps = await getProperties();
      setProperties(ps);

      const ls = await getLeads();
      setLeads(ls);

      const cs = await getCategories();
      setCategories(cs);
      if (cs.length > 0) setPropCatId(cs[0].id);

      const locs = await getLocations();
      setLocations(locs);
      if (locs.length > 0) setPropLocId(locs[0].id);

      const bgs = await getBlogs();
      setBlogs(bgs);

      const pgs = await getPages();
      setPages(pgs);

      const config = await getSiteConfig();
      if (config) {
        setSiteConfig(config);
        setConfTitle(config.heroTitle || "");
        setConfSubtitle(config.heroSubtitle || "");
        setConfPhone(config.phone || "");
        setConfReras(config.reranumbers?.join(", ") || "");
      }
    } catch (err) {
      console.error("Admin dashboard data bootstrap failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadPanelData();
    }
  }, [isAdmin]);

  // Property Submission Actions
  const handlePropertySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!propTitle || !propCatId || !propLocId) {
      toast.error("Property Title, Category and Location fields are mandated.");
      return;
    }

    const imagesArray = propImagesText
      .split("\n")
      .map((url) => url.trim())
      .filter(Boolean);

    const slugified = propTitle.toLowerCase().trim().replace(/\s+/g, "-");

    const payload = {
      title: propTitle,
      slug: slugified,
      description: propDesc,
      price: Number(propPrice),
      area: Number(propArea),
      bhk: propBhk,
      facing: propFacing,
      status: propStatus,
      categoryId: propCatId,
      locationId: propLocId,
      imageUrls: imagesArray.length > 0 ? imagesArray : ["https://images.unsplash.com/photo-1545229765-7018d6ff02bd?auto=format&fit=crop&q=80&w=600"],
      featured: propFeatured,
      newLaunch: true,
      possessionDate: "Immediate",
      landmarks: [
        { name: "Prem Mandir", distance: "1.2 km" },
        { name: "Banke Bihari Mandir", distance: "2.4 km" }
      ],
      reraNumber: "UPRERAPRJ" + Math.floor(Math.random() * 80000 + 10000)
    };

    try {
      if (editingPropId) {
        await updateProperty(editingPropId, payload);
        toast.success("Property specifications modified successfully!");
      } else {
        await createProperty(payload);
        toast.success("New structural asset registered with registry ledger.");
      }
      setPropFormOpen(false);
      setEditingPropId(null);
      resetPropertyForm();
      loadPanelData();
    } catch (err) {
      toast.error("Form submit failed inside db ledger.");
    }
  };

  const handleEditPropertyClick = (p: Property) => {
    setEditingPropId(p.id);
    setPropTitle(p.title);
    setPropDesc(p.description);
    setPropPrice(p.price);
    setPropArea(p.area);
    setPropBhk(p.bhk);
    setPropFacing(p.facing || "");
    setPropStatus(p.status);
    setPropCatId(p.categoryId);
    setPropLocId(p.locationId);
    setPropImagesText(p.imageUrls?.join("\n") || "");
    setPropFeatured(p.featured || false);
    setPropFormOpen(true);
  };

  const resetPropertyForm = () => {
    setPropTitle("");
    setPropDesc("");
    setPropPrice(5000000);
    setPropArea(1200);
    setPropBhk("3 BHK Builder Floor");
    setPropFacing("East");
    setPropStatus(PropertyStatus.CONSTRUCTION);
    setPropImagesText("");
    setPropFeatured(false);
  };

  const handleDeleteProperty = async (id: string) => {
    if (!window.confirm("Pranam, are you sure you want to delete this property listing?")) return;
    try {
      await deleteProperty(id);
      toast.success("Property listing wiped from Firestore ledger.");
      loadPanelData();
    } catch (err) {
      toast.error("Wipe failed.");
    }
  };

  // Status Lead Updates Actions
  const handleLeadStatusChange = async (leadId: string, status: LeadStatus) => {
    try {
      await updateLead(leadId, { status });
      toast.success(`Leads status updated: ${status}`);
      loadPanelData();
    } catch (err) {
      toast.error("Lead status transition failed.");
    }
  };

  // Settings configs submits
  const handleSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateSiteConfig({
        heroTitle: confTitle,
        heroSubtitle: confSubtitle,
        phone: confPhone,
        reranumbers: confReras.split(",").map(val => val.trim()).filter(Boolean)
      });
      toast.success("Core Configuration settings recorded successfully!");
      loadPanelData();
    } catch (err) {
      toast.error("Settings update failed.");
    }
  };

  // Blog Submissions
  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle || !blogContent) {
      toast.error("Please provide both Title and Content.");
      return;
    }
    const bSlug = blogTitle.toLowerCase().trim().replace(/\s+/g, "-");
    try {
      await createBlog({
        title: blogTitle,
        slug: bSlug,
        content: blogContent,
        category: blogCat,
        readTime: blogTime,
        coverUrl: blogCover || "https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&q=80&w=600"
      });
      toast.success("Divine literature published successfully!");
      setBlogFormOpen(false);
      setBlogTitle("");
      setBlogContent("");
      setBlogCover("");
      loadPanelData();
    } catch (e) {
      toast.error("Publishing blog failed.");
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!window.confirm("Confirm deletion of this article?")) return;
    try {
      await deleteBlog(id);
      toast.success("Articles deleted.");
      loadPanelData();
    } catch (e) {
      toast.error("Blog delete failed.");
    }
  };

  // Pages submissions
  const handlePageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pageTitle || !pageContent) {
      toast.error("Page Title and Content are required.");
      return;
    }
    const pSlug = pageSlug.trim() || pageTitle.toLowerCase().trim().replace(/\s+/g, "-");
    try {
      await createPage({
        title: pageTitle,
        slug: pSlug,
        content: pageContent,
        status: "Published",
        showInFooter: true
      });
      toast.success("Custom administrative webpage published!");
      setPageFormOpen(false);
      setPageTitle("");
      setPageSlug("");
      setPageContent("");
      loadPanelData();
    } catch (e) {
      toast.error("Failed to compile custom page.");
    }
  };

  const handleDeletePage = async (id: string) => {
    if (!window.confirm("Do you want to wipe this page?")) return;
    try {
      await deletePage(id);
      toast.success("Webpage deleted from directory.");
      loadPanelData();
    } catch (e) {
      toast.error("Deletion failed.");
    }
  };

  // Security Locking Screen
  if (authLoading) {
    return (
      <div className="bg-[#FAF6F0] min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 text-[#C45C1A] border-4 border-[#C45C1A]/20 border-t-[#C45C1A] rounded-full"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="bg-[#FAF6F0] min-h-[90vh] flex flex-col items-center justify-center px-4 text-center">
        <AlertCircle className="h-16 w-16 text-[#6B1A2A]" />
        <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#6B1A2A] mt-4">Administrative Eyes Only</h2>
        <p className="text-slate-500 text-xs sm:text-sm max-w-sm mt-1.5 leading-relaxed font-sans">
          Pranam! You are currently unauthenticated or your Google account is not mapped within standard authorized lists. Please contact registry hosts.
        </p>
        <button
          onClick={loginWithGoogle}
          className="mt-6 px-6 py-3 bg-[#1A1A2E] hover:bg-[#1A1A2E]/90 text-white rounded font-serif text-sm flex items-center space-x-2 shadow-lg"
        >
          <span>Authenticate as Administrator</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 flex flex-col md:flex-row" id="admin-panel-canvas">
      
      {/* Sidebar Controller */}
      <aside className="bg-[#1A1A2E] text-[#FAF6F0] w-full md:w-64 shrink-0 p-5 border-r border-[#C9A84C]/40 md:min-h-screen flex flex-col justify-between" id="admin-navigation-rail">
        <div>
          <div className="flex items-center space-x-3 mb-8 border-b border-[#FAF6F0]/10 pb-4">
            <LayoutDashboard className="h-6 w-6 text-[#C9A84C]" />
            <div>
              <span className="block font-serif text-base font-bold text-[#faf6f0]">Nikunj Ledger</span>
              <span className="block text-[9px] uppercase tracking-widest text-[#C45C1A] font-bold">Systems CMS Panel</span>
            </div>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("properties")}
              className={`w-full text-left px-3.5 py-3 rounded text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 transition ${
                activeTab === "properties" ? "bg-[#C45C1A] text-white shadow" : "hover:bg-[#FAF6F0]/5 text-slate-300"
              }`}
            >
              <Building className="h-4.5 w-4.5" />
              <span>Properties</span>
            </button>
            <button
              onClick={() => setActiveTab("leads")}
              className={`w-full text-left px-3.5 py-3 rounded text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 transition ${
                activeTab === "leads" ? "bg-[#C45C1A] text-white shadow" : "hover:bg-[#FAF6F0]/5 text-slate-300"
              }`}
            >
              <Users className="h-4.5 w-4.5" />
              <span>Leads ({leads.filter(l => l.status === LeadStatus.NEW).length})</span>
            </button>
            <button
              onClick={() => setActiveTab("blogs")}
              className={`w-full text-left px-3.5 py-3 rounded text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 transition ${
                activeTab === "blogs" ? "bg-[#C45C1A] text-white shadow" : "hover:bg-[#FAF6F0]/5 text-slate-300"
              }`}
            >
              <BookOpen className="h-4.5 w-4.5" />
              <span>Devotional Journal</span>
            </button>
            <button
              onClick={() => setActiveTab("pages")}
              className={`w-full text-left px-3.5 py-3 rounded text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 transition ${
                activeTab === "pages" ? "bg-[#C45C1A] text-white shadow" : "hover:bg-[#FAF6F0]/5 text-slate-300"
              }`}
            >
              <FileText className="h-4.5 w-4.5" />
              <span>Custom Pages</span>
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full text-left px-3.5 py-3 rounded text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 transition ${
                activeTab === "settings" ? "bg-[#C45C1A] text-white shadow" : "hover:bg-[#FAF6F0]/5 text-slate-300"
              }`}
            >
              <Settings className="h-4.5 w-4.5" />
              <span>Ledger Settings</span>
            </button>
          </nav>
        </div>

        {/* Exit Action */}
        <div className="pt-6 border-t border-[#FAF6F0]/10 mt-6">
          <button
            onClick={logout}
            className="w-full py-2.5 border border-red-500/40 text-red-500 rounded text-xs font-bold uppercase hover:bg-red-500/10 transition flex items-center justify-center space-x-1.5"
          >
            <LogOut className="h-4 w-4" />
            <span>Close Panel</span>
          </button>
        </div>
      </aside>

      {/* Main Panel Content Box */}
      <main className="flex-grow p-6 sm:p-10 max-h-screen overflow-y-auto" id="admin-main-subpanel">
        
        {/* Loading overlay panel */}
        {loading ? (
          <div className="h-64 flex flex-col items-center justify-center">
            <div className="animate-spin h-6 w-6 text-[#C45C1A] border-2 border-slate-300 border-t-[#C45C1A] rounded-full" />
            <span className="text-xs text-slate-500 mt-2 font-mono">Syncing Firestore ledger arrays...</span>
          </div>
        ) : (
          <>
            {/* TAB 1: PROPERTIES CRUD */}
            {activeTab === "properties" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-[#6B1A2A]">Asset Inventory Management</h2>
                    <p className="text-xs text-slate-500">Edit, register, or delete local listings plotted inside Vrindavan-Mathura belts.</p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingPropId(null);
                      resetPropertyForm();
                      setPropFormOpen(true);
                    }}
                    className="px-4 py-2.5 bg-[#C45C1A] text-white rounded-md text-xs font-bold uppercase flex items-center space-x-1 hover:bg-[#C45C1A]/90 shadow"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Register New Asset</span>
                  </button>
                </div>

                {/* Form Overlay Modal (Add / Edit) */}
                {propFormOpen && (
                  <div className="bg-white p-6 rounded-2xl border border-[#C9A84C]/35 shadow-xl space-y-4">
                    <h3 className="font-serif font-bold text-lg text-[#6B1A2A] border-b border-slate-100 pb-2">
                      {editingPropId ? "Edit Registered Property" : "Register Sanctum Asset Form"}
                    </h3>

                    <form onSubmit={handlePropertySubmit} className="space-y-4 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] uppercase font-bold mb-1 text-slate-400">Property Title</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g., Nikunj Vaikunth Haveli Villas"
                            value={propTitle}
                            onChange={(e) => setPropTitle(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:border-[#C45C1A] outline-none text-slate-800"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase font-bold mb-1 text-slate-400">BHK / Config Label</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g., 3 BHK Luxury Haveli"
                            value={propBhk}
                            onChange={(e) => setPropBhk(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:border-[#C45C1A] outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-[10px] uppercase font-bold mb-1 text-slate-400">Asking Price (₹ Value)</label>
                          <input
                            type="number"
                            required
                            value={propPrice}
                            onChange={(e) => setPropPrice(Number(e.target.value))}
                            className="w-full px-3 py-2 border rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase font-bold mb-1 text-slate-400">Carpet Area (Sq Ft)</label>
                          <input
                            type="number"
                            required
                            value={propArea}
                            onChange={(e) => setPropArea(Number(e.target.value))}
                            className="w-full px-3 py-2 border rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase font-bold mb-1 text-slate-400">Category Section</label>
                          <select
                            value={propCatId}
                            onChange={(e) => setPropCatId(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg bg-slate-50"
                          >
                            {categories.map(c => (
                              <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase font-bold mb-1 text-slate-400">pilgrim Corridor</label>
                          <select
                            value={propLocId}
                            onChange={(e) => setPropLocId(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg bg-slate-50"
                          >
                            {locations.map(l => (
                              <option key={l.id} value={l.id}>{l.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[10px] uppercase font-bold mb-1 text-slate-400">Status Phase</label>
                          <select
                            value={propStatus}
                            onChange={(e) => setPropStatus(e.target.value as PropertyStatus)}
                            className="w-full px-3 py-2 border rounded-lg bg-slate-50"
                          >
                            <option value={PropertyStatus.READY}>Ready to Move</option>
                            <option value={PropertyStatus.CONSTRUCTION}>Under Construction</option>
                            <option value={PropertyStatus.NEW_LAUNCH}>New Launch</option>
                            <option value={PropertyStatus.SOLD_OUT}>Sold Out</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase font-bold mb-1 text-slate-400">Facing (Vastu Direction)</label>
                          <input
                            type="text"
                            placeholder="e.g., Northeast Divine facing"
                            value={propFacing}
                            onChange={(e) => setPropFacing(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg"
                          />
                        </div>
                        <div className="flex items-center space-x-2 pt-5">
                          <input
                            type="checkbox"
                            id="feat-check"
                            checked={propFeatured}
                            onChange={(e) => setPropFeatured(e.target.checked)}
                            className="h-4 w-4 rounded text-[#C45C1A]"
                          />
                          <label htmlFor="feat-check" className="font-bold text-slate-700">Tag as Featured Spotlight</label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold mb-1 text-slate-400">Image URL lines (newline-delimited strings)</label>
                        <textarea
                          rows={3}
                          placeholder="e.g., https://images.unsplash.com/your-image.jpg"
                          value={propImagesText}
                          onChange={(e) => setPropImagesText(e.target.value)}
                          className="w-full px-3 py-2 border rounded-lg outline-none font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold mb-1 text-slate-400">Spec description particulars</label>
                        <textarea
                          rows={4}
                          value={propDesc}
                          onChange={(e) => setPropDesc(e.target.value)}
                          className="w-full px-3 py-2 border rounded-lg outline-none text-slate-800"
                        />
                      </div>

                      <div className="flex justify-end space-x-2 pt-4 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => setPropFormOpen(false)}
                          className="px-4 py-2 border text-slate-500 rounded font-semibold"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2 bg-[#6B1A2A] text-white rounded font-bold uppercase"
                        >
                          Submit Registry Entry
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Properties table display list */}
                <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-100 border-b text-slate-500 font-mono">
                        <th className="p-4">Title</th>
                        <th className="p-4">Price</th>
                        <th className="p-4">BHK</th>
                        <th className="p-4">Area</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y text-slate-700 font-sans">
                      {properties.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50">
                          <td className="p-4 font-semibold text-slate-800">{p.title}</td>
                          <td className="p-4 font-bold text-[#6B1A2A]">{formatPrice(p.price)}</td>
                          <td className="p-4 text-slate-500">{p.bhk}</td>
                          <td className="p-4 font-mono">{p.area} sq ft</td>
                          <td className="p-4">
                            <span className="px-2 py-0.5 font-bold uppercase rounded bg-indigo-50 border text-indigo-700">
                              {p.status}
                            </span>
                          </td>
                          <td className="p-4 text-center space-x-1.5 whitespace-nowrap">
                            <button
                              onClick={() => handleEditPropertyClick(p)}
                              className="p-1.5 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded hover:bg-yellow-100"
                              title="Edit specifications"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProperty(p.id)}
                              className="p-1.5 bg-red-50 text-red-700 border border-red-200 rounded hover:bg-red-100"
                              title="Wipe listing"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 2: LEADS TRACKER */}
            {activeTab === "leads" && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#6B1A2A]">Inquiry Callback Leads Tracker</h2>
                  <p className="text-xs text-slate-500">Respond directly to customer registrations, callback request logs, and VIP visitation calendars.</p>
                </div>

                <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-100 border-b text-slate-500 font-mono">
                        <th className="p-4">Client Name</th>
                        <th className="p-4">Phone / Email</th>
                        <th className="p-4">Interest target</th>
                        <th className="p-4">Message specs</th>
                        <th className="p-4">Sectors Status</th>
                        <th className="p-4 text-center">Status Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y text-slate-700 font-sans">
                      {leads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-50">
                          <td className="p-4 font-bold text-slate-800">{lead.name}</td>
                          <td className="p-4 font-mono space-y-0.5">
                            <span className="block font-bold text-slate-700">{lead.phone}</span>
                            <span className="block text-slate-400 text-[10px]">{lead.email}</span>
                          </td>
                          <td className="p-4 text-slate-500 max-w-[150px] truncate">{lead.propertyType}</td>
                          <td className="p-4 text-slate-500 max-w-[200px] truncate" title={lead.message}>{lead.message}</td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 font-bold uppercase rounded text-[10px] ${
                              lead.status === LeadStatus.NEW ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                            }`}>
                              {lead.status}
                            </span>
                          </td>
                          <td className="p-4 text-center space-x-1.5 whitespace-nowrap">
                            <button
                              onClick={() => handleLeadStatusChange(lead.id, LeadStatus.CONTACTED)}
                              className="px-2 py-1 bg-yellow-100 text-yellow-800 font-bold rounded text-[9px] uppercase tracking-wide"
                            >
                              Contacted
                            </button>
                            <button
                              onClick={() => handleLeadStatusChange(lead.id, LeadStatus.CLOSED)}
                              className="px-2 py-1 bg-slate-100 text-slate-800 font-bold rounded text-[9px] uppercase tracking-wide"
                            >
                              Archive
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: DEVOTIONAL JOURNAL BLOGS */}
            {activeTab === "blogs" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-[#6B1A2A]">Devotional literature CMS</h2>
                    <p className="text-xs text-slate-500">Produce and organize holy blogs and investment guidance literature for pilgrims.</p>
                  </div>
                  <button
                    onClick={() => setBlogFormOpen(true)}
                    className="px-4 py-2 bg-[#C45C1A] text-white rounded text-xs font-bold uppercase"
                  >
                    Publish New Article
                  </button>
                </div>

                {blogFormOpen && (
                  <form onSubmit={handleBlogSubmit} className="bg-white p-6 rounded-2xl border border-[#C9A84C]/30 text-xs space-y-4">
                    <h3 className="font-serif font-bold text-sm text-[#6B1A2A]">Compose Article Specs</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] uppercase font-bold text-slate-400 mb-1">Article Title</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g., The Divinity of Govardhan Real Estate"
                          value={blogTitle}
                          onChange={(e) => setBlogTitle(e.target.value)}
                          className="w-full px-3 py-2 border rounded-lg focus:border-[#C45C1A] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] uppercase font-bold text-slate-400 mb-1">Cover Imagery URL</label>
                        <input
                          type="text"
                          placeholder="Unsplash placeholder URL..."
                          value={blogCover}
                          onChange={(e) => setBlogCover(e.target.value)}
                          className="w-full px-3 py-2 border rounded-lg focus:border-[#C45C1A] outline-none font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[9px] uppercase font-bold text-slate-400 mb-1">Category tag</label>
                        <select
                          value={blogCat}
                          onChange={(e) => setBlogCat(e.target.value)}
                          className="w-full px-3 py-2 border rounded bg-white"
                        >
                          <option value="Property Guide">Property Guide</option>
                          <option value="Divine Culture">Divine Culture</option>
                          <option value="Registry">Registry</option>
                          <option value="Development">Development</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[9px] uppercase font-bold text-slate-400 mb-1">estimated reading length</label>
                        <input
                          type="text"
                          placeholder="e.g., 6 min read"
                          value={blogTime}
                          onChange={(e) => setBlogTime(e.target.value)}
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9px] uppercase font-bold text-slate-400 mb-1">prose body (Simple Markdown headings ## and blocks supported)</label>
                      <textarea
                        rows={6}
                        required
                        value={blogContent}
                        onChange={(e) => setBlogContent(e.target.value)}
                        className="w-full px-3 py-2.5 border rounded-lg outline-none text-slate-800"
                      />
                    </div>

                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => setBlogFormOpen(false)}
                        className="px-4 py-2 border text-slate-500 rounded font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-[#6B1A2A] text-white rounded font-bold uppercase"
                      >
                        Publish Literature
                      </button>
                    </div>
                  </form>
                )}

                {/* Blogs list */}
                <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-100 border-b text-slate-500 font-mono">
                        <th className="p-4">Title</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Read duration</th>
                        <th className="p-4 text-center">Wipe action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y text-slate-700">
                      {blogs.map((b) => (
                        <tr key={b.id} className="hover:bg-slate-50">
                          <td className="p-4 font-bold text-slate-800">{b.title}</td>
                          <td className="p-4 font-mono text-slate-500">{b.category}</td>
                          <td className="p-4">{b.readTime}</td>
                          <td className="p-4 text-center">
                            <button
                              onClick={() => handleDeleteBlog(b.id)}
                              className="p-1 text-red-600 border border-red-200 bg-red-50 hover:bg-red-100 rounded"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 4: PAGES */}
            {activeTab === "pages" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-[#6B1A2A]">Custom Administrative Webpages</h2>
                    <p className="text-xs text-slate-500">Generate supplemental documentation rules, privacy terms, or regional specs instantly.</p>
                  </div>
                  <button
                    onClick={() => setPageFormOpen(true)}
                    className="px-4 py-2 bg-[#C45C1A] text-white rounded text-xs font-bold uppercase"
                  >
                    Build Custom Page
                  </button>
                </div>

                {pageFormOpen && (
                  <form onSubmit={handlePageSubmit} className="bg-white p-6 rounded-2xl border border-[#C9A84C]/35 space-y-4 text-xs">
                    <h3 className="font-serif font-bold text-sm text-[#6B1A2A]">Compile Custom Page</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] uppercase font-bold text-slate-400 mb-1">Page Title</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g., UP RERA Certifications"
                          value={pageTitle}
                          onChange={(e) => setPageTitle(e.target.value)}
                          className="w-full px-3 py-2 border rounded-lg focus:border-[#C45C1A] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] uppercase font-bold text-slate-400 mb-1">Page URL Slug (leave blank to auto-generate)</label>
                        <input
                          type="text"
                          placeholder="e.g., upera-regulations"
                          value={pageSlug}
                          onChange={(e) => setPageSlug(e.target.value)}
                          className="w-full px-3 py-2 border rounded-lg focus:border-[#C45C1A] outline-none font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9px] uppercase font-bold text-slate-400 mb-1">Rich Webpage Content</label>
                      <textarea
                        rows={6}
                        required
                        placeholder="Detail terms, conditions, map codes, or detailed parikrama regulations here..."
                        value={pageContent}
                        onChange={(e) => setPageContent(e.target.value)}
                        className="w-full px-3 py-2.5 border rounded-lg outline-none text-slate-800"
                      />
                    </div>

                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => setPageFormOpen(false)}
                        className="px-4 py-2 border text-slate-500 rounded font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-[#6B1A2A] text-white rounded font-bold uppercase"
                      >
                        Publish Custom Page
                      </button>
                    </div>
                  </form>
                )}

                <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-100 border-b text-slate-500 font-mono">
                        <th className="p-4">Title</th>
                        <th className="p-4">URL Slug Target</th>
                        <th className="p-4">State</th>
                        <th className="p-4 text-center">Wipe action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y text-slate-700">
                      {pages.map((pg) => (
                        <tr key={pg.id} className="hover:bg-slate-50">
                          <td className="p-4 font-bold text-slate-800">{pg.title}</td>
                          <td className="p-4 font-mono text-slate-400">/pages/{pg.slug}</td>
                          <td className="p-4 font-semibold text-green-700 uppercase">{pg.status}</td>
                          <td className="p-4 text-center">
                            <button
                              onClick={() => handleDeletePage(pg.id)}
                              className="p-1 text-red-600 border border-red-200 bg-red-50 hover:bg-red-100 rounded"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            )}

            {/* TAB 5: SITE LEDGER CONFIGURATION */}
            {activeTab === "settings" && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#6B1A2E]">Site Ledger Configuration</h2>
                  <p className="text-xs text-slate-500">Edit general hotlines, welcome texts, and RERA approval arrays.</p>
                </div>

                <form onSubmit={handleSettingsSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-[#C9A84C]/30 text-xs space-y-6 shadow-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Company Hero Headline</label>
                      <input
                        type="text"
                        value={confTitle}
                        onChange={(e) => setConfTitle(e.target.value)}
                        className="w-full px-3 py-2.5 border rounded-lg focus:border-[#C45C1A] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">WhatsApp advisory Hotline Number</label>
                      <input
                        type="text"
                        value={confPhone}
                        onChange={(e) => setConfPhone(e.target.value)}
                        className="w-full px-3 py-2.5 border rounded-lg focus:border-[#C45C1A] outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Hero Subtext</label>
                    <textarea
                      rows={3}
                      value={confSubtitle}
                      onChange={(e) => setConfSubtitle(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg outline-none text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 font-mono">Active UP RERA Numbers (comma-separated lists)</label>
                    <input
                      type="text"
                      placeholder="e.g., UPRERAPRJ12345, UPRERAPRJ5678"
                      value={confReras}
                      onChange={(e) => setConfReras(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg outline-none font-mono"
                    />
                  </div>

                  <div className="flex justify-end pt-4 border-t">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#6B1A2A] hover:bg-[#6B1A2A]/90 text-white font-bold rounded-lg uppercase tracking-wide flex items-center space-x-1 shadow"
                    >
                      <Save className="h-4 w-4 text-[#C9A84C]" />
                      <span>Commit Configuration Ledger</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </>
        )}

      </main>

    </div>
  );
};
export default AdminDashboard;
