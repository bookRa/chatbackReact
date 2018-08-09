import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { auth } from "../firebase";
import { SignInLink } from "./SignIn";
import { users } from "../api";
import "./App.css";

import * as routes from "../constants/routes";

const SignUpPage = ({ history }) => {
  return (
    <div className="pageWrapper">
      <h1>Sign Up Page</h1>
      <SignUpForm history={history} />
      <SignInLink />
    </div>
  );
};

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = event => {
    event.preventDefault();
    const { username, email, passwordOne } = this.state;
    const { history } = this.props;
    let tempUID;
    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        tempUID = authUser.user.uid;
        console.log("added to fb: uid " + tempUID);
        auth
          .doUpdateProfile({
            displayName: username
          })
          .then(() => console.log("profile updated with: " + username))
          .catch(e => console.log("problem with username: " + e));
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState({ error: error });
      });
    // From here, create user to serve to JAVA API
    let userObj = {
      id: Math.ceil(Math.random() * 100),
      gender: "Female",
      preferredGenderOfPartner: "Female",
      age: 100,
      username: username,
      uid: tempUID
    };
    users
      .testFunc(userObj)
      .then(res => console.log(res))
      .catch(error => console.log(error));
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";

    return (
      <form onSubmit={this.onSubmit}>
        <div className="group">      
          <input
            value={username}
            onChange={event => this.setState({ username: event.target.value })}
            type="text"
            required
          />
          <span className="highlight"></span>
          <span className="bar"></span>
          <label className="form-label">Choose a Display Name</label>
        </div>
        <div className="group">      
          <input
            value={email}
            onChange={event => this.setState({ email: event.target.value })}
            type="text"
            required
          />
          <span className="highlight"></span>
          <span className="bar"></span>
          <label className="form-label">Email Address</label>
        </div>
        <div className="group">      
          <input
            value={passwordOne}
            onChange={event => this.setState({ passwordOne: event.target.value })}
            type="password"
            required
          />
          <span className="highlight"></span>
          <span className="bar"></span>
          <label className="form-label">Password</label>
        </div>
        <div className="group">      
          <input
            value={passwordTwo}
            onChange={event => this.setState({ passwordTwo: event.target.value })}
            type="password"
            required
          />
          <span className="highlight"></span>
          <span className="bar"></span>
          <label className="form-label">Confirm Password</label>
        </div>
        
        
        
        
        <button className="form-button" disabled={isInvalid} type="submit">
          Sign Up
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => {
  return (
    <p>
      Don't have an account?
      {"  "}
      <Link to={routes.SIGN_UP}> Sign Up </Link>
    </p>
  );
};

export default withRouter(SignUpPage);

export { SignUpForm, SignUpLink };
