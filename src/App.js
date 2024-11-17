import React, { useState } from "react";
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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for logged in status

  return (
    <div>
      <Router>
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
          <Route path="/moncompte" element={<Moncompte />} />
          <Route
            path="/connexion"
            element={<Connexion setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/gerer" element={<Gerer />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/visualiser" element={<Visualiser />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/propos" element={<Propos />} />
          <Route path="/condition" element={<Conditions />} />
          <Route path="/reinitialisation" element={<Reinitialisation />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
