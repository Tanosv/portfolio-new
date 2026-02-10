import { useEffect, useId, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { NavLink } from "@/components/NavLink";

type SectionId = "home" | "skills" | "projects" | "contact";

type Props = {
  onHomeScroll,
  activeSection,
};

export default function SiteHeader({ onHomeScroll, activeSection }: Props) {
  const navId = useId();
  const mobileMenuId = `${navId}-mobile-menu`;
  const [navOpen, setNavOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const onHome = location.pathname === "/";

  useEffect(() => {
    setNavOpen(false);
  }, [location.pathname]);

  const go = (id: SectionId) => {
    if (onHome) {
      onHomeScroll(id);
      return;
    }
    navigate(`/?section=${id}`);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav aria-label="Primary navigation">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <NavLink
              to="/"
              className="text-xl font-bold bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent"
              aria-label="Go to home page"
            >
              Tanguy Osvald
            </NavLink>

            <ul className="hidden md:flex items-center gap-8">
              {[
                { id: "home" as const, label: "Home" },
                { id: "skills" as const, label: "Skills" },
                { id: "projects" as const, label: "Projects" },
                { id: "contact" as const, label: "Contact" },
              ].map((item) => (
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
                        activeSection === item.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </button>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => setNavOpen((v) => !v)}
              className="md:hidden p-2 text-foreground"
              aria-label={navOpen ? "Close menu" : "Open menu"}
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
            {[
              { id: "home" as const, label: "Home" },
              { id: "skills" as const, label: "Skills" },
              { id: "projects" as const, label: "Projects" },
              { id: "contact" as const, label: "Contact" },
            ].map((item) => (
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
          </div>
        </div>
      </nav>
    </header>
  );
}
