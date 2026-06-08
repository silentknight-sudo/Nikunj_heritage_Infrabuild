/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

export const Skeleton: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`animate-pulse bg-[#FAF6F0] border border-[#C9A84C]/10 rounded-md ${className}`} />
  );
};

export const CardSkeleton: React.FC = () => {
  return (
    <div className="border border-[#C9A84C]/20 bg-white rounded-lg p-4 space-y-4 shadow-sm">
      <Skeleton className="h-48 w-full rounded-t-lg" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-1/3" />
      </div>
      <div className="grid grid-cols-2 gap-2 pt-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
      <div className="h-10 w-full pt-4">
        <Skeleton className="h-full w-full" />
      </div>
    </div>
  );
};
