import React from "react";
import "./Home.css";
import "./App.css";
import "./Navigation.css";

// import withAuthorization from "./withAuthorization";
import withAuthorization from "./withAuthorization";

import { Link } from "react-router-dom";
import AuthUserContext from "./AuthUserContext";
import { db } from "../firebase";
import * as routes from "../constants/routes";

const HomePage = () => {
  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <div className="pageWrapper">
          <div className="textContainer">
            {authUser ? (
              <h2>Hello, {authUser.displayName}!</h2>
            ) : (
              <h2>Hello!</h2>
            )}
            <h3>This is the "Chat Lobby"</h3>
            <h4>
              We can ask here, "How are you feeling?" and begin connecting you to
              a partner
            </h4>
            <h4>
              TODO: Collect pre-chat data, logging, create button and business
              logic to 'start chat' (matching, etc.)
            </h4>
          </div>
          <ActiveUserList />
          <button id="enterChat">
            <Link id="enterChatInner" className="signBtn" to={routes.CHAT}>
              Enter Chat
            </Link>{" "}
          </button>
          {/*TODO: This will be an auto-redirect when two users are matched*/}
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

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(HomePage);
/* (authCondition) */
//TODO: Username is not getting picked up directly after a new user is created.  A refresh is needed for username to display in Active Users and the "signed in as ..." note. Can probably fix by explicitly setting the authstate.user.displayname.
