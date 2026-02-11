import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import SiteHeader from "@/components/SiteHeader";
import { SITE_URL } from "@/lib/config"
import SiteFooter from "@/components/SiteFooter";

export default function ProjectBandaiNamco() {
  const title = "Bandai Namco Internal API, Project, Tanguy Osvald";
  const description =
    "Internal API project developed during an internship, focused on backend architecture, data modeling, validation, and reliability. Details are confidential.";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <html lang="en" />
        <title>{title}</title>

        <meta name="description" content={description} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={`${SITE_URL}/projects/bandai-namco`} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Bandai Namco Internal API, Project" />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${SITE_URL}/projects/bandai-namco`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bandai Namco Internal API, Project" />
        <meta name="twitter:description" content={description} />
      </Helmet>

      <SiteHeader activeSection="projects" onHomeScroll={() => {}} />

      <main className="pt-16">
        <header className="border-b border-border">
          <div className="container mx-auto px-4 py-10">
            <h1 className="text-4xl md:text-5xl font-bold">Bandai Namco Internal API</h1>
            <p className="mt-3 text-muted-foreground max-w-2xl">
              Internal backend project developed during a professional internship.
            </p>
          </div>
        </header>

        <section aria-label="Project content" className="container mx-auto px-4 py-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] items-start">
            <article className="space-y-6">
              <Card className="p-6 bg-card border-border">
                <h2 className="text-2xl font-semibold">Overview</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  This project was built during an internship and involved building and maintaining an internal API. The API
                  exposed structured endpoints consumed by internal tools and workflows.
                </p>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  The work focused on backend architecture, data modeling, validation, documentation, and reliability, with
                  constraints typical of a professional environment. Source code and detailed specifications are not public
                  due to confidentiality.
                </p>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h2 className="text-2xl font-semibold">What you can evaluate</h2>
                <ul className="mt-3 space-y-2 text-muted-foreground">
                  <li>API design and endpoint consistency.</li>
                  <li>Validation and error handling practices.</li>
                  <li>Documentation quality and team workflow alignment.</li>
                  <li>Reliability focus and maintainable architecture.</li>
                </ul>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h2 className="text-2xl font-semibold">Tech stack</h2>
                <ul className="mt-3 flex flex-wrap gap-2" aria-label="Tech stack list">
                  {["Node.js", "TypeScript", "REST API", "Validation"].map((t) => (
                    <li key={t} className="px-3 py-1 rounded border border-border bg-muted text-sm">
                      {t}
                    </li>
                  ))}
                </ul>
              </Card>
            </article>

            <aside className="space-y-6 lg:sticky lg:top-24" aria-label="Links">
              <Card className="p-6 bg-card border-border">
                <h2 className="text-xl font-semibold">Links</h2>
                <p className="mt-3 text-muted-foreground">No public demo and no public repository, due to confidentiality.</p>
              </Card>
            </aside>
          </div>
        </section>

        <SiteFooter />
      </main>
    </div>
  );
}
