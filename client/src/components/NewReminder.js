import React, { useContext, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Calender from "./Calender";
import TimePicker from "react-time-picker";
import "./NewReminder.css";
import UserAuthContext from "../context/UserAuthContext";
import { UPDATE_REMINDER, ADD_REMINDER, UNSET_ID } from "../context/reducer";
import moment from "moment";

const NewReminder = () => {
  const [error, setError] = useState(null);

  const { state, dispatch } = useContext(UserAuthContext);

  const currentReminder = state.currentId
    ? state.reminders.find((p) => p._id === state.currentId)
    : null;
  const userEmail = state.user.email;
  const userPhone = state.user.phone;
  let d = new Date();

  const [time, setTime] = useState(
    state.currentId
      ? moment(currentReminder.remindAt).format("HH:mm")
      : d.getHours() + ":" + d.getMinutes()
  );

  const [date, setDate] = useState(
    state.currentId
      ? moment(currentReminder.remindAt).format("L")
      : d.toLocaleDateString()
  );

  const [data, setData] = useState({
    title: "",
    message: "",
    phone: false,
    email: true,
    remindAt: new Date(`${date} ${time}`).toISOString(),
    userEmail,
    userPhone,
  });

  useEffect(() => {
    if (currentReminder !== null) {
      setData(currentReminder);
    } else {
      setData({
        title: "",
        message: "",
        phone: false,
        email: true,
        remindAt: new Date(`${date} ${time}`).toISOString(),
        userEmail,
        userPhone,
      });
    }
  }, [currentReminder]);

  const onChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTime = (value) => {
    setTime(value);
    setData((prevData) => ({
      ...prevData,
      remindAt: new Date(`${date} ${value}`).toISOString(),
    }));
  };

  const handleDate = (value) => {
    setDate(value);
    setData((prevData) => ({
      ...prevData,
      remindAt: new Date(`${value} ${time}`).toISOString(),
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (state.currentId) {
        const updatedReminder = await axios.patch(
          `reminders/${state.currentId}`,
          data
        );
        //console.log(updatedReminder.data);
        dispatch({
          type: UPDATE_REMINDER,
          payload: updatedReminder.data,
        });
      } else {
        const newReminder = await axios.post("reminders", data);
        //console.log(newReminder);
        dispatch({
          type: ADD_REMINDER,
          payload: newReminder.data,
        });
        setError(null);
      }
      dispatch({
        type: UNSET_ID,
      });
      setData({
        title: "",
        message: "",
        phone: false,
        email: true,
        remindAt: "",
        userEmail,
        userPhone,
      });
    } catch (error) {
      /*  error.response.data.msg &&  */
      setError(error.response.data.msg);
      setTimeout(() => setError(""), 5000);

      console.log(error);
    }
  };

  return (
    <div className="new_reminder">
      <div className="main_heading">
        <h2>{state.currentId ? "UPDATE REMINDER" : "NEW REMINDER"}</h2>
      </div>
      <div className="left">
        <Calender value={date} updateValue={handleDate} />
      </div>
      <div className="right">
        {error && <p className="error">{error}</p>}
        <p className="attention">
          <b> Attention </b>: As of now Message/Phone reminder is available only
          for Indian Mobile No. due to Trial A/C of Telecom Provider.
        </p>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={data.title}
            onChange={onChange}
            required
          />
          <input
            type="text"
            name="message"
            placeholder="Enter Your Message"
            value={data.message}
            onChange={onChange}
            required
          />

          <TimePicker
            onChange={(value) => {
              handleTime(value);
            }}
            value={time}
            hourPlaceholder="hh"
            minutePlaceholder="mm"
            required
          />
          <div className="options">
            <label>Send Notification on?</label>
            <div className="input">
              <label>Email:</label>
              <input
                id="email_check"
                type="checkbox"
                name="email"
                checked={data.email}
                value={data.email}
                onChange={() => {
                  setData({
                    ...data,
                    email: !data.email,
                  });
                }}
              />
            </div>
            <div className="input">
              <label>Phone:</label>
              <input
                id="phone_check"
                type="checkbox"
                name="phone"
                checked={data.phone}
                value={data.phone}
                onChange={(e) => {
                  setData({
                    ...data,
                    phone: !data.phone,
                  });
                }}
              />
            </div>
          </div>
          <button className="btn" type="submit">
            {state.currentId ? "Update" : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default withRouter(NewReminder);
