export const SITE_URL = "https://www.nikunjheritageinfrabuilds.com";
export const SITE_NAME = "Nikunj Heritage Infrabuild";
export const DEFAULT_TITLE = "Nikunj Heritage Infrabuild | Vrindavan Property, Mathura Real Estate & Investment";
export const DEFAULT_DESCRIPTION =
  "Nikunj Heritage Infrabuild helps buyers explore verified residential, commercial, villa, and plotted investment opportunities in Vrindavan, Mathura, Govardhan, and nearby spiritual corridors.";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-cover.jpg`;
export const DEFAULT_LOCALE = "en_IN";

export const PRIMARY_KEYWORDS = [
  "Vrindavan property",
  "Mathura property",
  "Vrindavan real estate",
  "Mathura real estate",
  "property in Vrindavan",
  "property in Mathura",
  "plots in Vrindavan",
  "investment in Vrindavan",
  "Vrindavan villas",
  "Mathura commercial property",
  "RERA approved property in Vrindavan",
  "spiritual real estate India",
  "Prem Mandir nearby property",
  "Banke Bihari temple nearby property",
  "Govardhan property investment",
  "Rukmini Vihar property",
];

export function buildCanonical(pathname: string) {
  if (!pathname || pathname === "/") return SITE_URL;
  return `${SITE_URL}${pathname}`;
}

export function clampDescription(input: string, fallback = DEFAULT_DESCRIPTION) {
  const value = (input || fallback).trim().replace(/\s+/g, " ");
  if (value.length <= 160) return value;
  return `${value.slice(0, 157).trim()}...`;
}

export function keywordString(extra: string[] = []) {
  return [...PRIMARY_KEYWORDS, ...extra].filter(Boolean).join(", ");
}
