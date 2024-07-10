import React from 'react'
import {useState} from "react"
import "../SignIn/signIn.css"

const Dashboard = ({setDbd, setUpdt, userName}) =>{

    const [bdrRadius,setBdrRadius] = useState("0%");
    const [bdrRadius2,setBdrRadius2] = useState("0%");
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
    const DelAccount = ()=> {
        const decide = window.confirm("Are you sure you want to delete your account? By proceeding, you agree to all the terms and conditions.");
        if(decide){
            alert("Your account has successfully been deleted.");
            setDbd(true);
        }
        else{
            alert("Deletion Cancelled!");
        }
    }
    const goUpdt = () =>{
        setDbd(true);
        setUpdt(false);
    }
    return(
        <div>
            <h1 align="center">Dashboard</h1>
            <hr color="black"></hr>
            <marquee><h3><font color = "red">Welcome back, {userName} !</font></h3></marquee>
            <br></br><br></br><br></br>
            <h2 align = "center">
                <button className = "buttons" style = {buttonStyle} onMouseEnter={OnEnter} onMouseLeave={onLeave} onClick = {goUpdt}>Update Account Details</button>
                <br></br><br></br>
                <button className = "buttons" style = {buttonStyle2} onMouseEnter={OnEnter2} onMouseLeave={onLeave2} onClick = {DelAccount}>Delete Account</button>
            </h2>
        </div>
    );
}

export default Dashboard;