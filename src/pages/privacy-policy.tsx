import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SITE_URL } from "@/lib/site";

export default function PrivacyPolicy() {
  const { t } = useTranslation();
  const { lang = "fr" } = useParams<{ lang?: string }>();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <html lang={lang} />
        <title>{t("privacy.meta_title")}</title>
        <meta name="description" content={t("privacy.meta_description")} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={`${SITE_URL}/${lang}/privacy-policy`} />
        <link rel="alternate" hrefLang="fr" href={`${SITE_URL}/fr/privacy-policy`} />
        <link rel="alternate" hrefLang="en" href={`${SITE_URL}/en/privacy-policy`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/fr/privacy-policy`} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={t("privacy.og_title")} />
        <meta property="og:description" content={t("privacy.og_description")} />
        <meta property="og:url" content={`${SITE_URL}/${lang}/privacy-policy`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t("privacy.og_title")} />
        <meta name="twitter:description" content={t("privacy.og_description")} />
      </Helmet>

      <SiteHeader activeSection="home" onHomeScroll={() => {}} />

      <main className="pt-16">
        <header className="border-b border-border">
          <div className="container mx-auto px-4 py-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-background/40 px-4 py-2 backdrop-blur">
              <ShieldCheck className="h-4 w-4 text-accent" aria-hidden="true" />
              <span className="text-sm text-muted-foreground">{t("privacy.badge")}</span>
            </div>

            <h1 className="mt-5 text-4xl md:text-5xl font-bold">{t("privacy.title")}</h1>
            <p className="mt-3 text-muted-foreground max-w-2xl">{t("privacy.subtitle")}</p>

            <div className="mt-7">
              <Button asChild variant="outline" className="border-accent/40 text-accent hover:bg-accent/10">
                <Link to={`/${lang}`} aria-label={t("privacy.back_to_home")}>
                  <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
                  {t("privacy.back_to_home")}
                </Link>
              </Button>
            </div>
          </div>
        </header>

        <section aria-label={t("privacy.content_aria")} className="container mx-auto px-4 py-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] items-start">
            <article className="space-y-6">
              <Card className="p-6 bg-card border-border">
                <h2 className="text-2xl font-semibold">{t("privacy.collection_title")}</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">{t("privacy.collection_text")}</p>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h2 className="text-2xl font-semibold">{t("privacy.purpose_title")}</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">{t("privacy.purpose_text")}</p>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h2 className="text-2xl font-semibold">{t("privacy.storage_title")}</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">{t("privacy.storage_text")}</p>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h2 className="text-2xl font-semibold">{t("privacy.rights_title")}</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">{t("privacy.rights_text")}</p>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h2 className="text-2xl font-semibold">{t("privacy.cookies_title")}</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">{t("privacy.cookies_text")}</p>
              </Card>
            </article>

            <aside className="space-y-6 lg:sticky lg:top-24" aria-label={t("privacy.summary_aria")}>
              <Card className="p-6 bg-card border-border">
                <h2 className="text-xl font-semibold">{t("privacy.summary_title")}</h2>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <li>{t("privacy.summary_data")}</li>
                  <li>{t("privacy.summary_use")}</li>
                  <li>{t("privacy.summary_sharing")}</li>
                  <li>{t("privacy.summary_cookies")}</li>
                  <li>{t("privacy.summary_rights")}</li>
                </ul>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h2 className="text-xl font-semibold">{t("privacy.related_title")}</h2>
                <div className="mt-4">
                  <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link to={`/${lang}/legal-notice`} aria-label={t("privacy.related_link_aria")}>
                      {t("privacy.related_link")}
                    </Link>
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
