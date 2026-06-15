/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface ThreeDCardProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

/**
 * ThreeDCard applies an interactive, fluid 3D tilt perspective.
 * When the coordinate hovering occurs, the card tilts toward the cursor.
 */
export const ThreeDCard: React.FC<ThreeDCardProps> = ({ children, className = "", id }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse hover coordinate listeners
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring settings for ultra-smooth responsiveness
  const springSettings = { damping: 25, stiffness: 180, mass: 1.2 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), springSettings);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), springSettings);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Compute normalized coordinates from center (-0.5 to 0.5)
    const mouseX = (event.clientX - rect.left) / width - 0.5;
    const mouseY = (event.clientY - rect.top) / height - 0.5;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`perspective-1000 ${className}`}
      id={id}
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          scale: isHovered ? 1.025 : 1,
          boxShadow: isHovered 
            ? "0 25px 50px -12px rgba(107, 26, 42, 0.12), 0 0 40px rgba(199, 168, 76, 0.15)"
            : "0 10px 30px -15px rgba(0, 0, 0, 0.08)"
        }}
        transition={{ duration: 0.35 }}
        className="w-full h-full rounded-2xl will-change-transform duration-75"
      >
        <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }} className="w-full h-full">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

interface ScrollFadeProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  className?: string;
  id?: string;
}

/**
 * ScrollFade provides delicate scroll-triggered entrance transitions with custom delays.
 */
export const ScrollFade: React.FC<ScrollFadeProps> = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  className = "",
  id
}) => {
  const directions = {
    up: { y: 35 },
    down: { y: -35 },
    left: { x: 35 },
    right: { x: -35 }
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...directions[direction] 
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0 
      }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ 
        duration, 
        delay, 
        ease: [0.21, 0.85, 0.45, 1.01] 
      }}
      className={className}
      id={id}
    >
      {children}
    </motion.div>
  );
};

/**
 * ParticleGlow creates a delicate flowing light source that floats in the background of cards.
 * It simulates a real dynamic spiritual aura representation.
 */
export const ParticleGlow: React.FC<{ color?: string }> = ({ color = "#C9A84C" }) => {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const handle = setInterval(() => {
      setPulse((p) => (p + 1) % 360);
    }, 50);
    return () => clearInterval(handle);
  }, []);

  const offset = Math.sin((pulse * Math.PI) / 180) * 8;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-2xl opacity-10">
      {/* Aurora source lamps */}
      <div 
        className="absolute -top-12 -left-12 w-48 h-48 rounded-full blur-3xl transition-transform duration-1000"
        style={{
          backgroundColor: color,
          transform: `translate(${offset}px, ${-offset}px) scale(1.15)`
        }}
      />
      <div 
        className="absolute -bottom-16 -right-16 w-52 h-52 rounded-full blur-3xl transition-transform duration-1000"
        style={{
          backgroundColor: "#C45C1A",
          transform: `translate(${-offset * 0.8}px, ${offset * 0.8}px) scale(0.9)`
        }}
      />
    </div>
  );
};
