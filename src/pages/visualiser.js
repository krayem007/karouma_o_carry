import react from "react";
import Config from "./config.json";
import { Helmet } from "react-helmet";
import icon from "../images/icon.png";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  Row,
  Col,
  Form,
  Button,
  Container,
  Table,
} from "react-bootstrap";
const TITLE = "Gérer mes déclarations | " + Config.SITE_TITLE;
const DESC = "Gérer mes déclarations ";
const CANONICAL = Config.SITE_DOMAIN + "/visualiser";

class Visualiser extends react.Component {
  render() {
    return (
      <>
        <Helmet>
          <title>{TITLE}</title>
          <link rel="canonical" href={CANONICAL} />
          <meta name="description" content={DESC} />
          <link rel="icon" href={icon} type="image/png" />;
          <meta name="theme-color" content={Config.THEME_COLOR} />
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
        <Container className="visualiser-page">
          <Breadcrumb>
            <Breadcrumb.Item className="no-decoration">
              <Link to="/">Accueil</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item className="no-decoration">
              <Link to="/welcome">Welcome</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>
              Visualiser mes déclarations
            </Breadcrumb.Item>
          </Breadcrumb>
          <h1 class="form-title"> Mes déclarations </h1>
          <Row>
            <Container className="table-container">
              <Table hover responsive className="table-custom table-responsive">
                <thead>
                  <tr>
                    <th className="checkbox-column">
                      <input type="checkbox" id="all" />
                    </th>
                    <th>N°</th>
                    <th>Mois</th>
                    <th>Année</th>
                    <th>Total R.S</th>
                    <th>TFP</th>
                    <th>FOPROLOS</th>
                    <th>Total TVA déductible</th>
                    <th>Total TVA collecté</th>
                    <th>Solde TVA</th>
                    <th>Total à déclarer</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input type="checkbox" className="declaration" />
                    </td>
                    <td>
                      <a href="/src/6396802.pdf" download>
                        1
                      </a>
                    </td>
                    <td>09</td>
                    <td>2024</td>
                    <td>1500</td>
                    <td>250</td>
                    <td>150</td>
                    <td>1650</td>
                    <td>-</td>
                    <td>1650</td>
                    <td>3550</td>
                  </tr>
                  <tr>
                    <td>
                      <input type="checkbox" className="declaration" />
                    </td>
                    <td>
                      <a href="/src/6396802.pdf" download>
                        2
                      </a>
                    </td>
                    <td>08</td>
                    <td>2024</td>
                    <td>1000</td>
                    <td>250</td>
                    <td>150</td>
                    <td>-</td>
                    <td>50</td>
                    <td>-50</td>
                    <td>2000</td>
                  </tr>
                </tbody>
              </Table>
              {/* Button Section */}
            </Container>
          </Row>
          <Row>
            <div className="boutons">
              <Button
                variant="primary"
                type="submit"
                className="custom-primary"
              >
                Imprimer
              </Button>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default Visualiser;
