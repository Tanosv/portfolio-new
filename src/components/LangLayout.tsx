import { useEffect } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import i18n from "@/lib/i18n";

const SUPPORTED_LANGS = ["fr", "en"] as const;
type Lang = (typeof SUPPORTED_LANGS)[number];

export default function LangLayout() {
  const { lang } = useParams<{ lang: string }>();

  const isValid = SUPPORTED_LANGS.includes(lang as Lang);

  useEffect(() => {
    if (!isValid) return;
    i18n.changeLanguage(lang);
    localStorage.setItem("i18n_lang", lang!);
  }, [lang, isValid]);

  if (!isValid) {
    return <Navigate to="/fr" replace />;
  }

  return <Outlet />;
}
