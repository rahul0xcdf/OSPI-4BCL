import React from 'react'
import {useState} from "react"
import "./signIn.css"

const SecQues = ({setSfa,setTfa,SQ1,SQ2,SQ3,ans1,ans2,ans3}) =>{

    const clrscr = ()=>{
        setSq1Col("");
        setSq2Col("");
        setSq3Col("");
    }
    const OnSubmitFxn = (event) =>{
        event.preventDefault();
        if(sq1Col.toLowerCase() === ans1.toLowerCase() && sq2Col.toLowerCase() === ans2.toLowerCase() && sq3Col.toLowerCase() === ans3.toLowerCase())
        {
            setSfa(true);
            setTfa(false);
        }
        else{
            alert("ERROR! Please enter correct answers.");
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
    
    const shouldDispClear = (sq1Col.length > 0 || sq2Col.length > 0 || sq3Col.length > 0)
    return (
        <div>
            <h1 align="center">Security Questions</h1>
            <hr color="black"></hr><br></br>
            <h2 align = "center"><form onSubmit = {OnSubmitFxn} id = "SecQuesForm">
                <label>
                    {SQ1}
                </label><br></br>
                <input type = "text" className = "inputBox" value = {sq1Col} onChange = {handleSq1} maxLength = {20} minLength={3}
                placeholder='Your answer' required/>
                <br></br><br></br>
                <label>
                    {SQ2}
                </label><br></br>
                <input type = "text" className = "inputBox" value = {sq2Col} onChange = {handleSq2} maxLength = {20} minLength={3}
                placeholder='Your answer' required/>
                <br></br><br></br>
                <label>
                    {SQ3}
                </label><br></br>
                <input type = "text" className = "inputBox" value = {sq3Col} onChange = {handleSq3} maxLength = {20} minLength={3}
                placeholder='Your answer' required/>
                <br></br><br></br>
                <button type = "submit" className = "buttons" style = {buttonStyle} onMouseEnter={OnEnter} onMouseLeave={onLeave}>Submit</button>
                <br></br><br></br>{shouldDispClear && <button onClick = {clrscr} className = "buttons" style = {buttonStyle2} onMouseEnter={OnEnter2} onMouseLeave={onLeave2}>Clear</button>}
            </form></h2>
        </div>
    );
}

export default SecQues;