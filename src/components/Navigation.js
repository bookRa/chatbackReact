import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "./SignOut";
import AuthUserContext from "./AuthUserContext";
import * as routes from "../constants/routes";
import "./Navigation.css";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faBars } from '@fortawesome/free-solid-svg-icons';

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
        <img alt="CB logo" className="logo" src="logo.png" />
      </Link>
    </div>
    <Link to={routes.LANDING}>
      <span className="big-title">Chatback</span>
    </Link>
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
        <li id="signedIn">signed in as {props.user.displayName}</li>
      </ul>
    </div>
  </div>
);
const NavigationNonAuth = () => (
  <div className="navBar">
    <div className="leftSection">
      <Link to={routes.LANDING}>
        <img className="logo" alt="CB logo" src="logo.png" />
      </Link>
    </div>
    <Link to={routes.LANDING}>
      <span className="big-title">Chatback</span>
    </Link>
    <div id="rightSection" className="rightSection">
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
