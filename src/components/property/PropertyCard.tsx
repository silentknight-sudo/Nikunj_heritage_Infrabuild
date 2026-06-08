/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, ChevronLeft, ChevronRight, CheckSquare, Square, MapPin, Award } from "lucide-react";
import { Property, PropertyStatus } from "../../types";
import { formatPrice } from "../../lib/utils";

interface PropertyCardProps {
  property: Property;
  onCompareToggle?: (id: string) => void;
  isComparing?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onCompareToggle,
  isComparing = false
}) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("nh_wishlist") || "[]");
    setIsWishlisted(list.includes(property.id));
  }, [property.id]);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const list = JSON.parse(localStorage.getItem("nh_wishlist") || "[]");
    let newList;
    if (list.includes(property.id)) {
      newList = list.filter((id: string) => id !== property.id);
      setIsWishlisted(false);
    } else {
      newList = [...list, property.id];
      setIsWishlisted(true);
    }
    localStorage.setItem("nh_wishlist", JSON.stringify(newList));
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (property.imageUrls && property.imageUrls.length > 0) {
      setActiveImageIdx(prev => (prev + 1) % property.imageUrls.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (property.imageUrls && property.imageUrls.length > 0) {
      setActiveImageIdx(prev => (prev - 1 + property.imageUrls.length) % property.imageUrls.length);
    }
  };

  // Status-dependent theme tags
  const statusConfig = {
    [PropertyStatus.READY]: "bg-[#0E7B6C] text-white",
    [PropertyStatus.CONSTRUCTION]: "bg-[#C45C1A] text-white",
    [PropertyStatus.NEW_LAUNCH]: "bg-[#C9A84C] text-[#1A1A2E] font-semibold",
    [PropertyStatus.SOLD_OUT]: "bg-gray-500 text-white"
  };

  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-[#C9A84C]/20 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col relative" id={`property-card-${property.id}`}>
      
      {/* Upper Media Zone */}
      <div className="relative h-48 sm:h-56 w-full overflow-hidden shrink-0">
        <Link to={`/properties/${property.slug}`} className="block h-full w-full">
          {property.imageUrls && property.imageUrls.length > 0 ? (
            <img
              src={property.imageUrls[activeImageIdx]}
              alt={property.title}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-[#FAF6F0] flex items-center justify-center">
              <span className="text-[#C9A84C] text-xs font-mono">Nikunj Sanctum Asset</span>
            </div>
          )}
        </Link>

        {/* Dynamic Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <span className={`px-2.5 py-1 rounded text-[11px] font-semibold tracking-wider uppercase ${statusConfig[property.status]}`}>
            {property.status}
          </span>
          {property.featured && (
            <span className="bg-[#6B1A2A] text-white px-2 py-0.5 rounded text-[9px] font-bold tracking-widest uppercase self-start border border-[#C9A84C]/40">
              FEATURED
            </span>
          )}
        </div>

        {/* Heart Wishlist Overlay */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-[#6B1A2A] hover:bg-white transition-colors duration-200 shadow-sm z-10"
          type="button"
          aria-label="Toggle Wishlist"
        >
          <Heart className={`h-4.5 w-4.5 ${isWishlisted ? "fill-current text-[#6B1A2A]" : ""}`} />
        </button>

        {/* Carousel Arrow Buttons */}
        {property.imageUrls && property.imageUrls.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/40 hover:bg-white/80 text-[#1A1A2E] transition-all opacity-0 group-hover:opacity-100 duration-200 z-10"
              type="button"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/40 hover:bg-white/80 text-[#1A1A2E] transition-all opacity-0 group-hover:opacity-100 duration-200 z-10"
              type="button"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}

        {/* Dot Carousel Indicators */}
        {property.imageUrls && property.imageUrls.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1 z-10 bg-black/20 px-2 py-1 rounded-full">
            {property.imageUrls.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  idx === activeImageIdx ? "bg-[#C45C1A]" : "bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Info details Body */}
      <div className="p-4 flex flex-col flex-grow">
        
        {/* Category Chip & Price Badge */}
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] sm:text-[11px] text-[#C45C1A] uppercase tracking-wider font-semibold font-mono">
            {property.bhk}
          </span>
          <span className="text-sm sm:text-base text-[#6B1A2A] font-bold font-serif">
            {formatPrice(property.price)}
          </span>
        </div>

        {/* Property Main Title */}
        <Link to={`/properties/${property.slug}`} className="block block-title mb-2.5">
          <h3 className="font-serif text-[#1A1A2E] font-semibold text-base leading-tight hover:text-[#C45C1A] line-clamp-1">
            {property.title}
          </h3>
        </Link>

        {/* Location & RERA Badge Row */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-3 text-xs text-slate-600 mb-3 border-b border-[#C9A84C]/10 pb-3">
          <div className="flex items-center space-x-1">
            <MapPin className="h-3.5 w-3.5 text-[#0E7B6C] shrink-0" />
            <span className="truncate max-w-[120px] sm:max-w-none">Brijbhoomi Belt</span>
          </div>
          {property.reraNumber && (
            <div className="flex items-center space-x-1 text-[10px] font-mono bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded text-amber-800 shrink-0">
              <Award className="h-3 w-3 text-amber-600" />
              <span>RERA Approved</span>
            </div>
          )}
        </div>

        {/* Key Specification Metrics highlights */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 mb-4 font-mono">
          <div>
            <span className="block text-[10px] text-slate-400 capitalize">Carpet Area</span>
            <span className="font-semibold text-slate-700">{property.area} Sq Ft</span>
          </div>
          <div>
            <span className="block text-[10px] text-slate-400 capitalize">Possession</span>
            <span className="font-semibold text-[#0E7B6C]">{property.possessionDate || "Under Way"}</span>
          </div>
        </div>

        {/* Landmark distance highlights */}
        {property.landmarks && property.landmarks.length > 0 && (
          <div className="mt-auto bg-[#FAF6F0] p-2.5 rounded-md text-[11px] text-slate-600 border border-[#C9A84C]/10 mb-4 shrink-0">
            <span className="font-serif font-semibold text-[#6B1A2A] block mb-1">Divine Proximity:</span>
            <div className="flex flex-col gap-0.5 font-sans">
              {property.landmarks.slice(0, 2).map((lm, idx) => (
                <div key={idx} className="flex justify-between">
                  <span>• {lm.name}</span>
                  <span className="font-bold text-[#0E7B6C]">{lm.distance}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Actions: Comparison Control & Nav link */}
        <div className="flex justify-between items-center pt-2.5 border-t border-slate-100 mt-auto">
          {/* Comparison Toggle Box */}
          {onCompareToggle && (
            <button
              onClick={() => onCompareToggle(property.id)}
              className="flex items-center space-x-1.5 text-xs text-slate-500 hover:text-[#C45C1A] transition-colors"
              type="button"
            >
              {isComparing ? (
                <CheckSquare className="h-4 w-4 text-[#C45C1A]" />
              ) : (
                <Square className="h-4 w-4" />
              )}
              <span>Compare</span>
            </button>
          )}

          <Link
            to={`/properties/${property.slug}`}
            className="text-xs font-semibold text-[#C45C1A] hover:text-[#6B1A2A] uppercase tracking-wider underline underline-offset-4"
          >
            Full Details →
          </Link>
        </div>

      </div>
    </div>
  );
};
export default PropertyCard;
