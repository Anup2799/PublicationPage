// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Publication from "./pages/Publication";
import Patents from "./pages/Patents";
import Whitepapers from "./pages/Whitepapers";
import CardDetails from "./pages/CardDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Home" element={<Publication />} />
        <Route path="/pages/whitepapers" element={<Whitepapers />} />
        <Route path="/pages/patents" element={<Patents />} />
        <Route path="/pages/CardDetails/:cardId" element={<CardDetails />} />

        {/* Default route */}
        <Route index element={<Publication />} />
      </Routes>
    </Router>
  );
}

export default App;
