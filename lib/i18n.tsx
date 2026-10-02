"use client";
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import content from "@/lib/content.json";

interface LocaleContextType {
  locale: string;
  setLocale: (l: string) => void;
  t: (path: string) => unknown;
}

const LocaleContext = createContext<LocaleContextType>({
  locale: content.defaultLocale,
  setLocale: () => {},
  t: () => "",
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState(content.defaultLocale);

  useEffect(() => {
    const saved = localStorage.getItem("locale");
    if (saved && (saved === "no" || saved === "en")) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = useCallback((l: string) => {
    setLocaleState(l);
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", l);
    }
  }, []);

  const t = useCallback((path: string): unknown => {
    const keys = path.split(".");
    const locales = content.locales as Record<string, Record<string, unknown>>;
    let val: unknown = locales[locale];
    for (const k of keys) {
      if (val && typeof val === "object" && k in (val as Record<string, unknown>)) {
        val = (val as Record<string, unknown>)[k];
      } else {
        val = undefined;
        break;
      }
    }
    if (val !== undefined) return val;
    val = locales[content.defaultLocale];
    for (const k of keys) {
      if (val && typeof val === "object" && k in (val as Record<string, unknown>)) {
        val = (val as Record<string, unknown>)[k];
      } else {
        val = undefined;
        break;
      }
    }
    return val ?? path;
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
