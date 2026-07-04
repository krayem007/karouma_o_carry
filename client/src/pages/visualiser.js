import icon from "../images/icon.png";
import React, { useState, useEffect } from "react";
import Config from "./config.json";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  Row,
  Button,
  Container,
  Table,
  Form,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5002", // Base URL of the Express backend
  withCredentials: true, // Allow sending cookies with requests
});

const TITLE = "Mes déclarations | " + Config.SITE_TITLE;
const DESC = "Mes déclarations";
const CANONICAL = Config.SITE_DOMAIN + "/visualiser";
const hiddenStyle = {
  display: "none",
};

const Visualiser = () => {
  const [rows, setRows] = useState([]);
  const [selectAllRows, setSelectAllRows] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const navigate = useNavigate(); // Initialize navigate hook

  const handleSelectAllRows = () => {
    setSelectAllRows(!selectAllRows);
    setRows(rows.map((row) => ({ ...row, selected: !selectAllRows })));
  };

  const getSelectedDates = () => {
    return rows
      .filter((row) => row.selected) // keep only selected rows
      .map((row) => {
        // Ensure month has two digits (e.g., 3 -> 03)
        const month = row.mois.toString().padStart(2, "0");
        return `${row.Anne}-${month}-01`;
      });
  };

  useEffect(() => {
    instance.get("/summary").then((response) => {
      /*gg test*/ console.log("summary : ", response.data);
      if (response.data.authorized == "true") {
        console.log("authorized client");
        setRows([]);
        let fnewRows = [];
        let [year, month] = ["0000", "00"];
        for (let i = 0; i < response.data.summary.length; i++) {
          [year, month] = response.data.summary[i].date.split("-");
          const s = response.data.summary[i];
          const totalRS = (Number(s.ttrs) || 0).toFixed(3);
          const tfp = (Number(s.tfp) || 0).toFixed(3);
          const foprolos = (Number(s.foprolos) || 0).toFixed(3);
          const droitConsommation = (Number(s.droit) || 0).toFixed(3);
          const fodec = (Number(s.fodec) || 0).toFixed(3);
          const tva = (Number(s.tva) || 0).toFixed(3);
          const droitTimbreFiscal = (Number(s.dtf) || 0).toFixed(3);
          const tcl = (Number(s.tcl) || 0).toFixed(3);
          const totalDeclarer = (
            Number(totalRS) + Number(tfp) + Number(foprolos) +
            Number(droitConsommation) + Number(fodec) + Number(tva) +
            Number(droitTimbreFiscal) + Number(tcl)
          ).toFixed(3);
          fnewRows.push({
            mois: month,
            Anne: year,
            totalRS,
            tfp,
            foprolos,
            droitConsommation,
            fodec,
            tva,
            droitTimbreFiscal,
            tcl,
            totalDeclarer,
            selected: false,
          });
        }
        // Sort by year descending, then month descending
        fnewRows.sort((a, b) => {
          const yearDiff = Number(b.Anne) - Number(a.Anne);
          if (yearDiff !== 0) return yearDiff;
          return Number(b.mois) - Number(a.mois);
        });
        setRows((prev) => [...prev, ...fnewRows]);
      } else {
        console.log("not authorized client");
        navigate("/connexion");
        //neet to logging first
      }
    });
  }, []);

  /*
const print_doc = () => {
  const selectedDates = getSelectedDates();
  console.log("decla selected : ", selectedDates);
  
  instance.post("/print_doc", selectedDates, { responseType: "arraybuffer" })
    .then((response) => {
      // Convert the ArrayBuffer into a Blob of type PDF
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      // Create object URL for the Blob
      const url = window.URL.createObjectURL(pdfBlob);

      // Create a temporary link and click it to download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "mypage.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Revoke object URL after download
      window.URL.revokeObjectURL(url);

      console.log("✅ PDF downloaded:", pdfBlob.size, "bytes");
    })
    .catch((err) => {
      console.error("❌ Failed to download PDF:", err);
    });
};
*/

  const print_doc = async () => {
    const selectedDates = getSelectedDates();
    if (selectedDates.length === 0) return;

    setIsPrinting(true);
    console.log("🗓️ Selected dates:", selectedDates);

    for (const date of selectedDates) {
      try {
        console.log("📤 Sending request for:", date);

        const response = await instance.post("/print_doc", [date], {
          responseType: "arraybuffer",
        });

        const pdfBlob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(pdfBlob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `déclarations_${date}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        console.log("✅ PDF downloaded for:", date);
      } catch (err) {
        console.error("❌ Failed to download PDF for:", date, err);
      }
    }

    console.log("🎉 All PDFs processed!");
    setIsPrinting(false);
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
      <Container className="visualiser-page" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter") print_doc(); }}>
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
                  <th>FODEC</th>
                  <th>TVA</th>
                  <th>Droit de timbre fiscal</th>
                  <th>TCL</th>
                  <th>Total à déclarer</th>
                  <th style={hiddenStyle}>id</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                    <td className="checkbox">
                      <input
                        type="checkbox"
                        checked={row.selected || false}
                        onChange={() => {
                          const updated = [...rows];
                          updated[index].selected = !updated[index].selected;
                          setRows(updated);
                        }}
                      />
                    </td>
                    <td>
                      <Form.Group>
                        <Form.Control
                          className="textadj1"
                          type="text"
                          value={row.mois}
                          onChange={() =>
                            handleSelectAllRows(setRows, rows, index)
                          }
                        />
                      </Form.Group>
                    </td>
                    <td>
                      <Form.Group>
                        <Form.Control
                          className="textadj1"
                          type="text"
                          value={row.Anne}
                          onChange={() =>
                            handleSelectAllRows(setRows, rows, index)
                          }
                        />
                      </Form.Group>
                    </td>
                    <td>
                      <Form.Group>
                        <Form.Control
                          className="textadj1"
                          value={row.totalRS}
                          onChange={() =>
                            handleSelectAllRows(setRows, rows, index)
                          }
                        />
                      </Form.Group>
                    </td>
                    <td>
                      <Form.Group>
                        <Form.Control value={row.tfp} className="textadj1" />
                      </Form.Group>
                    </td>
                    <td>
                      <Form.Group>
                        <Form.Control
                          value={row.foprolos}
                          className="textadj1"
                        />
                      </Form.Group>
                    </td>
                    <td>
                      <Form.Group>
                        <Form.Control
                          value={row.droitConsommation}
                          className="textadj1"
                        />
                      </Form.Group>
                    </td>
                    <td>
                      <Form.Group>
                        <Form.Control value={row.fodec} className="textadj1" />
                      </Form.Group>
                    </td>
                    <td>
                      <Form.Group>
                        <Form.Control value={row.tva} className="textadj1" />
                      </Form.Group>
                    </td>
                    <td>
                      <Form.Group>
                        <Form.Control
                          value={row.droitTimbreFiscal}
                          className="textadj1"
                        />
                      </Form.Group>
                    </td>
                    <td>
                      <Form.Group>
                        <Form.Control value={row.tcl} className="textadj1" />
                      </Form.Group>
                    </td>
                    <td>
                      <Form.Group>
                        <Form.Control
                          value={row.totalDeclarer}
                          className="textadj1"
                        />
                      </Form.Group>
                    </td>
                    <td style={hiddenStyle}>
                      <Form.Group>
                        <Form.Control value={row.id} className="textadj1" />
                      </Form.Group>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
        </Row>
        <Row>
          <div className="boutons">
            <Button
              variant="primary"
              type="button"
              onClick={print_doc}
              className="custom-primary"
              disabled={isPrinting}
            >
              {isPrinting ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Génération...
                </>
              ) : (
                "Imprimer"
              )}
            </Button>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Visualiser;
