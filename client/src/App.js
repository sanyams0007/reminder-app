import React, { useEffect, useContext } from "react";
import axios from "axios";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
//import OldLogin from "./components/OldLogin";
import Login from "./components/Login";
import Home from "./components/Home";
import Header from "./components/Header";
import About from "./components/About";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import Reminders from "./components/Reminders";
import NewReminder from "./components/NewReminder";
import Feedback from "./components/Feedback";
import UserAccount from "./components/UserAccount";
import Register from "./components/Register";
import Error404 from "./components/Error404";

import setAuthToken from "./context/setAuthToken";
import UserAuthContext from "./context/UserAuthContext";

import { LOAD_USER, SET_REMS, UNSET_REMS, AUTH_ERROR } from "./context/reducer";

axios.defaults.baseURL = "https://edayreminder-app.herokuapp.com/";
//axios.defaults.baseURL = "http://localhost:5000/";

function App() {
  const {
    state: { isAuthenticated },
    dispatch,
  } = useContext(UserAuthContext);

  useEffect(() => {
    const checkLoggedIn = async () => {
      //get auth token if exist from last visit/session
      let token = JSON.parse(localStorage.getItem("token"));

      if (token === null) {
        localStorage.setItem("token", "");
        token = "";
      }

      //setAuthToken in header for all subsequent req.
      setAuthToken(token);

      //check if token is valid through API and return true or false.
      const tokenRes = await axios.post("users/tokenIsValid");

      //if token is valid then get user data from private route
      // and send response data from API to state using dispatch
      if (tokenRes.data) {
        try {
          const user = await axios.get("users");
          dispatch({
            type: LOAD_USER,
            payload: user.data,
          });

          const reminders = await axios.get("reminders");
          dispatch({
            type: SET_REMS,
            payload: reminders.data,
          });
        } catch (error) {
          dispatch({
            type: UNSET_REMS,
          });
          dispatch({
            type: AUTH_ERROR,
          });
          console.log(error.response.data.msg);
        }
      }
    };
    checkLoggedIn();
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact>
            {isAuthenticated ? <Redirect to="/dashboard" /> : <Home />}
          </Route>
          <Route path="/login" component={Login} />
          {/* <Route path="/login" component={OldLogin} /> */}
          <Route path="/register" component={Register} />
          <Route path="/about" component={About} />
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            path="/dashboard"
            component={Dashboard}
          />
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            path="/reminders"
            component={Reminders}
          />
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            path="/create"
            component={NewReminder}
          />

          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            path="/feedback"
            component={Feedback}
          />
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            path="/account"
            component={UserAccount}
          />
          <Route path="*" component={Error404} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
