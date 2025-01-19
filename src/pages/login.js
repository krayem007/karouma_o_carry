import icon from "../images/icon.png";
import React, { useState } from "react";
import Config from "./config.json";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Col,
  Row,
  Form,
  Breadcrumb,
  Button,
  Toast,
} from "react-bootstrap";

const TITLE = "Connexion | " + Config.SITE_TITLE;
const DESC = "Connexion ";
const CANONICAL = Config.SITE_DOMAIN + "/connexion";

const Connexion = ({ setIsLoggedIn }) => {
  const [validated, set_Validated] = useState(false);
  const [form_Data, set_Form_Data] = useState({
    password: "",
    email: "",
  });
  const [alert, setAlert] = useState(null);

  const navigate = useNavigate(); // Use useNavigate hook outside of chngFn

  const submitFn = (event) => {
    event.preventDefault(); // Prevent default form submission
    const form = event.currentTarget;

    // Validate the form
    if (form.checkValidity() === false) {
      event.stopPropagation();
      set_Validated(true);
      return;
    }

    const AccountExists = true; // ******Gassouna Change this to true or false *******

    if (AccountExists) {
      setIsLoggedIn(true);
      navigate("/welcome");
    } else {
      setAlert({
        message: "Cette adresse e-mail n'est pas associée à un compte.",
        type: "error",
      });

      // Clear the alert after 3 seconds
      setTimeout(() => {
        setAlert(null);
      }, 3000);
    }

    set_Validated(true); // Mark the form as validated
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
                <Form.Control
                  type="password"
                  name="password"
                  className="mail_input"
                  required
                  value={form_Data.password}
                  onChange={chngFn}
                  minLength={6}
                  isInvalid={validated && form_Data.password.length < 6}
                />
                <Form.Control.Feedback type="invalid">
                  Veuillez entrer votre mot de passe valide.
                </Form.Control.Feedback>
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
