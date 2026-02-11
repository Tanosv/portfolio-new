import { Helmet } from "react-helmet-async";
import { ExternalLink, Github } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SiteHeader from "@/components/SiteHeader";
import { SITE_URL } from "@/lib/config"
import SiteFooter from "@/components/SiteFooter";

export default function ProjectClimatserv17() {
  const title = "Project ClimatServ 17";
  const description =
    "ClimatServ 17 is a production website for a heating and climate services company, built with clear service pages, accessibility basics, and SEO focused routing.";

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

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ClimatServ 17, Project" />
        <meta name="twitter:description" content={description} />
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

        <section aria-label="Screenshots" className="container mx-auto px-4 pt-14">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold">Screenshots</h2>
            <p className="mt-2 text-muted-foreground">
              Desktop and mobile views of the home page layout and content structure.
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
                    src="/images/projects/Screen_Climatserv17_Big.webp"
                    alt="ClimatServ 17 desktop interface showing the main layout and service sections"
                    className="w-full h-auto object-contain lg:h-[420px] lg:object-cover lg:object-top"
                    loading="lazy"
                  />
                </div>
              </figure>

              <figure className="space-y-4 flex flex-col items-center">
                <div className="w-full max-w-[320px]">
                  <div className="rounded-2xl border border-border bg-card/60 shadow-lg p-4">
                    <img
                      src="/images/projects/Screen_Climatserv17_Small.webp"
                      alt="ClimatServ 17 mobile interface showing the responsive layout and service blocks"
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
                  ClimatServ 17 is a production site built to present services clearly and convert visits into contact
                  requests. The work focuses on readable navigation, semantic structure, and a responsive layout for
                  mobile and desktop.
                </p>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Next.js routing supports SEO friendly pages and clean internal linking. A PostgreSQL and Prisma backend
                  was implemented during development, then dropped since the client scope did not require a database.
                </p>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h2 className="text-2xl font-semibold">Key features</h2>
                <ul className="mt-3 space-y-2 text-muted-foreground">
                  <li>Service pages structured for search intent and easy scanning.</li>
                  <li>Responsive sections built for real client content updates.</li>
                  <li>Accessible form labels, focus states, and clear calls to action.</li>
                  <li>SEO friendly routing, headings, and internal linking.</li>
                  <li>API routes and database layer prototyped during development.</li>
                </ul>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h2 className="text-2xl font-semibold">Tech stack</h2>
                <ul className="mt-3 flex flex-wrap gap-2" aria-label="Tech stack list">
                  {[
                    "Next.js",
                    "React",
                    "TypeScript",
                    "Tailwind",
                    "Node.js",
                    "Next.js API routes",
                    "PostgreSQL",
                    "Prisma",
                  ].map((t) => (
                    <li key={t} className="px-3 py-1 rounded border border-border bg-muted text-sm">
                      {t}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  Database and Prisma were developed during the build, then removed since the final scope did not need it.
                </p>
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

        <SiteFooter />
      </main>
    </div>
  );
}
