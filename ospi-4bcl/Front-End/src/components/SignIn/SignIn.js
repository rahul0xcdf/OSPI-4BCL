import React from 'react'
import {useState} from "react"
import "./signIn.css"

const SignIn = ({setFfa, setSfa,setUsnm,setPswrd,setSQ1,setSQ2,setSQ3,setAns1,setAns2,setAns3,setPhNo,ctrF,setCtrF}) => {

    const clrscr = ()=>{
        setUserNameCol("");
        setPasswordCol("");
    }    
    const OnSubmitFxn = (event) =>{
        event.preventDefault();
        const newArr = ["123","123","DefaultQ","DefaultQ","DefaultQ","123","123","123","1234567899"];
        if(ctrF < 3)
        {
        if(userNameCol === newArr[0] && passwordCol === newArr[1])
        {
            setUsnm(newArr[0]);
            setPswrd(newArr[1]);
            setSQ1(newArr[2]);
            setSQ2(newArr[3]);
            setSQ3(newArr[4]);
            setAns1(newArr[5]);
            setAns2(newArr[6]);
            setAns3(newArr[7]);
            setPhNo(newArr[8]);
            setFfa(true);
            setSfa(false);
        }
        else{
            alert("ERROR! Please enter correct username and password.");
            setCtrF(ctrF+1);
            clrscr();
        }
    }
    else{
        alert("ERROR! All your tries are over! Please try again later.");
    }
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
    }//
    
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