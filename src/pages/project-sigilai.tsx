import { Helmet } from "react-helmet-async";
import { Github } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

import { SITE_URL, OG_IMAGE_URL } from "@/lib/site";

export default function ProjectSigilAI() {
  const title = "SigilAI Project";
  const description =
    "SigilAI is a fullstack personal knowledge management application with a structured markdown journal, a research watchlist, and an AI layer that lets users query their own content in natural language.";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <html lang="en" />
        <title>{title}</title>

        <meta name="description" content={description} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={`${SITE_URL}/projects/sigilai`} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="SigilAI, Project" />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${SITE_URL}/projects/sigilai`} />
        <meta property="og:image" content={OG_IMAGE_URL} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SigilAI, Project" />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={OG_IMAGE_URL} />
      </Helmet>

      <SiteHeader activeSection="projects" onHomeScroll={() => {}} />

      <main className="pt-16">
        <header className="border-b border-border">
          <div className="container mx-auto px-4 py-10">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-4xl md:text-5xl font-bold">SigilAI</h1>
              <span className="px-3 py-1 rounded-full border border-accent/40 bg-accent/10 text-accent text-sm font-medium">
                In development
              </span>
            </div>
            <p className="mt-3 text-muted-foreground max-w-2xl">
              Fullstack personal knowledge management application with an AI layer for natural language queries over your
              own content.
            </p>
          </div>
        </header>

        <section aria-label="Project content" className="container mx-auto px-4 py-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] items-start">
            <article className="space-y-6">
              <Card className="p-6 bg-card border-border">
                <h2 className="text-2xl font-semibold">Overview</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  SigilAI is a solo project covering the full software development lifecycle: architecture design,
                  technical specification, and implementation. The application centers on two core modules : a structured
                  markdown journal and a research watchlist with an AI layer running across both.
                </p>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Users can query their own content in natural language. An optional Git connector enriches the context
                  with tagged commit history, making SigilAI a unified workspace for both writing and development
                  reflection.
                </p>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  The project was designed from scratch over multiple specification iterations (v1.0 to v1.7), covering
                  database schema (ERD), GitHub project planning with milestones, CI workflows, branching strategy,
                  Conventional Commits, and production readiness.
                </p>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h2 className="text-2xl font-semibold">Key features</h2>
                <ul className="mt-3 space-y-2 text-muted-foreground">
                  <li>Structured markdown journal with auto-save and file attachment support.</li>
                  <li>Research watchlist module for tracking external sources.</li>
                  <li>Natural language queries over personal content via an AI layer.</li>
                  <li>Optional Git connector enriching AI context with commit history.</li>
                  <li>Dual LLM adapter architecture: Ollama locally, Claude API in production.</li>
                  <li>Switchable AI provider via a single config property, no code changes needed.</li>
                  <li>JWT auth with in-memory access token and HttpOnly cookie refresh token rotation.</li>
                  <li>Rate limiting with Bucket4j, structured logging with Logback, and Spring Actuator health endpoint.</li>
                  <li>Waitlist system and LLM cost management for production readiness.</li>
                  <li>Daily pg_dump backup with rsync for file attachments and a documented restore procedure.</li>
                </ul>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h2 className="text-2xl font-semibold">Architecture highlights</h2>
                <ul className="mt-3 space-y-3 text-muted-foreground">
                  <li>
                    <span className="font-medium text-foreground">Port/Adapter pattern for LLM providers</span> —{" "}
                    <code className="text-xs bg-muted px-1 py-0.5 rounded">LlmPort</code> interface with{" "}
                    <code className="text-xs bg-muted px-1 py-0.5 rounded">OllamaLlmAdapter</code> and{" "}
                    <code className="text-xs bg-muted px-1 py-0.5 rounded">ClaudeApiAdapter</code>, switchable via
                    Spring <code className="text-xs bg-muted px-1 py-0.5 rounded">@ConditionalOnProperty</code>.
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Async AI endpoints</span> — Spring MVC{" "}
                    <code className="text-xs bg-muted px-1 py-0.5 rounded">DeferredResult</code> with a dedicated{" "}
                    <code className="text-xs bg-muted px-1 py-0.5 rounded">ThreadPoolTaskExecutor</code>, freeing
                    Tomcat threads during LLM calls.
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Full error handling strategy</span> — Axios
                    interceptor on the frontend, React Query retry policies, and React Error Boundaries.
                  </li>
                  <li>
                    <span className="font-medium text-foreground">API versioned</span> under{" "}
                    <code className="text-xs bg-muted px-1 py-0.5 rounded">/api/v1/</code> with MapStruct for DTO
                    mapping and Flyway for schema migrations.
                  </li>
                </ul>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h2 className="text-2xl font-semibold">Tech stack</h2>
                <div className="mt-4 space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wide">Backend</h3>
                    <ul className="flex flex-wrap gap-2" aria-label="Backend tech stack">
                      {["Java 21", "Spring Boot 3", "Spring Security 6", "JWT", "PostgreSQL 15", "Flyway", "MapStruct", "Bucket4j"].map(
                        (t) => (
                          <li key={t} className="px-3 py-1 rounded border border-border bg-muted text-sm">
                            {t}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wide">Frontend</h3>
                    <ul className="flex flex-wrap gap-2" aria-label="Frontend tech stack">
                      {["React 18", "Vite", "TypeScript", "Tailwind CSS", "React Query", "Zustand", "React Hook Form", "Zod"].map(
                        (t) => (
                          <li key={t} className="px-3 py-1 rounded border border-border bg-muted text-sm">
                            {t}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wide">AI</h3>
                    <ul className="flex flex-wrap gap-2" aria-label="AI tech stack">
                      {["Ollama (dev)", "Claude API (prod)", "Port/Adapter pattern"].map((t) => (
                        <li key={t} className="px-3 py-1 rounded border border-border bg-muted text-sm">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </article>

            <aside className="space-y-6 lg:sticky lg:top-24" aria-label="Project links">
              <Card className="p-6 bg-card border-border">
                <h2 className="text-xl font-semibold">Links</h2>

                <div className="mt-4 space-y-3">
                  <Button asChild variant="outline" className="w-full border-accent text-accent hover:bg-accent/10">
                    <a
                      href="https://github.com/Tanosv"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open SigilAI source code on GitHub in a new tab"
                    >
                      <Github className="w-4 h-4 mr-2" aria-hidden="true" />
                      GitHub
                    </a>
                  </Button>
                </div>

                <p className="mt-4 text-xs text-muted-foreground">
                  Live demo not yet available. Currently in active development 
                </p>
              </Card>
            </aside>
          </div>
        </section>

        <SiteFooter />
      </main>
    </div>
  );
}
