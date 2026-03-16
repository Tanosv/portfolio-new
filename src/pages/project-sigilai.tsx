import { Helmet } from "react-helmet-async";
import { useTranslation, Trans } from "react-i18next";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

import { SITE_URL, OG_IMAGE_URL } from "@/lib/site";

const codeClass = "text-xs bg-muted px-1 py-0.5 rounded";

export default function ProjectSigilAI() {
  const { t } = useTranslation();
  const { lang = "fr" } = useParams<{ lang?: string }>();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <html lang={lang} />
        <title>{t("project_sigilai.meta_title")}</title>

        <meta name="description" content={t("project_sigilai.meta_description")} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={`${SITE_URL}/${lang}/projects/sigilai`} />
        <link rel="alternate" hrefLang="fr" href={`${SITE_URL}/fr/projects/sigilai`} />
        <link rel="alternate" hrefLang="en" href={`${SITE_URL}/en/projects/sigilai`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/fr/projects/sigilai`} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={t("project_sigilai.og_title")} />
        <meta property="og:description" content={t("project_sigilai.meta_description")} />
        <meta property="og:url" content={`${SITE_URL}/${lang}/projects/sigilai`} />
        <meta property="og:image" content={OG_IMAGE_URL} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t("project_sigilai.og_title")} />
        <meta name="twitter:description" content={t("project_sigilai.meta_description")} />
        <meta name="twitter:image" content={OG_IMAGE_URL} />
      </Helmet>

      <SiteHeader activeSection="projects" onHomeScroll={() => {}} />

      <main className="pt-16">
        <header className="border-b border-border">
          <div className="container mx-auto px-4 py-10">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-4xl md:text-5xl font-bold">SigilAI</h1>
              <span className="px-3 py-1 rounded-full border border-accent/40 bg-accent/10 text-accent text-sm font-medium">
                {t("project_sigilai.in_development_badge")}
              </span>
            </div>
            <p className="mt-3 text-muted-foreground max-w-2xl">
              {t("project_sigilai.header_subtitle")}
            </p>
          </div>
        </header>

        <section aria-label={t("common.project_content_aria")} className="container mx-auto px-4 py-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] items-start">
            <article className="space-y-6">
              <Card className="p-6 bg-card border-border">
                <h2 className="text-2xl font-semibold">{t("common.overview")}</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">{t("project_sigilai.overview_1")}</p>
                <p className="mt-3 text-muted-foreground leading-relaxed">{t("project_sigilai.overview_2")}</p>
                <p className="mt-3 text-muted-foreground leading-relaxed">{t("project_sigilai.overview_3")}</p>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h2 className="text-2xl font-semibold">{t("common.key_features")}</h2>
                <ul className="mt-3 space-y-2 text-muted-foreground">
                  <li>{t("project_sigilai.feature_1")}</li>
                  <li>{t("project_sigilai.feature_2")}</li>
                  <li>{t("project_sigilai.feature_3")}</li>
                  <li>{t("project_sigilai.feature_4")}</li>
                  <li>{t("project_sigilai.feature_5")}</li>
                  <li>{t("project_sigilai.feature_6")}</li>
                  <li>{t("project_sigilai.feature_7")}</li>
                  <li>{t("project_sigilai.feature_8")}</li>
                  <li>{t("project_sigilai.feature_9")}</li>
                  <li>{t("project_sigilai.feature_10")}</li>
                </ul>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h2 className="text-2xl font-semibold">{t("project_sigilai.arch_title")}</h2>
                <ul className="mt-3 space-y-3 text-muted-foreground">
                  <li>
                    <span className="font-medium text-foreground">{t("project_sigilai.arch_1_title")}</span>
                    {" — "}
                    <Trans
                      i18nKey="project_sigilai.arch_1_desc"
                      components={[
                        <code key="0" className={codeClass} />,
                        <code key="1" className={codeClass} />,
                        <code key="2" className={codeClass} />,
                        <code key="3" className={codeClass} />,
                      ]}
                    />
                  </li>
                  <li>
                    <span className="font-medium text-foreground">{t("project_sigilai.arch_2_title")}</span>
                    {" — "}
                    <Trans
                      i18nKey="project_sigilai.arch_2_desc"
                      components={[
                        <code key="0" className={codeClass} />,
                        <code key="1" className={codeClass} />,
                      ]}
                    />
                  </li>
                  <li>
                    <span className="font-medium text-foreground">{t("project_sigilai.arch_3_title")}</span>
                    {" — "}
                    {t("project_sigilai.arch_3_desc")}
                  </li>
                  <li>
                    <span className="font-medium text-foreground">{t("project_sigilai.arch_4_title")}</span>
                    {" — "}
                    <Trans
                      i18nKey="project_sigilai.arch_4_desc"
                      components={[
                        <code key="0" className={codeClass} />,
                      ]}
                    />
                  </li>
                </ul>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h2 className="text-2xl font-semibold">{t("common.tech_stack")}</h2>
                <div className="mt-4 space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wide">{t("common.backend")}</h3>
                    <ul className="flex flex-wrap gap-2" aria-label={`${t("common.backend")} ${t("common.tech_stack_list_aria")}`}>
                      {["Java 21", "Spring Boot 3", "Spring Security 6", "JWT", "PostgreSQL 15", "Flyway", "MapStruct", "Bucket4j"].map((tech) => (
                        <li key={tech} className="px-3 py-1 rounded border border-border bg-muted text-sm">{tech}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wide">{t("common.frontend")}</h3>
                    <ul className="flex flex-wrap gap-2" aria-label={`${t("common.frontend")} ${t("common.tech_stack_list_aria")}`}>
                      {["React 18", "Vite", "TypeScript", "Tailwind CSS", "React Query", "Zustand", "React Hook Form", "Zod"].map((tech) => (
                        <li key={tech} className="px-3 py-1 rounded border border-border bg-muted text-sm">{tech}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wide">{t("common.ai")}</h3>
                    <ul className="flex flex-wrap gap-2" aria-label={`${t("common.ai")} ${t("common.tech_stack_list_aria")}`}>
                      {["Ollama (dev)", "Claude API (prod)", "Port/Adapter pattern"].map((tech) => (
                        <li key={tech} className="px-3 py-1 rounded border border-border bg-muted text-sm">{tech}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </article>

            <aside className="space-y-6 lg:sticky lg:top-24" aria-label={t("common.project_links_aria")}>
              <Card className="p-6 bg-card border-border">
                <h2 className="text-xl font-semibold">{t("common.links")}</h2>
                <p className="mt-4 text-xs text-muted-foreground">
                  {t("project_sigilai.no_demo")}
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
