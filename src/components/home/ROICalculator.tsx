/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Calculator, ArrowUpRight, TrendingUp, Key } from "lucide-react";
import { formatPrice } from "../../lib/utils";

export const ROICalculator: React.FC = () => {
  const [investment, setInvestment] = useState(5000000); // 50 Lakh default
  const [holdingYears, setHoldingYears] = useState(5);
  const [monthlyRent, setMonthlyRent] = useState(18000); // rental estimate
  const [appreciationRate, setAppreciationRate] = useState(15); // 15% CAGR is common in Vrindavan

  // Calculations
  const calculatedFutureValue = investment * Math.pow(1 + appreciationRate / 100, holdingYears);
  const totalRentalReceived = monthlyRent * 12 * holdingYears;
  const netEarnings = (calculatedFutureValue - investment) + totalRentalReceived;
  const percentageROI = (netEarnings / investment) * 100;

  return (
    <div className="bg-white border border-[#C9A84C]/30 rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto my-14 grid grid-cols-1 md:grid-cols-12" id="roi-calculator-widget">
      
      {/* Parameters & Inputs Panel */}
      <div className="p-6 sm:p-8 md:col-span-7 bg-[#FAF6F0]/20 flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-2.5 mb-6">
            <Calculator className="h-6 w-6 text-[#C45C1A]" />
            <h3 className="font-serif text-xl font-bold text-[#1A1A2E]">
              Brijbhoomi Wealth ROI Calculator
            </h3>
          </div>

          <p className="text-xs text-slate-500 mb-6 font-sans">
            Understand your potential financial return on investment. Properties in Vrindavan and Mathura carry unique growth catalysts including Jewar Airport and direct connectivity highways.
          </p>

          <div className="space-y-6">
            {/* Input 1: Capital value */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-[#1A1A2E] uppercase font-mono">
                  Capital Investment Block
                </label>
                <span className="text-sm font-bold text-[#C45C1A]">{formatPrice(investment)}</span>
              </div>
              <input
                type="range"
                min="2000000"
                max="25000000"
                step="500000"
                value={investment}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setInvestment(val);
                  // Auto scale rent based on standard 3.5 - 4.5% rate yield
                  setMonthlyRent(Math.round((val * 0.04) / 12));
                }}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#C45C1A]"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>₹20 Lac</span>
                <span>₹2.5 Cr</span>
              </div>
            </div>

            {/* Input 2: Years of Hold */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-[#1A1A2E] uppercase font-mono">
                  Holding Horizon Duration
                </label>
                <span className="text-sm font-bold text-[#C45C1A]">{holdingYears} Years</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="1"
                value={holdingYears}
                onChange={(e) => setHoldingYears(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#C45C1A]"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>1 Year</span>
                <span>15 Years</span>
              </div>
            </div>

            {/* Input 3: Rent yield */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-[#1A1A2E] uppercase font-mono">
                  Estimated Monthly Rent Yield
                </label>
                <span className="text-sm font-bold text-[#C45C1A]">{formatPrice(monthlyRent)} /mo</span>
              </div>
              <input
                type="range"
                min="5000"
                max="100000"
                step="2000"
                value={monthlyRent}
                onChange={(e) => setMonthlyRent(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#C45C1A]"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>₹5k</span>
                <span>₹1.0 Lac</span>
              </div>
            </div>

            {/* Input 4: Appreciation CAGRs */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-[#1A1A2E] uppercase font-mono">
                  Annual Appreciation CAGR
                </label>
                <span className="text-sm font-bold text-[#C45C1A]">{appreciationRate}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                step="1"
                value={appreciationRate}
                onChange={(e) => setAppreciationRate(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#C45C1A]"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>5% (Conservative)</span>
                <span>30% (High Growth)</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Projection Outcomes Panel */}
      <div className="p-6 sm:p-8 md:col-span-5 bg-[#1A1A2E] text-[#FAF6F0] flex flex-col justify-between border-t md:border-t-0 md:border-l border-[#C9A84C]/30">
        <div>
          <h4 className="font-serif text-sm uppercase tracking-widest text-[#C9A84C] font-semibold mb-6 pb-2 border-b border-[#FAF6F0]/10">
            PROJECTION RESULTS
          </h4>

          <div className="space-y-6">
            <div className="flex items-start space-x-3">
              <TrendIndicatorIcon />
              <div>
                <span className="block text-[10px] text-[#FAF6F0]/60 uppercase font-mono">Future Asset Value</span>
                <span className="text-xl sm:text-2xl font-bold text-white font-serif">{formatPrice(calculatedFutureValue)}</span>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Key className="h-5 w-5 text-[#C9A84C] shrink-0 mt-1" />
              <div>
                <span className="block text-[10px] text-[#FAF6F0]/60 uppercase font-mono">Total Cumulative Rent Payout</span>
                <span className="text-lg font-bold text-[#faf6f0] font-serif">{formatPrice(totalRentalReceived)}</span>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <ArrowUpRight className="h-5 w-5 text-[#0E7B6C] shrink-0 mt-1" />
              <div>
                <span className="block text-[10px] text-[#FAF6F0]/60 uppercase font-mono">Estimated Net Wealth Gained</span>
                <span className="text-lg font-bold text-[#0E7B6C] font-serif">{formatPrice(netEarnings)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Highlights Banner Box */}
        <div className="mt-8 bg-white/5 border border-[#C9A84C]/30 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-mono text-[#FAF6F0]/80">Projected Return Rate:</span>
            <span className="text-base font-bold text-[#C9A84C]">{percentageROI.toFixed(0)}% ROI</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-1.5">
            <div
              className="bg-[#C9A84C] h-full"
              style={{ width: `${Math.min(percentageROI / 2, 100)}%` }}
            />
          </div>
          <span className="text-[9px] text-[#FAF6F0]/50 block mt-2 font-sans">
            *Historical returns based on actual compound expansions near Vrindavan ring roads. Returns are illustrations.
          </span>
        </div>

      </div>

    </div>
  );
};

const TrendIndicatorIcon = () => (
  <div className="p-1 rounded bg-[#C45C1A]/20 border border-[#C45C1A]/50">
    <TrendingUp className="h-5 w-5 text-[#C45C1A]" />
  </div>
);

export default ROICalculator;
