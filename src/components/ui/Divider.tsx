import React from "react";

export const Divider: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`} aria-hidden="true">
      <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, var(--brand-gold), transparent)" }} />
      <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--brand-gold)" }} />
      <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, var(--brand-gold), transparent)" }} />
    </div>
  );
};

export default Divider;
