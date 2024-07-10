import React from 'react'
import {useState} from "react"
import "../SignIn/signIn.css"
//change setPswrd to setPasswor
const UpdatePswrd = ({setDbd,setUpdt,setPswrd,password})=>{

    const [oldPswrd,setOldPswrd] = useState("")
    const [newPswrd1,setNewPswrd1] = useState("")
    const [newPswrd2,setNewPswrd2] = useState("")
    const [bdrRadius,setBdrRadius] = useState("0%");
    const [bdrRadius2,setBdrRadius2] = useState("0%");
    const handleOldPswrd = (event) =>{
        setOldPswrd(event.target.value)
    }
    const handleNewPswrd1 = (event) =>{
        setNewPswrd1(event.target.value)
    }
    const handleNewPswrd2 = (event) =>{
        setNewPswrd2(event.target.value)
    }
    const buttonStyle = {
        borderRadius : bdrRadius,
        height: "100px",
        width: "300px",
    }
    const OnEnter = () =>{
        setBdrRadius("20%");
    }
    const onLeave = () =>{
        setBdrRadius("0%");
    }
    const buttonStyle2 = {
        borderRadius : bdrRadius2,
        height: "100px",
        width: "300px",
    }
    const OnEnter2 = () =>{
        setBdrRadius2("20%");
    }
    const onLeave2 = () =>{
        setBdrRadius2("0%");
    }
    const ChangePassword = () =>{
        if(oldPswrd === password)
        {
            if(newPswrd1 === newPswrd2)
            {
                if(oldPswrd !== newPswrd1)
                {
                    setPswrd(newPswrd1)
                    alert("You have successfully changed your password!");
                }
                else{
                    alert("Password change was unsuccessful! New password must be different from the current one.");
                }
            }
            else{
                alert("Password change was unsuccessful! Please ensure that both the new password columns have same content.");
            }
        }
        else{
            alert("Password change was unsuccessful! Please enter the correct current password.");
        }
        setUpdt(true);
        setDbd(false);
    }
    const clrscr = ()=>{
        setOldPswrd("");
        setNewPswrd1("");
        setNewPswrd2("");
    } 
    const shouldDispClear = (oldPswrd.length > 0 || newPswrd1.length > 0 || newPswrd2.length > 0);
    return (
        <div>
                <h1 align="center">Change Password</h1>
            <hr color="black"></hr>
            <br></br><br></br>
            <h2 align = "center">
            <form onSubmit={ChangePassword}>
                <label>Please enter your current password:</label><br></br>
                <input type = "password" className = "inputBox" value = {oldPswrd} onChange = {handleOldPswrd} maxLength = {20} minLength={3}
                        required auto-complete = "off"/> <br></br><br></br>
                <label>Please enter your new password:</label><br></br>
                <input type = "password" className = "inputBox" value = {newPswrd1} onChange = {handleNewPswrd1} maxLength = {20} minLength={3}
                    required auto-complete = "off"/><br></br><br></br>
                <label>Please re-enter your new password:</label><br></br>
                <input type = "password" className = "inputBox" value = {newPswrd2} onChange = {handleNewPswrd2} maxLength = {20} minLength={3}
                    required auto-complete = "off"/> <br></br><br></br>
                <button type = "submit" className = "buttons" style = {buttonStyle} onMouseEnter={OnEnter} onMouseLeave={onLeave}>Change Password</button>
                {shouldDispClear && <div><br></br><button onClick = {clrscr} className = "buttons" style = {buttonStyle2} onMouseEnter={OnEnter2} onMouseLeave={onLeave2}>Clear</button></div>}
            </form>
            </h2>
        </div>
    );
}

export default UpdatePswrd;