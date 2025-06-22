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
} from "react-bootstrap";

import axios from  "axios";

const instance = axios.create({
  baseURL: 'http://localhost:5002', // Base URL of the Express backend
  withCredentials: true, // Allow sending cookies with requests
});
const bcrypt = require('bcryptjs');

const TITLE = "Mon Compte | " + Config.SITE_TITLE;
const DESC = "Mon Compte ";
const CANONICAL = Config.SITE_DOMAIN + "/moncompte";

const Moncompte = () => {
  const navigate = useNavigate(); // Use useNavigate hook outside of chngFn
  const data = { 
    email : localStorage.getItem("email"),
    code_acte : localStorage.getItem("code_acte"),
    identifiant_fiscal : localStorage.getItem("identifiant_fiscal"),
    identifiant_tva : localStorage.getItem("identifiant_tva"),
    code_categorie : localStorage.getItem("code_categorie"),
    nombre_filial : localStorage.getItem("nombre_filial"),
    nom_prenom_raison : localStorage.getItem("nom_prenom_raison"),
    adresse : localStorage.getItem("adresse"),
    code_postal : localStorage.getItem("code_postal"),
    activite : localStorage.getItem("activite"),
    cessation_jour : localStorage.getItem("cessation_jour"),
    cessation_mois : localStorage.getItem("cessation_mois"),
    cessation_annee : localStorage.getItem("cessation_annee")};
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
    nom_prenom_raison:data.nom_prenom_raison,
    adresse:data.adresse,
    code_postal:data.code_postal,
    activite: data.activite,
    cessation_annee :data.cessation_annee,
    cessation_mois :data.cessation_mois,
    cessation_jour : data.cessation_jour,
  });

  console.log("form_data: ", form_Data)

  useEffect(() => {
    
    instance.get("/welcome").then((response) => 
      {
        /*gg test*/console.log(response.data);
        if (response.data.authorized == "true")
        {
          console.log("authorized client");
        }
        else
        {
          console.log("not authorized client");
          navigate("/connexion");
          //neet to logging first
        }
      });
    }, []);
  
  const [alert, setAlert] = useState(null);
  let OldPasswordCheck = true; // ******Gassouna Change this to true or false *******

  const handleRemoveItem = () => {
    //const res = window.confirm(
    //  "Êtes-vous sûr de vouloir supprimer définitivement votre compte ?"
    //);
    const data_del = {email: form_Data.email, password: form_Data.anpassword};
    instance.post("/delete_account", data_del).then((response) => 
      {
        if(response.data.del == true )
          {
            setAlert({
              message: "Votre compte a été supprimé avec succès.",
              type: "success",
            });
    
            // Clear the alert after 3 seconds
            setTimeout(() => {
              setAlert(null);
              instance.post("/logout").then((response) => 
              {console.log(response.data);});
              navigate("/");
            }, 3000);
          }
          else{
            setAlert({
              message: response.data.message,
              type: "error",
            });
    
            // Clear the alert after 3 seconds
            setTimeout(() => {
              setAlert(null);
            }, 3000);
          }
      });
  };

  const submitFn = (event) => {
    event.preventDefault(); // Prevent default form submission
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const changed_data = {
        code_acte : form_Data.code_acte, 
        identifiant_fiscal : form_Data.identifiant_fiscal,
        identifiant_tva : form_Data.identifiant_tva,
        code_categorie : form_Data.code_categorie,
        nombre_filiale : form_Data.nombre_filial,
        raison_sociale : form_Data.nom_prenom_raison,
        address : form_Data.adresse,
        code_postal : form_Data.code_postal,
        activite : form_Data.activite,
        activite_date : form_Data.cessation_annee.toString()+'-'+ form_Data.cessation_mois.toString()+'-'+ form_Data.cessation_jour.toString(),
        email : localStorage.getItem("email")};
      console.log("changed data : ", changed_data)
      instance.post("/my_account_data", changed_data).then((response) => 
        {
          if(response.data.update == true )
            {
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
        });
    }
    set_Validated(true);
  };

  const submitFn1 = async (event) => {
    event.preventDefault(); // Prevent default form submission
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      if (OldPasswordCheck && form_Data.nvpassword !== form_Data.anpassword) {
        const psspssdata = {email: form_Data.email, 
                            oldPassword: form_Data.anpassword, 
                            newPassword: await bcrypt.hash(form_Data.nvpassword, 8)};
        instance.post("/spiderPUSS", psspssdata).then((response) => 
          {
            if(response.data.pssdate == true )
              {
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
              else{
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
      <Container>
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
                        defaultValue = {data.code_acte}
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
                        defaultValue = {data.identifiant_fiscal}
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
                        defaultValue = {data.identifiant_tva}
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
                        defaultValue = {data.code_categorie}
                        onChange={chngFn}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Veuillez remplir le Code catégorie
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group
                      controlId="nombre_filial"
                      className="form-group"
                    >
                      <Form.Label>Nombre de filiale (2) :</Form.Label>
                      <Form.Control
                        type="number"
                        name="nombre_filial"
                        onChange={chngFn}
                        defaultValue = {data.nombre_filial}
                        required
                        min="0"
                      />
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
                        defaultValue = {data.nom_prenom_raison}
                        className="long1"
                        onChange={chngFn}
                        required
                      />
                      <Form.Control.Feedback
                        type="invalid"
                        className="form-group"
                      >
                        Veuillez remplir le Nom et Prénom ou Raison sociale
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
                        defaultValue = {data.adresse}
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
                      <Form.Label className="control-label">
                        Code postal :
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="code_postal"
                        defaultValue = {data.code_postal}
                        min="0000"
                        max="9999"
                        onInput={(e) =>
                          (e.target.value = e.target.value.slice(0, 4))
                        }
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
                        defaultValue = {data.activite}
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
                    <Form.Group
                      controlId="cessation_jour"
                      className="form-group"
                    >
                      <Form.Label>Jour :</Form.Label>
                      <Form.Control
                        type="text"
                        name="cessation_jour"
                        defaultValue = {data.cessation_jour}
                        onChange={chngFn}
                        required
                        min="1"
                        max="31"
                        className="text-center"
                        onInput={(e) =>
                          (e.target.value = e.target.value.slice(0, 2))
                        }
                      />
                    </Form.Group>
                  </Col>

                  <Col md={1}>
                    <Form.Group
                      controlId="cessation_mois"
                      className="form-group"
                    >
                      <Form.Label>Mois :</Form.Label>
                      <Form.Control
                        type="text"
                        name="cessation_mois"
                        defaultValue = {data.cessation_mois}
                        onChange={chngFn}
                        required
                        min="1"
                        max="12"
                        className="text-center"
                        onInput={(e) =>
                          (e.target.value = e.target.value.slice(0, 2))
                        }
                      />
                    </Form.Group>
                  </Col>

                  <Col md={2}>
                    <Form.Group
                      controlId="cessation_annee"
                      className="form-group"
                    >
                      <Form.Label>Année :</Form.Label>
                      <Form.Control
                        type="text"
                        name="cessation_annee"
                        defaultValue = {data.cessation_annee}
                        onChange={chngFn}
                        required
                        min="1900"
                        max="2200"
                        onInput={(e) =>
                          (e.target.value = e.target.value.slice(0, 4))
                        }
                      />
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
                        defaultValue = {data.email}
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
                          validated1 &&
                          (!OldPasswordCheck || form_Data.anpassword === "")
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {!OldPasswordCheck && form_Data.anpassword !== ""
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
                <div className="password-forgot">
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
      </Container>
    </>
  );
};

export default Moncompte;
