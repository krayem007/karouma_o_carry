import icon from "../images/icon.png";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Config from "./config.json";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import i18n from "../i18n";
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
  Toast,
} from "react-bootstrap";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '',
  withCredentials: true,
});

const CANONICAL = Config.SITE_DOMAIN + "/inscription";

const Inscription = () => {
  const { t } = useTranslation();
  const TITLE = t("register.titre_meta") + " | " + Config.SITE_TITLE;
  const DESC = t("register.titre_meta");
  const navigate = useNavigate(); // Initialize navigate hook
  const [validated, set_Validated] = useState(false);
  const [showPasswords, setShowPasswords] = useState({ pw: false, confirm: false });
  const togglePW = (f) => setShowPasswords(p => ({ ...p, [f]: !p[f] }));
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
      /^[0-9A-Z]{8}$/.test(form_Data.identifiant_fiscal) &&
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
        secteur: form_Data.secteur,
        language: localStorage.getItem("language") || "fr"
      };
      instance.post("/register", data).then((response) => {
        const errKey = response.data?.error;
        if (typeof errKey === "string" && i18n.exists(errKey)) {
          setAlert({ message: t(errKey), type: "error" });
        } else if (response.data.error) {
          setAlert({ message: t("register.err_inscription"), type: "error" });
        } else if (response.data.success) {
          setAlert({
            message:
              t("register.success_inscription"),
            type: "success",
          });
          setTimeout(() => {
            navigate("/connexion");
          }, 2000);
        }
      }).catch((error) => {
        if (error.response?.status === 429) {
          setAlert({ message: t("register.err_trop_tentatives"), type: "error" });
        } else {
          setAlert({ message: t("register.err_reseau"), type: "error" });
        }
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
          <Breadcrumb.Item className="no-decoration" linkAs={Link} linkProps={{ to: "/" }}>
            {t("common.accueil")}
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{t("register.page_title")}</Breadcrumb.Item>
        </Breadcrumb>

        <h1 className="form-title">{t("register.page_title")}</h1>
        <Form
          noValidate
          validated={validated}
          onSubmit={submitFn}
          className="register"
        >
          <div className="section_title">{t("register.section_entreprise")}</div>
          <Row className="main-user-info">
            <Col md={2}>
              <Form.Group controlId="code_acte" className="form-group required">
                <Form.Label className="control-label">{t("register.code_acte")}</Form.Label>
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
              <Form.Group controlId="nombre_filial" className="form-group required">
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
                  {t("register.nombre_filiale_err")}
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
                <Form.Control.Feedback type="invalid">
                  {t("register.nom_raison_err")}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row fluid className="main-user-info">
            <Col md={8}>
              <Form.Group controlId="adresse" className="form-group required">
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
                <Form.Label ClasseName="label" className="control-label">
                  {t("register.code_postal")}
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
                  {t("register.code_postal_err")}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="main-user-info d-flex">
            <Col md={4}>
              <Form.Group controlId="activite" className="form-group required">
                <Form.Label className="control-label">{t("register.activite")}</Form.Label>
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
              <Form.Group controlId="cessation_jour" className="form-group">
                <Form.Label>{t("register.jour")}</Form.Label>
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
                  {t("register.jour_err")}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={4} md={1} className="mb-2 me-md-4">
              <Form.Group controlId="cessation_mois" className="form-group">
                <Form.Label>{t("register.mois")}</Form.Label>
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
                  {t("register.mois_err")}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={4} md={2} className="mb-2">
              <Form.Group controlId="cessation_annee" className="form-group">
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

          <div className="section_title">{t("register.section_fiscal")}</div>
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

          <div className="section_title">{t("register.section_identification")}</div>

          <Row className="main-user-info">
            <Col md={6}>
              <Form.Group controlId="email" className="form-group required">
                <Form.Label className="control-label">{t("register.email_label")}</Form.Label>
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
                  {t("register.err_email")}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="main-user-info">
            <Col md={6}>
              <Form.Group controlId="password" className="form-group required">
                <Form.Label className="control-label">
                  {t("register.mot_de_passe")}
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPasswords.pw ? "text" : "password"}
                    name="password"
                    value={form_Data.password}
                    onChange={chngFn}
                    minLength={6}
                    className="mail_input"
                    required
                    isInvalid={validated && form_Data.password.length < 6}
                  />
                  <Button variant="outline-secondary" className="password-toggle-btn" onClick={() => togglePW('pw')}>
                    <i className={`${showPasswords.pw ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"} password-toggle-icon`} />
                  </Button>
                </InputGroup>
                {validated && form_Data.password.length < 6 && (
                  <div className="login-error-msg">{t("register.err_password_length")}</div>
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
                  {t("register.confirmation_mdp")}
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPasswords.confirm ? "text" : "password"}
                    name="confirm_password"
                    className="mail_input"
                    value={form_Data.confirm_password}
                    pattern={form_Data.password}
                    onChange={chngFn}
                    minLength={6}
                    required
                    isInvalid={
                      validated &&
                      (form_Data.confirm_password === "" ||
                        form_Data.confirm_password.length < 6 ||
                        form_Data.confirm_password !== form_Data.password)
                    }
                    isValid={
                      validated &&
                      form_Data.confirm_password.length >= 6 &&
                      form_Data.password === form_Data.confirm_password
                    }
                  />
                  <Button variant="outline-secondary" className="password-toggle-btn" onClick={() => togglePW('confirm')}>
                    <i className={`${showPasswords.confirm ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"} password-toggle-icon`} />
                  </Button>
                </InputGroup>

                {validated && form_Data.confirm_password === "" && (
                  <div className="login-error-msg">{t("register.err_confirmer")}</div>
                )}
                {validated && form_Data.confirm_password.length < 6 && form_Data.confirm_password !== "" && (
                  <div className="login-error-msg">{t("register.err_password_length")}</div>
                )}
                {validated && form_Data.confirm_password.length >= 6 && form_Data.confirm_password !== form_Data.password && (
                  <div className="login-error-msg">{t("register.err_password_match")}</div>
                )}
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
                      {t("register.cgu_label")} <Link to="/condition" target="_blank">{t("common.cgu_link")}</Link>
                    </span>
                  }
                  feedback={t("register.cgu_err")}
                  feedbackType="invalid"
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="boutons">
            <Button variant="primary" type="submit" className="custom-primary">
              {t("common.enregistrer")}
            </Button>
            <Button
              variant="secondary"
              type="button"
              className="custom-secondary"
              as={Link}
              to="/"
            >
              {t("common.annuler")}
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Inscription;
