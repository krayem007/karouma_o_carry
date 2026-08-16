import React from "react";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '',
  withCredentials: true,
});

const LanguageSwitcher = ({ isLoggedIn }) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    if (lang === "ar") {
      document.body.classList.add("rtl-mode");
    } else {
      document.body.classList.remove("rtl-mode");
    }
    if (isLoggedIn) {
      instance.post("/update_language", { email: localStorage.getItem("email"), language: lang })
        .then(() => {})
        .catch(() => {});
    }
  };

  return (
    <Dropdown className="d-inline-block">
      <Dropdown.Toggle variant="link" className="navbartext language-switcher" style={{
        textDecoration: "none",
        fontSize: "16px",
        padding: "0",
      }}>
        {i18n.language === "ar" ? "العربية" : "Français"}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => changeLanguage("fr")}>Français</Dropdown.Item>
        <Dropdown.Item onClick={() => changeLanguage("ar")}>العربية</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageSwitcher;
