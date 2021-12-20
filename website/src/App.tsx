/*THIRD PARTY FUNCTIONS*/
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

/* CSS */
import "./styles/global.scss";

/* ---------------------------------------------------------- PAGES ---------------------------------------------------------- */

import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
