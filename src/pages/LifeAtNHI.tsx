/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Sparkles, Calendar, Heart, Users, MapPin, Smile } from "lucide-react";
import { ScrollFade, ThreeDCard, ParticleGlow } from "../components/common/MotionWrapper";

interface CorporateVibe {
  title: string;
  desc: string;
  imgUrl: string;
  tag: string;
}

const EXPERIENCES: CorporateVibe[] = [
  {
    title: "Vedic Parikrama Seva & Sponsorships",
    desc: "Every Ekadashi, we conduct grand parikrama service booths providing cooling drinks, ancient health tonics, and sacred hand-carved walking sticks to temple pilgrims.",
    imgUrl: "https://images.unsplash.com/photo-1545229765-7018d6ff02bd?auto=format&fit=crop&q=80&w=800",
    tag: "Social Service"
  },
  {
    title: "Shri Krishna Janmashtami Mahotsav",
    desc: "Our corporate headquarters transforms into a glorious yellow-marigold sanctuary, welcoming spiritual leaders and organizing Vedic chanting cycles with over 20+ priests.",
    imgUrl: "https://images.unsplash.com/photo-1561361060-6398faf90278?auto=format&fit=crop&q=80&w=800",
    tag: "Festivities"
  },
  {
    title: "Client & Builder Saffron Dinners",
    desc: "A quarterly tradition of bringing families together under traditional Rajasthani Haveli night lights with classical sitar rhythms and rich Braj cuisines.",
    imgUrl: "https://images.unsplash.com/photo-1626014303757-6fc6610674ce?auto=format&fit=crop&q=80&w=800",
    tag: "Community"
  },
  {
    title: "Nidhivan Restoration Ecosystems",
    desc: "Employees and clients participate in periodic tree planting campaigns in coordinate zones to maintain healthy forests of sweet mango trees and sacred basil.",
    imgUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=800",
    tag: "Ecology"
  }
];

export const LifeAtNHI: React.FC = () => {
  return (
    <div className="bg-[#FAF6F0] min-h-screen py-16 px-4 sm:px-6 lg:px-8 text-[#1A1A2E]" id="life-at-nhi-page">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Hero Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-[#FAF6F0] text-[#C45C1A] px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4 border border-[#C9A84C]/50 shadow-md">
            <Sparkles className="h-4 w-4 text-[#C9A84C] animate-spin" />
            <span>COMMUNITY & CULTURE</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Life at Nikunj Heritage Infrabuild
          </h1>
          <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
            We are not just a real-estate development firm — we are an organic, spiritual community dedicated to keeping the majestic Vedic cultural flame burning bright. Read highlights of our events.
          </p>
        </div>

        {/* Dynamic Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {EXPERIENCES.map((item, idx) => (
            <ScrollFade key={idx} direction={idx % 2 === 0 ? "left" : "right"}>
              <ThreeDCard className="h-full">
                <div className="bg-white border border-[#C9A84C]/25 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col h-full text-left">
                  <div className="h-52 relative">
                    <img 
                      src={item.imgUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <span className="absolute bottom-4 left-4 bg-[#C45C1A] text-white text-[10px] font-bold font-mono tracking-wider px-3 py-1 rounded-full border border-[#C9A84C]/45 uppercase shadow">
                      {item.tag}
                    </span>
                  </div>

                  <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold font-mono uppercase">
                        <MapPin className="h-3.5 w-3.5 text-[#C45C1A]" />
                        <span>Braj Mandal, Vrindavan</span>
                      </div>
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1A1A2E] leading-tight group-hover:text-[#C45C1A]">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans">
                        {item.desc}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-400">
                      <span className="flex items-center gap-1">
                        <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
                        Family Approved
                      </span>
                      <span>Verified Event</span>
                    </div>
                  </div>
                </div>
              </ThreeDCard>
            </ScrollFade>
          ))}
        </div>

        {/* Corporate Trust Banner */}
        <ScrollFade direction="up">
          <div className="bg-[#1A1A2E] text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-[#C9A84C]/35 relative overflow-hidden text-center max-w-4xl mx-auto">
            <ParticleGlow color="#C9A84C" />
            <div className="relative z-10 space-y-6">
              <Users className="h-12 w-12 text-[#C9A84C] mx-auto animate-bounce" />
              <h3 className="font-serif text-xl sm:text-2xl font-black text-white">Join Our Divine Family Today</h3>
              <p className="text-xs sm:text-sm text-[#FAF6F0]/80 font-sans max-w-xl mx-auto leading-relaxed">
                When you buy land, suites, or custom haveli villas at Nikunj Heritage, you are automatically enrolled as a lifelong VIP member of our holy cultural parikrama crew. Welcome to a higher calling of living.
              </p>
              <div className="pt-4 flex flex-wrap gap-3.5 justify-center">
                <a 
                  href="https://wa.me/919719920888?text=Pranam!%20I%20want%20to%20learn%20more%20about%20the%20Nikunj%20Heritage%20community."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-[#C45C1A] hover:bg-[#C45C1A]/95 text-white text-xs font-serif font-bold uppercase tracking-wider rounded-lg transition-all"
                >
                  Join Community Groups
                </a>
                <a 
                  href="/contact-us"
                  className="px-6 py-3 bg-white/10 hover:bg-white/15 border border-white/25 text-white text-xs font-serif font-bold uppercase tracking-wider rounded-lg transition-all"
                >
                  Schedule A Visit
                </a>
              </div>
            </div>
          </div>
        </ScrollFade>

      </div>
    </div>
  );
};
