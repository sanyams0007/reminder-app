import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import AuthUserContext from "../context/UserAuthContext";

import "./Auth.css";
import {
  LOGIN_USER,
  LOGIN_FAILED,
  SET_REMS,
  UNSET_REMS,
} from "../context/reducer";
import setAuthToken from "../context/setAuthToken";
import { Link } from "react-router-dom";

const Login = ({ history }) => {
  const {
    state: { isAuthenticated },
    dispatch,
  } = useContext(AuthUserContext);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  /*  <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                } */

  const handleLoginData = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const loggedUser = await axios.post("users/login", loginData);
      setAuthToken(loggedUser.data.token);
      dispatch({
        type: LOGIN_USER,
        payload: loggedUser.data,
      });

      const reminders = await axios.get("reminders");
      dispatch({
        type: SET_REMS,
        payload: reminders.data,
      });

      //setAuthToken(state.token);
    } catch (error) {
      dispatch({
        type: LOGIN_FAILED,
      });
      dispatch({
        type: UNSET_REMS,
      });
      error.response.data.msg && setError(error.response.data.msg);
      setTimeout(() => setError(""), 5000);
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/dashboard");
    }
  }, [isAuthenticated, history]);

  return (
    <div className="auth_container">
      <div className="auth_box">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form className="auth_form" onSubmit={login}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginData.email}
            onChange={handleLoginData}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleLoginData}
            required
          />
          <button className="auth_btn login_btn" type="submit">
            Login
          </button>
          <p>
            Don't have an account ? <Link to="/register">Register</Link>
          </p>
          <p style={{ margin: "0px" }}>
            For lazy users ? Get{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://temp-mail.org/en/"
            >
              Test Mail
            </a>{" "}
            here.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
