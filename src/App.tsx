/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, ScrollRestoration } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

// Context providers
import { AuthProvider } from "./lib/auth";

// Components & Page Views
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
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
        <div className="flex flex-col min-h-screen bg-[#FAF6F0] selection:bg-[#C45C1A] selection:text-white font-sans text-[#1A1A2E]">
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
              <Route path="/pages/:slug" element={<DynamicPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>

          {/* Editorial Footer */}
          <Footer />

          {/* Global Sticky Helpline WhatsApp CTA */}
          <div className="fixed bottom-6 right-6 z-40 block" id="global-whatsapp-cta">
            <a
              href="https://wa.me/919719920888?text=Pranam%21+I+would+like+to+inquire+about+residential+plots+and+villas+at+Nikunj+Heritage+Infrabuild."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-14 w-14 rounded-full bg-[#0E7B6C] hover:bg-[#0E7B6C]/95 text-white shadow-2xl transition-transform hover:scale-110 active:scale-95 border border-[#C9A84C]/50"
              title="Direct WhatsApp Helpline"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-white">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003  5.37 5.378 0 12.01 0c3.21.002 6.23 1.251 8.5 3.518s3.511 5.291 3.51 8.5c-.003 6.642-5.378 12.01-12.01 12.01-2.002-.001-3.974-.5-5.789-1.455L0 24zm6.27-5.908c1.716 1.018 3.411 1.554 5.733 1.555 5.539 0 10.05-4.512 10.052-10.051-.001-2.684-1.047-5.205-2.946-7.104s-4.421-2.947-7.107-2.947c-5.541 0-10.053 4.512-10.055 10.052-.001 2.222.569 4.398 1.656 6.271L2.613 21.36l5.714-1.268z M15.753 13.916c-.23-.115-1.364-.672-1.576-.75s-.364-.115-.515.115c-.152.23-.584.75-.716.901-.132.15-.264.17-.494.053-.23-.115-.972-.358-1.851-1.144-.684-.61-1.146-1.363-1.28-1.595-.132-.23-.014-.354.1-.471.103-.105.23-.264.346-.396.115-.132.15-.23.23-.383.078-.15.038-.283-.02-.383-.058-.115-.515-1.242-.705-1.701-.186-.447-.373-.383-.51-.39-.133-.008-.285-.008-.438-.008s-.402.057-.611.282c-.21.225-.8.78-.8 1.901s.815 2.202.93 2.353c.115.15 1.6 2.443 3.878 3.424.542.233.965.373 1.294.478.544.173 1.039.148 1.43.09.436-.064 1.364-.557 1.556-1.096.191-.538.191-1.002.134-1.096-.06-.115-.213-.17-.442-.284z"/>
              </svg>
            </a>
          </div>

          {/* Toast notifications */}
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#1A1A2E",
                color: "#FAF6F0",
                fontSize: "12px",
                fontFamily: "var(--font-sans)",
                borderRadius: "8px",
                border: "1px solid #C9A84C",
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}
