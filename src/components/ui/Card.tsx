import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
}

export const Card: React.FC<CardProps> = ({ className = "", elevated = false, children, ...props }) => {
  return (
    <div
      className={`rounded-[28px] border bg-[color:var(--brand-surface)] ${elevated ? "shadow-[0_20px_60px_rgba(11,16,48,0.12)]" : "shadow-sm"} ${className}`}
      style={{ borderColor: "var(--brand-border)" }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
