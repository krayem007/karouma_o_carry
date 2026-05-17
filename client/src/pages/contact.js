import React, { useState } from "react";
import axios from "axios";
import {
  Breadcrumb,
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Config from "./config.json";
import { Helmet } from "react-helmet";
import icon from "../images/icon.png";

const TITLE = "Contact | " + Config.SITE_TITLE;
const DESC = "Contact";
const CANONICAL = Config.SITE_DOMAIN + "/contact";

const Contact = () => {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    objet: "",
    message: "",
  });
  const [disabled, setDisabled] = useState(false);
  const [alert, setAlert] = useState(null);

  const onSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      setValidated(true);
      return;
    }

    const { name, email, objet, message } = formData;

    try {
      setDisabled(true);

      const response = await axios.post('http://localhost:5002/contact', {
        name,
        email,
        objet,
        message
      });

      if (response.data.success) {
        setAlert({
          message: "Votre message a été envoyé avec succès !",
          type: "success",
        });
        setFormData({
          name: "",
          email: "",
          objet: "",
          message: "",
        });
      } else {
        throw new Error(response.data.message || "Erreur lors de l'envoi");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setAlert({
        message: error.response?.data?.message || "Une erreur s'est produite. Veuillez réessayer.",
        type: "danger",
      });
    } finally {
      setDisabled(false);
      setValidated(false);
    }
  };

  const chngFn = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setValidated(false);
  };

  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
        <link rel="canonical" href={CANONICAL} />
        <meta name="description" content={DESC} />
        <link rel="icon" href={icon} type="image/png" />
        <meta name="theme-color" content={Config.THEME_COLOR} />
      </Helmet>

      <Container className="visualiser-page">
        <Breadcrumb>
          <Breadcrumb.Item className="no-decoration">
            <Link to="/">Accueil</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Contact</Breadcrumb.Item>
        </Breadcrumb>

        {alert && (
          <Alert
            variant={alert.type}
            onClose={() => setAlert(null)}
            dismissible
          >
            {alert.message}
          </Alert>
        )}

        <Form noValidate validated={validated} onSubmit={onSubmit}>
          <h1 className="form-title">Contactez-Nous</h1>
          <Row className="main-user-info">
            <Col md={6}>
              <Form.Group controlId="name" className="form-group required">
                <Form.Label>Nom:</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={chngFn}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Veuillez entrer votre nom.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="email" className="form-group required">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={chngFn}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Veuillez entrer une adresse e-mail valide.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="main-user-info">
            <Col>
              <Form.Group controlId="objet" className="form-group required">
                <Form.Label>Objet:</Form.Label>
                <Form.Control
                  type="text"
                  name="objet"
                  value={formData.objet}
                  onChange={chngFn}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Veuillez entrer l'objet.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="main-user-info">
            <Col>
              <Form.Group controlId="message" className="form-group required">
                <Form.Label>Message:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="message"
                  value={formData.message}
                  onChange={chngFn}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Veuillez entrer un message.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <div className="boutons">
            <Button
              variant="primary"
              type="submit"
              className="green"
              disabled={disabled}
            >
              Envoyer
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Contact;
