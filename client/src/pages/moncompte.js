import icon from "../images/icon.png";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  Breadcrumb,
  Tab,
  Tabs,
  Toast,
  Modal,
} from "react-bootstrap";

import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:5002',
  withCredentials: true,
});

const TITLE = "Mon Compte | " + Config.SITE_TITLE;
const DESC = "Mon Compte ";
const CANONICAL = Config.SITE_DOMAIN + "/moncompte";

const Moncompte = ({ setIsLoggedIn }) => {
  const navigate = useNavigate(); // Use useNavigate hook outside of chngFn
  const data = {
    email: localStorage.getItem("email"),
    code_acte: localStorage.getItem("code_acte"),
    identifiant_fiscal: localStorage.getItem("identifiant_fiscal"),
    identifiant_tva: localStorage.getItem("identifiant_tva"),
    code_categorie: localStorage.getItem("code_categorie"),
    nombre_filial: localStorage.getItem("nombre_filial"),
    nom_prenom_raison: localStorage.getItem("nom_prenom_raison"),
    adresse: localStorage.getItem("adresse"),
    code_postal: localStorage.getItem("code_postal"),
    activite: localStorage.getItem("activite"),
    cessation_jour: localStorage.getItem("cessation_jour"),
    cessation_mois: localStorage.getItem("cessation_mois"),
    cessation_annee: localStorage.getItem("cessation_annee"),
    nature_entite: localStorage.getItem("nature_entite") || "",
    details_regime: localStorage.getItem("details_regime") || "",
    secteur: localStorage.getItem("secteur") || ""
  };
  console.log("data : ", data);
  const [validated, set_Validated] = useState(false);
  const [validated1, set_Validated1] = useState(false);
  const [form_Data, set_Form_Data] = useState({
    anpassword: "",
    confirm_password: "",
    email: data.email,
    nvpassword: "",
    code_acte: data.code_acte,
    identifiant_fiscal: data.identifiant_fiscal,
    identifiant_tva: data.identifiant_tva,
    code_categorie: data.code_categorie,
    nombre_filial: data.nombre_filial,
    nom_prenom_raison: data.nom_prenom_raison,
    adresse: data.adresse,
    code_postal: data.code_postal,
    activite: data.activite,
    cessation_annee: data.cessation_annee,
    cessation_mois: data.cessation_mois,
    cessation_jour: data.cessation_jour,
    nature_entite: data.nature_entite,
    details_regime: data.details_regime,
    secteur: data.secteur,
  });

  console.log("form_data: ", form_Data)

  useEffect(() => {

    instance.get("/welcome").then((response) => {
        /*gg test*/console.log(response.data);
      if (response.data.authorized == "true") {
        console.log("authorized client");
      }
      else {
        console.log("not authorized client");
        navigate("/connexion");
        //neet to logging first
      }
    });
  }, []);

  const [alert, setAlert] = useState(null);
  const [deleteError, setDeleteError] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  let OldPasswordCheck = true; // ******Gassouna Change this to true or false *******

  const confirmDelete = () => {
    setShowDeleteConfirm(false);
    const data_del = { email: form_Data.email, password: form_Data.anpassword };
    instance.post("/delete_account", data_del).then((response) => {
      if (response.data.del == true) {
        setAlert({
          message: "Votre compte a été supprimé avec succès.",
          type: "success",
        });

        // Clear the alert after 3 seconds
        setTimeout(() => {
          setAlert(null);
          instance.post("/logout").then((response) => { console.log(response.data); });
          localStorage.clear();
          if (setIsLoggedIn) setIsLoggedIn(false);
          navigate("/");
        }, 3000);
      }
      else {
        setAlert({
          message: response.data.message,
          type: "error",
        });

        // Clear the alert after 3 seconds
        setTimeout(() => {
          setAlert(null);
        }, 3000);
      }
    }).catch((err) => {
      const msg = err.response?.data?.error || "Erreur lors de la suppression.";
      setAlert({ message: msg, type: "error" });
      setTimeout(() => setAlert(null), 3000);
    });
  };

  const handleRemoveItem = () => {
    if (!form_Data.anpassword) {
      set_Validated1(false);
      set_Validated(false);
      setDeleteError(true);
      return;
    }
    setShowDeleteConfirm(true);
  };

  const submitFn = (event) => {
    event.preventDefault();
    const cessationValid = !cessationPartiallyFilled || (
      /^(?:0[1-9]|[12][0-9]|3[01])$/.test(form_Data.cessation_jour) &&
      /^(?:0[1-9]|1[0-2])$/.test(form_Data.cessation_mois) &&
      /^[0-9]{4}$/.test(form_Data.cessation_annee) &&
      Number(form_Data.cessation_annee) >= 1900 && Number(form_Data.cessation_annee) <= currentYear + 1 &&
      isValidDate(form_Data.cessation_jour, form_Data.cessation_mois, form_Data.cessation_annee)
    );
    const isValid =
      /^[A-Z0-9_]{3,20}$/.test(form_Data.code_acte) &&
      /^[0-9A-Z]{8}$/.test(form_Data.identifiant_fiscal) &&
      /^[A-Z]$/.test(form_Data.identifiant_tva) &&
      /^[A-Z]$/.test(form_Data.code_categorie) &&
      /^[0-9]{3}$/.test(form_Data.nombre_filial) &&
      /^.{2,120}$/.test(form_Data.nom_prenom_raison) &&
      /^.{5,255}$/.test(form_Data.adresse) &&
      /^[0-9]{4}$/.test(form_Data.code_postal) &&
      /^.{2,100}$/.test(form_Data.activite) &&
      form_Data.nature_entite &&
      form_Data.details_regime &&
      form_Data.secteur &&
      cessationValid;
    if (!isValid) {
      event.stopPropagation();
    } else {
      const changed_data = {
        code_acte: form_Data.code_acte,
        identifiant_fiscal: form_Data.identifiant_fiscal,
        identifiant_tva: form_Data.identifiant_tva,
        code_categorie: form_Data.code_categorie,
        nombre_filiale: form_Data.nombre_filial,
        raison_sociale: form_Data.nom_prenom_raison,
        address: form_Data.adresse,
        code_postal: form_Data.code_postal,
        activite: form_Data.activite,
        activite_date: form_Data.cessation_jour && form_Data.cessation_mois && form_Data.cessation_annee
          ? form_Data.cessation_annee + '-' + form_Data.cessation_mois + '-' + form_Data.cessation_jour
          : '',
        nature_entite: form_Data.nature_entite,
        details_regime: form_Data.details_regime,
        secteur: form_Data.secteur,
        email: localStorage.getItem("email")
      };
      console.log("changed data : ", changed_data)
      instance.post("/my_account_data", changed_data).then((response) => {
        if (response.data.update == true) {
          console.log("before setting the local storage : ", changed_data);
          localStorage.setItem("code_acte", changed_data.code_acte);
          localStorage.setItem("identifiant_fiscal", changed_data.identifiant_fiscal);
          localStorage.setItem("identifiant_tva", changed_data.identifiant_tva);
          localStorage.setItem("code_categorie", changed_data.code_categorie);
          localStorage.setItem("nombre_filial", changed_data.nombre_filiale);
          localStorage.setItem("nom_prenom_raison", changed_data.raison_sociale);
          localStorage.setItem("adresse", changed_data.address);
          localStorage.setItem("code_postal", changed_data.code_postal);
          localStorage.setItem("activite", changed_data.activite);
          localStorage.setItem("cessation_jour", form_Data.cessation_jour);
          localStorage.setItem("cessation_mois", form_Data.cessation_mois);
          localStorage.setItem("cessation_annee", form_Data.cessation_annee);
          localStorage.setItem("nature_entite", form_Data.nature_entite);
          localStorage.setItem("details_regime", form_Data.details_regime);
          localStorage.setItem("secteur", form_Data.secteur);
          setAlert({
            message:
              "Vos informations personnelles ont été mises à jour avec succès.",
            type: "success",
          });

          // Clear the alert after 3 seconds
          setTimeout(() => {
            setAlert(null);
          }, 3000);
        }
      }).catch((err) => {
        const msg = err.response?.data?.error || "Erreur lors de la mise à jour.";
        setAlert({ message: msg, type: "error" });
        setTimeout(() => setAlert(null), 3000);
      });
    }
    set_Validated(true);
  };

  const submitFn1 = (event) => {
    event.preventDefault(); // Prevent default form submission
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      if (OldPasswordCheck && form_Data.nvpassword !== form_Data.anpassword) {
        const psspssdata = {
          email: form_Data.email,
          oldPassword: form_Data.anpassword,
          newPassword: form_Data.nvpassword
        };
        instance.post("/spiderPUSS", psspssdata).then((response) => {
          if (response.data.pssdate == true) {
            setAlert({
              message: "Votre mot de passe a été changé avec succès.",
              type: "success",
            });

            // Clear the alert after 3 seconds
            setTimeout(() => {
              setAlert(null);
            }, 3000);
            OldPasswordCheck = true;
          }
          else {
            OldPasswordCheck = false;
          }
        });

      }
      if (!OldPasswordCheck) {
        setAlert({
          message: "L'ancien mot de passe que vous avez saisi est incorrect.",
          type: "error",
        });

        // Clear the alert after 3 seconds
        setTimeout(() => {
          setAlert(null);
        }, 3000);
      }
    }

    set_Validated1(true);
  };

  const chngFn = (event) => {
    const { name, value } = event.target;
    set_Form_Data((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    set_Validated1(false);
    set_Validated(false);
    setDeleteError(false);
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
          <Breadcrumb.Item active>Mon Compte</Breadcrumb.Item>
        </Breadcrumb>

        <Tabs
          defaultActiveKey="Mes informations personnelles"
          id="fill-tab-example"
          className="mb-3"
          fill
        >
          <Tab
            eventKey="Mes informations personnelles"
            title="Mes informations personnelles"
          >
            <Container>
              <Form
                noValidate
                validated={validated}
                onSubmit={submitFn}
                className="register"
              >
                <Row className="main-user-info">
                  <Col md={2}>
                    <Form.Group
                      controlId="code_acte"
                      className="form-group required"
                    >
                      <Form.Label className="control-label">
                        Code acte :
                      </Form.Label>
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
                        pattern="[0-9A-Z]{8}"
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9A-Za-z]/g, "").toUpperCase().slice(0, 8);
                          chngFn({ target: { name: "identifiant_fiscal", value: val } });
                        }}
                        required
                        isInvalid={validated && !/^[0-9A-Z]{8}$/.test(form_Data.identifiant_fiscal)}
                      />
                      <Form.Control.Feedback type="invalid">
                        Identifiant fiscal invalide (8 caractères alphanumériques)
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
                    <Form.Group
                      controlId="nombre_filial"
                      className="form-group required"
                    >
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
                      <Form.Control.Feedback
                        type="invalid"
                        className="form-group"
                      >
                        Nom / Raison sociale invalide (2 à 120 caractères)
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row fluid className="main-user-info">
                  <Col md={9}>
                    <Form.Group
                      controlId="adresse"
                      className="form-group required"
                    >
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
                      <Form.Label className="control-label">
                        Code postal :
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="code_postal"
                        value={form_Data.code_postal}
                        pattern="[0-9]{4}"
                        placeholder="Code postal"
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
                    <Form.Group
                      controlId="activite"
                      className="form-group required"
                    >
                      <Form.Label className="control-label">
                        Activité :
                      </Form.Label>
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
                    <Form.Group
                      controlId="cessation_jour"
                      className="form-group"
                    >
                      <Form.Label>Jour :</Form.Label>
                      <Form.Control
                        type="text"
                        name="cessation_jour"
                        value={form_Data.cessation_jour}
                        pattern="(?:0[1-9]|[12][0-9]|3[01])"
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "").slice(0, 2);
                          chngFn({ target: { name: "cessation_jour", value: val } });
                        }}
                        className="text-center"
                        isInvalid={validated && cessationPartiallyFilled && (!/^(?:0[1-9]|[12][0-9]|3[01])$/.test(form_Data.cessation_jour) || !isValidDate(form_Data.cessation_jour, form_Data.cessation_mois, form_Data.cessation_annee))}
                      />
                      <Form.Control.Feedback type="invalid" className="cessation-feedback">
                        Jour invalide
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col xs={4} md={1} className="mb-2 me-md-4">
                    <Form.Group
                      controlId="cessation_mois"
                      className="form-group"
                    >
                      <Form.Label>Mois :</Form.Label>
                      <Form.Control
                        type="text"
                        name="cessation_mois"
                        value={form_Data.cessation_mois}
                        pattern="(?:0[1-9]|1[0-2])"
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "").slice(0, 2);
                          chngFn({ target: { name: "cessation_mois", value: val } });
                        }}
                        className="text-center"
                        isInvalid={validated && cessationPartiallyFilled && !/^(?:0[1-9]|1[0-2])$/.test(form_Data.cessation_mois)}
                      />
                      <Form.Control.Feedback type="invalid" className="cessation-feedback">
                        Mois invalide
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col xs={4} md={2} className="mb-2">
                    <Form.Group
                      controlId="cessation_annee"
                      className="form-group"
                    >
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

                <div className="section_title" style={{ marginTop: '20px', marginBottom: '10px', fontSize: '18px', fontWeight: 'bold' }}>Profil Fiscal :</div>
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

                <div className="boutons">
                  <Button variant="primary" type="submit" className="green">
                    Valider
                  </Button>
                </div>
              </Form>
            </Container>
          </Tab>
          <Tab
            eventKey="Paramétrage de la sécurité"
            title="Paramétrage de la sécurité"
          >
            <Container>
              <Form
                noValidate
                validated={validated1}
                onSubmit={submitFn1}
                className="register"
              >
                <Row className="main-user-info">
                  <Col md={6}>
                    <Form.Group controlId="email" className="gray-background">
                      <Form.Label>E-mail :</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        defaultValue={data.email}
                        className="grey"
                        required
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="main-user-info">
                  <Col md={6}>
                    <Form.Group
                      controlId="anpassword"
                      className="form-group required"
                    >
                      <Form.Label className="control-label">
                        Ancien mot de passe :
                      </Form.Label>
                      <Form.Control
                        type="password"
                        name="anpassword"
                        value={form_Data.anpassword}
                        className="mail_input"
                        onChange={chngFn}
                        minLength={6}
                        required
                        isInvalid={
                          (validated1 && (!OldPasswordCheck || form_Data.anpassword === "")) || deleteError
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {(!OldPasswordCheck && form_Data.anpassword !== "")
                          ? "L'ancien mot de passe que vous avez saisi est incorrect."
                          : "Veuillez entrer votre ancien mot de passe."}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="main-user-info">
                  <Col md={6}>
                    <Form.Group
                      controlId="nvpassword"
                      className="form-group required"
                    >
                      <Form.Label className="control-label">
                        Nouveau mot de passe :
                      </Form.Label>
                      <Form.Control
                        type="password"
                        name="nvpassword"
                        className="mail_input"
                        value={form_Data.nvpassword}
                        onChange={chngFn}
                        minLength={6}
                        required
                        isInvalid={
                          validated1 &&
                          (form_Data.nvpassword === "" ||
                            form_Data.nvpassword.length < 6 ||
                            form_Data.nvpassword === form_Data.anpassword)
                        }
                        isValid={
                          validated1 &&
                          form_Data.nvpassword.length >= 6 &&
                          form_Data.nvpassword !== form_Data.anpassword
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {form_Data.nvpassword === ""
                          ? "Veuillez entrer votre nouveau mot de passe."
                          : form_Data.nvpassword.length < 6
                            ? "Le mot de passe doit comporter au moins 6 caractères."
                            : "Le nouveau mot de passe doit être différent de l'ancien."}
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
                        Confirmation du nouveau mot de passe :
                      </Form.Label>
                      <Form.Control
                        type="password"
                        name="confirm_password"
                        className="mail_input"
                        value={form_Data.confirm_password}
                        pattern={form_Data.nvpassword}
                        onChange={chngFn}
                        minLength={6}
                        required
                        isInvalid={
                          validated1 &&
                          (form_Data.confirm_password === "" || // Empty
                            form_Data.confirm_password.length < 6 || // Less than 6 characters
                            form_Data.confirm_password !== form_Data.nvpassword) // Ensure it has at least 6 characters
                        }
                        isValid={
                          validated1 &&
                          form_Data.confirm_password.length >= 6 && // At least 6 characters
                          form_Data.nvpassword === form_Data.confirm_password // Must match
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
                        {form_Data.confirm_password === form_Data.nvpassword &&
                          form_Data.confirm_password.length >= 6
                          ? "Les mots de passe correspondent et sont valides."
                          : ""}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <div className="boutons">
                  <Button variant="primary" className="green" type="submit">
                    Valider
                  </Button>
                </div>
                <div className="password-forgot mt-4">
                  <Button
                    variant="link"
                    className="forgot"
                    onClick={handleRemoveItem}
                  >
                    Supprimer mon compte
                  </Button>
                </div>
              </Form>
            </Container>
          </Tab>
        </Tabs>

        <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirmer la suppression</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Êtes-vous sûr de vouloir supprimer définitivement votre compte <strong>{form_Data.email}</strong> ? Cette action est irréversible.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
              Annuler
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Confirmer la suppression
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default Moncompte;
