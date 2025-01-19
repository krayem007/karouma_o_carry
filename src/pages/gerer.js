import icon from "../images/icon.png";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Toast,
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
  const [isSaisieClicked, setIsSaisieClicked] = useState(false);
  const [validated, set_Validated] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });
  const navigate = useNavigate(); // Initialize navigate hook

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
      setFactures([...factures, { Date: "", selected: false }]); // Add new facture with an empty Date
    }
  };

  const handleChangerMoisAnneeClick = () => {
    setMois(""); // Reset 'mois' to empty
    setAnnee(""); // Reset 'annee' to empty
    setIsSaisieClicked(false); // Reset isSaisieClicked to false
    setFactures([]);
    setPaie([]);
    setRetenue([]);
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

  // Handle form submission
  const submitFn = (event) => {
    event.preventDefault(); // Prevent default form submission
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setAlert({
        message:
          "Vous avez saisi vos données. Vous pouvez maintenant imprimer votre déclaration.",
        type: "success",
      });
      console.log("Alert shown, waiting to navigate");

      setTimeout(() => {
        navigate("/visualiser");
      }, 3000);
    }

    set_Validated(true);
  };

  // Handle changes for facture form fields
  const chngFn = (index, updatedFacture) => {
    const updatedFactures = [...factures];
    updatedFactures[index] = updatedFacture;
    setFactures(updatedFactures);
    set_Validated(false);
  };
  // Handle changes for paie form fields
  const chngFn1 = (index, updatedPaie) => {
    const updatedPaies = [...paie];
    updatedPaies[index] = updatedPaie;
    setPaie(updatedPaies);
    set_Validated(false);
  };
  const chngFn2 = (index, updatedRetenue) => {
    const updatedRetenues = [...retenue]; // Assuming 'retenue' is your state array
    updatedRetenues[index] = updatedRetenue;
    setRetenue(updatedRetenues); // Update the 'retenue' state
    set_Validated(false);
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
      {alert.message && (
        <Toast
          className="toast"
          bg={alert.type}
          onClose={() => setAlert({ message: "", type: "" })}
        >
          <Toast.Body>{alert.message}</Toast.Body>
        </Toast>
      )}
      <Container className="visualiser-page">
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
        <form noValidate onSubmit={submitFn} validated={validated}>
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
                        disabled={!isSaisieClicked} // Disable until Saisie is clicked
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
                            <th>
                              Date <span className="text-danger">*</span>
                            </th>
                            <th id="custome_th">
                              Type du facture{" "}
                              <span className="text-danger">*</span>
                            </th>
                            <th>Réf facture</th>
                            <th>
                              Total HT <span className="text-danger">*</span>
                            </th>
                            <th>
                              TVA <span className="text-danger">*</span>
                            </th>
                            <th>
                              Timbre <span className="text-danger">*</span>
                            </th>
                            <th>
                              Total TTC <span className="text-danger">*</span>
                            </th>
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
                                <Form.Group controlId={`date-facture${index}`}>
                                  <Form.Control
                                    className="textadj"
                                    type="date"
                                    placeholder="Date"
                                    value={facture.Date}
                                    onChange={
                                      (e) =>
                                        chngFn(index, {
                                          ...facture,
                                          Date: e.target.value,
                                        }) // Only updates Date
                                    }
                                    required
                                    isInvalid={validated && !facture.Date}
                                  />
                                  <Form.Control.Feedback
                                    className="feedback"
                                    type="invalid"
                                  >
                                    Veuillez remplir la date de la facture
                                  </Form.Control.Feedback>
                                </Form.Group>
                              </td>
                              <td>
                                <Form.Group controlId={`type-facture-${index}`}>
                                  <Form.Select
                                    aria-label="Type de facture"
                                    value={factures[index]?.Type || ""}
                                    onChange={(e) =>
                                      chngFn(index, {
                                        ...factures[index],
                                        Type: e.target.value,
                                      })
                                    }
                                    required
                                    isInvalid={
                                      validated && !factures[index]?.Type
                                    }
                                  >
                                    <option value="">Type du facture </option>
                                    <option value="Facture d'achat">
                                      Facture d'achat
                                    </option>
                                    <option value="Facture de vente">
                                      Facture de vente
                                    </option>
                                  </Form.Select>
                                  <Form.Control.Feedback
                                    type="invalid"
                                    className="feedback"
                                  >
                                    Veuillez sélectionner le type du facture.
                                  </Form.Control.Feedback>
                                </Form.Group>
                              </td>
                              <td>
                                <Form.Control
                                  className="textadj"
                                  type="text"
                                  placeholder="Réf facture"
                                />
                              </td>
                              <td>
                                <Form.Group
                                  controlId={`TotalHT-facture${index}`}
                                >
                                  <Form.Control
                                    className="textadj"
                                    type="number"
                                    min="0"
                                    placeholder="Total HT"
                                    value={facture.TotalHT}
                                    onChange={
                                      (e) =>
                                        chngFn(index, {
                                          ...facture,
                                          TotalHT: e.target.value,
                                        }) // Only updates Date
                                    }
                                    required
                                    isInvalid={
                                      validated &&
                                      (factures[index]?.TotalHT == null ||
                                        factures[index].TotalHT <= 0)
                                    }
                                  />
                                  <Form.Control.Feedback
                                    className="feedback"
                                    type="invalid"
                                  >
                                    Veuillez remplir le Total HT
                                  </Form.Control.Feedback>
                                </Form.Group>
                              </td>
                              <td>
                                <Form.Group controlId={`tva-facture-${index}`}>
                                  <Form.Select
                                    aria-label="TVA"
                                    value={factures[index]?.tva || ""} // Ensure correct access to the row's value
                                    onChange={(e) =>
                                      chngFn(index, {
                                        ...factures[index], // Copy the existing data of the row
                                        tva: e.target.value, // Update only the typepaie field
                                      })
                                    }
                                    required
                                    isInvalid={
                                      validated && !factures[index]?.tva
                                    }
                                  >
                                    <option value=""> Taux TVA </option>
                                    <option value="7%">7%</option>
                                    <option value="13%">13%</option>
                                    <option value="19%">19%</option>
                                  </Form.Select>
                                  <Form.Control.Feedback
                                    type="invalid"
                                    className="feedback"
                                  >
                                    Veuillez sélectionner le TVA.
                                  </Form.Control.Feedback>
                                </Form.Group>
                              </td>
                              <td>
                                <Form.Group
                                  controlId={`Timbre-facture-${index}`}
                                >
                                  <Form.Control
                                    className="textadj"
                                    type="number"
                                    min="0"
                                    placeholder="Timbre"
                                    value={facture.Timbre}
                                    onChange={(e) =>
                                      chngFn(index, {
                                        ...facture,
                                        Timbre: e.target.value,
                                      })
                                    }
                                    required
                                    isInvalid={
                                      validated &&
                                      (!factures[index]?.Timbre ||
                                        factures[index].Timbre < 0)
                                    }
                                  />
                                  <Form.Control.Feedback
                                    className="feedback"
                                    type="invalid"
                                  >
                                    Veuillez remplir le montant du Timbre
                                  </Form.Control.Feedback>
                                </Form.Group>
                              </td>
                              <td>
                                <Form.Group
                                  controlId={`TotalTTC-facture${index}`}
                                >
                                  <Form.Control
                                    className="textadj"
                                    type="number"
                                    min="0"
                                    placeholder="Total TTC"
                                    value={facture.TotalTTC}
                                    onChange={
                                      (e) =>
                                        chngFn(index, {
                                          ...facture,
                                          TotalTTC: e.target.value,
                                        }) // Only updates Date
                                    }
                                    required
                                    isInvalid={
                                      validated &&
                                      (factures[index]?.TotalTTC == null ||
                                        factures[index].TotalTTC <= 0)
                                    }
                                  />
                                  <Form.Control.Feedback
                                    className="feedback"
                                    type="invalid"
                                  >
                                    Veuillez remplir le Total TTC
                                  </Form.Control.Feedback>
                                </Form.Group>
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
                            <th className="checkbox-column">
                              <input
                                type="checkbox"
                                onChange={handleSelectAllPaie}
                                checked={selectAllPaie}
                              />
                            </th>
                            <th>
                              Salarier <span className="text-danger">*</span>
                            </th>
                            <th id="custome_th">
                              Secteur d'activité{" "}
                              <span className="text-danger">*</span>
                            </th>
                            <th id="custome_th">
                              Chef de famille{" "}
                              <span className="text-danger">*</span>
                            </th>
                            <th>
                              Nombre d'enfants{" "}
                              <span className="text-danger">*</span>
                            </th>
                            <th>
                              Salaire Brut{" "}
                              <span className="text-danger">*</span>
                            </th>
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
                                <Form.Group controlId={`Salarier-paie${index}`}>
                                  <Form.Control
                                    className="textadj"
                                    type="text"
                                    placeholder="Salarier"
                                    value={paie[index]?.Salarier || ""} // Access value from the specific index
                                    onChange={(e) =>
                                      chngFn1(index, {
                                        ...paie[index], // Copy the existing data of the row
                                        Salarier: e.target.value, // Update only the Salarier field
                                      })
                                    }
                                    required
                                    isInvalid={
                                      validated && !paie[index]?.Salarier
                                    }
                                  />
                                  <Form.Control.Feedback
                                    className="feedback"
                                    type="invalid"
                                  >
                                    Veuillez remplir le nom du salarier
                                  </Form.Control.Feedback>
                                </Form.Group>
                              </td>
                              <td>
                                <Form.Group controlId={`type-paie-${index}`}>
                                  <Form.Select
                                    aria-label="Secteur d'activité"
                                    value={paie[index]?.typepaie || ""} // Ensure correct access to the row's value
                                    onChange={(e) =>
                                      chngFn1(index, {
                                        ...paie[index], // Copy the existing data of the row
                                        typepaie: e.target.value, // Update only the typepaie field
                                      })
                                    }
                                    required
                                    isInvalid={
                                      validated && !paie[index]?.typepaie
                                    } // Check the specific row's typepaie field for validation
                                  >
                                    <option value="">Secteur d'activité</option>
                                    <option value="Type 1">Industriel</option>
                                    <option value="Type 2">Autre</option>
                                  </Form.Select>
                                  <Form.Control.Feedback
                                    className="feedback"
                                    type="invalid"
                                  >
                                    Veuillez sélectionner le type d'activité
                                  </Form.Control.Feedback>
                                </Form.Group>
                              </td>

                              <td>
                                <Form.Group controlId={`chef-paie-${index}`}>
                                  <Form.Select
                                    aria-label="Chef de famille"
                                    value={paie[index]?.chef || ""} // Access the 'chef' value of the specific row
                                    onChange={(e) =>
                                      chngFn1(index, {
                                        ...paie[index], // Copy the existing data of the row
                                        chef: e.target.value, // Update the chef field
                                      })
                                    }
                                    required
                                    isInvalid={validated && !paie[index]?.chef} // Check the specific row's chef field for validation
                                  >
                                    <option value="">
                                      Chef de famille ou non ?
                                    </option>
                                    <option value="Oui">Oui</option>
                                    <option value="Non">Non</option>
                                  </Form.Select>
                                  <Form.Control.Feedback
                                    className="feedback"
                                    type="invalid"
                                  >
                                    Veuillez sélectionner si le salarié est chef
                                    de famille
                                  </Form.Control.Feedback>
                                </Form.Group>
                              </td>
                              <td>
                                <Form.Group controlId={`enfants-paie-${index}`}>
                                  <Form.Control
                                    className="textadj"
                                    type="number"
                                    min="0"
                                    placeholder="Nombre d'enfants"
                                    value={paie[index]?.enfants || ""} // Bind the value to the specific row's 'enfants' field
                                    onChange={(e) =>
                                      chngFn1(index, {
                                        ...paie[index], // Copy existing row data
                                        enfants: e.target.value, // Update the 'enfants' field
                                      })
                                    }
                                    required
                                    isInvalid={
                                      validated &&
                                      (!paie[index]?.enfants ||
                                        paie[index].enfants < 0)
                                    } // Check if 'enfants' is empty for validation
                                  />
                                  <Form.Control.Feedback
                                    className="feedback"
                                    type="invalid"
                                  >
                                    Veuillez remplir le nombre d'enfants
                                  </Form.Control.Feedback>
                                </Form.Group>
                              </td>

                              <td>
                                <Form.Group
                                  controlId={`salaire-brut-paie-${index}`}
                                >
                                  <Form.Control
                                    className="textadj"
                                    type="number"
                                    min="0"
                                    placeholder="Salaire Brut"
                                    value={paie[index]?.salaireBrut || ""} // Bind to the 'salaireBrut' value for the specific row
                                    onChange={(e) =>
                                      chngFn1(index, {
                                        ...paie[index], // Copy the existing row data
                                        salaireBrut: e.target.value, // Update the 'salaireBrut' field
                                      })
                                    }
                                    required
                                    isInvalid={
                                      validated &&
                                      (paie[index]?.salaireBrut == null ||
                                        paie[index].salaireBrut <= 0)
                                    } // Validation: Show feedback if empty
                                  />
                                  <Form.Control.Feedback
                                    className="feedback"
                                    type="invalid"
                                  >
                                    Veuillez remplir le salaire Brut
                                  </Form.Control.Feedback>
                                </Form.Group>
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
                            <th className="checkbox-column">
                              <input
                                type="checkbox"
                                onChange={handleSelectAllRetenue}
                                checked={selectAllRetenue}
                              />
                            </th>
                            <th>
                              Retenue à la source sur :{" "}
                              <span className="text-danger">*</span>
                            </th>
                            <th>
                              Montant HT <span className="text-danger">*</span>
                            </th>
                            <th>
                              TVA <span className="text-danger">*</span>
                            </th>
                            <th>
                              Montant TTC <span className="text-danger">*</span>
                            </th>
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
                                <Form.Select
                                  aria-label="Retenue à la source"
                                  value={retenue[index]?.source || ""}
                                  onChange={(e) =>
                                    chngFn2(index, {
                                      ...retenue[index],
                                      source: e.target.value,
                                    })
                                  }
                                  required
                                  isInvalid={
                                    validated && !retenue[index]?.source
                                  }
                                >
                                  <option value="">
                                    Retenue à la source sur :
                                  </option>
                                  <option value="Type 1">Loyer</option>
                                  <option value="Type 2">Honoraires</option>
                                </Form.Select>
                                <Form.Control.Feedback
                                  className="feedback"
                                  type="invalid"
                                >
                                  Veuillez sélectionner la source de la retenue
                                </Form.Control.Feedback>
                              </td>

                              <td>
                                <Form.Control
                                  className="textadj"
                                  type="number"
                                  min="0"
                                  placeholder="Montant HT"
                                  value={retenue[index]?.montantHT || ""}
                                  onChange={(e) =>
                                    chngFn2(index, {
                                      ...retenue[index],
                                      montantHT: e.target.value,
                                    })
                                  }
                                  required
                                  isInvalid={
                                    validated &&
                                    (retenue[index]?.montantHT == null ||
                                      retenue[index].montantHT <= 0)
                                  }
                                />
                                <Form.Control.Feedback
                                  className="feedback"
                                  type="invalid"
                                >
                                  Veuillez remplir le montant HT
                                </Form.Control.Feedback>
                              </td>

                              <td>
                                <Form.Select
                                  aria-label="Retenue à la source"
                                  value={retenue[index]?.source || ""}
                                  onChange={(e) =>
                                    chngFn2(index, {
                                      ...retenue[index],
                                      source: e.target.value,
                                    })
                                  }
                                  required
                                  isInvalid={
                                    validated && !retenue[index]?.source
                                  }
                                >
                                  <option value=""> Taux TVA </option>
                                  <option>7%</option>
                                  <option>13%</option>
                                  <option>19%</option>
                                </Form.Select>
                                <Form.Control.Feedback
                                  className="feedback"
                                  type="invalid"
                                >
                                  Veuillez sélectionner le TVA.
                                </Form.Control.Feedback>
                              </td>

                              <td>
                                <Form.Control
                                  className="textadj"
                                  type="number"
                                  min="0"
                                  placeholder="Montant TTC"
                                  value={retenue[index]?.montantTTC || ""}
                                  onChange={(e) =>
                                    chngFn2(index, {
                                      ...retenue[index],
                                      montantTTC: e.target.value,
                                    })
                                  }
                                  required
                                  isInvalid={
                                    validated &&
                                    (retenue[index]?.montantTTC == null ||
                                      retenue[index].montantTTC <= 0)
                                  }
                                />
                                <Form.Control.Feedback
                                  className="feedback"
                                  type="invalid"
                                >
                                  Veuillez remplir le montant TTC
                                </Form.Control.Feedback>
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
            <Button
              variant="primary"
              type="submit"
              className="custom-primary"
              disabled={!isSaisieClicked}
            >
              Enregistrer
            </Button>
          </div>
        </form>
      </Container>
    </>
  );
};

export default Gerer;
