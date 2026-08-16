import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Home from "./pages/home";
import Inscription from "./pages/register";
import Connexion from "./pages/login";
import "./css/style.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./pages/welcome";
import Visualiser from "./pages/visualiser";
import Gerer from "./pages/gerer";
import Moncompte from "./pages/moncompte";
import Contact from "./pages/contact";
import Faq from "./pages/faq";
import Propos from "./pages/propos";
import Conditions from "./pages/condition";
import Reinitialisation from "./pages/reinitialisation";
import ResetPassword from "./pages/resetpassword";
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '', // Base URL of the Express backend
  withCredentials: true, // Allow sending cookies with requests
});


function App() {
  const { i18n } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for logged in status

  useEffect(() => {
    const savedLang = localStorage.getItem("language") || "fr";
    i18n.changeLanguage(savedLang);
    document.documentElement.lang = savedLang;
    document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
    if (savedLang === "ar") {
      document.body.classList.add("rtl-mode");
    } else {
      document.body.classList.remove("rtl-mode");
    }
  }, [i18n]);

  useEffect(() => {

    instance.get("/welcome").then((response) => {
      if (response.data.authorized === "true") {
        setIsLoggedIn(true);
        //navigate("/welcome");
      }
      else {
        setIsLoggedIn(false);
        //neet to logging first
      }
    });
  }, []);

  return (
    <div>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          {/* Passing isLoggedIn and setIsLoggedIn as props to Home */}
          <Route
            path="/"
            element={
              <Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            }
          />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/moncompte" element={<Moncompte setIsLoggedIn={setIsLoggedIn} />} />
          <Route
            path="/connexion"
            element={<Connexion setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/gerer" element={<Gerer />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/declaration" element={<Visualiser />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/propos" element={<Propos />} />
          <Route path="/condition" element={<Conditions />} />
          <Route path="/reinitialisation" element={<Reinitialisation />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
