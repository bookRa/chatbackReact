import React from "react";
import { Button } from 'react-bootstrap';

const splashPage = () => {
  return (
  	<div id="splashPage">
      	<h1>Chatback</h1>
      	<div id="color-bar">
      		<div className="color-box" id="color-box-1"></div>
      		<div className="color-box" id="color-box-2"></div>
      		<div className="color-box" id="color-box-3"></div>
      		<div className="color-box" id="color-box-4"></div>
      		<div className="color-box" id="color-box-5"></div>
      		<div className="color-box" id="color-box-6"></div>
      	</div>
      	<h2>One-on-one guided chats for genuine moments with others like you.</h2>
      	<p>Get relief and gain valuable insights when you need it, wherever you need it.</p>
		<form>
		    <div className="group">      
		      <input type="text" required />
		      <span className="highlight"></span>
		      <span className="bar"></span>
		      <label>enter email</label>
		    </div>
		  </form>
		<Button id="subscribe">Subscribe</Button>
    </div>
  );
};

export default splashPage;