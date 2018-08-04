import React from "react";
import withAuthorization from "./withAuthorization";
import { PasswordChangeForm } from "./PasswordChange";
import "./App.css";
import AuthUserContext from "./AuthUserContext";
import { auth } from "../firebase";

const AccountPage = () => {
  return (
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? (
          <div className="pageWrapper">
            <h1>Account Page for: {authUser.displayName || authUser.email}</h1>
            <h2>Change Username</h2>
            <UserNameForm />
            <h2>Change Password</h2>
            <PasswordChangeForm />
            <h3>
              TODO: Make these options dropdown panels; User picture; User
              'preferences'; User 'about me'
            </h3>
          </div>
        ) : (
          <h1>Loading User</h1>
        )
      }
    </AuthUserContext.Consumer>
  );
};

class UserNameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newUName: "",
      statusUpdate: ""
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    auth
      .doUpdateProfile({
        displayName: this.state.newUName
      })
      .then(() => {
        this.setState({
          newUName: "",
          statusUpdate: "Username changed successfully!"
        });
        // console.log("username Changed!");
      })
      .catch(e => {
        this.setState({ statusUpdate: "There was an error" + e.message });
        console.log("error: " + e);
      });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <p className="statusUpdate">{this.state.statusUpdate}</p>
        <input
          value={this.state.newUName}
          type="text"
          placeholder="new Username"
          onChange={e => {
            this.setState({ newUName: e.target.value });
          }}
        />
        <button disabled={this.state.newUName === ""}>Submit</button>
      </form>
    );
  }
}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(AccountPage);
