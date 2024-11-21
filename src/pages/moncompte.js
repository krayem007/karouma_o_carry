import icon from "../images/icon.png";
import React, { useState } from "react";
import { Link } from "react-router-dom";
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
} from "react-bootstrap";

const TITLE = "Mon Compte | " + Config.SITE_TITLE;
const DESC = "Mon Compte ";
const CANONICAL = Config.SITE_DOMAIN + "/moncompte";

const Moncompte = () => {
  const [validated, set_Validated] = useState(false);
  const [form_Data, set_Form_Data] = useState({
    anpassword: "",
    confirm_password: "",
    email: "",
    nvpassword: "",
  });

  const [alert, set_Alert] = useState(null);

  const handleRemoveItem = () => {
    const res = window.confirm(
      "Êtes-vous sûr de vouloir supprimer définitivement votre compte ?"
    );
  };

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
    set_Form_Data((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    set_Validated(false);
  };

  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
        <link rel="canonical" href={CANONICAL} />
        <meta name="description" content={DESC} />
        <link rel="icon" href={icon} type="image/png" />;
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
                  <Col md={1}>
                    <Form.Group controlId="code_acte">
                      <Form.Label ClasseName="label">Code acte :</Form.Label>
                      <Form.Control
                        type="text"
                        name="code_acte"
                        className="text-center"
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
                    <Form.Group controlId="identifiant_fiscal">
                      <Form.Label>Identifiant fiscal :</Form.Label>
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
                    <Form.Group controlId="identifiant_tva">
                      <Form.Label>Identifiant T.V.A :</Form.Label>
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
                    <Form.Group controlId="code_categorie">
                      <Form.Label>Code catégorie :</Form.Label>
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
                  <Col md={9}>
                    <Form.Group controlId="adresse">
                      <Form.Label>Adresse ou siège social :</Form.Label>
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

                  <Col md={1}>
                    <Form.Group controlId="code_postal">
                      <Form.Label ClasseName="label">
                        {" "}
                        Code postal :{" "}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="code_acte"
                        min="0000"
                        max="9999"
                        className="text-center"
                        onInput={(e) =>
                          (e.target.value = e.target.value.slice(0, 4))
                        }
                        onChange={chngFn}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Veuillez remplir le code postal
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="main-user-info d-flex">
                  <Col md={4}>
                    <Form.Group controlId="activite">
                      <Form.Label>Activité :</Form.Label>
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
                        onInput={(e) =>
                          (e.target.value = e.target.value.slice(0, 2))
                        }
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
                        onInput={(e) =>
                          (e.target.value = e.target.value.slice(0, 2))
                        }
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
                validated={validated}
                onSubmit={submitFn}
                className="register"
              >
                <Row className="main-user-info">
                  <Col md={6}>
                    <Form.Group controlId="email" className="gray-background">
                      <Form.Label>E-mail :</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        className="grey"
                        required
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="main-user-info">
                  <Col md={6}>
                    <Form.Group controlId="anpassword">
                      <Form.Label>Ancien mot de passe :</Form.Label>
                      <Form.Control
                        type="password"
                        name="anpassword"
                        className="mail_input"
                        onChange={chngFn}
                        minLength={6}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Veuillez entrer votre ancien mot de passe.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="main-user-info">
                  <Col md={6}>
                    <Form.Group controlId="nvpassword">
                      <Form.Label>Nouveau mot de passe :</Form.Label>
                      <Form.Control
                        type="password"
                        name="nvpassword"
                        className="mail_input"
                        value={form_Data.nvpassword}
                        onChange={chngFn}
                        minLength={6}
                        isInvalid={validated && form_Data.nvpassword.length < 6}
                        required
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
                      <Form.Label className="label">
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
                          validated &&
                          (form_Data.confirm_password === "" || // Empty
                            form_Data.confirm_password.length < 6 || // Less than 6 characters
                            form_Data.confirm_password !== form_Data.nvpassword) // Ensure it has at least 6 characters
                        }
                        isValid={
                          validated &&
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
