



import React, { useState } from 'react';
import axios from 'axios';
//import SecQues from './SecQues';

const SignIn = ({ setFfa, setSfa, setUsername, setPassword, setSQ1, setSQ2, setSQ3, setAns1, setAns2, setAns3, setphoneNo }) => {
  const [username, setUsernameCol] = useState('');
  const [password, setPasswordCol] = useState('');
  const [error, setError] = useState('');
 
  const clrscr = () => {
    setUsernameCol("");
    setPasswordCol("");
}    

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', { username, password });
      if (response.status===200) {
        setUsername(username);
        setPassword(password);
        setSQ1(response.data.SQ1);
        setSQ2(response.data.SQ2);
        setSQ3(response.data.SQ3);
        setAns1(response.data.ans1);
        setAns2(response.data.ans2);
        setAns3(response.data.ans3);
        setphoneNo(response.data.phone_no);
        console.log(response.data.SQ1);
        
        setFfa(true);
        setSfa(false); 
        
      }
    } catch (error) {
      setError(error.response.data.message);
      clrscr();
    }
  };

  const [bdrRadius, setBdrRadius] = useState("0%");
    const buttonStyle = { borderRadius: bdrRadius };
    const [bdrRadius2, setBdrRadius2] = useState("0%");
    const buttonStyle2 = { borderRadius: bdrRadius2 };
    const OnEnter2 = () => { setBdrRadius2("20%"); }
    const onLeave2 = () => { setBdrRadius2("0%"); }
    const OnEnter = () => { setBdrRadius("20%"); }
    const onLeave = () => { setBdrRadius("0%"); }

    const shouldDispClear = (username.length > 0 || password.length > 0)


  return (
    <div>
      <h1 align="center">Sign In</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <hr color="black"></hr>
            <br></br><br></br>
            <h2 align="center">
        <form id="signInForm" onSubmit={handleSignIn}>
        
          <label>Username:</label>
          <input type="text" className="inputBox" value={username} onChange={(e) => setUsernameCol(e.target.value)} required />
          <br></br><br></br><br></br>
          <label>Password:</label>
          <input type="password" className="inputBox" value={password} onChange={(e) => setPasswordCol(e.target.value)} required />
        
          <br></br><br></br>
                    <button type="submit" className="buttons" style={buttonStyle} onMouseEnter={OnEnter} onMouseLeave={onLeave}>Sign-In</button>
                    {shouldDispClear && <div><br></br><br></br><button onClick={clrscr} className="buttons" style={buttonStyle2} onMouseEnter={OnEnter2} onMouseLeave={onLeave2}>Clear</button></div>}
      </form>
      </h2><br></br><br></br>
            <p align="center">Don't have an account? <a href="google.com">Create an account</a></p>
            {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default SignIn;


  
  /*

import React from 'react'
import {useState} from "react"
import "./signIn.css"


//react code

const SignIn = ({setFfa, setSfa}) => {

    const OnSubmitFxn = (event) =>{
        event.preventDefault();
        setFfa(true);
        setSfa(false);
    }

    const[userNameCol,setUserNameCol] = useState("") //creates a state userNameCol
    const handleUserName = (event) =>{
        setUserNameCol(event.target.value)
        console.log(userNameCol)
    }
    const[passwordCol,setPasswordCol] = useState("") //creates a state passwordCol
    const handlePassword = (event) =>{
        setPasswordCol(event.target.value)
    }

    

    return(
        <div>
            <h1 align="center">Sign-In</h1>
            <hr color="black"></hr>
            <br></br><br></br>
            <h2 align = "center">
                <form id = "signInForm" onSubmit = {OnSubmitFxn}>
                    <label>Username: </label> 
                    <input type = "text" className = "inputBox" value = {userNameCol} onChange = {handleUserName} maxLength = {20} minLength={3}
                placeholder='eg "name123"' required/>
                    <br></br><br></br><br></br>
                    <label>Password: </label> 
                    <input type = "password" className = "inputBox" value = {passwordCol} onChange = {handlePassword} maxLength = {20} minLength={3}
                    required auto-complete = "off"/>
                    <br></br><br></br>
                    <button type = "submit" className = "buttons">Sign-In</button>
                </form>
            </h2><br></br><br></br>
            <p align = "center">Don't have an account? <a href = "google.com">Create an account</a></p>
        </div>
    );
}

export default SignIn

*/
