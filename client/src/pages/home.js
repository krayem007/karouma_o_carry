import icon from "../images/icon.png";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Config from "./config.json";
import { Helmet } from "react-helmet-async";
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
const CANONICAL = Config.SITE_DOMAIN + "/";

const Home = ({ isLoggedIn }) => {
  const { t } = useTranslation();
  const TITLE = t("home.titre_meta") + " | " + Config.SITE_TITLE;
  const DESC = t("home.titre_meta");
  const [montantCNSS, setMontantCNSS] = useState('');
  const [moisPrime, setMoisPrime] = useState('');
  const [chefFamille, setChefFamille] = useState('');
  const [nbEnfants, setNbEnfants] = useState('');
  const [salaireBrut, setSalaireBrut] = useState('');
  const [salaireNet, setSalaireNet] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleCalculate = async () => {
    setErrorMsg('');
    setSalaireBrut('');
    setSalaireNet('');

    const cnss = Number(montantCNSS);
    if (!montantCNSS || cnss <= 0) {
      setErrorMsg(t("home.err_montant"));
      return;
    }

    if (!moisPrime || Number(moisPrime) <= 0) {
      setErrorMsg(t("home.err_mois"));
      return;
    }

    if (!chefFamille) {
      setErrorMsg(t("home.err_chef"));
      return;
    }

    let enfants = 0;
    if (chefFamille === 'Oui') {
      if (nbEnfants === '' || Number(nbEnfants) < 0) {
        setErrorMsg(t("home.err_enfants"));
        return;
      }
      enfants = Number(nbEnfants);
    }

    // Calcul du salaire brut mensuel
    const mois = Number(moisPrime);
    let brut = mois > 0 ? cnss / mois : cnss / 3;

    setSalaireBrut(brut.toFixed(3));

    // Calcul du salaire net via l'API
    try {
      const response = await fetch('/calculate_net', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          salaireBrut: brut,
          chef: chefFamille,
          enfants: enfants
        }),
      });

      if (!response.ok) {
        throw new Error(t("home.err_serveur"));
      }

      const data = await response.json();
      if (data && data.net !== undefined) {
        setSalaireNet(Number(data.net).toFixed(3));
      } else {
        setErrorMsg(t("home.err_calcul"));
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(t("home.err_connexion"));
    }
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
                {t("home.card_title")}
              </Card.Title>
              <Card.Subtitle className="card-subtitle">
                {t("home.card_subtitle")}
              </Card.Subtitle>
              <Card.Body className="card-body">
                {t("home.card_body")}
              </Card.Body>
              {!isLoggedIn && (
                <Link className="botton" to="Inscription">
                  {t("home.inscrivez_vous")}
                </Link>
              )}
            </Card>
          </Col>
        </Row>
      </Container>

      <Container fluid>
        <Row>
          <Col className="comment">
            <h2 className="text-center">{t("home.comment_fonctionne")}</h2>
          </Col>
        </Row>
        <Row className="comment justify-content-center mt-4">
          {!isLoggedIn && (
            <Col md="auto" className="col-card mb-4">
              <Card className="card text-center">
                <div>
                  <i className="fa-regular fa-address-card"></i>
                </div>
                <Card.Title as="h3">{t("home.etape1_titre")}</Card.Title>
                <Card.Body>
                  {t("home.etape1_desc")}
                </Card.Body>
                <Link className="botton" to="Inscription" id="cardcomment">
                  {t("home.en_savoir_plus")}
                </Link>
              </Card>
            </Col>
          )}
          {!isLoggedIn && (
            <Col md={1} className="arrow-col modern-arrow-col">
              <i className="fas fa-angle-double-right modern-arrow-icon" id="arrow"></i>
            </Col>
          )}
          {isLoggedIn ? (
            <>
              <Col md="auto" className="col-card mb-4">
                <Link to="/gerer" className="modern-card-link">
                  <div className="icon-wrapper">
                    <i className="fa-solid fa-calculator"></i>
                  </div>
                  <div className="card-title">{t("home.etape2_titre")}</div>
                  <div className="bodyconnected">
                    {t("home.etape2_desc")}
                  </div>
                </Link>
              </Col>
            </>
          ) : (
            <>
              <Col md="auto" className="col-card mb-4">
                <Card className="card text-center">
                  <div>
                    <i className="fa-solid fa-calculator"></i>
                  </div>
                  <Card.Title as="h3">{t("home.etape2_titre")}</Card.Title>
                  <Card.Body>
                    {t("home.etape2_desc")}
                  </Card.Body>
                  <Link className="botton" to="Inscription" id="cardcomment">
                    {t("home.en_savoir_plus")}
                  </Link>
                </Card>
              </Col>
            </>
          )}
          <Col md={1} className="arrow-col modern-arrow-col">
            <i className="fas fa-angle-double-right modern-arrow-icon" id="arrow"></i>
          </Col>
          {isLoggedIn ? (
            <>
              <Col md="auto" className="col-card mb-4">
                <Link to="/declaration" className="modern-card-link">
                  <div className="icon-wrapper">
                    <i className="fa-solid fa-print"></i>
                  </div>
                  <div className="card-title">{t("home.etape3_titre")}</div>
                  <div className="bodyconnected">
                    {t("home.etape3_desc")}
                  </div>
                </Link>
              </Col>
            </>
          ) : (
            <>
              <Col md="auto" className="col-card mb-4">
                <Card className="card text-center">
                  <div>
                    <i className="fa-solid fa-print"></i>
                  </div>
                  <Card.Title as="h3">{t("home.etape3_titre")}</Card.Title>
                  <Card.Body>
                    {t("home.etape3_desc")}
                  </Card.Body>
                  <Link className="botton" id="cardcomment" to="Inscription">
                    {t("home.en_savoir_plus")}
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
            <h2 className="text-center">{t("home.verificateur_titre")}</h2>
          </Col>
        </Row>
        <Row className="comment justify-content-center mt-4">
          <Col md={10} className="mb-4">
            <div className="cnss-dashboard-card text-center">
              <div className="cnss-icon-header">
                <i className="fa-solid fa-check-to-slot"></i>
              </div>
              <h3 className="card-titlecnss">
                {t("home.verificateur_desc")}              </h3>

              <h4 className="cnss-subtitle">
                {t("home.verificateur_sous_titre")}
              </h4>

              {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

              <Form className="text-start" onSubmit={(e) => { e.preventDefault(); handleCalculate(); }}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>{t("home.montant_cnss")}</Form.Label>
                      <Form.Control
                        type="number"
                        className="cnssfc"
                        value={montantCNSS}
                        onChange={(e) => setMontantCNSS(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>{t("home.mois_travailles")}</Form.Label>
                      <Form.Control
                        type="number"
                        className="cnssfc"
                        min="1"
                        value={moisPrime}
                        onChange={(e) => setMoisPrime(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>{t("home.chef_famille")}</Form.Label>
                      <Form.Select
                        className="cnssfc"
                        value={chefFamille}
                        onChange={(e) => {
                          setChefFamille(e.target.value);
                          if (e.target.value === 'Non') {
                            setNbEnfants('');
                          }
                        }}
                      >
                        <option value="">{t("common.selectionner")}</option>
                        <option value="Oui">{t("common.oui")}</option>
                        <option value="Non">{t("common.non")}</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>{t("home.nb_enfants")}</Form.Label>
                      <Form.Control
                        type="number"
                        className="cnssfc"
                        value={nbEnfants}
                        onChange={(e) => setNbEnfants(e.target.value)}
                        min="0"
                        disabled={chefFamille !== 'Oui'}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="boutons">
                  <Button variant="primary" className="green" onClick={handleCalculate}>
                    {t("home.calculer")}
                  </Button>
                </div>

                {(salaireBrut || salaireNet) && (
                  <div className="result-box-container">
                    <Row>
                      <Col md={6} className="mb-3 mb-md-0">
                        <div className="result-item">
                          <div className="result-item-label">{t("home.salaire_brut")}</div>
                          <div className="result-item-value">{salaireBrut || '0.000'} <span className="result-unit">{t("common.tnd")}</span></div>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="result-item">
                          <div className="result-item-label">{t("home.salaire_net")}</div>
                          <div className="result-item-value">{salaireNet || '0.000'} <span className="result-unit">{t("common.tnd")}</span></div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                )}
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
