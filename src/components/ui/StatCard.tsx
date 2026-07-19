import React from "react";

interface StatCardProps {
  label: string;
  value: string;
  detail?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, detail }) => {
  return (
    <div className="rounded-[24px] border bg-white/90 p-5 shadow-sm backdrop-blur" style={{ borderColor: "var(--brand-border)" }}>
      <div className="text-[11px] font-black uppercase tracking-[0.26em]" style={{ color: "var(--brand-gold)" }}>{label}</div>
      <div className="mt-3 font-serif text-3xl font-bold leading-none" style={{ color: "var(--brand-night)" }}>{value}</div>
      {detail ? <p className="mt-2 text-sm leading-6" style={{ color: "var(--brand-text-muted)" }}>{detail}</p> : null}
    </div>
  );
};

export default StatCard;
