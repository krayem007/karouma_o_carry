import React, { useState } from "react";
import { Link } from "react-router-dom";
import Config from "./config.json";
import { Helmet } from "react-helmet";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Container, Col, Row, Button, Form, Breadcrumb } from "react-bootstrap";

const TITLE = "Inscription | " + Config.SITE_TITLE;
const DESC = "Inscription ";
const CANONICAL = Config.SITE_DOMAIN + "/inscription";

const Inscription = () => {
  const [validated, set_Validated] = useState(false);
  const [form_Data, set_Form_Data] = useState({
    password: "",
    confirm_password: "",
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
      <Container className="register-page">
        <Breadcrumb>
          <Breadcrumb.Item className="no-decoration">
            <Link to="/">Accueil</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Inscription</Breadcrumb.Item>
        </Breadcrumb>

        <h1 className="form-title">Inscription</h1>

        <Form
          noValidate
          validated={validated}
          onSubmit={submitFn}
          className="register"
        >
          <div className="section_title">Informations de l'entreprise :</div>
          <Row className="main-user-info">
            <Col md={4}>
              <Form.Group controlId="code_acte">
                <Form.Label ClasseName="label">Code acte :</Form.Label>
                <Form.Control type="text" name="code_acte" />
              </Form.Group>
            </Col>

            <Col md={1}>
              <Form.Group controlId="mois">
                <Form.Label ClasseName="label">Mois :</Form.Label>
                <Form.Control
                  type="text"
                  name="mois"
                  min="1"
                  max="12"
                  onInput={(e) => (e.target.value = e.target.value.slice(0, 2))}
                />
              </Form.Group>
            </Col>

            <Col md={2}>
              <Form.Group controlId="anne">
                <Form.Label ClasseName="label">Année :</Form.Label>
                <Form.Control
                  type="text"
                  name="anne"
                  min="1900"
                  max="2200"
                  onInput={(e) => (e.target.value = e.target.value.slice(0, 4))}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="main-user-info">
            <Col md={3}>
              <Form.Group controlId="identifiant_fiscal">
                <Form.Label>Identifiant fiscal :</Form.Label>
                <Form.Control type="text" name="identifiant_fiscal" />
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group controlId="identifiant_tva">
                <Form.Label>Identifiant T.V.A :</Form.Label>
                <Form.Control type="text" name="identifiant_tva" />
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group controlId="code_categorie">
                <Form.Label>Code catégorie :</Form.Label>
                <Form.Control type="text" name="code_categorie" />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="nombre_filial">
                <Form.Label>Nombre de filiale (2) :</Form.Label>
                <Form.Control type="number" name="nombre_filial" />
              </Form.Group>
            </Col>
          </Row>
          <Row className="main-user-info">
            <Col>
              <Form.Group controlId="nom_prenom_raison">
                <Form.Label>Nom et Prénom ou Raison sociale :</Form.Label>
                <Form.Control
                  type="text"
                  name="nom_prenom_raison"
                  className="long1"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row fluid className="main-user-info">
            <Col md={9}>
              <Form.Group controlId="adresse">
                <Form.Label>Adresse ou siège social :</Form.Label>
                <Form.Control type="text" name="adresse" className="long2" />
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group controlId="postal_code">
                <Form.Label>Code postal :</Form.Label>
                <div className="postal-code-group d-flex">
                  <Form.Control
                    type="text"
                    name="postal1"
                    min="0"
                    max="9"
                    onInput={(e) =>
                      (e.target.value = e.target.value.slice(0, 1))
                    }
                    className="postal1"
                  />
                  <Form.Control
                    type="text"
                    name="postal2"
                    min="0"
                    max="9"
                    onInput={(e) =>
                      (e.target.value = e.target.value.slice(0, 1))
                    }
                    className="postal2"
                  />
                  <Form.Control
                    type="text"
                    name="postal3"
                    min="0"
                    max="9"
                    onInput={(e) =>
                      (e.target.value = e.target.value.slice(0, 1))
                    }
                    className="postal3"
                  />
                  <Form.Control
                    type="text"
                    name="postal4"
                    min="0"
                    max="9"
                    onInput={(e) =>
                      (e.target.value = e.target.value.slice(0, 1))
                    }
                    className="postal4"
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row className="main-user-info d-flex">
            <Col md={4}>
              <Form.Group controlId="activite">
                <Form.Label>Activité :</Form.Label>
                <Form.Control type="text" name="activite" />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Label>Date de cessation d’activité :</Form.Label>
            </Col>

            <Col md={1}>
              <Form.Group controlId="cessation_jour">
                <Form.Label>Jour :</Form.Label>
                <Form.Control
                  type="text"
                  name="cessation_jour"
                  min="1"
                  max="31"
                  onInput={(e) => (e.target.value = e.target.value.slice(0, 2))}
                />
              </Form.Group>
            </Col>

            <Col md={1}>
              <Form.Group controlId="cessation_mois">
                <Form.Label>Mois :</Form.Label>
                <Form.Control
                  type="text"
                  name="cessation_mois"
                  min="1"
                  max="12"
                  onInput={(e) => (e.target.value = e.target.value.slice(0, 2))}
                />
              </Form.Group>
            </Col>

            <Col md={2}>
              <Form.Group controlId="cessation_annee">
                <Form.Label>Année :</Form.Label>
                <Form.Control
                  type="text"
                  name="cessation_annee"
                  min="1900"
                  max="2200"
                  onInput={(e) => (e.target.value = e.target.value.slice(0, 4))}
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="section_title">Identification :</div>

          <Row className="main-user-info">
            <Col md={6}>
              <Form.Group controlId="email">
                <Form.Label>E-mail :</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={form_Data.email}
                  onChange={chngFn}
                  className="mail_input"
                  required
                  isInvalid={
                    validated && !/^\S+@\S+\.\S+$/.test(form_Data.email)
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Veuillez entrer une adresse e-mail valide.
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
                  value={form_Data.password}
                  onChange={chngFn}
                  minLength={6}
                  className="mail_input"
                  required
                  isInvalid={validated && form_Data.password.length < 6}
                />
                <Form.Control.Feedback type="invalid">
                  Le mot de passe doit comporter plus de 6 caractères.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="main-user-info">
            <Col md={6}>
              <Form.Group controlId="confirm_password">
                <Form.Label>Confirmation du mot de passe :</Form.Label>
                <Form.Control
                  type="password"
                  name="confirm_password"
                  className="mail_input"
                  value={form_Data.confirm_password}
                  onChange={chngFn}
                  minLength={6}
                  required
                  // Invalid state: empty, less than 6 characters, or mismatch
                  isInvalid={
                    validated &&
                    (form_Data.confirm_password === "" || // Empty
                      form_Data.confirm_password.length < 6 || // Less than 6 characters
                      form_Data.confirm_password !== form_Data.password) // Ensure it has at least 6 characters
                  }
                  // Valid state: passwords must match and have the required length
                  isValid={
                    validated &&
                    form_Data.confirm_password.length >= 6 && // At least 6 characters
                    form_Data.confirm_password === form_Data.password // Must match
                  }
                />

                {/* Feedback for invalid cases */}
                <Form.Control.Feedback type="invalid">
                  {form_Data.confirm_password === ""
                    ? "Veuillez confirmer votre mot de passe."
                    : form_Data.confirm_password.length < 6
                    ? "Le mot de passe doit comporter au moins 6 caractères."
                    : "Les mots de passe ne correspondent pas."}
                </Form.Control.Feedback>

                {/* Feedback for valid case */}
                <Form.Control.Feedback type="valid">
                  {form_Data.confirm_password === form_Data.password &&
                  form_Data.confirm_password.length >= 6
                    ? "Les mots de passe correspondent et sont valides."
                    : ""}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <div className="boutons">
            <Button variant="primary" type="submit" className="custom-primary">
              Enregistrer
            </Button>
            <Button
              variant="secondary"
              type="button"
              className="custom-secondary"
              as={Link}
              to="/"
            >
              Annuler
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Inscription;
