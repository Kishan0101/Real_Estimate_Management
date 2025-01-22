import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ authToken, setAuthToken }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthToken("");
    navigate("/login");
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Property List</Link></li>
        {!authToken ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/add-property">Add Property</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
