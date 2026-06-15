/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { MessageSquare, Star, Sparkles } from "lucide-react";
import { getTestimonials, addTestimonial as createTestimonial } from "../lib/firestore";
import { Testimonial } from "../types";
import { toast } from "react-hot-toast";

export const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  // Submission form states
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [isSubmiting, setIsSubmiting] = useState(false);

  useEffect(() => {
    async function loadTestimonials() {
      setLoading(true);
      try {
        const fullList = await getTestimonials();
        setTestimonials(fullList.filter(t => t.approved));
      } catch (err) {
        console.error("Testimonials fetch err:", err);
      } finally {
        setLoading(false);
      }
    }
    loadTestimonials();
  }, []);

  const handleTestimonialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !content) {
      toast.error("Please supply both your Name and Feedback Content.");
      return;
    }
    setIsSubmiting(true);
    try {
      await createTestimonial({
        name,
        role: role || "Satisfied Homeowner",
        text: content,
        stars: rating,
        imageUrl: `https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200`
      });

      toast.success("Pranam! Thank you for sharing your heart. Feedback sent for directory approval.");
      setName("");
      setRole("");
      setContent("");
      setRating(5);
    } catch (err) {
      toast.error("Submit failed. Try again soon.");
    } finally {
      setIsSubmiting(false);
    }
  };

  return (
    <div className="bg-[#FAF6F0] min-h-screen text-[#1A1A2E] py-12" id="testimonials-index-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <MessageSquare className="h-10 w-10 text-[#C45C1A] mx-auto mb-2" />
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#6B1A2A]" id="testimonials-main-title">
            Homeowner Testimonials
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 font-sans">
            Hear sincere blessings and reviews from devout families who have settled inside our ready properties in Vrindavan and Mathura.
          </p>
        </div>

        {/* Content Splitting Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Approved Feedbacks Grid List */}
          <div className="lg:col-span-8">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-44 bg-slate-200 animate-pulse rounded-lg" />
                ))}
              </div>
            ) : (
              <>
                {testimonials.length === 0 ? (
                  <div className="text-center bg-white border border-dashed border-[#C9A84C]/35 rounded-xl p-10">
                    <span className="font-serif font-bold text-base text-slate-400 block">No Testimonials listed yet. Feel free to list first!</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {testimonials.map((t) => (
                      <div key={t.id} className="bg-white p-5 rounded-2xl border border-[#C9A84C]/15 shadow-sm space-y-4 flex flex-col justify-between hover:shadow transition-shadow">
                        <div>
                          {/* Star row */}
                          <div className="flex space-x-0.5 text-amber-500 mb-2">
                            {Array.from({ length: t.stars || 5 }).map((_, i) => (
                              <Star key={i} className="h-4.5 w-4.5 fill-current" />
                            ))}
                          </div>
                          <p className="text-xs sm:text-sm text-slate-600 italic font-sans leading-relaxed">
                            "{t.text}"
                          </p>
                        </div>

                        {/* Customer profile block */}
                        <div className="flex items-center space-x-3 pt-3 border-t border-slate-50">
                          <img
                            src={t.imageUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"}
                            alt={t.name}
                            className="h-10 w-10 rounded-full object-cover border border-[#C9A84C]"
                          />
                          <div>
                            <h4 className="font-serif text-sm font-bold text-[#1A1A2E]">{t.name}</h4>
                            <span className="text-[10px] text-slate-400 font-mono italic block">{t.role}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Submission Questionnaire box right */}
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl border-2 border-[#C9A84C]/45 shadow-xl">
            <div className="flex items-center space-x-1.5 text-[#C45C1A] mb-3">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider font-mono">Homeowner Praise</span>
            </div>
            
            <h3 className="font-serif font-bold text-lg text-[#6B1A2A] mb-1">Write Your Experience</h3>
            <p className="text-xs text-slate-500 mb-6 font-sans">
              Pranam! Let us know how Shri Nikunj guides assisted your parikrama registry execution.
            </p>

            <form onSubmit={handleTestimonialSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 font-mono">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Pandit Satish Mishra"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-200 outline-none focus:border-[#C45C1A] text-slate-800 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 font-mono">Job Role / City</label>
                <input
                  type="text"
                  placeholder="e.g., Retired SBI Manager, Delhi"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-200 outline-none focus:border-[#C45C1A] text-slate-800 bg-slate-50"
                />
              </div>

              {/* Star Rating select box */}
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 font-mono">Rating Rating</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-200 outline-none focus:border-[#C45C1A] text-slate-800 bg-slate-50"
                >
                  <option value={5}>5 Stars Double Blessed</option>
                  <option value={4}>4 Stars Highly Satisfied</option>
                  <option value={3}>3 Stars Average</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 font-mono font-semibold">Homeowner Feedback Text</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share details on key specifications, water sweet levels, walking distances to temple shrine..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-200 outline-none resize-none focus:border-[#C45C1A] text-slate-800 bg-slate-50"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmiting}
                className="w-full py-3 bg-[#6B1A2A] text-white font-bold rounded-lg text-xs uppercase tracking-wider transition-colors hover:bg-[#6B1A2A]/90 shadow font-serif"
              >
                {isSubmiting ? "Publishing card..." : "Publish Experience Review"}
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};
export default Testimonials;
