/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Star, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import brijHavenImage from "../../assets/images/brij_haven_glorious_temple_1781557829970.jpg";
import heritageHaveliImage from "../../assets/images/heritage_haveli_courtyard_1781557848504.jpg";
import nidhivanImage from "../../assets/images/nidhivan_peaceful_forest_grove_1781557896104.jpg";
import spiritualAshramImage from "../../assets/images/spiritual_ashram_serviced_suite_1781557880359.jpg";
import vrindavanVillaImage from "../../assets/images/vrindavan_premium_villa_layout_1781557864653.jpg";

export interface SlideData {
  image: string;
  tag: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  badge: string;
}

const SLIDES: SlideData[] = [
  {
    image: vrindavanVillaImage,
    tag: "NIKUNJ HERITAGE",
    title: "Trusted guidance for residential, commercial, and plotted opportunities in Vrindavan",
    subtitle: "Nikunj Heritage Infrabuild helps buyers explore high-potential locations, devotional neighborhoods, and growth-led property opportunities with clarity and confidence.",
    ctaText: "Explore Vrindavan Projects",
    ctaLink: "/properties",
    badge: "Local market understanding"
  },
  {
    image: brijHavenImage,
    tag: "PREMIUM RESIDENCES",
    title: "Homes and heritage-inspired living spaces near Vrindavan's most sought-after spiritual zones",
    subtitle: "From family apartments to premium villas, we present properties that balance location quality, comfort, connectivity, and long-term value.",
    ctaText: "View Residential Projects",
    ctaLink: "/properties?category=residential-apartments",
    badge: "End-user and investor ready"
  },
  {
    image: heritageHaveliImage,
    tag: "RUKMINI VIHAR",
    title: "Live close to Vrindavan's spiritual core in a well-connected residential neighborhood",
    subtitle: "Rukmini Vihar offers a balance of devotional surroundings, daily convenience, and long-term appreciation potential for families, end users, and second-home buyers.",
    ctaText: "Browse Vrindavan Homes",
    ctaLink: "/properties?location=vrindavan-rukmani-vihar",
    badge: "High-demand residential pocket"
  },
  {
    image: spiritualAshramImage,
    tag: "PLANNED COMMUNITIES",
    title: "Project selection backed by location study, planning logic, and practical buyer needs",
    subtitle: "We focus on projects that make sense on the ground, with attention to access, surrounding development, livability, and future appreciation potential.",
    ctaText: "See All Listings",
    ctaLink: "/properties",
    badge: "Clarity before commitment"
  },
  {
    image: nidhivanImage,
    tag: "GROWTH & CONNECTIVITY",
    title: "Invest where infrastructure, access, and pilgrimage-driven demand strengthen property value",
    subtitle: "Better road links, improving regional access, and sustained visitor movement continue to support Vrindavan's real estate potential across multiple segments.",
    ctaText: "Talk To An Advisor",
    ctaLink: "/contact",
    badge: "Research-led recommendations"
  }
];

export const HeroSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isHovered, setIsHovered] = useState(false);

  // Auto cyclic slide transitions
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6500);
    return () => clearInterval(interval);
  }, [currentIndex, isHovered]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleSelect = (idx: number) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  // Slide sliding animation variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 1.05
    }),
    center: {
      x: "0%",
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.6 },
        scale: { duration: 0.8, ease: "easeOut" }
      }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 }
      }
    })
  };

  return (
    <div 
      className="relative w-full h-[85vh] sm:h-[90vh] bg-[#11111A] overflow-hidden group select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      id="hero-3d-immersion-viewport"
    >
      {/* Background Cinematic Images */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            {/* Cinematic Ken Burns Effect implemented via continuous slow scaling */}
            <motion.img
              src={SLIDES[currentIndex].image}
              alt={SLIDES[currentIndex].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-45"
              initial={{ scale: 1.02 }}
              animate={{ scale: 1.09 }}
              transition={{ duration: 7, ease: "linear" }}
            />
            {/* Saffron & Charcoal Soft Vignette mask */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/45 to-[#0F6E56]/10"></div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Interactive Contents */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pointer-events-none">
        <div className="max-w-3xl pointer-events-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-4"
            >
              {/* Dynamic Badges with 3D glowing aura */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="bg-[#0F172A] text-white text-[10px] sm:text-xs font-bold font-mono tracking-widest px-3 py-1 rounded-full border border-[#FACC15]/30 shadow-lg shadow-[#0F172A]/20 flex items-center gap-1.5 uppercase">
                  <Star className="h-3 w-3 text-[#FACC15] animate-spin" />
                  {SLIDES[currentIndex].tag}
                </span>

                <span className="bg-[#FACC15] backdrop-blur-md text-[#0F172A] text-[90%] sm:text-xs font-medium tracking-wide px-3 py-1 rounded-full border border-[#FDE68A] flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#0F172A]" />
                  {SLIDES[currentIndex].badge}
                </span>
              </div>

              {/* Title Transition with premium serif font and text-shadowing */}
              <h1
                className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-wide leading-tight drop-shadow-md"
                style={{ color: "#FFFFFF" }}
              >
                {SLIDES[currentIndex].title}
              </h1>

              {/* Subtitle transition with relaxed spacing */}
              <p className="text-xs sm:text-sm md:text-base text-[#FAF6F0]/85 font-sans leading-relaxed max-w-2xl font-light tracking-wide py-1 border-l-2 border-[#FB923C] pl-4">
                {SLIDES[currentIndex].subtitle}
              </p>

              {/* Action and Helpline links */}
              <div className="flex flex-wrap items-center gap-3.5 pt-4">
                <Link
                  to={SLIDES[currentIndex].ctaLink}
                  className="group inline-flex items-center space-x-2 px-6 py-3.5 bg-gradient-to-r from-[#FB923C] to-[#EA580C] text-white hover:to-[#FB923C] text-xs sm:text-sm font-bold font-serif uppercase tracking-widest rounded-lg shadow-xl shadow-black/30 transition-all duration-300 hover:-translate-y-0.5 border border-[#FDBA74]/40"
                >
                  <span>{SLIDES[currentIndex].ctaText}</span>
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform" />
                </Link>

                <a
                  href="https://wa.me/919719920888?text=Pranam!%20I%20saw%20your%20featured%20slideshow.%20Please%20send%20brochures."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 bg-white/10 hover:bg-white/15 backdrop-blur-md border border-[#FAF6F0]/25 text-white text-xs sm:text-sm font-bold font-mono rounded-lg transition-all flex items-center gap-1.5"
                >
                  <MapPin className="h-4 w-4 text-[#0F6E56]" />
                  Verify Proximity
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Left/Right Arrow Navigation Controls with 3D magnetic feel */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-[#FAF6F0]/20 bg-[#11111A]/60 text-white backdrop-blur-md items-center justify-center hidden group-hover:flex hover:bg-[#FB923C] hover:border-transparent transition-all shadow-xl"
        style={{ contentVisibility: "auto" }}
        aria-label="Previous Banner Slide"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-[#FAF6F0]/20 bg-[#11111A]/60 text-white backdrop-blur-md items-center justify-center hidden group-hover:flex hover:bg-[#FB923C] hover:border-transparent transition-all shadow-xl"
        style={{ contentVisibility: "auto" }}
        aria-label="Next Banner Slide"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      {/* Premium Multi-track Interactive Progress Pagination */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-5xl flex items-center justify-between gap-2.5 bg-black/45 backdrop-blur-lg p-2 rounded-xl border border-white/10">
        {SLIDES.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className="flex-1 text-left relative focus:outline-none py-1 group"
            >
              <div className="flex flex-col">
                {/* Micro heading representing the slide category */}
                <span className={`text-[8px] uppercase tracking-widest font-bold hidden md:block transition-all ${
                  isActive ? "text-[#C9A84C]" : "text-white/40 group-hover:text-white/70"
                }`}>
                  0{idx + 1} • {slide.tag.split(" ")[0]}
                </span>
                
                {/* Horizontal high-fidelity loading bar */}
                <div className="h-1.5 w-full bg-white/15 rounded-full overflow-hidden mt-1 relative">
                  {isActive && (
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-[#FB923C] rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 6, ease: "linear" }}
                      style={{ originX: 0 }}
                    />
                  )}
                  {!isActive && (
                    <div className={`absolute inset-full rounded-full transition-all duration-300 ${
                      idx < currentIndex ? "bg-[#FB923C] inset-y-0 inset-x-0" : "bg-transparent"
                    }`} />
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
