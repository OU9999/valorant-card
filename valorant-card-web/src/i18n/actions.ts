"use server";

import { cookies } from "next/headers";
import type { Locale } from "./request";

const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

const setLocale = async (locale: Locale) => {
  const store = await cookies();
  store.set("locale", locale, {
    path: "/",
    maxAge: LOCALE_COOKIE_MAX_AGE,
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
};

export { setLocale };
