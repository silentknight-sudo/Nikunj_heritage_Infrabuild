/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  LayoutDashboard, 
  Languages, 
  Heart, 
  MessageSquare, 
  Phone, 
  Trash2, 
  ArrowRight, 
  Sparkles,
  MapPin,
  Calendar
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../../lib/auth";
import { getProperties } from "../../lib/firestore";
import { Property } from "../../types";
import { formatPrice } from "../../lib/utils";

// High-fidelity custom round gold-logo with Bansuri flute & Peacock feathers
export const BrandLogoSVG: React.FC<{ className?: string }> = ({ className = "h-12 w-12" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" stroke="#C9A84C" strokeWidth="2.5" />
    <circle cx="50" cy="50" r="41" stroke="#C9A84C" strokeWidth="1" />
    
    {/* Flute */}
    <rect x="47" y="15" width="6" height="70" rx="3" transform="rotate(-30 50 50)" fill="#C9A84C" />
    
    {/* Flute Holes */}
    <circle cx="43" cy="30" r="1.5" fill="#FAF6F0" />
    <circle cx="45" cy="38" r="1.5" fill="#FAF6F0" />
    <circle cx="48" cy="46" r="1.5" fill="#FAF6F0" />
    <circle cx="50" cy="54" r="1.5" fill="#FAF6F0" />
    <circle cx="52" cy="62" r="1.5" fill="#FAF6F0" />
    <circle cx="55" cy="70" r="1.5" fill="#FAF6F0" />

    {/* Peacock Feathers */}
    <path d="M47 15C42 5 28 5 35 18C40 25 45 20 47 15Z" fill="#0E7B6C" stroke="#C9A84C" strokeWidth="1.5" />
    <path d="M40 13C38 7 30 7 34 15C36 19 39 16 40 13Z" fill="#C45C1A" />
    <circle cx="36" cy="12" r="2.5" fill="#C9A84C" />

    <path d="M53 18C50 6 36 6 43 19C48 26 51 21 53 18Z" fill="#0E7B6C" stroke="#C9A84C" strokeWidth="1.5" />
    <path d="M46 15C44 9 36 9 40 17C42 21 45 18 46 15Z" fill="#C45C1A" />
    <circle cx="42" cy="14" r="2.5" fill="#C9A84C" />

    {/* Center Monograms N H */}
    <text x="21" y="58" fill="#FAF6F0" fontSize="23" fontWeight="bold" fontFamily="serif" stroke="#C9A84C" strokeWidth="1">N</text>
    <text x="59" y="58" fill="#FAF6F0" fontSize="23" fontWeight="bold" fontFamily="serif" stroke="#C9A84C" strokeWidth="1">H</text>
  </svg>
);

export const Navbar: React.FC = () => {
  const { user, isAdmin, logout, loginWithGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Full screen mega-portal toggle and Wishlist side drawer toggle
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  
  // Immersive Language state
  const [language, setLanguage] = useState<"EN" | "HI">("EN");

  // Sync Wishlist and Load Properties
  useEffect(() => {
    const syncWishlist = () => {
      try {
        const stored = JSON.parse(localStorage.getItem("nh_wishlist") || "[]");
        setWishlistIds(stored);
      } catch (err) {
        console.warn("Error reading wishlist:", err);
      }
    };
    syncWishlist();

    const fetchAllProps = async () => {
      try {
        const list = await getProperties();
        setAllProperties(list);
      } catch (err) {
        console.error("Error loading navbar properties:", err);
      }
    };
    fetchAllProps();

    // Listen for custom trigger when properties are saved/unsaved
    window.addEventListener("storage", syncWishlist);
    const interval = setInterval(syncWishlist, 1500); // Poll backup

    return () => {
      window.removeEventListener("storage", syncWishlist);
      clearInterval(interval);
    };
  }, []);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === "EN" ? "HI" : "EN"));
  };

  const giftToWhatsApp = (text: string) => {
    return `https://wa.me/919719920888?text=${encodeURIComponent(text)}`;
  };

  const removeWishlistItem = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = wishlistIds.filter((item) => item !== id);
    setWishlistIds(updated);
    localStorage.setItem("nh_wishlist", JSON.stringify(updated));
  };

  // Filter properties currently liked
  const likedProperties = allProperties.filter(p => wishlistIds.includes(p.id));

  // Regular horizontal desktop links
  const topNavLinks = [
    { name: "Home", path: "/" },
    { name: "Properties", path: "/properties" },
    { name: "Compare", path: "/compare-properties" },
    { name: "ROI Calculator", path: "/roi-calculator" },
    { name: "Events", path: "/events" },
    { name: "Blogs", path: "/blogs" },
    { name: "News", path: "/news" },
    { name: "Developers", path: "/developers", activeColor: true }
  ];

  return (
    <>
      {/* 1. Main Premium Fixed Header bar matching the mockup */}
      <nav 
        className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300 h-20 flex items-center select-none" 
        id="nh-sticky-header"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between items-center">
          
          {/* Logo Brand Sector matching the screenshot */}
          <Link to="/" className="flex items-center space-x-3 group shrink-0" id="navbar-brand-link">
            <div className="bg-[#1A1A2E] p-1.5 rounded-full border border-[#C9A84C]/45 flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105">
              <BrandLogoSVG className="h-11 w-11" />
            </div>
            <div className="text-left font-serif">
              <span className="block text-base sm:text-[19px] font-black tracking-wide text-[#1A1A2E] leading-none uppercase">
                Nikunj Heritage
              </span>
              <span className="block text-[9px] uppercase tracking-[0.25em] text-[#C45C1A] font-extrabold mt-1">
                INFRABUILD
              </span>
            </div>
          </Link>

          {/* Large Screen horizontal navbar anchors */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-4">
            {topNavLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-2.5 py-1.5 rounded-md text-[13px] font-bold tracking-wide transition-all uppercase duration-200 font-sans ${
                    active
                      ? "text-[#C45C1A] border-b-2 border-[#C45C1A] rounded-none"
                      : link.activeColor 
                        ? "text-[#C45C1A] hover:opacity-80" 
                        : "text-slate-700 hover:text-[#C45C1A]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Language Selection */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-slate-200 text-xs text-slate-700 font-bold hover:bg-slate-50 transition-colors ml-2"
              title="बदले भाषा / Switch Language"
            >
              <span>{language === "EN" ? "हिन्दी 🇮🇳" : "English 🇬🇧"}</span>
            </button>
          </div>

          {/* Quick Actions & Icons matching the mockup */}
          <div className="flex items-center space-x-2.5 sm:space-x-4">
            
            {/* Heart Wishlist Trigger */}
            <button
              onClick={() => setIsFavoritesOpen(true)}
              className="p-2.5 text-slate-700 hover:text-rose-600 transition-colors duration-200 relative focus:outline-none"
              aria-label="Wishlist drawer trigger"
            >
              <Heart className={`h-5 w-5 ${wishlistIds.length > 0 ? "fill-rose-500 text-rose-500 animate-pulse" : ""}`} />
              {wishlistIds.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4.5 w-4.5 bg-rose-500 text-white font-mono text-[9px] font-extrabold rounded-full flex items-center justify-center border border-white">
                  {wishlistIds.length}
                </span>
              )}
            </button>

            {/* Sign In Trigger */}
            {user ? (
              <div className="flex items-center space-x-1 sm:space-x-3">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="p-2 bg-[#C45C1A] text-white rounded-lg hover:bg-[#C45C1A]/90 transition-colors"
                    title="Developer Portal Admin Panel"
                  >
                    <LayoutDashboard className="h-4.5 w-4.5" />
                  </Link>
                )}
                
                <button
                  onClick={logout}
                  className="hidden md:flex items-center space-x-1 px-3 py-2 border border-[#6B1A2A]/40 text-[#6B1A2A] rounded-lg text-xs font-bold font-mono hover:bg-[#6B1A2A]/5 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Log Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={loginWithGoogle}
                className="hidden md:flex items-center space-x-1.5 px-3 py-2 bg-slate-50 border border-slate-100 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-100 transition-colors"
              >
                <User className="h-4 w-4 text-[#C9A84C]" />
                <span>Sign In</span>
              </button>
            )}

            {/* Book Visit Button - High Fidelity styled orange CTA block */}
            <a
              href={giftToWhatsApp("Pranam Nikunj Heritage! I saw your catalog and would like to Book a spiritual site visit to Vrindavan.")}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#C45C1A] hover:bg-[#C45C1A]/95 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-[13px] font-serif font-black uppercase tracking-wider flex items-center space-x-1.5 shadow transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <Phone className="h-3.5 w-3.5 shrink-0 animate-bounce" />
              <span>Book Visit</span>
            </a>

            {/* Main Full-Screen Mega Menu Toggle */}
            <button
              onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
              className="p-2 sm:p-2.5 text-slate-800 hover:text-[#C45C1A] focus:outline-none transition-colors border border-slate-100 rounded-lg hover:bg-slate-50"
              aria-label="Mega menu portal toggle"
            >
              {isMegaMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

          </div>

        </div>
      </nav>

      {/* 2. GLORIOUS FULL-SCREEN MEGA-PORTAL COVER OVERLAY */}
      <AnimatePresence>
        {isMegaMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-white flex flex-col justify-between pt-20 h-screen overflow-y-auto select-none"
            id="fullscreen-mega-portal"
          >
            {/* Core central elements */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 flex-grow flex flex-col justify-center">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
                
                {/* Brand Showcase Block (4-columns) */}
                <div className="md:col-span-4 text-left space-y-5">
                  <div className="flex items-center space-x-3.5">
                    <div className="bg-[#1A1A2E] p-2.5 rounded-full border border-[#C9A84C] flex items-center justify-center">
                      <BrandLogoSVG className="h-14 w-14" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                        NIKUNJ HERITAGE
                      </h3>
                      <p className="text-xs uppercase tracking-widest text-[#C45C1A] font-extrabold font-mono mt-1">
                        INFRABUILD
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans font-light">
                    Where pristine architectural luxury of heritage havelis harmoniously binds with Vrindavan's sacred, transcendental woodlands. Join us in cultivating authentic Vedic landholdings with 100% legal backing.
                  </p>

                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1.5 bg-[#0E7B6C]/10 border border-[#0E7B6C]/20 text-[#0E7B6C] text-[10px] font-bold font-mono tracking-wider px-3.5 py-1.5 rounded-full uppercase">
                      <Sparkles className="h-3 w-3 animate-spin text-[#C9A84C]" />
                      SOCIALLY ALIGNED LEDGER
                    </span>
                  </div>
                </div>

                {/* Column lists (8-columns, matching two columns list in screenshot) */}
                <div className="md:col-span-8 space-y-6 text-left">
                  <span className="text-[#C45C1A] text-xs font-mono font-black tracking-widest block border-b border-slate-100 pb-2 uppercase">
                    CORE PORTALS
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
                    
                    {/* Left Column Links */}
                    <div className="flex flex-col space-y-4">
                      
                      <Link 
                        to="/" 
                        className="text-lg font-bold text-slate-800 hover:text-[#C45C1A] font-sans transition-colors tracking-wide flex items-center justify-between group"
                        onClick={() => setIsMegaMenuOpen(false)}
                      >
                        <span>Home</span>
                        <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 text-[#C45C1A] transition-all transform group-hover:translate-x-1" />
                      </Link>

                      <Link 
                        to="/compare-properties" 
                        className="text-lg font-bold text-slate-800 hover:text-[#C45C1A] font-sans transition-colors tracking-wide flex items-center justify-between group"
                        onClick={() => setIsMegaMenuOpen(false)}
                      >
                        <span>Compare</span>
                        <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 text-[#C45C1A] transition-all transform group-hover:translate-x-1" />
                      </Link>

                      <Link 
                        to="/events" 
                        className="text-lg font-bold text-slate-800 hover:text-[#C45C1A] font-sans transition-colors tracking-wide flex items-center justify-between group"
                        onClick={() => setIsMegaMenuOpen(false)}
                      >
                        <span>Events</span>
                        <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 text-[#C45C1A] transition-all transform group-hover:translate-x-1" />
                      </Link>

                      <Link 
                        to="/news" 
                        className="text-lg font-bold text-slate-800 hover:text-[#C45C1A] font-sans transition-colors tracking-wide flex items-center justify-between group"
                        onClick={() => setIsMegaMenuOpen(false)}
                      >
                        <span>News</span>
                        <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 text-[#C45C1A] transition-all transform group-hover:translate-x-1" />
                      </Link>

                      <Link 
                        to="/testimonials" 
                        className="text-lg font-bold text-slate-800 hover:text-[#C45C1A] font-sans transition-colors tracking-wide flex items-center justify-between group"
                        onClick={() => setIsMegaMenuOpen(false)}
                      >
                        <span>Happy Customers</span>
                        <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 text-[#C45C1A] transition-all transform group-hover:translate-x-1" />
                      </Link>

                      <Link 
                        to="/about-us" 
                        className="text-lg font-bold text-slate-800 hover:text-[#C45C1A] font-sans transition-colors tracking-wide flex items-center justify-between group"
                        onClick={() => setIsMegaMenuOpen(false)}
                      >
                        <span>About Us</span>
                        <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 text-[#C45C1A] transition-all transform group-hover:translate-x-1" />
                      </Link>

                      <Link 
                        to="/career" 
                        className="text-lg font-bold text-slate-800 hover:text-[#C45C1A] font-sans transition-colors tracking-wide flex items-center justify-between group"
                        onClick={() => setIsMegaMenuOpen(false)}
                      >
                        <span>Careers</span>
                        <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 text-[#C45C1A] transition-all transform group-hover:translate-x-1" />
                      </Link>

                    </div>

                    {/* Right Column Links */}
                    <div className="flex flex-col space-y-4">
                      
                      <Link 
                        to="/properties" 
                        className="text-lg font-bold text-slate-800 hover:text-[#C45C1A] font-sans transition-colors tracking-wide flex items-center justify-between group"
                        onClick={() => setIsMegaMenuOpen(false)}
                      >
                        <span>Properties</span>
                        <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 text-[#C45C1A] transition-all transform group-hover:translate-x-1" />
                      </Link>

                      <Link 
                        to="/roi-calculator" 
                        className="text-lg font-bold text-slate-800 hover:text-[#C45C1A] font-sans transition-colors tracking-wide flex items-center justify-between group"
                        onClick={() => setIsMegaMenuOpen(false)}
                      >
                        <span>ROI Calculator</span>
                        <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 text-[#C45C1A] transition-all transform group-hover:translate-x-1" />
                      </Link>

                      <Link 
                        to="/blogs" 
                        className="text-lg font-bold text-slate-800 hover:text-[#C45C1A] font-sans transition-colors tracking-wide flex items-center justify-between group"
                        onClick={() => setIsMegaMenuOpen(false)}
                      >
                        <span>Blogs</span>
                        <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 text-[#C45C1A] transition-all transform group-hover:translate-x-1" />
                      </Link>

                      <Link 
                        to="/developers" 
                        className="text-lg font-bold text-[#C45C1A] hover:opacity-85 font-sans transition-colors tracking-wide flex items-center justify-between group"
                        onClick={() => setIsMegaMenuOpen(false)}
                      >
                        <span>Developers</span>
                        <ArrowRight className="h-4 w-4 opacity-100 text-[#C45C1A] transition-all transform group-hover:translate-x-1" />
                      </Link>

                      <Link 
                        to="/life-at-nhi" 
                        className="text-lg font-bold text-slate-800 hover:text-[#C45C1A] font-sans transition-colors tracking-wide flex items-center justify-between group"
                        onClick={() => setIsMegaMenuOpen(false)}
                      >
                        <span>Life at NHI</span>
                        <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 text-[#C45C1A] transition-all transform group-hover:translate-x-1" />
                      </Link>

                      <Link 
                        to="/contact-us" 
                        className="text-lg font-bold text-slate-800 hover:text-[#C45C1A] font-sans transition-colors tracking-wide flex items-center justify-between group"
                        onClick={() => setIsMegaMenuOpen(false)}
                      >
                        <span>Contact Us</span>
                        <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 text-[#C45C1A] transition-all transform group-hover:translate-x-1" />
                      </Link>

                    </div>

                  </div>
                </div>

              </div>

              {/* Bottom option bar: Google Sign In on bottom-left, in menu scope */}
              <div className="mt-12 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div className="text-left font-mono text-slate-400 text-xs">
                  © 2026 Nikunj Heritage Infrabuild. Mathura-Vrindavan Roadways.
                </div>
                
                {/* Sign In with Google option */}
                <div className="flex items-center gap-2">
                  {!user ? (
                    <button
                      onClick={() => {
                        loginWithGoogle();
                        setIsMegaMenuOpen(false);
                      }}
                      className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 text-xs font-bold font-mono rounded-xl hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2"
                    >
                      <svg className="h-4 w-4 text-rose-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.25z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                      </svg>
                      <span>Sign In with Google</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl">
                      <span className="text-xs text-slate-500 font-mono">Signed in as</span>
                      <span className="text-xs text-slate-800 font-bold font-mono">{user.displayName || user.email}</span>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* 3. Infinite Call consultation footer bar exactly matching screenshot layout bottom */}
            <a
              href={giftToWhatsApp("Pranam Nikunj Heritage! I'd like to book a Free commercial consultation regarding properties in Vrindavan.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4.5 bg-[#C45C1A] hover:bg-[#C45C1A]/95 text-white flex items-center justify-center space-x-2 text-sm sm:text-base font-serif font-black uppercase tracking-widest border-t border-[#C9A84C]/35 filter drop-shadow-md cursor-pointer transition-colors"
            >
              <Phone className="h-5 w-5 animate-pulse" />
              <span>Book Free Consultation</span>
            </a>

          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. SLIDING DRAWER OVERLAY FOR LIKED / FAVORITES PROPERTIES */}
      <AnimatePresence>
        {isFavoritesOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden" id="favorites-drawer-root">
            {/* Dark blur glass backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFavoritesOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            <div className="absolute inset-y-0 right-0 max-w-full pl-10 flex">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: "0%" }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between"
              >
                {/* Header */}
                <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-rose-500 fill-rose-500" />
                    <h3 className="font-serif text-lg font-black text-[#1A1A2E] uppercase tracking-wide">
                      Your Wishlist ({likedProperties.length})
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsFavoritesOpen(false)}
                    className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Body Bookmarks */}
                <div className="flex-grow overflow-y-auto px-6 py-4 space-y-4">
                  {likedProperties.length === 0 ? (
                    <div className="h-64 flex flex-col items-center justify-center text-center text-slate-400 space-y-3">
                      <Heart className="h-10 w-10 text-slate-300 stroke-1" />
                      <p className="text-sm font-sans tracking-wide">No properties favorited yet.</p>
                      <Link
                        to="/properties"
                        onClick={() => setIsFavoritesOpen(false)}
                        className="text-xs text-[#C45C1A] font-bold uppercase underline"
                      >
                        Browse Temple Landholdings
                      </Link>
                    </div>
                  ) : (
                    likedProperties.map((p) => (
                      <div 
                        key={p.id} 
                        className="flex gap-4 border border-slate-100 p-3 rounded-xl hover:bg-slate-50 transition-colors relative group"
                      >
                        {/* Image Thumbnail */}
                        <div className="h-16 w-20 rounded-lg overflow-hidden shrink-0 bg-slate-100 relative">
                          <img 
                            src={p.imageUrls?.[0] || "https://images.unsplash.com/photo-1545229765-7018d6ff02bd?auto=format&fit=crop&q=80&w=300"} 
                            alt={p.title} 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Title Copy */}
                        <div className="flex-grow space-y-1 text-left min-w-0">
                          <h4 className="font-serif text-xs sm:text-sm font-black text-slate-900 truncate">
                            {p.title}
                          </h4>
                          <p className="text-[#C45C1A] text-xs font-mono font-bold leading-tight">
                            {formatPrice(p.price)}
                          </p>
                          <p className="text-[10px] text-slate-500 font-sans truncate">
                            {p.bhk} • {p.area} Sq Ft
                          </p>
                        </div>

                        {/* Remove trash element */}
                        <button
                          onClick={(e) => removeWishlistItem(p.id, e)}
                          className="text-slate-400 hover:text-rose-500 p-1 rounded-md self-center transition-colors shrink-0"
                          title="Remove from favorites"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        
                        {/* Direct detailed deep link */}
                        <Link 
                          to={`/properties/${p.slug}`} 
                          onClick={() => setIsFavoritesOpen(false)}
                          className="absolute inset-0 z-0 bg-transparent"
                          aria-label={`View details of ${p.title}`}
                        />
                      </div>
                    ))
                  )}
                </div>

                {/* Footer and dynamic actions */}
                <div className="border-t border-slate-100 p-6 bg-slate-50 space-y-3">
                  <div className="flex justify-between items-center text-xs text-slate-500 font-mono font-bold uppercase">
                    <span>Active Inquiries</span>
                    <span className="text-[#0E7B6C] font-black">● Live Support</span>
                  </div>
                  
                  <a
                    href={giftToWhatsApp(`Pranam! I've wishlisted ${likedProperties.length} properties via your new portal. Please share details.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-[#C45C1A] hover:bg-[#C45C1A]/95 text-white font-serif font-black text-xs uppercase text-center rounded-xl tracking-wider shadow-md flex items-center justify-center gap-2 transition-all block"
                  >
                    <span>Inquire wishlist via WhatsApp</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>

                  <button
                    onClick={() => {
                      setIsFavoritesOpen(false);
                      navigate("/compare-properties");
                    }}
                    className="w-full py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-black uppercase text-center rounded-xl tracking-wider transition-colors"
                  >
                    Compare Wishlisted Assets
                  </button>
                </div>

              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
