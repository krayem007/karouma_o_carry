import icon from "../images/icon.png";
import React from "react";
import { Link } from "react-router-dom";
import Config from "./config.json";
import { Helmet } from "react-helmet";
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";
const TITLE = "Accueil | " + Config.SITE_TITLE;
const DESC = "Accueil";
const CANONICAL = Config.SITE_DOMAIN + "/";

const Home = ({ isLoggedIn }) => {
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
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <script
          type="module"
          src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
        ></script>
      </Helmet>
      <Container fluid>
        <Row>
          <Col className="carsour">
            <Card>
              <Card.Title className="card-title">
                Solution simplifiée pour la déclaration de TVA de manière simple
                et professionnelle
              </Card.Title>
              <Card.Subtitle className="card-subtitle">
                Conçu pour être convivial et accessible, cet outil tout-en-un
                répond parfaitement à vos exigences
              </Card.Subtitle>
              <Card.Body className="card-body">
                Déclaration Facile est le premier site tunisien dédié à la
                gestion en ligne des déclarations de TVA et aux informations
                fiscales. Conçu par un expert financier et un ingénieur
                informatique, ce service permet aux PME, professions libérales,
                et autres structures de taille moyenne de gérer leurs
                déclarations de TVA en ligne grâce à un logiciel intuitif et
                facile à utiliser, accessible depuis la Tunisie ou l'étranger.
              </Card.Body>
              {!isLoggedIn && (
                <Link className="botton" to="Inscription">
                  Inscrivez-vous
                </Link>
              )}
            </Card>
          </Col>
        </Row>
      </Container>

      <Container fluid>
        <Row>
          <Col className="comment">
            <h2 className="text-center">Voici comment ça fonctionne :</h2>
          </Col>
        </Row>
        <Row className="comment justify-content-center mt-4">
          {!isLoggedIn && (
            <Col md="auto" className="col-card mb-4">
              <Card className="card text-center">
                <div>
                  <i className="fa-regular fa-address-card"></i>
                </div>
                <Card.Title as="h3">Inscrivez-vous</Card.Title>
                <Card.Body>
                  Première étape pour effectuer votre déclaration de TVA
                </Card.Body>
                <Link className="botton" to="Inscription" id="cardcomment">
                  En savoir plus
                </Link>
              </Card>
            </Col>
          )}
          {!isLoggedIn && (
            <Col md={1} className="arrow-col">
              <i className="fas fa-angle-double-right" id="arrow"></i>
            </Col>
          )}
          {isLoggedIn ? (
            <>
              <Col md="auto" className="col-card mb-4">
                <Card as={Link} to="/gerer" id="clic">
                  <div>
                    <i className="fa-solid fa-calculator"></i>
                  </div>
                  <Card.Title as="h3">Saisissez vos informations</Card.Title>
                  <Card.Body className="bodyconnected">
                    Renseignez vos factures et les informations de vos fiches de
                    paie
                  </Card.Body>
                </Card>
              </Col>
            </>
          ) : (
            <>
              <Col md="auto" className="col-card mb-4">
                <Card className="card text-center">
                  <div>
                    <i className="fa-solid fa-print"></i>
                  </div>
                  <Card.Title as="h3">Imprimer vos déclarations</Card.Title>
                  <Card.Body>
                    Vérifiez vos déclarations en les visualisant, puis
                    imprimez-les
                  </Card.Body>
                  <Link className="botton" id="cardcomment" to="Inscription">
                    En savoir plus
                  </Link>
                </Card>
              </Col>
            </>
          )}
          <Col md={1} className="arrow-col">
            <i className="fas fa-angle-double-right" id="arrow"></i>
          </Col>
          {isLoggedIn ? (
            <>
              <Col md="auto" className="col-card mb-4">
                <Card id="clic" as={Link} to="/visualiser">
                  <div>
                    <i className="fa-solid fa-print"></i>
                  </div>
                  <Card.Title as="h3">Imprimer vos déclarations</Card.Title>
                  <Card.Body className="bodyconnected">
                    Vérifiez vos déclarations en les visualisant, puis
                    imprimez-les
                  </Card.Body>
                </Card>
              </Col>
            </>
          ) : (
            <>
              <Col md="auto" className="col-card mb-4">
                <Card className="card text-center">
                  <div>
                    <i className="fa-solid fa-calculator"></i>
                  </div>
                  <Card.Title as="h3">Saisissez vos informations</Card.Title>
                  <Card.Body>
                    Renseignez vos factures et les informations de vos fiches de
                    paie
                  </Card.Body>
                  <Link className="botton" to="Inscription" id="cardcomment">
                    En savoir plus
                  </Link>
                </Card>
              </Col>
            </>
          )}
        </Row>
      </Container>
      <Container fluid>
        <Row>
          <Col className="comment">
            <h2 className="text-center">Vérificateur des données CNSS :</h2>
          </Col>
        </Row>
        <Row className="comment justify-content-center mt-4">
          <Col md="auto" className="col-card mb-4">
            <Card className="cardcnss text-center">
              <div>
                <i class="fa-solid fa-check-to-slot"></i>
              </div>
              <Card.Title className="card-titlecnss">
                Outil simplifié pour la vérification CNSS et le calcul des
                salaires brut et net
              </Card.Title>

              <Card.Title as="h3">
                Saisissez les détails de votre déclaration CNSS :
              </Card.Title>
              <Card.Body>
                <Form>
                  <Form.Group>
                    <Form.Control
                      type="number"
                      placeholder="Montant trimestriel déclaré au CNSS"
                      className="cnssfc"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Select
                      aria-label="Chef de famille"
                      className="cnssfc"
                    >
                      <option value="">Chef de famille ou non ?</option>
                      <option value="Oui">Oui</option>
                      <option value="Non">Non</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="number"
                      placeholder="Nombre d'enfants"
                      className="cnssfc"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="number"
                      placeholder="Salaire brut mensuel"
                      className="cnssgrey"
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="number"
                      placeholder="Salaire net mensuel"
                      className="cnssgrey"
                      readOnly
                    />
                  </Form.Group>
                  <div className="boutons">
                    <Button variant="primary" className="green">
                      Calculer
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
