import React, { useState } from 'react';
import OTPInput from "otp-input-react";
//import { CgSpinner } from "react-icon/cg";
import { BsTelephoneFill } from "react-icons/bs";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "./firebase.config"
import { Toaster, toast } from "react-hot-toast"

const Otp_page = (setOtpA, setDbd, phone_no, setphoneNo) => {
	const [OTP, setOTP] =  useState("");
	const [showph, setShowph] = useState(false);
	
	const [user, setUser] = useState(null);
	const [confirmationResult, setConfirmationResult] = useState(null);
	const sendOtp = async() => {
try{
	const recaptcha = new RecaptchaVerifier(auth, "recaptcha-container", {});
	const confirmation = signInWithPhoneNumber(auth, phone_no, recaptcha)
	setConfirmationResult(confirmation);	
	}catch(err){
		console.error(err)}
}	

 const verifyOtp = async () => {
    try {
      console.log(confirmationResult)
      setOtpA(true);
      setDbd(false);
      
    } catch (err) {
      console.error('Error verifying OTP:', err);
      toast.error('Failed to verify OTP');
    }
  };	
	return <>
		{ showph &&(
		<div>

		<PhoneInput country = {"in"} value = {phone} onChange = {(phone_no) =>setphoneNo("+"+phone_no)} />
		</div>)
}		
		<div><Toaster toastOptions = {{duration: 4000}} /></div>
		 <div>
		  <button onClick = {sendOtp}>Send Otp</button>
		  <div id = "recaptcha-container"></div>
		  <OTPInput value = {OTP} onChange = {setOTP}  OTPLength = {6} otpType = "number" disabled = {false} autoFocus />
		  <button onClick = {verifyOtp}>SUBMIT</button>
		</div>

		
		</>
}

export default Otp_page;