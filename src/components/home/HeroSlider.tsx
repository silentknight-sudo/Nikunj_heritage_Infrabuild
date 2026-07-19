/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, PhoneCall, ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";

type Slide = {
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  ctaPrimary: string;
  ctaPrimaryHref: string;
  ctaSecondary: string;
  ctaSecondaryHref: string;
  note: string;
};

const slides: Slide[] = [
  {
    eyebrow: "Vrindavan Parikrama Marg",
    title: "Temple-close property guidance for buyers who want clarity before commitment",
    subtitle: "Shortlist verified homes, plots, and retreat-led opportunities with temple proximity, registry clarity, and guided site visits.",
    image: "/projects/images/mathura-vrindavan-hero-enquiry.jpg",
    ctaPrimary: "Book a Free Site Visit",
    ctaPrimaryHref: "/contact-us",
    ctaSecondary: "Explore Projects",
    ctaSecondaryHref: "/properties",
    note: "Trusted by buyers looking for devotional location value and long-term appreciation."
  },
  {
    eyebrow: "Mathura Heritage Streets",
    title: "Premium advisory for residential and commercial opportunities in the sacred growth belt",
    subtitle: "We help buyers compare liveability, access, and investment context around Mathura’s most active property corridors.",
    image: "/projects/images/mathura-vrindavan-site-visit.jpg",
    ctaPrimary: "Talk to an Advisor",
    ctaPrimaryHref: "/contact-us",
    ctaSecondary: "View Listings",
    ctaSecondaryHref: "/properties",
    note: "Built for serious buyers, NRIs, and families evaluating Mathura real estate."
  },
  {
    eyebrow: "Yamuna Riverside",
    title: "A destination-led real estate experience rooted in trust, access, and buyer support",
    subtitle: "Use the site to move from interest to shortlist to enquiry with guided navigation, RERA focus, and practical property filters.",
    image: "/projects/images/mathura-vrindavan-aerial-livability.jpg",
    ctaPrimary: "Enquire Now",
    ctaPrimaryHref: "/contact-us",
    ctaSecondary: "See Investment Zones",
    ctaSecondaryHref: "/properties?category=plots-and-land",
    note: "For buyers comparing residential, plotted, and spiritual retreat inventory."
  }
];

export const HeroSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (paused || prefersReducedMotion) return;
    const timer = window.setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6200);
    return () => window.clearInterval(timer);
  }, [paused, prefersReducedMotion]);

  const goTo = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const slide = slides[currentIndex];

  return (
    <section
      className="relative isolate h-[calc(100svh-4rem)] min-h-[620px] overflow-hidden bg-[color:var(--brand-night)] text-white sm:h-[calc(100vh-5rem)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      aria-label="Homepage hero slider"
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={slide.image}
          custom={direction}
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: direction > 0 ? 48 : -48 }}
          animate={{ opacity: 1, x: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: direction > 0 ? -48 : 48 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <motion.img
            src={slide.image}
            alt={slide.title}
            className="h-full w-full object-cover"
            initial={false}
            animate={prefersReducedMotion ? { scale: 1 } : { scale: 1.08 }}
            transition={{ duration: 8, ease: "linear" }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,16,48,0.45)_0%,rgba(11,16,48,0.64)_56%,rgba(11,16,48,0.92)_100%)]" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-between px-4 pb-24 pt-24 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="flex flex-wrap items-center gap-2"
          >
            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-1 text-[11px] font-black uppercase tracking-[0.28em] text-[color:var(--brand-gold)] backdrop-blur">
              {slide.eyebrow}
            </span>
            <span className="rounded-full bg-[color:var(--brand-gold)] px-4 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-[color:var(--brand-night)]">
              Temple proximity. Registry clarity.
            </span>
          </motion.div>

          <motion.h1
            initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="mt-5 max-w-3xl font-serif text-[clamp(2.75rem,6vw,5.5rem)] font-bold leading-[0.9] tracking-tight text-white"
          >
            {slide.title}
          </motion.h1>

          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-5 max-w-2xl text-base leading-8 text-[color:var(--brand-sandstone)]/88 sm:text-lg"
          >
            {slide.subtitle}
          </motion.p>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Link to={slide.ctaPrimaryHref}>
              <Button variant="primary" size="lg" className="min-w-[220px]">
                {slide.ctaPrimary}
              </Button>
            </Link>
            <Link to={slide.ctaSecondaryHref}>
              <Button variant="secondary" size="lg" className="min-w-[220px]">
                {slide.ctaSecondary}
              </Button>
            </Link>
          </motion.div>

          <div className="mt-6 flex items-center gap-2 text-sm text-white/75">
            <MapPin className="h-4 w-4 text-[color:var(--brand-gold)]" />
            <span>{slide.note}</span>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {slides.map((item, index) => {
              const active = index === currentIndex;
              return (
                <button
                  key={item.eyebrow}
                  onClick={() => goTo(index)}
                  className="group flex min-w-[170px] flex-1 items-center gap-3 rounded-full border px-3 py-2 text-left transition-all"
                  style={{
                    borderColor: active ? "rgba(232,179,61,0.65)" : "rgba(255,255,255,0.14)",
                    backgroundColor: active ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)"
                  }}
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-black"
                    style={{
                      backgroundColor: active ? "var(--brand-gold)" : "rgba(255,255,255,0.1)",
                      color: active ? "var(--brand-night)" : "white"
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <div className="truncate text-[11px] font-black uppercase tracking-[0.24em] text-[color:var(--brand-gold)]">
                      {item.eyebrow}
                    </div>
                    <div className="truncate text-sm font-semibold text-white/90">{item.ctaSecondary}</div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="rounded-[28px] border border-white/12 bg-white/8 p-4 backdrop-blur-xl lg:w-[22rem]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-[11px] font-black uppercase tracking-[0.28em] text-[color:var(--brand-gold)]">Talk To An Advisor</div>
                <div className="mt-1 font-serif text-2xl font-bold text-white">Need a shortlist today?</div>
              </div>
              <div className="rounded-full bg-white/10 p-3 text-[color:var(--brand-gold)]">
                <PhoneCall className="h-5 w-5" />
              </div>
            </div>
            <a
              href="tel:+919719920888"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--brand-saffron)] px-4 py-3 text-sm font-black uppercase tracking-[0.24em] text-white transition-all hover:opacity-95"
            >
              Call Now
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
        <motion.div
          className="h-full bg-[color:var(--brand-gold)]"
          key={currentIndex}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 6.2, ease: "linear" }}
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[color:var(--brand-night)] to-transparent" />
    </section>
  );
};

export default HeroSlider;
