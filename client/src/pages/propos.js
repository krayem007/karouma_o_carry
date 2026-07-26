import icon from "../images/icon.png";
import { Link } from "react-router-dom";
import Config from "./config.json";
import { Helmet } from "react-helmet";
import { Container, Breadcrumb } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const CANONICAL = Config.SITE_DOMAIN + "/apropos";

const Propos = () => {
  const { t } = useTranslation();
  const TITLE = t("propos.titre_meta") + " | " + Config.SITE_TITLE;
  const DESC = t("propos.titre_meta");
  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
        <link rel="canonical" href={CANONICAL} />
        <meta name="description" content={DESC} />
        <link rel="icon" href={icon} type="image/png" />
        <meta name="theme-color" content={Config.THEME_COLOR} />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
          integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <script
          type="module"
          src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
        ></script>
      </Helmet>
      <Container className="visualiser-page">
        <Breadcrumb>
          <Breadcrumb.Item className="no-decoration">
            <Link to="/">{t("common.accueil")}</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{t("propos.titre_meta")}</Breadcrumb.Item>
        </Breadcrumb>
        <h1 className="form-title">{t("propos.page_title")}</h1>
        <div className="pb-2">
          <p>
            {t("propos.intro1")}
          </p>
          <p>
            {t("propos.intro2")}
          </p>
        </div>
        <div className="pb-3">
          <h4>{t("propos.mission_titre")}</h4>
          <li className="li pb-1">
            {t("propos.mission1")}
          </li>
          <li className="li pb-1">
            {t("propos.mission2")}
          </li>
          <li className="li pb-1">
            {t("propos.mission3")}
          </li>
        </div>
        <div className="pb-2">
          <h4>{t("propos.fondateurs_titre")}</h4>
          <h5>{t("propos.fondateur1_titre")}</h5>
          <p>
            {t("propos.fondateur1_desc")}
          </p>
          <h5>{t("propos.fondateur2_titre")}</h5>
          <p>
            {t("propos.fondateur2_desc")}
          </p>
        </div>
        <div className="pb-3">
          <h4>{t("propos.pourquoi_titre")}</h4>

          <li className="li pb-1">
            {t("propos.pourquoi1")}
          </li>

          <li className="li pb-1">
            {t("propos.pourquoi2")}
          </li>
          <p>
            {t("propos.pourquoi3")}
          </p>
        </div>
      </Container>
    </>
  );
};

export default Propos;
