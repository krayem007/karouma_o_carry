import icon from "../images/icon.png";
import { Link } from "react-router-dom";
import Config from "./config.json";
import { Helmet } from "react-helmet";
import { Container, Breadcrumb } from "react-bootstrap";

const TITLE = "À propos | " + Config.SITE_TITLE;
const DESC = "À propos  ";
const CANONICAL = Config.SITE_DOMAIN + "/apropos";

const Propos = () => {
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
      <Container className="register">
        <Breadcrumb>
          <Breadcrumb.Item className="no-decoration">
            <Link to="/">Accueil</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>À propos</Breadcrumb.Item>
        </Breadcrumb>
        <h1 className="form-title">À propos</h1>
        <div className="pb-2">
          <p>
            <strong>Déclaration Facile</strong> est une plateforme innovante et
            intuitive, conçue pour simplifier la gestion en ligne des
            déclarations de TVA et des informations fiscales. Premier service de
            ce genre en Tunisie, il répond aux besoins des PME, professions
            libérales et structures de taille moyenne en offrant une solution
            complète, conviviale et sécurisée.
          </p>
          <p>
            Créée par une équipe d’experts alliant compétences financières et
            technologiques, Déclaration Facile met à disposition des outils
            performants permettant de gérer vos obligations fiscales de manière
            efficace, que vous soyez en Tunisie ou à l’étranger.
          </p>
        </div>
        <div className="pb-3">
          <h4>Notre mission</h4>
          <li className="li pb-1">
            Simplifier les démarches fiscales grâce à une interface intuitive et
            accessible.
          </li>
          <li className="li pb-1">
            Offrir un service professionnel adapté aux besoins des utilisateurs,
            quel que soit leur niveau en comptabilité.
          </li>
          <li className="li pb-1">
            Garantir la sécurité et la fiabilité des données via des
            technologies modernes.
          </li>
        </div>
        <div className="pb-2">
          <h4>Les fondateurs</h4>
          <h5>Akram - Expert en finance </h5>
          <p>
            <strong>Akram</strong>, diplômé en finance, possède une expérience
            significative en comptabilité et gestion financière. Il a accompagné
            de nombreuses entreprises dans leurs obligations fiscales et
            sociales, garantissant un respect optimal des normes réglementaires.
          </p>
          <h5>Ghassen - Ingénieur en informatique</h5>
          <p>
            <strong>Ghassen</strong>, ingénieur en informatique, est spécialisé
            dans le développement de solutions web intuitives. Avec une
            expertise en technologies cloud, il a conçu une plateforme
            performante adaptée aux besoins des utilisateurs.
          </p>
        </div>
        <div className="pb-3">
          <h4>Pourquoi choisir Déclaration Facile ?</h4>

          <li className="li pb-1">
            <strong>Calculs automatisés </strong>: Simplifiez vos déclarations
            de TVA, paie et autres obligations fiscales.
          </li>

          <li className="li pb-1">
            <strong>Solution tout-en-un</strong> : Gérez vos déclarations de
            manière simple, rapide et professionnelle.
          </li>
          <p>
            <strong>Avec Déclaration Facile</strong>, facilitez vos démarches et
            concentrez-vous sur le développement de votre activité.
          </p>
        </div>
      </Container>
    </>
  );
};

export default Propos;
