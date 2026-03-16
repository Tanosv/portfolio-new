import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

import { SITE_URL, OG_IMAGE_URL } from "@/lib/site";

export default function ProjectBandaiNamco() {
  const { t } = useTranslation();
  const { lang = "fr" } = useParams<{ lang?: string }>();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <html lang={lang} />
        <title>{t("project_bandai.meta_title")}</title>

        <meta name="description" content={t("project_bandai.meta_description")} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={`${SITE_URL}/${lang}/projects/bandai-namco`} />
        <link rel="alternate" hrefLang="fr" href={`${SITE_URL}/fr/projects/bandai-namco`} />
        <link rel="alternate" hrefLang="en" href={`${SITE_URL}/en/projects/bandai-namco`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/fr/projects/bandai-namco`} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={t("project_bandai.og_title")} />
        <meta property="og:description" content={t("project_bandai.meta_description")} />
        <meta property="og:url" content={`${SITE_URL}/${lang}/projects/bandai-namco`} />
        <meta property="og:image" content={OG_IMAGE_URL} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t("project_bandai.og_title")} />
        <meta name="twitter:description" content={t("project_bandai.meta_description")} />
        <meta name="twitter:image" content={OG_IMAGE_URL} />
      </Helmet>

      <SiteHeader activeSection="projects" onHomeScroll={() => {}} />

      <main className="pt-16">
        <header className="border-b border-border">
          <div className="container mx-auto px-4 py-10">
            <h1 className="text-4xl md:text-5xl font-bold">Bandai Namco Internal API</h1>
            <p className="mt-3 text-muted-foreground max-w-2xl">
              {t("project_bandai.header_subtitle")}
            </p>
          </div>
        </header>

        <section aria-label={t("common.project_content_aria")} className="container mx-auto px-4 py-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] items-start">
            <article className="space-y-6">
              <Card className="p-6 bg-card border-border">
                <h2 className="text-2xl font-semibold">{t("common.overview")}</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">{t("project_bandai.overview_1")}</p>
                <p className="mt-3 text-muted-foreground leading-relaxed">{t("project_bandai.overview_2")}</p>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h2 className="text-2xl font-semibold">{t("project_bandai.evaluate_title")}</h2>
                <ul className="mt-3 space-y-2 text-muted-foreground">
                  <li>{t("project_bandai.evaluate_1")}</li>
                  <li>{t("project_bandai.evaluate_2")}</li>
                  <li>{t("project_bandai.evaluate_3")}</li>
                  <li>{t("project_bandai.evaluate_4")}</li>
                </ul>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h2 className="text-2xl font-semibold">{t("common.tech_stack")}</h2>
                <ul className="mt-3 flex flex-wrap gap-2" aria-label={t("common.tech_stack_list_aria")}>
                  {["Node.js", "TypeScript", "REST API", "Validation"].map((tech) => (
                    <li key={tech} className="px-3 py-1 rounded border border-border bg-muted text-sm">
                      {tech}
                    </li>
                  ))}
                </ul>
              </Card>
            </article>

            <aside className="space-y-6 lg:sticky lg:top-24" aria-label={t("project_bandai.links_aria")}>
              <Card className="p-6 bg-card border-border">
                <h2 className="text-xl font-semibold">{t("common.links")}</h2>
                <p className="mt-3 text-muted-foreground">{t("project_bandai.no_links")}</p>
              </Card>
            </aside>
          </div>
        </section>

        <SiteFooter />
      </main>
    </div>
  );
}
