import React, { useEffect, useContext } from "react";
import axios from "axios";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./components/Login";
import Home from "./components/Home";
import Header from "./components/Header";
import About from "./components/About";
import Footer from "./components/Footer";
import setAuthToken from "./context/setAuthToken";
import UserAuthContext from "./context/UserAuthContext";
import { LOAD_USER, SET_REMS, UNSET_REMS, AUTH_ERROR } from "./context/reducer";
import Dashboard from "./components/Dashboard";
import Reminders from "./components/Reminders";
import NewReminder from "./components/NewReminder";
import Feedback from "./components/Feedback";
import UserAccount from "./components/UserAccount";

function App() {
  const { state, dispatch } = useContext(UserAuthContext);

  useEffect(() => {
    const checkLoggedIn = async () => {
      //get auth token if exist from last visit/session from ls
      let token = localStorage.getItem("token");
      if (token === null) {
        console.log(token);
        localStorage.setItem("token", "");
        token = "";
        console.log(token);
      }

      //setAuthToken in header for all subsequent req.
      setAuthToken(token);

      //check if token is valid through API and return true or false.
      const tokenRes = await axios.post(
        "https://edayreminder-app.herokuapp.com/tokenIsValid"
      );

      //if token is valid then get user data from private route
      // and send response data from API to state using dispatch
      if (tokenRes.data) {
        try {
          const user = await axios.get(
            "https://edayreminder-app.herokuapp.com/users"
          );
          dispatch({
            type: LOAD_USER,
            payload: user.data,
          });

          const reminders = await axios.get(
            "https://edayreminder-app.herokuapp.com/reminders"
          );
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
            {state.isAuthenticated ? <Redirect to="/dashboard" /> : <Home />}
          </Route>
          <Route path="/login" component={Login} />
          <Route path="/about" component={About} />
          <ProtectedRoute
            isAuthenticated={state.isAuthenticated}
            path="/dashboard"
            component={Dashboard}
          />
          <ProtectedRoute
            isAuthenticated={state.isAuthenticated}
            path="/reminders"
            component={Reminders}
          />
          <ProtectedRoute
            isAuthenticated={state.isAuthenticated}
            path="/create"
            component={NewReminder}
          />

          <ProtectedRoute
            isAuthenticated={state.isAuthenticated}
            path="/feedback"
            component={Feedback}
          />
          <ProtectedRoute
            isAuthenticated={state.isAuthenticated}
            path="/account"
            component={UserAccount}
          />
          <Route path="*" component={() => <h1>404 ERROR</h1>} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
