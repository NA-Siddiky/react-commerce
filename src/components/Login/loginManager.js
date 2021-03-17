import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.conf';

export const initializeLoginFramework = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}

export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    // console.log('singing successful');
    return firebase.auth().signInWithPopup(googleProvider)
        .then(result => {
            const { displayName, photoURL, email } = result.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
            };
            return signedInUser;
        })
        .catch(err => {
            console.log(err);
            console.log(err.message);
        });
};

export const handleFBSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider)
        .then((result) => {
            var credential = result.credential;
            var accessToken = credential.accessToken;
            var user = result.user;
            return user;
            // console.log('FB User', user);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
        });
};

export const handleSignOut = () => {
    // console.log("SignOut");
    return firebase.auth().signOut()
        .then(response => {
            const signedOutUser = {
                isSignedIn: false,
                name: '',
                email: '',
                photo: '',
            };
            return signedOutUser;
        })
        .catch(err => {

        });
};


// export const createUserWithEmailAndPassword = () => {
//     firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
//         .then((response) => {
//             // console.log(response);
//             const newUserInfo = { ...user }
//             newUserInfo.error = '';
//             newUserInfo.success = true;
//             setUser(newUserInfo);
//             updateUserInfo(user.name);
//         })
//         .catch((error) => {
//             const newUserInfo = { ...user };
//             newUserInfo.error = error.message;
//             newUserInfo.success = false;
//             setUser(newUserInfo);
//         });
// }

// export const signInWithEmailAndPassword = () => {
//     firebase.auth().signInWithEmailAndPassword(user.email, user.password)
//         .then((response) => {
//             // console.log(response);
//             const newUserInfo = { ...user }
//             newUserInfo.error = '';
//             newUserInfo.success = true;
//             setUser(newUserInfo);
//             setLoggedInUser(newUserInfo);
//             history.replace(from);
//             console.log('sign in user info', response.user);
//         })
//         .catch((error) => {
//             const newUserInfo = { ...user };
//             newUserInfo.error = error.message;
//             newUserInfo.success = false;
//             setUser(newUserInfo);
//         });
// }

// const updateUserInfo = name => {
//     const user = firebase.auth().currentUser;

//     user.updateProfile({
//         displayName: name,
//     })
//         .then(function () {
//             console.log('Update successful');
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// };
