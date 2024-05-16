import "./App.css";
import Dashboard from "./DashBoard/DashBoard";
import Login from "./Login/Login";
import Home from "./Home/Home";
import { Routes, Route} from "react-router-dom";

function App() {
  return (
    <Routes>
     <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
