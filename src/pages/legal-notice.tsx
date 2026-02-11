import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";

const SITE_URL = "https://yourdomain.com";

export default function LegalNotice() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Legal Notice | Tanguy Osvald</title>
        <meta
          name="description"
          content="Legal notice for the portfolio website of Tanguy Osvald."
        />
        <link rel="canonical" href={`${SITE_URL}/legal-notice`} />
      </Helmet>

      <SiteHeader activeSection="home" onHomeScroll={() => {}} />

      <main className="pt-20">
        <div className="container mx-auto px-4 py-16 max-w-3xl space-y-10">
          <h1 className="text-4xl font-bold">Legal Notice</h1>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Website Owner</h2>
            <p>Tanguy Osvald</p>
            <p>Status: Personal portfolio website</p>
            <p>
              Contact: Available via the contact form provided on this website
            </p>
            <p>Website: {SITE_URL}</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Hosting Provider</h2>
            <p>Netlify, Inc.</p>
            <p>44 Montgomery Street, Suite 300</p>
            <p>San Francisco, California 94104</p>
            <p>United States</p>
            <p>https://www.netlify.com</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, code,
              branding, and visual elements, is the exclusive property of
              Tanguy Osvald unless otherwise stated.
            </p>
            <p>
              Any reproduction, distribution, modification, or use without prior
              written consent is prohibited.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Liability</h2>
            <p>
              The information provided on this website is for informational
              purposes only. While efforts are made to ensure accuracy, the
              website owner cannot guarantee that all information is complete
              or up to date.
            </p>
          </section>

          <div className="pt-8">
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Back to home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
