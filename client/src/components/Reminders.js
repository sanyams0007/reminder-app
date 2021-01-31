import React, { useContext } from "react";
//import axios from 'axios';
//import { SET_REMS, UNSET_REMS } from '../context/reducer';
import { withRouter } from "react-router-dom";
import "./Reminders.css";
import UserAuthContext from "../context/UserAuthContext";
import Reminder from "./Reminder";

const Reminders = () => {
  const { state } = useContext(UserAuthContext);
  let colors = [
    "linear-gradient(120, rgba(161, 255, 206, .2), rgba(250, 255, 209, .2))",
    "linear-gradient(45deg, rgba(170, 75, 107, .2), rgba(107, 107, 131, .2), rgba(59, 141, 153, .2))",
    "linear-gradient(210deg, rgba(217, 167, 199, .3), rgba(255, 252, 220, .3))",
    "linear-gradient(315deg, rgba(116, 235, 213, .2), rgba(172, 182, 229, .2))",
    "linear-gradient(140deg, rgba(255, 175, 189, .3), rgba(255, 195, 160, .3))",
  ];

  return (
    <div className="reminders">
      {!state.reminders.length ? (
        "NOTHING"
      ) : (
        <>
          <h2>Manage Your Reminders..</h2>
          <div className="reminders_container">
            {state.reminders?.map((reminder) => {
              let random_color =
                colors[Math.floor(Math.random() * colors.length)];
              return (
                <Reminder
                  bgimage={random_color}
                  key={reminder._id}
                  rem={reminder}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default withRouter(Reminders);
