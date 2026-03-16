import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Scale, Globe, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SITE_URL } from "@/lib/site";

export default function LegalNotice() {
  const { t } = useTranslation();
  const { lang = "fr" } = useParams<{ lang?: string }>();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <html lang={lang} />
        <title>{t("legal.meta_title")}</title>
        <meta name="description" content={t("legal.meta_description")} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={`${SITE_URL}/${lang}/legal-notice`} />
        <link rel="alternate" hrefLang="fr" href={`${SITE_URL}/fr/legal-notice`} />
        <link rel="alternate" hrefLang="en" href={`${SITE_URL}/en/legal-notice`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/fr/legal-notice`} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={t("legal.og_title")} />
        <meta property="og:description" content={t("legal.og_description")} />
        <meta property="og:url" content={`${SITE_URL}/${lang}/legal-notice`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t("legal.og_title")} />
        <meta name="twitter:description" content={t("legal.og_description")} />
      </Helmet>

      <SiteHeader activeSection="home" onHomeScroll={() => {}} />

      <main className="pt-16">
        <header className="border-b border-border">
          <div className="container mx-auto px-4 py-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-background/40 px-4 py-2 backdrop-blur">
              <Scale className="h-4 w-4 text-accent" aria-hidden="true" />
              <span className="text-sm text-muted-foreground">{t("legal.badge")}</span>
            </div>

            <h1 className="mt-5 text-4xl md:text-5xl font-bold">{t("legal.title")}</h1>
            <p className="mt-3 text-muted-foreground max-w-2xl">{t("legal.subtitle")}</p>

            <div className="mt-7">
              <Button asChild variant="outline" className="border-accent/40 text-accent hover:bg-accent/10">
                <Link to={`/${lang}`} aria-label={t("legal.back_to_home")}>
                  <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
                  {t("legal.back_to_home")}
                </Link>
              </Button>
            </div>
          </div>
        </header>

        <section aria-label={t("legal.content_aria")} className="container mx-auto px-4 py-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] items-start">
            <article className="space-y-6">
              <Card className="p-6 bg-card border-border">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center border border-accent/20">
                    <ShieldCheck className="h-5 w-5 text-accent" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-2xl font-semibold">{t("legal.owner_title")}</h2>
                    <p className="mt-2 text-muted-foreground leading-relaxed">{t("legal.owner_text")}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card border-border">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center border border-accent/20">
                    <Globe className="h-5 w-5 text-accent" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-2xl font-semibold">{t("legal.website_title")}</h2>
                    <p className="mt-2 text-muted-foreground leading-relaxed">{SITE_URL}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h2 className="text-2xl font-semibold">{t("legal.hosting_title")}</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">{t("legal.hosting_text")}</p>
                <p className="mt-3 text-muted-foreground leading-relaxed">https://www.netlify.com</p>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h2 className="text-2xl font-semibold">{t("legal.ip_title")}</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">{t("legal.ip_text_1")}</p>
                <p className="mt-3 text-muted-foreground leading-relaxed">{t("legal.ip_text_2")}</p>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h2 className="text-2xl font-semibold">{t("legal.liability_title")}</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">{t("legal.liability_text")}</p>
              </Card>
            </article>

            <aside className="space-y-6 lg:sticky lg:top-24" aria-label={t("legal.summary_aria")}>
              <Card className="p-6 bg-card border-border">
                <h2 className="text-xl font-semibold">{t("legal.summary_title")}</h2>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <li>{t("legal.summary_owner")}</li>
                  <li>{t("legal.summary_hosting")}</li>
                  <li>{t("legal.summary_contact")}</li>
                  <li>{t("legal.summary_reuse")}</li>
                </ul>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h2 className="text-xl font-semibold">{t("legal.related_title")}</h2>
                <div className="mt-4">
                  <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link to={`/${lang}/privacy-policy`} aria-label={t("legal.related_link_aria")}>
                      {t("legal.related_link")}
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
