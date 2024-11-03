import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons"; // Import the specific icon
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import logo from "../images/logo1.png";

class Header extends React.Component {
  render() {
    const { isLoggedIn, setIsLoggedIn } = this.props;
    return (
      <>
        <Navbar expand="lg" className="navbar">
          <Container fluid>
            <Navbar.Brand as={Link} to="/">
              <img src={logo} alt="Déclaration Facile Logo" className="logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav">
              <FontAwesomeIcon icon={faBars} className="fa-bars" />
            </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                {isLoggedIn ? (
                  <>
                    <Nav.Link as={Link} to="/moncompte" className="navbartext">
                      Mon Compte
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/"
                      onClick={() => setIsLoggedIn(false)}
                      className="navbartext"
                    >
                      Déconnexion
                    </Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link
                      as={Link}
                      to="/inscription"
                      className="navbartext"
                    >
                      Créer un compte
                    </Nav.Link>
                    <Nav.Link as={Link} to="/connexion" className="navbartext">
                      Connexion
                    </Nav.Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default Header;
