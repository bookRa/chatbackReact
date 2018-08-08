import React from "react";
import withAuthorization from "../withAuthorization";
import { PasswordChangeForm } from "./PasswordChange";
import "../App.css";
import AuthUserContext from "../AuthUserContext";
import { auth } from "../../firebase";
import BioForm from "./BioForm.js";
import { users } from "../../api";

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
            <BioForm userId={authUser.uid} />
            <APItest userId={authUser.uid} />
            <h3>
              TODO: Make these options dropdown panels; User picture; User
              'about me'
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

class APItest extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userId: this.props.userId };
    console.log(props.userId);
  }
  testPost = event => {
    users
      .testFunc()
      .then(res => console.log(res))
      .catch(e => console.log(e));
  };

  testGet = event => {
    // const { uid } = this.state;
    users
      .testGet(this.state.userId)
      .then(res => console.log(res))
      .catch(e => console.log(e));
  };

  render() {
    return (
      <div>
        <h3>Test API backend calls:</h3>
        {/* <button value="POST" onClick={this.testPost}>
          POST{" "}
        </button> */}
        <button value="GET" onClick={this.testGet}>
          {" "}
          GET{" "}
        </button>
      </div>
    );
  }
}
const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(AccountPage);
