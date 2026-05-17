import icon from "../images/icon.png";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Config from "./config.json";
import { Helmet } from "react-helmet";
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";
const TITLE = "Accueil | " + Config.SITE_TITLE;
const DESC = "Accueil";
const CANONICAL = Config.SITE_DOMAIN + "/";

const Home = ({ isLoggedIn }) => {
  const [montantCNSS, setMontantCNSS] = useState('');
  const [hasPrime, setHasPrime] = useState('');
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
      setErrorMsg("Le montant CNSS doit être supérieur à 0.");
      return;
    }
    
    if (hasPrime === 'Oui') {
      const mois = Number(moisPrime);
      if (moisPrime === '' || mois < 0) {
        setErrorMsg("Le nombre de mois de prime ne peut pas être négatif ou vide.");
        return;
      }
    }
    
    const enfants = Number(nbEnfants);
    if (nbEnfants === '' || enfants < 0) {
      setErrorMsg("Le nombre d'enfants ne peut pas être négatif ou vide.");
      return;
    }

    if (!chefFamille) {
      setErrorMsg("Veuillez spécifier si vous êtes chef de famille.");
      return;
    }

    // Calcul du salaire brut mensuel
    let brut = 0;
    if (hasPrime === 'Oui') {
      brut = cnss / (3 + Number(moisPrime));
    } else {
      brut = cnss / 3;
    }
    
    setSalaireBrut(brut.toFixed(3));

    // Calcul du salaire net via l'API
    try {
      const response = await fetch('http://localhost:5002/calculate_net', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          salaireBrut: brut,
          chef: chefFamille,
          enfants: nbEnfants
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur de communication avec le serveur.");
      }

      const data = await response.json();
      if (data && data.net !== undefined) {
        setSalaireNet(Number(data.net).toFixed(3));
      } else {
        setErrorMsg("Erreur lors du calcul du salaire net.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Une erreur s'est produite lors de la connexion au serveur.");
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
                {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
                <Form>
                  <Form.Group className="text-start">
                    <Form.Label>Montant trimestriel déclaré au CNSS</Form.Label>
                    <Form.Control
                      type="number"
                      className="cnssfc"
                      value={montantCNSS}
                      onChange={(e) => setMontantCNSS(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mt-3 text-start">
                    <Form.Label>Y a-t-il une prime durant ce trimestre ?</Form.Label>
                    <Form.Select
                      aria-label="Y a-t-il une prime durant ce trimestre ?"
                      className="cnssfc"
                      name="prime_trimestre"
                      value={hasPrime}
                      onChange={(e) => {
                        setHasPrime(e.target.value);
                        if (e.target.value !== 'Oui') {
                          setMoisPrime('');
                        }
                      }}
                    >
                      <option value="">Sélectionner...</option>
                      <option value="Oui">Oui</option>
                      <option value="Non">Non</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mt-3 text-start">
                    <Form.Label>Nombre de mois de la prime</Form.Label>
                    <Form.Control
                      type="number"
                      className="cnssfc"
                      min="0"
                      value={moisPrime}
                      onChange={(e) => setMoisPrime(e.target.value)}
                      disabled={hasPrime !== 'Oui'}
                    />
                  </Form.Group>
                  <Form.Group className="mt-3 text-start">
                    <Form.Label>Chef de famille ou non ?</Form.Label>
                    <Form.Select
                      aria-label="Chef de famille"
                      className="cnssfc"
                      value={chefFamille}
                      onChange={(e) => setChefFamille(e.target.value)}
                    >
                      <option value="">Sélectionner...</option>
                      <option value="Oui">Oui</option>
                      <option value="Non">Non</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mt-3 text-start">
                    <Form.Label>Nombre d'enfants</Form.Label>
                    <Form.Control
                      type="number"
                      className="cnssfc"
                      value={nbEnfants}
                      onChange={(e) => setNbEnfants(e.target.value)}
                      min="0"
                    />
                  </Form.Group>
                  <Form.Group className="mt-3 text-start">
                    <Form.Label>Salaire brut mensuel</Form.Label>
                    <Form.Control
                      type="number"
                      className="cnssgrey"
                      readOnly
                      value={salaireBrut}
                    />
                  </Form.Group>
                  <Form.Group className="mt-3 text-start">
                    <Form.Label>Salaire net mensuel</Form.Label>
                    <Form.Control
                      type="number"
                      className="cnssgrey"
                      readOnly
                      value={salaireNet}
                    />
                  </Form.Group>
                  <div className="boutons">
                    <Button variant="primary" className="green" onClick={handleCalculate}>
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
