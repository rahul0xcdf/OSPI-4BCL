import React, { useState,useRef,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./signIn.css";
import OTPInput from "otp-input-react";
import { BsTelephoneFill } from "react-icons/bs";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "./firebase.config"
import { Toaster, toast } from "react-hot-toast"

const PhoneOTP = ({phone_no}) =>{

    const [otpCol, setOTPCol] = useState("");
    const [bdrRadius, setBdrRadius] = useState("0%");
    const [bdrRadius2, setBdrRadius2] = useState("0%");
    const [bdrRadius3, setBdrRadius3] = useState("0%");
    const [OTP, setOTP] =  useState("");
	const navigate = useNavigate();
	const [showph, setShowph] = useState(true);
	const [phone, setPhone] = useState(9880620218);
	const [user, setUser] = useState(null);
	const [confirmationResult, setConfirmationResult] = useState(null);


    const clrscr = () => {
        setOTP("");
    };
    const sendOtp = async() => {
try{
	const recaptcha = new RecaptchaVerifier(auth, "recaptcha-container", {});
	const confirmation = signInWithPhoneNumber(auth,"+"+ phone, recaptcha)
	setConfirmationResult(confirmation);	
	}catch(err){
		console.error(err)}
}

const verifyOtp = async () => {
    try {
      console.log(confirmationResult)
      navigate('/Home');
    } catch (err) {
      console.error('Error verifying OTP:', err);
      //toast.error('Failed to verify OTP');
    }
  };

    const OnEnter = () => {
        setBdrRadius("20%");
    };

    const onLeave = () => {
        setBdrRadius("0%");
    };

    const OnEnter2 = () => {
        setBdrRadius2("20%");
    };

    const onLeave2 = () => {
        setBdrRadius2("0%");
    };
    const OnEnter3 = () => {
        setBdrRadius3("20%");
    };

    const onLeave3 = () => {
        setBdrRadius3("0%");
    };
    let maskedNum = "XXXXXX";
    for (let i = 1; i <= 4; i++) {
        maskedNum += phone_no[i + 5];
    }
    const handleOTPcol = (event) => {
        setOTPCol(event.target.value);
    };
    ///////////////////////////////////////////////////////
    const Ref = useRef(null);
 
    // The state for our timer
    const [timer, setTimer] = useState("00:00:00");
 
    const getTimeRemaining = (e) => {
        const total =
            Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor(
            (total / 1000 / 60) % 60
        );
        const hours = Math.floor(
            (total / 1000 / 60 / 60) % 24
        );
        return {
            total,
            hours,
            minutes,
            seconds,
        };
    };
 
    const startTimer = (e) => {
        let { total, hours, minutes, seconds } =
            getTimeRemaining(e);
        if (total >= 0) {
            // update the timer
            // check if less than 10 then we need to
            // add '0' at the beginning of the variable
            setTimer(
                (hours > 9 ? hours : "0" + hours) +
                ":" +
                (minutes > 9
                    ? minutes
                    : "0" + minutes) +
                ":" +
                (seconds > 9 ? seconds : "0" + seconds)
            );
        }
    };
 
    const clearTimer = (e) => {
        // If you adjust it you should also need to
        // adjust the Endtime formula we are about
        // to code next
        setTimer("00:00:10");
 
        // If you try to remove this line the
        // updating of timer Variable will be
        // after 1000ms or 1sec
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000);
        Ref.current = id;
    };
 
    const getDeadTime = () => {
        let deadline = new Date();
 
        // This is where you need to adjust if
        // you entend to add more time
        deadline.setSeconds(deadline.getSeconds() + 10);
        return deadline;
    };
 
    // We can use useEffect so that when the component
    // mount the timer will start as soon as possible
 
    // We put empty array to act as componentDid
    // mount only
    useEffect(() => {
        clearTimer(getDeadTime());
    }, []);
 
    // Another way to call the clearTimer() to start
    // the countdown is via action event from the
    // button first we create function to be called
    // by the button
    //////////////////////////////////////////////////////
    let shouldDispResend = (timer === "00:00:00");
    const resendOtp = () =>{
        clearTimer(getDeadTime());
        clrscr();
        alert("OTP re-sent! Please check your email.");
        //resendOtp();
    }
    let shouldDispClear = otpCol.length > 0;
	sendOtp();
    return (
        <div>
            <h1 align="center">Verification Using Mobile OTP</h1>
            <hr color="black" />
            <br /><br /><br/>
            <h2  align = "center">
                <font>Request resend OTP in {timer}</font><br></br><br></br>
                <form onSubmit={verifyOtp}>
                <label>
                        Enter the OTP sent to your registered mobile number({maskedNum}) :
                    </label>
                    <br /><br />
                    <input 
                        type="text" 
                        className="inputBox" 
                        value={OTP} 
                        onChange={setOTP} 
                        maxLength={6} 
                        minLength={6}
                        placeholder='e.g. "123456" ' 
                        required 
                    /><br></br><br></br>
			<div id = "recaptcha-container"></div>
                    <button 
                        type="submit" 
			onClick = {verifyOtp}
                        className="buttons" 
                        style={{ borderRadius: bdrRadius }} 
                        onMouseEnter={OnEnter} 
                        onMouseLeave={onLeave}
                    >
                        Verify
                    </button>
                    <br /><br />
                    {shouldDispResend && 
                        <button 
                            onClick={resendOtp} 
                            className="buttons" 
                            style={{ borderRadius: bdrRadius2 }} 
                            onMouseEnter={OnEnter2} 
                            onMouseLeave={onLeave2}
                        >
                            Resend OTP
                        </button>}<br></br> 
                        {shouldDispClear && 
                        <button 
                            onClick={clrscr} 
                            className="buttons" 
                            style={{ borderRadius: bdrRadius3 }} 
                            onMouseEnter={OnEnter3} 
                            onMouseLeave={onLeave3}
                        >
                            Clear
                        </button>
                    }
                </form>
            </h2>
        </div>
    );
}

export default PhoneOTP;