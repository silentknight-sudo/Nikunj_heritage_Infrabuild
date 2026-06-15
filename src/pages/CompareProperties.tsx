/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Scale, ArrowRight, HelpCircle, RefreshCw, Sparkles, Building } from "lucide-react";
import { getProperties } from "../lib/firestore";
import { Property } from "../types";
import { PropertyCompare } from "../components/property/PropertyCompare";
import { toast } from "react-hot-toast";

export const CompareProperties: React.FC = () => {
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [comparedIds, setComparedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Load properties and compared items from localStorage
  useEffect(() => {
    async function loadData() {
      try {
        const props = await getProperties();
        setAllProperties(props);
        
        // Sync compared items with properties directory state representation
        const stored = JSON.parse(localStorage.getItem("nh_compare") || "[]");
        if (stored.length > 0) {
          setComparedIds(stored);
        }
      } catch (err) {
        console.error("Failed to load properties for compare:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleCompareToggle = (id: string) => {
    let nextIds: string[];
    if (comparedIds.includes(id)) {
      nextIds = comparedIds.filter(item => item !== id);
    } else {
      if (comparedIds.length >= 3) {
        toast.error("Pranam! You can compare a maximum of 3 properties side-by-side.");
        return;
      }
      nextIds = [...comparedIds, id];
    }
    setComparedIds(nextIds);
    localStorage.setItem("nh_compare", JSON.stringify(nextIds));
  };

  const handleClear = () => {
    setComparedIds([]);
    localStorage.setItem("nh_compare", "[]");
    toast.success("Comparison sandbox cleared.");
  };

  const selectedProperties = allProperties.filter(p => comparedIds.includes(p.id));

  return (
    <div className="bg-[#FAF6F0] min-h-screen py-12" id="compare-page-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header section */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[11px] uppercase tracking-widest text-[#C45C1A] font-bold font-mono">Brij Brijvas Decision Matrix</span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#6B1A2A] font-extrabold mt-1">
            Compare Premium Projects
          </h1>
          <p className="text-sm text-slate-500 mt-2 max-w-lg mx-auto">
            Evaluate specifications, divine landmark distances, budget requirements and RERA statuses side-by-side.
          </p>
        </div>

        {/* Dynamic Selector Panel */}
        <div className="bg-white p-6 rounded-xl border border-[#C9A84C]/20 shadow-sm max-w-4xl mx-auto mb-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
            <div>
              <h3 className="font-serif font-bold text-[#1A1A2E] text-base">Select Projects to Compare</h3>
              <p className="text-xs text-slate-400">Select up to 3 projects from our verified registry portfolio.</p>
            </div>
            {comparedIds.length > 0 && (
              <button
                onClick={handleClear}
                className="text-xs font-semibold text-[#6B1A2A] hover:underline"
              >
                Clear Selections
              </button>
            )}
          </div>

          {loading ? (
            <div className="h-10 bg-slate-100 animate-pulse rounded"></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {allProperties.map(prop => {
                const checked = comparedIds.includes(prop.id);
                return (
                  <button
                    key={prop.id}
                    onClick={() => handleCompareToggle(prop.id)}
                    className={`p-3 text-left rounded-lg border text-xs transition-all flex items-center justify-between group ${
                      checked
                        ? "border-[#C45C1A] bg-[#C45C1A]/5 text-[#C45C1A] font-semibold"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:border-[#C45C1A] hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <Building className={`h-4 w-4 shrink-0 ${checked ? "text-[#C45C1A]" : "text-slate-400"}`} />
                      <span className="truncate">{prop.title}</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#0E7B6C] ml-2 shrink-0">
                      {checked ? "Added" : "+ Add"}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Comparison Logic Renders */}
        {selectedProperties.length >= 2 ? (
          <div>
            <PropertyCompare
              properties={selectedProperties}
              onRemove={handleCompareToggle}
              onClear={handleClear}
            />
          </div>
        ) : (
          /* Missing selection placeholder layout */
          <div className="bg-white border border-[#C9A84C]/20 rounded-xl p-12 text-center max-w-xl mx-auto shadow-sm my-12">
            <Scale className="h-12 w-12 text-[#C45C1A] mx-auto mb-4 animate-pulse" />
            <h3 className="font-serif text-lg font-bold text-[#6B1A2A]">Select at least 2 projects to start comparing</h3>
            <p className="text-xs text-slate-500 mt-2 max-w-sm mx-auto leading-relaxed">
              To evaluate side-by-side asset analytics, select multiple premium apartments, custom havelis, or freehold plots above or browse our full listings.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5 justify-center">
              <Link
                to="/properties"
                className="px-6 py-2.5 bg-[#C45C1A] text-white rounded text-xs font-bold font-serif uppercase tracking-widest hover:bg-[#C45C1A]/90 shadow-sm"
              >
                Browse All Projects
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CompareProperties;
