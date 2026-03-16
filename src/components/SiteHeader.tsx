import { useEffect, useId, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import FlagFr from "country-flag-icons/react/3x2/FR";
import FlagGb from "country-flag-icons/react/3x2/GB";

type SectionId = "home" | "skills" | "projects" | "contact";

type Props = {
  readonly onHomeScroll: (id: SectionId) => void;
  readonly activeSection: SectionId;
};

export default function SiteHeader({ onHomeScroll, activeSection }: Props) {
  const { t } = useTranslation();
  const navId = useId();
  const mobileMenuId = `${navId}-mobile-menu`;
  const [navOpen, setNavOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { lang = "fr" } = useParams<{ lang?: string }>();

  const onHome = location.pathname === `/${lang}` || location.pathname === `/${lang}/`;

  useEffect(() => {
    setNavOpen(false);
  }, [location.pathname]);

  const go = (id: SectionId) => {
    setNavOpen(false);
    if (onHome) {
      onHomeScroll(id);
      return;
    }
    navigate(`/${lang}?section=${id}`);
  };

  const switchLang = (newLang: string) => {
    const newPath = location.pathname.replace(`/${lang}`, `/${newLang}`);
    navigate(newPath + location.search);
  };

  const items: Array<{ id: SectionId; label: string }> = [
    { id: "home", label: t("nav.home") },
    { id: "skills", label: t("nav.skills") },
    { id: "projects", label: t("nav.projects") },
    { id: "contact", label: t("nav.contact") },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav aria-label="Primary navigation">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <button
              type="button"
              onClick={() => go("home")}
              className="text-xl font-bold bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent"
              aria-label={t("nav.back_to_top")}
            >
              Tanguy Osvald
            </button>

            <div className="hidden md:flex items-center gap-6">
              <ul className="flex items-center gap-8">
                {items.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => go(item.id)}
                      className={`text-sm font-medium transition-colors relative group ${
                        activeSection === item.id ? "text-accent" : "text-muted-foreground hover:text-foreground"
                      }`}
                      aria-current={activeSection === item.id ? "page" : undefined}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={`absolute -bottom-1 left-0 w-full h-0.5 bg-accent transition-transform ${
                          activeSection === item.id
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                        }`}
                      />
                    </button>
                  </li>
                ))}
              </ul>

              <fieldset className="flex items-center rounded-full border border-accent/30 bg-background/40 backdrop-blur p-0.5 m-0">
                <legend className="sr-only">Language switcher</legend>
                <button
                  type="button"
                  onClick={() => switchLang("fr")}
                  className={`flex items-center px-2 py-1 rounded-full transition-colors ${
                    lang === "fr" ? "bg-accent/20 ring-1 ring-accent/50" : "opacity-50 hover:opacity-80"
                  }`}
                  aria-label={t("lang.switch_to_fr")}
                  aria-pressed={lang === "fr"}
                >
                  <FlagFr className="w-6 h-4 rounded-sm" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => switchLang("en")}
                  className={`flex items-center px-2 py-1 rounded-full transition-colors ${
                    lang === "en" ? "bg-accent/20 ring-1 ring-accent/50" : "opacity-50 hover:opacity-80"
                  }`}
                  aria-label={t("lang.switch_to_en")}
                  aria-pressed={lang === "en"}
                >
                  <FlagGb className="w-6 h-4 rounded-sm" aria-hidden="true" />
                </button>
              </fieldset>
            </div>

            <button
              type="button"
              onClick={() => setNavOpen((v) => !v)}
              className="md:hidden p-2 text-foreground"
              aria-label={navOpen ? t("nav.close_menu") : t("nav.open_menu")}
              aria-expanded={navOpen}
              aria-controls={mobileMenuId}
            >
              {navOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>
        </div>

        <div
          id={mobileMenuId}
          className={navOpen ? "md:hidden border-t border-border bg-background/95 backdrop-blur-md" : "hidden"}
        >
          <div className="container mx-auto px-4 py-4 space-y-2">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => go(item.id)}
                className={`block w-full text-left px-4 py-2 rounded-md transition-colors ${
                  activeSection === item.id ? "bg-accent/10 text-accent font-medium" : "text-muted-foreground hover:bg-muted"
                }`}
                aria-current={activeSection === item.id ? "page" : undefined}
              >
                {item.label}
              </button>
            ))}

            <div className="pt-2 border-t border-border flex gap-2">
              <button
                type="button"
                onClick={() => { switchLang("fr"); setNavOpen(false); }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm transition-colors flex-1 justify-center ${
                  lang === "fr" ? "bg-accent/10 text-accent font-medium" : "text-muted-foreground hover:bg-muted"
                }`}
                aria-pressed={lang === "fr"}
              >
                <FlagFr className="w-6 h-4 rounded-sm" aria-hidden="true" /> FR
              </button>
              <button
                type="button"
                onClick={() => { switchLang("en"); setNavOpen(false); }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm transition-colors flex-1 justify-center ${
                  lang === "en" ? "bg-accent/10 text-accent font-medium" : "text-muted-foreground hover:bg-muted"
                }`}
                aria-pressed={lang === "en"}
              >
                <FlagGb className="w-6 h-4 rounded-sm" aria-hidden="true" /> EN
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
