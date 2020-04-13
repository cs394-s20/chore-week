import React from 'react';
import firebase from '../../shared/firebase.js';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import logo from './logo.jpeg';
import '../../styles/SignIn.css';

const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    callbacks: {
        signInSuccessWithAuthResult: () => false
    }
};

const SignIn = () => (
    <StyledFirebaseAuth
        uiConfig={uiConfig}
        firebaseAuth={firebase.auth()}
    />
);

const SignInPage = () => {
    return (
        <div className="PositionWrap">
            <div className="SignInWrapper">
                <div className="AppName">ChoreWeek</div>
                <div className="LogoWrap">
                    <img src={logo} className="App-logo" alt="logo"/>
                </div>
                <SignIn/>
            </div>
        </div>
    );
};

export default SignInPage;
