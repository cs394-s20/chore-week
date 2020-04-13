import React from 'react';
import firebase from '../../shared/firebase.js';
import { Container, Typography } from '@material-ui/core';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import logo from './logo.jpeg';

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
        <Container flexDirection='row'>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems:'center'}}>
                <Typography variant='h2' flex='1'>ChoreWeek</Typography>
                <img width='20%' src={logo} className="App-logo" alt="logo" style={{padding: 50}}/>
                <SignIn flex='1'/>
            </div>
        </Container>
    );
};

export default SignInPage;