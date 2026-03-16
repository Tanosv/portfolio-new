import { Helmet } from "react-helmet-async";
import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

import { SITE_URL, OG_IMAGE_URL } from "@/lib/site";

export default function ProjectClimatserv17() {
  const { t } = useTranslation();
  const { lang = "fr" } = useParams<{ lang?: string }>();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <html lang={lang} />
        <title>{t("project_climatserv.meta_title")}</title>

        <meta name="description" content={t("project_climatserv.meta_description")} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={`${SITE_URL}/${lang}/projects/climatserv17`} />
        <link rel="alternate" hrefLang="fr" href={`${SITE_URL}/fr/projects/climatserv17`} />
        <link rel="alternate" hrefLang="en" href={`${SITE_URL}/en/projects/climatserv17`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/fr/projects/climatserv17`} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={t("project_climatserv.og_title")} />
        <meta property="og:description" content={t("project_climatserv.meta_description")} />
        <meta property="og:url" content={`${SITE_URL}/${lang}/projects/climatserv17`} />
        <meta property="og:image" content={OG_IMAGE_URL} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t("project_climatserv.og_title")} />
        <meta name="twitter:description" content={t("project_climatserv.meta_description")} />
        <meta name="twitter:image" content={OG_IMAGE_URL} />
      </Helmet>

      <SiteHeader activeSection="projects" onHomeScroll={() => {}} />

      <main className="pt-16">
        <header className="border-b border-border">
          <div className="container mx-auto px-4 py-10">
            <h1 className="text-4xl md:text-5xl font-bold">ClimatServ 17</h1>
            <p className="mt-3 text-muted-foreground max-w-2xl">
              {t("project_climatserv.header_subtitle")}
            </p>
          </div>
        </header>

        <section aria-label={t("common.screenshots")} className="container mx-auto px-4 pt-14">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold">{t("common.screenshots")}</h2>
            <p className="mt-2 text-muted-foreground">{t("project_climatserv.screenshots_subtitle")}</p>
          </div>

          <Card className="p-6 md:p-8 bg-card/60 border-border">
            <div className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr] items-center">
              <figure className="space-y-4">
                <div className="rounded-xl overflow-hidden border border-border bg-card shadow-lg">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
                    <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" aria-hidden="true" />
                    <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" aria-hidden="true" />
                    <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" aria-hidden="true" />
                    <span className="ml-3 text-xs text-muted-foreground">{t("common.desktop_view")}</span>
                  </div>
                  <img
                    src="/images/projects/Screen_Climatserv17_Big.webp"
                    alt={t("project_climatserv.desktop_alt")}
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
                      alt={t("project_climatserv.mobile_alt")}
                      className="w-full h-auto object-contain scale-[1.02] rounded-3xl"
                      loading="lazy"
                    />
                  </div>
                </div>
                <figcaption className="text-sm text-muted-foreground text-center">
                  {t("common.mobile_view")}
                </figcaption>
              </figure>
            </div>
          </Card>
        </section>

        <section aria-label={t("common.project_content_aria")} className="container mx-auto px-4 py-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] items-start">
            <article className="space-y-6">
              <Card className="p-6 bg-card border-border">
                <h2 className="text-2xl font-semibold">{t("common.overview")}</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">{t("project_climatserv.overview_1")}</p>
                <p className="mt-3 text-muted-foreground leading-relaxed">{t("project_climatserv.overview_2")}</p>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h2 className="text-2xl font-semibold">{t("common.key_features")}</h2>
                <ul className="mt-3 space-y-2 text-muted-foreground">
                  <li>{t("project_climatserv.feature_1")}</li>
                  <li>{t("project_climatserv.feature_2")}</li>
                  <li>{t("project_climatserv.feature_3")}</li>
                  <li>{t("project_climatserv.feature_4")}</li>
                  <li>{t("project_climatserv.feature_5")}</li>
                </ul>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h2 className="text-2xl font-semibold">{t("common.tech_stack")}</h2>
                <ul className="mt-3 flex flex-wrap gap-2" aria-label={t("common.tech_stack_list_aria")}>
                  {["Next.js", "React", "TypeScript", "Tailwind", "Node.js", "Next.js API routes", "PostgreSQL", "Prisma"].map((tech) => (
                    <li key={tech} className="px-3 py-1 rounded border border-border bg-muted text-sm">
                      {tech}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {t("project_climatserv.tech_note")}
                </p>
              </Card>
            </article>

            <aside className="space-y-6 lg:sticky lg:top-24" aria-label={t("common.project_links_aria")}>
              <Card className="p-6 bg-card border-border">
                <h2 className="text-xl font-semibold">{t("common.links")}</h2>
                <div className="mt-4 space-y-3">
                  <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    <a
                      href="https://climatserv17.fr"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t("project_climatserv.open_live_aria")}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" aria-hidden="true" />
                      {t("common.live_site")}
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
