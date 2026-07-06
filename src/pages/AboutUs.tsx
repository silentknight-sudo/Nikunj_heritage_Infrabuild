/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Award, ShieldCheck, Compass, Heart, Users, MapPin, Sparkles } from "lucide-react";
import { SeoHead } from "../components/seo/SeoHead";

export const AboutUs: React.FC = () => {
  return (
    <div className="bg-[#FAF6F0] min-h-screen text-[#1A1A2E]" id="about-us-page-box">
      <SeoHead
        title="About Nikunj Heritage Infrabuild | Trusted Vrindavan Real Estate Guidance"
        description="Learn about Nikunj Heritage Infrabuild, our legal diligence, spiritual destination understanding, and buyer-first property guidance across Vrindavan and Mathura."
        pathname="/about-us"
        keywords={[
          "Nikunj Heritage Infrabuild",
          "Vrindavan real estate company",
          "Mathura property consultant",
          "RERA property guidance Vrindavan",
        ]}
      />
      
      {/* Editorial Saffron header banner */}
      <div className="relative py-20 bg-[#1A1A2E] text-white border-b-2 border-[#C9A84C]/45 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&q=80&w=1600"
            alt="Divine Brij Hills"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C9A84C] font-mono">Company Legacy</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold mt-1 text-white">
            Our Divine Mission
          </h1>
          <p className="text-xs sm:text-sm text-[#FAF6F0]/80 font-sans mt-3 max-w-xl mx-auto leading-relaxed">
            Welcome to Nikunj Heritage Infrabuild. For over a decade, we have dedicated ourselves to offering pure, transparent property deals in Mathura, Vrindavan, and Govardhan.
          </p>
        </div>
      </div>

      {/* Corporate details cards */}
      <section className="py-16 max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <span className="text-[10px] uppercase font-bold text-[#C45C1A] tracking-wider font-mono">Brijbhoomi Pioneers</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#6B1A2A]">
            The Pillars of Trust & Tradition
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
            Under the spiritual philosophy of "Dwarka to Brijvas", Nikunj Heritage Infrabuild Pvt Ltd. (formerly registered in Uttar Pradesh under Corporate Identification Number NHI-2011) was founded with a unified spiritual dream: allowing Brijbhoomi pilgrims to secure beautiful, hassle-free ancestral homes in their holy hometown of Lord Krishna.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
            Whether it is checking original revenue ledger (Khasra) books, validating land conversions (143 status under UP Revenue Codes), securing active approvals from Vrindavan-Mathura Joint Development Authorities, or managing RERA compliance registration certificates; we take the burden of corporate audits off your shoulders.
          </p>

          <div className="bg-[#FAF6F0] p-4 rounded-xl border border-[#C9A84C]/35">
            <span className="font-serif font-bold text-xs text-[#6B1A2E] uppercase block mb-1">Our Core Commitment</span>
            <p className="text-xs text-slate-500 font-sans italic">
              "We perform deep, uncompromised due diligence on physical land titles before any soil is turned. That is the Nikunj Tradition of Trust."
            </p>
          </div>
        </div>

        {/* Brand visual showcase */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-video md:aspect-square">
          <img
            src="/projects/images/vrindavan-cover.png"
            alt="Vrindavan temple skyline and Braj heritage visual"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#6B1A2A]/85 via-[#6B1A2A]/10 to-transparent"></div>
          <div className="absolute bottom-6 left-6 text-white max-w-sm">
            <span className="font-serif text-xl sm:text-2xl font-bold block mb-1">Mathura-Vrindavan Roots</span>
            <span className="text-xs text-[#C9A84C] font-mono uppercase tracking-widest font-semibold">Braj heritage, temple proximity, verified property guidance</span>
          </div>
        </div>
      </section>

      {/* Dynamic 4 Values Section */}
      <section className="bg-white py-16 border-t border-b border-[#C9A84C]/15 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] uppercase font-bold text-[#C45C1A] tracking-widest font-mono">Corporate Ethics</span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#6B1A2A] font-bold mt-1">Our Spiritual Code</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-xl bg-[#FAF6F0]/20 border border-[#C9A84C]/25 text-center space-y-2">
              <Award className="h-8 w-8 text-[#C45C1A] mx-auto" />
              <h4 className="font-serif text-base font-bold text-[#1A1A2E]">Legal Clarity</h4>
              <p className="text-xs text-slate-500 font-sans leading-relaxed">
                Zero ambiguous titles. All deeds are certified and clear before publication.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-[#FAF6F0]/20 border border-[#C9A84C]/25 text-center space-y-2">
              <ShieldCheck className="h-8 w-8 text-[#0E7B6C] mx-auto" />
              <h4 className="font-serif text-base font-bold text-[#1A1A2E]">Vastu Compliant</h4>
              <p className="text-xs text-slate-500 font-sans leading-relaxed">
                Each flat configuration matches North/East facings to maximize cosmic flows.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-[#FAF6F0]/20 border border-[#C9A84C]/25 text-center space-y-2">
              <Compass className="h-8 w-8 text-[#C9A84C] mx-auto" />
              <h4 className="font-serif text-base font-bold text-[#1A1A2E]">Sanctum Vicinity</h4>
              <p className="text-xs text-slate-500 font-sans leading-relaxed">
                Enjoy walking paths directly linking your villa doorstep to elite temples.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-[#FAF6F0]/20 border border-[#C9A84C]/25 text-center space-y-2">
              <Heart className="h-8 w-8 text-[#6B1A2A] mx-auto" />
              <h4 className="font-serif text-base font-bold text-[#1A1A2E]">Brijbhoomi Love</h4>
              <p className="text-xs text-slate-500 font-sans leading-relaxed">
                We reinvest a proportion of revenue back into ghat preservation and local ashrams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-16 max-w-7xl mx-auto px-4" id="leadership-grid">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] uppercase font-bold text-[#C45C1A] tracking-wider font-mono">Founders & Leadership</span>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#6B1A2A] font-bold">The Guardians of Nikunj</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-xl border border-[#C9A84C]/25 overflow-hidden shadow-sm hover:shadow-lg transition-all">
            <div className="aspect-[4/5] bg-[#0F172A] overflow-hidden">
              <img
                src="/team/shailendra-tiwari-founder.jpg"
                alt="Shailendra Tiwari, Managing Director of Nikunj Heritage Infrabuild"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="p-6 text-center">
              <span className="block text-[10px] text-[#C45C1A] font-mono uppercase tracking-[0.22em] font-bold">Managing Director</span>
              <h4 className="font-serif text-2xl font-bold text-[#1A1A2E] mt-2">Shailendra Tiwari</h4>
              <p className="text-sm text-slate-500 mt-3 font-sans max-w-sm mx-auto leading-relaxed">
                Leads Nikunj Heritage Infrabuild with a buyer-first focus on verified Mathura-Vrindavan real estate, transparent advisory, and long-term relationship building.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#C9A84C]/25 overflow-hidden shadow-sm hover:shadow-lg transition-all">
            <div className="aspect-[4/5] bg-[#0F172A] overflow-hidden">
              <img
                src="/team/jitendra-tiwari-founder-realestate.jpg"
                alt="Jitendra Tiwari, Co-founder of Nikunj Heritage Infrabuild"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="p-6 text-center">
              <span className="block text-[10px] text-[#C45C1A] font-mono uppercase tracking-[0.22em] font-bold">Co-founder</span>
              <h4 className="font-serif text-2xl font-bold text-[#1A1A2E] mt-2">Jitendra Tiwari</h4>
              <p className="text-sm text-slate-500 mt-3 font-sans max-w-sm mx-auto leading-relaxed">
                Supports client guidance, ground coordination, and practical project evaluation across residential, commercial, and plotted opportunities in Brajbhoomi.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
export default AboutUs;
