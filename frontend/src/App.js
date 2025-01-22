import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import PropertyList from "./components/PropertyList";
import Login from "./components/Login";
import Register from "./components/Register";
import AddProperty from "./components/AddProperty";
import './App.css'

function App() {
  const [authToken, setAuthToken] = React.useState(localStorage.getItem("token") || "");

  return (
    <Router>
      <Navbar authToken={authToken} setAuthToken={setAuthToken} />
      <Routes>
        <Route path="/" element={<PropertyList />} />
        <Route path="/login" element={<Login setAuthToken={setAuthToken} />} />
        <Route path="/register" element={<Register />} />
        {authToken ? (
          <>
            <Route path="/add-property" element={<AddProperty />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
