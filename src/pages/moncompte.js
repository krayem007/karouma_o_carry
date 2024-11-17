import react from "react";
import { Link } from "react-router-dom";
import Config from "./config.json";
import { Helmet } from "react-helmet";
import icon from "../images/icon.png";

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

class Moncompte extends react.Component {
  render() {
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
                <Form className="register">
                  <Row className="main-user-info">
                    <Col md={4}>
                      <Form.Group controlId="code_acte">
                        <Form.Label ClasseName="label">Code acte :</Form.Label>
                        <Form.Control type="text" name="code_acte" />
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
                        <Form.Label>
                          Nom et Prénom ou Raison sociale :
                        </Form.Label>
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
                        <Form.Control
                          type="text"
                          name="adresse"
                          className="long2"
                        />
                      </Form.Group>
                    </Col>

                    <Col md={1}>
                      <Form.Group controlId="code_postal">
                        <Form.Label ClasseName="label">
                          Code postal :
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="code_acte"
                          min="0000"
                          max="9999"
                          className="text-center"
                        />
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
                <Form className="register">
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
                      <Form.Group controlId="password">
                        <Form.Label>Ancien mot de passe :</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          className="mail_input"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="main-user-info">
                    <Col md={6}>
                      <Form.Group controlId="password">
                        <Form.Label>Nouveau mot de passe :</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          className="mail_input"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="main-user-info">
                    <Col md={6}>
                      <Form.Group controlId="confirm_password">
                        <Form.Label ClasseName="label">
                          Confirmation du nouveau mot de passe :
                        </Form.Label>
                        <Form.Control
                          type="password"
                          name="confirm_password"
                          className="mail_input"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="boutons">
                    <Button variant="primary" className="green" type="submit">
                      Valider
                    </Button>
                  </div>
                  <div className="password-forgot">
                    <Button variant="link" className="forgot">
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
  }
}

export default Moncompte;
