import "./App.css";
import Dashboard from "./components/pages/Dashboard";
import Home from "./components/pages/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyBooks from "./components/pages/MyBooks";
import Matching from "./components/pages/Matching";
import Requests from "./components/pages/Requests";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="myBooks" element={<MyBooks />} />
          <Route path="matching" element={<Matching />} />
          <Route path="requests" element={<Requests />} />
          {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
