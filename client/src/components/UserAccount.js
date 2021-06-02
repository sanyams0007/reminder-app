import React, { useContext } from "react";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import { withRouter } from "react-router-dom";
import "./UserAccount.css";
import UserAuthContext from "../context/UserAuthContext";
const UserAccount = () => {
  const { state } = useContext(UserAuthContext);
  return (
    <div className="user_main_container">
      <div className="user_account">
        <h2>Your Account</h2>
        <div className="user_card">
          <p className="title">Hello, {state.user.name}</p>
          <div className="icon_container">
            <EmailIcon fontSize="large"></EmailIcon>
            <label>Email:</label>
            <span>{state.user.email}</span>
          </div>
          <div className="icon_container">
            <PhoneIcon fontSize="large" color=""></PhoneIcon>
            <label>Mobile:</label>
            <span>{state.user.phone}</span>
          </div>
          <p>Total Reminder: {state.reminders.length}</p>
        </div>
      </div>
    </div>
  );
};

export default withRouter(UserAccount);
