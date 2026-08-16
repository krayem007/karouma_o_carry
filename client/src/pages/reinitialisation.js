import icon from "../images/icon.png";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Config from "./config.json";
import { Helmet } from "react-helmet-async";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  Container,
  Col,
  Row,
  Button,
  Form,
  Breadcrumb,
  Toast,
} from "react-bootstrap";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { getErrorMessage } from "../js/getErrorMessage";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '',
  withCredentials: true,
});

const CANONICAL = Config.SITE_DOMAIN + "/reinitialisation";

const Reinitialisation = () => {
  const { t } = useTranslation();
  const TITLE = t("reinit.titre_meta") + " | " + Config.SITE_TITLE;
  const DESC = t("reinit.titre_meta");
  const [validated, set_Validated] = useState(false);
  const [form_Data, set_Form_Data] = useState({
    email: "",
  });
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const submitFn = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      set_Validated(true);
    } else {
      set_Validated(true);

      instance.post('/request_reset', { email: form_Data.email })
        .then((response) => {
          setAlert({
            message: t("reinit.success_message"),
            type: "success",
          });
          setTimeout(() => {
            navigate("/connexion");
          }, 3000);
        })
        .catch((error) => {
          const errorMessage = getErrorMessage(error, "reinit.err_inconnue");
          setAlert({
            message: errorMessage,
            type: "error",
          });
          setTimeout(() => {
            setAlert(null);
          }, 3000);
        });
    }
  };

  const chngFn = (event) => {
    const { name, value } = event.target;

    set_Form_Data({
      ...form_Data,
      [name]: value,
    });
    set_Validated(false);
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
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
        <script
          type="module"
          src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
        ></script>
      </Helmet>
      {alert && (
        <Toast
          className="toast"
          bg={alert.type === "success" ? "success" : "error"}
          onClose={() => setAlert(null)}
          autohide
          delay={3000}
        >
          <Toast.Body>{alert.message}</Toast.Body>
        </Toast>
      )}
      <Container className="visualiser-page">
        <Breadcrumb>
          <Breadcrumb.Item className="no-decoration" linkAs={Link} linkProps={{ to: "/" }}>
            {t("common.accueil")}
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            {t("reinit.page_title")}
          </Breadcrumb.Item>
        </Breadcrumb>

        <Form
          className="register"
          noValidate
          validated={validated}
          onSubmit={submitFn}
        >
          <h1 className="form-title"> {t("reinit.page_title")}</h1>
          <Row className="main-user-info">
            <Col md={6}>
              <Form.Group controlId="email" className="formgroupp">
                <Form.Label>{t("reinit.email_label")}</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  className="mail_input"
                  value={form_Data.email}
                  onChange={chngFn}
                  required
                  isInvalid={
                    validated && !/^\S+@\S+\.\S+$/.test(form_Data.email)
                  }
                />
                <Form.Control.Feedback type="invalid" className="feedw">
                  {t("reinit.err_email_required")}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <div className="boutons">
            <Button variant="primary" type="submit" className="custom-primary">
              {t("common.envoyer")}
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Reinitialisation;
