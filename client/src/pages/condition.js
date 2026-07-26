import icon from "../images/icon.png";
import { Link } from "react-router-dom";
import Config from "./config.json";
import { Helmet } from "react-helmet";
import { Container, Breadcrumb } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const CANONICAL = Config.SITE_DOMAIN + "/conditions";

const Conditions = () => {
  const { t } = useTranslation();
  const TITLE = t("condition.titre_meta") + " | " + Config.SITE_TITLE;
  const DESC = t("condition.titre_meta");
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
          <Breadcrumb.Item active> {t("condition.titre_meta")}</Breadcrumb.Item>
        </Breadcrumb>
        <h1 className="form-title"> {t("condition.titre_meta")}</h1>
        <div className="pb-2">
          <h4>{t("condition.presentation_titre")}</h4>
          <p>
            {t("condition.presentation_text")}
          </p>
        </div>
        <div className="pb-2">
          <h4>{t("condition.objet_titre")}</h4>
          <p>
            {t("condition.objet_text")}
          </p>
        </div>
        <div className="pb-2">
          <h4>{t("condition.services_titre")}</h4>
          <p>
            {t("condition.services_text1")}
          </p>
          <p>
            {t("condition.services_text2")}
          </p>
        </div>
        <div className="pb-2">
          <h4>{t("condition.acces_titre")}</h4>
          <p>
            {t("condition.acces_text")}
          </p>
        </div>
        <div className="pb-2">
          <h4>{t("condition.resp_client_titre")}</h4>
          <p>
            {t("condition.resp_client_text1")}
          </p>
          <p>
            {t("condition.resp_client_text2")}
          </p>
        </div>
        <div className="pb-2">
          <h4>{t("condition.resp_df_titre")}</h4>
          <p>
            {t("condition.resp_df_text1")}
          </p>
          <p>
            {t("condition.resp_df_text2")}
          </p>
        </div>
        <div className="pb-2">
          <h4>{t("condition.propriete_titre")}</h4>
          <p>
            {t("condition.propriete_text1")}
          </p>
          <p>
            {t("condition.propriete_text2")}
          </p>
        </div>
        <div className="pb-2">
          <h4>{t("condition.suivi_titre")}</h4>
          <p>
            {t("condition.suivi_text")}
          </p>
        </div>
        <div className="pb-2">
          <h4>{t("condition.confidentialite_titre")}</h4>
          <p>
            {t("condition.confidentialite_text")}
          </p>
        </div>
        <div className="pb-2">
          <h4>{t("condition.financieres_titre")}</h4>
          <p>
            {t("condition.financieres_text")}
          </p>
        </div>
        <div className="pb-2">
          <h4>{t("condition.legales_titre")}</h4>
          <p>
            {t("condition.legales_text")}
          </p>
        </div>
        <div className="pb-3">
          <h4>{t("condition.garantie_titre")}</h4>
          <p>
            {t("condition.garantie_text")}
          </p>
        </div>
      </Container>
    </>
  );
};

export default Conditions;
