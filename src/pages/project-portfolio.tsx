import { Helmet } from "react-helmet-async";
import { ExternalLink, Github } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SiteHeader from "@/components/SiteHeader";

import { SITE_URL, OG_IMAGE_URL } from "@/lib/site";

export default function ProjectPortfolio() {
  const title = "Portfolio Project";
  const description =
    "This portfolio is a custom-built React application showcasing projects, skills, and contact. Designed and developed from scratch with a focus on accessibility, performance, and a unique visual identity.";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <html lang="en" />
        <title>{title}</title>

        <meta name="description" content={description} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={`${SITE_URL}/projects/portfolio`} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Portfolio, Project" />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${SITE_URL}/projects/portfolio`} />
        <meta property="og:image" content={OG_IMAGE_URL} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Portfolio, Project" />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={OG_IMAGE_URL} />
      </Helmet>

      <SiteHeader activeSection="projects" onHomeScroll={() => {}} />

      <main className="pt-16">
        <header className="border-b border-border">
          <div className="container mx-auto px-4 py-10">
            <h1 className="text-4xl md:text-5xl font-bold">Portfolio</h1>
            <p className="mt-3 text-muted-foreground max-w-2xl">
              You are looking at it. A custom React application built from scratch to showcase projects, skills, and a
              contact form.
            </p>
          </div>
        </header>

        <section aria-label="Project content" className="container mx-auto px-4 py-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] items-start">
            <article className="space-y-6">
              <Card className="p-6 bg-card border-border">
                <h2 className="text-2xl font-semibold">Overview</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  This portfolio started from a blank Vite project. Every component was written by hand, with no
                  template or theme applied on top. The goal was to produce something that felt personal and
                  intentional rather than generic.
                </p>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  The design draws from a dark medieval aesthetic with muted purples, warm accent tones, and ornate
                  CSS decorations paired with modern layout techniques for a result that stands out while staying
                  readable and accessible.
                </p>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h2 className="text-2xl font-semibold">Key features</h2>
                <ul className="mt-3 space-y-2 text-muted-foreground">
                  <li>Parallax background layers tied to scroll position.</li>
                  <li>Active section detection via IntersectionObserver logic.</li>
                  <li>Skill bubbles with floating animation and reduced-motion support.</li>
                  <li>Contact form with honeypot field, throttle guard, and Netlify Forms backend.</li>
                  <li>Hidden console quest with a secret reward panel.</li>
                  <li>Full SEO setup: Open Graph, Twitter Card, JSON-LD, canonical URLs.</li>
                  <li>Accessible navigation with skip-to-content link, aria labels, and keyboard support.</li>
                  <li>Custom 404 page with route-aware redirect handling.</li>
                </ul>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h2 className="text-2xl font-semibold">Tech stack</h2>
                <ul className="mt-3 flex flex-wrap gap-2" aria-label="Tech stack list">
                  {[
                    "React 18",
                    "TypeScript",
                    "Vite",
                    "Tailwind CSS",
                    "shadcn/ui",
                    "React Router v6",
                    "React Helmet Async",
                    "Lucide React",
                    "Netlify",
                  ].map((t) => (
                    <li key={t} className="px-3 py-1 rounded border border-border bg-muted text-sm">
                      {t}
                    </li>
                  ))}
                </ul>
              </Card>
            </article>

            <aside className="space-y-6 lg:sticky lg:top-24" aria-label="Project links">
              <Card className="p-6 bg-card border-border">
                <h2 className="text-xl font-semibold">Links</h2>

                <div className="mt-4 space-y-3">
                  <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    <a
                      href={SITE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open portfolio live site in a new tab"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" aria-hidden="true" />
                      Live site
                    </a>
                  </Button>

                  <Button asChild variant="outline" className="w-full border-accent text-accent hover:bg-accent/10">
                    <a
                      href="https://github.com/Tanosv/portfolio-new"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open portfolio source code on GitHub in a new tab"
                    >
                      <Github className="w-4 h-4 mr-2" aria-hidden="true" />
                      GitHub
                    </a>
                  </Button>
                </div>
              </Card>
            </aside>
          </div>
        </section>

        <footer className="py-10 border-t border-border">
          <div className="container mx-auto px-4 text-center text-muted-foreground">
            <p>© {new Date().getFullYear()} Tanguy Osvald. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
