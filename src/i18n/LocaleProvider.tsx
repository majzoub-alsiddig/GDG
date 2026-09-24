// src/i18n/LocaleProvider.tsx
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import {
  dirFor,
  isValidLocale,
  LOCALE_COOKIE,
  type Locale,
} from "./config";
import en from "./locales/en";
import ar from "./locales/ar";

const MESSAGES: Record<Locale, unknown> = { en, ar };

type Vars = Record<string, string | number>;

type LocaleContextValue = {
  locale: Locale;
  dir: "ltr" | "rtl";
  setLocale: (next: Locale) => void;
  t: (key: string, vars?: Vars) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function lookup(messages: unknown, key: string): string | undefined {
  return key
    .split(".")
    .reduce<unknown>(
      (acc, k) =>
        acc && typeof acc === "object"
          ? (acc as Record<string, unknown>)[k]
          : undefined,
      messages
    ) as string | undefined;
}

function interpolate(str: string, vars?: Vars): string {
  if (!vars) return str;
  return str.replace(/\{(\w+)\}/g, (_, name: string) =>
    vars[name] !== undefined ? String(vars[name]) : `{${name}}`
  );
}

export function LocaleProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const setLocale = useCallback(
    (next: Locale) => {
      if (!isValidLocale(next)) return;

      document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=${
        60 * 60 * 24 * 365
      }; samesite=lax`;

      document.documentElement.lang = next;
      document.documentElement.dir = dirFor(next);

      setLocaleState(next);
      router.refresh();
    },
    [router]
  );

  const t = useCallback(
    (key: string, vars?: Vars) => {
      const value = lookup(MESSAGES[locale], key);
      if (typeof value === "string") return interpolate(value, vars);

      // Fallback to English so a missing translation never breaks the UI.
      const fallback = lookup(MESSAGES.en, key);
      if (typeof fallback === "string") return interpolate(fallback, vars);

      if (process.env.NODE_ENV !== "production") {
        console.warn(`[i18n] Missing key "${key}" for locale "${locale}"`);
      }
      return key;
    },
    [locale]
  );

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      dir: dirFor(locale),
      setLocale,
      t,
    }),
    [locale, setLocale, t]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useTranslations() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useTranslations must be used within a LocaleProvider");
  }
  return ctx;
}
