

import React, { useState } from 'react';
import axios from 'axios';
import usnmIcon from "./UsnmIcon.png"
import keyIcon from "./KeyIcon.jpg"
import { useNavigate } from 'react-router-dom';
//import signInDiv from './signIn.css';



const SignIn = ({ setUsername, setPassword, setSQ1, setSQ2, setSQ3, setAns1, setAns2, setAns3, setphoneNo,setEmailId, ctrF, setCtrF }) => {
  const [username, setUsernameCol] = useState('');
  const [password, setPasswordCol] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
 
  const clrscr = () => {
    setUsernameCol("");
    setPasswordCol("");
  };

const goSignUp = (event) =>{
  event.preventDefault();
  navigate('/SignUp');
} 

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', { username, password });
      if(ctrF < 3){
      if (response.status===200) {
        setUsername(username);
        setPassword(password);
        setSQ1(response.data.SQ1);
        setSQ2(response.data.SQ2);
        setSQ3(response.data.SQ3);
        setAns1(response.data.ans1);
        setAns2(response.data.ans2);
        setAns3(response.data.ans3);
        setphoneNo(response.data.phone_no);
        setEmailId(response.data.email_id)
        console.log(response.data.SQ1);
        
        navigate('/MobileNumberVerification'); 
        
      }
      else{
        alert("All attempts failed! You have crossed the 3 tries limit.");
        setCtrF(ctrF+1);
      }
    }
    } catch (error) {
      setError(error.response.data.message);
      clrscr();
    }
  };

  const [bdrRadius, setBdrRadius] = useState("0%");
  const buttonStyle = { borderRadius: bdrRadius };
  const [bdrRadius2, setBdrRadius2] = useState("0%");
  const buttonStyle2 = { borderRadius: bdrRadius2 };
  const OnEnter2 = () => { setBdrRadius2("20%"); };
  const onLeave2 = () => { setBdrRadius2("0%"); };
  const OnEnter = () => { setBdrRadius("20%"); };
  const onLeave = () => { setBdrRadius("0%"); };

  const shouldDispClear = (username.length > 0 || password.length > 0);

  return (
    <div bgcolor = "white">
      {error && <p style={{ color: 'red' }}>{error}</p>}
            <h1 align = "center">
              Sign-In</h1>
            <hr color = "black"></hr>
            <br></br>
            <h2 align="center">
        <form id="signInForm" onSubmit={handleSignIn}>
        
          <label color = "black">Username:</label><br></br>
          <img 
                src={usnmIcon} 
                alt="User Icon" 
                style={{ width: '50px', height: '50px', marginRight: '10px', verticalAlign: 'middle' }} 
            /> 
          <input type="text" className="inputBox" value={username} onChange={(e) => setUsernameCol(e.target.value)} maxLength={20} minLength={3} placeholder='eg "name123"' required />
          <br></br><br></br><br></br>
          <label font = "black">Password:</label><br></br>
          <img 
                src={keyIcon} 
                alt="User Icon" 
                style={{ width: '50px', height: '50px', marginRight: '10px', verticalAlign: 'middle' }} 
            />
          <input type="password" className="inputBox" value={password} onChange={(e) => setPasswordCol(e.target.value)} maxLength={20} minLength={3} required autoComplete="off" />
          <br></br><br></br>
                    <button type="submit" className="buttons" style={buttonStyle} onMouseEnter={OnEnter} onMouseLeave={onLeave}>Sign-In</button>
                    {shouldDispClear && <div><br></br><br></br><button onClick={clrscr} className="buttons" style={buttonStyle2} onMouseEnter={OnEnter2} onMouseLeave={onLeave2}>Clear</button></div>}
      </form>
      </h2><br></br>
            <p align="center">Don't have an account? </p><form onSubmit = {goSignUp}><button type = "submit">Create an account</button></form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default SignIn;
