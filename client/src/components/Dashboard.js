import React, { useContext, useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { UNSET_ID } from "../context/reducer";
import UserAuthContext from "../context/UserAuthContext";
import "./Dashboard.css";

const Dashboard = () => {
  const { dispatch } = useContext(UserAuthContext);
  const history = useHistory();
  //const [currentId, setCurrentId] = useState(null)
  useEffect(() => {
    dispatch({
      type: UNSET_ID,
    });
  }, [dispatch]);

  return (
    <div className="dashboard">
      <div className="container">
        <div className="greet">Welcome</div>
        <div onClick={() => history.push("/create")} className="box">
          <div className="content">
            <h2>Want to create a new reminder</h2>
          </div>
        </div>
        <div onClick={() => history.push("/reminders")} className="box">
          <div className="content">
            <h2>Don't know your reminders</h2>
          </div>
        </div>
        <div onClick={() => history.push("/feedback")} className="box">
          <div className="content">
            <h2>Write to us </h2>
          </div>
        </div>
        <div onClick={() => history.push("/account")} className="box">
          <div className="content">
            <h2>Your Account</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

/* export default Dashboard; */
export default withRouter(Dashboard);
