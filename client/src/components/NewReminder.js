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
  const { state, dispatch } = useContext(UserAuthContext);
  const [serverError, setServerError] = useState(null);
  const currentReminder = state.currentId
    ? state.reminders.find((p) => p._id === state.currentId)
    : null;
  const userEmail = state.user.email;
  const userPhone = state.user.phone;
  console.log(userPhone);
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

  //console.log(time, date);
  //let currentReminder = null;
  //console.log(state.currentId)
  /* const currentReminder = state.currentId ? state.reminders.find((p) => p._id === state.currentId) : null; */
  //console.log(moment(currentReminder.remindAt).format("L"));
  //console.log(moment(currentReminder.remindAt).format("LT"));
  if (state.currentId) {
    //console.log(currentReminder)
    //currentReminder = state.reminders.find((p) => p._id === state.currentId);
    //const newd = new Date(currentReminder.remindAt)
    //setTime(moment(currentReminder.remindAt).format("LT"));
    //setDate(moment(currentReminder.remindAt).format("L"));
    //setData(currentReminder);
    console.log(">>> time ", moment(currentReminder.remindAt).format("LT"));
    console.log(">>> date ", moment(currentReminder.remindAt).format("L"));
    /* console.log(new Date(currentReminder.remindAt).getHours());
        console.log(new Date(currentReminder.remindAt).getMinutes()); */
    //setTime("time", newd.getHours() + ":" + newd.getMinutes());
    //console.log('date', newd.toLocaleDateString());
  }

  useEffect(() => {
    if (currentReminder !== null) {
      //setTime(moment(currentReminder.remindAt).format("HH:mm"));
      //setDate(moment(currentReminder.remindAt).format("L"));
      //console.log(date)
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
    /* setData(prevData => ({
            ...prevData,
            "remindAt": new Date(`${date} ${time}`).toISOString(),
        })); */
  }, [currentReminder]);

  /* console.log(dateTime)
    console.log(new Date(`${dateTime.date} ${dateTime.time}`));
    console.log(new Date(`${dateTime.date} ${dateTime.time}`).toISOString());

 */

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
        //console.log(state.currentId);
        const updatedReminder = await axios.patch(
          `https://edayreminder-app.herokuapp.com/reminders/${state.currentId}`,
          data
        );
        console.log(updatedReminder.data);
        dispatch({
          type: UPDATE_REMINDER,
          payload: updatedReminder.data,
        });
      } else {
        const newReminder = await axios.post(
          "https://edayreminder-app.herokuapp.com/reminders",
          data
        );
        //console.log(newReminder);
        dispatch({
          type: ADD_REMINDER,
          payload: newReminder.data,
        });
        setServerError(null);
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
      console.log(error.response);
      error.response.data.msg && setServerError(error.response.data.msg);
      console.log(serverError);
    }
    /* catch (error) {
             //error.response.data.msg && setServerError(error.response.data.msg);
             console.log(error.response.data.msg);
         }
  */
  };

  return (
    <div className="new_reminder">
      <div className="main_heading">
        {" "}
        <h2>{state.currentId ? "UPDATE REMINDER" : "NEW REMINDER"}</h2>
      </div>
      <div className="left">
        <Calender value={date} updateValue={handleDate} />
      </div>
      <div className="right">
        <form onSubmit={onSubmit}>
          {serverError && (
            <div className="create_error">
              <small>{serverError}</small>
              <button onClick={() => setServerError("")}>X</button>
            </div>
          )}
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
              /*  setData(prevData => ({
                                 ...prevData,
                                 "remindAt": new Date(`${date} ${value}`).toISOString(),
                             })) */
              /*  console.log(new Date(`${date} ${time}`).toISOString())
                             console.log(value)
                             console.log("remind At >>>", moment(data.remindAt).format('lll'))
                             console.log("remind At >>>", moment(new Date(`${date} ${time}`).toISOString()).format('lll')) */
            }}
            value={time}
            hourPlaceholder="hh"
            minutePlaceholder="mm"
            required="true"
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
          <button class="btn" type="submit">
            {state.currentId ? "Update" : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default withRouter(NewReminder);
