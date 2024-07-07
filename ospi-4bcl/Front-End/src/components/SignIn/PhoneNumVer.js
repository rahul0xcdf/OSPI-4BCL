import React from 'react'
import {useState} from "react"
import "./signIn.css"

<<<<<<< HEAD
const PhoneNumVer = ({setTfa,phone_no}) =>{

    const clrscr = ()=>{
        setPhNumCol("")
    }
=======
const PhoneNumVer = ({setTfa,phNo}) =>{
>>>>>>> f8aec1b854a969991c9248839c0eb012507e7aab

    const clrscr = ()=>{
        setPhNumCol("")
    }
    const OnSubmitFxn = (event) =>{
        event.preventDefault();
<<<<<<< HEAD
        if(phNumCol === phone_no)
            {setTfa(true);
            }
=======
        if(phNumCol === phNo)
        {
            setTfa(true);
        }
>>>>>>> f8aec1b854a969991c9248839c0eb012507e7aab
        else{
            alert("ERROR! Please enter correct mobile number.");
            clrscr();
        }
<<<<<<< HEAD
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
        maskedNum += phone_no[i+5];
=======
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
>>>>>>> f8aec1b854a969991c9248839c0eb012507e7aab
    }
    const[phNumCol,setPhNumCol] = useState("") //creates a state 
    const handlePhNum = (event) =>{
        setPhNumCol(event.target.value)
    }
<<<<<<< HEAD


    const shouldDispClear = phNumCol.length > 0

=======
    
    const shouldDispClear = phNumCol.length > 0
>>>>>>> f8aec1b854a969991c9248839c0eb012507e7aab
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
<<<<<<< HEAD
                <button type = "submit" className = "buttons " style = {buttonStyle} onMouseEnter={OnEnter} onMouseLeave={onLeave}>Verify</button>
            
=======
                <button type = "submit" className = "buttons" style = {buttonStyle} onMouseEnter={OnEnter} onMouseLeave={onLeave}>Verify</button>
>>>>>>> f8aec1b854a969991c9248839c0eb012507e7aab
                <br></br><br></br>{shouldDispClear && <button onClick = {clrscr} className = "buttons" style = {buttonStyle2} onMouseEnter={OnEnter2} onMouseLeave={onLeave2}>Clear</button>}

            </form></h2>
        </div>
    );
}

export default PhoneNumVer