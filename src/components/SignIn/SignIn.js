import React, {useEffect, useState} from 'react';
import firebase from '../../shared/firebase.js';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import logo from './logo.jpeg';
import '../../styles/SignIn.css';

const db = firebase.database().ref();

const addUsers = (data) => {
    return Object.entries(data.users).map(entry => entry[0]);
};

const SignInPage = () => {
    const [users, setUsers] = useState([]);

    const uiConfig = {
        signInFlow: 'popup',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccessWithAuthResult: (result) => {
                const uid = result.user.uid;
                const exist = users.some(user => user === uid);
                db.child("idToUser").child(`${uid}`).update({
                    displayName: result.user.displayName,
                    email: result.user.email
                })
                if (!exist) {
                    console.log(`adding ${uid}`);
                    db.child("users").child(`${uid}`).set({
                        ignoreThisChore: {
                            name: 'not a chore',
                            dueDate: Date.now().toString()
                        }
                    }).catch(error => alert(error));
                }
                return false;
            }
        }
    };

    const SignIn = () => (
        <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
        />
    );

    useEffect(() => {
            const handleData = snap => {
                if (snap.val()) setUsers(addUsers(snap.val()));
            };

            db.on('value', handleData, error => alert(error));
            return () => {
                db.off('value', handleData);
            };
        },
        [
        ]);

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
