import React, { useContext, useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import UserAuthContext from "../context/UserAuthContext";
import { LOGOUT_USER } from "../context/reducer";

const Header = (props) => {
  const { state, dispatch } = useContext(UserAuthContext);
  const [open, setOpen] = useState("open");

  //const history = useHistory();

  const hamburger = () => {
    if (open === "") setOpen("open");
    else setOpen("");
  };

  const logout = () => {
    dispatch({
      type: LOGOUT_USER,
    });
    /* history.push('/'); */
    hamburger();
  };

  return (
    <div className="header">
      <h1 className="logo">
        <span>E'DAY</span> Reminders
      </h1>
      <div className="hamburger" onClick={hamburger}>
        <div className="line"></div>
        <div className="line line2"></div>
        <div className="line"></div>
      </div>
      <nav className={`navbar ${open}`}>
        {state.isAuthenticated ? (
          <Link onClick={hamburger} className="navlink" to="/dashboard">
            Dashboard
          </Link>
        ) : (
          <Link onClick={hamburger} className="navlink" to="/">
            Home
          </Link>
        )}
        {state.isAuthenticated ? (
          <Link onClick={logout} className="navlink" to="/">
            Logout
          </Link>
        ) : (
          <Link onClick={hamburger} className="navlink" to="/login">
            Login
          </Link>
        )}
        <Link onClick={hamburger} className="navlink" to="/about">
          About
        </Link>
        {/* <Link onClick={hamburger} className="navlink" to="/contact">
          Contact us
        </Link> */}
      </nav>
    </div>
  );
};

export default Header;
