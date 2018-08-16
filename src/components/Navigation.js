import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "./SignOut";
import AuthUserContext from "./AuthUserContext";
import * as routes from "../constants/routes";
import "./Navigation.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

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
      <div class="dropdown">
        <FontAwesomeIcon id="hamburger" icon={faBars} className="dropdown"  />
        <div className="dropdown-content">
          <span id="signedIn" className="menu-item">signed in as {props.user.displayName}</span>
          <Link className="menu-item" to={routes.HOME}>
            Start a conversation
          </Link>
          <Link className="menu-item" to={routes.ACCOUNT}>
            {" "}
            My Account
          </Link>
          <SignOutButton />  
        </div>
      </div>
      
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
