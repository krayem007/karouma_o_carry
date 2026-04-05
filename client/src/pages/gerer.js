import icon from "../images/icon.png";
import React, { useState, useEffect } from "react";
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

import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5002", // Base URL of the Express backend
  withCredentials: true, // Allow sending cookies with requests
});

const TITLE = "Gérer mes déclarations | " + Config.SITE_TITLE;
const DESC = "Gérer mes déclarations ";
const CANONICAL = Config.SITE_DOMAIN + "/gerer";

const hiddenStyle = {
  display: "none",
};

const Gerer = () => {
  // State to manage rows
  const [deleteFactureIds, setDeleteFactureIds] = useState([]);
  const [deletePaieIds, setDeletePaieIds] = useState([]);
  const [deleteRetenueIds, setDeleteRetenueIds] = useState([]);

  const [factures, setFactures] = useState([]);
  const [paie, setPaie] = useState([]);
  const [retenue, setRetenue] = useState([]);
  const [selectAllFactures, setSelectAllFactures] = useState(false);
  const [selectAllPaie, setSelectAllPaie] = useState(false);
  const [selectAllRetenue, setSelectAllRetenue] = useState(false);
  const [isSaisieClicked, setIsSaisieClicked] = useState(false);
  const accordionKeys = ["0", "1", "2"]; // all your accordion items
  // Open only accordions that have data initially
  const getOpenedAccordions = () => {
    const keys = [];
    if (factures.length > 0) keys.push("0");
    if (paie.length > 0) keys.push("1");
    if (retenue.length > 0) keys.push("2");
    return keys;
  };
  const [activeAccordion, setActiveAccordion] = useState(getOpenedAccordions);
  const [validated, set_Validated] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });

  const showAlert = (type, message, duration = 5000) => {
    setAlert({ show: true, type, message });
    setTimeout(() => setAlert({ show: false, type: "", message: "" }), duration);
  };

  const navigate = useNavigate(); // Initialize navigate hook
  // Toggle a single accordion
  const toggleAccordionItem = (key) => {
    setActiveAccordion((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  // Toggle all accordions
  const toggleAllAccordions = () => {
    setActiveAccordion((prev) =>
      prev.length === accordionKeys.length ? [] : [...accordionKeys],
    );
  };

  const handleSaisie = (e) => {
    e.preventDefault(); // Prevent default form submission
    setIsSaisieClicked(true); // Mark "Saisie" as clicked
    const date = { annee, mois };
    console.log("deleted factures id before reset : ", deleteFactureIds);
    console.log("deleted Paie id before reset : ", deletePaieIds);
    console.log("deleted etenue id before reset : ", deleteRetenueIds);
    setFactures([]);
    setPaie([]);
    setRetenue([]);
    setDeleteFactureIds([]);
    setDeletePaieIds([]);
    setDeleteRetenueIds([]);
    instance.post("/get_dec", date).then((response) => {
      console.log(" decla found : ", response.data);
      if (response.data.dec == true) {
        setReportTVA(response.data.send_data.reporttva);
        //handleAddFacture(true, response.data.send_data.factures);
        let fnewRows = [];
        //add factures
        for (let i = 0; i < response.data.send_data.factures.length; i++) {
          fnewRows.push({
            Date: response.data.send_data.factures[i].date.substring(0, 10),
            Type: response.data.send_data.factures[i].type,
            TypeAV: response.data.send_data.factures[i].type_achat_vente,
            Ref: response.data.send_data.factures[i].ref,
            TotalHT: response.data.send_data.factures[i].ht,
            tva: response.data.send_data.factures[i].tva,
            Timbre: response.data.send_data.factures[i].timber,
            FODEC: response.data.send_data.factures[i].fodec,
            MTFODEC: response.data.send_data.factures[i].mtfodec,
            TauxDC: response.data.send_data.factures[i].tauxdc,
            MTDC: response.data.send_data.factures[i].mtdc,
            TotalTTC: response.data.send_data.factures[i].ttc,
            id: response.data.send_data.factures[i].id,
            selected: false,
          });
        }
        setFactures((prev) => [...prev, ...fnewRows]);

        //add paie
        let pnewRows = [];
        for (let i = 0; i < response.data.send_data.paie.length; i++) {
          pnewRows.push({
            Salarier: response.data.send_data.paie[i].salarier,
            typepaie: response.data.send_data.paie[i].secteur,
            chef: response.data.send_data.paie[i].famille,
            enfants: response.data.send_data.paie[i].num_kids,
            salaireBrut: response.data.send_data.paie[i].brut,
            id: response.data.send_data.paie[i].id,
            selected: false,
          });
        }
        setPaie((prev) => [...prev, ...pnewRows]);

        //add retenue
        let rnewRows = [];
        for (let i = 0; i < response.data.send_data.retenue.length; i++) {
          rnewRows.push({
            source: response.data.send_data.retenue[i].type,
            montantHT: response.data.send_data.retenue[i].ht,
            tva: response.data.send_data.retenue[i].tva,
            montantTTC: response.data.send_data.retenue[i].ttc,
            id: response.data.send_data.retenue[i].id,
            selected: false,
          });
        }
        setRetenue((prev) => [...prev, ...rnewRows]);
      } else if (response.data.not_found != true) {
        setAlert({
          message: response.data.message || "Erreur de chargement",
          type: "error",
        });

        // Clear the alert after 3 seconds
        setTimeout(() => {
          setAlert({ message: "", type: "" });
        }, 3000);
      }
    }).catch((error) => {
      const msg = getErrorMessage(error);
      if (error?.response?.status === 401 || msg.includes('not authorized') || msg.includes('non autorisé')) {
        setAlert({
          message: "Connexion requise pour effectuer cette opération",
          type: "error",
        });
        setTimeout(() => {
          navigate("/connexion");
        }, 2000);
        return;
      }
      showAlert("error", msg);
    });
  };

  const save_decla = () => {
    console.log("facture data : ", factures);
    console.log("paie data : ", paie);
    console.log("retenue data : ", retenue);
    console.log("annee data : ", annee);
    console.log("mois data : ", mois);
    /*const data = {annee, mois, factures, paie, retenue};
    console.log("data data : ", data);
    instance.post("/dec", data).then((response) => 
      {

      });*/
  };

  // State to manage année and mois
  const [annee, setAnnee] = useState("");
  const [mois, setMois] = useState("");
  const [ReportTVA, setReportTVA] = useState("");
  const [retard, setRetard] = useState("");

  // Check if both fields are filled
  const isFormValid = annee !== "" && mois !== "" && mois !== "Mois";

  useEffect(() => {
    instance.get("/welcome").then((response) => {
      /*gg test*/ console.log(response.data);
      if (response.data.authorized == "true") {
        console.log("authorized client");
      } else {
        console.log("not authorized client");
        navigate("/connexion");
        //neet to logging first
      }
    });
  }, []);

  const handleChangerMoisAnneeClick = () => {
    setIsSaisieClicked(false); // Reset isSaisieClicked to false
  };

  const handleAddFacture = () => {
    if (isSaisieClicked) {
      // Adding a new facture with all necessary fields, including `inputSource`
      setFactures([
        ...factures,
        {
          Date: "",
          Type: "",
          TotalHT: "",
          TotalTTC: "",
          Timbre: "",
          tva: "",
          selected: false,
          inputSource: null, // Default value, will be set when the user starts typing
        },
      ]);
    }
  };

  const handleAddPaie = () => {
    if (isSaisieClicked) {
      setPaie([...paie, {}]);
    }
  };

  const handleAddRetenue = () => {
    if (isSaisieClicked) {
      setRetenue([
        ...retenue,
        {
          source: "",
          montantHT: "",
          montantTTC: "",
          tva: "",
          selected: false,
          inputSource: null, // Track which field was edited first (HT or TTC)
        },
      ]);
    }
  };

  const handleCollectSelectedFactureIds = () => {
    const selectedIds = factures
      .filter((facture) => facture.selected)
      .map((facture) => facture.id);
    // Append to existing deleteFactureIds, avoiding duplicates
    setDeleteFactureIds((prev) => [...new Set([...prev, ...selectedIds])]);
  };

  const handleCollectSelectedpaiIds = () => {
    const selectedIds = paie
      .filter((paie) => paie.selected)
      .map((paie) => paie.id);
    setDeletePaieIds((prev) => [...new Set([...prev, ...selectedIds])]);
  };

  const handleCollectSelectedRetenueIds = () => {
    const selectedIds = retenue
      .filter((retenue) => retenue.selected)
      .map((retenue) => retenue.id);
    setDeleteRetenueIds((prev) => [...new Set([...prev, ...selectedIds])]);
  };

  // Handlers for removing selected rows
  const handleRemoveFacture = () => {
    console.log("deleted factures id old : ", deleteFactureIds);
    handleCollectSelectedFactureIds();
    console.log("deleted factures id new : ", deleteFactureIds);
    setFactures(factures.filter((_, index) => !factures[index].selected));
  };
  const handleRemovePaie = () => {
    console.log("deleted Paie id old : ", deletePaieIds);
    handleCollectSelectedpaiIds();
    console.log("deleted Paie id old : ", deletePaieIds);
    setPaie(paie.filter((_, index) => !paie[index].selected));
  };
  const handleRemoveRetenue = () => {
    console.log("deleted etenue id old : ", deleteRetenueIds);
    handleCollectSelectedRetenueIds();
    console.log("deleted etenue id old : ", deleteRetenueIds);
    setRetenue(retenue.filter((_, index) => !retenue[index].selected));
  };

  // Handlers for selecting all checkboxes
  const handleSelectAllFactures = () => {
    setSelectAllFactures(!selectAllFactures);
    setFactures(
      factures.map((facture) => ({ ...facture, selected: !selectAllFactures })),
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

  // Sanitization helpers
  const toSafeNumber = (value) => {
    if (value === null || value === undefined || value === '') return 0;
    const num = Number(value);
    if (isNaN(num)) return 0;
    return num;
  };

  const toSafeBoolean = (value) => {
    if (value === null || value === undefined || value === '') return false;
    if (value === 'Oui' || value === true || value === 'true') return true;
    if (value === 'Non' || value === false || value === 'false') return false;
    return Boolean(value);
  };

  const getErrorMessage = (error) => {
    if (!error) return 'Erreur inconnue';
    return error?.response?.data?.message || error?.message || error.toString();
  };

  // Handle form submission
  const submitFn = async (event) => {
    event.preventDefault(); // Prevent default form submission
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      set_Validated(true);
      return;
    }

    try {
      // 1. Sanitize Factures
      const sanitizedFactures = (Array.isArray(factures) ? factures : []).map(f => {
        const cleaned = {
          ...f,
          TotalHT: toSafeNumber(f.TotalHT),
          TotalTTC: toSafeNumber(f.TotalTTC),
          Timbre: toSafeNumber(f.Timbre),
          tva: toSafeNumber(f.tva),
        };

        // Remove optional empty fields or safely cast them
        if (f.FODEC !== undefined && f.FODEC !== '') {
          cleaned.FODEC = toSafeBoolean(f.FODEC) ? "Oui" : "Non";
        } else {
          cleaned.FODEC = "Non";
        }

        if (f.MTFODEC !== undefined && f.MTFODEC !== '') {
          cleaned.MTFODEC = toSafeNumber(f.MTFODEC);
        } else {
          delete cleaned.MTFODEC;
        }

        if (f.TauxDC !== undefined && f.TauxDC !== '') {
          cleaned.TauxDC = toSafeNumber(f.TauxDC);
        } else {
          delete cleaned.TauxDC;
        }

        if (f.MTDC !== undefined && f.MTDC !== '') {
          cleaned.MTDC = toSafeNumber(f.MTDC);
        } else {
          delete cleaned.MTDC;
        }

        return cleaned;
      });

      // 2. Sanitize Paie
      const sanitizedPaie = (Array.isArray(paie) ? paie : []).map(p => ({
        ...p,
        enfants: toSafeNumber(p.enfants),
        salaireBrut: toSafeNumber(p.salaireBrut)
      }));

      // 3. Sanitize Retenue
      const sanitizedRetenue = (Array.isArray(retenue) ? retenue : []).map(r => ({
        ...r,
        montantHT: toSafeNumber(r.montantHT),
        montantTTC: toSafeNumber(r.montantTTC),
        tva: toSafeNumber(r.tva)
      }));

      // Assemble protected payload
      const payload = {
        annee,
        mois,
        ReportTVA: toSafeNumber(ReportTVA),
        factures: sanitizedFactures,
        paie: sanitizedPaie,
        retenue: sanitizedRetenue,
        deleteFactureIds: Array.isArray(deleteFactureIds) ? deleteFactureIds : [],
        deletePaieIds: Array.isArray(deletePaieIds) ? deletePaieIds : [],
        deleteRetenueIds: Array.isArray(deleteRetenueIds) ? deleteRetenueIds : [],
      };

      console.log("Safe Payload : ", payload);

      const response = await instance.post("/dec", payload);

      if (response.data.saved === true) {
        setAlert({
          message: "Vous avez saisi vos données. Vous pouvez maintenant imprimer votre déclaration.",
          type: "success",
        });
        console.log("Alert shown, waiting to navigate");

        setTimeout(() => {
          navigate("/visualiser");
        }, 3000);
      } else {
        setAlert({
          message: response.data.message || 'Erreur inconnue',
          type: "error",
        });

        // Clear the alert after 3 seconds
        setTimeout(() => {
          setAlert({ message: "", type: "" });
        }, 3000);
      }
    } catch (error) {
      console.error("API ERROR:", error?.response?.data || error?.message);
      const msg = getErrorMessage(error);

      if (error?.response?.status === 401 || msg.includes('not authorized') || msg.includes('non autorisé')) {
        setAlert({
          message: "Connexion requise pour effectuer cette opération",
          type: "error",
        });
        setTimeout(() => {
          navigate("/connexion");
        }, 2000);
        return;
      }

      setAlert({
        message: msg,
        type: "error",
      });
      setTimeout(() => {
        setAlert({ message: "", type: "" });
      }, 3000);
    }

    set_Validated(true);
  };

  const chngFn = (index, updatedFacture, fieldChanged) => {
    const parseNumber = (val) => isNaN(Number(val)) || val == null || val === "" ? 0 : Number(val);
    const newFactures = [...factures];
    const currentFacture = { ...updatedFacture };

    if (
      (fieldChanged === "TTC" && !currentFacture.TotalTTC) ||
      (fieldChanged === "HT" && !currentFacture.TotalHT)
    ) {
      currentFacture.TotalHT = "";
      currentFacture.TotalTTC = "";
      currentFacture.MTDC = "";
      currentFacture.TauxDC = "";
      currentFacture.Timbre = "";
      currentFacture.MTFODEC = "";
      currentFacture.FODEC = "";
      currentFacture.inputSource = null;
      currentFacture.dcSource = null;

      newFactures[index] = currentFacture;
      setFactures(newFactures);
      set_Validated(false);
      return;
    }

    if (fieldChanged === "HT") {
      currentFacture.inputSource = "HT";
      newFactures[index] = currentFacture;
      setFactures(newFactures);
      set_Validated(false);
      return;
    }

    if (fieldChanged === "TTC") {
      currentFacture.inputSource = "TTC";
      newFactures[index] = currentFacture;
      setFactures(newFactures);
      set_Validated(false);
      return;
    }

    // Capture explicit re-triggers from blurred focus states
    if (fieldChanged === "HT_BLUR" && currentFacture.TotalHT !== "") {
      currentFacture.inputSource = "HT";
    }
    if (fieldChanged === "TTC_BLUR" && currentFacture.TotalTTC !== "") {
      currentFacture.inputSource = "TTC";
    }
    if (fieldChanged === "TauxDC" && currentFacture.TauxDC !== "") {
      currentFacture.dcSource = "TauxDC";
    }
    if (fieldChanged === "MTDC" && currentFacture.MTDC !== "") {
      currentFacture.dcSource = "MTDC";
    }

    const isFodec = currentFacture.FODEC === "Oui";
    const fodecRate = isFodec ? 0.01 : 0;
    const tvaRate = parseNumber(currentFacture.tva) / 100;
    const timbre = parseNumber(currentFacture.Timbre);

    let tdcRate = parseNumber(currentFacture.TauxDC) / 100;
    let mtdc = parseNumber(currentFacture.MTDC);

    let htBase = 0;
    const master = currentFacture.inputSource;

    // Determine HT base based on known reliable source
    if (master === "HT" && currentFacture.TotalHT !== "") {
      htBase = parseNumber(currentFacture.TotalHT);
    } else if (master === "TTC" && currentFacture.TotalTTC !== "") {
      const ttc = parseNumber(currentFacture.TotalTTC);
      if (currentFacture.dcSource === "MTDC") {
        const val = ((ttc - timbre) / (1 + tvaRate) - mtdc) / (1 + fodecRate);
        htBase = val > 0 ? val : 0;
        currentFacture.TotalHT = htBase.toFixed(3);
      } else {
        const coef = 1 + tdcRate + fodecRate + tvaRate * (1 + tdcRate + fodecRate);
        htBase = coef > 0 ? (ttc - timbre) / coef : 0;
        currentFacture.TotalHT = htBase.toFixed(3);
      }
    } else if (currentFacture.TotalHT !== "") {
      htBase = parseNumber(currentFacture.TotalHT);
    } else if (currentFacture.TotalTTC !== "") {
      const ttc = parseNumber(currentFacture.TotalTTC);
      const coef = 1 + tdcRate + fodecRate + tvaRate * (1 + tdcRate + fodecRate);
      htBase = coef > 0 ? (ttc - timbre) / coef : 0;
      currentFacture.TotalHT = htBase.toFixed(3);
    }

    // Call recalc to update dependents safely
    if (htBase > 0 || currentFacture.TotalHT !== "") {
      const recalc = (ht) => {
        // Evaluate DC relationships
        if (currentFacture.dcSource === "TauxDC" || (!currentFacture.dcSource && currentFacture.TauxDC)) {
          mtdc = ht * tdcRate;
          currentFacture.MTDC = mtdc.toFixed(3);
        } else if (currentFacture.dcSource === "MTDC") {
          tdcRate = ht > 0 ? mtdc / ht : 0;
          currentFacture.TauxDC = (tdcRate * 100).toFixed(3);
        }

        // Evaluate FODEC logic
        const fodecAmount = isFodec ? ht * fodecRate : 0;
        currentFacture.MTFODEC = isFodec ? fodecAmount.toFixed(3) : "";

        // Final TVA & TTC Cascade
        const tvaBase = ht + mtdc + fodecAmount;
        const tvaAmount = tvaBase * tvaRate;

        // Never overwrite a currently active explicit user element string directly unless rounding is intentionally fired
        if (fieldChanged !== "TTC" && fieldChanged !== "TTC_BLUR") {
          currentFacture.TotalTTC = (ht + mtdc + fodecAmount + tvaAmount + timbre).toFixed(3);
        }
        if (fieldChanged === "TTC_BLUR" || fieldChanged === "HT_BLUR") {
          if (master === "TTC") currentFacture.TotalTTC = parseNumber(currentFacture.TotalTTC).toFixed(3);
          if (master === "HT") currentFacture.TotalHT = parseNumber(currentFacture.TotalHT).toFixed(3);
        }
      };

      recalc(htBase);
    }

    newFactures[index] = currentFacture;
    setFactures(newFactures);
    set_Validated(false);
  };

  // Handle changes for paie form fields
  const chngFn1 = (index, updatedPaie) => {
    const updatedPaies = [...paie];
    updatedPaies[index] = updatedPaie;
    setPaie(updatedPaies);
    set_Validated(false);
  };

  const chngFn2 = (index, updatedRetenue, fieldChanged) => {
    const updatedRetenues = [...retenue];
    const currentRetenue = { ...updatedRetenue };

    // Set inputSource when user changes Montant HT or Montant TTC
    if (fieldChanged === "montantHT" || fieldChanged === "montantTTC") {
      currentRetenue.inputSource = fieldChanged; // Track whether the user started with HT or TTC
    }

    const tvaRate = parseTVA(currentRetenue.tva); // Parse the TVA rate
    const montantHT = parseFloat(currentRetenue.montantHT);
    const montantTTC = parseFloat(currentRetenue.montantTTC);

    // If the user started with Montant HT (inputSource = "montantHT")
    if (currentRetenue.inputSource === "montantHT") {
      if (!isNaN(montantHT) && !isNaN(tvaRate)) {
        // Calculate Montant TTC
        currentRetenue.montantTTC = (montantHT * (1 + tvaRate)).toFixed(3);
      } else {
        currentRetenue.montantTTC = ""; // Clear Montant TTC if HT is invalid
      }
    }

    // If the user started with Montant TTC (inputSource = "montantTTC")
    if (currentRetenue.inputSource === "montantTTC") {
      if (!isNaN(montantTTC) && !isNaN(tvaRate)) {
        // Calculate Montant HT
        currentRetenue.montantHT = (montantTTC / (1 + tvaRate)).toFixed(3);
      } else {
        currentRetenue.montantHT = ""; // Clear Montant HT if TTC is invalid
      }
    }

    updatedRetenues[index] = currentRetenue;
    setRetenue(updatedRetenues);
    set_Validated(false);
  };

  const parseTVA = (tvaString) => {
    return tvaString / 100;
  };

  useEffect(() => {
    const openedByData = getOpenedAccordions();

    setActiveAccordion((prev) => {
      // merge previous opened accordions with new ones
      const merged = new Set([...prev, ...openedByData]);
      return Array.from(merged);
    });
  }, [factures.length, paie.length, retenue.length]);

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
      {alert?.message && (
        <Toast
          className="toast"
          bg={alert?.type || "info"}
          onClose={() => setAlert({ message: "", type: "" })}
        >
          <Toast.Body>{alert?.message || ''}</Toast.Body>
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
          <Row className="row-gt align-items-center justify-content-start g-2">
            <Col xs={6} sm={3} md="auto" className="form-labelannee">
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
            <Col xs={6} sm={3} md="auto">
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
            <Col xs={6} sm={3} md="auto">
              <div className="boutong">
                <Button
                  variant="primary"
                  type="submit"
                  className="custom-primaryg w-100"
                  onClick={handleSaisie}
                  disabled={!isFormValid}
                >
                  Saisie
                </Button>
              </div>
            </Col>
            <Col xs={6} sm={3} md="auto">
              <div className="boutong">
                <Button
                  variant="primary"
                  type="reset"
                  className="custom-primaryg w-100"
                  onClick={handleChangerMoisAnneeClick}
                  disabled={!isSaisieClicked}
                >
                  Changer Mois/année
                </Button>
              </div>
            </Col>
            <Col xs={12} md="auto" className="mt-2 mt-md-0 ms-md-auto">
              <div className="boutond">
                <Button
                  variant="primary"
                  type="button"
                  className="custom-primaryg"
                  onClick={toggleAllAccordions}
                >
                  Developper ou reduire toutes les tables{" "}
                </Button>
              </div>
            </Col>
          </Row>
          <Row className="row-accor">
            <Accordion alwaysOpen activeKey={activeAccordion}>
              <Accordion.Item eventKey="0">
                <Accordion.Header onClick={() => toggleAccordionItem("0")}>
                  Saisir mes factures
                </Accordion.Header>
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
                            <th className="thautre">
                              Date <span className="text-danger">*</span>
                            </th>
                            <th id="custome_th">
                              Type du facture
                              <span className="text-danger">*</span>
                            </th>
                            <th className="thmt">
                              Type d'achat ou de vente
                              <span className="text-danger">*</span>
                            </th>
                            <th className="thautre">Réf facture</th>
                            <th className="thmt">
                              Total HT <span className="text-danger">*</span>
                            </th>
                            <th className="thautre">
                              TVA <span className="text-danger">*</span>
                            </th>
                            <th className="thautre">
                              Timbre <span className="text-danger">*</span>
                            </th>
                            <th className="thmt">FODEC</th>
                            <th className="thmt">Montant FODEC</th>
                            <th className="thmt">Taux Droit de consommation</th>
                            <th className="thmt">
                              Montant Droit de consommation
                            </th>
                            <th className="thmt">
                              Total TTC <span className="text-danger">*</span>
                            </th>
                            <th style={hiddenStyle}>id</th>
                          </tr>
                        </thead>
                        <tbody>
                          {factures.length === 0 ? (
                            <tr>
                              <td
                                colSpan={15}
                                className="text-start text-muted py-3 ps-5"
                              >
                                La table des factures est vide
                              </td>
                            </tr>
                          ) : (
                            factures.map((facture, index) => (
                              <tr key={index}>
                                <td>
                                  <input
                                    type="checkbox"
                                    checked={facture.selected || false}
                                    onChange={() =>
                                      handleCheckboxChange(
                                        setFactures,
                                        factures,
                                        index,
                                      )
                                    }
                                  />
                                </td>
                                <td>
                                  <Form.Group
                                    controlId={`date-facture${index}`}
                                  >
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
                                  <Form.Group
                                    controlId={`type-facture-${index}`}
                                  >
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
                                      Veuillez sélectionner le type du facture
                                    </Form.Control.Feedback>
                                  </Form.Group>
                                </td>
                                <td>
                                  <Form.Group controlId={`TypeAV-${index}`}>
                                    <Form.Select
                                      aria-label="Type d'achat ou de vente"
                                      value={factures[index]?.TypeAV || ""}
                                      onChange={(e) =>
                                        chngFn(index, {
                                          ...factures[index],
                                          TypeAV: e.target.value,
                                        })
                                      }
                                      required
                                      isInvalid={
                                        validated && !factures[index]?.TypeAV
                                      }
                                    >
                                      <option value="">
                                        Type d'achat ou de vente
                                      </option>
                                      <option value="Achat d’équipement local">
                                        Equipement local
                                      </option>
                                      <option value="Achat d’équipement importé">
                                        Equipement importé
                                      </option>
                                      <option value="Autres achats locaux">
                                        Autres achats et ventes locaux
                                      </option>
                                      <option value="Autres achats importés">
                                        Autres achats et ventes importés
                                      </option>
                                    </Form.Select>
                                    <Form.Control.Feedback
                                      type="invalid"
                                      className="feedback"
                                    >
                                      Veuillez sélectionner type d'achat ou de
                                      vente
                                    </Form.Control.Feedback>
                                  </Form.Group>
                                </td>
                                <td>
                                  <Form.Control
                                    className="textadj"
                                    type="text"
                                    placeholder="Réf facture"
                                    value={facture.Ref}
                                    onChange={(e) =>
                                      chngFn(index, {
                                        ...factures[index],
                                        Ref: e.target.value,
                                      })
                                    }
                                  />
                                </td>
                                <td>
                                  <Form.Group
                                    controlId={`TotalHT-facture${index}`}
                                  >
                                    <Form.Control
                                      min="0"
                                      placeholder="Total HT"
                                      value={facture.TotalHT}
                                      step="0.001"
                                      onChange={(e) =>
                                        chngFn(
                                          index,
                                          {
                                            ...facture,
                                            TotalHT: e.target.value,
                                          },
                                          "HT",
                                        )
                                      }
                                      onBlur={() => chngFn(index, facture, "HT_BLUR")}
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
                                  <Form.Group
                                    controlId={`tva-facture-${index}`}
                                  >
                                    <Form.Select
                                      aria-label="TVA"
                                      value={factures[index]?.tva ?? ""} // Ensure correct access to the row's value
                                      onChange={(e) =>
                                        chngFn(
                                          index,
                                          {
                                            ...factures[index],
                                            tva: e.target.value,
                                          },
                                          "tva",
                                        )
                                      }
                                      required
                                      isInvalid={
                                        validated && !factures[index]?.tva
                                      }
                                    >
                                      <option value=""> Taux TVA </option>
                                      <option value="7">7%</option>
                                      <option value="13">13%</option>
                                      <option value="19">19%</option>
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
                                        chngFn(
                                          index,
                                          {
                                            ...facture,
                                            Timbre: e.target.value,
                                          },
                                          "Timbre",
                                        )
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
                                    controlId={`FODEC-facture-${index}`}
                                  >
                                    <Form.Select
                                      aria-label="FODEC"
                                      value={factures[index]?.FODEC || ""}
                                      onChange={(e) =>
                                        chngFn(index, {
                                          ...factures[index],
                                          FODEC: e.target.value,
                                        })
                                      }
                                    >
                                      <option value="">
                                        Soumise au FODEC ?{" "}
                                      </option>
                                      <option value="Oui">Oui</option>
                                      <option value="Non">Non</option>
                                    </Form.Select>
                                  </Form.Group>
                                </td>
                                <td>
                                  <Form.Group
                                    controlId={`MTFODEC-facture${index}`}
                                  >
                                    <Form.Control
                                      type="number"
                                      min="0"
                                      placeholder="Montant FODEC"
                                      value={facture.MTFODEC}
                                      step="0.001"
                                      onChange={(e) =>
                                        chngFn(
                                          index,
                                          {
                                            ...facture,
                                            MTFODEC: e.target.value,
                                          },
                                          "MTFODEC",
                                        )
                                      }
                                      readOnly
                                    />
                                  </Form.Group>
                                </td>
                                <td>
                                  <Form.Group
                                    controlId={`TauxDC-facture${index}`}
                                  >
                                    <Form.Control
                                      min="0"
                                      placeholder="Taux DC en %"
                                      value={facture.TauxDC}
                                      onChange={(e) =>
                                        chngFn(
                                          index,
                                          {
                                            ...facture,
                                            TauxDC: e.target.value,
                                          },
                                          "TauxDC",
                                        )
                                      }
                                    />
                                  </Form.Group>
                                </td>
                                <td>
                                  <Form.Group
                                    controlId={`MTDC-facture${index}`}
                                  >
                                    <Form.Control
                                      type="number"
                                      min="0"
                                      placeholder="Montant DC"
                                      value={facture.MTDC}
                                      step="0.001"
                                      onChange={(e) =>
                                        chngFn(
                                          index,
                                          {
                                            ...facture,
                                            MTDC: e.target.value,
                                          },
                                          "MTDC",
                                        )
                                      }
                                    />
                                  </Form.Group>
                                </td>
                                <td>
                                  <Form.Group
                                    controlId={`TotalTTC-facture${index}`}
                                  >
                                    <Form.Control
                                      type="number"
                                      min="0"
                                      placeholder="Total TTC"
                                      value={facture.TotalTTC}
                                      step="0.001"
                                      onChange={(e) =>
                                        chngFn(
                                          index,
                                          {
                                            ...facture,
                                            TotalTTC: e.target.value,
                                          },
                                          "TTC",
                                        )
                                      }
                                      onBlur={() => chngFn(index, facture, "TTC_BLUR")}
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

                                <td style={hiddenStyle}>
                                  <Form.Group
                                    className="textadj"
                                    type="number"
                                    min="0"
                                    defaultValue={-1}
                                    isInvalid={true}
                                    placeholder="id"
                                    value={facture.id}
                                    onChange={
                                      (e) =>
                                        chngFn(index, {
                                          ...facture,
                                          id: e.target.value,
                                        }) // Only updates Date
                                    }
                                    required
                                  ></Form.Group>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </Table>
                    </div>
                  </Container>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Row>
          <Row className="row-accor">
            <Accordion alwaysOpen activeKey={activeAccordion}>
              <Accordion.Item eventKey="1">
                <Accordion.Header onClick={() => toggleAccordionItem("1")}>
                  Saisir mes Paie
                </Accordion.Header>
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
                            <th style={hiddenStyle}>id</th>
                          </tr>
                        </thead>
                        <tbody>
                          {paie.length === 0 ? (
                            <tr>
                              <td
                                colSpan={6}
                                className="text-start text-muted py-3 ps-5"
                              >
                                La table des paies est vide
                              </td>
                            </tr>
                          ) : (
                            paie.map((row, index) => (
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
                                  <Form.Group
                                    controlId={`Salarier-paie${index}`}
                                  >
                                    <Form.Control
                                      className="textadj"
                                      type="text"
                                      placeholder="Salarier"
                                      value={paie[index]?.Salarier ?? ""} // Access value from the specific index
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
                                      className="form-select"
                                      value={paie[index]?.typepaie ?? ""} // Ensure correct access to the row's value
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
                                      <option value="">
                                        Secteur d'activité
                                      </option>
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
                                      className="form-select"
                                      value={paie[index]?.chef ?? ""} // Access the 'chef' value of the specific row
                                      onChange={(e) =>
                                        chngFn1(index, {
                                          ...paie[index], // Copy the existing data of the row
                                          chef: e.target.value, // Update the chef field
                                        })
                                      }
                                      required
                                      isInvalid={
                                        validated && !paie[index]?.chef
                                      } // Check the specific row's chef field for validation
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
                                      Veuillez sélectionner si le salarié est
                                      chef de famille
                                    </Form.Control.Feedback>
                                  </Form.Group>
                                </td>
                                <td>
                                  <Form.Group
                                    controlId={`enfants-paie-${index}`}
                                  >
                                    <Form.Control
                                      className="textadj"
                                      type="number"
                                      min="0"
                                      placeholder="Nombre d'enfants"
                                      value={paie[index]?.enfants ?? ""} // Bind the value to the specific row's 'enfants' field
                                      onChange={(e) =>
                                        chngFn1(index, {
                                          ...paie[index], // Copy existing row data
                                          enfants: e.target.value, // Update the 'enfants' field
                                        })
                                      }
                                      required
                                      isInvalid={
                                        validated &&
                                        (paie[index]?.enfants == null ||
                                          paie[index]?.enfants === "" ||
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
                                      value={paie[index]?.salaireBrut ?? ""} // Bind to the 'salaireBrut' value for the specific row
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
                                <td style={hiddenStyle}>
                                  <Form.Group
                                    className="textadj"
                                    type="number"
                                    min="0"
                                    isInvalid={true}
                                    defaultValue={-1}
                                    placeholder="id"
                                    value={paie.id}
                                    onChange={
                                      (e) =>
                                        chngFn(index, {
                                          ...paie,
                                          id: e.target.value,
                                        }) // Only updates Date
                                    }
                                    required
                                  ></Form.Group>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </Table>
                    </div>
                  </Container>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Row>
          <Row className="row-accor">
            <Accordion alwaysOpen activeKey={activeAccordion}>
              <Accordion.Item eventKey="2">
                <Accordion.Header onClick={() => toggleAccordionItem("2")}>
                  Saisir mes informations de retenue à la source
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
                            <th style={hiddenStyle}>id</th>
                          </tr>
                        </thead>
                        <tbody id="Retenue">
                          {retenue.length === 0 ? (
                            <tr>
                              <td
                                colSpan={5}
                                className="text-start text-muted py-3 ps-5"
                              >
                                La table des retenues à la source est vide
                              </td>
                            </tr>
                          ) : (
                            retenue.map((row, index) => (
                              <tr key={index}>
                                <td>
                                  <input
                                    type="checkbox"
                                    checked={row.selected || false}
                                    onChange={() =>
                                      handleCheckboxChange(
                                        setRetenue,
                                        retenue,
                                        index,
                                      )
                                    }
                                  />
                                </td>
                                <td>
                                  <Form.Select
                                    aria-label="Retenue à la source"
                                    value={retenue[index]?.source ?? ""}
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
                                    Veuillez sélectionner la source de la
                                    retenue
                                  </Form.Control.Feedback>
                                </td>

                                <td>
                                  <Form.Control
                                    className="textadj"
                                    type="number"
                                    min="0"
                                    placeholder="Montant HT"
                                    value={retenue[index]?.montantHT ?? ""}
                                    step="0.001"
                                    onChange={(e) =>
                                      chngFn2(
                                        index,
                                        {
                                          ...retenue[index],
                                          montantHT: e.target.value,
                                        },
                                        "montantHT",
                                      )
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
                                    aria-label="TVA"
                                    value={retenue[index]?.tva ?? ""}
                                    onChange={(e) =>
                                      chngFn2(
                                        index,
                                        {
                                          ...retenue[index],
                                          tva: e.target.value,
                                        },
                                        "tva",
                                      )
                                    }
                                    required
                                    isInvalid={
                                      validated && !retenue[index]?.tva
                                    }
                                  >
                                    <option value=""> Taux TVA </option>
                                    <option value="7">7%</option>
                                    <option value="13">13%</option>
                                    <option value="19">19%</option>
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
                                    value={retenue[index]?.montantTTC ?? ""}
                                    step="0.001"
                                    onChange={(e) =>
                                      chngFn2(
                                        index,
                                        {
                                          ...retenue[index],
                                          montantTTC: e.target.value,
                                        },
                                        "montantTTC",
                                      )
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
                                <td style={hiddenStyle}>
                                  <Form.Group
                                    className="textadj"
                                    type="number"
                                    min="0"
                                    isInvalid={true}
                                    defaultValue={-1}
                                    placeholder="id"
                                    value={retenue.id}
                                    onChange={
                                      (e) =>
                                        chngFn(index, {
                                          ...retenue,
                                          id: e.target.value,
                                        }) // Only updates Date
                                    }
                                    required
                                  ></Form.Group>
                                </td>
                                {/* ID caché */}
                                <td style={{ display: "none" }}>
                                  <Form.Control
                                    type="hidden"
                                    value={row.id ?? -1}
                                  />
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </Table>
                    </div>
                  </Container>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Row>
          <Row className="d-flex flex-column flex-md-row justify-content-center align-items-center">
            <Col xs="auto" md="auto" className="mb-2 mb-md-0">
              <Form.Group className="Reporttva">
                <Form.Control
                  type="number"
                  name="Reporttva"
                  value={ReportTVA}
                  step="0.001"
                  readOnly={!isSaisieClicked}
                  className="reporttva"
                  onChange={(e) => setReportTVA(e.target.value)}
                  placeholder="Report de TVA du mois précédent "
                />
              </Form.Group>
            </Col>
            {/*
             <Col xs="auto" md="auto">
              <Form.Select
                className="Retard"
                value={retard}
                onChange={(e) => setRetard(e.target.value)}
                isInvalid={validated && !retard}
                required
                disabled={!isSaisieClicked}
              >
                <option value="">Déclaration en retard ?</option>
                <option value="Oui">Oui</option>
                <option value="Non">Non</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Veuillez indiquer si la déclaration est en retard ou non
              </Form.Control.Feedback>
            </Col>
            */}
          </Row>

          <div className="boutons">
            <Button
              variant="primary"
              type="submit"
              className="custom-primary"
              disabled={!isSaisieClicked}
              onClick={save_decla}
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
