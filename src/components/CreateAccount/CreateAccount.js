import React, { useContext, useState } from 'react';
import './CreateAccount.css';
import { Redirect, useHistory } from 'react-router';
import { createAccountAndLogin, initializeFirebase } from './LoginManager';
import { UserContext } from '../../App';



const CreateAccount = () => {
    const [user, setUser] = useState({
        isSignUp: false,
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    })




    initializeFirebase();


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
    
    const handleSubmit = e => {
        if(user.email && user.password){
            createAccountAndLogin(user.name,user.email, user.password)
            .then(res => {
                setUser(res);
            })
        }
        e.preventDefault();
    }




    console.log(user.success);
    return (
        <div className='main'>
            <p>name: {user.name}</p>
            <p>email: {user.email}</p>
            <p>pass: {user.password}</p>
            <form onSubmit={handleSubmit}>
                <input type="text" onBlur={handleChange} name='name' placeholder='your name' required /><br/><br/>
                <input onBlur={handleChange} name='email' type="text" placeholder='your email' required/><br/><br/>
                <input onBlur={handleChange}  type="password" name='password' placeholder='your password' required /><br/><br/>
                <p style={{color:'red'}}>{user.error}</p>
                {
                    user.success && <p style={{color:'green'}}>user create successfully</p>
                }
                <input type="submit" value="submit"/>
            </form>
            {
                user.isSignUp && <Redirect to='/login'/>
            }
        </div>
    );
};

export default CreateAccount;