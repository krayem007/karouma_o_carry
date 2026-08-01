import icon from "../images/icon.png";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
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
  InputGroup,
  Breadcrumb,
  Tab,
  Tabs,
  Toast,
  Modal,
} from "react-bootstrap";

import axios from "axios";

const instance = axios.create({
  baseURL: '',
  withCredentials: true,
});

const CANONICAL = Config.SITE_DOMAIN + "/moncompte";

const Moncompte = ({ setIsLoggedIn }) => {
  const { t } = useTranslation();
  const TITLE = t("moncompte.titre_meta") + " | " + Config.SITE_TITLE;
  const DESC = t("moncompte.titre_meta");
  const navigate = useNavigate(); // Use useNavigate hook outside of chngFn
  const data = {
    email: localStorage.getItem("email"),
    code_acte: localStorage.getItem("code_acte"),
    identifiant_fiscal: localStorage.getItem("identifiant_fiscal"),
    identifiant_tva: localStorage.getItem("identifiant_tva"),
    code_categorie: localStorage.getItem("code_categorie"),
    nombre_filial: (localStorage.getItem("nombre_filial") || "000").padStart(3, '0'),
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
  const [showPasswords, setShowPasswords] = useState({ an: false, nv: false, confirm: false });
  const togglePW = (f) => setShowPasswords(p => ({ ...p, [f]: !p[f] }));
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
      if (response.data.authorized === "true") {
        console.log("authorized client");
      }
      else {
        console.log("not authorized client");
        navigate("/connexion");
        //neet to logging first
      }
    });
  }, [navigate]);

  const [alert, setAlert] = useState(null);
  const [deleteError, setDeleteError] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  let OldPasswordCheck = true; // ******Gassouna Change this to true or false *******

  const confirmDelete = () => {
    setShowDeleteConfirm(false);
    const data_del = { email: form_Data.email, password: form_Data.anpassword };
    instance.post("/delete_account", data_del).then((response) => {
      if (response.data.del === true) {
        setAlert({
          message: t("moncompte.success_suppression"),
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
          message: t("moncompte.err_ancien_mdp_incorrect"),
          type: "error",
        });

        // Clear the alert after 3 seconds
        setTimeout(() => {
          setAlert(null);
        }, 3000);
      }
    }).catch((err) => {
      const msg = t("moncompte.err_suppression");
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
        if (response.data.update === true) {
          console.log("before setting the local storage : ", changed_data);
          localStorage.setItem("code_acte", changed_data.code_acte);
          localStorage.setItem("identifiant_fiscal", changed_data.identifiant_fiscal);
          localStorage.setItem("identifiant_tva", changed_data.identifiant_tva);
          localStorage.setItem("code_categorie", changed_data.code_categorie);
          localStorage.setItem("nombre_filial", String(changed_data.nombre_filiale).padStart(3, '0'));
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
              t("moncompte.success_update"),
            type: "success",
          });

          // Clear the alert after 3 seconds
          setTimeout(() => {
            setAlert(null);
          }, 3000);
        }
      }).catch((err) => {
        const msg = t("moncompte.err_update");
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
          if (response.data.pssdate === true) {
            setAlert({
              message: t("moncompte.success_mdp"),
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
        }).catch((error) => {
          const msg = error.response?.data?.error === "Incorrect old password"
            ? t("moncompte.err_ancien_mdp_match")
            : t("moncompte.err_mdp_change");
          setAlert({ message: msg, type: "error" });
          setTimeout(() => setAlert(null), 3000);
        });

      }
      if (!OldPasswordCheck) {
        setAlert({
          message: t("moncompte.err_ancien_mdp_incorrect"),
          type: "error",
        });

        // Clear the alert after 3 seconds
        setTimeout(() => {
          setAlert(null);
        }, 3000);
      }
    }

    setDeleteError(false);
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
            <Link to="/">{t("common.accueil")}</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{t("moncompte.page_title")}</Breadcrumb.Item>
        </Breadcrumb>

        <Tabs
          defaultActiveKey="Mes informations personnelles"
          id="fill-tab-example"
          className="mb-4 modern-tabs"
          fill
        >
          <Tab
            eventKey="Mes informations personnelles"
            title={t("moncompte.tab_infos")}
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
                        {t("register.code_acte")}
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
                        {t("register.code_acte_err")}
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
                        {t("register.identifiant_fiscal")}
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
                        {t("register.identifiant_fiscal_err")}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6} lg={3}>
                    <Form.Group
                      controlId="identifiant_tva"
                      className="form-group required"
                    >
                      <Form.Label className="control-label">
                        {t("register.identifiant_tva")}
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
                        {t("register.identifiant_tva_err")}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6} lg={3}>
                    <Form.Group
                      controlId="code_categorie"
                      className="form-group required"
                    >
                      <Form.Label className="control-label">
                        {t("register.code_categorie")}
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
                        {t("register.code_categorie_err")}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6} lg={3}>
                    <Form.Group
                      controlId="nombre_filial"
                      className="form-group required"
                    >
                      <Form.Label className="control-label">{t("register.nombre_filiale")}</Form.Label>
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
                        {t("register.err_nb_filiale")}
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
                        {t("register.nom_raison")}
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
                        {t("register.nom_raison_err")}
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
                        {t("register.adresse")}
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
                        {t("register.adresse_err")}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={2}>
                    <Form.Group
                      controlId="code_postal"
                      className="form-group required"
                    >
                      <Form.Label className="control-label">
                        {t("register.code_postal")}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="code_postal"
                        value={form_Data.code_postal}
                        pattern="[0-9]{4}"
                        placeholder={t("moncompte.code_postal")}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "").slice(0, 4);
                          chngFn({ target: { name: "code_postal", value: val } });
                        }}
                        required
                        isInvalid={validated && !/^[0-9]{4}$/.test(form_Data.code_postal)}
                      />
                      <Form.Control.Feedback type="invalid" id="maxwidthfeed">
                        {t("moncompte.code_postal_err")}
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
                        {t("register.activite")}
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
                        {t("register.activite_err")}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={2}>
                    <Form.Label>{t("register.date_cessation")}</Form.Label>
                  </Col>

                  <Col xs={4} md={1} className="mb-2 me-md-4">
                    <Form.Group
                      controlId="cessation_jour"
                      className="form-group"
                    >
                      <Form.Label>{t("register.jour")}</Form.Label>
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
                        {t("register.jour_err")}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col xs={4} md={1} className="mb-2 me-md-4">
                    <Form.Group
                      controlId="cessation_mois"
                      className="form-group"
                    >
                      <Form.Label>{t("register.mois")}</Form.Label>
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
                        {t("register.mois_err")}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col xs={4} md={2} className="mb-2">
                    <Form.Group
                      controlId="cessation_annee"
                      className="form-group"
                    >
                      <Form.Label>{t("register.annee")}</Form.Label>
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
                        {t("register.annee_err")}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="section_title" style={{ marginTop: '20px', marginBottom: '10px', fontSize: '18px', fontWeight: 'bold' }}>{t("register.section_fiscal")}</div>
                <Row className="main-user-info">
                  <Col md={6}>
                    <Form.Group controlId="nature_entite" className="form-group required">
                      <Form.Label className="control-label">{t("register.nature_entite")}</Form.Label>
                      <Form.Select name="nature_entite" value={form_Data.nature_entite} onChange={chngFn} required isInvalid={validated && !form_Data.nature_entite}>
                        <option value="">{t("common.selectionnez")}</option>
                        <option value="PM">{t("register.pm_option")}</option>
                        <option value="PP">{t("register.pp_option")}</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {t("register.err_nature")}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  {form_Data.nature_entite && (
                    <Col md={6}>
                      <Form.Group controlId="details_regime" className="form-group required">
                        <Form.Label className="control-label">{t("register.details_regime")}</Form.Label>
                        <Form.Select name="details_regime" value={form_Data.details_regime} onChange={chngFn} required isInvalid={validated && !form_Data.details_regime}>
                          <option value="">{t("register.selectionnez_regime")}</option>
                          {form_Data.nature_entite === 'PM' && (
                            <>
                              <option value="IS_10">{t("common.is_10")}</option>
                              <option value="IS_20">{t("common.is_20")}</option>
                              <option value="IS_35">{t("common.is_35")}</option>
                            </>
                          )}
                          {form_Data.nature_entite === 'PP' && (
                            <>
                              <option value="REEL_3">{t("register.regime_reel")}</option>
                              <option value="FORFAITAIRE_10">{t("register.regime_forfaitaire")}</option>
                            </>
                          )}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {t("register.err_regime")}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  )}
                </Row>
                <Row className="main-user-info">
                  <Col md={6}>
                    <Form.Group controlId="secteur" className="form-group required">
                      <Form.Label className="control-label">{t("register.secteur")}</Form.Label>
                      <Form.Select name="secteur" value={form_Data.secteur} onChange={chngFn} required isInvalid={validated && !form_Data.secteur}>
                        <option value="">{t("register.secteur_select")}</option>
                        <option value="Type 1">{t("register.industriel")}</option>
                        <option value="Type 2">{t("register.autre")}</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {t("register.err_secteur")}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="boutons">
                  <Button variant="primary" type="submit" className="green">
                    {t("common.valider")}
                  </Button>
                </div>
              </Form>
            </Container>
          </Tab>
          <Tab
            eventKey="Paramétrage de la sécurité"
            title={t("moncompte.tab_securite")}
          >
            <Container>
              <Form
                noValidate
                validated={validated1}
                onSubmit={submitFn1}
                className="register"
              >
                <Row className="main-user-info mb-4">
                  <Col md={6}>
                    <Form.Group controlId="email" className="modern-email-group">
                      <Form.Label className="modern-label">
                        <i className="fa-regular fa-envelope me-2 text-muted"></i>
                        {t("moncompte.email_label")}
                      </Form.Label>
                      <div className="modern-input-wrapper">
                        <Form.Control
                          type="email"
                          name="email"
                          defaultValue={data.email}
                          className="modern-input"
                          required
                          readOnly
                        />
                      </div>
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
                        {t("moncompte.ancien_mdp")}
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={showPasswords.an ? "text" : "password"}
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
                        <Button variant="outline-secondary" className="password-toggle-btn" onClick={() => togglePW('an')}>
                          <i className={`${showPasswords.an ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"} password-toggle-icon`} />
                        </Button>
                      </InputGroup>
                      {validated1 && form_Data.anpassword === "" && (
                        <div className="login-error-msg">{t("moncompte.err_ancien_mdp_required")}</div>
                      )}
                      {deleteError && form_Data.anpassword === "" && (
                        <div className="login-error-msg">{t("moncompte.err_ancien_mdp_delete")}</div>
                      )}
                      {validated1 && !OldPasswordCheck && form_Data.anpassword !== "" && (
                        <div className="login-error-msg">{t("moncompte.err_ancien_mdp_incorrect")}</div>
                      )}
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
                        {t("moncompte.nouveau_mdp")}
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={showPasswords.nv ? "text" : "password"}
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
                        <Button variant="outline-secondary" className="password-toggle-btn" onClick={() => togglePW('nv')}>
                          <i className={`${showPasswords.nv ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"} password-toggle-icon`} />
                        </Button>
                      </InputGroup>
                      {validated1 && form_Data.nvpassword === "" && (
                        <div className="login-error-msg">{t("moncompte.err_nouveau_mdp_required")}</div>
                      )}
                      {validated1 && form_Data.nvpassword.length < 6 && form_Data.nvpassword !== "" && (
                        <div className="login-error-msg">{t("moncompte.err_mdp_length")}</div>
                      )}
                      {validated1 && form_Data.nvpassword.length >= 6 && form_Data.nvpassword === form_Data.anpassword && (
                        <div className="login-error-msg">{t("moncompte.err_mdp_different")}</div>
                      )}
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
                        {t("moncompte.confirmer_mdp")}
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={showPasswords.confirm ? "text" : "password"}
                          name="confirm_password"
                          className="mail_input"
                          value={form_Data.confirm_password}
                          pattern={form_Data.nvpassword}
                          onChange={chngFn}
                          minLength={6}
                          required
                          isInvalid={
                            validated1 &&
                            (form_Data.confirm_password === "" ||
                              form_Data.confirm_password.length < 6 ||
                              form_Data.confirm_password !== form_Data.nvpassword)
                          }
                          isValid={
                            validated1 &&
                            form_Data.confirm_password.length >= 6 &&
                            form_Data.nvpassword === form_Data.confirm_password
                          }
                        />
                        <Button variant="outline-secondary" className="password-toggle-btn" onClick={() => togglePW('confirm')}>
                          <i className={`${showPasswords.confirm ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"} password-toggle-icon`} />
                        </Button>
                      </InputGroup>
                      {validated1 && form_Data.confirm_password === "" && (
                        <div className="login-error-msg">{t("moncompte.err_confirmer_mdp")}</div>
                      )}
                      {validated1 && form_Data.confirm_password.length < 6 && form_Data.confirm_password !== "" && (
                        <div className="login-error-msg">{t("moncompte.err_mdp_length")}</div>
                      )}
                      {validated1 && form_Data.confirm_password.length >= 6 && form_Data.confirm_password !== form_Data.nvpassword && (
                        <div className="login-error-msg">{t("moncompte.err_mdp_match")}</div>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <div className="boutons">
                  <Button variant="primary" className="green" type="submit">
                    {t("common.valider")}
                  </Button>
                </div>
                <div className="password-forgot mt-4">
                  <Button
                    variant="link"
                    className="forgot"
                    onClick={handleRemoveItem}
                  >
                    {t("moncompte.supprimer_compte")}
                  </Button>
                </div>
              </Form>
            </Container>
          </Tab>
        </Tabs>

        <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)} centered className="modern-modal">
          <Modal.Header closeButton>
            <Modal.Title>{t("moncompte.confirmer_suppression")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {t("moncompte.confirmer_suppression_msg", { email: form_Data.email })}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
              {t("common.annuler")}
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              {t("moncompte.confirmer_suppression")}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default Moncompte;
