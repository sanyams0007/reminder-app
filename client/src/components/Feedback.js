import React, { useEffect, useState } from "react";
import "./Feedback.css";
import { withRouter } from "react-router-dom";
import axios from "axios";

const Feedback = () => {
  const [old, setOld] = useState(false);
  const [feedback, setFeedback] = useState({
    name: "",
    vote: "",
    message: "",
  });

  const onChange = (e) => {
    setFeedback({
      ...feedback,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("feedback", feedback);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const getFeedback = async () => {
      try {
        let oldFeedback = await axios.get("feedback");
        //console.log(oldFeedback);
        if (oldFeedback?.data === null) {
          setFeedback({
            name: "",
            vote: "",
            message: "",
          });
        } else {
          setOld(true);
        }
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getFeedback();
  }, []);

  return (
    <div className="feedback">
      <div className="form-container">
        {old ? (
          <header>
            <h2 id="title">Feedback Form </h2>
            <p id="description">
              <em>already submiited feedback</em>
            </p>
          </header>
        ) : (
          <>
            <header>
              <h2 id="title">Feedback Form </h2>
              <p id="description">
                <em>
                  Thank you for taking the time to help us improve the app
                </em>
              </p>
            </header>
            <form className="survey-form" onSubmit={onSubmit}>
              <div className="qa">
                <label htmlFor="name" className="question">
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  className="answer"
                  required
                  placeholder="Enter your name"
                  onChange={onChange}
                  value={feedback.name}
                />
              </div>
              <div className="qa">
                <label className="question">
                  Would you recommend our app to a friend ?
                </label>
                <div className="radio_options answer">
                  <div className="radio_option">
                    <input
                      type="radio"
                      name="vote"
                      value="Definitely"
                      onChange={onChange}
                    />
                    <label className="radio-options" htmlFor="op-one">
                      Definitely
                    </label>
                  </div>
                  <div className="radio_option">
                    <input
                      type="radio"
                      name="vote"
                      value="Not sure"
                      onChange={onChange}
                    />
                    <label className="radio-options" htmlFor="op-two">
                      Not sure
                    </label>
                  </div>
                  <div className="radio_option">
                    <input
                      type="radio"
                      id="op-three"
                      name="vote"
                      value="Maybe"
                      onChange={onChange}
                    />
                    <label className="radio-options" htmlFor="op-one">
                      Maybe
                    </label>
                  </div>
                </div>
              </div>

              <div className="qa">
                <label id="comments" className="question">
                  How was your experience using the app ?
                </label>
                <textarea
                  name="message"
                  rows="10"
                  className="answer"
                  id="text-area"
                  placeholder="Enter your comments here..."
                  onChange={onChange}
                  value={feedback.message}
                ></textarea>
              </div>
              <div className="qa">
                <button type="submit" className="submit answer">
                  Submit
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default withRouter(Feedback);
