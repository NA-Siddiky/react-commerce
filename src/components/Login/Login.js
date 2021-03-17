import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.conf';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

function Login() {
    const [newUser, setNewUser] = useState(false);

    const [user, setUser] = useState({
        isSignedIn: false,
        newUser: false,
        name: '',
        email: '',
        password: '',
        photoURL: '',
        error: '',
        success: false,
    });

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };


    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    const handleSignIn = () => {
        // console.log('singing successful');
        firebase
            .auth()
            .signInWithPopup(googleProvider)
            .then(result => {
                const { displayName, photoURL, email } = result.user;
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL,
                };
                setUser(signedInUser);
                console.log(displayName, email, photoURL);
            })
            .catch(err => {
                console.log(err);
                console.log(err.message);
            });
    };

    const handleFBSignIn = () => {
        firebase
            .auth()
            .signInWithPopup(fbProvider)
            .then((result) => {
                var credential = result.credential;
                var user = result.user;
                var accessToken = credential.accessToken;
                console.log('FB User', user);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
            });
    }

    const handleSignOut = () => {
        // console.log("SignOut");
        firebase.auth().signOut()
            .then(response => {
                const signedOutUser = {
                    isSignedIn: false,
                    name: '',
                    email: '',
                    photo: '',
                };
                setUser(signedOutUser);
            })
            .catch(err => {

            });
    };

    const handleBlur = (e) => {
        // debugger;
        // console.log(e.target.name, e.target.value);
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
            // console.log(validEmail);
        }
        if (e.target.name === 'password') {
            const validPassword = e.target.value.length > 4;
            const validPasswordNumber = /\d{1}/.test(e.target.value);
            isFieldValid = validPassword && validPasswordNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    };

    const handleSubmit = (e) => {
        // console.log(user.email, user.password);
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((response) => {
                    // console.log(response);
                    const newUserInfo = { ...user }
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    updateUserInfo(user.name);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }

        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((response) => {
                    // console.log(response);
                    const newUserInfo = { ...user }
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                    console.log('sign in user info', response.user);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }
        e.preventDefault();
    };

    const updateUserInfo = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name,
        })
            .then(function () {
                console.log('Update successful');
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Test</h1>
            {
                user.isSignedIn
                    ? <button onClick={() => handleSignOut()}> Sign Out</button>
                    : <button onClick={() => handleSignIn()}>Sign in</button>
            }
            <br />
            <button onClick={handleFBSignIn}> Using Facebook Login</button>
            {
                user.isSignedIn &&
                <div>
                    <p> Welcome, {user.name}</p>
                    <p>Your Email: {user.email}</p>
                    <img src={user.photo} alt="" />
                </div>
            }

            <h1>Our Own Authentication</h1>
            {/* <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Password: {user.password}</p> */}

            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
            <level htmlFor="newUser" > New UserSign UP</level>

            <form onSubmit={handleSubmit}>
                {
                    newUser &&
                    <input name="name" type="text" onBlur={handleBlur} placeholder="Your Name" required />
                }
                <br />
                <input type="text" name="email" onBlur={handleBlur} placeholder="Enter your email address" required />
                <br />
                <input type="password" name="password" onBlur={handleBlur} placeholder="Enter your password" required />
                <br />
                <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
            </form>

            <p style={{ color: 'red' }}>{user.error}</p>
            {
                user.success &&
                <p style={{ color: 'green' }}>User {newUser ? 'Created' : 'Logged In'} Successfully.</p>
            }
        </div>
    );
}

export default Login;