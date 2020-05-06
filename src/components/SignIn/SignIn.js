import React from 'react';
import firebase from '../../shared/firebase.js';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import logo from './logo.jpeg';
import '../../styles/SignIn.css';

const db = firebase.database().ref();

const SignInPage = () => {
    const nextUser = (data, uid, gid) => {
        if (gid === "personal" || !data.groups[gid].members.includes(uid)) {
            return uid
        }
        const currentIndex = data.groups[gid].members.indexOf(uid) + 1
        return data.groups[gid].members[currentIndex === data.groups[gid].members.length ? 0 : currentIndex]
    }
    const uiConfig = {
        signInFlow: 'popup',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccessWithAuthResult: (result) => {
                // update user record in database whenever the user signs in
                db.child("users").child(`${result.user.uid}`)
                    .update({
                        displayName: result.user.displayName,
                        email: result.user.email
                    })
                    .catch(error => alert(error));
                db.once('value').then(snapshot => {
                    const data = snapshot.val();
                    Object.entries(data.chores).forEach(([cid, chore]) => {
                        const today = new Date();
                        const dd = new Date(chore.dueDate);
                        if (dd < today && chore.status === "complete") {
                            const newDay = new Date();
                            switch (chore.recursion) {
                                case "daily":                         
                                    newDay.setDate(dd.getDate() + 1);
                                    break;
                                case "weekly":
                                    newDay.setDate(dd.getDate() + 7);
                                    break;
                                case "biweekly":
                                    newDay.setDate(dd.getDate() + 14);
                                    break;
                                case "monthly":
                                    newDay.setDate(dd.getDate() + 28);
                                    break;
                                case "none":
                                    return;
                            }
                            newDay.setHours(23);
                            newDay.setMinutes(59);
                            db.child('chores').child(cid).update({
                                status: "incomplete",
                                dueDate: newDay.toString(),
                                dateCompleted: null,
                                uid: chore.rotate ? nextUser(data, chore.uid, chore.gid) : chore.uid
                            })
                        }
                    })
                });


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
