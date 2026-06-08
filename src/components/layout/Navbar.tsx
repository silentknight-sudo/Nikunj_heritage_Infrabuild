/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { MessageSquare, Menu, X, User, LogOut, LayoutDashboard, Languages } from "lucide-react";
import { useAuth } from "../../lib/auth";

export const BrandLogoSVG: React.FC<{ className?: string }> = ({ className = "h-12 w-12" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Outer Double Gold Circles */}
    <circle cx="50" cy="50" r="45" stroke="#C9A84C" strokeWidth="2.5" />
    <circle cx="50" cy="50" r="41" stroke="#C9A84C" strokeWidth="1" />
    
    {/* Divine Krishna Flute (Bansuri) angled across */}
    <rect x="47" y="15" width="6" height="70" rx="3" transform="rotate(-30 50 50)" fill="#C9A84C" />
    {/* Flute Hole indicators */}
    <circle cx="43" cy="30" r="1.5" fill="#FAF6F0" />
    <circle cx="45" cy="38" r="1.5" fill="#FAF6F0" />
    <circle cx="48" cy="46" r="1.5" fill="#FAF6F0" />
    <circle cx="50" cy="54" r="1.5" fill="#FAF6F0" />
    <circle cx="52" cy="62" r="1.5" fill="#FAF6F0" />
    <circle cx="55" cy="70" r="1.5" fill="#FAF6F0" />

    {/* Elegant peacock feathers top right */}
    <path d="M47 15C42 5 28 5 35 18C40 25 45 20 47 15Z" fill="#0E7B6C" stroke="#C9A84C" strokeWidth="1.5" />
    <path d="M40 13C38 7 30 7 34 15C36 19 39 16 40 13Z" fill="#C45C1A" />
    <circle cx="36" cy="12" r="2.5" fill="#C9A84C" />

    <path d="M53 18C50 6 36 6 43 19C48 26 51 21 53 18Z" fill="#0E7B6C" stroke="#C9A84C" strokeWidth="1.5" />
    <path d="M46 15C44 9 36 9 40 17C42 21 45 18 46 15Z" fill="#C45C1A" />
    <circle cx="42" cy="14" r="2.5" fill="#C9A84C" />

    {/* Initials N H */}
    <text x="21" y="58" fill="#FAF6F0" fontSize="23" fontWeight="bold" fontFamily="serif" stroke="#C9A84C" strokeWidth="1">N</text>
    <text x="59" y="58" fill="#FAF6F0" fontSize="23" fontWeight="bold" fontFamily="serif" stroke="#C9A84C" strokeWidth="1">H</text>
  </svg>
);

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAdmin, logout, loginWithGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  // Simplified Lang Toggle state (just ui visual representation)
  const [language, setLanguage] = useState<"EN" | "HI">("EN");

  const toggleLanguage = () => {
    setLanguage(prev => (prev === "EN" ? "HI" : "EN"));
  };

  const navLinks = [
    { name: language === "EN" ? "Properties" : "सम्पत्तियां", path: "/properties" },
    { name: language === "EN" ? "Spiritual Retreats" : "आश्रम/कुटीर", path: "/properties?category=spiritual-retreats" },
    { name: language === "EN" ? "About Us" : "परिचय", path: "/about-us" },
    { name: language === "EN" ? "Blogs" : "लेखमाला", path: "/blogs" },
    { name: language === "EN" ? "Events" : "आयोजन", path: "/events" },
    { name: language === "EN" ? "Contact" : "संपर्क", path: "/contact-us" }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#FAF6F0]/90 backdrop-blur-md border-b border-[#C9A84C]/20 shadow-sm" id="sticky-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Brand Logo and Title */}
          <Link to="/" className="flex items-center space-x-3 group" id="navbar-brand-link">
            <div className="bg-[#1A1A2E] p-1 rounded-full border border-[#C9A84C]/40 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105">
              <BrandLogoSVG className="h-12 w-12" />
            </div>
            <div>
              <span className="block font-serif text-lg sm:text-xl font-bold tracking-wider text-[#6B1A2A] leading-tight">
                NIKUNJ HERITAGE
              </span>
              <span className="block text-[10px] sm:text-[11px] uppercase tracking-widest text-[#C45C1A] font-semibold">
                Infrabuild • Dwarka To Brijvas
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-1 lg:space-x-4 items-center">
            {navLinks.map((link) => {
              const active = location.pathname === link.path || (link.path.includes("?") && location.search === link.path.substring(link.path.indexOf("?")));
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    active
                      ? "text-[#C45C1A] font-semibold border-b-2 border-[#C45C1A] rounded-none"
                      : "text-[#1A1A2E] hover:text-[#C45C1A]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Actions & Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-full border border-[#C9A84C]/40 text-xs text-[#1A1A2E] font-medium bg-[#FAF6F0] hover:bg-[#C9A84C]/10 transition-colors"
              title="Toggle Language / भाषा बदलें"
            >
              <Languages className="h-3.5 w-3.5 text-[#C45C1A]" />
              <span>{language === "EN" ? "हिन्दी" : "English"}</span>
            </button>

            {/* WhatsApp Deep link */}
            <a
              href="https://wa.me/919719920888?text=Pranam,%20I'm%20interested%20in%20Nikunj%20Heritage%20properties%20in%20Mathura/Vrindavan."
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 bg-[#0E7B6C] hover:bg-[#0E7B6C]/90 text-white rounded-md text-sm font-medium flex items-center space-x-1.5 shadow transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <MessageSquare className="h-4 w-4" />
              <span>WhatsApp</span>
            </a>

            {/* Auth / Dashboard */}
            {user ? (
              <div className="flex items-center space-x-2">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="p-2 bg-[#C45C1A] text-white rounded-md hover:bg-[#C45C1A]/90 transition-colors"
                    title="Admin Dashboard"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="px-3 py-2 border border-[#6B1A2A]/40 text-[#6B1A2A] rounded-md text-sm font-medium hover:bg-[#6B1A2A]/5 transition-colors flex items-center space-x-1.5"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden lg:inline">Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={loginWithGoogle}
                className="px-3 py-2 bg-[#1A1A2E] text-white rounded-md text-sm font-medium hover:bg-[#1A1A2E]/90 transition-colors flex items-center space-x-1.5 shadow"
              >
                <User className="h-4 w-4 text-[#C9A84C]" />
                <span>Sign In</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleLanguage}
              className="p-2 border border-[#C9A84C]/40 text-xs text-[#1A1A2E] rounded-md bg-[#FAF6F0]"
            >
              <Languages className="h-4 w-4 text-[#C45C1A]" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-[#1A1A2E] hover:text-[#C45C1A] focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer menu */}
      {isOpen && (
        <div className="md:hidden bg-[#FAF6F0] border-t border-[#C9A84C]/20 shadow-inner px-2 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="block px-3 py-2.5 rounded-md text-base font-medium text-[#1A1A2E] hover:bg-[#C9A84C]/10 hover:text-[#C45C1A] transition-all"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 pb-2 border-t border-[#C9A84C]/20 flex flex-col space-y-2 px-3">
            <a
              href="https://wa.me/919719920888?text=Pranam,%20I'm%20interested%20in%20Nikunj%20Heritage%20properties%20in%20Mathura/Vrindavan."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-[#0E7B6C] hover:bg-[#0E7B6C]/90 text-white rounded-md text-center font-medium flex items-center justify-center space-x-2 shadow"
            >
              <MessageSquare className="h-5 w-5" />
              <span>WhatsApp Chat</span>
            </a>

            {user ? (
              <div className="flex space-x-2 pt-2">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="flex-1 py-2.5 bg-[#C45C1A] text-white rounded-md text-center font-medium flex items-center justify-center space-x-1.5"
                    onClick={() => setIsOpen(false)}
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Admin Panel</span>
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="flex-1 py-2.5 border border-[#6B1A2A]/40 text-[#6B1A2A] rounded-md font-medium hover:bg-[#6B1A2A]/5 flex items-center justify-center space-x-1.5"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  loginWithGoogle();
                  setIsOpen(false);
                }}
                className="w-full py-2.5 bg-[#1A1A2E] text-white rounded-md text-center font-medium flex items-center justify-center space-x-2 shadow"
              >
                <User className="h-5 w-5 text-[#C9A84C]" />
                <span>Sign In with Google</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
