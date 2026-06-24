/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Calendar, User, Clock, BookOpen, Share2 } from "lucide-react";
import { getBlogBySlug } from "../lib/firestore";
import { Blog } from "../types";
import { formatDate } from "../lib/utils";
import { toast } from "react-hot-toast";
import { SeoHead } from "../components/seo/SeoHead";
import { SITE_URL } from "../lib/seo";

export const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      if (!slug) return;
      setLoading(true);
      try {
        const item = await getBlogBySlug(slug);
        if (item) {
          setBlog(item);
        } else {
          toast.error("Article not found in our registries.");
        }
      } catch (err) {
        console.error("Failed to load blog post details:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPost();
  }, [slug]);

  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Article link copied to clipboard! Share the blessings.");
  };

  if (loading) {
    return (
      <div className="bg-[#FAF6F0] min-h-screen py-20 flex flex-col items-center justify-center">
        <div className="animate-spin h-8 w-8 text-[#C45C1A] border-4 border-[#C45C1A]/20 border-t-[#C45C1A] rounded-full"></div>
        <span className="font-serif text-[#6B1A2A] text-sm mt-4">Loading holy script...</span>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="bg-[#FAF6F0] min-h-screen py-20 text-center flex flex-col items-center justify-center">
        <h2 className="font-serif text-2xl font-bold text-[#6B1A2A]">Journal Not Found</h2>
        <Link to="/blogs" className="mt-4 px-6 py-2.5 bg-[#C45C1A] text-white rounded font-serif text-xs font-bold uppercase shadow">
          Return to Library
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF6F0] min-h-screen text-[#1A1A2E] py-12" id={`blog-pane-${blog.id}`}>
      <SeoHead
        title={blog.seoTitle || `${blog.title} | Nikunj Heritage Infrabuild Blog`}
        description={
          blog.seoDescription ||
          `${blog.title}. Read property insights, legal guidance, and Vrindavan-Mathura real estate perspectives from Nikunj Heritage Infrabuild.`
        }
        pathname={`/blogs/${blog.slug}`}
        image={blog.coverUrl || `${SITE_URL}/og-cover.jpg`}
        keywords={[
          blog.title,
          blog.category,
          "Vrindavan real estate blog",
          "Mathura property insights",
        ]}
        type="article"
        schema={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: blog.title,
          image: blog.coverUrl,
          datePublished: formatDate(blog.createdAt),
          dateModified: formatDate(blog.updatedAt || blog.createdAt),
          author: {
            "@type": "Organization",
            name: "Nikunj Heritage Infrabuild",
          },
          publisher: {
            "@type": "Organization",
            name: "Nikunj Heritage Infrabuild",
            logo: {
              "@type": "ImageObject",
              url: `${SITE_URL}/logo-512.png`,
            },
          },
          description: blog.seoDescription || blog.content.slice(0, 160),
          mainEntityOfPage: `${SITE_URL}/blogs/${blog.slug}`,
        }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation link */}
        <Link to="/blogs" className="inline-flex items-center space-x-1.5 text-xs text-slate-500 hover:text-[#C45C1A] mb-8 font-mono">
          <ChevronLeft className="h-4 w-4" />
          <span>RETURN TO LITERATURE DIRECTORY</span>
        </Link>

        {/* Feature Cover Image */}
        <div className="rounded-2xl overflow-hidden shadow-xl border border-[#C9A84C]/25 max-h-[420px] aspect-video">
          <img
            src={blog.coverUrl}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Meta row */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono mt-6 border-b border-dashed border-[#C9A84C]/20 pb-4">
          <span className="bg-[#C45C1A]/20 text-[#C45C1A] text-[9px] px-2 py-0.5 rounded uppercase font-bold tracking-widest">{blog.category}</span>
          <span className="flex items-center space-x-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formatDate(blog.createdAt)}</span>
          </span>
          <span className="flex items-center space-x-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{blog.readTime}</span>
          </span>
          <span className="flex items-center space-x-1">
            <User className="h-3.5 w-3.5" />
            <span>Author: Acharya Nikunj Desk</span>
          </span>
          <button
            onClick={handleShareClick}
            className="ml-auto text-slate-500 hover:text-[#C45C1A] flex items-center space-x-1 font-semibold"
            type="button"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>Share Link</span>
          </button>
        </div>

        {/* Article Title Header */}
        <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#6B1A2A] mt-6 leading-tight">
          {blog.title}
        </h1>

        {/* Article body prose texts rendering */}
        <div className="mt-8 bg-white p-6 sm:p-10 rounded-2xl border border-[#C9A84C]/15 shadow-sm">
          <div className="prose max-w-none text-slate-600 gap-y-4 flex flex-col font-sans leading-relaxed text-sm sm:text-base">
            {blog.content.split("\n\n").map((para, idx) => {
              if (para.startsWith("##")) {
                return (
                  <h3 key={idx} className="font-serif text-xl sm:text-2xl font-bold text-[#6B1A2E] pt-4 mt-2">
                    {para.replace("##", "").trim()}
                  </h3>
                );
              }
              if (para.startsWith(">")) {
                return (
                  <blockquote key={idx} className="border-l-4 border-[#C9A84C] pl-4 italic text-[#6B1A2A] bg-amber-50/50 p-3 rounded font-serif">
                    {para.replace(">", "").trim()}
                  </blockquote>
                );
              }
              return (
                <p key={idx} className="whitespace-pre-wrap leading-relaxed">
                  {para}
                </p>
              );
            })}
          </div>
        </div>

        {/* Footer Newsletter Prompt */}
        <div className="mt-12 bg-[#1A1A2E] text-[#FAF6F0] p-6 rounded-2xl border border-[#C9A84C]/40 text-center">
          <BookOpen className="h-8 w-8 text-[#C9A84C] mx-auto mb-2" />
          <h4 className="font-serif font-bold text-lg text-white">Join Our Sanctum Newsletter</h4>
          <p className="text-xs text-[#FAF6F0]/70 max-w-md mx-auto mt-1 font-sans">
            Recite monthly parikrama checklists and direct notifications on land registries under active verification.
          </p>
          <button
            onClick={() => toast.success("Joined divine updates successfully!")}
            className="mt-4 px-5 py-2.5 bg-[#C45C1A] text-white rounded text-xs font-bold font-serif uppercase tracking-widest hover:bg-[#C45C1A]/90 transition"
          >
            Join Traditional Updates
          </button>
        </div>

      </div>
    </div>
  );
};
export default BlogDetail;
