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
  Modal,
  Col,
  Alert,
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
  const [alertMessage, setAlertMessage] = useState(null);
  const [isPrinting, setIsPrinting] = useState(false);
  const navigate = useNavigate(); // Initialize navigate hook

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchFilters, setSearchFilters] = useState({
    mois: "", Anne: "", totalRS: "", tfp: "", foprolos: "",
    droitConsommation: "", fodec: "", tva: "", droitTimbreFiscal: "",
    tcl: "", totalDeclarer: "",
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const getSortedRows = (rowsToSort) => {
    const { key, direction } = sortConfig;
    if (!key) return rowsToSort;
    return [...rowsToSort].sort((a, b) => {
      let aVal = a[key];
      let bVal = b[key];
      if (typeof aVal === "string" && !isNaN(Number(aVal))) {
        aVal = parseFloat(aVal);
        bVal = parseFloat(bVal);
      }
      if (aVal == null) aVal = "";
      if (bVal == null) bVal = "";
      if (aVal < bVal) return direction === "asc" ? -1 : 1;
      if (aVal > bVal) return direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return "";
    return sortConfig.direction === "asc" ? " ▲" : " ▼";
  };

  const handleSearchChange = (key, value) => {
    setSearchFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleDelete = async () => {
    const selectedDecIds = rows
      .filter((row) => row.selected && row.dec_id)
      .map((row) => row.dec_id);
    if (selectedDecIds.length === 0) return;
    setIsDeleting(true);
    try {
      const response = await instance.post("/delete_declarations", { decIds: selectedDecIds });
      if (response.data.deleted) {
        setRows((prev) => prev.filter((row) => !row.selected));
        setSelectAllRows(false);
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
    setIsDeleting(false);
    setShowDeleteModal(false);
  };

  useEffect(() => {
    setRows((prev) =>
      prev.map((row) => {
        const matches = Object.keys(searchFilters).every((key) => {
          const fv = searchFilters[key].toLowerCase();
          if (!fv) return true;
          return String(row[key] ?? "").toLowerCase().includes(fv);
        });
        return matches ? row : { ...row, selected: false };
      })
    );
    setSelectAllRows(false);
  }, [searchFilters]);

  const handleSelectAllRows = () => {
    const newSelectAll = !selectAllRows;
    setSelectAllRows(newSelectAll);
    const filtered = rows.filter((row) => {
      return Object.keys(searchFilters).every((key) => {
        const filterVal = searchFilters[key].toLowerCase();
        if (!filterVal) return true;
        const rowVal = String(row[key] ?? "").toLowerCase();
        return rowVal.includes(filterVal);
      });
    });
    const filteredDecIds = new Set(filtered.map((r) => r.dec_id));
    setRows((prev) =>
      prev.map((row) =>
        filteredDecIds.has(row.dec_id) ? { ...row, selected: newSelectAll } : row
      )
    );
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
            dec_id: s.dec_id,
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
    if (selectedDates.length === 0) {
      setAlertMessage("Veuillez sélectionner une ou plusieurs déclarations à imprimer.");
      setTimeout(() => setAlertMessage(null), 3000);
      return;
    }

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

  const hasSelected = rows.some((row) => row.selected);

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
                  <th className="sortable" onClick={() => requestSort("mois")}>
                    Mois<span className="sort-indicator">{getSortIndicator("mois")}</span>
                    <Form.Control type="text" size="sm" value={searchFilters.mois} onChange={(e) => handleSearchChange("mois", e.target.value)} onClick={(e) => e.stopPropagation()} />
                  </th>
                  <th className="sortable" onClick={() => requestSort("Anne")}>
                    Année<span className="sort-indicator">{getSortIndicator("Anne")}</span>
                    <Form.Control type="text" size="sm" value={searchFilters.Anne} onChange={(e) => handleSearchChange("Anne", e.target.value)} onClick={(e) => e.stopPropagation()} />
                  </th>
                  <th className="sortable" onClick={() => requestSort("totalRS")}>
                    Total R.S<span className="sort-indicator">{getSortIndicator("totalRS")}</span>
                    <Form.Control type="text" size="sm" value={searchFilters.totalRS} onChange={(e) => handleSearchChange("totalRS", e.target.value)} onClick={(e) => e.stopPropagation()} />
                  </th>
                  <th className="sortable" onClick={() => requestSort("tfp")}>
                    TFP<span className="sort-indicator">{getSortIndicator("tfp")}</span>
                    <Form.Control type="text" size="sm" value={searchFilters.tfp} onChange={(e) => handleSearchChange("tfp", e.target.value)} onClick={(e) => e.stopPropagation()} />
                  </th>
                  <th className="sortable" onClick={() => requestSort("foprolos")}>
                    FOPROLOS<span className="sort-indicator">{getSortIndicator("foprolos")}</span>
                    <Form.Control type="text" size="sm" value={searchFilters.foprolos} onChange={(e) => handleSearchChange("foprolos", e.target.value)} onClick={(e) => e.stopPropagation()} />
                  </th>
                  <th className="sortable" onClick={() => requestSort("droitConsommation")}>
                    DC<span className="sort-indicator">{getSortIndicator("droitConsommation")}</span>
                    <Form.Control type="text" size="sm" value={searchFilters.droitConsommation} onChange={(e) => handleSearchChange("droitConsommation", e.target.value)} onClick={(e) => e.stopPropagation()} />
                  </th>
                  <th className="sortable" onClick={() => requestSort("fodec")}>
                    FODEC<span className="sort-indicator">{getSortIndicator("fodec")}</span>
                    <Form.Control type="text" size="sm" value={searchFilters.fodec} onChange={(e) => handleSearchChange("fodec", e.target.value)} onClick={(e) => e.stopPropagation()} />
                  </th>
                  <th className="sortable" onClick={() => requestSort("tva")}>
                    TVA<span className="sort-indicator">{getSortIndicator("tva")}</span>
                    <Form.Control type="text" size="sm" value={searchFilters.tva} onChange={(e) => handleSearchChange("tva", e.target.value)} onClick={(e) => e.stopPropagation()} />
                  </th>
                  <th className="sortable" onClick={() => requestSort("droitTimbreFiscal")}>
                    Timbre<span className="sort-indicator">{getSortIndicator("droitTimbreFiscal")}</span>
                    <Form.Control type="text" size="sm" value={searchFilters.droitTimbreFiscal} onChange={(e) => handleSearchChange("droitTimbreFiscal", e.target.value)} onClick={(e) => e.stopPropagation()} />
                  </th>
                  <th className="sortable" onClick={() => requestSort("tcl")}>
                    TCL<span className="sort-indicator">{getSortIndicator("tcl")}</span>
                    <Form.Control type="text" size="sm" value={searchFilters.tcl} onChange={(e) => handleSearchChange("tcl", e.target.value)} onClick={(e) => e.stopPropagation()} />
                  </th>
                  <th className="sortable th-total" onClick={() => requestSort("totalDeclarer")}>
                    Total à déclarer<span className="sort-indicator">{getSortIndicator("totalDeclarer")}</span>
                    <Form.Control type="text" size="sm" value={searchFilters.totalDeclarer} onChange={(e) => handleSearchChange("totalDeclarer", e.target.value)} onClick={(e) => e.stopPropagation()} />
                  </th>
                  <th style={hiddenStyle}>id</th>
                </tr>
              </thead>
              <tbody>
                {getSortedRows(rows.filter((row) => {
                  return Object.keys(searchFilters).every((key) => {
                    const filterVal = searchFilters[key].toLowerCase();
                    if (!filterVal) return true;
                    const rowVal = String(row[key] ?? "").toLowerCase();
                    return rowVal.includes(filterVal);
                  });
                })).map((row, index) => (
                  <tr key={row.dec_id || index} onDoubleClick={() => navigate(`/gerer?mois=${row.mois}&annee=${row.Anne}`)} style={{ cursor: 'pointer' }}>
                    <td className="checkbox">
                      <input
                        type="checkbox"
                        checked={row.selected || false}
                        onChange={() => {
                          setRows((prev) =>
                            prev.map((r) =>
                              r.dec_id === row.dec_id
                                ? { ...r, selected: !r.selected }
                                : r
                            )
                          );
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
        {alertMessage && (
          <Row>
            <Alert className="custom-alert text-center mb-0" onClick={() => setAlertMessage(null)} style={{ cursor: 'pointer' }}>
              {alertMessage}
            </Alert>
          </Row>
        )}
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
            <Button
              variant="primary"
              className="custom-btn-danger"
              onClick={() => {
                if (!hasSelected) {
                  setAlertMessage("Veuillez sélectionner une ou plusieurs déclarations à supprimer.");
                  setTimeout(() => setAlertMessage(null), 3000);
                  return;
                }
                setShowDeleteModal(true);
              }}
            >
              <i className="fas fa-trash me-1"></i>
              {isDeleting ? "Suppression..." : "Supprimer"}
            </Button>
          </div>
        </Row>
      </Container>
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmer la suppression</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Êtes-vous sûr de vouloir supprimer les déclarations sélectionnées ?
          Cette action supprimera également toutes les données liées (factures, paie, retenue) dans la page Gérer.
          Cette action est irréversible.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Annuler
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Suppression..." : "Supprimer"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Visualiser;
