import React, { Component } from "react";
import "./Landing.css";

const LandingPage = () => {
  return (
    <div className="pageWrapper">
      <h1>Welcome to Chatback! </h1>
      <h2>TODO: Beautiful Landing Page:</h2>
      <h3>A nicely designed explanation of chatback, and how it works</h3>
      <h3>Call to action: Sign Up today and get chatting</h3>
      <Apitest />
    </div>
  );
};

class Apitest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiCall: "",
      msgid: 1
    };
  }
  handleClick = () => {
    fetch(
      "https://test-chatback-fullstack-api.herokuapp.com/chat?index=" +
        this.state.msgid,
      {
        method: "GET",
        mode: "cors",
        headers: {
          Accept: "application/json"
        }
      }
    ).then(response => {
      response.json().then(json => {
        console.log(json);
        this.setState({ apiCall: JSON.stringify(json) });
      });
    });
  };
  render() {
    return (
      <div className="apiTest">
        <h2>Test Chatback API</h2>
        <button onClick={this.handleClick}>Click to get API response</button>
        <span>
          {" "}
          enter the id:{" "}
          <input
            type="number"
            onChange={e => this.setState({ msgid: e.target.value })}
          />
        </span>
        <p>Response: </p>
        <p>{this.state.apiCall}</p>
      </div>
    );
  }
}

export default LandingPage;
