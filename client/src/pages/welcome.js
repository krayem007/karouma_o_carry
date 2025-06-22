import react, { useEffect, useState } from "react";
import icon from "../images/icon.png";
import Config from "./config.json";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { Container, Breadcrumb, Row, Card, Col } from "react-bootstrap";
import axios from  "axios";

const instance = axios.create({
  baseURL: 'http://localhost:5002', // Base URL of the Express backend
  withCredentials: true, // Allow sending cookies with requests
});


const TITLE = "Welcome | " + Config.SITE_TITLE;
const DESC = "Welcome ";
const CANONICAL = Config.SITE_DOMAIN + "/welcome";

const Welcome = () => {


  const user = localStorage.getItem("user");
  console.log(user);
  const navigate = useNavigate(); // Use useNavigate hook outside of chngFn
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
      <Container className="visualiser-page">
        <Breadcrumb>
          <Breadcrumb.Item className="no-decoration">
            <Link to="/">Accueil</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Welcome</Breadcrumb.Item>
        </Breadcrumb>
        <Row>
          <Col>
            <h1>Bienvenue {user} </h1>
            <p>
              Pour réaliser vos déclarations mensuelles, veuillez suivre les
              étapes suivantes :
            </p>
            <ul>
              <li>
                Commencez par saisir toutes vos factures, puis renseignez les
                informations relatives à votre paie. Enfin, complétez les
                informations concernant la retenue à la source.
              </li>
              <li>
                Assurez-vous que toutes les données sont correctement
                enregistrées pour faciliter la validation de votre déclaration.
              </li>
              <li>
                Une fois vos déclarations vérifiées, vous pouvez les imprimer en
                sélectionnant l'option 'Imprimer vos déclarations.'
              </li>
            </ul>
          </Col>
        </Row>

        <Container
          fluid
          className="d-flex justify-content-center align-items-center flex-column"
          style={{ minHeight: "300px", padding: "0 15px" }}
        >
          <Row className="comment justify-content-center">
            <Col xs={12} sm={6} md={5} className="container-col">
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

            <Col xs={12} sm={6} md={5} className="container-col">
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
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default Welcome;
