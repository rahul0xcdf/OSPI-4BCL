import React from 'react'
import {useState} from "react"
import "./signIn.css"

const SignIn = ({setFfa, setSfa}) => {

    const OnSubmitFxn = (event) =>{
        event.preventDefault();
        setFfa(true);
        setSfa(false);
    }

    const[userNameCol,setUserNameCol] = useState("") //creates a state userNameCol
    const handleUserName = (event) =>{
        setUserNameCol(event.target.value)
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