// Import FirebaseAuth and firebase.
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import * as routes from '../constants/routes'
import {  } from "react";
// Configure FirebaseUI.


export class SignInScreen extends React.Component {
  constructor(props){
    super(props)
    this.uiConfig = {
      // Popup signin flow rather than redirect flow.
      signInFlow: 'popup',
      // Redirect to /account after sign in is successful. 
      signInSuccessUrl: routes.ACCOUNT,
      callbacks:{
        signInSuccessWithAuthResult: (authResult) =>{
        console.log("wtf", authResult)
        props.history.push(routes.HOME)
      }
    },
      // We will display Email and Phone as auth providers.
      signInOptions: [
        // firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: '/account'
    };
  }


  componentDidMount(){
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      (user) => this.setState({isSignedIn: !!user})
    )
  }

  componentWillUnmount(){
    this.unregisterAuthObserver();
  }

  render() {
    const {history} = this.props; 
    return (
      <div>
        <h3>Or Sign in with a phone number </h3>
        <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
      </div>
    );
  }
}

// Todo: Implement this on the Signup Screen. Unify the two.