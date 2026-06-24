import React, { useEffect } from "react";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_LOCALE,
  DEFAULT_OG_IMAGE,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
  buildCanonical,
  clampDescription,
  keywordString,
} from "../../lib/seo";

type SchemaValue = Record<string, unknown> | Record<string, unknown>[];

interface SeoHeadProps {
  title?: string;
  description?: string;
  pathname?: string;
  image?: string;
  keywords?: string[];
  type?: "website" | "article";
  noindex?: boolean;
  schema?: SchemaValue;
}

const MANAGED_META_NAMES = ["description", "keywords", "robots"];
const MANAGED_META_PROPS = ["og:title", "og:description", "og:type", "og:url", "og:image", "og:site_name", "og:locale", "twitter:card", "twitter:title", "twitter:description", "twitter:image"];

function ensureMetaByName(name: string) {
  let el = document.head.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  return el;
}

function ensureMetaByProperty(property: string) {
  let el = document.head.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  return el;
}

function ensureCanonical() {
  let el = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  return el;
}

export const SeoHead: React.FC<SeoHeadProps> = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  pathname = "/",
  image = DEFAULT_OG_IMAGE,
  keywords = [],
  type = "website",
  noindex = false,
  schema,
}) => {
  useEffect(() => {
    const canonical = buildCanonical(pathname);
    const resolvedDescription = clampDescription(description);
    const resolvedImage = image.startsWith("http") ? image : `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`;

    document.title = title;

    ensureMetaByName("description").setAttribute("content", resolvedDescription);
    ensureMetaByName("keywords").setAttribute("content", keywordString(keywords));
    ensureMetaByName("robots").setAttribute("content", noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large");

    ensureMetaByProperty("og:title").setAttribute("content", title);
    ensureMetaByProperty("og:description").setAttribute("content", resolvedDescription);
    ensureMetaByProperty("og:type").setAttribute("content", type);
    ensureMetaByProperty("og:url").setAttribute("content", canonical);
    ensureMetaByProperty("og:image").setAttribute("content", resolvedImage);
    ensureMetaByProperty("og:site_name").setAttribute("content", SITE_NAME);
    ensureMetaByProperty("og:locale").setAttribute("content", DEFAULT_LOCALE);

    ensureMetaByName("twitter:card").setAttribute("content", "summary_large_image");
    ensureMetaByName("twitter:title").setAttribute("content", title);
    ensureMetaByName("twitter:description").setAttribute("content", resolvedDescription);
    ensureMetaByName("twitter:image").setAttribute("content", resolvedImage);

    ensureCanonical().setAttribute("href", canonical);

    const existingSchema = document.head.querySelector('script[data-seo-schema="true"]');
    if (existingSchema) existingSchema.remove();

    if (schema) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.seoSchema = "true";
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    return () => {
      MANAGED_META_NAMES.forEach((name) => {
        const el = document.head.querySelector(`meta[name="${name}"]`);
        if (el) el.remove();
      });
      MANAGED_META_PROPS.forEach((property) => {
        const selector = property.startsWith("twitter:") ? `meta[name="${property}"]` : `meta[property="${property}"]`;
        const el = document.head.querySelector(selector);
        if (el) el.remove();
      });
      const link = document.head.querySelector('link[rel="canonical"]');
      if (link) link.remove();
      const cleanupSchema = document.head.querySelector('script[data-seo-schema="true"]');
      if (cleanupSchema) cleanupSchema.remove();
    };
  }, [title, description, pathname, image, keywords, type, noindex, schema]);

  return null;
};

