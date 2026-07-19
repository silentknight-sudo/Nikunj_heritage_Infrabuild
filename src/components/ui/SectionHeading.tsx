import React from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  sub?: string;
  centered?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ eyebrow, title, sub, centered = false }) => {
  return (
    <div className={centered ? "text-center" : ""}>
      {eyebrow ? (
        <div className="text-[11px] font-black uppercase tracking-[0.3em]" style={{ color: "var(--brand-gold)" }}>
          {eyebrow}
        </div>
      ) : null}
      <h2 className="mt-2 font-serif text-3xl font-bold leading-[0.92] sm:text-5xl" style={{ color: "var(--brand-night)" }}>
        {title}
      </h2>
      {sub ? <p className={`mt-3 max-w-3xl text-sm leading-7 ${centered ? "mx-auto" : ""}`} style={{ color: "var(--brand-text-muted)" }}>{sub}</p> : null}
    </div>
  );
};

export default SectionHeading;
