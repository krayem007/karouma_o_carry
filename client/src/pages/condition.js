import icon from "../images/icon.png";
import { Link } from "react-router-dom";
import Config from "./config.json";
import { Helmet } from "react-helmet";
import { Container, Breadcrumb } from "react-bootstrap";

const TITLE = "Conditions générales | " + Config.SITE_TITLE;
const DESC = "Conditions générales  ";
const CANONICAL = Config.SITE_DOMAIN + "/conditions";


const Conditions = () => {
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
          <Breadcrumb.Item active> Conditions générales</Breadcrumb.Item>
        </Breadcrumb>
        <h1 className="form-title"> Conditions générales</h1>
        <div className="pb-2">
          <h4>Présentation</h4>
          <p>
            Déclaration Facile est une plateforme en ligne de gestion des
            déclarations fiscales. L'accès à la plateforme se fait à distance
            via Internet, tandis que l'application reste installée sur le
            serveur de notre site et est accessible grâce à une connexion
            sécurisée.
          </p>
        </div>
        <div className="pb-2">
          <h4>Objet du Contrat</h4>
          <p>
            Ce contrat a pour objectif de définir les conditions d’utilisation
            de notre service en ligne. En souscrivant à notre offre, le Client
            obtient une licence personnelle et non exclusive pour accéder à
            notre logiciel en mode ASP, ainsi que les services associés.
          </p>
        </div>
        <div className="pb-2">
          <h4>Services</h4>
          <p>
            Déclaration Facile met à disposition du Client toutes les
            fonctionnalités de notre logiciel via une connexion à notre serveur
            par Internet. Les données du Client sont traitées et sauvegardées
            sur notre serveur. Nous assurons l’hébergement, la sécurité, la
            maintenance du logiciel, ainsi qu’une assistance technique par
            e-mail ou téléphone.
          </p>
          <p>
            Nous nous réservons la possibilité d’améliorer constamment notre
            logiciel pour garantir une meilleure expérience utilisateur.
          </p>
        </div>
        <div className="pb-2">
          <h4>Accès au Logiciel</h4>
          <p>
            Le logiciel reste hébergé sur nos serveurs et n’est pas distribué
            sous forme de supports physiques. L’accès au service se fait
            exclusivement par connexion sécurisée avec les identifiants fournis.
            Nous garantissons une disponibilité du service 24h/24 et 7j/7, sous
            réserve des interruptions dues à des problèmes techniques ou des
            événements imprévus.
          </p>
        </div>
        <div className="pb-2">
          <h4>Responsabilités du Client</h4>
          <p>
            Le Client est responsable des données qu’il saisit dans le logiciel,
            notamment des montants, des rubriques et des exonérations à
            appliquer. Toute erreur ou omission dans ces données relève de sa
            responsabilité exclusive, car le logiciel est mis à disposition pour
            lui permettre de gérer ses propres informations fiscales.
          </p>
          <p>
            Notre service de support intervient uniquement sur demande du
            Client. L’accès à notre plateforme est réservé aux utilisateurs
            abonnés, avec identifiants valides. Toute utilisation frauduleuse
            peut entraîner une restriction d’accès sans préavis.
          </p>
        </div>
        <div className="pb-2">
          <h4>Responsabilités de Déclaration Facile</h4>
          <p>
            Nous nous engageons à mettre en place tous les moyens nécessaires
            pour assurer la continuité du service et la sécurité de vos données.
            Nous sommes responsables de la maintenance et des mises à jour du
            logiciel, ainsi que de la sauvegarde régulière de vos informations.
          </p>
          <p>
            Nous nous assurons de la conformité du logiciel aux normes du marché
            et de son évolution continue pour offrir une expérience optimale.
          </p>
        </div>
        <div className="pb-2">
          <h4>Propriété Intellectuelle</h4>
          <p>
            Le site Déclaration Facile est propriétaire des droits de propriété
            intellectuelle relatifs au logiciel Déclaration Facile. Le Client
            bénéficie d'un droit d’utilisation non exclusif et non transférable.
            Il est interdit de reproduire, altérer ou contourner les protections
            mises en place sur notre logiciel.
          </p>
          <p>
            Le Client reste propriétaire des données qu’il transmet et traite
            via notre plateforme. Nous recommandons de conserver des copies de
            vos déclarations fiscales en cas de besoin.
          </p>
        </div>
        <div className="pb-2">
          <h4>Suivi et Maintenance</h4>
          <p>
            Le Client est responsable de la configuration de son environnement
            informatique (matériel et connexion Internet) nécessaire pour
            accéder à notre service. Tous les frais associés à cette
            configuration sont à la charge du Client.
          </p>
        </div>
        <div className="pb-2">
          <h4>Confidentialité des Données</h4>
          <p>
            Nous mettons en place des mesures techniques rigoureuses pour
            garantir la sécurité et la confidentialité de vos données. Aucune
            donnée ne sera communiquée à des tiers sans votre accord préalable,
            sauf obligation légale.
          </p>
        </div>
        <div className="pb-2">
          <h4>Conditions Financières et Durée</h4>
          <p>
            Les tarifs et les modalités de paiement sont disponibles sur notre
            site Internet. Le contrat est conclu pour une durée déterminée et
            peut être résilié à tout moment par le Client, sans préavis, à la
            fin de la période d’engagement.
          </p>
        </div>
        <div className="pb-2">
          <h4>Informations Légales</h4>
          <p>
            Notre site contient des informations légales mises à disposition des
            utilisateurs. Nous faisons tout notre possible pour garantir leur
            mise à jour. Cependant, nous encourageons nos utilisateurs à
            vérifier régulièrement les informations disponibles avant de les
            utiliser.
          </p>
        </div>
        <div className="pb-3">
          <h4>Garantie et Sauvegarde des Données</h4>
          <p>
            En cas de suppression de votre compte, nous nous engageons à
            restituer toutes les données et informations transmises par le
            Client, ainsi que les historiques et sauvegardes. Nous vous
            permettons de continuer à exploiter vos données, soit directement,
            soit avec l’assistance d’un autre prestataire, en vous fournissant
            ces données sous un format lisible par les logiciels standards du
            marché.
          </p>
        </div>
      </Container>
    </>
  );
};

export default Conditions;
