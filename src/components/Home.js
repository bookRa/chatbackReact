import React from "react";
import "./Home.css";
import "./App.css";
import "./Navigation.css";
import { Link } from "react-router-dom";
import AuthUserContext from "./AuthUserContext";
import { db } from "../firebase";
import * as routes from "../constants/routes";

const HomePage = () => {
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
          <Link className="signBtn" to={routes.CHAT}>
            Enter Chat
          </Link>
        </div>
      )}
    </AuthUserContext.Consumer>
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

export default HomePage;

//TODO: Username is not getting picked up directly after a new user is created.  A refresh is needed for username to display in Active Users and the "signed in as ..." note. Can probably fix by explicitly setting the authstate.user.displayname.
