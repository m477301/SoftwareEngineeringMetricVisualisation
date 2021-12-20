/*THIRD PARTY FUNCTIONS*/
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

/* CSS */
import "./styles/global.scss";

/* ---------------------------------------------------------- PAGES ---------------------------------------------------------- */

import HomePage from "./pages/HomePage";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/user/:username" element={<UserProfile />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
