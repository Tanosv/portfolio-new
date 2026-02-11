import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, Scale, Globe, ShieldCheck } from "lucide-react";

import SiteHeader from "@/components/SiteHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SITE_URL } from "@/lib/config";

export default function LegalNotice() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <html lang="en" />
        <title>Legal Notice | Tanguy Osvald</title>
        <meta name="description" content="Legal notice for the portfolio website of Tanguy Osvald." />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={`${SITE_URL}/legal-notice`} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Legal Notice | Tanguy Osvald" />
        <meta property="og:description" content="Legal information about this website, its owner, and its hosting provider." />
        <meta property="og:url" content={`${SITE_URL}/legal-notice`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Legal Notice | Tanguy Osvald" />
        <meta name="twitter:description" content="Legal information about this website, its owner, and its hosting provider." />
      </Helmet>

      <SiteHeader activeSection="home" onHomeScroll={() => {}} />

      <main className="pt-16">
        <header className="border-b border-border">
          <div className="container mx-auto px-4 py-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-background/40 px-4 py-2 backdrop-blur">
              <Scale className="h-4 w-4 text-accent" aria-hidden="true" />
              <span className="text-sm text-muted-foreground">Legal</span>
            </div>

            <h1 className="mt-5 text-4xl md:text-5xl font-bold">Legal Notice</h1>
            <p className="mt-3 text-muted-foreground max-w-2xl">
              This page lists the website owner, hosting provider, and usage terms for this portfolio website.
            </p>

            <div className="mt-7">
              <Button asChild variant="outline" className="border-accent/40 text-accent hover:bg-accent/10">
                <Link to="/" aria-label="Back to home">
                  <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
                  Back to home
                </Link>
              </Button>
            </div>
          </div>
        </header>

        <section aria-label="Legal notice content" className="container mx-auto px-4 py-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] items-start">
            <article className="space-y-6">
              <Card className="p-6 bg-card border-border">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center border border-accent/20">
                    <ShieldCheck className="h-5 w-5 text-accent" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-2xl font-semibold">Website owner</h2>
                    <p className="mt-2 text-muted-foreground leading-relaxed">
                      Tanguy Osvald. Personal portfolio website. Contact is available through the contact form on this website.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card border-border">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center border border-accent/20">
                    <Globe className="h-5 w-5 text-accent" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-2xl font-semibold">Website</h2>
                    <p className="mt-2 text-muted-foreground leading-relaxed">{SITE_URL}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h2 className="text-2xl font-semibold">Hosting provider</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Netlify, Inc. 44 Montgomery Street, Suite 300, San Francisco, California 94104, United States.
                </p>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  https://www.netlify.com
                </p>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h2 className="text-2xl font-semibold">Intellectual property</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  All content on this website, including text, graphics, code, branding, and visual elements, is the exclusive
                  property of Tanguy Osvald unless otherwise stated.
                </p>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Any reproduction, distribution, modification, or use without prior written consent is prohibited.
                </p>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h2 className="text-2xl font-semibold">Liability</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  The information provided on this website is for informational purposes only. While efforts are made to ensure
                  accuracy, the website owner cannot guarantee that all information is complete or up to date.
                </p>
              </Card>
            </article>

            <aside className="space-y-6 lg:sticky lg:top-24" aria-label="Legal notice summary">
              <Card className="p-6 bg-card border-border">
                <h2 className="text-xl font-semibold">Quick summary</h2>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <li>Owner, Tanguy Osvald.</li>
                  <li>Hosting, Netlify.</li>
                  <li>Contact, contact form on this site.</li>
                  <li>Reuse, requires written consent.</li>
                </ul>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h2 className="text-xl font-semibold">Related page</h2>
                <div className="mt-4">
                  <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link to="/privacy-policy" aria-label="Open privacy policy">
                      Privacy Policy
                    </Link>
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
