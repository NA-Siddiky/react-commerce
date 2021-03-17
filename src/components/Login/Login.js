import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { initializeLoginFramework, handleGoogleSignIn, handleFBSignIn, handleSignOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './loginManager'

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

    initializeLoginFramework();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(response => {
                setUser(response);
                setLoggedInUser(response);
                history.replace(from);
            })
    }

    const fbSignIn = () => {
        handleFBSignIn()
            .then(response => {
                setUser(response);
                setLoggedInUser(response);
                history.replace(from);
            })
    }

    const signOut = () => {
        handleSignOut()
            .then(response => {
                setUser(response);
                setLoggedInUser(response);
            })
    }

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
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(response => {
                    setUser(response);
                    setLoggedInUser(response);
                    history.replace(from);
                })
        }

        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(response => {
                    setUser(response);
                    setLoggedInUser(response);
                    history.replace(from);
                })
        }
        e.preventDefault();
    };


    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Test</h1>
            {
                user.isSignedIn
                    ? <button onClick={() => signOut()}> Sign Out</button>
                    : <button onClick={() => googleSignIn()}>Sign in</button>
            }
            <br />
            <button onClick={fbSignIn}> Using Facebook Login</button>
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