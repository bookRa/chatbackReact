import React from "react";
import "./Home.css";
import "./App.css";
import "./Navigation.css";

// import withAuthorization from "./withAuthorization";
import withAuthorization from "./withAuthorization";

import { Link, Redirect } from "react-router-dom";
import AuthUserContext from "./AuthUserContext";
import { db } from "../firebase";
import * as routes from "../constants/routes";
import { convo } from "../api";
import Chat from "./Chat";

const HomePage = ({ match }) => {
  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <div className="pageWrapper">
          {authUser ? (
            <h1>Hello, {authUser.displayName}!</h1>
          ) : (
            <h1>"Hello!"}</h1>
          )}
          <h2>This is the "Chat Lobby"</h2>
          <h3>
            We can ask here, "How are you feeling?" and begin connecting you to
            a partner
          </h3>
          <h3>
            TODO: Collect pre-chat data, logging, create button and business
            logic to 'start chat' (matching, etc.)
          </h3>
          <ActiveUserList />
          <button id="enterChat">
            <Link
              id="enterChatInner"
              className="signBtn"
              to={{
                pathname: routes.CHAT,
                state: { convoId: "dev_chat_02" }
              }}
            >
              Enter Chat
            </Link>{" "}
          </button>
          <br />
          <NewConvo />
          <SpecificConvo />
        </div>
      )}
    </AuthUserContext.Consumer>
    // <div>
    //   <h1>Home Page</h1>
    //   <p>The Home Page is accessible by every signedin User</p>
    // </div>
  );
};

class ActiveUserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeUsers: []
    };
  }
  //takes the snapshot from db.showActiveUsers and turns it to an array in our current state
  displayUsers = snapshot => {
    let newActive = [];
    // console.log(snapshot);
    // snapshot.forEach(user => {
    //   newActive.push(user.name);
    // });
    for (let user in snapshot) {
      // console.log(user, snapshot[user].name);
      newActive.push(snapshot[user].name);
    }
    // console.log(newActive);
    this.setState({ activeUsers: newActive });
  };
  componentDidMount() {
    db.showActiveUsers(this.displayUsers);
  }
  render() {
    return (
      <div className="activeUserList">
        <h3>Active Users (for demo use only)</h3>
        <ul>
          {this.state.activeUsers.map(user => {
            return <li key={user + "_li"}>{user}</li>;
          })}
          {/* {this.state.activeUsers} */}
        </ul>
      </div>
    );
  }
}

class NewConvo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gotId: false
    };
  }

  goToConvo = () => {
    this.setState({ gotId: "fetching" });

    // console.log(this.state.gotId);
    convo
      .getConvoId() //.then(res => console.log(res));
      .then(res => {
        console.log("got response:");
        console.log(res);
        console.log("got convo ID: " + res.data.conversation);
        this.setState({ gotId: res.data.conversation });
      });
  };

  render() {
    if (this.state.gotId == "fetching") {
      return <p> Working on Matching...</p>;
    } else if (this.state.gotId) {
      return (
        <Redirect
          to={{
            pathname: "/chat", //routes.CHAT,
            state: { convoId: this.state.gotId }
            // render= {(props) => <Chat {...props} convo= {this.state.gotId} />}
          }}
        />
      );
    }
    return (
      <div>
        <button className="signBtn" onClick={this.goToConvo}>
          Start Convo
        </button>
      </div>
    );
  }
}

class SpecificConvo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      convoId: undefined
    };
  }

  render() {
    return (
      <div>
        <h4>Or enter a specific chat ID</h4>
        <input
          type="text"
          placeholder="enter convoID"
          onChange={e => this.setState({ convoId: e.target.value })}
        />
        {/* <button id="enterSpecificChat"> */}
        <Link
          id="enterSpecificChatInner"
          className="signBtn"
          to={{
            pathname: routes.CHAT,
            state: { convoId: this.state.convoId }
          }}
        >
          Enter Chat
        </Link>
        {/* </button> */}
      </div>
    );
  }
}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(HomePage);
/* (authCondition) */
//TODO: Username is not getting picked up directly after a new user is created.  A refresh is needed for username to display in Active Users and the "signed in as ..." note. Can probably fix by explicitly setting the authstate.user.displayname.
