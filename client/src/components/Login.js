import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
//import { useHistory } from 'react-router-dom'
import AuthUserContext from "../context/UserAuthContext";
import "./Login.css";
import {
  REGISTER_USER,
  REGISTER_FAILED,
  LOGIN_USER,
  LOGIN_FAILED,
  SET_REMS,
  UNSET_REMS,
} from "../context/reducer";
import setAuthToken from "../context/setAuthToken";

const Login = (props) => {
  const { state, dispatch } = useContext(AuthUserContext);
  const [active, setActive] = useState("");
  //const history = useHistory();
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    check_password: "",
    phone: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    if (state.isAuthenticated) {
      props.history.push("/dashboard");
    }
  }, [state.isAuthenticated, props.history]);

  /*  <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                } */

  const changeRegisterData = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const changeLoginData = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const signUp = async (e) => {
    e.preventDefault();
    try {
      const registeredUser = await axios.post(
        "http://localhost:5000/users/register",
        registerData
      );

      dispatch({
        type: REGISTER_USER,
        payload: registeredUser.data,
      });
      setActive("");
    } catch (error) {
      dispatch({
        type: REGISTER_FAILED,
      });
      error.response.data.msg && setServerError(error.response.data.msg);
      console.log(serverError);
    }
  };

  const signIn = async (e) => {
    e.preventDefault();
    try {
      const loggedUser = await axios.post(
        "http://localhost:5000/users/login",
        loginData
      );
      setAuthToken(loggedUser.data.token);
      dispatch({
        type: LOGIN_USER,
        payload: loggedUser.data,
      });

      const reminders = await axios.get("http://localhost:5000/reminders");
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
      error.response.data.msg && setServerError(error.response.data.msg);
      console.log(serverError);
    }
  };

  return (
    <div className={`main_container ${active}`}>
      <div className="wrapper">
        <div className="form_container sign_up_container">
          <form className="sign_up_form" onSubmit={signUp}>
            <h2>Create Account</h2>
            {serverError && (
              <div className="error">
                <small>{serverError}</small>
                <button onClick={() => setServerError("")}>X</button>
              </div>
            )}
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={registerData.name}
              onChange={changeRegisterData}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={registerData.email}
              onChange={changeRegisterData}
              required
            />
            <input
              type="number"
              name="phone"
              placeholder="Phone Number"
              value={registerData.phone}
              onChange={changeRegisterData}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={registerData.password}
              onChange={changeRegisterData}
              required
            />
            <input
              type="password"
              name="confirm_password"
              placeholder="Confirm Password"
              value={registerData.confirm_password}
              onChange={changeRegisterData}
              required
            />
            <button className="main_btn" type="submit">
              Sign Up
            </button>
          </form>
        </div>
        <div className="form_container sign_in_container">
          <form className="sign_in_form" onSubmit={signIn}>
            <h2>Sign in</h2>
            {serverError && (
              <div className="error">
                <small>{serverError}</small>
                <button onClick={() => setServerError("")}>X</button>
              </div>
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginData.email}
              onChange={changeLoginData}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={changeLoginData}
              required
            />
            <button className="main_btn" type="submit">
              Sign in
            </button>
          </form>
        </div>
        <div className="overlay_container">
          <div className="overlay">
            <div className="overlay_panel overlay_left">
              <h2>Welcome Back!</h2>
              <p>To keep connected with us please login with your account.</p>
              <button
                onClick={() => {
                  setServerError("");
                  setActive("");
                }}
                className="ghost"
                id="signIn"
              >
                Sign In
              </button>
            </div>
            <div className="overlay_panel overlay_right">
              <h2>Hello, Friend!</h2>
              <p>Create a new account and start journey with us</p>
              <button
                onClick={() => {
                  setServerError("");
                  setActive("right_panel_active");
                }}
                className="ghost"
                id="signUp"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
