/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, ScrollRestoration } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { MessageSquare, PhoneCall } from "lucide-react";

// Context providers
import { AuthProvider } from "./lib/auth";

// Components & Page Views
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { AppSeo } from "./components/seo/AppSeo";
import { Home } from "./pages/Home";
import { Properties } from "./pages/Properties";
import { PropertyDetail } from "./pages/PropertyDetail";
import { Blogs } from "./pages/Blogs";
import { BlogDetail } from "./pages/BlogDetail";
import { AboutUs } from "./pages/AboutUs";
import { ContactUs } from "./pages/ContactUs";
import { Events } from "./pages/Events";
import { Career } from "./pages/Career";
import { Testimonials } from "./pages/Testimonials";
import { DynamicPage } from "./pages/DynamicPage";
import { AdminDashboard } from "./pages/AdminDashboard";
import { RoiCalculator } from "./pages/RoiCalculator";
import { CompareProperties } from "./pages/CompareProperties";
import { News } from "./pages/News";
import { Developers } from "./pages/Developers";
import { LifeAtNHI } from "./pages/LifeAtNHI";
import { SeoLandingPage } from "./pages/SeoLandingPage";

// Automatic Boot seed initializer
import { runDatabaseSeed } from "./lib/seed";

export default function App() {
  useEffect(() => {
    async function triggerDbSeedCheck() {
      try {
        const seeded = await runDatabaseSeed();
        if (seeded) {
          console.log("Nikunj Heritage Brij Ledger boot-seeded successfully!");
        }
      } catch (err) {
        console.error("Boot seed verify failed safely:", err);
      }
    }
    triggerDbSeedCheck();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-[#F8FAFC] font-sans text-[#0F172A]">
          <AppSeo />
          {/* Main sticky header */}
          <Navbar />

          {/* Core scroll space */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/properties/:slug" element={<PropertyDetail />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/:slug" element={<BlogDetail />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/events" element={<Events />} />
              <Route path="/career" element={<Career />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/roi-calculator" element={<RoiCalculator />} />
              <Route path="/compare-properties" element={<CompareProperties />} />
              <Route path="/news" element={<News />} />
              <Route path="/developers" element={<Developers />} />
              <Route path="/life-at-nhi" element={<LifeAtNHI />} />
              <Route path="/mathura-real-estate" element={<SeoLandingPage page="/mathura-real-estate" />} />
              <Route path="/vrindavan-real-estate" element={<SeoLandingPage page="/vrindavan-real-estate" />} />
              <Route path="/properties-in-vrindavan-mathura" element={<SeoLandingPage page="/properties-in-vrindavan-mathura" />} />
              <Route path="/pages/:slug" element={<DynamicPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>

          {/* Editorial Footer */}
          <Footer />

          <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:right-6 z-40" id="global-contact-cta">
            <div className="ml-auto flex max-w-md items-center gap-2 rounded-full border border-[#E2E8F0] bg-white/95 p-2 shadow-2xl backdrop-blur-md">
              <a
                href="tel:+919719920888"
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#FB923C] px-4 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#EA580C]"
              >
                <PhoneCall className="h-4 w-4" />
                <span>Call Now</span>
              </a>
              <a
                href="https://wa.me/919719920888?text=Pranam%21+I+would+like+to+inquire+about+residential+plots+and+villas+at+Nikunj+Heritage+Infrabuild."
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#FB923C] px-4 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#EA580C]"
              >
                <MessageSquare className="h-4 w-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Toast notifications */}
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#0F172A",
                color: "#FAF6F0",
                fontSize: "12px",
                fontFamily: "var(--font-sans)",
                borderRadius: "8px",
                border: "1px solid #E2E8F0",
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}
