/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, HelpCircle, Send } from "lucide-react";
import { createLead } from "../lib/firestore";
import { toast } from "react-hot-toast";

export const ContactUs: React.FC = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("Residential Apartments");
  const [message, setMessage] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      toast.error("Pranam! Please fulfill at least the Name and Contact Fields.");
      return;
    }
    setIsSubmiting(true);
    try {
      await createLead({
        name,
        phone,
        email: email || "generic-contact@nikunj.com",
        propertyType: category,
        locationInterest: "Mathura / Vrindavan Center Core",
        message,
        preferredCallback: "Within 4 Hours",
        sourceUrl: window.location.href
      });

      toast.success("Pranam! Your divine request registered successfully. Expect an expert callback shortly!");
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error("Failed submitting lead contact:", err);
      toast.error("Submit failed. Please connect via live WhatsApp button!");
    } finally {
      setIsSubmiting(false);
    }
  };

  return (
    <div className="bg-[#FAF6F0] min-h-screen text-[#1A1A2E] py-12" id="contact-us-page-box">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#C45C1A] font-mono">Brijbhoomi Office Desk</span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#6B1A2A] font-bold mt-1">Connect with Nikunj</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 font-sans">
            Schedule a site visit, request original land conversion titles or meet our advisers directly in our Vrindavan location.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Contact Details Left */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-[#C9A84C]/20 shadow-sm space-y-6">
              <h3 className="font-serif font-bold text-[#6B1A2A] text-lg border-b border-[#C9A84C]/10 pb-2">Our Brij Head Office</h3>

              <div className="flex items-start space-x-3.5">
                <MapPin className="h-5 w-5 text-[#C45C1A] shrink-0 mt-1" />
                <div>
                  <span className="block font-serif text-sm font-bold text-slate-800">Physical Address</span>
                  <span className="block text-xs sm:text-sm text-slate-600 leading-snug mt-0.5">
                    Nikunj Heritage Infrabuild Office, 21/s3, Sec-3 Rukmani Vihar, Vrindavan, Uttar Pradesh - 281121
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <Phone className="h-5 w-5 text-[#0E7B6C] shrink-0 mt-1" />
                <div>
                  <span className="block font-serif text-sm font-bold text-slate-800">Mobile Hotlines</span>
                  <span className="block text-xs sm:text-sm text-slate-600 leading-snug mt-0.5 font-mono">
                    +91 97199 20888<br />
                    +91 74092 12222
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <Mail className="h-5 w-5 text-[#C9A84C] shrink-0 mt-1" />
                <div>
                  <span className="block font-serif text-sm font-bold text-slate-800">Corporate Email ID</span>
                  <span className="block text-xs sm:text-sm text-slate-600 mt-0.5 font-mono">
                    info@nikunjheritageinfrabuild.com
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <Clock className="h-5 w-5 text-[#C45C1A] shrink-0 mt-1" />
                <div>
                  <span className="block font-serif text-sm font-bold text-slate-800">Brijvas Office Hours</span>
                  <span className="block text-xs sm:text-sm text-slate-600 mt-0.5">
                    Monday to Sunday: 09:00 AM - 08:30 PM (Vrindavan Aarti schedules respected)
                  </span>
                </div>
              </div>
            </div>

            {/* UP RERA details visual marker */}
            <div className="bg-[#1A1A2E] text-white p-6 rounded-2xl border border-[#C9A84C]/40 text-center">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#C9A84C] font-mono">Governing Authority Verified</span>
              <h4 className="font-serif font-bold text-base mt-1">UP RERA License compliance</h4>
              <p className="text-xs text-[#FAF6F0]/70 mt-2 font-sans leading-relaxed">
                We operate under strictly approved registry certifications registered under Uttar Pradesh State Land Real Estate Regulatory Authority regulations.
              </p>
            </div>
          </div>

          {/* Form intake Right */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#C9A84C]/25 shadow-xl">
            <h3 className="font-serif font-bold text-xl text-[#6B1A2A] mb-2 border-b border-slate-100 pb-3">Send Direct Advisory Request</h3>
            <p className="text-xs text-slate-400 mb-6 font-sans">
              Complete your contact specifications. A Brij Advisor will assemble certified catalog packages matching your criteria.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 font-mono">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Acharya Sharan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-200 outline-none focus:border-[#C45C1A] text-slate-800 bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 font-mono">Contact / Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g., +91 97199 20888"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-200 outline-none focus:border-[#C45C1A] text-slate-800 bg-slate-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 font-mono">Email Address (Optional)</label>
                  <input
                    type="email"
                    placeholder="e.g., advisor@nikunj.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-200 outline-none focus:border-[#C45C1A] text-slate-800 bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 font-mono">Property Category Preference</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-200 outline-none focus:border-[#C45C1A] text-slate-800 bg-slate-50"
                  >
                    <option value="Residential Apartments">Residential Apartments</option>
                    <option value="Luxury Haveli Villas">Luxury Haveli Villas</option>
                    <option value="Plots and Land">Freehold Registry Plots</option>
                    <option value="Spiritual Retreats">Ashram / Spiritual Retreats</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 font-mono">Your Message / Request Particulars</label>
                <textarea
                  rows={4}
                  placeholder="Inquire about direct registry prices, home loan approvals, site visit car pick-ups or floor maps..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-200 outline-none resize-none focus:border-[#C45C1A] text-slate-800 bg-slate-50"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmiting}
                className="w-full py-3.5 bg-[#6B1A2A] hover:bg-[#6B1A2A]/90 text-white font-bold rounded-lg text-xs tracking-wider uppercase flex items-center justify-center space-x-1.5 shadow font-serif"
              >
                <Send className="h-4 w-4 text-[#C9A84C]" />
                <span>{isSubmiting ? "Signing submission..." : "Submit Inquiry Details"}</span>
              </button>
            </form>
          </div>

        </div>

        {/* Dynamic Static Map Location representation coordinates */}
        <div className="mt-14 bg-white rounded-2xl overflow-hidden border border-[#C9A84C]/25 shadow-md">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <span className="font-serif font-bold text-sm text-[#6B1A2E]">CO-ORDINATES PLATFORM</span>
            <span className="text-[10px] text-slate-400 font-mono">GPS: 27.5706° N, 77.6811° E (Vrindavan)</span>
          </div>
          {/* Custom vector schematic representation map */}
          <div className="bg-[#FAF6F0] h-[300px] flex items-center justify-center relative bg-[radial-gradient(#C9A84C_1px,transparent_1px)] [background-size:20px_20px]">
            <div className="absolute text-center text-slate-600 px-6 max-w-sm z-10 space-y-2">
              <MapPin className="h-10 w-10 text-[#C45C1A] mx-auto animate-bounce" />
              <h4 className="font-serif font-bold text-[#1A1A2E]">Nikunj Corporate Medallion Hub</h4>
              <p className="text-xs text-slate-400 leading-snug">
                Located right near the central expressway connecting Rukmani Vihar directly with main road Mathura-Vrindavan alignments.
              </p>
              <a
                href="https://maps.google.com/?q=Nikunj+Heritage+Infrabuild+Rukmani+Vihar+Vrindavan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-xs font-bold text-[#C45C1A] underline"
              >
                Open Google Maps Location →
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
export default ContactUs;
