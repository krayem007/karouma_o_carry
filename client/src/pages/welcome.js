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
          className="d-flex justify-content-center align-items-center flex-column welcome-cards-container"
        >
          <Row className="justify-content-center gap-0 gap-md-4">
            <Col xs="auto" sm="auto">
              <Link to="/gerer" className="modern-card-link">
                <div className="icon-wrapper">
                  <i className="fa-solid fa-calculator"></i>
                </div>
                <div className="card-title">Saisissez vos informations</div>
                <div className="bodyconnected">
                  Renseignez vos factures et les informations de vos fiches de
                  paie
                </div>
              </Link>
            </Col>

            <Col xs="auto" sm="auto">
              <Link to="/declaration" className="modern-card-link">
                <div className="icon-wrapper">
                  <i className="fa-solid fa-print"></i>
                </div>
                <div className="card-title">Imprimer vos déclarations</div>
                <div className="bodyconnected">
                  Vérifiez vos déclarations en les visualisant, puis
                  imprimez-les
                </div>
              </Link>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default Welcome;
