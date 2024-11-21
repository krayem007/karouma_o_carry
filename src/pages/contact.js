import icon from "../images/icon.png";
import emailjs from "@emailjs/browser";
import {
  Breadcrumb,
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Config from "./config.json";
import { Helmet } from "react-helmet";

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
  const [disabled, setDisabled] = useState(false); // Disabled state for the form
  const [alert, setAlert] = useState(null); // For alert messages

  // Function to handle form submission
  const onSubmit = async (data) => {
    const { name, email, objet, message } = data;
    try {
      // Disable form while processing submission
      setDisabled(true);

      // Define template params
      const templateParams = {
        nom: name,
        email: email,
        objet: objet,
        message: message,
      };

      // Use emailjs to email contact form data
      await emailjs.send(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_PUBLIC_KEY
      );

      // Display success alert
      setAlert({ message: "Form submission was successful!", type: "success" });
    } catch (e) {
      console.error(e);
      // Display error alert
      setAlert({ message: "Uh oh. Something went wrong.", type: "danger" });
    } finally {
      // Re-enable form submission
      setDisabled(false);
      // Reset contact form fields after submission
      setFormData({
        nom: "",
        email: "",
        objet: "",
        message: "",
      });
    }
  };

  const submitFn = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      // Call onSubmit only if form is valid
      onSubmit(formData);
    }
    setValidated(true);
  };

  const chngFn = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setValidated(false);
  };

  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
        <link rel="canonical" href={CANONICAL} />
        <meta name="description" content={DESC} />
        <link rel="icon" href={icon} type="image/png" />;
        <meta name="theme-color" content={Config.THEME_COLOR} />
      </Helmet>

      <Container className="register">
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

        <Form noValidate validated={validated} onSubmit={submitFn}>
          <h1 className="form-title">Contact Us</h1>
          <Row className="main-user-info">
            <Col md={6}>
              <Form.Group controlId="name" className="register">
                <Form.Label>Nom: </Form.Label>
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
              <Form.Group controlId="email">
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
              <Form.Group controlId="subject">
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
              <Form.Group controlId="message">
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
