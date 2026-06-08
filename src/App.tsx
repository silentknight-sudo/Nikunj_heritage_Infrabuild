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
              <Route path="/pages/:slug" element={<DynamicPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>

          {/* Editorial Footer */}
          <Footer />

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
