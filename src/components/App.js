import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import withAuthentication from "./withAuthentication";

import Navigation from "./Navigation";
import LandingPage from "./Landing";
import SignUpPage from "./SignUp";
import SignInPage from "./SignIn";
import PasswordForgetPage from "./PasswordForget";
import HomePage from "./Home";
import AccountPage from "./Account";

import * as routes from "../constants/routes";
import { firebase } from "../firebase";

const App = () => (
  <Router>
    <div>
      <Navigation />

      <hr />

      <Route exact path={routes.LANDING} component={() => <LandingPage />} />
      <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
      <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
      <Route
        exact
        path={routes.PASSWORD_FORGET}
        component={() => <PasswordForgetPage />}
      />
      <Route exact path={routes.HOME} component={() => <HomePage />} />
      <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
    </div>
  </Router>
);

export default withAuthentication(App);
