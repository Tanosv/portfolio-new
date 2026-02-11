// src/components/SiteFooter.tsx
import { Link } from "react-router-dom";
import { GithubIcon, LinkedinIcon } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="py-10 border-t border-border relative">
      <div className="ornate-divider max-w-md mx-auto mb-6" aria-hidden="true" />

      <div className="container mx-auto px-4 text-center text-muted-foreground space-y-4">
        <div className="flex items-center justify-center gap-3">
          <a
            href="https://www.linkedin.com/in/tanguy-osv/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-muted/20 px-3 py-2 hover:bg-muted/30 transition-colors"
            aria-label="Open LinkedIn profile"
          >
            <LinkedinIcon className="h-4 w-4 text-accent" aria-hidden="true" />
            <span className="text-sm">LinkedIn</span>
          </a>

          <a
            href="https://github.com/Tanosv"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-muted/20 px-3 py-2 hover:bg-muted/30 transition-colors"
            aria-label="Open GitHub profile"
          >
            <GithubIcon className="h-4 w-4 text-accent" aria-hidden="true" />
            <span className="text-sm">GitHub</span>
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <Link to="/legal-notice" className="hover:text-foreground transition-colors">
            Legal Notice
          </Link>
          <span className="text-primary-300" aria-hidden="true">
            •
          </span>
          <Link to="/privacy-policy" className="hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
        </div>

        <p>© 2026 Tanguy Osvald. All rights reserved.</p>
      </div>
    </footer>
  );
}
