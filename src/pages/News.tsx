/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Newspaper, ArrowRight, Calendar, Bookmark, Share2 } from "lucide-react";
import { ScrollFade, ThreeDCard, ParticleGlow } from "../components/common/MotionWrapper";

interface PressRelease {
  id: string;
  title: string;
  source: string;
  date: string;
  summary: string;
  imageUrl: string;
  category: "Development" | "Regulation" | "Spiritual Land" | "Market Trend";
}

const NEWS_ARTICLES: PressRelease[] = [
  {
    id: "news-1",
    title: "Nikunj Heritage expansion in Rukmani Vihar gets RERA green signal",
    source: "Braj Times Herald",
    date: "June 12, 2026",
    summary: "The second phase of the premium Sanskrit-themed luxury villa development in Rukmani Vihar, Vrindavan, secures complete regulatory clearance and structural health approvals.",
    imageUrl: "https://images.unsplash.com/photo-1545229765-7018d6ff02bd?auto=format&fit=crop&q=80&w=800",
    category: "Regulation"
  },
  {
    id: "news-2",
    title: "Spiritual Tourism boom drives 40% uptick in Vrindavan freehold plot demands",
    source: "Financial Braj Chronicle",
    date: "May 28, 2026",
    summary: "A surge in parikrama pilgrims and remote-working spiritual seekers triggers record land-registry numbers. Nikunj Heritage lands remain top choice for secure deeds.",
    imageUrl: "https://images.unsplash.com/photo-1561361060-6398faf90278?auto=format&fit=crop&q=80&w=800",
    category: "Market Trend"
  },
  {
    id: "news-3",
    title: "Vrindavan-Govardhan corridor connection work fast-tracked by authorities",
    source: "Uttar Pradesh Infra News",
    date: "April 15, 2026",
    summary: "Four-lane elevated corridor to cut travel time between ISKCON Vrindavan and Govardhan Kunds down to 18 minutes. Nikunj Heritage sites strategically positioned for massive proximity gains.",
    imageUrl: "https://images.unsplash.com/photo-1626014303757-6fc6610674ce?auto=format&fit=crop&q=80&w=800",
    category: "Development"
  },
  {
    id: "news-4",
    title: "Organic Sacred Grove (Nidhivan-inspired) green belt introduced in upcoming plots",
    source: "Vedic Ecology Journal",
    date: "March 02, 2026",
    summary: "Nikunj Heritage commits to preserving indigenous Braj flora with dedicated ancient sandalwood, Kadamba, and Tulsi groves bordering its eco-retreat properties.",
    imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=800",
    category: "Spiritual Land"
  }
];

export const News: React.FC = () => {
  return (
    <div className="bg-[#FAF6F0] min-h-screen py-16 px-4 sm:px-6 lg:px-8 text-[#1A1A2E]" id="news-page-container">
      <div className="max-w-7xl mx-auto">
        
        {/* Editorial Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-[#C45C1A]/10 text-[#C45C1A] px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4 border border-[#C45C1A]/20">
            <Newspaper className="h-4 w-4" />
            <span>PRESS ROOM & REVIEWS</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Latest Media & Infrabuild Buzz
          </h1>
          <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
            Follow major commercial announcements, industrial growth news, regulatory filings, and media highlights direct from India's spiritual heartland.
          </p>
        </div>

        {/* Featured Headlines Section */}
        <ScrollFade direction="up">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            
            {/* Spotlight Prime News (Left 7-columns) */}
            <div className="lg:col-span-7 bg-[#1A1A2E] text-white rounded-3xl overflow-hidden shadow-2xl relative flex flex-col justify-end min-h-[450px] p-6 sm:p-10 border border-[#C9A84C]/30 group">
              <div className="absolute inset-0">
                <img 
                  src="https://images.unsplash.com/photo-1545229765-7018d6ff02bd?auto=format&fit=crop&q=80&w=1200" 
                  alt="Grand Vrindavan Project Spotlight" 
                  className="w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent"></div>
              </div>

              <div className="relative z-10 space-y-4">
                <span className="bg-[#C45C1A] text-white text-[10px] font-bold font-mono tracking-widest px-3 py-1 rounded-full uppercase border border-[#C9A84C]/30 flex items-center w-fit gap-1">
                  <Bookmark className="h-3 w-3 text-[#C9A84C] fill-[#C9A84C]" />
                  MEDIA EXCLUSIVE COVERAGE
                </span>

                <h2
                  className="font-serif text-2xl sm:text-4xl font-extrabold tracking-wide leading-tight text-[#FB923C]"
                  style={{ color: "#FB923C" }}
                >
                  Nikunj Heritage named Premium Spiritual Developer of the Year 2026
                </h2>

                <p className="text-xs sm:text-sm text-[#FAF6F0]/80 font-sans leading-relaxed max-w-2xl font-light">
                  Recognized by the National Spiritual Infrastructure Federation for impeccable 100% legal title clearance registry, transparent customer escrow accounts, and dedicated focus on sustainable Braj heritage architecture.
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs text-[#FAF6F0]/60">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#C9A84C]">Sanskrit Real Estate Weekly</span>
                    <span>•</span>
                    <span>June 15, 2026</span>
                  </div>
                  <button className="text-[#C9A84C] hover:text-white flex items-center gap-1.5 transition-colors font-semibold">
                    <span>Full Coverage</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick newsletter subscription (Right 5-columns) */}
            <div className="lg:col-span-5 bg-white border border-[#C9A84C]/20 rounded-3xl p-6 sm:p-10 shadow-lg flex flex-col justify-between relative overflow-hidden">
              <ParticleGlow color="#FAF6F0" />
              <div className="relative z-10 space-y-6">
                <div>
                  <span className="text-[#C45C1A] text-xs font-bold font-mono tracking-wider uppercase">STAY INFORMED</span>
                  <h3 className="font-serif text-2xl font-extrabold text-[#1A1A2E] mt-1">Get Authentic Vrindavan Land Ledger Reports</h3>
                  <p className="text-xs text-slate-500 mt-2 font-sans leading-relaxed">
                    We publish monthly land record validation logs, local valuation hikes, property launches, and RERA verification certificates directly to your inbox. No spam, only sacred ground truths.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label htmlFor="news-email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 font-mono">Your Work Email</label>
                    <input 
                      type="email" 
                      id="news-email" 
                      placeholder="e.g. shri.krishna@mandir.org" 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-[#C45C1A] transition-colors text-sm bg-slate-50"
                    />
                  </div>
                  <button className="w-full py-3.5 bg-[#C45C1A] hover:bg-[#C45C1A]/90 text-white font-serif tracking-widest text-xs uppercase font-extrabold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2">
                    <span>Subscribe to Land Ledger</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-6 mt-6 relative z-10 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Join 4,200+ Smart Investors</span>
                <span className="text-[#0E7B6C]">● Braj Ledger Secured</span>
              </div>
            </div>

          </div>
        </ScrollFade>

        {/* Dynamic News Grid */}
        <div className="space-y-6">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 border-b border-slate-200 pb-3 flex items-center gap-2">
            <span>Recent News & Press Clippings</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {NEWS_ARTICLES.map((article) => (
              <ScrollFade key={article.id} direction="up">
                <ThreeDCard className="h-full">
                  <div className="bg-white border border-[#C9A84C]/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row h-full">
                    {/* Media Thumbnail */}
                    <div className="sm:w-2/5 relative h-48 sm:h-auto min-h-[160px]">
                      <img 
                        src={article.imageUrl} 
                        alt={article.title} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute top-3 left-3 bg-[#1A1A2E] text-[#C9A84C] text-[9px] font-bold font-mono tracking-wider px-2 py-1 rounded">
                        {article.category}
                      </span>
                    </div>

                    {/* Media Copywriting */}
                    <div className="sm:w-3/5 p-5 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold font-mono uppercase">
                          <span>{article.source}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {article.date}
                          </span>
                        </div>

                        <h4 className="font-serif text-base font-extrabold text-[#1A1A2E] tracking-normal leading-snug line-clamp-2">
                          {article.title}
                        </h4>

                        <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed font-sans">
                          {article.summary}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 mt-2 border-t border-slate-50">
                        <button className="text-xs text-[#C45C1A] hover:text-[#C45C1A]/90 font-mono font-bold flex items-center gap-1 uppercase">
                          <span>Read Article</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                        <button className="text-slate-400 hover:text-slate-600 transition-colors" title="Share Press Link">
                          <Share2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </ThreeDCard>
              </ScrollFade>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
