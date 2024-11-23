import icon from "../images/icon.png";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Config from "./config.json";
import { Helmet } from "react-helmet";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Container, Col, Row, Button, Form, Breadcrumb } from "react-bootstrap";

const TITLE = "Réinitialisation de Mot de Passe | " + Config.SITE_TITLE;
const DESC = "Réinitialisation de Mot de Passe ";
const CANONICAL = Config.SITE_DOMAIN + "/reinitialisation";

const Reinitialisation = () => {
  const [validated, set_Validated] = useState(false);
  const [form_Data, set_Form_Data] = useState({
    email: "",
  });
  const submitFn = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    set_Validated(true);
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
      <Container className="register-page">
        <Breadcrumb>
          <Breadcrumb.Item className="no-decoration">
            <Link to="/">Accueil</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            Réinitialisation de Mot de Passe
          </Breadcrumb.Item>
        </Breadcrumb>

        <Form
          className="register"
          noValidate
          validated={validated}
          onSubmit={submitFn}
        >
          <h1 className="form-title"> Réinitialisation de Mot de Passe</h1>
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
                  Veuillez entrer votre adresse e-mail pour la réinitialisation
                  du mot de passe.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <div className="boutons">
            <Button variant="primary" type="submit" className="custom-primary">
              Envoyer
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Reinitialisation;
