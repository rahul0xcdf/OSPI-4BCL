import React from 'react'
import {useState} from "react"
import "./signIn.css"

const SignIn = ({setFfa, setSfa}) => {

    const OnSubmitFxn = (event) =>{
        event.preventDefault();
        setFfa(true);
        setSfa(false);
    }
    const [bdrRadius,setBdrRadius] = useState("0%");
   
    const buttonStyle = {
        borderRadius : bdrRadius,
    }
    const [bdrRadius2,setBdrRadius2] = useState("0%");
    const buttonStyle2 = {
        borderRadius : bdrRadius2,
    }
    const OnEnter2 = () =>{
        setBdrRadius2("20%");
    }
    const onLeave2 = () =>{
        setBdrRadius2("0%");
    }
    const OnEnter = () =>{
        setBdrRadius("20%");
    }
    const onLeave = () =>{
        setBdrRadius("0%");
    }
    const[userNameCol,setUserNameCol] = useState("") //creates a state userNameCol
    const handleUserName = (event) =>{
        setUserNameCol(event.target.value)
    }
    const[passwordCol,setPasswordCol] = useState("") //creates a state passwordCol
    const handlePassword = (event) =>{
        setPasswordCol(event.target.value)
    }
    const clrscr = ()=>{
        setUserNameCol("");
        setPasswordCol("");
    }
    const shouldDispClear = (userNameCol.length > 0 || passwordCol.length > 0)
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
                    <button type = "submit" className = "buttons" style = {buttonStyle} onMouseEnter={OnEnter} onMouseLeave={onLeave}>Sign-In</button>
                    {shouldDispClear && <div><br></br><br></br><button onClick = {clrscr} className = "buttons" style = {buttonStyle2} onMouseEnter={OnEnter2} onMouseLeave={onLeave2}>Clear</button></div>}
                </form>
            </h2><br></br><br></br>
            <p align = "center">Don't have an account? <a href = "google.com">Create an account</a></p>
        </div>
    );
}

export default SignIn