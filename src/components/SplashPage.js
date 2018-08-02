import React from "react";

const splashPage = () => {
  return (
  	<div id="splashPage">
      	<h1>Chatback</h1>
      	<h2>One-on-one guided chats for genuine moments with others like you.</h2>
      	<p>Get relief and gain valuable insights when you need it, wherever you need it.</p>
		<form>
		  <input id="email-form" type="text" name="email" placeholder="enter email" />
		</form>
		<button id="subscribe" className="btn">Subscribe</button>
    </div>
  );
};

export default splashPage;