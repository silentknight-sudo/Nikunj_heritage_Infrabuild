/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronRight, BookOpen, Clock } from "lucide-react";
import { getBlogs } from "../lib/firestore";
import { Blog } from "../types";
import { formatDate } from "../lib/utils";

export const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchWord, setSearchWord] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");

  useEffect(() => {
    async function loadBlogs() {
      setLoading(true);
      try {
        const list = await getBlogs();
        setBlogs(list);
      } catch (err) {
        console.error("Blogs directory loading failed:", err);
      } finally {
        setLoading(false);
      }
    }
    loadBlogs();
  }, []);

  // Simple static tagging categorization
  const tags = ["all", "Property Guide", "Divine Culture", "Registry", "Development"];

  const filteredBlogs = blogs.filter((b) => {
    // keyword search
    if (searchWord.trim()) {
      const matchTitle = b.title.toLowerCase().includes(searchWord.toLowerCase());
      if (!matchTitle) return false;
    }
    // Tag Selection
    if (selectedTag !== "all" && b.category !== selectedTag) {
      return false;
    }
    return true;
  });

  return (
    <div className="bg-[#FAF6F0] min-h-screen text-[#1A1A2E] py-12" id="blogs-index-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <BookOpen className="h-10 w-10 text-[#C45C1A] mx-auto mb-2" />
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#6B1A2A]" id="blogs-title">
            Brijbhoomi Literature
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 font-sans">
            Read holy parikrama updates, land registries guidelines, local property insights and development updates in Mathura and Vrindavan.
          </p>
        </div>

        {/* Directory Search & Filters shelf */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-xl border border-[#C9A84C]/25 shadow-sm mb-10 gap-3">
          <div className="relative w-full max-w-sm flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search literature titles..."
              value={searchWord}
              aria-label="Blog Search Input"
              onChange={(e) => setSearchWord(e.target.value)}
              className="w-full text-xs outline-none bg-transparent py-2 px-2 text-slate-800 placeholder-slate-400"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 justify-center">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors duration-200 ${
                  selectedTag === tag
                    ? "bg-[#C45C1A] text-white"
                    : "bg-slate-100 hover:bg-[#C9A84C]/10 text-slate-600"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Blog cards rendering */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-72 bg-slate-300 animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (
          <>
            {filteredBlogs.length === 0 ? (
              <div className="text-center bg-white border border-dashed border-[#C9A84C]/35 rounded-xl p-10 max-w-md mx-auto">
                <span className="font-serif font-bold text-base text-[#6B1A2E] block">No Articles Match Your Search</span>
                <button
                  onClick={() => {
                    setSearchWord("");
                    setSelectedTag("all");
                  }}
                  className="mt-3 text-xs bg-[#C45C1A] text-white px-3 py-1.5 rounded"
                >
                  Reset Library Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBlogs.map((post) => (
                  <article key={post.id} className="bg-white rounded-xl overflow-hidden border border-[#C9A84C]/15 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
                    <div>
                      <img
                        src={post.coverUrl}
                        alt={post.title}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-5 space-y-2">
                        <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono font-semibold uppercase">
                          <span>{post.category}</span>
                          <span className="flex items-center space-x-1">
                            <Clock className="h-3.5 w-3.5 text-slate-400" />
                            <span>{post.readTime}</span>
                          </span>
                        </div>

                        <Link to={`/blogs/${post.slug}`} className="block block-title">
                          <h3 className="font-serif font-bold text-[#1A1A2E] text-base leading-snug hover:text-[#C45C1A] transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                        </Link>

                        <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed font-sans">
                          {post.content.replace(/[#*`_]/g, "").slice(0, 150)}...
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 flex justify-between items-center border-t border-slate-50 mt-4">
                      <span className="text-[10px] font-mono text-slate-400">{formatDate(post.createdAt)}</span>
                      <Link
                        to={`/blogs/${post.slug}`}
                        className="text-xs font-semibold text-[#6B1A2A] hover:text-[#C45C1A] flex items-center space-x-0.5 underline underline-offset-4 font-mono"
                      >
                        <span>Full Journal</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
};
export default Blogs;
