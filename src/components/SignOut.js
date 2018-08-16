import React from "react";
import { auth } from "../firebase";
import { withRouter } from "react-router-dom";
import * as routes from "../constants/routes";

const SignOutButton = ({ history }) => {
  return (
    <button
		className="menu-item"
		onClick={() => {
			auth.doSignOut();
			history.push(routes.LANDING);
		}}
    >Sign Out</button>
  );
};

export default withRouter(SignOutButton);
