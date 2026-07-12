import icon from "../images/icon.png";
import React, { useState, useEffect } from "react";
import Config from "./config.json";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


//export default instance;
import {
  Container,
  Col,
  Row,
  Form,
  Breadcrumb,
  Button,
  Toast,
  InputGroup,
} from "react-bootstrap";

const instance = axios.create({
  baseURL: 'http://localhost:5000', // Base URL of the Express backend
  withCredentials: true, // Allow sending cookies with requests
});


const TITLE = "Connexion | " + Config.SITE_TITLE;
const DESC = "Connexion ";
const CANONICAL = Config.SITE_DOMAIN + "/connexion";

const Connexion = ({ setIsLoggedIn }) => {
  const [validated, set_Validated] = useState(false);
  const [form_Data, set_Form_Data] = useState({
    password: "",
    email: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });

  const navigate = useNavigate(); // Use useNavigate hook outside of chngFn
  let karouma = false;

  const submitFn = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    set_Validated(true);

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      return; // stop here — isInvalid will now show the feedback message
    }

    // Here, add your login logic (e.g., API call)
    const data = {
      password: form_Data.password,
      email: form_Data.email
    };
    instance.post("http://localhost:5002/login", data).then((response) => {
      if (response.status === 200) {
        // If login is successful:
        if (response.data.status == 'success') {
          karouma = true;
          setAlert({ message: "", type: "" });
          console.log(response.data.message);
          localStorage.setItem("user", response.data.user);
          const date = new Date(response.data.user_data.activite_date);
          localStorage.setItem("email", response.data.user_data.email);
          localStorage.setItem("code_acte", response.data.user_data.code_acte);
          localStorage.setItem("identifiant_fiscal", response.data.user_data.identifiant_fiscal);
          localStorage.setItem("identifiant_tva", response.data.user_data.identifiant_tva);
          localStorage.setItem("code_categorie", response.data.user_data.code_categorie);
          localStorage.setItem("nombre_filial", response.data.user_data.nombre_filiale);
          localStorage.setItem("nom_prenom_raison", response.data.user_data.raison_sociale);
          localStorage.setItem("adresse", response.data.user_data.address);
          localStorage.setItem("code_postal", response.data.user_data.code_postal);
          localStorage.setItem("activite", response.data.user_data.activite);
          localStorage.setItem("cessation_jour", String(date.getDate()).padStart(2, '0'));
          localStorage.setItem("cessation_mois", String(date.getMonth() + 1).padStart(2, '0'));
          localStorage.setItem("cessation_annee", String(date.getFullYear()).padStart(4, '0'));
          localStorage.setItem("nature_entite", response.data.user_data.nature_entite || "");
          localStorage.setItem("details_regime", response.data.user_data.details_regime || "");
          localStorage.setItem("secteur", response.data.user_data.secteur || "");
          setIsLoggedIn(true);
          navigate("/welcome");
        }
        else if (response.data.status == 'error') {
          karouma = false;
          setAlert({ message: "Adresse e-mail ou mot de passe incorrect.", type: "error" });
        }
      }
      else if (response.status === 400) {
        setAlert({ message: "Adresse e-mail ou mot de passe incorrect.", type: "error" });
      }
    }).catch((error) => {
      if (error.response?.status === 429) {
        setAlert({ message: error.response.data.message || "Trop de tentatives. Réessayez dans 15 minutes.", type: "error" });
      } else {
        setAlert({ message: "Erreur réseau. Veuillez réessayer.", type: "error" });
      }
    });

  };

  const chngFn = (event) => {
    const { name, value } = event.target;
    set_Form_Data({
      ...form_Data,
      [name]: value,
    });
    set_Validated(false);
    setAlert({ message: "", type: "" });
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
      <Container className="visualiser-page">
        {alert.message && (
          <Toast
            className="toast"
            bg={alert.type}
            onClose={() => setAlert({ message: "", type: "" })}
            autohide
            delay={3000}
          >
            <Toast.Body>{alert.message}</Toast.Body>
          </Toast>
        )}
        <Breadcrumb>
          <Breadcrumb.Item className="no-decoration">
            <Link to="/">Accueil</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Connexion</Breadcrumb.Item>
        </Breadcrumb>
        <Form
          className="register"
          noValidate
          validated={validated}
          onSubmit={submitFn}
        >
          <h1 className="form-title">Connexion</h1>
          <div className="section_title">Connectez-vous</div>

          <Row className="main-user-info">
            <Col md={6}>
              <Form.Group controlId="email">
                <Form.Label>E-mail :</Form.Label>
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
                <Form.Control.Feedback type="invalid">
                  Veuillez entrer votre adresse email.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="main-user-info">
            <Col md={6}>
              <Form.Group controlId="password">
                <Form.Label>Mot de passe :</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="mail_input"
                    required
                    value={form_Data.password}
                    onChange={chngFn}
                    minLength={6}
                    isInvalid={validated && form_Data.password.length < 6}
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle-btn"
                  >
                    <i className={`${showPassword ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"} password-toggle-icon`}></i>
                  </Button>
                </InputGroup>
                {validated && form_Data.password.length < 6 && (
                  <div className="login-error-msg">
                    Veuillez entrer votre mot de passe (minimum 6 caractères).
                  </div>
                )}
              </Form.Group>
            </Col>
          </Row>
          <div className="boutons">
            <Button variant="primary" type="submit" className="custom-primary">
              Se connecter
            </Button>
          </div>
          <div className="password-forgot">
            <Link className="forgot" to="/reinitialisation">
              Mot de passe oublié ?
            </Link>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Connexion;