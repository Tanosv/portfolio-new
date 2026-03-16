import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const location = useLocation();
  const { lang = "fr" } = useParams<{ lang?: string }>();
  const { t } = useTranslation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e1327] px-6">
      <div className="text-center max-w-xl">
        <h1 className="text-6xl font-extrabold text-orange-400 mb-6">
          404
        </h1>

        <img
          src="/images/projects/404-hero.png"
          alt="Sleeping red panda illustration"
          className="mx-auto w-64 md:w-80 mb-8"
        />

        <p className="text-lg text-gray-200 mb-8 leading-relaxed">
          {t("not_found.message")}
        </p>

        <Link
          to={`/${lang}`}
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          {t("not_found.back_to_home")}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
