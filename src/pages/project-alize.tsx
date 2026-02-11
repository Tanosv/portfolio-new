import { Helmet } from "react-helmet-async";
import { ExternalLink, Github } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SiteHeader from "@/components/SiteHeader";
import { SITE_URL } from "@/lib/config"

export default function ProjectAlize() {
  const title = "Alizé Project";
  const description =
    "Alizé is a web application focused on coastal conditions and outdoor planning. It aggregates tide and weather data into a clear interface.";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <html lang="en" />
        <title>{title}</title>

        <meta name="description" content={description} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={`${SITE_URL}/projects/alize`} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Alizé, Project" />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${SITE_URL}/projects/alize`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Alizé, Project" />
        <meta name="twitter:description" content={description} />
      </Helmet>

      <SiteHeader activeSection="projects" onHomeScroll={() => {}} />

      <main className="pt-16">
        <header className="border-b border-border">
          <div className="container mx-auto px-4 py-10">
            <h1 className="text-4xl md:text-5xl font-bold">Alizé</h1>
            <p className="mt-3 text-muted-foreground max-w-2xl">
              Web application focused on coastal conditions and outdoor planning.
            </p>
          </div>
        </header>

        <section aria-label="Screenshots" className="container mx-auto px-4 pt-14">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold">Screenshots</h2>
            <p className="mt-2 text-muted-foreground">
              Desktop and mobile views of the beaches listing screen.
            </p>
          </div>

          <Card className="p-6 md:p-8 bg-card/60 border-border">
            <div className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr] items-center">
              <figure className="space-y-4">
                <div className="rounded-xl overflow-hidden border border-border bg-card shadow-lg">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
                    <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" aria-hidden="true" />
                    <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" aria-hidden="true" />
                    <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" aria-hidden="true" />
                    <span className="ml-3 text-xs text-muted-foreground">Desktop view</span>
                  </div>

                  <img
                    src="/images/projects/Screen_Alize_Big.webp"
                    alt="Alizé desktop interface showing beach cards with tide and location data"
                    className="w-full h-auto object-contain lg:h-[420px] lg:object-cover lg:object-top"
                    loading="lazy"
                  />
                </div>

              </figure>


              <figure className="space-y-4 flex flex-col items-center">
              <div className="w-full max-w-[320px]">
                <div className="rounded-2xl border border-border bg-card/60 shadow-lg p-4">
                  <img
                    src="/images/projects/Screen_Alize_Small.webp"
                    alt="Alizé mobile interface showing stacked beach cards with tide and tags"
                    className="w-full h-auto object-contain scale-[1.02] rounded-3xl"
                    loading="lazy"
                  />
                </div>
              </div>

              <figcaption className="text-sm text-muted-foreground text-center">
                Mobile view
              </figcaption>
            </figure>
            </div>
          </Card>
        </section>

        <section aria-label="Project content" className="container mx-auto px-4 py-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] items-start">
            <article className="space-y-6">
              <Card className="p-6 bg-card border-border">
                <h2 className="text-2xl font-semibold">Overview</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Alizé helps users plan coastal activities by bringing key conditions into a single interface. The app
                  aggregates tide data, weather conditions, and location context, then presents it in a way that supports
                  quick decisions.
                </p>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  The project focuses on strong typing, clean component structure, and maintainable data fetching. The UI
                  stays readable on mobile and desktop, with consistent spacing and predictable navigation.
                </p>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h2 className="text-2xl font-semibold">Key features</h2>
                <ul className="mt-3 space-y-2 text-muted-foreground">
                  <li>Tide and weather data in one place.</li>
                  <li>Location based views and clear summaries.</li>
                  <li>Responsive layout and reusable UI components.</li>
                  <li>Structured data fetching with predictable states.</li>
                </ul>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h2 className="text-2xl font-semibold">Tech stack</h2>
                <ul className="mt-3 flex flex-wrap gap-2" aria-label="Tech stack list">
                  {["React", "TypeScript", "Tailwind", "API integration"].map((t) => (
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
                      href="https://alize.netlify.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open Alizé live site in a new tab"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" aria-hidden="true" />
                      Live site
                    </a>
                  </Button>

                  <Button asChild variant="outline" className="w-full border-accent text-accent hover:bg-accent/10">
                    <a
                      href="https://github.com/Tanosv/Tanosv-alize-coast-guide"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open Alizé source code on GitHub in a new tab"
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
            <p>© 2026 Tanguy Osvald. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
