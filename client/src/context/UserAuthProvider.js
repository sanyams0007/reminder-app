import React, { useReducer } from "react";
import UserAuthContext from "./UserAuthContext";
import reducer from "./reducer";

const UserAuthProvider = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    user: null,
    isAuthenticated: false,
    reminders: [],
    currentId: null,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserAuthContext.Provider value={{ state, dispatch }}>
      {props.children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthProvider;
