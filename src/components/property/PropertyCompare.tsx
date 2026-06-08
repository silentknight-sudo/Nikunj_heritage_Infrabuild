/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { X, Scale } from "lucide-react";
import { Property } from "../../types";
import { formatPrice } from "../../lib/utils";

interface PropertyCompareProps {
  properties: Property[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

export const PropertyCompare: React.FC<PropertyCompareProps> = ({
  properties,
  onRemove,
  onClear
}) => {
  if (properties.length === 0) return null;

  return (
    <div className="bg-white border-2 border-[#C9A84C]/40 rounded-xl shadow-2xl p-6 my-10 max-w-5xl mx-auto scroll-mt-24" id="properties-comparison-tray">
      <div className="flex justify-between items-center border-b border-[#C9A84C]/20 pb-4 mb-6">
        <div className="flex items-center space-x-2">
          <Scale className="h-6 w-6 text-[#C45C1A]" />
          <h3 className="font-serif text-xl font-bold text-[#1A1A2E]">
            Property Comparison Sandbox ({properties.length}/3)
          </h3>
        </div>
        <button
          onClick={onClear}
          className="text-xs text-[#6B1A2A] font-semibold hover:underline"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
        {/* Specifications label Index column */}
        <div className="hidden md:flex flex-col space-y-4 pt-36 font-semibold text-slate-500 font-mono text-xs">
          <div className="h-10 flex items-center border-b border-slate-100">BHK / Config</div>
          <div className="h-10 flex items-center border-b border-slate-100">Asking Price</div>
          <div className="h-10 flex items-center border-b border-slate-100">Carpet Area</div>
          <div className="h-10 flex items-center border-b border-slate-100">Vastu Facing</div>
          <div className="h-10 flex items-center border-b border-slate-100">Possession Time</div>
          <div className="h-10 flex items-center border-b border-slate-100">RERA License</div>
          <div className="flex-grow pt-2 select-none">Divine Proximity</div>
        </div>

        {/* Data Cards comparison row */}
        {properties.map((prop) => (
          <div key={prop.id} className="relative border border-[#C9A84C]/20 rounded-lg p-4 bg-[#FAF6F0]/20 flex flex-col md:col-span-1">
            {/* Close/Remove action */}
            <button
              onClick={() => onRemove(prop.id)}
              className="absolute top-2 right-2 p-1 rounded-full bg-red-100 hover:bg-red-200 text-red-700 transition-colors z-10"
              title="Remove from compare"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Thumbnail and Title */}
            <div className="mb-4">
              <img
                src={prop.imageUrls?.[0]}
                alt={prop.title}
                className="w-full h-24 object-cover rounded-md mb-2 border border-[#C9A84C]/10"
              />
              <h4 className="font-serif font-bold text-[#1A1A2E] text-sm h-12 line-clamp-2 leading-snug">
                {prop.title}
              </h4>
            </div>

            {/* Compared rows */}
            <div className="space-y-4">
              {/* BHK config */}
              <div className="h-10 flex items-center border-b border-slate-100 font-semibold text-slate-800">
                <span className="md:hidden text-xs text-slate-400 block font-mono pr-2">BHK:</span>
                {prop.bhk}
              </div>

              {/* Price */}
              <div className="h-10 flex items-center border-b border-slate-100 text-[#6B1A2A] font-bold">
                <span className="md:hidden text-xs text-slate-400 block font-mono pr-2">Price:</span>
                {formatPrice(prop.price)}
              </div>

              {/* Area */}
              <div className="h-10 flex items-center border-b border-slate-100 text-slate-700 font-mono">
                <span className="md:hidden text-xs text-slate-400 block font-mono pr-2">Area:</span>
                {prop.area} Sq Ft
              </div>

              {/* Facing */}
              <div className="h-10 flex items-center border-b border-slate-100 text-slate-700">
                <span className="md:hidden text-xs text-slate-400 block font-mono pr-2">Facing:</span>
                {prop.facing || "N/A"}
              </div>

              {/* Possession */}
              <div className="h-10 flex items-center border-b border-slate-100 text-[#0E7B6C] font-semibold">
                <span className="md:hidden text-xs text-slate-400 block font-mono pr-2">Possession:</span>
                {prop.possessionDate || "Underway"}
              </div>

              {/* RERA */}
              <div className="h-10 flex items-center border-b border-slate-100 text-slate-600 font-mono text-xs">
                <span className="md:hidden text-xs text-slate-400 block font-mono pr-2">RERA:</span>
                {prop.reraNumber || "Approved"}
              </div>

              {/* Landmarks distances list */}
              <div className="pt-2">
                <span className="md:hidden block text-xs text-slate-400 font-mono pb-1">Divine Proximity:</span>
                <div className="bg-[#FAF6F0] p-2 rounded text-xs space-y-1 font-sans text-slate-600">
                  {prop.landmarks?.map((lm, idx) => (
                    <div key={idx} className="flex justify-between text-[11px]">
                      <span>{lm.name}</span>
                      <span className="font-semibold text-[#0E7B6C]">{lm.distance}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Placeholder cells context */}
        {Array.from({ length: 3 - properties.length }).map((_, idx) => (
          <div key={idx} className="hidden md:flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-lg p-6 bg-slate-50 min-h-[300px]">
            <span className="text-slate-400 font-serif text-sm">Add another property to compare specs side by side</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PropertyCompare;
