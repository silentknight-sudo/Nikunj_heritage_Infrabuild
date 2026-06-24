/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Building2, ShieldCheck, Award, ThumbsUp, HeartHandshake, Eye, Briefcase, FileCheck } from "lucide-react";
import { ScrollFade, ThreeDCard, ParticleGlow } from "../components/common/MotionWrapper";
import { SeoHead } from "../components/seo/SeoHead";

interface DevMilestone {
  year: string;
  title: string;
  achievement: string;
}

const MILESTONES: DevMilestone[] = [
  {
    year: "2011",
    title: "Foundational Inception",
    achievement: "Vrindavan's first regulatory-cleared private farmhouse plot layouts completed, setting premium standard for registry deeds."
  },
  {
    year: "2016",
    title: "Vrindavan Phase-1 Luxury Suites",
    achievement: "Delivered 350+ fully legal, registry-completed serviced suites with temple proximity to ecstatic clients."
  },
  {
    year: "2021",
    title: "Braj Heritage Expansion",
    achievement: "Pioneered authentic Rajasthani and Sanskrit structural arches in residential duplex spaces in premium Rukmani Vihar sectors."
  },
  {
    year: "2026",
    title: "The Brij Ledger Revolution",
    achievement: "Boasting over 1,500 families happy, and launching the next-generation fully transparent cloud-secured ledger cataloging system."
  }
];

export const Developers: React.FC = () => {
  return (
    <div className="bg-[#FAF6F0] min-h-screen py-16 px-4 sm:px-6 lg:px-8 text-[#1A1A2E]" id="developers-page">
      <SeoHead
        title="Developers, Legal Standards & Delivery Quality | Nikunj Heritage Infrabuild"
        description="Understand Nikunj Heritage Infrabuild’s delivery standards, legal checks, build philosophy, and development credibility across Vrindavan and Mathura projects."
        pathname="/developers"
        keywords={[
          "Vrindavan developer",
          "RERA approved developer Vrindavan",
          "Mathura real estate developer",
          "legal property developer Vrindavan",
        ]}
      />
      <div className="max-w-7xl mx-auto">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-[#C45C1A]/10 text-[#C45C1A] px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4 border border-[#C45C1A]/20">
            <Building2 className="h-4 w-4 text-[#C45C1A]" />
            <span>EXPERT MASTERBUILDERS</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            The Pioneers of Premium Braj Infrabuild
          </h1>
          <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
            Learn about the vision, legality, and engineering foundations backing Nikunj Heritage. With over 15+ years of experience delivering authentic, zero-litigation spaces in Mathura & Vrindavan.
          </p>
        </div>

        {/* Corporate Profile Card with 3D Interaction */}
        <ScrollFade direction="up">
          <div className="bg-[#1A1A2E] text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-[#C9A84C]/30 mb-16 relative overflow-hidden">
            <ParticleGlow color="#C45C1A" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* Profile Details (7 Columns) */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <span className="text-[#C9A84C] text-xs font-mono font-bold uppercase tracking-widest block">DEVELOPER MANIFESTO</span>
                <h2
                  className="font-serif text-2xl sm:text-4xl font-black text-white leading-tight"
                  style={{ color: "#FFFFFF" }}
                >
                  Crafting Sacred Spaces with Flawless Legal Certitude
                </h2>
                <p className="text-xs sm:text-sm text-[#FAF6F0]/80 leading-relaxed font-light">
                  At Nikunj Heritage Infrabuild, we understand that purchasing real estate in Vrindavan isn't simply a transaction — it's a sacred lifelong milestone. For over a decade and a half, we have dedicated ourselves to building homes, villas, cottages, and duplexes that fuse structural excellence with timeless Brij heritage.
                </p>
                <p className="text-xs sm:text-sm text-[#FAF6F0]/85 leading-relaxed font-light">
                  Unlike conventional, profit-driven developers, our primary cornerstone is absolute legal defense. Every square inch of land in our portfolio is completely verified, secured with title registries, and fully RERA compliant. We make our legal registries publicly auditable because trust is our most valuable asset.
                </p>

                {/* Micro Stats Row */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#FAF6F0]/15">
                  <div>
                    <span className="block font-serif text-2xl sm:text-3xl font-extrabold text-[#C9A84C]">15+</span>
                    <span className="block text-[10px] text-zinc-400 uppercase font-bold tracking-wider mt-1 font-mono">Years Experience</span>
                  </div>
                  <div>
                    <span className="block font-serif text-2xl sm:text-3xl font-extrabold text-[#C9A84C]">1.5M+</span>
                    <span className="block text-[10px] text-zinc-400 uppercase font-bold tracking-wider mt-1 font-mono">Sq Ft Delivered</span>
                  </div>
                  <div>
                    <span className="block font-serif text-2xl sm:text-3xl font-extrabold text-[#C9A84C]">100%</span>
                    <span className="block text-[10px] text-zinc-400 uppercase font-bold tracking-wider mt-1 font-mono">Clean Registries</span>
                  </div>
                </div>
              </div>

              {/* Developer Trust Badge / Image (5 Columns) */}
              <div className="lg:col-span-5 flex flex-col justify-center items-center bg-white/5 border border-white/10 rounded-2xl p-6 relative">
                <Award className="h-14 w-14 text-[#C9A84C] animate-pulse mb-4" />
                <h3 className="font-serif text-lg font-bold text-center text-white">RERA State Approved Portfolio</h3>
                <p className="text-xs text-center text-slate-300 mt-2 font-sans max-w-xs leading-relaxed">
                  Every property launched under the Nikunj Heritage banner is fully approved by national banks for seamless mortgage sanctions.
                </p>
                <div className="flex gap-2.5 mt-6 w-full max-w-xs">
                  <div className="flex-1 bg-[#0E7B6C] py-2.5 rounded-lg text-center font-mono font-bold text-[10px] tracking-wide text-white">
                    RERA APPROVED
                  </div>
                  <div className="flex-1 bg-[#1A1A2E] border border-[#C9A84C] py-2.5 rounded-lg text-center font-mono font-bold text-[10px] tracking-wide text-[#C9A84C]">
                    REGISTRATIONS OPEN
                  </div>
                </div>
              </div>

            </div>
          </div>
        </ScrollFade>

        {/* Foundations Matrix */}
        <div className="mb-20">
          <h3 className="font-serif text-xl sm:text-2xl font-extrabold text-[#1A1A2E] text-center mb-10">
            Our Development Core Pillars
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollFade direction="left">
              <ThreeDCard className="h-full">
                <div className="bg-white border border-[#C9A84C]/25 rounded-2xl p-6 shadow-sm h-full flex flex-col justify-between text-left">
                  <div className="space-y-4">
                    <div className="p-3 bg-[#C45C1A]/10 border border-[#C45C1A]/30 text-[#C45C1A] rounded-xl w-fit">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    <h4 className="font-serif text-lg font-extrabold text-[#1A1A2E]">Legal Impeccability</h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-sans">
                      We secure certified agricultural-to-residential land conversions (called 143 Section clearances), leaving zero regulatory friction for buyers.
                    </p>
                  </div>
                  <span className="text-[10px] text-[#0E7B6C] font-semibold mt-4 block">✓ 100% TITLE SECURE</span>
                </div>
              </ThreeDCard>
            </ScrollFade>

            <ScrollFade direction="up">
              <ThreeDCard className="h-full">
                <div className="bg-white border border-[#C9A84C]/25 rounded-2xl p-6 shadow-sm h-full flex flex-col justify-between text-left">
                  <div className="space-y-4">
                    <div className="p-3 bg-[#0E7B6C]/10 border border-[#0E7B6C]/30 text-[#0E7B6C] rounded-xl w-fit">
                      <Building2 className="h-6 w-6" />
                    </div>
                    <h4 className="font-serif text-lg font-extrabold text-[#1A1A2E]">Heritage Architecture</h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-sans">
                      Our build specifications make use of high-grade Kota stone, custom carvings, and weather-proof sandstones mimicking historic Havelis.
                    </p>
                  </div>
                  <span className="text-[10px] text-[#0E7B6C] font-semibold mt-4 block">✓ TRADITIONAL INTEGRATION</span>
                </div>
              </ThreeDCard>
            </ScrollFade>

            <ScrollFade direction="right">
              <ThreeDCard className="h-full">
                <div className="bg-white border border-[#C9A84C]/25 rounded-2xl p-6 shadow-sm h-full flex flex-col justify-between text-left">
                  <div className="space-y-4">
                    <div className="p-3 bg-[#1A1A2E]/10 border border-[#1A1A2E]/30 text-[#1A1A2E] rounded-xl w-fit">
                      <HeartHandshake className="h-6 w-6 text-[#C9A84C]" />
                    </div>
                    <h4 className="font-serif text-lg font-extrabold text-[#1A1A2E]">Vedic Living Codes</h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-sans">
                      All plots, doors, and water paths are structurally optimized following authentic Vastu Shanti blueprints for divine mental harmony.
                    </p>
                  </div>
                  <span className="text-[10px] text-[#0E7B6C] font-semibold mt-4 block">✓ 100% VASTU OPTIMIZED</span>
                </div>
              </ThreeDCard>
            </ScrollFade>
          </div>
        </div>

        {/* Corporate Milestones Timeline */}
        <ScrollFade direction="up">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-md">
            <h3 className="font-serif text-xl sm:text-2xl font-extrabold text-[#1A1A2E] mb-8 text-center">
              Our Journey Over the Years
            </h3>

            <div className="max-w-4xl mx-auto divide-y divide-slate-100">
              {MILESTONES.map((stone, idx) => (
                <div key={idx} className="py-6 flex flex-col sm:flex-row sm:items-start gap-4 text-left">
                  <div className="sm:w-1/5 min-w-[120px]">
                    <span className="inline-block bg-[#C45C1A] text-white font-mono text-sm font-bold tracking-widest px-3 py-1 rounded">
                      {stone.year}
                    </span>
                  </div>
                  <div className="sm:w-4/5 space-y-1">
                    <h4 className="font-serif text-base sm:text-lg font-bold text-[#1A1A2E]">{stone.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-500 font-sans leading-relaxed">{stone.achievement}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollFade>

      </div>
    </div>
  );
};
