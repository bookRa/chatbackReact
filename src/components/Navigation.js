import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "./SignOut";
import AuthUserContext from "./AuthUserContext";
import * as routes from "../constants/routes";
import "./Navigation.css";

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? <NavigationAuth user={authUser} /> : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = props => (
  <div className="navBar">
    <div className="leftSection">
      <Link to={routes.LANDING}>
        <img alt="CB logo" height="110" src="logo.png" />
      </Link>
    </div>
    <div className="rightSection">
      <ul className="linkList">
        <li>
          <Link className="signBtn" to={routes.HOME}>
            Start a conversation
          </Link>
        </li>
        <li>
          <Link className="signBtn" to={routes.ACCOUNT}>
            {" "}
            My Account
          </Link>
        </li>

        <li>
          <SignOutButton />
        </li>
        <li>signed in as {props.user.displayName}</li>
      </ul>
    </div>
  </div>
);
const NavigationNonAuth = () => (
  <div className="navBar">
    <div className="leftSection">
      <Link to={routes.LANDING}>
        <img alt="CB logo" height="110" src="logo.png" />
      </Link>
    </div>
    <div className="rightSection">
      <ul className="linkList">
        <li>
          <Link className="signBtn" to={routes.SIGN_IN}>
            Sign In{" "}
          </Link>
        </li>
        <li>
          <Link className="signBtn" to={routes.SIGN_UP}>
            Sign Up{" "}
          </Link>
        </li>
      </ul>
    </div>
  </div>
);
export default Navigation;
