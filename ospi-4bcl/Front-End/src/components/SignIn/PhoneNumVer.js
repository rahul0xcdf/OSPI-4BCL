import React from 'react'
import {useState} from "react"
import "./signIn.css"

const PhoneNumVer = ({setTfa,phNo}) =>{

    const clrscr = ()=>{
        setPhNumCol("")
    }
    const OnSubmitFxn = (event) =>{
        event.preventDefault();
        if(phNumCol === phNo)
        {
            setTfa(true);
        }
        else{
            alert("ERROR! Please enter correct mobile number.");
            clrscr();
        }
    }
    const [bdrRadius,setBdrRadius] = useState("0%");
    const buttonStyle = {
        borderRadius : bdrRadius,
    }
    const OnEnter = () =>{
        setBdrRadius("20%");
    }
    const onLeave = () =>{
        setBdrRadius("0%");
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

    let maskedNum = "XXXXXX"
    for(var i = 1; i <= 4;i++)
    {
        maskedNum += phNo[i+5];
    }
    const[phNumCol,setPhNumCol] = useState("") //creates a state 
    const handlePhNum = (event) =>{
        setPhNumCol(event.target.value)
    }
    
    const shouldDispClear = phNumCol.length > 0
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
                <button type = "submit" className = "buttons" style = {buttonStyle} onMouseEnter={OnEnter} onMouseLeave={onLeave}>Verify</button>
                <br></br><br></br>{shouldDispClear && <button onClick = {clrscr} className = "buttons" style = {buttonStyle2} onMouseEnter={OnEnter2} onMouseLeave={onLeave2}>Clear</button>}

            </form></h2>
        </div>
    );
}

export default PhoneNumVer