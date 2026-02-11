import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";

const SITE_URL = "https://yourdomain.com";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Privacy Policy | Tanguy Osvald</title>
        <meta
          name="description"
          content="Privacy policy for the portfolio website of Tanguy Osvald."
        />
        <link rel="canonical" href={`${SITE_URL}/privacy-policy`} />
      </Helmet>

      <SiteHeader activeSection="home" onHomeScroll={() => {}} />

      <main className="pt-20">
        <div className="container mx-auto px-4 py-16 max-w-3xl space-y-10">
          <h1 className="text-4xl font-bold">Privacy Policy</h1>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Data Collection</h2>
            <p>
              This website collects personal data only through the contact form.
              The collected data may include your name, email address, and the
              content of your message.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Purpose of Data Processing</h2>
            <p>
              The data you provide is used solely to respond to your inquiry.
              It is not used for marketing purposes and is not sold or shared
              with third parties.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Data Storage</h2>
            <p>
              Messages submitted through the contact form are transmitted via
              secure server-side processing and delivered through Gmail SMTP.
              Data is stored only as long as necessary to handle the inquiry.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Your Rights</h2>
            <p>
              You have the right to request access, correction, or deletion of
              your personal data. To exercise these rights, please use the
              contact form available on this website.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Cookies</h2>
            <p>
              This website does not use tracking cookies, analytics tools,
              or advertising cookies.
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
