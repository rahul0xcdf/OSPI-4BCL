import React from 'react'
import {useState} from "react"
import "../SignIn/signIn.css"
import userIcon from "./IconUserNew.png"
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

const Dashboard = ({userName}) =>{
    const { loginWithRedirect } = useAuth0();

    const [bdrRadius,setBdrRadius] = useState("0%");
    const [bdrRadius2,setBdrRadius2] = useState("0%");
    const [bdrRadius3,setBdrRadius3] = useState("0%");
    const [bdrRadius4,setBdrRadius4] = useState("0%");

    const navigate = useNavigate();


    const buttonStyle = {
        borderRadius : bdrRadius,
        height: "80px",
        width: "200px",
        marginLeft: "30px",
    }
    const OnEnter = () =>{
        setBdrRadius("20%");
    }
    const onLeave = () =>{
        setBdrRadius("0%");
    }
    const buttonStyle2 = {
        borderRadius : bdrRadius2,
        height: "80px",
        width: "200px",
        marginLeft: "30px",
        marginRight:  "50px",
        paddingRight: "50px",
        paddingLeft: "50px",
    }
    const OnEnter2 = () =>{
        setBdrRadius2("20%");
    }
    const onLeave2 = () =>{
        setBdrRadius2("0%");
    }
    const buttonStyle3 = {
        borderRadius : bdrRadius3,
        height: "80px",
        width: "200px",
        marginLeft: "30px",
    }
    const OnEnter3 = () =>{
        setBdrRadius3("20%");
    }
    const onLeave3 = () =>{
        setBdrRadius3("0%");
    }
    const buttonStyle4 = {
        borderRadius : bdrRadius4,
        height: "80px",
        width: "200px",
        marginRight:  "30px",
        
    }
    const OnEnter4 = () =>{
        setBdrRadius4("20%");
    }
    const onLeave4 = () =>{
        setBdrRadius4("0%");
    }
    const DelAccount = ()=> {
        const decide = window.confirm("Are you sure you want to delete your account? By proceeding, you agree to all the terms and conditions.");
        if(decide){
            alert("Your account has successfully been deleted.");
            navigate('/SignIn');
        }
        else{
            alert("Deletion Cancelled!");
        }
    }
    const SignOut = ()=> {
        const decide = window.confirm("Are you sure you want to sign out?");
        if(decide){
            alert("You have been successfully signed out.");
            navigate('/SignIn');
        }
        else{
            alert("Sign Out Cancelled!");
        }
    }
    const goUpdt = async () => {
        await loginWithRedirect({
          appState: {
            returnTo: "/Home/UpdatePassword",
          },
        });
      };
     
    return(
        <div>
            <h1 align="center"><img 
                src={userIcon} 
                alt="User Icon" 
                style={{ width: '50px', height: '50px', marginRight: '10px', verticalAlign: 'middle' }} 
            /> 
            Welcome back,<br></br> {userName} !
        </h1>
            <hr color="black"></hr>
            
            <br></br><br></br><br></br>
            <h2 align="left">
    <span style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button className="buttons" style={buttonStyle} onMouseEnter={OnEnter} onMouseLeave={onLeave} onClick={goUpdt}>
            Update Password
        </button> <br></br>
        <span style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <button className="buttons" style={buttonStyle2} onMouseEnter={OnEnter2} onMouseLeave={onLeave2} onClick={DelAccount}>
                Delete Account
            </button> <br></br>
            <button className="buttons" style={buttonStyle4} onMouseEnter={OnEnter4} onMouseLeave={onLeave4} onClick={SignOut}>
                Sign Out
            </button> 
        </span> <br></br>
        <button className="buttons" style={buttonStyle3} onMouseEnter={OnEnter3} onMouseLeave={onLeave3} onClick={DelAccount}>
            Verify Email
        </button>
    </span>
</h2>
        </div>
    );
}

export default Dashboard;