// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Patents from "./pages/Patents";
import Whitepapers from "./pages/Whitepapers";
import CardDetails from "./pages/CardDetails";
import CardDetailsW from "./pages/CardDetailsW";

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/pages/Whitepapers" element={<Whitepapers />} />
        <Route path="/pages/Patents" element={<Patents />} />
        <Route path="/pages/CardDetails/:cardId" element={<CardDetails />} />
        <Route path="/pages/CardDetailsW/:cardId" element={<CardDetailsW />} />

        {/* Default route */}
        <Route index element={<Patents />} />
      </Routes>
    </Router>
  );
}

export default App;
