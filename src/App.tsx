import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollToTop from "./components/ScrollToTop";
import LangLayout from "./components/LangLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProjectAlize from "./pages/project-alize";
import ProjectBandaiNamco from "./pages/project-bandai-namco";
import ProjectClimatserv17 from "./pages/project-climatserv17";
import ProjectPortfolio from "./pages/project-portfolio";
import ProjectSigilAI from "./pages/project-sigilai";
import LegalNotice from "./pages/legal-notice";
import PrivacyPolicy from "./pages/privacy-policy";

function RootRedirect() {
  const stored = localStorage.getItem("i18n_lang");
  const lang = stored === "en" ? "en" : "fr";
  return <Navigate to={`/${lang}`} replace />;
}

const App = () => (
  <ErrorBoundary>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<RootRedirect />} />

          <Route path="/:lang" element={<LangLayout />}>
            <Route index element={<Index />} />
            <Route path="projects/alize" element={<ProjectAlize />} />
            <Route path="projects/climatserv17" element={<ProjectClimatserv17 />} />
            <Route path="projects/bandai-namco" element={<ProjectBandaiNamco />} />
            <Route path="projects/portfolio" element={<ProjectPortfolio />} />
            <Route path="projects/sigilai" element={<ProjectSigilAI />} />
            <Route path="legal-notice" element={<LegalNotice />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="*" element={<Navigate to="/fr" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </ErrorBoundary>
);

export default App;
