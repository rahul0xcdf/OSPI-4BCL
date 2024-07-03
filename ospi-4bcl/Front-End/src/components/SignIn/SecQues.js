import React from 'react'
import {useState} from "react"
import "./signIn.css"

const SecQues = ({setSfa,setTfa}) =>{

    const OnSubmitFxn = (event) =>{
        event.preventDefault();
        setSfa(true);
        setTfa(false);
    }

    let sq1 = "Security Question 1: What is ....";
    let sq2 = "Security Question 2: What is ....";
    let sq3 = "Security Question 3: What is ...."
    const[sq1Col,setSq1Col] = useState("") //creates a state userNameCol
    const handleSq1 = (event) =>{
        setSq1Col(event.target.value)
    }
    const[sq2Col,setSq2Col] = useState("") //creates a state userNameCol
    const handleSq2 = (event) =>{
        setSq2Col(event.target.value)
    }
    const[sq3Col,setSq3Col] = useState("") //creates a state userNameCol
    const handleSq3 = (event) =>{
        setSq3Col(event.target.value)
    }
    return (
        <div>
            <h1 align="center">Security Questions</h1>
            <hr color="black"></hr><br></br>
            <h2 align = "center"><form onSubmit = {OnSubmitFxn} id = "SecQuesForm">
                <label>
                    {sq1}
                </label><br></br>
                <input type = "text" className = "inputBox" value = {sq1Col} onChange = {handleSq1} maxLength = {20} minLength={3}
                placeholder='Your answer' required/>
                <br></br><br></br>
                <label>
                    {sq2}
                </label><br></br>
                <input type = "text" className = "inputBox" value = {sq2Col} onChange = {handleSq2} maxLength = {20} minLength={3}
                placeholder='Your answer' required/>
                <br></br><br></br>
                <label>
                    {sq3}
                </label><br></br>
                <input type = "text" className = "inputBox" value = {sq3Col} onChange = {handleSq3} maxLength = {20} minLength={3}
                placeholder='Your answer' required/>
                <br></br><br></br>
                <button type = "submit" className = "buttons">Submit</button>
            </form></h2>
        </div>
    );
}

export default SecQues;