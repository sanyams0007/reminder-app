import React, { useState, useContext, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";

import AuthUserContext from "../context/UserAuthContext";
import "./Auth.css";
import { REGISTER_USER, REGISTER_FAILED } from "../context/reducer";
import { Link } from "react-router-dom";

const Register = ({ history }) => {
  const { state, dispatch } = useContext(AuthUserContext);
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    phone: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (state.isAuthenticated) {
      history.push("/dashboard");
    }
  }, [state.isAuthenticated, history]);

  const handleRegisterData = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const registeredUser = await axios.post("users/register", registerData);

      dispatch({
        type: REGISTER_USER,
        payload: registeredUser.data,
      });
      history.push("/login");
    } catch (error) {
      dispatch({
        type: REGISTER_FAILED,
      });
      error.response.data.msg && setError(error.response.data.msg);
      setTimeout(() => setError(""), 5000);
      console.log(error);
    }
  };

  return (
    <div className="auth_container">
      <div className="auth_box">
        <h2>Create Account</h2>
        {error && <p className="error">{error}</p>}
        <form className="auth_form" onSubmit={registerUser}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={registerData.name}
            onChange={handleRegisterData}
            autoComplete="false"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={registerData.email}
            onChange={handleRegisterData}
            autoComplete="false"
            required
          />
          <input
            type="tel"
            name="phone"
            maxLength="10"
            placeholder="Phone Number"
            value={registerData.phone}
            onChange={handleRegisterData}
            required
            autoComplete="false"
          />
          {/* <PhoneInput
            country={"in"}
            inputProps={{
              name: "phone",
              required: true,
            }}
            value={registerData.phone}
            onChange={(phone, country, e, _) => {
              //console.log(e.target.value, { phone, country, _ });
              e.target.value = phone;
              handleRegisterData(e);
            }}
          /> */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={registerData.password}
            onChange={handleRegisterData}
            autoComplete="false"
            required
          />
          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
            value={registerData.confirm_password}
            onChange={handleRegisterData}
            autoComplete="false"
            required
          />
          <button className="auth_btn" type="submit">
            Register
          </button>
          <p>
            Have an account ? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
