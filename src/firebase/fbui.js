// Import FirebaseAuth and firebase.
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import * as routes from '../constants/routes'

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'redirect',
  // Redirect to /account after sign in is successful. 
  signInSuccessUrl: routes.ACCOUNT,
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ]
};

export class SignInScreen extends React.Component {

  // componentDidMount(){
  //   this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
  //     (user) => this.setState({isSignedIn: !!user})
  //   )
  // }

  // componentWillUnmount(){
  //   this.unregisterAuthObserver();
  // }

  render() {
    return (
      <div>
        <h3>OBLAH in with phone </h3>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
      </div>
    );
  }
}