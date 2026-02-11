import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck } from "lucide-react";

import SiteHeader from "@/components/SiteHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SITE_URL } from "@/lib/config";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <html lang="en" />
        <title>Privacy Policy | Tanguy Osvald</title>
        <meta name="description" content="Privacy policy for the portfolio website of Tanguy Osvald." />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={`${SITE_URL}/privacy-policy`} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Privacy Policy | Tanguy Osvald" />
        <meta property="og:description" content="How this website handles personal data submitted through the contact form." />
        <meta property="og:url" content={`${SITE_URL}/privacy-policy`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Privacy Policy | Tanguy Osvald" />
        <meta name="twitter:description" content="How this website handles personal data submitted through the contact form." />
      </Helmet>

      <SiteHeader activeSection="home" onHomeScroll={() => {}} />

      <main className="pt-16">
        <header className="border-b border-border">
          <div className="container mx-auto px-4 py-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-background/40 px-4 py-2 backdrop-blur">
              <ShieldCheck className="h-4 w-4 text-accent" aria-hidden="true" />
              <span className="text-sm text-muted-foreground">Policy</span>
            </div>

            <h1 className="mt-5 text-4xl md:text-5xl font-bold">Privacy Policy</h1>
            <p className="mt-3 text-muted-foreground max-w-2xl">
              This page explains what data you share through the contact form, why it is processed, and how you can request deletion.
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

        <section aria-label="Privacy policy content" className="container mx-auto px-4 py-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] items-start">
            <article className="space-y-6">
              <Card className="p-6 bg-card border-border">
                <h2 className="text-2xl font-semibold">Data collection</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  This website collects personal data only through the contact form. The data includes your name, your email address,
                  and the content of your message.
                </p>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h2 className="text-2xl font-semibold">Purpose of processing</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Your data is used only to reply to your message and follow up on your request. No marketing emails are sent.
                  Your data is not sold and is not shared with third parties.
                </p>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h2 className="text-2xl font-semibold">Data storage and delivery</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Messages are transmitted through server side processing and delivered through Gmail SMTP. Data is kept only for the
                  time needed to handle the conversation and any related follow ups.
                </p>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h2 className="text-2xl font-semibold">Your rights</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  You can request access, correction, or deletion of your personal data. To do so, use the contact form on this website
                  and mention your request clearly in the message.
                </p>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h2 className="text-2xl font-semibold">Cookies</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  This website does not use tracking cookies, analytics tools, or advertising cookies.
                </p>
              </Card>
            </article>

            <aside className="space-y-6 lg:sticky lg:top-24" aria-label="Policy summary">
              <Card className="p-6 bg-card border-border">
                <h2 className="text-xl font-semibold">Summary</h2>

                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <li>Data collected, name, email, message.</li>
                  <li>Use, reply to your inquiry only.</li>
                  <li>Sharing, none.</li>
                  <li>Cookies, no tracking cookies.</li>
                  <li>Rights, request deletion through the contact form.</li>
                </ul>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h2 className="text-xl font-semibold">Related page</h2>
                <div className="mt-4">
                  <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link to="/legal-notice" aria-label="Open legal notice">
                      Legal Notice
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
