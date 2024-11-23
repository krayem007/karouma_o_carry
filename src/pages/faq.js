import icon from "../images/icon.png";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Config from "./config.json";
import { Helmet } from "react-helmet";
import { Collapse, Container, Breadcrumb, Row } from "react-bootstrap";

const TITLE = "FAQ | " + Config.SITE_TITLE;
const DESC = "FAQ";
const CANONICAL = Config.SITE_DOMAIN + "/Faq";

class Faq extends Component {
  state = {
    openItems: [], // Array to track open FAQ items
  };

  toggleCollapse = (item) => {
    this.setState((prevState) => {
      const isOpen = prevState.openItems.includes(item);
      return {
        openItems: isOpen
          ? prevState.openItems.filter((i) => i !== item) // Close item
          : [...prevState.openItems, item], // Open item
      };
    });
  };

  render() {
    const { openItems } = this.state;

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
        <Container className="FAQ">
          <Breadcrumb>
            <Breadcrumb.Item className="no-decoration">
              <Link to="/">Accueil</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>FAQ</Breadcrumb.Item>
          </Breadcrumb>

          <h1 className="form-title">FAQ</h1>

          <Row>
            <a
              onClick={() => this.toggleCollapse(1)}
              aria-controls="collapse-item-1"
              aria-expanded={openItems.includes(1)}
              href="#!"
              className="QES"
            >
              1. Qu'est-ce que Déclaration Facile ?
            </a>
            <Collapse in={openItems.includes(1)} className="Collap">
              <div id="collapse-item">
                Déclaration Facile est une plateforme en ligne qui vous permet
                de préparer et soumettre facilement vos déclarations fiscales
                mensuelles. Vous pouvez y gérer vos factures, vos paiements et
                effectuer vos déclarations de manière simple et rapide.
              </div>
            </Collapse>
          </Row>

          <Row>
            <a
              onClick={() => this.toggleCollapse(2)}
              aria-controls="collapse-item-2"
              aria-expanded={openItems.includes(2)}
              href="#!"
              className="QES"
            >
              2. Comment créer un compte sur Déclaration Facile ?
            </a>
            <Collapse in={openItems.includes(2)} className="Collap">
              <div id="collapse-item">
                Pour créer un compte, cliquez sur "Créer un compte" en haut à
                droite de la page d'accueil. Vous devrez fournir votre adresse
                email, créer un mot de passe, et remplir des informations de
                base pour finaliser votre inscription.
              </div>
            </Collapse>
          </Row>
          <Row>
            <a
              onClick={() => this.toggleCollapse(3)}
              aria-controls="collapse-item-3"
              aria-expanded={openItems.includes(3)}
              href="#!"
              className="QES"
            >
              3. Comment me connecter à mon compte ?
            </a>
            <Collapse in={openItems.includes(3)} className="Collap">
              <div id="collapse-item">
                Une fois inscrit, cliquez sur "Connexion" en haut de la page
                d'accueil et entrez votre email ainsi que votre mot de passe. Si
                vous avez oublié votre mot de passe, vous pouvez réinitialiser
                celui-ci en cliquant sur "Mot de passe oublié".
              </div>
            </Collapse>
          </Row>
          <Row>
            <a
              onClick={() => this.toggleCollapse(4)}
              aria-controls="collapse-item"
              aria-expanded={openItems.includes(4)}
              href="#!"
              className="QES"
            >
              4. Comment puis-je ajouter mes factures et mes informations de
              paie et de retenue à la source ?
            </a>
            <Collapse in={openItems.includes(4)} className="Collap">
              <div id="collapse-item">
                Dans la rubrique Gérer mes déclarations, vous pouvez ajouter vos
                factures, informations de paie et de retenue à la source en
                remplissant les champs requis, tels que le montant de vos
                factures, vos salaires, vos retenues à la source et d'autres
                informations pertinentes.
              </div>
            </Collapse>
          </Row>

          <Row>
            <a
              onClick={() => this.toggleCollapse(5)}
              aria-controls="collapse-item-5"
              aria-expanded={openItems.includes(5)}
              href="#!"
              className="QES"
            >
              5. Est-ce que Déclaration Facile est sécurisé ?
            </a>
            <Collapse in={openItems.includes(5)} className="Collap">
              <div id="collapse-item">
                Oui, votre sécurité est notre priorité. Nous utilisons des
                protocoles de sécurité avancés pour protéger vos données
                personnelles et fiscales. Toutes vos informations sont cryptées
                et stockées de manière sécurisée.
              </div>
            </Collapse>
          </Row>
          <Row>
            <a
              onClick={() => this.toggleCollapse(6)}
              aria-controls="collapse-item"
              aria-expanded={openItems.includes(6)}
              href="#!"
              className="QES"
            >
              6. Comment puis-je copier ma déclaration ?
            </a>
            <Collapse in={openItems.includes(6)} className="Collap">
              <div id="collapse-item">
                Une fois que vous avez renseigné toutes les informations liées à
                votre déclaration dans la rubrique Gérer mes déclarations, vous
                aurez accès à un tableau récapitulatif ainsi qu'à un fichier PDF
                contenant votre déclaration, disponibles dans la rubrique Mes
                déclarations.
              </div>
            </Collapse>
          </Row>
          <Row>
            <a
              onClick={() => this.toggleCollapse(7)}
              aria-controls="collapse-item"
              aria-expanded={openItems.includes(7)}
              href="#!"
              className="QES"
            >
              7. Puis-je modifier ma déclaration après saisie ?
            </a>
            <Collapse in={openItems.includes(7)} className="Collap">
              <div id="collapse-item">
                Une fois votre déclaration saisie, vous pouvez la modifier
                directement sur la plateforme, dans la rubrique Gérer mes
                déclarations.
              </div>
            </Collapse>
          </Row>
          <Row>
            <a
              onClick={() => this.toggleCollapse(8)}
              aria-controls="collapse-item"
              aria-expanded={openItems.includes(8)}
              href="#!"
              className="QES"
            >
              8. Comment puis-je consulter mes anciennes déclarations ?
            </a>
            <Collapse in={openItems.includes(8)} className="Collap">
              <div id="collapse-item">
                Vous pouvez consulter toutes vos déclarations précédentes dans
                les rubriques Gérer mes déclarations et Mes déclarations de
                votre compte. Pour chaque déclaration, vous avez la possibilité
                de la télécharger.
              </div>
            </Collapse>
          </Row>
          <Row>
            <a
              onClick={() => this.toggleCollapse(9)}
              aria-controls="collapse-item"
              aria-expanded={openItems.includes(9)}
              href="#!"
              className="QES pb-3"
            >
              9. Qui puis-je contacter en cas de problème ?
            </a>
            <Collapse in={openItems.includes(9)} className="Collap">
              <div id="collapse-item">
                Si vous avez des questions ou rencontrez un problème, vous
                pouvez contacter notre service client par email à
                support@declarationfacile.tn ou via notre formulaire de contact.
              </div>
            </Collapse>
          </Row>
        </Container>
      </>
    );
  }
}

export default Faq;
