import { useEffect } from "react";
import icon from "../images/icon.png";
import Config from "./config.json";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { Container, Breadcrumb, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useTranslation } from "react-i18next";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '', // Base URL of the Express backend
  withCredentials: true, // Allow sending cookies with requests
});

const CANONICAL = Config.SITE_DOMAIN + "/welcome";

const Welcome = () => {
  const { t } = useTranslation();
  const TITLE = t("welcome.titre_meta") + " | " + Config.SITE_TITLE;
  const DESC = t("welcome.titre_meta");


  const user = localStorage.getItem("user");
  const navigate = useNavigate(); // Use useNavigate hook outside of chngFn
  useEffect(() => {

    instance.get("/welcome").then((response) => {
      if (response.data.authorized === "true") {
      }
      else {
        navigate("/connexion");
        //neet to logging first
      }
    });
  }, [navigate]);

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
          <Breadcrumb.Item className="no-decoration" linkAs={Link} linkProps={{ to: "/" }}>
            {t("common.accueil")}
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{t("welcome.page_title")}</Breadcrumb.Item>
        </Breadcrumb>
        <Row>
          <Col>
            <h1>{t("welcome.bienvenue")} {user} </h1>
            <p>
              {t("welcome.instructions")}
            </p>
            <ul>
              <li>{t("welcome.instruction1")}</li>
              <li>{t("welcome.instruction2")}</li>
              <li>{t("welcome.instruction3")}</li>
            </ul>
          </Col>
        </Row>

        <Container
          fluid
          className="d-flex justify-content-center align-items-center flex-column welcome-cards-container"
        >
          <Row className="justify-content-center gap-2 gap-md-4">
            <Col xs="auto" sm="auto">
              <Link to="/gerer" className="modern-card-link">
                <div className="icon-wrapper">
                  <i className="fa-solid fa-calculator"></i>
                </div>
                <div className="card-title">{t("welcome.saisissez")}</div>
                <div className="bodyconnected">
                  {t("welcome.desc_saisissez")}
                </div>
              </Link>
            </Col>

            <Col xs="auto" sm="auto">
              <Link to="/declaration" className="modern-card-link">
                <div className="icon-wrapper">
                  <i className="fa-solid fa-print"></i>
                </div>
                <div className="card-title">{t("welcome.imprimer")}</div>
                <div className="bodyconnected">
                  {t("welcome.desc_imprimer")}
                </div>
              </Link>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default Welcome;
