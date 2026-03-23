import { HashRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Genres from "./pages/Genres";
import Deals from "./pages/Deals";
import Browse from "./pages/Browse";
import Devlogs from "./pages/Devlogs";
import LoginSignup from "./pages/LoginSignup";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/devlogs" element={<Devlogs />} />
        <Route path="/login" element={<LoginSignup />} />
      </Routes>
    </HashRouter>
  );
}

export default App;