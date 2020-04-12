import React, {useState, useEffect} from 'react';
import firebase from '../../shared/firebase.js';
import {Button, Container, Typography} from '@material-ui/core';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import logo from './logo.jpeg';


const SignInPage = () => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        firebase.auth().onAuthStateChanged(setUser);
      }, []);
    return(
        <Container flexDirection='row'>
            <div flexDirection = 'row' style={{display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems:'center'}}>
                <Typography variant='h2' flex='1'>ChoreWeek</Typography>
                <img width='20%' src={logo} className="App-logo" alt="logo" style={{padding: 50}}/>
                <SignIn flex = '1'/>
            </div>
        </Container>
    )
}

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

// const Welcome = ({ user }) => (
//     <Message color="info">
//         <Message.Header>
//         Welcome, {user.displayName}
//         <Button primary onClick={() => firebase.auth().signOut()}>
//             Log out
//         </Button>
//         </Message.Header>
//     </Message>
// );

export default SignInPage;