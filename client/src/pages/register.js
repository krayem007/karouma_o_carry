import icon from "../images/icon.png";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Config from "./config.json";
import axios from  "axios";
import { Helmet } from "react-helmet";
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
const bcrypt = require('bcryptjs');

const TITLE = "Inscription | " + Config.SITE_TITLE;
const DESC = "Inscription ";
const CANONICAL = Config.SITE_DOMAIN + "/inscription";

const Inscription = () => {
  const navigate = useNavigate(); // Initialize navigate hook
  const [validated, set_Validated] = useState(false);
  const [form_Data, set_Form_Data] = useState({
    password: "",
    confirm_password: "",
    email: "",
  });
  const [alert, setAlert] = useState({ message: "", type: "" });

  const submitFn = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      // Show success alert
      const data = { password : await bcrypt.hash(form_Data.password, 8),
        email : form_Data.email, 
        code_acte : form_Data.code_acte, 
        identifiant_fiscal : form_Data.identifiant_fiscal,
        identifiant_tva : form_Data.identifiant_tva,
        code_categorie : form_Data.code_categorie,
        nombre_filial : form_Data.nombre_filial,
        nom_prenom_raison : form_Data.nom_prenom_raison,
        adresse : form_Data.adresse,
        code_postal : form_Data.code_postal,
        activite : form_Data.activite,
        cessation_jour : form_Data.cessation_jour,
        cessation_mois : form_Data.cessation_mois,
        cessation_annee : form_Data.cessation_annee};
      axios.post("http://localhost:5002/register", data).then((response) => 
        {
          console.log("[gg] register data send to the server");
        });
      setAlert({
        message:
          "L'inscription a été effectuée avec succès. Vous devez maintenant vous connecter.",
        type: "success",
      });
      setTimeout(() => {
        navigate("/connexion");
      }, 2000);
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
      {alert.message && (
        <Toast
          className="toast"
          bg={alert.type}
          onClose={() => setAlert({ message: "", type: "" })}
        >
          <Toast.Body>{alert.message}</Toast.Body>
        </Toast>
      )}
      <Container className="visualiser-page">
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
            <Col md={2}>
              <Form.Group controlId="code_acte" className="form-group required">
                <Form.Label className="control-label">Code acte :</Form.Label>
                <Form.Control
                  type="text"
                  name="code_acte"
                  onChange={chngFn}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Veuillez remplir le code acte
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="main-user-info">
            <Col md={3}>
              <Form.Group
                controlId="identifiant_fiscal"
                className="form-group required"
              >
                <Form.Label className="control-label">
                  Identifiant fiscal :
                </Form.Label>
                <Form.Control
                  type="text"
                  name="identifiant_fiscal"
                  onChange={chngFn}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Veuillez remplir l'identifiant fiscal
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group
                controlId="identifiant_tva"
                className="form-group required"
              >
                <Form.Label className="control-label">
                  Identifiant T.V.A :
                </Form.Label>
                <Form.Control
                  type="text"
                  name="identifiant_tva"
                  onChange={chngFn}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Veuillez remplir l'identifiant TVA
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group
                controlId="code_categorie"
                className="form-group required"
              >
                <Form.Label className="control-label">
                  Code catégorie :
                </Form.Label>
                <Form.Control
                  type="text"
                  name="code_categorie"
                  onChange={chngFn}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Veuillez remplir le Code catégorie
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="nombre_filial">
                <Form.Label>Nombre de filiale (2) :</Form.Label>
                <Form.Control type="number" name="nombre_filial" min="0" onChange={chngFn} />
              </Form.Group>
            </Col>
          </Row>
          <Row className="main-user-info">
            <Col>
              <Form.Group
                controlId="nom_prenom_raison"
                className="form-group required"
              >
                <Form.Label className="control-label">
                  Nom et Prénom ou Raison sociale :
                </Form.Label>
                <Form.Control
                  type="text"
                  name="nom_prenom_raison"
                  className="long1"
                  onChange={chngFn}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Veuillez remplir le Nom et Prénom ou Raison sociale
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row fluid className="main-user-info">
            <Col md={8}>
              <Form.Group controlId="adresse" className="form-group required">
                <Form.Label className="control-label">
                  Adresse ou siège social :
                </Form.Label>
                <Form.Control
                  type="text"
                  name="adresse"
                  className="long2"
                  onChange={chngFn}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Veuillez remplir l'adresse ou siège social
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={2}>
              <Form.Group
                controlId="code_postal"
                className="form-group required"
              >
                <Form.Label ClasseName="label" className="control-label">
                  Code postal :
                </Form.Label>
                <Form.Control
                  type="text"
                  name="code_postal"
                  min="0000"
                  max="9999"
                  onInput={(e) => (e.target.value = e.target.value.slice(0, 4))}
                  onChange={chngFn}
                  required
                />
                <Form.Control.Feedback type="invalid" id="maxwidthfeed">
                  Veuillez remplir le code postal
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="main-user-info d-flex">
            <Col md={4}>
              <Form.Group controlId="activite" className="form-group required">
                <Form.Label className="control-label">Activité :</Form.Label>
                <Form.Control
                  type="text"
                  name="activite"
                  onChange={chngFn}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Veuillez remplir l'activité de l'entreprise
                </Form.Control.Feedback>
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
                  className="text-center"
                  onInput={(e) => (e.target.value = e.target.value.slice(0, 2))}
                  onChange={chngFn}
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
                  className="text-center"
                  onInput={(e) => (e.target.value = e.target.value.slice(0, 2))}
                  onChange={chngFn}
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
                  onChange={chngFn}
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="section_title">Identification :</div>

          <Row className="main-user-info">
            <Col md={6}>
              <Form.Group controlId="email" className="form-group required">
                <Form.Label className="control-label">E-mail :</Form.Label>
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
              <Form.Group controlId="password" className="form-group required">
                <Form.Label className="control-label">
                  Mot de passe :
                </Form.Label>
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
              <Form.Group
                controlId="confirm_password"
                className="form-group required"
              >
                <Form.Label className="control-label">
                  Confirmation du mot de passe :
                </Form.Label>
                <Form.Control
                  type="password"
                  name="confirm_password"
                  className="mail_input"
                  value={form_Data.confirm_password}
                  pattern={form_Data.password}
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
                    form_Data.password === form_Data.confirm_password // Must match
                  }
                />

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
