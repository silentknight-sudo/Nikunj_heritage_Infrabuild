/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Award, Briefcase, ChevronRight } from "lucide-react";
import { toast } from "react-hot-toast";

export const Career: React.FC = () => {
  const jobs = [
    {
      title: "Senior Brij Property Advisor",
      dept: "Pilgrim Client Relations",
      loc: "Vrindavan Head Office",
      desc: "Help pilgrim families evaluate land and apartments. Deep understanding of Vrindavan region, local temple locations and sweet water zones mandated."
    },
    {
      title: "Regulatory Land auditor",
      dept: "Compliance & Audits Desk",
      loc: "Mathura Central Hub",
      desc: "Manage title deed checks, UP RERA licenses filing and direct coordination with land registrars."
    }
  ];

  return (
    <div className="bg-[#FAF6F0] min-h-screen text-[#1A1A2E] py-12" id="careers-directory-box">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Briefcase className="h-10 w-10 text-[#C45C1A] mx-auto mb-2" />
          <h1 className="font-serif text-3xl font-bold text-[#6B1A2A]">Build with Nikunj</h1>
          <p className="text-xs text-slate-500 mt-2 font-sans">
            Advance your real estate career within one of the highest-compliance heritage property developers in Uttar Pradesh.
          </p>
        </div>

        <div className="space-y-6">
          {jobs.map((job, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-[#C9A84C]/25 shadow-sm space-y-4 flex flex-col sm:flex-row sm:items-center justify-between hover:shadow-md transition">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#C45C1A] font-mono tracking-wider">{job.dept} • {job.loc}</span>
                <h3 className="font-serif font-bold text-lg text-slate-800">{job.title}</h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-xl font-sans leading-relaxed">{job.desc}</p>
              </div>

              <button
                onClick={() => toast.success("Pranam! Please dispatch your resume directly to careers@nikunjheritage.com")}
                className="self-start sm:self-center bg-[#1A1A2E] hover:bg-[#1A1A2E]/90 text-[#C9A84C] font-bold text-xs uppercase px-5 py-2.5 rounded shadow shrink-0 font-serif"
              >
                Apply Now →
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
export default Career;
