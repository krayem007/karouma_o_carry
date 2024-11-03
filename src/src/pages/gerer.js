import React, { useState } from "react";
import Config from "./config.json";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  Row,
  Col,
  Form,
  Button,
  Container,
  Table,
  Accordion,
} from "react-bootstrap";
const TITLE = "Gérer mes déclarations | " + Config.SITE_TITLE;
const DESC = "Gérer mes déclarations ";
const CANONICAL = Config.SITE_DOMAIN + "/gerer";

const Gerer = () => {
  // State to manage rows
  const [factures, setFactures] = useState([]);
  const [paie, setPaie] = useState([]);
  const [retenue, setRetenue] = useState([]);
  const [selectAllFactures, setSelectAllFactures] = useState(false);
  const [selectAllPaie, setSelectAllPaie] = useState(false);
  const [selectAllRetenue, setSelectAllRetenue] = useState(false);
  const [isSaisieClicked, setIsSaisieClicked] = useState(false); // Track Saisie button click

  const handleSaisie = (e) => {
    e.preventDefault(); // Prevent default form submission
    setIsSaisieClicked(true); // Mark "Saisie" as clicked
  };

  // State to manage année and mois
  const [annee, setAnnee] = useState("");
  const [mois, setMois] = useState("");

  // Check if both fields are filled
  const isFormValid = annee !== "" && mois !== "" && mois !== "Mois";

  const handleAddFacture = () => {
    if (isSaisieClicked) {
      setFactures([...factures, {}]);
    }
  };

  const handleChangerMoisAnneeClick = () => {
    setMois(""); // Reset 'mois' to empty
    setAnnee(""); // Reset 'annee' to empty
    setIsSaisieClicked(false); // Reset isSaisieClicked to false
  };

  const handleOtherButtonClick = () => {
    // Example action for the other button
    console.log("Other action performed");
  };

  const handleAddPaie = () => {
    if (isSaisieClicked) {
      setPaie([...paie, {}]);
    }
  };

  const handleAddRetenue = () => {
    if (isSaisieClicked) {
      setRetenue([...retenue, {}]);
    }
  };

  // Handlers for removing selected rows
  const handleRemoveFacture = () =>
    setFactures(factures.filter((_, index) => !factures[index].selected));
  const handleRemovePaie = () =>
    setPaie(paie.filter((_, index) => !paie[index].selected));
  const handleRemoveRetenue = () =>
    setRetenue(retenue.filter((_, index) => !retenue[index].selected));

  // Handlers for selecting all checkboxes
  const handleSelectAllFactures = () => {
    setSelectAllFactures(!selectAllFactures);
    setFactures(
      factures.map((facture) => ({ ...facture, selected: !selectAllFactures }))
    );
  };

  const handleSelectAllPaie = () => {
    setSelectAllPaie(!selectAllPaie);
    setPaie(paie.map((row) => ({ ...row, selected: !selectAllPaie })));
  };

  const handleSelectAllRetenue = () => {
    setSelectAllRetenue(!selectAllRetenue);
    setRetenue(retenue.map((row) => ({ ...row, selected: !selectAllRetenue })));
  };

  // Handlers for individual checkbox selection
  const handleCheckboxChange = (setRows, rows, index) => {
    const updatedRows = [...rows];
    updatedRows[index].selected = !updatedRows[index].selected;
    setRows(updatedRows);
  };

  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
        <link rel="canonical" href={CANONICAL} />
        <meta name="description" content={DESC} />
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
      <Container className="register-page">
        <Breadcrumb>
          <Breadcrumb.Item className="no-decoration">
            <Link to="/">Accueil</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item className="no-decoration">
            <Link to="/welcome">Welcome</Link>
          </Breadcrumb.Item>

          <Breadcrumb.Item active>Gérer mes déclarations</Breadcrumb.Item>
        </Breadcrumb>
        <h1 className="form-title"> Gérer mes déclarations </h1>
        <Row className="row-gt align-items-center justify-content-start">
          <Col md="auto" className="form-labelannee">
            <Form.Group className="form-labelannee">
              <Form.Control
                type="text"
                name="annee"
                value={annee}
                readOnly={isSaisieClicked}
                min="1900"
                max="2200"
                placeholder="Année:"
                className="form-labelannee"
                onChange={(e) => setAnnee(e.target.value.slice(0, 4))}
              />
            </Form.Group>
          </Col>
          <Col md="auto">
            <Form.Select
              aria-label="Default select example"
              className="form-selectmois"
              value={mois}
              onChange={(e) => setMois(e.target.value)}
              disabled={isSaisieClicked}
            >
              <option>Mois</option>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md="auto">
            <div className="boutong">
              <Button
                variant="primary"
                type="submit"
                className="custom-primaryg"
                onClick={handleSaisie}
                disabled={!isFormValid}
              >
                Saisie
              </Button>
            </div>
          </Col>
          <Col md="auto">
            <div className="boutong">
              <Button
                variant="primary"
                type="reset"
                className="custom-primaryg"
                onClick={handleChangerMoisAnneeClick}
                disabled={!isSaisieClicked}
              >
                Changer Mois/année
              </Button>
            </div>
          </Col>
        </Row>
        <Row className="row-accor">
          <Accordion alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Saisir mes factures</Accordion.Header>
              <Accordion.Body>
                <Row className="add-del">
                  <Col md="auto">
                    <Button
                      variant="primary"
                      onClick={handleAddFacture}
                      className="custom-primaryg"
                      disabled={!isSaisieClicked || !isFormValid} // Disable until Saisie is clicked
                    >
                      Ajouter
                    </Button>
                  </Col>
                  <Col md="auto">
                    <Button
                      variant="primary"
                      onClick={handleRemoveFacture}
                      className="custom-primaryg"
                      disabled={!isSaisieClicked}
                    >
                      Supprimer
                    </Button>
                  </Col>
                </Row>
                <Container className="table-container">
                  <div className="table-responsive">
                    <Table hover className="table-custom">
                      <thead>
                        <tr>
                          <th className="checkbox-column">
                            <input
                              type="checkbox"
                              onChange={handleSelectAllFactures}
                              checked={selectAllFactures}
                            />
                          </th>
                          <th>Date</th>
                          <th id="custome_th">Type du facture</th>
                          <th>Réf facture</th>
                          <th>Total HT</th>
                          <th>TVA</th>
                          <th>Timbre</th>
                          <th>Total TTC</th>
                        </tr>
                      </thead>
                      <tbody>
                        {factures.map((facture, index) => (
                          <tr key={index}>
                            <td>
                              <input
                                type="checkbox"
                                checked={facture.selected || false}
                                onChange={() =>
                                  handleCheckboxChange(
                                    setFactures,
                                    factures,
                                    index
                                  )
                                }
                              />
                            </td>
                            <td>
                              <Form.Control type="text" placeholder="Date" />
                            </td>
                            <td>
                              <Form.Select aria-label="Type de facture">
                                <option>Type du facture</option>
                                <option>Facture d'achat</option>
                                <option>Facture de vente</option>
                              </Form.Select>
                            </td>
                            <td>
                              <Form.Control
                                type="text"
                                placeholder="Réf facture"
                              />
                            </td>
                            <td>
                              <Form.Control
                                type="number"
                                placeholder="Total HT"
                              />
                            </td>
                            <td>
                              <Form.Control type="number" placeholder="TVA" />
                            </td>
                            <td>
                              <Form.Control
                                type="number"
                                placeholder="Timbre"
                              />
                            </td>
                            <td>
                              <Form.Control
                                type="number"
                                placeholder="Total TTC"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Container>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Row>
        <Row className="row-accor">
          <Accordion alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Saisir mes Paie</Accordion.Header>
              <Accordion.Body>
                <Row className="add-del">
                  <Col md="auto">
                    <div className="boutong">
                      <Button
                        variant="primary"
                        onClick={handleAddPaie}
                        className="custom-primaryg"
                        disabled={!isSaisieClicked}
                      >
                        Ajouter
                      </Button>
                    </div>
                  </Col>
                  <Col md="auto">
                    <div className="boutong">
                      <Button
                        variant="primary"
                        onClick={handleRemovePaie}
                        className="custom-primaryg"
                        disabled={!isSaisieClicked}
                      >
                        Supprimer
                      </Button>
                    </div>
                  </Col>
                </Row>
                <Container className="table-container">
                  <div className="table-responsive">
                    <Table hover className="table-custom">
                      <thead>
                        <tr>
                          <th class="checkbox-column">
                            <input
                              type="checkbox"
                              onChange={handleSelectAllPaie}
                              checked={selectAllPaie}
                            />
                          </th>
                          <th id="custome_th">Secteur d'activité</th>
                          <th>Salarier</th>
                          <th id="custome_th">Chef de famille</th>
                          <th>Nombre d'enfants</th>
                          <th>Salaire Brut</th>
                          <th>Salaire Net</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paie.map((row, index) => (
                          <tr key={index}>
                            <td>
                              <input
                                type="checkbox"
                                checked={row.selected || false}
                                onChange={() =>
                                  handleCheckboxChange(setPaie, paie, index)
                                }
                              />
                            </td>
                            <td>
                              <Form.Select
                                aria-label="Secteur d'activité"
                                className="form-control"
                              >
                                <option value="">Secteur d'activité</option>
                                <option value="Type 1">Industriel</option>
                                <option value="Type 2">Autre</option>
                              </Form.Select>
                            </td>
                            <td>
                              <Form.Control
                                type="text"
                                placeholder="Salarier"
                              />
                            </td>
                            <td>
                              <Form.Select
                                aria-label="Chef de famille"
                                className="form-control"
                              >
                                <option value="">
                                  Chef de famille ou non ?
                                </option>
                                <option value="Type 1">Oui</option>
                                <option value="Type 2">Non</option>
                              </Form.Select>
                            </td>
                            <td>
                              <Form.Control
                                type="number"
                                placeholder="Nombre d'enfants"
                              />
                            </td>
                            <td>
                              <Form.Control
                                type="number"
                                placeholder="Salaire Brut"
                              />
                            </td>
                            <td>
                              <Form.Control
                                type="number"
                                placeholder="Salaire Net"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Container>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Row>
        <Row className="row-accor">
          <Accordion alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                Saisier mes informations de retenue à la source
              </Accordion.Header>
              <Accordion.Body>
                <Row className="add-del">
                  <Col md="auto">
                    <Button
                      variant="primary"
                      onClick={handleAddRetenue}
                      className="custom-primaryg"
                      disabled={!isSaisieClicked}
                    >
                      Ajouter
                    </Button>
                  </Col>
                  <Col md="auto">
                    <Button
                      variant="primary"
                      onClick={handleRemoveRetenue}
                      className="custom-primaryg"
                      disabled={!isSaisieClicked}
                    >
                      Supprimer
                    </Button>
                  </Col>
                </Row>
                <Container className="table-container">
                  <div className="table-responsive">
                    <Table hover className="table-custom">
                      <thead>
                        <tr>
                          <th class="checkbox-column">
                            <input
                              type="checkbox"
                              onChange={handleSelectAllRetenue}
                              checked={selectAllRetenue}
                            />
                          </th>
                          <th>Retenue à la source sur :</th>
                          <th>Montant HT</th>
                          <th>TVA</th>
                          <th>Montant TTC</th>
                        </tr>
                      </thead>
                      <tbody id="Retenue">
                        {retenue.map((row, index) => (
                          <tr key={index}>
                            <td>
                              <input
                                type="checkbox"
                                checked={row.selected || false}
                                onChange={() =>
                                  handleCheckboxChange(
                                    setRetenue,
                                    retenue,
                                    index
                                  )
                                }
                              />
                            </td>
                            <td>
                              <Form.Select aria-label="Retenue à la source">
                                <option value="">
                                  Retenue à la source sur :
                                </option>
                                <option value="Type 1">Loyer</option>
                                <option value="Type 2">Honoraires</option>
                              </Form.Select>
                            </td>
                            <td>
                              <Form.Control
                                type="number"
                                placeholder="Montant HT"
                              />
                            </td>
                            <td>
                              <Form.Control type="number" placeholder="TVA" />
                            </td>
                            <td>
                              <Form.Control
                                type="number"
                                placeholder="Montant TTC"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Container>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Row>
        <div className="boutons">
          <Button variant="primary" type="submit" className="custom-primary">
            Enregistrer
          </Button>
        </div>
      </Container>
    </>
  );
};

export default Gerer;
