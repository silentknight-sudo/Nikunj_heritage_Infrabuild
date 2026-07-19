/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "teal";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyle = "inline-flex items-center justify-center font-semibold rounded-full tracking-wide transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] hover:-translate-y-0.5";
  
  const variants = {
    primary: "bg-[color:var(--brand-saffron)] text-white hover:opacity-95 border border-[color:var(--brand-saffron)] shadow-[0_14px_30px_rgba(232,121,46,0.25)]",
    secondary: "bg-[color:var(--brand-night)] text-white hover:bg-[color:var(--brand-night-soft)] border border-[color:var(--brand-night)] shadow-[0_14px_30px_rgba(11,16,48,0.18)]",
    outline: "border border-[color:var(--brand-gold)] text-[color:var(--brand-night)] bg-transparent hover:bg-[color:var(--brand-gold)]/10",
    danger: "bg-red-600 text-white hover:bg-red-700 shadow-sm",
    teal: "bg-[color:var(--brand-verified)] text-white hover:opacity-95 shadow-md"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-base"
  };

  return (
    <button
      disabled={disabled || loading}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  );
};
export default Button;
