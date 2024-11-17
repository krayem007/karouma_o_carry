import React from "react";
import { Link } from "react-router-dom";
import Config from "./config.json";
import { Helmet } from "react-helmet";
import { Card, Container, Row, Col } from "react-bootstrap";
const TITLE = "Home | " + Config.SITE_TITLE;
const DESC = "Home";
const CANONICAL = Config.SITE_DOMAIN + "/";
import icon from "../images/icon.png";

class Home extends React.Component {
  render() {
    const { isLoggedIn } = this.props;
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
                  Solution simplifiée pour la déclaration de TVA de manière
                  simple et professionnelle
                </Card.Title>
                <Card.Subtitle className="card-subtitle">
                  Conçu pour être convivial et accessible, cet outil tout-en-un
                  répond parfaitement à vos exigences
                </Card.Subtitle>
                <Card.Body className="card-body">
                  Déclaration Facile est le premier site tunisien dédié à la
                  gestion en ligne des déclarations de TVA et aux informations
                  fiscales. Conçu par un expert financier et un ingénieur
                  informatique, ce service permet aux PME, professions
                  libérales, et autres structures de taille moyenne de gérer
                  leurs déclarations de TVA en ligne grâce à un logiciel
                  intuitif et facile à utiliser, accessible depuis la Tunisie ou
                  l'étranger.
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
                <Col md="auto" className="container-col mb-4">
                  <Card as={Link} to="/gerer" id="clic">
                    <div>
                      <i className="fa-solid fa-calculator"></i>
                    </div>
                    <Card.Title as="h3">Saisissez vos informations</Card.Title>
                    <Card.Body>
                      Renseignez vos factures et les informations de vos fiches
                      de paie
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
                <Col md="auto" className="container-col mb-4">
                  <Card id="clic" as={Link} to="/visualiser">
                    <div>
                      <i className="fa-solid fa-print"></i>
                    </div>
                    <Card.Title as="h3">Imprimer vos déclarations</Card.Title>
                    <Card.Body>
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
                      Renseignez vos factures et les informations de vos fiches
                      de paie
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
      </>
    );
  }
}
export default Home;
