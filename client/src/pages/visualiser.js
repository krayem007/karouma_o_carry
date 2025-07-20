import icon from "../images/icon.png";
import React, { useState, useEffect } from "react";
import Config from "./config.json";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Breadcrumb, Row, Button, Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from  "axios";

const instance = axios.create({
  baseURL: 'http://localhost:5002', // Base URL of the Express backend
  withCredentials: true, // Allow sending cookies with requests
});


const TITLE = "Mes déclarations | " + Config.SITE_TITLE;
const DESC = "Mes déclarations";
const CANONICAL = Config.SITE_DOMAIN + "/visualiser";
const hiddenStyle = {
  display: 'none',
};


const Visualiser = () => {
  const [rows, setRows] = useState([]);
  const [selectAllRows, setSelectAllRows] = useState(false);
  const navigate = useNavigate(); // Initialize navigate hook


  const handleSelectAllRows = () => {
    setSelectAllRows(!selectAllRows);
    setRows(rows.map((row) => ({ ...row, selected: !selectAllRows })));
  };

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

  const print_doc = () =>{
    instance.post("/print_doc", date).then((response) => 
    {
      
    });
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
          <Breadcrumb.Item active>Mes déclarations</Breadcrumb.Item>
        </Breadcrumb>
        <h1 class="form-title"> Mes déclarations </h1>
        <Row>
          <Container className="table-container">
            <Table hover responsive className="table-custom table-responsive">
              <thead>
                <tr>
                  <th className="checkbox-column">
                    <input
                      type="checkbox"
                      onChange={handleSelectAllRows}
                      checked={selectAllRows}
                      required
                    />
                  </th>
                  <th>Mois</th>
                  <th>Année</th>
                  <th>Total R.S</th>
                  <th>TFP</th>
                  <th>FOPROLOS</th>
                  <th>Droit de Consommation</th>
                  <th>TVA</th>
                  <th>Droit de timbre fiscal</th>
                  <th>TCL</th>
                  <th>Total à déclarer</th>
                  <th style={hiddenStyle}>id</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input type="checkbox" className="declaration" />
                  </td>
                  <td>
                    <a href="/src/6396802.pdf" download>
                      12
                    </a>
                  </td>
                  <td>2024</td>
                  <td>175,772</td>
                  <td>20,000</td>
                  <td>10,000</td>
                  <td>-</td>
                  <td>148,552</td>
                  <td>1,000</td>
                  <td>4,762</td>
                  <td>360,086</td>
                  <td style={hiddenStyle}>0</td>
                </tr>
              </tbody>
            </Table>
            {/* Button Section */}
          </Container>
        </Row>
        <Row>
          <div className="boutons">
            <Button variant="primary" type="submit" onClick={print_doc} className="custom-primary">
              Imprimer
            </Button>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Visualiser;
