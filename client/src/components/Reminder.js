import React, { useContext } from "react";
import moment from "moment";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import "./Reminder.css";
import axios from "axios";
import UserAuthContext from "../context/UserAuthContext";
import { DELETE_REMINDER, SET_ID } from "../context/reducer";
import { useHistory } from "react-router-dom";

const Reminder = (props) => {
  const { dispatch } = useContext(UserAuthContext);
  const history = useHistory();
  const deleteReminder = async (_id) => {
    try {
      /* const url = `${baseUrl}/${_id}` */
      const deletedReminder = await axios.delete(`reminders/${_id}`);
      dispatch({
        type: DELETE_REMINDER,
        payload: deletedReminder.data._id,
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const updateReminder = (_id) => {
    dispatch({
      type: SET_ID,
      payload: _id,
    });
    history.push(`/create/${_id}`);
  };

  return (
    <div className="reminder" style={{ backgroundImage: props.bgimage }}>
      <h3>{props.rem.title}</h3>
      <p className="message">{props.rem.message}</p>
      <p>
        Notification on:
        {props.rem.email ? <span>email</span> : null}
        {props.rem.phone ? <span>phone</span> : null}
      </p>
      <h5>Reminder At : {moment(props.rem.remindAt).format("lll")}</h5>
      <p>Created : {moment(props.rem.createdAt).format("ll")}</p>
      <div className="rem_btn">
        <EditIcon
          onClick={() => updateReminder(props.rem._id)}
          className="btn"
        ></EditIcon>
        <DeleteIcon
          onClick={() => deleteReminder(props.rem._id)}
          className="btn"
        ></DeleteIcon>
      </div>
    </div>
  );
};

export default Reminder;
