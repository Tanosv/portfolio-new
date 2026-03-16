import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Code2, Database, Globe, Leaf, Lock, Mail, PartyPopper, Server, ShieldCheck } from "lucide-react";

import SiteHeader from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SiteFooter from "@/components/SiteFooter";

import { SITE_URL, OG_IMAGE_URL } from "@/lib/site";

type Skill = {
  name: string;
  icon: typeof Code2;
  size: "large" | "medium" | "small";
  color: string;
};

type ProjectCard = {
  title: string;
  description: string;
  tech: string[];
  routePath: string;
  imageSrc?: string;
  imageAlt?: string;
  confidential?: boolean;
  inDevelopment?: boolean;
};

declare global {
  interface Window {
    database?: unknown;
    __questLogged?: boolean;
  }
}

const FORM_THROTTLE_MS = 30_000;

const encodeForm = (data: Record<string, string>) =>
  Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");

const Index = () => {
  const { t, i18n } = useTranslation();
  const { lang = "fr" } = useParams<{ lang?: string }>();
  const mainRef = useRef<HTMLElement | null>(null);

  const reducedMotionQuery = useMemo(() => window.matchMedia("(prefers-reduced-motion: reduce)"), []);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(reducedMotionQuery.matches);

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState<"home" | "skills" | "projects" | "contact">("home");
  const [lastSubmit, setLastSubmit] = useState(0);
  const [honeypot, setHoneypot] = useState("");
  const [srStatus, setSrStatus] = useState("");

  const [questUnlocked, setQuestUnlocked] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const jsonLdPerson = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Tanguy Osvald",
      jobTitle: lang === "fr" ? "Développeur Web" : "Web Developer",
      url: SITE_URL,
      sameAs: ["https://www.linkedin.com/in/tanguy-osv/", "https://github.com/Tanosv"],
    }),
    [lang],
  );

  useEffect(() => {
    const onChange = () => setPrefersReducedMotion(reducedMotionQuery.matches);
    reducedMotionQuery.addEventListener("change", onChange);
    return () => reducedMotionQuery.removeEventListener("change", onChange);
  }, [reducedMotionQuery]);

  useEffect(() => {
    const root = document.documentElement;
    const prev = root.style.scrollBehavior;
    root.style.scrollBehavior = prefersReducedMotion ? "auto" : "smooth";
    return () => {
      root.style.scrollBehavior = prev;
    };
  }, [prefersReducedMotion]);

  const runCelebration = useCallback(() => {
    if (questUnlocked) return;

    setQuestUnlocked(true);
    setCelebrate(true);

    const msg = t("home.quest.unlock_toast");
    toast.success(msg);
    setSrStatus(msg);

    window.setTimeout(() => setCelebrate(false), prefersReducedMotion ? 0 : 1800);
  }, [prefersReducedMotion, questUnlocked, t]);

  useEffect(() => {
    const tickingRef = { current: false };

    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      window.requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        tickingRef.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = ["home", "skills", "projects", "contact"] as const;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as (typeof sections)[number]);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!window.__questLogged) {
      window.__questLogged = true;

      console.log("%cSECRET QUEST DISCOVERED", "color: #9b87f5, font-size: 18px, font-weight: bold");
      console.log("%cYou found a hidden riddle.", "color: #f97316, font-size: 14px");
      console.log("%cSolve this.", "color: #9b87f5, font-size: 13px, font-weight: bold");
      console.log("%cI guard data, I store without forgetting.", "color: #ffffff, font-size: 13px");
      console.log("%cOrganized in rows and columns, what am I.", "color: #ffffff, font-size: 13px");
      console.log("%cIf you know the answer, speak it here.", "color: #f97316, font-size: 12px");
    }

    Object.defineProperty(window, "database", {
      configurable: true,
      enumerable: false,
      get: () => {
        runCelebration();
        return "Unlocked";
      },
    });

    return () => {
      try {
        delete (window as unknown as Record<string, unknown>).database;
      } catch {
        Object.defineProperty(window, "database", {
          configurable: true,
          enumerable: false,
          value: undefined,
        });
      }
    };
  }, [runCelebration]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get("section") as "home" | "skills" | "projects" | "contact" | null;
    if (!section) return;

    window.setTimeout(() => {
      document
        .getElementById(section)
        ?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
      navigate(`/${lang}`, { replace: true });
    }, 0);
  }, [location.search, navigate, prefersReducedMotion, lang]);

  const skills: Skill[] = useMemo(
    () => [
      { name: "React", icon: Code2, size: "large", color: "from-accent to-accent/60" },
      { name: "TypeScript", icon: Code2, size: "large", color: "from-accent/80 to-accent/40" },
      { name: "Node.js", icon: Server, size: "medium", color: "from-accent to-accent/60" },
      { name: "REST APIs", icon: Server, size: "medium", color: "from-accent/80 to-accent/40" },
      { name: "UI UX", icon: Code2, size: "large", color: "from-accent to-accent/60" },
      { name: "PostgreSQL", icon: Database, size: "medium", color: "from-accent/80 to-accent/40" },
      { name: "MongoDB", icon: Database, size: "small", color: "from-accent/60 to-accent/30" },
      { name: "Tailwind", icon: Code2, size: "medium", color: "from-accent to-accent/60" },
      { name: "Git", icon: Code2, size: "small", color: "from-accent/80 to-accent/40" },
      { name: "Docker", icon: Server, size: "small", color: "from-accent/60 to-accent/30" },
      { name: "Next.js", icon: Globe, size: "medium", color: "from-accent/70 to-accent/35" },
      { name: "Spring Boot", icon: Leaf, size: "medium", color: "from-accent/75 to-accent/40" },
    ],
    [],
  );

  const skillSizes: Record<Skill["size"], string> = {
    large: "w-32 h-32 text-base",
    medium: "w-24 h-24 text-sm",
    small: "w-20 h-20 text-xs",
  };

  const projects: ProjectCard[] = useMemo(
    () => [
      {
        title: "Alizé",
        description: t("home.projects.alize.description"),
        tech: ["React", "TypeScript", "Tailwind", "API"],
        routePath: `/${lang}/projects/alize`,
        imageSrc: "/images/projects/Screen_Alize_Banner.webp",
        imageAlt: t("home.projects.alize.image_alt"),
      },
      {
        title: "ClimatServ 17",
        description: t("home.projects.climatserv.description"),
        tech: ["Next.js", "React", "Tailwind", "TypeScript", "API routes", "PostgreSQL", "Prisma", "SEO"],
        routePath: `/${lang}/projects/climatserv17`,
        imageSrc: "/images/projects/Screen_Climatserv17_Banner.webp",
        imageAlt: t("home.projects.climatserv.image_alt"),
      },
      {
        title: "Bandai Namco Internal API",
        description: t("home.projects.bandai.description"),
        tech: ["Node.js", "TypeScript", "REST"],
        routePath: `/${lang}/projects/bandai-namco`,
        confidential: true,
      },
      {
        title: "SigilAI",
        description: t("home.projects.sigilai.description"),
        tech: ["Java 21", "Spring Boot 3", "React 18", "TypeScript", "PostgreSQL", "Claude API", "Ollama"],
        routePath: `/${lang}/projects/sigilai`,
        inDevelopment: true,
      },
      {
        title: t("home.projects.portfolio.title"),
        description: t("home.projects.portfolio.description"),
        tech: ["React 18", "TypeScript", "Vite", "Tailwind", "shadcn/ui", "Netlify"],
        routePath: `/${lang}/projects/portfolio`,
        imageSrc: "/images/projects/Screen_Portfolio_Banner.png",
        imageAlt: t("home.projects.portfolio.image_alt"),
      },
    ],
    [lang, t, i18n.language], // eslint-disable-line react-hooks/exhaustive-deps
  );

  const scrollToSection = (id: "home" | "skills" | "projects" | "contact") => {
    document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
  };

  const onSkipToContent = () => {
    if (mainRef.current) mainRef.current.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;

    const errors: { name?: string; email?: string; message?: string } = {};
    if (formData.name.trim().length < 2) errors.name = t("home.contact.validation.name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) errors.email = t("home.contact.validation.email");
    if (formData.message.trim().length < 10) errors.message = t("home.contact.validation.message");
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});

    const now = Date.now();
    if (now - lastSubmit < FORM_THROTTLE_MS) {
      const msg = t("home.contact.throttle_error");
      toast.error(msg);
      setSrStatus(msg);
      return;
    }

    const payload = {
      "form-name": "contact",
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
      website: honeypot,
    };

    setLastSubmit(now);

    try {
      const res = await fetch("/?success=true", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeForm(payload),
      });

      if (!res.ok) {
        const msg = t("home.contact.error_send");
        toast.error(msg);
        setSrStatus(msg);
        return;
      }

      const msg = t("home.contact.success");
      toast.success(msg);
      setSrStatus(msg);
      setFormData({ name: "", email: "", message: "" });
      setFormErrors({});
    } catch {
      const msg = t("home.contact.error_connection");
      toast.error(msg);
      setSrStatus(msg);
    }
  };

  const parallaxValue = (value: number) => (prefersReducedMotion ? 0 : value);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <html lang={lang} />
        <title>{t("home.meta.title")}</title>

        <meta name="description" content={t("home.meta.description")} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={`${SITE_URL}/${lang}/`} />
        <link rel="alternate" hrefLang="fr" href={`${SITE_URL}/fr/`} />
        <link rel="alternate" hrefLang="en" href={`${SITE_URL}/en/`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/fr/`} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={t("home.meta.og_title")} />
        <meta property="og:description" content={t("home.meta.og_description")} />
        <meta property="og:url" content={`${SITE_URL}/${lang}/`} />
        <meta property="og:image" content={OG_IMAGE_URL} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t("home.meta.og_title")} />
        <meta name="twitter:description" content={t("home.meta.og_description")} />
        <meta name="twitter:image" content={OG_IMAGE_URL} />

        <script type="application/ld+json">{JSON.stringify(jsonLdPerson)}</script>
      </Helmet>

      <style>{`
        @keyframes rewardPop {
          0% { transform: translateY(6px) scale(0.98); opacity: 0.65; }
          60% { transform: translateY(-2px) scale(1.01); opacity: 1; }
          100% { transform: translateY(0px) scale(1); opacity: 1; }
        }
        @keyframes confettiFall {
          0% { transform: translateY(-16px) rotate(0deg); opacity: 0; }
          15% { opacity: 1; }
          100% { transform: translateY(70px) rotate(220deg); opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      <a
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          onSkipToContent();
        }}
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:bg-background focus:text-foreground focus:border focus:border-border"
      >
        {t("home.hero.skip_to_content")}
      </a>

      <div className="sr-only" aria-live="polite">
        {srStatus}
      </div>

      <SiteHeader activeSection={activeSection} onHomeScroll={scrollToSection} />

      <main
        id="main"
        ref={(node) => {
          mainRef.current = node;
        }}
        tabIndex={-1}
        className="outline-none"
      >
        <section id="home" aria-label="Home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
          <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true">
            <div
              className="absolute top-20 left-10 w-96 h-96 bg-primary/40 rounded-full blur-3xl"
              style={{ transform: `translate(${parallaxValue(scrollY * 0.08)}px, ${parallaxValue(scrollY * 0.12)}px)` }}
            />
            <div
              className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/40 rounded-full blur-3xl"
              style={{ transform: `translate(${parallaxValue(-scrollY * 0.06)}px, ${parallaxValue(-scrollY * 0.1)}px)` }}
            />
            <div
              className="absolute top-1/2 left-1/3 w-64 h-64 bg-accent/30 rounded-full blur-3xl"
              style={{ transform: `translate(${parallaxValue(scrollY * 0.05)}px, ${parallaxValue(scrollY * 0.08)}px)` }}
            />
          </div>

          <div
            className="absolute inset-0 opacity-5"
            aria-hidden="true"
            style={{
              backgroundImage:
                "linear-gradient(45deg, transparent 45%, hsl(var(--accent) / 0.1) 45%, hsl(var(--accent) / 0.1) 55%, transparent 55%), linear-gradient(-45deg, transparent 45%, hsl(var(--accent) / 0.1) 45%, hsl(var(--accent) / 0.1) 55%, transparent 55%)",
              backgroundSize: "60px 60px",
              transform: `translateY(${parallaxValue(scrollY * 0.15)}px)`,
            }}
          />

          <div className="container relative z-10 mx-auto px-4 text-center animate-fade-in">
            <div className="medieval-border inline-block px-6 py-6 sm:px-10 sm:py-7 md:px-12 md:py-8 mb-6 sm:mb-8">
              <h1
                className="
                  font-bold
                  leading-[1.06]
                  tracking-tight
                  text-[clamp(2.8rem,12vw,6rem)]
                  sm:text-[clamp(3.2rem,10vw,6.5rem)]
                  md:text-7xl
                  lg:text-8xl
                  bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent
                  break-words
                  pb-4
                "
              >
                <span className="block sm:inline">Tanguy</span>
                <span className="block sm:inline sm:pl-3">Osvald</span>
              </h1>
            </div>

            <p className="text-base sm:text-xl md:text-2xl text-muted-foreground mb-4">{t("home.hero.subtitle")}</p>

            <div className="ornate-divider max-w-md mx-auto my-8" aria-hidden="true" />

            <p className="text-sm sm:text-lg text-muted-foreground mb-10 sm:mb-12 max-w-xl mx-auto px-2 sm:px-0">
              {t("home.hero.tagline")}
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 relative overflow-hidden group"
                onClick={() => scrollToSection("projects")}
                aria-label={t("home.hero.go_to_projects_aria")}
              >
                <span className="relative z-10">{t("home.hero.view_projects")}</span>
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
                  aria-hidden="true"
                />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-accent text-accent hover:bg-accent/10"
                onClick={() => scrollToSection("contact")}
                aria-label={t("home.hero.go_to_contact_aria")}
              >
                {t("home.hero.get_in_touch")}
              </Button>
            </div>
          </div>
        </section>

        <section id="skills" aria-label={t("nav.skills")} className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-15 pointer-events-none" aria-hidden="true">
            <div
              className="absolute top-10 right-20 w-72 h-72 bg-secondary/50 rounded-full blur-3xl"
              style={{ transform: `translate(${parallaxValue(-scrollY * 0.07)}px, ${parallaxValue(scrollY * 0.1)}px)` }}
            />
            <div
              className="absolute bottom-20 left-20 w-80 h-80 bg-primary/50 rounded-full blur-3xl"
              style={{ transform: `translate(${parallaxValue(scrollY * 0.06)}px, ${parallaxValue(-scrollY * 0.09)}px)` }}
            />
          </div>

          <div className="container relative z-10 mx-auto px-4">
            <div className="text-center mb-16">
              <div className="ornate-divider max-w-xs mx-auto mb-6" aria-hidden="true" />
              <h2 className="text-4xl md:text-5xl font-bold mb-4">{t("home.skills.title")}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t("home.skills.subtitle")}</p>
            </div>

            <div className="max-w-6xl mx-auto">
              <ul className="grid grid-cols-3 gap-4 place-items-center px-2 md:hidden" aria-label={t("home.skills.list_aria")}>
                {skills.map((skill) => (
                  <li
                    key={skill.name}
                    className={`${skillSizes[skill.size]} rounded-full bg-gradient-to-br ${skill.color} backdrop-blur-sm border border-accent/30 flex flex-col items-center justify-center gap-2 p-4 shadow-lg`}
                    aria-label={t("home.skills.item_aria", { name: skill.name })}
                  >
                    <skill.icon className="w-6 h-6 text-background" aria-hidden="true" />
                    <span className="font-semibold text-background text-center leading-tight">{skill.name}</span>
                  </li>
                ))}
              </ul>

              <div className="relative min-h-[560px] hidden md:block" aria-hidden="true">
                <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-4 p-8">
                  {skills.map((skill, index) => {
                    const positions = [
                      { top: "8%", left: "14%" },
                      { top: "4%", left: "42%" },
                      { top: "10%", left: "72%" },
                      { top: "34%", left: "8%" },
                      { top: "30%", left: "35%" },
                      { top: "34%", left: "66%" },
                      { top: "56%", left: "16%" },
                      { top: "60%", left: "44%" },
                      { top: "56%", left: "78%" },
                      { top: "80%", left: "26%" },
                      { top: "80%", left: "54%" },
                      { top: "72%", left: "88%" },
                    ];
                    const pos = positions[index % positions.length];

                    return (
                      <div
                        key={skill.name}
                        role="listitem"
                        className={`absolute ${skillSizes[skill.size]} rounded-full bg-gradient-to-br ${skill.color} backdrop-blur-sm border border-accent/30 flex flex-col items-center justify-center gap-2 p-4 shadow-lg hover:shadow-accent/40 transition-shadow`}
                        style={{
                          top: pos.top,
                          left: pos.left,
                          animation: prefersReducedMotion ? undefined : `float ${3 + index * 0.45}s ease-in-out infinite`,
                          animationDelay: prefersReducedMotion ? undefined : `${index * 0.18}s`,
                        }}
                        aria-label={t("home.skills.item_aria", { name: skill.name })}
                      >
                        <skill.icon className="w-6 h-6 text-background" aria-hidden="true" />
                        <span className="font-semibold text-background text-center leading-tight">{skill.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" aria-label={t("nav.projects")} className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-15 pointer-events-none" aria-hidden="true">
            <div
              className="absolute top-20 left-10 w-96 h-96 bg-primary/50 rounded-full blur-3xl"
              style={{ transform: `translate(${parallaxValue(scrollY * 0.05)}px, ${parallaxValue(scrollY * 0.09)}px)` }}
            />
            <div
              className="absolute bottom-10 right-10 w-72 h-72 bg-secondary/50 rounded-full blur-3xl"
              style={{ transform: `translate(${parallaxValue(-scrollY * 0.07)}px, ${parallaxValue(-scrollY * 0.08)}px)` }}
            />
          </div>

          <div className="container relative z-10 mx-auto px-4">
            <div className="text-center mb-16">
              <div className="ornate-divider max-w-xs mx-auto mb-6" aria-hidden="true" />
              <h2 className="text-4xl md:text-5xl font-bold mb-4">{t("home.projects.title")}</h2>
            </div>

            <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto" aria-label={t("home.projects.cards_aria")}>
              {projects.map((project) => {
                let cardBanner: React.ReactNode;
                if (project.imageSrc) {
                  cardBanner = (
                    <div className="p-4 pb-0">
                      <div className="rounded-xl overflow-hidden border border-border bg-muted/20 shadow-sm">
                        <div className="h-28 md:h-32 w-full">
                          <img
                            src={project.imageSrc}
                            alt={project.imageAlt || `${project.title} preview.`}
                            className="h-full w-full object-contain"
                            loading="lazy"
                          />
                        </div>
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-accent/40 to-transparent" aria-hidden="true" />
                      </div>
                    </div>
                  );
                } else if (project.confidential) {
                  cardBanner = (
                    <div className="relative h-36 overflow-hidden bg-gradient-to-br from-accent/20 via-background to-accent/10">
                      <div className="pointer-events-none absolute inset-0 opacity-30" aria-hidden="true">
                        <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-accent/25 blur-2xl" />
                        <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-accent/20 blur-2xl" />
                      </div>
                      <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-accent/30 bg-background/40 px-3 py-1 backdrop-blur">
                        <Lock className="h-4 w-4 text-accent" aria-hidden="true" />
                        <span className="text-xs text-muted-foreground">{t("home.projects.confidential_label")}</span>
                      </div>
                      <div className="absolute bottom-4 left-5 flex items-center gap-2 text-sm">
                        <ShieldCheck className="h-5 w-5 text-accent" aria-hidden="true" />
                        <span className="text-muted-foreground">{t("home.projects.internal_api_label")}</span>
                      </div>
                    </div>
                  );
                } else if (project.inDevelopment) {
                  cardBanner = (
                    <div className="relative h-36 overflow-hidden bg-gradient-to-br from-accent/10 via-background to-primary/10">
                      <div className="pointer-events-none absolute inset-0 opacity-30" aria-hidden="true">
                        <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-primary/25 blur-2xl" />
                        <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-accent/20 blur-2xl" />
                      </div>
                      <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-accent/30 bg-background/40 px-3 py-1 backdrop-blur">
                        <Code2 className="h-4 w-4 text-accent" aria-hidden="true" />
                        <span className="text-xs text-muted-foreground">{t("home.projects.in_development_label")}</span>
                      </div>
                    </div>
                  );
                } else {
                  cardBanner = null;
                }

                return (
                  <li key={project.title} className="h-full">
                    <Card className="group relative overflow-hidden bg-card border-border transition-all duration-300 hover:border-accent hover:shadow-[0_0_0_1px_hsl(var(--accent)/0.35)] flex flex-col h-full">
                      <div className="relative">
                        {cardBanner}
                      </div>

                      <div className="p-6 flex flex-col flex-1">
                        <div className="mb-4 flex items-start gap-3">
                          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center border border-accent/20">
                            <Code2 className="w-6 h-6 text-accent" aria-hidden="true" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-xl font-bold leading-tight">{project.title}</h3>
                            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                          </div>
                        </div>

                        <ul className="flex flex-wrap gap-2 mb-5" aria-label={t("home.projects.tech_tags_aria", { title: project.title })}>
                          {project.tech.map((tech) => (
                            <li
                              key={tech}
                              className="px-3 py-1 rounded border border-border bg-muted/40 text-xs text-muted-foreground group-hover:border-accent/30 transition-colors"
                            >
                              {tech}
                            </li>
                          ))}
                        </ul>

                        <Button asChild variant="outline" size="sm" className="w-full border-accent/40 text-accent hover:bg-accent/10 mt-auto">
                          <Link to={project.routePath} aria-label={t("home.projects.open_page_aria", { title: project.title })}>
                            {t("home.projects.view_page")}
                          </Link>
                        </Button>
                      </div>

                      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">
                        <div className="absolute -top-14 -right-14 h-40 w-40 rounded-full bg-accent/10 blur-2xl" />
                        <div className="absolute -bottom-14 -left-14 h-40 w-40 rounded-full bg-accent/10 blur-2xl" />
                      </div>
                    </Card>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section id="contact" aria-label={t("nav.contact")} className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-15 pointer-events-none" aria-hidden="true">
            <div
              className="absolute top-10 left-1/4 w-80 h-80 bg-accent/50 rounded-full blur-3xl"
              style={{ transform: `translate(${parallaxValue(scrollY * 0.04)}px, ${parallaxValue(scrollY * 0.07)}px)` }}
            />
          </div>

          <div className="container relative z-10 mx-auto px-4">
            <div className="text-center mb-16">
              <div className="ornate-divider max-w-xs mx-auto mb-6" aria-hidden="true" />
              <h2 className="text-4xl md:text-5xl font-bold mb-4">{t("home.contact.title")}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t("home.contact.subtitle")}</p>
            </div>

            <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_320px] items-start max-w-5xl mx-auto">
              <Card className="relative overflow-hidden bg-card border-border">
                <div className="h-2 bg-gradient-to-r from-accent via-accent/50 to-accent" aria-hidden="true" />

                <div className="p-8 relative z-10">
                  <form
                    name="contact"
                    method="POST"
                    action="/?success=true"
                    data-netlify="true"
                    netlify-honeypot="website"
                    data-netlify-honeypot="website"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    aria-label={t("home.contact.form_aria")}
                  >
                    <input type="hidden" name="form-name" value="contact" />

                    <div className="sr-only" id="contact-hint">
                      {t("home.contact.form_hint")}
                    </div>

                    <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
                      <label htmlFor="website">Do not fill</label>
                      <input
                        id="website"
                        type="text"
                        name="website"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        {t("home.contact.name_label")}
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-background border-border focus:border-accent"
                        required
                        minLength={2}
                        maxLength={100}
                        autoComplete="name"
                        aria-invalid={!!formErrors.name}
                        aria-describedby={formErrors.name ? "name-error" : "contact-hint"}
                      />
                      {formErrors.name && (
                        <p id="name-error" role="alert" className="mt-1 text-xs text-destructive">
                          {formErrors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        {t("home.contact.email_label")}
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        inputMode="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-background border-border focus:border-accent"
                        required
                        autoComplete="email"
                        aria-invalid={!!formErrors.email}
                        aria-describedby={formErrors.email ? "email-error" : "contact-hint"}
                      />
                      {formErrors.email && (
                        <p id="email-error" role="alert" className="mt-1 text-xs text-destructive">
                          {formErrors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        {t("home.contact.message_label")}
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="bg-background border-border focus:border-accent min-h-[150px]"
                        required
                        aria-invalid={!!formErrors.message}
                        aria-describedby={formErrors.message ? "message-error" : "contact-hint"}
                        minLength={10}
                        maxLength={1000}
                        autoComplete="off"
                      />
                      {formErrors.message && (
                        <p id="message-error" role="alert" className="mt-1 text-xs text-destructive">
                          {formErrors.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-accent text-accent-foreground hover:bg-accent/90 relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <Mail className="w-4 h-4" aria-hidden="true" />
                        {t("home.contact.send_button")}
                      </span>
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
                        aria-hidden="true"
                      />
                    </Button>
                  </form>
                </div>
              </Card>

              <aside aria-label={t("home.quest.title")} className="md:sticky md:top-24">
                <Card className="relative overflow-hidden bg-card border-border">
                  <div className="h-2 bg-gradient-to-r from-transparent via-accent to-transparent" aria-hidden="true" />
                  <div className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <PartyPopper className="w-5 h-5 text-accent" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold">{t("home.quest.title")}</h3>
                        <p className="text-sm text-muted-foreground">{t("home.quest.hint")}</p>
                      </div>
                    </div>

                    <div className="mt-5">
                      {questUnlocked ? (
                        <div
                          className="relative rounded-lg border border-accent/30 bg-accent/5 p-4"
                          style={{
                            animation: celebrate && !prefersReducedMotion ? "rewardPop 420ms ease-out both" : undefined,
                          }}
                          aria-live="polite"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-accent/15 flex items-center justify-center">
                              <Database className="w-4 h-4 text-accent" aria-hidden="true" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold">{t("home.quest.well_done")}</p>
                              <p className="text-sm text-muted-foreground">{t("home.quest.found_answer")}</p>
                            </div>
                          </div>

                          {celebrate && !prefersReducedMotion ? (
                            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                              {Array.from({ length: 18 }).map((_, i) => {
                                const left = `${(i * 97) % 100}%`;
                                const delay = `${(i % 6) * 45}ms`;
                                const duration = `${900 + (i % 5) * 120}ms`;
                                return (
                                  <span
                                    key={i}
                                    className="absolute top-2 text-xs"
                                    style={{
                                      left,
                                      animation: `confettiFall ${duration} ease-in forwards`,
                                      animationDelay: delay,
                                      opacity: 0,
                                    }}
                                  >
                                    {i % 3 === 0 ? "🎉" : i % 3 === 1 ? "✨" : "🎊"}
                                  </span>
                                );
                              })}
                            </div>
                          ) : null}
                        </div>
                      ) : (
                        <div className="rounded-lg border border-border bg-muted/30 p-4">
                          <p className="text-sm text-muted-foreground">{t("home.quest.not_unlocked")}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Index;
