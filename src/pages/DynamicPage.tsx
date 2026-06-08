/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, FileText, Calendar, Sparkles } from "lucide-react";
import { getPages } from "../lib/firestore";
import { Page } from "../types";
import { formatDate } from "../lib/utils";

export const DynamicPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDynamicPage() {
      if (!slug) return;
      setLoading(true);
      try {
        const pages = await getPages();
        const active = pages.find(p => p.slug === slug && p.status === "Published");
        if (active) {
          setPage(active);
        }
      } catch (err) {
        console.error("Failed loading dynamic page:", err);
      } finally {
        setLoading(false);
      }
    }
    loadDynamicPage();
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-[#FAF6F0] min-h-screen py-20 flex flex-col items-center justify-center">
        <div className="animate-spin h-8 w-8 text-[#C45C1A] border-4 border-[#C45C1A]/20 border-t-[#C45C1A] rounded-full"></div>
        <span className="font-serif text-[#6B1A2A] text-sm mt-4">Opening page records...</span>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="bg-[#FAF6F0] min-h-screen py-20 text-center flex flex-col items-center justify-center">
        <h2 className="font-serif text-2xl font-bold text-[#6B1A2A]">Page Not Found</h2>
        <p className="text-slate-500 mt-2 max-w-sm font-sans text-xs">
          The requested administrative page layout does not exist or has been unpublished by the system directors.
        </p>
        <Link to="/" className="mt-6 px-6 py-2.5 bg-[#C45C1A] text-white rounded font-serif text-xs font-bold uppercase shadow">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF6F0] min-h-screen text-[#1A1A2E] py-12" id={`dynamic-cms-page-${page.id}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center space-x-1.5 text-xs text-slate-500 hover:text-[#C45C1A] mb-8 font-mono">
          <ChevronLeft className="h-4 w-4" />
          <span>RETURN TO HOME</span>
        </Link>

        {/* Dynamic content rendering frame */}
        <div className="bg-white p-6 sm:p-12 rounded-2xl border border-[#C9A84C]/25 shadow-xl space-y-6">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-4">
            <div className="p-2 bg-[#C45C1A]/10 border border-[#C45C1A]/40 rounded-lg text-[#C45C1A]">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-serif text-xl sm:text-3xl font-extrabold text-[#6B1A2A] tracking-wide leading-tight">
                {page.title}
              </h1>
              <span className="block text-[10px] text-slate-400 font-mono uppercase mt-0.5">
                Published: {formatDate(page.createdAt)} • Verified by Nikunj Compliance Advisors
              </span>
            </div>
          </div>

          {/* Dynamic Content Markdown paragraphs parsed cleanly */}
          <div className="prose max-w-none text-slate-600 gap-y-4 flex flex-col font-sans leading-relaxed text-sm sm:text-base">
            {page.content.split("\n\n").map((chunk, idx) => {
              if (chunk.startsWith("##")) {
                return (
                  <h3 key={idx} className="font-serif text-lg sm:text-xl font-bold text-[#6B1A2E] pt-2">
                    {chunk.replace("##", "").trim()}
                  </h3>
                );
              }
              if (chunk.startsWith("-") || chunk.startsWith("*")) {
                return (
                  <ul key={idx} className="list-disc pl-5 text-slate-600 text-xs sm:text-sm space-y-1 bg-slate-50 p-3 rounded border border-slate-100 font-sans">
                    {chunk.split("\n").map((li, liIdx) => (
                      <li key={liIdx}>{li.replace(/^[-\*]\s+/, "")}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={idx} className="whitespace-pre-wrap leading-relaxed text-xs sm:text-sm">
                  {chunk}
                </p>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
export default DynamicPage;
