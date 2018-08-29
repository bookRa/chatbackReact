import React from "react";
import "./SplashPage.css";
import FormField from './FormField';

const splashPage = () => {
  return (
  	<div id="splashPage">
        <div className="textContainer">
        	<h2>Chatback</h2>
        	<div id="color-bar">
        		<div className="color-box" id="color-box-1"></div>
        		<div className="color-box" id="color-box-2"></div>
        		<div className="color-box" id="color-box-3"></div>
        		<div className="color-box" id="color-box-4"></div>
        		<div className="color-box" id="color-box-5"></div>
        		<div className="color-box" id="color-box-6"></div>
        	</div>
          <h3>One-on-one guided chats for genuine moments with others like you</h3>
          <p>Get relief and gain valuable insights when you need it, wherever you need it</p>
        </div>
		<form>
      <FormField
        type="text"
        label="Enter Email"
        focus={true}
        req={true}
      />
	  </form>

		<button id="subscribe" className="general-button">Subscribe</button>
    </div>
  );
};
//asda
export default splashPage;