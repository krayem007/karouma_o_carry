import icon from "../images/icon.png";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
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
  InputGroup,
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

const ResetPassword = () => {
  const { t } = useTranslation();
  const TITLE = t("reset.titre_meta") + " | " + Config.SITE_TITLE;
  const DESC = t("reset.titre_meta");
  const { token } = useParams();
  const [validated, set_Validated] = useState(false);
  const [form_Data, set_Form_Data] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({ newPw: false, confirmPw: false });
  const togglePW = (f) => setShowPasswords(p => ({ ...p, [f]: !p[f] }));
  const [alert, setAlert] = useState(null);
  const [isValidToken, setIsValidToken] = useState(null); // null = checking, true = valid, false = invalid/expired
  const navigate = useNavigate();

  useEffect(() => {
    instance.post('/verify_reset_token', { token })
      .then((response) => {
        setIsValidToken(true);
      })
      .catch((error) => {
        setIsValidToken(false);
      });
  }, [token]);

  const submitFn = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false || form_Data.newPassword !== form_Data.confirmPassword) {
      event.stopPropagation();
      set_Validated(true);
    } else {
      set_Validated(true);

      instance.post('/apply_reset', { token, newPassword: form_Data.newPassword })
        .then((response) => {
          setAlert({
            message: t("reset.success_mdp"),
            type: "success",
          });
          setTimeout(() => {
            navigate("/connexion");
          }, 3000);
        })
        .catch((error) => {
          const errorMessage = getErrorMessage(error, "reset.err_lien_invalide");
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

  if (isValidToken === null) {
    return (
      <Container className="visualiser-page">
        <h2 className="reset-verify-msg">{t("reset.verif_lien")}</h2>
      </Container>
    );
  }

  if (isValidToken === false) {
    return (
      <>
        <Helmet>
          <title>{TITLE}</title>
          <meta name="description" content={DESC} />
          <link rel="icon" href={icon} type="image/png" />
          <meta name="theme-color" content={Config.THEME_COLOR} />
        </Helmet>
        <Container className="visualiser-page">
          <Form className="register">
            <h1 className="form-title reset-error-title">{t("reset.lien_invalide")}</h1>
            <div className="boutons mt-4">
              <Link to="/reinitialisation">
                <Button variant="primary" className="green" size="lg">{t("reset.demander_nouveau_lien")}</Button>
              </Link>
            </div>
          </Form>
        </Container>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="icon" href={icon} type="image/png" />
        <meta name="theme-color" content={Config.THEME_COLOR} />
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
            {t("reset.page_title")}
          </Breadcrumb.Item>
        </Breadcrumb>

        <Form
          className="register"
          noValidate
          validated={validated}
          onSubmit={submitFn}
        >
          <h1 className="form-title"> {t("reset.page_title")}</h1>
          <Row className="main-user-info">
            <Col md={6}>
              <Form.Group controlId="newPassword" className="form-group required">
                <Form.Label className="control-label">{t("reset.nouveau_mdp")}</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPasswords.newPw ? "text" : "password"}
                    name="newPassword"
                    value={form_Data.newPassword}
                    onChange={chngFn}
                    minLength={6}
                    required
                    isInvalid={
                      validated &&
                      (form_Data.newPassword === "" || form_Data.newPassword.length < 6)
                    }
                    isValid={
                      validated &&
                      form_Data.newPassword.length >= 6
                    }
                  />
                  <Button variant="outline-secondary" className="password-toggle-btn" onClick={() => togglePW('newPw')}>
                    <i className={`${showPasswords.newPw ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"} password-toggle-icon`} />
                  </Button>
                </InputGroup>
                {validated && form_Data.newPassword === "" && (
                  <div className="login-error-msg">{t("reset.err_nouveau_mdp")}</div>
                )}
                {validated && form_Data.newPassword.length < 6 && form_Data.newPassword !== "" && (
                  <div className="login-error-msg">{t("reset.err_mdp_length")}</div>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row className="main-user-info">
            <Col md={6}>
              <Form.Group controlId="confirmPassword" className="form-group required">
                <Form.Label className="control-label">{t("reset.confirmer_mdp")}</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPasswords.confirmPw ? "text" : "password"}
                    name="confirmPassword"
                    value={form_Data.confirmPassword}
                    pattern={form_Data.newPassword}
                    onChange={chngFn}
                    minLength={6}
                    required
                    isInvalid={
                      validated &&
                      (form_Data.confirmPassword === "" ||
                        form_Data.confirmPassword.length < 6 ||
                        form_Data.confirmPassword !== form_Data.newPassword)
                    }
                    isValid={
                      validated &&
                      form_Data.confirmPassword.length >= 6 &&
                      form_Data.newPassword === form_Data.confirmPassword
                    }
                  />
                  <Button variant="outline-secondary" className="password-toggle-btn" onClick={() => togglePW('confirmPw')}>
                    <i className={`${showPasswords.confirmPw ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"} password-toggle-icon`} />
                  </Button>
                </InputGroup>
                {validated && form_Data.confirmPassword === "" && (
                  <div className="login-error-msg">{t("reset.err_confirmer")}</div>
                )}
                {validated && form_Data.confirmPassword.length < 6 && form_Data.confirmPassword !== "" && (
                  <div className="login-error-msg">{t("reset.err_mdp_length")}</div>
                )}
                {validated && form_Data.confirmPassword.length >= 6 && form_Data.confirmPassword !== form_Data.newPassword && (
                  <div className="login-error-msg">{t("reset.err_mdp_match")}</div>
                )}
              </Form.Group>
            </Col>
          </Row>
          <div className="boutons mt-3">
            <Button variant="primary" type="submit" className="custom-primary">
              {t("reset.enregistrer")}
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default ResetPassword;
