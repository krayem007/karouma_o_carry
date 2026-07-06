import icon from "../images/icon.png";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Config from "./config.json";
import axios from "axios";
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
    nature_entite: "",
    details_regime: "",
    secteur: "",
    code_acte: "",
    identifiant_fiscal: "",
    identifiant_tva: "",
    code_categorie: "",
    nombre_filial: "",
    nom_prenom_raison: "",
    adresse: "",
    code_postal: "",
    activite: "",
    cessation_jour: "",
    cessation_mois: "",
    cessation_annee: "",
    cgu: false,
  });
  const [alert, setAlert] = useState({ message: "", type: "" });

  const submitFn = (event) => {
    event.preventDefault();
    const isValid =
      /^[A-Z0-9_]{3,20}$/.test(form_Data.code_acte) &&
      /^[0-9]{7}$/.test(form_Data.identifiant_fiscal) &&
      /^[A-Z]$/.test(form_Data.identifiant_tva) &&
      /^[A-Z]$/.test(form_Data.code_categorie) &&
      /^[0-9]{3}$/.test(form_Data.nombre_filial) &&
      /^.{2,120}$/.test(form_Data.nom_prenom_raison) &&
      /^.{5,255}$/.test(form_Data.adresse) &&
      /^[0-9]{4}$/.test(form_Data.code_postal) &&
      /^.{2,100}$/.test(form_Data.activite) &&
      /^\S+@\S+\.\S+$/.test(form_Data.email) &&
      form_Data.password.length >= 6 &&
      form_Data.confirm_password === form_Data.password &&
      form_Data.nature_entite &&
      form_Data.details_regime &&
      form_Data.secteur &&
      form_Data.cgu &&
      isValidDate(form_Data.cessation_jour, form_Data.cessation_mois, form_Data.cessation_annee);
    if (!isValid) {
      event.stopPropagation();
    } else {
      // Show success alert
      const data = {
        password: form_Data.password,
        email: form_Data.email,
        code_acte: form_Data.code_acte,
        identifiant_fiscal: form_Data.identifiant_fiscal,
        identifiant_tva: form_Data.identifiant_tva,
        code_categorie: form_Data.code_categorie,
        nombre_filial: form_Data.nombre_filial,
        nom_prenom_raison: form_Data.nom_prenom_raison,
        adresse: form_Data.adresse,
        code_postal: form_Data.code_postal,
        activite: form_Data.activite,
        cessation_jour: form_Data.cessation_jour,
        cessation_mois: form_Data.cessation_mois,
        cessation_annee: form_Data.cessation_annee,
        nature_entite: form_Data.nature_entite,
        details_regime: form_Data.details_regime,
        secteur: form_Data.secteur
      };
      axios.post("http://localhost:5002/register", data).then((response) => {
        if (response.data.error) {
          setAlert({ message: response.data.message, type: "error" });
        } else if (response.data.success) {
          setAlert({
            message:
              "L'inscription a été effectuée avec succès. Vous devez maintenant vous connecter.",
            type: "success",
          });
          setTimeout(() => {
            navigate("/connexion");
          }, 2000);
        }
      }).catch(() => {
        setAlert({ message: "Erreur réseau lors de l'inscription.", type: "error" });
      });
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

  const currentYear = new Date().getFullYear();
  const cessationPartiallyFilled =
    form_Data.cessation_jour || form_Data.cessation_mois || form_Data.cessation_annee;

  const isValidDate = (j, m, a) => {
    if (!j || !m || !a) return true;
    const d = new Date(Number(a), Number(m) - 1, Number(j));
    return d.getFullYear() === Number(a) && d.getMonth() === Number(m) - 1 && d.getDate() === Number(j);
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
                  value={form_Data.code_acte}
                  pattern="[A-Z0-9_]{3,20}"
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^a-zA-Z0-9_]/g, "").toUpperCase().slice(0, 20);
                    chngFn({ target: { name: "code_acte", value: val } });
                  }}
                  required
                  isInvalid={validated && !/^[A-Z0-9_]{3,20}$/.test(form_Data.code_acte)}
                />
                <Form.Control.Feedback type="invalid">
                  Code acte invalide (3-20 caractères)
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="main-user-info">
            <Col md={6} lg={3}>
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
                  value={form_Data.identifiant_fiscal}
                  pattern="[0-9]{7}"
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "").slice(0, 7);
                    chngFn({ target: { name: "identifiant_fiscal", value: val } });
                  }}
                  required
                  isInvalid={validated && !/^[0-9]{7}$/.test(form_Data.identifiant_fiscal)}
                />
                <Form.Control.Feedback type="invalid">
                  Identifiant fiscal invalide (7 chiffres requis)
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6} lg={3}>
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
                  value={form_Data.identifiant_tva}
                  pattern="[A-Z]"
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^a-zA-Z]/g, "").toUpperCase().slice(0, 1);
                    chngFn({ target: { name: "identifiant_tva", value: val } });
                  }}
                  required
                  isInvalid={validated && !/^[A-Z]$/.test(form_Data.identifiant_tva)}
                />
                <Form.Control.Feedback type="invalid">
                  Code TVA invalide (1 lettre majuscule)
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6} lg={3}>
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
                  value={form_Data.code_categorie}
                  pattern="[A-Z]"
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^a-zA-Z]/g, "").toUpperCase().slice(0, 1);
                    chngFn({ target: { name: "code_categorie", value: val } });
                  }}
                  required
                  isInvalid={validated && !/^[A-Z]$/.test(form_Data.code_categorie)}
                />
                <Form.Control.Feedback type="invalid">
                  Code catégorie invalide (1 lettre majuscule)
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6} lg={3}>
              <Form.Group controlId="nombre_filial" className="form-group required">
                <Form.Label className="control-label">Nombre de filiale (2) :</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre_filial"
                  value={form_Data.nombre_filial}
                  pattern="[0-9]{3}"
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "").slice(0, 3);
                    chngFn({ target: { name: "nombre_filial", value: val } });
                  }}
                  required
                  isInvalid={validated && !/^[0-9]{3}$/.test(form_Data.nombre_filial)}
                />
                <Form.Control.Feedback type="invalid">
                  Nombre de filiales doit être sur 3 chiffres
                </Form.Control.Feedback>
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
                  value={form_Data.nom_prenom_raison}
                  className="long1"
                  pattern=".{2,120}"
                  onChange={(e) => {
                    const val = e.target.value.slice(0, 120);
                    chngFn({ target: { name: "nom_prenom_raison", value: val } });
                  }}
                  required
                  isInvalid={validated && !/^.{2,120}$/.test(form_Data.nom_prenom_raison)}
                />
                <Form.Control.Feedback type="invalid">
                  Nom / Raison sociale invalide (2 à 120 caractères)
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
                  value={form_Data.adresse}
                  className="long2"
                  pattern=".{5,255}"
                  onChange={(e) => {
                    const val = e.target.value.slice(0, 255);
                    chngFn({ target: { name: "adresse", value: val } });
                  }}
                  required
                  isInvalid={validated && !/^.{5,255}$/.test(form_Data.adresse)}
                />
                <Form.Control.Feedback type="invalid">
                  Adresse invalide (5 à 255 caractères)
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
                  value={form_Data.code_postal}
                  pattern="[0-9]{4}"
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "").slice(0, 4);
                    chngFn({ target: { name: "code_postal", value: val } });
                  }}
                  required
                  isInvalid={validated && !/^[0-9]{4}$/.test(form_Data.code_postal)}
                />
                <Form.Control.Feedback type="invalid" id="maxwidthfeed">
                  Code postal doit contenir 4 chiffres
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
                  value={form_Data.activite}
                  pattern=".{2,100}"
                  onChange={(e) => {
                    const val = e.target.value.slice(0, 100);
                    chngFn({ target: { name: "activite", value: val } });
                  }}
                  required
                  isInvalid={validated && !/^.{2,100}$/.test(form_Data.activite)}
                />
                <Form.Control.Feedback type="invalid">
                  Activité invalide (2 à 100 caractères)
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} md={2}>
              <Form.Label>Date de cessation d’activité :</Form.Label>
            </Col>

            <Col xs={4} md={1} className="mb-2 me-md-4">
              <Form.Group controlId="cessation_jour" className="form-group">
                <Form.Label>Jour :</Form.Label>
                <Form.Control
                  type="text"
                  name="cessation_jour"
                  value={form_Data.cessation_jour}
                  pattern="(?:0[1-9]|[12][0-9]|3[01])"
                  className="text-center"
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "").slice(0, 2);
                    chngFn({ target: { name: "cessation_jour", value: val } });
                  }}
                  isInvalid={validated && cessationPartiallyFilled && (!/^(?:0[1-9]|[12][0-9]|3[01])$/.test(form_Data.cessation_jour) || !isValidDate(form_Data.cessation_jour, form_Data.cessation_mois, form_Data.cessation_annee))}
                />
                <Form.Control.Feedback type="invalid" className="cessation-feedback">
                  Jour invalide
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={4} md={1} className="mb-2 me-md-4">
              <Form.Group controlId="cessation_mois" className="form-group">
                <Form.Label>Mois :</Form.Label>
                <Form.Control
                  type="text"
                  name="cessation_mois"
                  value={form_Data.cessation_mois}
                  pattern="(?:0[1-9]|1[0-2])"
                  className="text-center"
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "").slice(0, 2);
                    chngFn({ target: { name: "cessation_mois", value: val } });
                  }}
                  isInvalid={validated && cessationPartiallyFilled && !/^(?:0[1-9]|1[0-2])$/.test(form_Data.cessation_mois)}
                />
                <Form.Control.Feedback type="invalid" className="cessation-feedback">
                  Mois invalide
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={4} md={2} className="mb-2">
              <Form.Group controlId="cessation_annee" className="form-group">
                <Form.Label>Année :</Form.Label>
                <Form.Control
                  type="text"
                  name="cessation_annee"
                  value={form_Data.cessation_annee}
                  pattern="[0-9]{4}"
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "").slice(0, 4);
                    chngFn({ target: { name: "cessation_annee", value: val } });
                  }}
                  className="text-center"
                  isInvalid={validated && cessationPartiallyFilled && (!form_Data.cessation_annee || Number(form_Data.cessation_annee) < 1900 || Number(form_Data.cessation_annee) > currentYear + 1)}
                />
                <Form.Control.Feedback type="invalid" className="cessation-feedback">
                  Année invalide
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <div className="section_title">Profil Fiscal :</div>
          <Row className="main-user-info">
            <Col md={6}>
              <Form.Group controlId="nature_entite" className="form-group required">
                <Form.Label className="control-label">Nature de l'entité :</Form.Label>
                <Form.Select name="nature_entite" value={form_Data.nature_entite} onChange={chngFn} required isInvalid={validated && !form_Data.nature_entite}>
                  <option value="">Sélectionnez...</option>
                  <option value="PM">Société / Personne Morale (PM)</option>
                  <option value="PP">Indépendant / Personne Physique (PP)</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Veuillez sélectionner la nature de l'entité.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            {form_Data.nature_entite && (
              <Col md={6}>
                <Form.Group controlId="details_regime" className="form-group required">
                  <Form.Label className="control-label">Détails du régime :</Form.Label>
                  <Form.Select name="details_regime" value={form_Data.details_regime} onChange={chngFn} required isInvalid={validated && !form_Data.details_regime}>
                    <option value="">Sélectionnez le régime...</option>
                    {form_Data.nature_entite === 'PM' && (
                      <>
                        <option value="IS_10">IS 10%</option>
                        <option value="IS_20">IS 20%</option>
                        <option value="IS_35">IS 35%</option>
                      </>
                    )}
                    {form_Data.nature_entite === 'PP' && (
                      <>
                        <option value="REEL_3">Régime Réel</option>
                        <option value="FORFAITAIRE_10">Régime Forfaitaire</option>
                      </>
                    )}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Veuillez sélectionner les détails du régime.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            )}
          </Row>
          <Row className="main-user-info">
            <Col md={6}>
              <Form.Group controlId="secteur" className="form-group required">
                <Form.Label className="control-label">Secteur d'activité :</Form.Label>
                <Form.Select name="secteur" value={form_Data.secteur} onChange={chngFn} required isInvalid={validated && !form_Data.secteur}>
                  <option value="">Sélectionnez le secteur...</option>
                  <option value="Type 1">Industriel</option>
                  <option value="Type 2">Autre</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Veuillez sélectionner le secteur d'activité.
                </Form.Control.Feedback>
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
                      ? "Le mot de passe doit comporter plus de 6 caractères."
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

          <Row className="main-user-info mb-3">
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Check
                  required
                  name="cgu"
                  id="cgu"
                  checked={form_Data.cgu}
                  onChange={(e) => chngFn({ target: { name: "cgu", value: e.target.checked } })}
                  label={
                    <span>
                      J'accepte les <Link to="/condition" target="_blank">Conditions Générales d'Utilisation</Link>
                    </span>
                  }
                  feedback="Vous devez accepter les conditions générales d'utilisation avant de vous inscrire."
                  feedbackType="invalid"
                />
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
