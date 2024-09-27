import "./App.css";
import Dashboard from "./DashBoard/DashBoard";
import Login from "./Login/Login";
import Home from "./Home/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import { useUserContext } from "./context/UserContext.jsx";

function App() {
  let { user } = useUserContext();

  return (
    <Routes>
      <Route
        path="/"
        element={user && user ? <Navigate to={"/DashBoard"} /> : <Home />}
      />
      <Route
        path="/Login"
        element={user && user ? <Navigate to={"/DashBoard"} /> : <Login />}
      />
      <Route
        path="/Dashboard"
        element={user && user ? <Dashboard /> : <Navigate to={"/"} />}
      />
    </Routes>
  );
}

export default App;
