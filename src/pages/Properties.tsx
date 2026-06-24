/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, Search, RotateCcw, Map, Grid, Compass, HelpCircle } from "lucide-react";
import { getProperties, getCategories, getLocations } from "../lib/firestore";
import { Property, Category, Location, PropertyStatus } from "../types";
import { PropertyCard } from "../components/property/PropertyCard";
import { PropertyCompare } from "../components/property/PropertyCompare";
import { formatPrice } from "../lib/utils";
import { toast } from "react-hot-toast";
import { SeoHead } from "../components/seo/SeoHead";

export const Properties: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Firestore States
  const [properties, setProperties] = useState<Property[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  // Active Filter states representation
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all");
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get("location") || "all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedBHK, setSelectedBHK] = useState("all");
  const [budgetRange, setBudgetRange] = useState(25000000); // Max 2.5 Cr
  const [sortBy, setSortBy] = useState("newest");
  const [searchKeyword, setSearchKeyword] = useState(searchParams.get("search") || "");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

  // Comparison Tracker State
  const [comparedIds, setComparedIds] = useState<string[]>([]);

  useEffect(() => {
    async function loadPropertiesPageData() {
      setLoading(true);
      try {
        const cats = await getCategories();
        setCategories(cats);

        const locs = await getLocations();
        setLocations(locs);

        const props = await getProperties();
        setProperties(props);
      } catch (err) {
        console.error("Properties page data load failed:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPropertiesPageData();
  }, []);

  // Sync params when changes occur in home clicks
  useEffect(() => {
    const catParam = searchParams.get("category");
    if (catParam) setSelectedCategory(catParam);

    const locParam = searchParams.get("location");
    if (locParam) setSelectedLocation(locParam);

    const searchStr = searchParams.get("search");
    if (searchStr) setSearchKeyword(searchStr);
  }, [searchParams]);

  // Filtering Logic
  const filteredProperties = properties.filter((prop) => {
    // 1. Keyword search (title / description)
    if (searchKeyword.trim()) {
      const kw = searchKeyword.toLowerCase();
      const matchTitle = prop.title.toLowerCase().includes(kw);
      const matchDesc = prop.description.toLowerCase().includes(kw);
      if (!matchTitle && !matchDesc) return false;
    }

    // 2. Category selection
    if (selectedCategory !== "all" && prop.categoryId !== selectedCategory) {
      return false;
    }

    // 3. Location selection
    if (selectedLocation !== "all" && prop.locationId !== selectedLocation) {
      return false;
    }

    // 4. Status selection
    if (selectedStatus !== "all" && prop.status !== selectedStatus) {
      return false;
    }

    // 5. BHK text check
    if (selectedBHK !== "all") {
      const bhkClean = selectedBHK.toLowerCase();
      if (!prop.bhk.toLowerCase().includes(bhkClean)) {
        return false;
      }
    }

    // 6. Price upper bound
    if (prop.price > budgetRange) {
      return false;
    }

    return true;
  });

  // Sorting Logic
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortBy === "price-asc") {
      return a.price - b.price;
    }
    if (sortBy === "price-desc") {
      return b.price - a.price;
    }
    if (sortBy === "newest") {
      const aTime = a.createdAt?.seconds || 0;
      const bTime = b.createdAt?.seconds || 0;
      return bTime - aTime;
    }
    return 0; // Default unchanged
  });

  // Comparison handler helpers
  const handleCompareToggle = (id: string) => {
    setComparedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 3) {
        toast.error("Pranam! You can compare a maximum of 3 properties side-by-side.");
        return prev;
      }
      return [...prev, id];
    });
  };

  const handleClearCompare = () => {
    setComparedIds([]);
  };

  const comparedProperties = properties.filter((p) => comparedIds.includes(p.id));

  // Reset all filters tool
  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSelectedLocation("all");
    setSelectedStatus("all");
    setSelectedBHK("all");
    setBudgetRange(25000000);
    setSearchKeyword("");
    setSortBy("newest");
    setSearchParams({});
    toast.success("Filters reset successfully");
  };

  return (
    <div className="bg-[#FAF6F0] min-h-screen text-[#1A1A2E] py-10" id="properties-directory-container">
      <SeoHead
        title="Properties in Vrindavan & Mathura | Flats, Villas, Plots & Commercial Spaces"
        description="Browse residential apartments, luxury villas, commercial spaces, and plotted developments in Vrindavan, Mathura, Govardhan, and Barsana."
        pathname="/properties"
        keywords={[
          "flats in Vrindavan",
          "villa in Vrindavan",
          "plots in Mathura",
          "commercial property in Vrindavan",
          "Govardhan land investment",
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Titles */}
        <div className="mb-8 justify-between flex flex-col md:flex-row items-start md:items-end gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#C45C1A] font-mono">Brij Vas Registry</span>
            <h1 className="font-serif text-3xl font-bold text-[#6B1A2A]" id="properties-main-title">
              Explore Available Properties
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-sans">
              Find secure residential apartments, sacred plots near Govardhan, and heritage havelis.
            </p>
          </div>

          {/* View Toggle Controller */}
          <div className="flex bg-white border border-[#C9A84C]/30 p-1 rounded-lg shrink-0" id="view-mode-toggle">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md flex items-center space-x-1.5 text-xs font-semibold ${
                viewMode === "grid"
                  ? "bg-[#C45C1A] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Grid className="h-4 w-4" />
              <span>Grid View</span>
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`p-1.5 rounded-md flex items-center space-x-1.5 text-xs font-semibold ${
                viewMode === "map"
                  ? "bg-[#C45C1A] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Map className="h-4 w-4" />
              <span>Interactive Map</span>
            </button>
          </div>
        </div>

        {/* Dynamic Comparison Tray if properties are selected */}
        {comparedProperties.length > 0 && (
          <PropertyCompare
            properties={comparedProperties}
            onRemove={handleCompareToggle}
            onClear={handleClearCompare}
          />
        )}

        {/* Primary Filter Shelf Bar */}
        <div className="bg-white p-6 rounded-xl border border-[#C9A84C]/25 shadow-sm mb-8" id="filters-shelf-box">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3 mb-4">
            <Filter className="h-4.5 w-4.5 text-[#C45C1A]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Filter Properties</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {/* 1. Category filter selection */}
            <div>
              <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1 font-mono">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full text-xs px-2.5 py-2.5 rounded-md border border-slate-200 outline-none text-slate-800 focus:border-[#C45C1A] bg-slate-50"
              >
                <option value="all">All Sectors</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* 2. Area/Location selection */}
            <div>
              <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1 font-mono">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full text-xs px-2.5 py-2.5 rounded-md border border-slate-200 outline-none text-slate-800 focus:border-[#C45C1A] bg-slate-50"
              >
                <option value="all">All Locations</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>{loc.name}</option>
                ))}
              </select>
            </div>

            {/* 3. Status selection */}
            <div>
              <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1 font-mono">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full text-xs px-2.5 py-2.5 rounded-md border border-slate-200 outline-none text-slate-800 focus:border-[#C45C1A] bg-slate-50"
              >
                <option value="all">Any Status</option>
                <option value={PropertyStatus.READY}>Ready to Move</option>
                <option value={PropertyStatus.CONSTRUCTION}>Under Construction</option>
                <option value={PropertyStatus.NEW_LAUNCH}>New Launch</option>
                <option value={PropertyStatus.SOLD_OUT}>Sold Out</option>
              </select>
            </div>

            {/* 4. BHK selection */}
            <div>
              <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1 font-mono">BHK Configuration</label>
              <select
                value={selectedBHK}
                onChange={(e) => setSelectedBHK(e.target.value)}
                className="w-full text-xs px-2.5 py-2.5 rounded-md border border-slate-200 outline-none text-slate-800 focus:border-[#C45C1A] bg-slate-50"
              >
                <option value="all">Any Config</option>
                <option value="1">1 BHK</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                <option value="4">4 BHK+</option>
                <option value="Plot">Plots / Land</option>
              </select>
            </div>

            {/* 5. Range slider budget */}
            <div className="sm:col-span-1">
              <div className="flex justify-between items-center mb-1 text-[10px] font-mono text-slate-400">
                <span className="uppercase font-semibold">Max Price</span>
                <span className="text-[#C45C1A] font-bold">
                  {budgetRange >= 25000000 ? "No Limit" : `Under ₹${budgetRange / 100000} Lakh`}
                </span>
              </div>
              <input
                type="range"
                min="2000000"
                max="25000000"
                step="500000"
                value={budgetRange}
                onChange={(e) => setBudgetRange(Number(e.target.value))}
                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#C45C1A] mt-2.5"
              />
            </div>

            {/* 6. Sorting options */}
            <div>
              <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1 font-mono">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full text-xs px-2.5 py-2.5 rounded-md border border-slate-200 outline-none text-slate-800 focus:border-[#C45C1A] bg-slate-50"
              >
                <option value="newest">Newest Launch</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

          </div>

          {/* Keyword Search & Reset filter actions */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="relative w-full max-w-sm flex items-center border border-slate-200 rounded-lg bg-slate-50 px-3">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search description, landmarks, titles..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full text-xs outline-none bg-transparent py-2 px-2 text-slate-800 placeholder-slate-400"
              />
            </div>

            <button
              onClick={handleResetFilters}
              className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-[#6B1A2A] border border-slate-200 rounded-lg bg-white flex items-center space-x-1 hover:bg-slate-50 transition-colors w-full sm:w-auto justify-center"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        </div>

        {/* Content displays */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-72 bg-slate-300 animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (
          <>
            {viewMode === "grid" ? (
              <>
                {sortedProperties.length === 0 ? (
                  <div className="text-center bg-white p-12 rounded-xl border border-dashed border-[#C9A84C]/45 max-w-lg mx-auto shadow-sm">
                    <Compass className="h-10 w-10 text-[#C45C1A] mx-auto mb-3" />
                    <h3 className="font-serif text-lg font-bold text-[#6B1A2A]">No Matching Assets Found</h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                      No results matched your precise filters. Try adjusting the budget ceiling or selecting another pilgrim corridor zone.
                    </p>
                    <button
                      onClick={handleResetFilters}
                      className="mt-4 px-4 py-2 bg-[#C45C1A] text-white rounded text-xs font-bold"
                    >
                      Clear All Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sortedProperties.map((prop) => (
                      <PropertyCard
                        key={prop.id}
                        property={prop}
                        onCompareToggle={handleCompareToggle}
                        isComparing={comparedIds.includes(prop.id)}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              /* Custom Interactive Map Pin Visualizer */
              <div className="bg-[#1A1A2E] rounded-xl overflow-hidden border border-[#C9A84C]/35 relative h-[500px]" id="map-visualizer-block">
                
                {/* Visual Mathura & Vrindavan regional background map layout layout illustration */}
                <div className="absolute inset-0 bg-[#0e0e1e] flex items-center justify-center bg-[radial-gradient(#1A1A2E_1px,transparent_1px)] [background-size:16px_16px]">
                  
                  {/* Outer Map contours, lines, Yamuna River shape vector line representation */}
                  <svg className="absolute inset-0 h-full w-full opacity-20 pointer-events-none" viewBox="0 0 1000 500">
                    {/* Yamuna River outline flowing from top left to bottom center */}
                    <path
                      d="M100,-50 C300,100 200,300 450,450 C550,520 700,530 800,600"
                      fill="none"
                      stroke="#0E7B6C"
                      strokeWidth="32"
                      strokeLinecap="round"
                    />
                    <text x="350" y="320" fill="#0E7B6C" fontSize="12" fontWeight="bold" transform="rotate(45 350 320)">YAMUNA RIVER</text>
                  </svg>

                  {/* Dynamic pin layout plotted by location guidelines */}
                  <div className="relative w-full h-full p-10 flex flex-wrap items-center justify-center gap-14">
                    {sortedProperties.map((prop) => {
                      // Attempt to generate random/stylized positions to prevent overlaps
                      const mockX = ((prop.price / 100000) % 70) + 15; // standard bounds
                      const mockY = ((prop.area / 10) % 65) + 20;

                      return (
                        <div
                          key={prop.id}
                          className="absolute bg-white text-[#1A1A2E] border-2 border-[#C9A84C] rounded-lg p-2.5 shadow-2xl flex items-center space-x-2 transition-all hover:scale-105 hover:z-20 group"
                          style={{
                            left: `${mockX}%`,
                            top: `${mockY}%`
                          }}
                        >
                          <div className="bg-[#C45C1A] text-white p-1 rounded-full">
                            <Compass className="h-3.5 w-3.5 text-white" />
                          </div>
                          <div>
                            <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">{prop.bhk}</span>
                            <span className="block text-xs font-serif font-bold text-[#6B1A2A]">
                              {formatPrice(prop.price)}
                            </span>
                            {/* Hover expand title representation */}
                            <span className="hidden group-hover:block absolute top-full left-0 bg-[#FAF6F0] border border-[#C9A84C] text-[10px] font-semibold text-slate-800 p-1 rounded whitespace-nowrap mt-1 shadow z-30">
                              {prop.title}
                            </span>
                          </div>
                        </div>
                      );
                    })}

                    {sortedProperties.length === 0 && (
                      <span className="text-slate-400 font-serif text-sm">Please clear filters to see properties plotted on map</span>
                    )}

                  </div>

                </div>

                {/* Map Floating HUD Info */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm shadow border border-[#C9A84C]/30 p-4 rounded-lg z-10 max-w-sm hidden sm:block">
                  <h4 className="font-serif font-bold text-sm text-[#6B1A2E]">PILGRIM MAP SENSORS</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Currently plotting properties across Mathura coordinates. Hover/click pins of prices to see individual property assets.
                  </p>
                </div>

              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
};
export default Properties;
