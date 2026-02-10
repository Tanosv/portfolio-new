import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import {
  Code2,
  Database,
  ExternalLink,
  Github,
  Mail,
  Menu,
  PartyPopper,
  Palette,
  Server,
  Sparkles,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Project = {
  title: string;
  description: string;
  fullDescription: string;
  tech: string[];
  features: string[];
  demoUrl: string;
  githubUrl: string;
};

type Skill = {
  name: string;
  icon: typeof Code2;
  size: "large" | "medium" | "small";
  color: string;
};

declare global {
  interface Window {
    database?: unknown;
  }
}

const SITE_URL = "https://yourdomain.com";
const OG_IMAGE_URL = "https://yourdomain.com/og.png";

const Index = () => {
  const navId = useId();
  const mobileMenuId = `${navId}-mobile-menu`;
  const mainRef = useRef<HTMLElement | null>(null);

  const reducedMotionQuery = useMemo(() => window.matchMedia("(prefers-reduced-motion: reduce)"), []);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(reducedMotionQuery.matches);

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<"home" | "skills" | "projects" | "contact">("home");
  const [lastSubmit, setLastSubmit] = useState(0);
  const [honeypot, setHoneypot] = useState("");
  const [srStatus, setSrStatus] = useState("");

  const [questUnlocked, setQuestUnlocked] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  const jsonLdPerson = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Tanguy Osvald",
      jobTitle: "Web Developer",
      url: SITE_URL,
      sameAs: ["https://www.linkedin.com/in/tanguy-osv/", "https://github.com/Tanosv"],
    }),
    [],
  );

  useEffect(() => {
    const onChange = () => setPrefersReducedMotion(reducedMotionQuery.matches);
    reducedMotionQuery.addEventListener("change", onChange);
    return () => reducedMotionQuery.removeEventListener("change", onChange);
  }, [reducedMotionQuery]);

  const runCelebration = () => {
    if (questUnlocked) return;

    setQuestUnlocked(true);
    setCelebrate(true);

    const msg = "Quest unlocked, check the reward panel next to the contact form.";
    toast.success(msg);
    setSrStatus(msg);

    window.setTimeout(() => setCelebrate(false), prefersReducedMotion ? 0 : 1800);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      const sections: Array<"home" | "skills" | "projects" | "contact"> = ["home", "skills", "projects", "contact"];
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 150 && rect.bottom >= 150;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    console.log("%cSECRET QUEST DISCOVERED", "color: #9b87f5; font-size: 18px; font-weight: bold;");
    console.log("%cYou found a hidden riddle.", "color: #f97316; font-size: 14px;");
    console.log("%cSolve this.", "color: #9b87f5; font-size: 13px; font-weight: bold;");
    console.log('%c"I guard data, I store without forgetting.", "color: #ffffff; font-size: 13px;');
    console.log('%c"Organized in rows and columns, what am I.", "color: #ffffff; font-size: 13px;');
    console.log("%cIf you know the answer, speak it here.", "color: #f97316; font-size: 12px;");

    Object.defineProperty(window, "database", {
      configurable: true,
      enumerable: false,
      get: () => {
        runCelebration();
        return "Unlocked";
      },
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
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
  }, [prefersReducedMotion, questUnlocked]);

  const skills: Skill[] = useMemo(
    () => [
      { name: "React", icon: Code2, size: "large", color: "from-accent to-accent/60" },
      { name: "TypeScript", icon: Code2, size: "large", color: "from-accent/80 to-accent/40" },
      { name: "Node.js", icon: Server, size: "medium", color: "from-accent to-accent/60" },
      { name: "REST APIs", icon: Server, size: "medium", color: "from-accent/80 to-accent/40" },
      { name: "UI UX", icon: Palette, size: "large", color: "from-accent to-accent/60" },
      { name: "PostgreSQL", icon: Database, size: "medium", color: "from-accent/80 to-accent/40" },
      { name: "MongoDB", icon: Database, size: "small", color: "from-accent/60 to-accent/30" },
      { name: "Tailwind", icon: Palette, size: "medium", color: "from-accent to-accent/60" },
      { name: "Git", icon: Code2, size: "small", color: "from-accent/80 to-accent/40" },
      { name: "Docker", icon: Server, size: "small", color: "from-accent/60 to-accent/30" },
    ],
    [],
  );

  const skillSizes: Record<Skill["size"], string> = {
    large: "w-32 h-32 text-base",
    medium: "w-24 h-24 text-sm",
    small: "w-20 h-20 text-xs",
  };

  const projects: Project[] = useMemo(
    () => [
      {
        title: "E Commerce Platform",
        description: "A full stack marketplace with payments and real time inventory.",
        fullDescription:
          "Built an e commerce solution with authentication, product management, shopping cart, and Stripe payments. Added real time inventory tracking, order management, and an admin dashboard for analytics.",
        tech: ["React", "Node.js", "PostgreSQL", "Stripe", "Redis"],
        features: ["Payments", "Real time Inventory", "Admin Dashboard", "Email Notifications"],
        demoUrl: "#",
        githubUrl: "#",
      },
      {
        title: "Task Management App",
        description: "Team project tool with real time updates and workflows.",
        fullDescription:
          "Developed a project management app with collaboration features. Users create projects, assign tasks, set deadlines, and track progress with Kanban boards. Added live updates with WebSockets.",
        tech: ["TypeScript", "WebSockets", "MongoDB", "Express", "Socket.io"],
        features: ["Real time Collaboration", "Kanban Boards", "Team Management", "File Attachments"],
        demoUrl: "#",
        githubUrl: "#",
      },
      {
        title: "Portfolio CMS",
        description: "CMS for creators with templates and media management.",
        fullDescription:
          "Created a CMS for creators with a drag and drop builder, media library, and templates. Added SEO settings, responsive images, and static generation for performance.",
        tech: ["React", "Tailwind", "Supabase", "Next.js", "S3"],
        features: ["Drag and Drop Builder", "Media Library", "SEO Settings", "Template System"],
        demoUrl: "#",
        githubUrl: "#",
      },
    ],
    [],
  );

  const scrollToSection = (id: "home" | "skills" | "projects" | "contact") => {
    document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
    setNavOpen(false);
  };

  const onSkipToContent = () => {
    if (mainRef.current) mainRef.current.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;

    const now = Date.now();
    if (now - lastSubmit < 30000) {
      const msg = "Please wait before submitting again.";
      toast.error(msg);
      setSrStatus(msg);
      return;
    }

    const msg = "Message sent, I will get back to you soon.";
    toast.success(msg);
    setSrStatus(msg);

    setLastSubmit(now);
    setFormData({ name: "", email: "", message: "" });
  };

  const parallaxValue = (value: number) => (prefersReducedMotion ? 0 : value);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <html lang="en" />
        <title>Tanguy Osvald, Web Developer, Portfolio</title>

        <meta
          name="description"
          content="Portfolio of Tanguy Osvald, full stack web developer, projects, skills, and contact."
        />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={`${SITE_URL}/`} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Tanguy Osvald, Web Developer, Portfolio" />
        <meta
          property="og:description"
          content="Projects, skills, and contact, portfolio of a full stack web developer."
        />
        <meta property="og:url" content={`${SITE_URL}/`} />
        <meta property="og:image" content={OG_IMAGE_URL} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tanguy Osvald, Web Developer, Portfolio" />
        <meta
          name="twitter:description"
          content="Projects, skills, and contact, portfolio of a full stack web developer."
        />
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
      `}</style>

      <a
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          onSkipToContent();
        }}
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:bg-background focus:text-foreground focus:border focus:border-border"
      >
        Skip to main content
      </a>

      <div className="sr-only" aria-live="polite">
        {srStatus}
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <nav aria-label="Primary navigation">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <button
                type="button"
                onClick={() => scrollToSection("home")}
                className="text-xl font-bold bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent"
                aria-label="Go to home section"
              >
                Tanguy Osvald
              </button>

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
                      onClick={() => scrollToSection(item.id)}
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

          <div id={mobileMenuId} className={navOpen ? "md:hidden border-t border-border bg-background/95 backdrop-blur-md" : "hidden"}>
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
                  onClick={() => scrollToSection(item.id)}
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
              style={{
                transform: `translate(${parallaxValue(scrollY * 0.08)}px, ${parallaxValue(scrollY * 0.12)}px)`,
              }}
            />
            <div
              className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/40 rounded-full blur-3xl"
              style={{
                transform: `translate(${parallaxValue(-scrollY * 0.06)}px, ${parallaxValue(-scrollY * 0.1)}px)`,
              }}
            />
            <div
              className="absolute top-1/2 left-1/3 w-64 h-64 bg-accent/30 rounded-full blur-3xl"
              style={{
                transform: `translate(${parallaxValue(scrollY * 0.05)}px, ${parallaxValue(scrollY * 0.08)}px)`,
              }}
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
            <div className="medieval-border inline-block px-12 py-8 mb-8">
              <h1 className="leading-tight pb-4 text-8xl md:text-8xl mb-2 font-bold bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent">
                Tanguy Osvald
              </h1>
            </div>

            <p className="text-xl md:text-2xl text-muted-foreground mb-4">Web Developer and Creative Technologist</p>

            <div className="ornate-divider max-w-md mx-auto my-8" aria-hidden="true" />

            <p className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto">
              Turning ideas into reliable digital products through design and engineering.
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 relative overflow-hidden group"
                onClick={() => scrollToSection("projects")}
                aria-label="Go to projects section"
              >
                <span className="relative z-10">View Projects</span>
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
                aria-label="Go to contact section"
              >
                Get In Touch
              </Button>
            </div>
          </div>
        </section>

        <section id="skills" aria-label="Skills" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-15 pointer-events-none" aria-hidden="true">
            <div
              className="absolute top-10 right-20 w-72 h-72 bg-secondary/50 rounded-full blur-3xl"
              style={{
                transform: `translate(${parallaxValue(-scrollY * 0.07)}px, ${parallaxValue(scrollY * 0.1)}px)`,
              }}
            />
            <div
              className="absolute bottom-20 left-20 w-80 h-80 bg-primary/50 rounded-full blur-3xl"
              style={{
                transform: `translate(${parallaxValue(scrollY * 0.06)}px, ${parallaxValue(-scrollY * 0.09)}px)`,
              }}
            />
          </div>

          <div className="container relative z-10 mx-auto px-4">
            <div className="text-center mb-16">
              <div className="ornate-divider max-w-xs mx-auto mb-6" aria-hidden="true" />
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Skills and Expertise</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Full stack development across modern technologies</p>
            </div>

            <div className="relative min-h-[500px] max-w-5xl mx-auto" role="list" aria-label="Skills list">
              <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-4 p-8">
                {skills.map((skill, index) => {
                  const positions = [
                    { top: "10%", left: "15%" },
                    { top: "5%", left: "45%" },
                    { top: "15%", left: "75%" },
                    { top: "40%", left: "10%" },
                    { top: "35%", left: "40%" },
                    { top: "40%", left: "70%" },
                    { top: "65%", left: "20%" },
                    { top: "70%", left: "50%" },
                    { top: "65%", left: "80%" },
                    { top: "85%", left: "35%" },
                  ];
                  const pos = positions[index % positions.length];

                  return (
                    <button
                      key={skill.name}
                      type="button"
                      className={`absolute ${skillSizes[skill.size]} rounded-full bg-gradient-to-br ${skill.color} backdrop-blur-sm border border-accent/30 flex flex-col items-center justify-center gap-2 p-4 hover:scale-110 hover:border-accent transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-accent/50 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background`}
                      style={{
                        top: pos.top,
                        left: pos.left,
                        animation: prefersReducedMotion ? undefined : `float ${3 + index * 0.5}s ease-in-out infinite`,
                        animationDelay: prefersReducedMotion ? undefined : `${index * 0.2}s`,
                      }}
                      aria-label={`Skill, ${skill.name}`}
                    >
                      <skill.icon className="w-6 h-6 text-background group-hover:scale-110 transition-transform" aria-hidden="true" />
                      <span className="font-semibold text-background text-center leading-tight">{skill.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="projects" aria-label="Projects" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-15 pointer-events-none" aria-hidden="true">
            <div
              className="absolute top-20 left-10 w-96 h-96 bg-primary/50 rounded-full blur-3xl"
              style={{
                transform: `translate(${parallaxValue(scrollY * 0.05)}px, ${parallaxValue(scrollY * 0.09)}px)`,
              }}
            />
            <div
              className="absolute bottom-10 right-10 w-72 h-72 bg-secondary/50 rounded-full blur-3xl"
              style={{
                transform: `translate(${parallaxValue(-scrollY * 0.07)}px, ${parallaxValue(-scrollY * 0.08)}px)`,
              }}
            />
          </div>

          <div className="container relative z-10 mx-auto px-4">
            <div className="text-center mb-16">
              <div className="ornate-divider max-w-xs mx-auto mb-6" aria-hidden="true" />
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Recent work that shows product thinking and engineering</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto" role="list">
              {projects.map((project, index) => (
                <article key={project.title} role="listitem">
                  <Card className="relative overflow-hidden bg-card border-border hover:border-accent transition-all duration-300">
                    <div className="h-1 bg-gradient-to-r from-transparent via-accent to-transparent" aria-hidden="true" />

                    <div className="p-6">
                      <div className="mb-4 relative inline-block" aria-hidden="true">
                        <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center relative hover:bg-accent/20 transition-colors">
                          <Code2 className="w-8 h-8 text-accent relative z-10" aria-hidden="true" />
                        </div>
                      </div>

                      <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                      <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{project.description}</p>

                      <ul className="flex flex-wrap gap-2 mb-4" aria-label={`Technologies used in ${project.title}`}>
                        {project.tech.slice(0, 3).map((tech) => (
                          <li key={tech} className="px-3 py-1 bg-muted text-xs rounded border border-border">
                            {tech}
                          </li>
                        ))}
                        {project.tech.length > 3 ? (
                          <li className="px-3 py-1 bg-muted text-xs rounded border border-border">+{project.tech.length - 3}</li>
                        ) : null}
                      </ul>

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="w-full border-accent/50 text-accent hover:bg-accent/10"
                        onClick={() => setSelectedProject(index)}
                        aria-label={`Open details for ${project.title}`}
                      >
                        View Details
                      </Button>
                    </div>

                    <div className="h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 hover:opacity-100 transition-opacity" aria-hidden="true" />
                  </Card>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Dialog
          open={selectedProject !== null}
          onOpenChange={(open) => {
            if (!open) setSelectedProject(null);
          }}
        >
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card border-accent" aria-describedby={undefined}>
            {selectedProject !== null ? (
              <>
                <DialogHeader>
                  <DialogTitle className="text-3xl font-bold mb-2">{projects[selectedProject].title}</DialogTitle>
                  <p className="text-muted-foreground">{projects[selectedProject].description}</p>
                </DialogHeader>

                <div className="space-y-6 mt-6">
                  <section aria-label="Overview">
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-accent" aria-hidden="true" />
                      Overview
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{projects[selectedProject].fullDescription}</p>
                  </section>

                  <section aria-label="Key features">
                    <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                    <ul className="grid grid-cols-2 gap-3">
                      {projects[selectedProject].features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full" aria-hidden="true" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section aria-label="Tech stack">
                    <h3 className="text-lg font-semibold mb-3">Tech Stack</h3>
                    <ul className="flex flex-wrap gap-2">
                      {projects[selectedProject].tech.map((tech) => (
                        <li key={tech} className="px-4 py-2 bg-accent/10 text-sm rounded-lg border border-accent/30 font-medium">
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </section>

                  <div className="flex gap-4 pt-4">
                    <Button asChild className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90">
                      <a
                        href={projects[selectedProject].demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open live demo in a new tab for ${projects[selectedProject].title}`}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" aria-hidden="true" />
                        Live Demo
                      </a>
                    </Button>

                    <Button asChild variant="outline" className="flex-1 border-accent text-accent hover:bg-accent/10">
                      <a
                        href={projects[selectedProject].githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open source code in a new tab for ${projects[selectedProject].title}`}
                      >
                        <Github className="w-4 h-4 mr-2" aria-hidden="true" />
                        View Code
                      </a>
                    </Button>
                  </div>
                </div>
              </>
            ) : null}
          </DialogContent>
        </Dialog>

        <section id="contact" aria-label="Contact" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-15 pointer-events-none" aria-hidden="true">
            <div
              className="absolute top-10 left-1/4 w-80 h-80 bg-accent/50 rounded-full blur-3xl"
              style={{
                transform: `translate(${parallaxValue(scrollY * 0.04)}px, ${parallaxValue(scrollY * 0.07)}px)`,
              }}
            />
          </div>

          <div className="container relative z-10 mx-auto px-4">
            <div className="text-center mb-16">
              <div className="ornate-divider max-w-xs mx-auto mb-6" aria-hidden="true" />
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Let us Connect</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Share your project, I will reply with next steps.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_320px] items-start max-w-5xl mx-auto">
              <Card className="relative overflow-hidden bg-card border-border">
                <div className="h-2 bg-gradient-to-r from-accent via-accent/50 to-accent" aria-hidden="true" />

                <div className="p-8 relative z-10">
                  <form onSubmit={handleSubmit} className="space-y-6" aria-label="Contact form">
                    <div className="sr-only" id="contact-hint">
                      All fields are required, the message needs at least ten characters.
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
                        Your name
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
                        aria-describedby="contact-hint"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email address
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
                        aria-describedby="contact-hint"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Your message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="bg-background border-border focus:border-accent min-h-[150px]"
                        required
                        minLength={10}
                        maxLength={1000}
                        autoComplete="off"
                        aria-describedby="contact-hint"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-accent text-accent-foreground hover:bg-accent/90 relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <Mail className="w-4 h-4" aria-hidden="true" />
                        Send message
                      </span>
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
                        aria-hidden="true"
                      />
                    </Button>
                  </form>
                </div>
              </Card>

              <aside aria-label="Reward panel" className="md:sticky md:top-24">
                <Card className="relative overflow-hidden bg-card border-border">
                  <div className="h-2 bg-gradient-to-r from-transparent via-accent to-transparent" aria-hidden="true" />
                  <div className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <PartyPopper className="w-5 h-5 text-accent" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold">Secret Reward</h3>
                        <p className="text-sm text-muted-foreground">Open DevTools and the Console, then solve the riddle.</p>
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
                              <p className="font-semibold">Unlocked</p>
                              <p className="text-sm text-muted-foreground">You found the answer.</p>
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
                          <p className="text-sm text-muted-foreground">Not unlocked yet.</p>
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

      <footer className="py-8 border-t border-border relative">
        <div className="ornate-divider max-w-md mx-auto mb-6" aria-hidden="true" />
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2026 Tanguy Osvald. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
