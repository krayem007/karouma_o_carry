import logo from "../images/logo.png";
import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons"; // Import the specific icon
import { Container, Navbar, Nav } from "react-bootstrap";
import axios from  "axios";

const instance = axios.create({
  baseURL: '', // Base URL of the Express backend
  withCredentials: true, // Allow sending cookies with requests
});


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  closeNavbar = () => this.setState({ expanded: false });

  render() {
    const { isLoggedIn, setIsLoggedIn } = this.props;
    return (
      <>
        <Navbar expand="lg" className="navbar"
          expanded={this.state.expanded}
          onToggle={(expanded) => this.setState({ expanded })}
        >
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
                    <Nav.Link as={Link} to="/moncompte" className="navbartext"
                      onClick={this.closeNavbar}>
                      Mon Compte
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/"
                      onClick={() => {
                        setIsLoggedIn(false);
                        instance.post("/logout").then((response) => 
                          {console.log(response.data);});
                        this.closeNavbar();
                      }}
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
                      onClick={this.closeNavbar}
                    >
                      Créer un compte
                    </Nav.Link>
                    <Nav.Link as={Link} to="/connexion" className="navbartext"
                      onClick={this.closeNavbar}>
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
