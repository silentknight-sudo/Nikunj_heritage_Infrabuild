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

  const statusConfig = {
    [PropertyStatus.READY]: "bg-emerald-600 text-white",
    [PropertyStatus.CONSTRUCTION]: "bg-amber-500 text-white",
    [PropertyStatus.NEW_LAUNCH]: "bg-[color:var(--brand-saffron)] text-white",
    [PropertyStatus.SOLD_OUT]: "bg-slate-500 text-white"
  };

  const images = property.imageUrls || [];
  const locationLabel = property.slug === "hare-krishna-resort-suites" ? "Sunrakh Bangar, Vrindavan" : "Mathura–Vrindavan";
  const pricePerSqFt = property.area > 0 ? Math.round(property.price / property.area) : 0;

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl" id={`property-card-${property.id}`}>

      {/* Media */}
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-slate-100">
        <Link to={`/properties/${property.slug}`} className="block h-full w-full" aria-label={property.title}>
          {images.length > 0 ? (
            <img
              src={images[activeImageIdx]}
              alt={property.title}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(event) => { event.currentTarget.src = "/projects/images/ai-buyer-residential.jpg"; }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">Photos coming soon</div>
          )}
        </Link>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Badges */}
        <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-1.5">
          <span className={`rounded-md px-2 py-1 text-[11px] font-bold ${statusConfig[property.status] || "bg-slate-700 text-white"}`}>
            {property.status}
          </span>
          {property.featured && (
            <span className="rounded-md bg-[color:var(--brand-night)] px-2 py-1 text-[11px] font-bold text-white">Featured</span>
          )}
          {property.investmentProject && (
            <span className="rounded-md bg-white/95 px-2 py-1 text-[11px] font-bold text-[color:var(--brand-night)]">Investment</span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={handleWishlistClick}
          className="absolute right-3 top-3 z-10 rounded-full bg-white/95 p-2 text-slate-600 shadow-sm transition-colors hover:text-rose-500"
          type="button"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={isWishlisted}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? "fill-rose-500 text-rose-500" : ""}`} />
        </button>

        {/* Carousel controls */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-1.5 text-slate-800 opacity-0 shadow transition-opacity duration-200 group-hover:opacity-100"
              type="button"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-1.5 text-slate-800 opacity-0 shadow transition-opacity duration-200 group-hover:opacity-100"
              type="button"
              aria-label="Next photo"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <span className="absolute bottom-2.5 right-3 z-10 rounded-md bg-black/55 px-2 py-0.5 text-[11px] font-semibold text-white">
              {activeImageIdx + 1}/{images.length}
            </span>
          </>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-grow flex-col p-4">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-lg font-extrabold text-[color:var(--brand-night)]">{formatPrice(property.price)}</span>
          {pricePerSqFt > 0 && (
            <span className="text-xs text-slate-400">₹{pricePerSqFt.toLocaleString("en-IN")}/sq ft</span>
          )}
        </div>

        <Link to={`/properties/${property.slug}`} className="mt-1 block">
          <h3 className="line-clamp-1 font-sans text-base font-bold text-[color:var(--brand-night)] transition-colors hover:text-[color:var(--brand-saffron)]">
            {property.title}
          </h3>
        </Link>

        <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" />
          <span className="truncate">{locationLabel}</span>
        </div>

        {/* Specs */}
        <div className="mt-3 grid grid-cols-3 divide-x divide-slate-100 rounded-xl bg-slate-50 py-2.5 text-center">
          <div className="px-1">
            <span className="block text-[10px] uppercase tracking-wide text-slate-400">Config</span>
            <span className="block truncate text-xs font-bold text-slate-700">{property.bhk.split(" ").slice(0, 2).join(" ")}</span>
          </div>
          <div className="px-1">
            <span className="block text-[10px] uppercase tracking-wide text-slate-400">Area</span>
            <span className="block text-xs font-bold text-slate-700">{property.area} sq ft</span>
          </div>
          <div className="px-1">
            <span className="block text-[10px] uppercase tracking-wide text-slate-400">Possession</span>
            <span className="block truncate text-xs font-bold text-slate-700">{property.possessionDate || "On request"}</span>
          </div>
        </div>

        {/* Highlights */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {(property.reraNumber || property.reraApproved) && (
            <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-700">
              <Award className="h-3 w-3" />
              RERA Approved
            </span>
          )}
          {property.landmarks?.[0] && (
            <span className="inline-flex max-w-full items-center gap-1 truncate rounded-md bg-amber-50 px-2 py-1 text-[11px] font-semibold text-amber-800">
              {property.landmarks[0].name} · {property.landmarks[0].distance}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="min-h-4 flex-grow" />
        <div className="flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
          {onCompareToggle ? (
            <button
              onClick={() => onCompareToggle(property.id)}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition-colors hover:text-[color:var(--brand-saffron)]"
              type="button"
            >
              {isComparing ? (
                <CheckSquare className="h-4 w-4 text-[color:var(--brand-saffron)]" />
              ) : (
                <Square className="h-4 w-4" />
              )}
              <span>Compare</span>
            </button>
          ) : (
            <span />
          )}

          <Link
            to={`/properties/${property.slug}`}
            className="rounded-lg bg-[color:var(--brand-saffron)] px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-[#d4661d]"
          >
            View Details
          </Link>
        </div>

      </div>
    </div>
  );
};
export default PropertyCard;
