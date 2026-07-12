import icon from "../images/icon.png";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Config from "./config.json";
import { Helmet } from "react-helmet";
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

const instance = axios.create({
  baseURL: 'http://localhost:5002',
  withCredentials: true,
});

const TITLE = "Nouveau Mot de Passe | " + Config.SITE_TITLE;
const DESC = "Créer un nouveau mot de passe";

const ResetPassword = () => {
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
    instance.get(`/verify_reset_token/${token}`)
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
            message: response.data.message || "Mot de passe mis à jour avec succès.",
            type: "success",
          });
          setTimeout(() => {
            navigate("/connexion");
          }, 3000);
        })
        .catch((error) => {
          const errorMessage = error.response?.data?.error || "Le lien de réinitialisation est invalide ou a expiré.";
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
        <h2 className="reset-verify-msg">Vérification du lien sécurisé...</h2>
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
            <h1 className="form-title reset-error-title">Lien invalide ou expiré</h1>
            <div className="boutons mt-4">
              <Link to="/reinitialisation">
                <Button variant="primary" className="green" size="lg">Demander un nouveau lien</Button>
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
          <Breadcrumb.Item className="no-decoration">
            <Link to="/">Accueil</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            Nouveau Mot de Passe
          </Breadcrumb.Item>
        </Breadcrumb>

        <Form
          className="register"
          noValidate
          validated={validated}
          onSubmit={submitFn}
        >
          <h1 className="form-title"> Nouveau Mot de Passe</h1>
          <Row className="main-user-info">
            <Col md={6}>
              <Form.Group controlId="newPassword" className="form-group required">
                <Form.Label className="control-label">Nouveau mot de passe :</Form.Label>
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
                  <div className="login-error-msg">Veuillez entrer un nouveau mot de passe.</div>
                )}
                {validated && form_Data.newPassword.length < 6 && form_Data.newPassword !== "" && (
                  <div className="login-error-msg">Le mot de passe doit comporter au moins 6 caractères.</div>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row className="main-user-info">
            <Col md={6}>
              <Form.Group controlId="confirmPassword" className="form-group required">
                <Form.Label className="control-label">Confirmer le nouveau mot de passe :</Form.Label>
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
                  <div className="login-error-msg">Veuillez confirmer votre nouveau mot de passe.</div>
                )}
                {validated && form_Data.confirmPassword.length < 6 && form_Data.confirmPassword !== "" && (
                  <div className="login-error-msg">Le mot de passe doit comporter au moins 6 caractères.</div>
                )}
                {validated && form_Data.confirmPassword.length >= 6 && form_Data.confirmPassword !== form_Data.newPassword && (
                  <div className="login-error-msg">Les mots de passe ne correspondent pas.</div>
                )}
              </Form.Group>
            </Col>
          </Row>
          <div className="boutons mt-3">
            <Button variant="primary" type="submit" className="custom-primary">
              Enregistrer
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default ResetPassword;
