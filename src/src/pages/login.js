import React, { useState } from "react";
import Config from "./config.json";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { Container, Col, Row, Form, Breadcrumb, Button } from "react-bootstrap";

const TITLE = "Connexion | " + Config.SITE_TITLE;
const DESC = "Connexion ";
const CANONICAL = Config.SITE_DOMAIN + "/connexion";

const Connexion = ({ setIsLoggedIn }) => {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });

  const navigate = useNavigate(); // Use useNavigate hook outside of chngFn

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault(); // Prevent default submission
      // Here, add your login logic (e.g., API call)
      // If login is successful:
      setIsLoggedIn(true); // Update the logged-in state
      navigate("/welcome"); // Use the navigate function
    }
    setValidated(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
        <link rel="canonical" href={CANONICAL} />
        <meta name="description" content={DESC} />
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
      <Container className="register">
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
          onSubmit={handleSubmit}
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
                  value={formData.email}
                  onChange={handleChange}
                  required
                  isInvalid={
                    validated && !/^\S+@\S+\.\S+$/.test(formData.email)
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
                  value={formData.password}
                  onChange={handleChange}
                  minLength={6}
                  isInvalid={validated && formData.password.length < 6}
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
            <Button variant="link" className="forgot">
              Mot de passe oublié ?
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Connexion;
