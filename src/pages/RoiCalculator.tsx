/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ROICalculator } from "../components/home/ROICalculator";
import { TrendingUp, Award, Compass, Heart, ShieldCheck } from "lucide-react";

export const RoiCalculator: React.FC = () => {
  return (
    <div className="bg-[#FAF6F0] min-h-screen py-12" id="roi-calculator-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Hero Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[11px] uppercase tracking-widest text-[#C45C1A] font-bold font-mono">Brijbhoomi Wealth Optimization</span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#6B1A2A] font-extrabold mt-1 tracking-wide">
            Interactive ROI Calculator
          </h1>
          <p className="text-sm text-slate-500 mt-3 max-w-xl mx-auto leading-relaxed font-sans">
            Calculate your projected capital appreciation and premium rental yields across Mathura & Vrindavan's high-demand pilgrimage zones.
          </p>
        </div>

        {/* The Interactive Calculator widget */}
        <div className="my-8">
          <ROICalculator />
        </div>

        {/* Real Estate Growth Catalysts Grid */}
        <div className="mt-16 bg-white p-8 rounded-2xl border border-[#C9A84C]/25 shadow-sm">
          <h2 className="font-serif text-2xl font-bold text-[#1A1A2E] text-center mb-10">
            Vrindavan & Mathura Real Estate Drivers
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="space-y-3">
              <div className="p-3 bg-[#C45C1A]/10 border border-[#C45C1A]/30 text-[#C45C1A] rounded-lg inline-block">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="font-serif font-bold text-[#6B1A2A] text-lg">Unprecedented Capital Appreciation</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Due to skyrocketing spiritual tourism and mega connectivity networks (Jewar International Airport, Yamuna Expressway expansions), properties in the Rukmani Vihar and Chhatikara Corridors have seen <b>15-20% annualized growth</b>.
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-[#0E7B6C]/10 border border-[#0E7B6C]/30 text-[#0E7B6C] rounded-lg inline-block">
                <Compass className="h-6 w-6" />
              </div>
              <h3 className="font-serif font-bold text-[#6B1A2A] text-lg">High-Yield Saffron Rentals</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Over 150 million pilgrims visit Mathura-Vrindavan annually. Serviced ashram-suites and fully furnished 1/2 BHK apartments enjoy consistent rental demands during parikramas, festivals, and weekend retreats.
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C] rounded-lg inline-block">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-serif font-bold text-[#6B1A2A] text-lg">Safe RERA-Registered Titles</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Nikunj Heritage provides 100% verified legal structures, complete title clearance certifications, and pre-approved home loan alignments with trusted nationalized banks.
              </p>
            </div>

          </div>
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-12 bg-gradient-to-r from-[#6B1A2A] to-[#1A1A2E] text-white p-8 rounded-2xl border border-[#C9A84C]/35 text-center shadow-lg">
          <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-wide">
            Ready to Secure Your Celestial Asset?
          </h3>
          <p className="text-xs sm:text-sm text-[#FAF6F0]/80 font-sans mt-2 max-w-xl mx-auto">
            Get complete layout brochures, exclusive site visits, and personalized price breakdowns tailored perfectly to your wealth strategy.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/919719920888?text=Pranam!%20I'm%20interested%20in%20high-yield%20Nikunj%20Heritage%20properties."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#0E7B6C] hover:bg-[#0E7B6C]/90 text-white rounded-lg text-sm font-bold shadow-md transition-all duration-300"
            >
              Consult with Advisory Team
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RoiCalculator;
