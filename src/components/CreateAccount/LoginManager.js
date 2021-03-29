import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './FireBaseConfig';


export const initializeFirebase = () => {
    if(firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}


export const createAccountAndLogin = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res => {
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        newUserInfo.isSignUp = true;
        updateUserName(name);
        return newUserInfo;
    })
    .catch((error) => {
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
    });
}


const updateUserName = name => {
    const user = firebase.auth().currentUser;
        user.updateProfile({
        displayName: name
        }).then(() =>{
            console.log('user name update successfully');
        }).catch((error) =>{
            console.log(error);
        });
}







