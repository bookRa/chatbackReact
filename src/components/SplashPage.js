import React from "react";
import "./SplashPage.css";
import FormField from './FormField';
import { Link } from "react-router-dom";
import * as routes from "../constants/routes";

const splashPage = () => {
  return (
  	<main id="splashPage">
        <section className="textContainer">
          {/* 
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
          */}
        	<h2 id="splashHeading">Face life's lows together</h2>
          <Link id="subscribe" className="hiddenLink btn" to={routes.SIGN_UP}>Get Started</Link>
        </section>
        <section className="desc">
          <p>Low? Worried? Overwhelmed?</p>
          <p>
            Get matched with a peer, and be guided by prompts to open up and listen<br/>
            In the end, you'll feel calm and have a next step.
          </p>
        </section>
        <section className="testimonials">
          <h3>What users are saying:</h3>
          <blockquote>
            "I did find myself very much looking forward to the chance 
            to sit down and get in a very real, intimate, deep space 
            with someone."
          </blockquote>
          <blockquote>
            "Chatback really helped me to sort through the different emotions I was going through."
          </blockquote>
          <blockquote>
            "We ended up holding each other accountable. It was kind of like a partnership deal."
          </blockquote>
        </section>
        {/*
          <form>
            <FormField
              type="text"
              label="Enter Email"
              focus={true}
              req={true}
            />
          </form>
        */}
		

		
    </main>
  );
};
//asda
export default splashPage;