/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Calendar, MapPin, Clock, Sparkles } from "lucide-react";

export const Events: React.FC = () => {
  const events = [
    {
      title: "Yamuna Ghat Aarti & Nikunj property Launch Fest",
      desc: "Join Shri Nikunj Chaturvedi for holy prayers at Yamuna Ghats, followed by the exclusive model unveilings of our forthcoming Rukmani Vihar Phase III fully customized smart villas.",
      date: "June 24, 2026",
      time: "05:00 PM onwards",
      loc: "Keshi Ghat, Vrindavan, UP",
      cover: "https://images.unsplash.com/photo-1545229765-7018d6ff02bd?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Mathura District RERA & Security Guidance Fair",
      desc: "A unique public awareness seminar answering parikrama registry questions, explaining land conversion guidelines (UP Revenue Code 143), and offering complementary title-check auditing services for pilgrims.",
      date: "July 12, 2026",
      time: "10:30 AM - 04:30 PM",
      loc: "Mathura City Center, Junction Road",
      cover: "https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="bg-[#FAF6F0] min-h-screen text-[#1A1A2E] py-12" id="events-directory-box">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Calendar className="h-10 w-10 text-[#C45C1A] mx-auto mb-2" />
          <h1 className="font-serif text-3xl font-bold text-[#6B1A2A]">Events & Launch Fests</h1>
          <p className="text-xs text-slate-500 mt-2 font-sans">
            Participate in our local parikrama events, model home launches and regulatory compliance fairs across Brijbhoomi.
          </p>
        </div>

        <div className="space-y-8">
          {events.map((ev, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-[#C9A84C]/25 overflow-hidden shadow-sm hover:shadow-lg transition-transform duration-300 md:grid md:grid-cols-12">
              <div className="md:col-span-5 h-48 md:h-full">
                <img
                  src={ev.cover}
                  alt={ev.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 md:col-span-7 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-1.5 text-xs text-[#C45C1A] font-mono font-bold uppercase mb-2">
                    <Sparkles className="h-4 w-4" />
                    <span>Devotional & Real Estate Gathering</span>
                  </div>
                  <h3 className="font-serif font-bold text-[#1A1A2E] text-lg sm:text-xl leading-tight">
                    {ev.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans mt-2">
                    {ev.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-4 text-xs font-mono text-slate-500">
                  <span className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <span>{ev.date}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-slate-400" />
                    <span>{ev.time}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <span>{ev.loc}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
export default Events;
