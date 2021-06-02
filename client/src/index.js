import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import UserAuthProvider from "./context/UserAuthProvider";

ReactDOM.render(
  <React.StrictMode>
    <UserAuthProvider>
      <App />
    </UserAuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
