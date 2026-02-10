import { Helmet } from "react-helmet-async";
import { ExternalLink, Github } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SiteHeader from "@/components/SiteHeader";

const SITE_URL = "https://yourdomain.com";
const OG_IMAGE_URL = "https://yourdomain.com/og.png";

export default function ProjectClimatserv17() {
  const title = "ClimatServ 17, Project, Tanguy Osvald";
  const description =
    "ClimatServ 17 is a production website for a heating and climate services company, built with accessibility, SEO structure, and clear service presentation.";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <html lang="en" />
        <title>{title}</title>

        <meta name="description" content={description} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={`${SITE_URL}/projects/climatserv17`} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="ClimatServ 17, Project" />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${SITE_URL}/projects/climatserv17`} />
        <meta property="og:image" content={OG_IMAGE_URL} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ClimatServ 17, Project" />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={OG_IMAGE_URL} />
      </Helmet>

      <SiteHeader activeSection="projects" onHomeScroll={() => {}} />

      <main className="pt-16">
        <header className="border-b border-border">
          <div className="container mx-auto px-4 py-10">
            <h1 className="text-4xl md:text-5xl font-bold">ClimatServ 17</h1>
            <p className="mt-3 text-muted-foreground max-w-2xl">
              Professional website for a heating and climate services company.
            </p>
          </div>
        </header>

        <section aria-label="Project content" className="container mx-auto px-4 py-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] items-start">
            <article className="space-y-6">
              <Card className="p-6 bg-card border-border">
                <h2 className="text-2xl font-semibold">Overview</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  ClimatServ 17 is a production site designed to present services clearly and convert visitors into contact
                  requests. The project focuses on navigation clarity, semantic structure, and an accessible layout for
                  mobile and desktop users.
                </p>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  The content structure supports SEO fundamentals, with headings aligned to page intent and clean internal
                  linking. The contact flow stays simple and reliable.
                </p>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h2 className="text-2xl font-semibold">Key features</h2>
                <ul className="mt-3 space-y-2 text-muted-foreground">
                  <li>Clear service presentation and structured navigation.</li>
                  <li>Responsive layout built for real clients and real devices.</li>
                  <li>Accessible form labels and predictable focus behavior.</li>
                  <li>SEO oriented structure and content hierarchy.</li>
                </ul>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h2 className="text-2xl font-semibold">Tech stack</h2>
                <ul className="mt-3 flex flex-wrap gap-2" aria-label="Tech stack list">
                  {["HTML", "CSS", "TypeScript", "Tailwind"].map((t) => (
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
                      href="https://climatserv17.netlify.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open ClimatServ 17 live site in a new tab"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" aria-hidden="true" />
                      Live site
                    </a>
                  </Button>

                  <Button asChild variant="outline" className="w-full border-accent text-accent hover:bg-accent/10">
                    <a
                      href="https://github.com/Aurel1407/ClimatServ17"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open ClimatServ 17 source code on GitHub in a new tab"
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
