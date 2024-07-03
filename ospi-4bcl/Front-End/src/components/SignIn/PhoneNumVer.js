import React from 'react'
import {useState} from "react"
import "./signIn.css"

const PhoneNumVer = ({setTfa}) =>{

    const OnSubmitFxn = (event) =>{
        event.preventDefault();
        setTfa(true);
    }

    let phNum = "7294318374";
    let maskedNum = "XXXXXX"
    for(var i = 1; i <= 4;i++)
    {
        maskedNum += phNum[i+5];
    }
    const[phNumCol,setPhNumCol] = useState("") //creates a state 
    const handlePhNum = (event) =>{
        setPhNumCol(event.target.value)
    }
    return(
        <div>
            <h1 align="center">Verification Using Registered Mobile Number</h1>
            <hr color="black"></hr><br></br><br></br><br></br>
            <h2 align = "center"><form onSubmit = {OnSubmitFxn} id = "PhoneNumVerForm">
                <label>
                    Enter your registered mobile number ({maskedNum}) :
                </label><br></br><br></br>
                <input type = "text" className = "inputBox" value = {phNumCol} onChange = {handlePhNum} maxLength = {10} minLength={10}
                placeholder='eg "2940312783" ' required/>
                <br></br><br></br>
                <button type = "submit" className = "buttons">Verify</button>
            </form></h2>
        </div>
    );
}

export default PhoneNumVer