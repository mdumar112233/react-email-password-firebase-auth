import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { UserContext } from '../../App';
import { initializeFirebase } from '../CreateAccount/LoginManager';
import firebase from "firebase/app";
import "firebase/auth";

const Login = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/" } };


    initializeFirebase();
    const [user, setUser] = useState({
        email: '',
        password: ''
    });



    const handleChange = e => {
        let  isInputValid;
        if(e.target.name === 'email'){
            isInputValid = /\S+@\S+\.\S+/.test(e.target.value);

        }
        if(e.target.name === 'password'){
            isInputValid = e.target.value.length > 6;
        }
        if(isInputValid){
            const newUserInfo = {...user};
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }


    const handleSubmit = (e) => {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(() => {
                const newUserInfo = {...user};
                newUserInfo.error = '';
                newUserInfo.success = true;
                setLoggedInUser(newUserInfo);
                history.replace(from);
                setUser(newUserInfo);
            })
            .catch((error) => {
                const newUserInfo = {...user};
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo);
            });
            e.preventDefault();
         }
    return (
        <div>
             <form onSubmit={handleSubmit}>
                <input onBlur={handleChange} name='email' type="text" placeholder='your email' required/><br/><br/>
                <input onBlur={handleChange}  type="password" name='password' placeholder='your password' required /><br/><br/>
                <p style={{color:'red'}}>{user.error}</p>
                {
                    user.success && <p style={{color:'green'}}>user login successfully</p>
                }
                <input type="submit" value="login"/>
            </form>
            <h3>This is login</h3>
        </div>
    );
};

export default Login;