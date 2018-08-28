import React from "react";
import { auth } from "../firebase";
import { withRouter } from "react-router-dom";
import * as routes from "../constants/routes";

const SignOutButton = (props) => {
  return (
    <span
    	id="signOut"
		className="menu-item"
		onClick={() => {
			console.log("You are ")
			console.log(props.user)
			auth.doSignOut().then(()=>{
				console.log('Youre signed out?')
				props.history.push(routes.LANDING);
			})
		}}
    >Sign out</span>
  );
};

export default withRouter(SignOutButton);
