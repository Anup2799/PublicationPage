import { BrowserRouter, Routes, Route } from "react-router-dom";
import Publication from "./pages/Publication";
import Patents from "./pages/Patents";
import Whitepapers from "./pages/Whitepapers";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/Home" element={<Publication />} />
          <Route path="/pages/whitepapers" element={<Whitepapers />} />
          <Route path="/pages/patents" element={<Patents />} />
          

          {/* Default route */}
          <Route index element={<Publication />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
