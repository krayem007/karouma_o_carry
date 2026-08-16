import icon from "../images/icon.png";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Config from "./config.json";
import { Helmet } from "react-helmet-async";
import { Collapse, Container, Breadcrumb } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const CANONICAL = Config.SITE_DOMAIN + "/Faq";


const Faq = () => {
  const { t } = useTranslation();
  const TITLE = t("faq.titre_meta") + " | " + Config.SITE_TITLE;
  const DESC = t("faq.titre_meta");
  const [openItems, setOpenItems] = useState([]);

  const toggleCollapse = (item) => {
    setOpenItems((prevOpenItems) => {
      const isOpen = prevOpenItems.includes(item);
      return isOpen
        ? prevOpenItems.filter((i) => i !== item) // Close item
        : [...prevOpenItems, item]; // Open item
    });
  };

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
          <Breadcrumb.Item active>{t("faq.page_title")}</Breadcrumb.Item>
        </Breadcrumb>

        <h1 className="form-title">{t("faq.page_title")}</h1>

        <div className="FAQ">
          <a
            onClick={() => toggleCollapse(1)}
            aria-controls="collapse-item-1"
            aria-expanded={openItems.includes(1)}
            href="#!"
            className="QES d-flex justify-content-between align-items-center py-3 border-bottom"
          >
            <span className="fw-bold">{t("faq.q1")}</span>
            <i className={`fas fa-chevron-${openItems.includes(1) ? 'up' : 'down'} text-muted`}></i>
          </a>
          <Collapse in={openItems.includes(1)} className="Collap">
            <div id="collapse-item" className="pt-2 pb-4 text-muted">
              {t("faq.a1")}
            </div>
          </Collapse>
        </div>

        <div className="FAQ">
          <a
            onClick={() => toggleCollapse(2)}
            aria-controls="collapse-item-2"
            aria-expanded={openItems.includes(2)}
            href="#!"
            className="QES d-flex justify-content-between align-items-center py-3 border-bottom"
          >
            <span className="fw-bold">{t("faq.q2")}</span>
            <i className={`fas fa-chevron-${openItems.includes(2) ? 'up' : 'down'} text-muted`}></i>
          </a>
          <Collapse in={openItems.includes(2)} className="Collap">
            <div id="collapse-item" className="pt-2 pb-4 text-muted">
              {t("faq.a2")}
            </div>
          </Collapse>
        </div>
        <div className="FAQ">
          <a
            onClick={() => toggleCollapse(3)}
            aria-controls="collapse-item-3"
            aria-expanded={openItems.includes(3)}
            href="#!"
            className="QES d-flex justify-content-between align-items-center py-3 border-bottom"
          >
            <span className="fw-bold">{t("faq.q3")}</span>
            <i className={`fas fa-chevron-${openItems.includes(3) ? 'up' : 'down'} text-muted`}></i>
          </a>
          <Collapse in={openItems.includes(3)} className="Collap">
            <div id="collapse-item" className="pt-2 pb-4 text-muted">
              {t("faq.a3")}
            </div>
          </Collapse>
        </div>
        <div className="FAQ">
          <a
            onClick={() => toggleCollapse(4)}
            aria-controls="collapse-item-4"
            aria-expanded={openItems.includes(4)}
            href="#!"
            className="QES d-flex justify-content-between align-items-center py-3 border-bottom"
          >
            <span className="fw-bold">{t("faq.q4")}</span>
            <i className={`fas fa-chevron-${openItems.includes(4) ? 'up' : 'down'} text-muted`}></i>
          </a>
          <Collapse in={openItems.includes(4)} className="Collap">
            <div id="collapse-item" className="pt-2 pb-4 text-muted">
              {t("faq.a4")}
            </div>
          </Collapse>
        </div>

        <div className="FAQ">
          <a
            onClick={() => toggleCollapse(5)}
            aria-controls="collapse-item-5"
            aria-expanded={openItems.includes(5)}
            href="#!"
            className="QES d-flex justify-content-between align-items-center py-3 border-bottom"
          >
            <span className="fw-bold">{t("faq.q5")}</span>
            <i className={`fas fa-chevron-${openItems.includes(5) ? 'up' : 'down'} text-muted`}></i>
          </a>
          <Collapse in={openItems.includes(5)} className="Collap">
            <div id="collapse-item" className="pt-2 pb-4 text-muted">
              {t("faq.a5")}
            </div>
          </Collapse>
        </div>
        <div className="FAQ">
          <a
            onClick={() => toggleCollapse(6)}
            aria-controls="collapse-item-6"
            aria-expanded={openItems.includes(6)}
            href="#!"
            className="QES d-flex justify-content-between align-items-center py-3 border-bottom"
          >
            <span className="fw-bold">{t("faq.q6")}</span>
            <i className={`fas fa-chevron-${openItems.includes(6) ? 'up' : 'down'} text-muted`}></i>
          </a>
          <Collapse in={openItems.includes(6)} className="Collap">
            <div id="collapse-item" className="pt-2 pb-4 text-muted">
              {t("faq.a6")}
            </div>
          </Collapse>
        </div>
        <div className="FAQ">
          <a
            onClick={() => toggleCollapse(7)}
            aria-controls="collapse-item-7"
            aria-expanded={openItems.includes(7)}
            href="#!"
            className="QES d-flex justify-content-between align-items-center py-3 border-bottom"
          >
            <span className="fw-bold">{t("faq.q7")}</span>
            <i className={`fas fa-chevron-${openItems.includes(7) ? 'up' : 'down'} text-muted`}></i>
          </a>
          <Collapse in={openItems.includes(7)} className="Collap">
            <div id="collapse-item" className="pt-2 pb-4 text-muted">
              {t("faq.a7")}
            </div>
          </Collapse>
        </div>
        <div className="FAQ">
          <a
            onClick={() => toggleCollapse(8)}
            aria-controls="collapse-item-8"
            aria-expanded={openItems.includes(8)}
            href="#!"
            className="QES d-flex justify-content-between align-items-center py-3 border-bottom"
          >
            <span className="fw-bold">{t("faq.q8")}</span>
            <i className={`fas fa-chevron-${openItems.includes(8) ? 'up' : 'down'} text-muted`}></i>
          </a>
          <Collapse in={openItems.includes(8)} className="Collap">
            <div id="collapse-item" className="pt-2 pb-4 text-muted">
              {t("faq.a8")}
            </div>
          </Collapse>
        </div>
        <div className="FAQ">
          <a
            onClick={() => toggleCollapse(9)}
            aria-controls="collapse-item-9"
            aria-expanded={openItems.includes(9)}
            href="#!"
            className="QES d-flex justify-content-between align-items-center py-3 border-bottom"
          >
            <span className="fw-bold">{t("faq.q9")}</span>
            <i className={`fas fa-chevron-${openItems.includes(9) ? 'up' : 'down'} text-muted`}></i>
          </a>
          <Collapse in={openItems.includes(9)} className="Collap">
            <div id="collapse-item" className="pt-2 pb-4 text-muted">
              {t("faq.a9")}
            </div>
          </Collapse>
        </div>
      </Container>
    </>
  );
};

export default Faq;
