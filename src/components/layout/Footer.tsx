/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Twitter, MapPin, Phone, Mail, Award } from "lucide-react";
import { getPages, getSiteConfig } from "../../lib/firestore";
import { Page, SiteConfig } from "../../types";
import { BrandLogoSVG } from "./Navbar";

export const MandolaDividerSVG: React.FC<{ className?: string }> = ({ className = "w-full text-[#C9A84C]/30" }) => (
  <div className={`flex items-center justify-center py-2 ${className}`}>
    <div className="flex-grow border-t border-dashed border-[#C9A84C]/30"></div>
    <div className="mx-4 flex items-center space-x-1">
      {/* Mini lotus outline center */}
      <svg className="h-6 w-8 fill-none stroke-[#C9A84C]" viewBox="0 0 40 30">
        <path d="M20 5C17 15 10 18 20 28C30 18 23 15 20 5Z" strokeWidth="1.5" />
        <path d="M20 12C12 18 5 22 15 28C25 22 18 18 20 12Z" strokeWidth="1" />
        <path d="M20 12C28 18 35 22 25 28C15 22 22 18 20 12Z" strokeWidth="1" />
      </svg>
    </div>
    <div className="flex-grow border-t border-dashed border-[#C9A84C]/30"></div>
  </div>
);

export const Footer: React.FC = () => {
  const [dynamicPages, setDynamicPages] = useState<Page[]>([]);
  const [config, setConfig] = useState<SiteConfig | null>(null);

  useEffect(() => {
    async function loadFooterData() {
      try {
        const c = await getSiteConfig();
        setConfig(c);
        
        const allPages = await getPages();
        const footerLinks = allPages.filter(p => p.status === "Published" && p.showInFooter);
        setDynamicPages(footerLinks);
      } catch (e) {
        console.error("Failed to load footer data:", e);
      }
    }
    loadFooterData();
  }, []);

  return (
    <footer className="bg-[#1A1A2E] text-[#FAF6F0] border-t-2 border-[#C9A84C]/40 pt-16 pb-8" id="footer-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Footer Grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Card column */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-[#FAF6F0] p-1.5 rounded-full border border-[#C9A84C]/60 inline-flex">
                <BrandLogoSVG className="h-14 w-14" />
              </div>
              <div>
                <span className="block font-serif text-xl sm:text-2xl font-bold tracking-wider text-[#C9A84C] leading-tight">
                  NIKUNJ HERITAGE
                </span>
                <span className="block text-[11px] uppercase tracking-widest text-[#C45C1A] font-semibold">
                  Infrabuild Private Ltd.
                </span>
              </div>
            </div>
            
            <p className="text-xs text-[#FAF6F0]/70 font-sans tracking-wide leading-relaxed">
              We specialize in bringing you closer to Lord Krishna. Empowering hundreds of pious Brijvas families step into state-of-the-art heritage apartments and villas in Mathura & Vrindavan since 2011.
            </p>

            {/* Social Grid */}
            <div className="flex space-x-4 pt-2">
              <a href={config?.facebookUrl || "https://facebook.com"} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-[#FAF6F0]/20 hover:border-[#C45C1A] hover:bg-[#C45C1A] transition-all">
                <Facebook className="h-4 w-4" />
              </a>
              <a href={config?.instagramUrl || "https://instagram.com"} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-[#FAF6F0]/20 hover:border-[#C45C1A] hover:bg-[#C45C1A] transition-all">
                <Instagram className="h-4 w-4" />
              </a>
              <a href={config?.youtubeUrl || "https://youtube.com"} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-[#FAF6F0]/20 hover:border-[#C45C1A] hover:bg-[#C45C1A] transition-all">
                <Youtube className="h-4 w-4" />
              </a>
              <a href={config?.twitterUrl || "https://twitter.com"} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-[#FAF6F0]/20 hover:border-[#C45C1A] hover:bg-[#C45C1A] transition-all">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Map */}
          <div>
            <h4 className="font-serif text-[#C9A84C] text-lg font-semibold tracking-wider border-b border-[#C9A84C]/20 pb-2 mb-4">
              Explore Spaces
            </h4>
            <ul className="space-y-2 text-sm text-[#FAF6F0]/80">
              <li>
                <Link to="/properties" className="hover:text-[#C45C1A] transition-colors">• All Properties</Link>
              </li>
              <li>
                <Link to="/properties?category=residential-apartments" className="hover:text-[#C45C1A] transition-colors">• Flats & Apartments</Link>
              </li>
              <li>
                <Link to="/properties?category=luxury-villas" className="hover:text-[#C45C1A] transition-colors">• Luxury Haveli Villas</Link>
              </li>
              <li>
                <Link to="/properties?category=plots-and-land" className="hover:text-[#C45C1A] transition-colors">• Freehold Land Plots</Link>
              </li>
              <li>
                <Link to="/properties?category=spiritual-retreats" className="hover:text-[#C45C1A] transition-colors">• Ashram Retreats</Link>
              </li>
              <li>
                <Link to="/testimonials" className="hover:text-[#C45C1A] transition-colors">• Happy Customers</Link>
              </li>
            </ul>
          </div>

          {/* Dynamic Extra CMS Pages & legal */}
          <div>
            <h4 className="font-serif text-[#C9A84C] text-lg font-semibold tracking-wider border-b border-[#C9A84C]/20 pb-2 mb-4">
              Legal & Support
            </h4>
            <ul className="space-y-2 text-sm text-[#FAF6F0]/80 pb-3">
              {dynamicPages.map(page => (
                <li key={page.id}>
                  <Link to={`/pages/${page.slug}`} className="hover:text-[#C45C1A] transition-colors">
                    • {page.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/about-us" className="hover:text-[#C45C1A] transition-colors">• Vision & Story</Link>
              </li>
              <li>
                <Link to="/career" className="hover:text-[#C45C1A] transition-colors">• Careers</Link>
              </li>
            </ul>

            {/* RERA Certificate Grid Badge */}
            <div className="mt-3 bg-white/5 border border-[#C9A84C]/30 p-3 rounded-lg">
              <div className="flex items-center space-x-1.5 mb-2 border-b border-[#FAF6F0]/10 pb-1.5">
                <Award className="h-4.5 w-4.5 text-[#C9A84C]" />
                <span className="text-xs font-serif font-semibold text-[#C9A84C] tracking-wider">REGIONAL RERA CODES</span>
              </div>
              <div className="text-[10px] font-mono text-[#FAF6F0]/70 space-y-1.5">
                <div className="flex justify-between border-b border-[#FAF6F0]/5 pb-1">
                  <span>UP RERA:</span>
                  <span className="font-bold text-[#faf6f0]">UPRERAPRJ428135</span>
                </div>
                <div className="flex justify-between border-b border-[#FAF6F0]/5 pb-1">
                  <span>DELHI RERA:</span>
                  <span className="font-bold text-[#faf6f0]">DLRERA20240951</span>
                </div>
                <div className="flex justify-between border-b border-[#FAF6F0]/5 pb-1">
                  <span>UK RERA:</span>
                  <span className="font-bold text-[#faf6f0]">UKRERA1282001</span>
                </div>
                <div className="flex justify-between">
                  <span>HR RERA:</span>
                  <span className="font-bold text-[#faf6f0]">HRERA20263301</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details Column */}
          <div>
            <h4 className="font-serif text-[#C9A84C] text-lg font-semibold tracking-wider border-b border-[#C9A84C]/20 pb-2 mb-4">
              Brijvas Office
            </h4>
            <ul className="space-y-3 text-xs text-[#FAF6F0]/80">
              <li className="flex items-start space-x-2.5">
                <MapPin className="h-5 w-5 text-[#C45C1A] shrink-0" />
                <span className="leading-snug">{config?.address || "21/s3, Sec-3 Rukmani Vihar, Vrindavan 281121"}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="h-4 w-4 text-[#C45C1A] shrink-0" />
                <span>{config?.phone || "+91-9719920888"}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="h-4 w-4 text-[#C45C1A] shrink-0" />
                <span>{config?.email || "info@nikunjheritageinfrabuild.com"}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Mandala SVG and disclaimer section */}
        <MandolaDividerSVG className="my-10" />

        <div className="text-center text-[10px] sm:text-xs text-[#FAF6F0]/50 space-y-3 font-sans leading-relaxed px-4 max-w-5xl mx-auto">
          <p>
            {config?.footerDisclaimer || "Disclaimer: The layouts, images, and maps shown are representations of architectural intents for the newly launched Vrindavan assets. Please refer directly to standard RERA guidelines before finalizing standard property sales agreements."}
          </p>
          <p className="pt-2 border-t border-[#FAF6F0]/10 tracking-widest text-[#C9A84C] font-semibold text-[11px]">
            “ परम्परा विश्वास की नींव प्रगति की ”
          </p>
          <p className="text-[10px] text-[#FAF6F0]/45">
            © {new Date().getFullYear()} Nikunj Heritage Infrabuild Pvt Ltd. Built with celestial luxury and devotion.
          </p>
        </div>

      </div>
    </footer>
  );
};
