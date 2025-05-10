import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet";

class Footer extends React.Component {
  render() {
    return (
      <>
        <Helmet>
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
        <footer className="bgcolor">
          <Container fluid style={{ paddingTop: "30px" }}>
            <Row className="mb-3">
              <Col className="footer-menu">
                <ul className="list-unstyled">
                  <li>
                    <Link to="/" className="text-white">
                      Accueil
                    </Link>
                  </li>
                  <li>
                    <Link to="/condition" className="text-white">
                      Conditions générales
                    </Link>
                  </li>
                  <li>
                    <Link to="/FAQ" className="text-white">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link to="/propos" className="text-white">
                      À propos
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-white">
                      Contact
                    </Link>
                  </li>
                </ul>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col className="footer-icons">
                <ul className="list-unstyled d-flex justify-content-center">
                  <li className="mx-3">
                    <a
                      href="https://www.facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ion-icon name="logo-facebook"></ion-icon>
                    </a>
                  </li>
                  <li className="mx-3">
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ion-icon name="logo-twitter"></ion-icon>
                    </a>
                  </li>
                  <li className="mx-3">
                    <a
                      href="https://www.instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ion-icon name="logo-instagram"></ion-icon>
                    </a>
                  </li>
                  <li className="mx-3">
                    <a
                      href="https://www.linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ion-icon name="logo-linkedin"></ion-icon>
                    </a>
                  </li>
                </ul>
              </Col>
            </Row>
            <Row>
              <Col className="footer-copyright text-center">
                <p>
                  Déclaration Facile © Copyright 2025. Tous droits réservés.
                </p>
              </Col>
            </Row>
            <Row className="text-center">
              <Col>
                <a href="#">
                  <div className="up">
                    <i className="fa fa-angle-up" aria-hidden="true"></i>
                  </div>
                </a>
              </Col>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default Footer;
