import { Helmet } from "react-helmet-async";
import { ExternalLink, Github } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

import { SITE_URL, OG_IMAGE_URL } from "@/lib/site";

export default function ProjectPortfolio() {
  const { t } = useTranslation();
  const { lang = "fr" } = useParams<{ lang?: string }>();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <html lang={lang} />
        <title>{t("project_portfolio.meta_title")}</title>

        <meta name="description" content={t("project_portfolio.meta_description")} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={`${SITE_URL}/${lang}/projects/portfolio`} />
        <link rel="alternate" hrefLang="fr" href={`${SITE_URL}/fr/projects/portfolio`} />
        <link rel="alternate" hrefLang="en" href={`${SITE_URL}/en/projects/portfolio`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/fr/projects/portfolio`} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={t("project_portfolio.og_title")} />
        <meta property="og:description" content={t("project_portfolio.meta_description")} />
        <meta property="og:url" content={`${SITE_URL}/${lang}/projects/portfolio`} />
        <meta property="og:image" content={OG_IMAGE_URL} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t("project_portfolio.og_title")} />
        <meta name="twitter:description" content={t("project_portfolio.meta_description")} />
        <meta name="twitter:image" content={OG_IMAGE_URL} />
      </Helmet>

      <SiteHeader activeSection="projects" onHomeScroll={() => {}} />

      <main className="pt-16">
        <header className="border-b border-border">
          <div className="container mx-auto px-4 py-10">
            <h1 className="text-4xl md:text-5xl font-bold">Portfolio</h1>
            <p className="mt-3 text-muted-foreground max-w-2xl">
              {t("project_portfolio.header_subtitle")}
            </p>
          </div>
        </header>

        <section aria-label={t("common.project_content_aria")} className="container mx-auto px-4 py-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] items-start">
            <article className="space-y-6">
              <Card className="p-6 bg-card border-border">
                <h2 className="text-2xl font-semibold">{t("common.overview")}</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">{t("project_portfolio.overview_1")}</p>
                <p className="mt-3 text-muted-foreground leading-relaxed">{t("project_portfolio.overview_2")}</p>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h2 className="text-2xl font-semibold">{t("common.key_features")}</h2>
                <ul className="mt-3 space-y-2 text-muted-foreground">
                  <li>{t("project_portfolio.feature_1")}</li>
                  <li>{t("project_portfolio.feature_2")}</li>
                  <li>{t("project_portfolio.feature_3")}</li>
                  <li>{t("project_portfolio.feature_4")}</li>
                  <li>{t("project_portfolio.feature_5")}</li>
                  <li>{t("project_portfolio.feature_6")}</li>
                  <li>{t("project_portfolio.feature_7")}</li>
                  <li>{t("project_portfolio.feature_8")}</li>
                  <li>{t("project_portfolio.feature_9")}</li>
                </ul>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h2 className="text-2xl font-semibold">{t("project_portfolio.i18n_title")}</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">{t("project_portfolio.i18n_1")}</p>
                <p className="mt-3 text-muted-foreground leading-relaxed">{t("project_portfolio.i18n_2")}</p>
                <p className="mt-3 text-muted-foreground leading-relaxed">{t("project_portfolio.i18n_3")}</p>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h2 className="text-2xl font-semibold">{t("common.tech_stack")}</h2>
                <ul className="mt-3 flex flex-wrap gap-2" aria-label={t("common.tech_stack_list_aria")}>
                  {["React 18", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "React Router v6", "react-i18next", "i18next", "React Helmet Async", "Lucide React", "Netlify"].map((tech) => (
                    <li key={tech} className="px-3 py-1 rounded border border-border bg-muted text-sm">
                      {tech}
                    </li>
                  ))}
                </ul>
              </Card>
            </article>

            <aside className="space-y-6 lg:sticky lg:top-24" aria-label={t("common.project_links_aria")}>
              <Card className="p-6 bg-card border-border">
                <h2 className="text-xl font-semibold">{t("common.links")}</h2>
                <div className="mt-4 space-y-3">
                  <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    <a
                      href={SITE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t("project_portfolio.open_live_aria")}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" aria-hidden="true" />
                      {t("common.live_site")}
                    </a>
                  </Button>

                  <Button asChild variant="outline" className="w-full border-accent text-accent hover:bg-accent/10">
                    <a
                      href="https://github.com/Tanosv/portfolio-new"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t("project_portfolio.open_github_aria")}
                    >
                      <Github className="w-4 h-4 mr-2" aria-hidden="true" />
                      {t("common.github")}
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
