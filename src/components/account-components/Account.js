import React from "react";
import withAuthorization from "../withAuthorization";
import { PasswordChangeForm } from "./PasswordChange";
import "../App.css";
import AuthUserContext from "../AuthUserContext";
import { auth, db } from "../../firebase";
import BioForm from "./BioForm.js";
import { users } from "../../api";
import FormField from "../FormField";

const AccountPage = () => {
  return (
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? (
          <div className="pageWrapper">
            <h2>Account Page for: {authUser.displayName || authUser.email}</h2>
            <h3>Change Username</h3>
            <UserNameForm />
            <h3>Change Password</h3>
            <PasswordChangeForm />
            <BioForm userId={authUser.uid} />
            <APItest userId={authUser.uid} />
            <h4>
              TODO: Make these options dropdown panels; User picture; User
              'about me'
            </h4>
          </div>
        ) : (
          <h2>Loading User...</h2>
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
        <FormField
          type="text"
          value={this.state.newUName}
          onChange={e => {this.setState({ newUName: e.target.value });}}
          label="New Username"
          helper="You can use letters, numbers & symbols"
          req={true}
        />
        <button className="form-button" disabled={this.state.newUName === ""}>Submit Username</button>
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

  testMsg = event => {
    event.preventDefault();
    // console.log("Test Message Poste!...?");
    db.postMsg("Hello World", this.state.userId);
  };

  render() {
    return (
      <div>
        <h3>Test API backend calls:</h3>
        <button value="POST" onClick={this.testPost}>
          POST{" "}
        </button>
        <button value="GET" onClick={this.testMsg}>
          {" "}
          Send a Msg{" "}
        </button>
      </div>
    );
  }
}
const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(AccountPage);
