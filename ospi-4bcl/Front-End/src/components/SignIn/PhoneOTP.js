import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "./firebase.config";
import { Toaster, toast } from "react-hot-toast";
import "./signIn.css";
import "react-phone-input-2/lib/style.css";

const PhoneOTP = ({ phone_no }) => {
    const [otpCol, setOTPCol] = useState("");
    const [bdrRadius, setBdrRadius] = useState("0%");
    const [bdrRadius2, setBdrRadius2] = useState("0%");
    const [bdrRadius3, setBdrRadius3] = useState("0%");
    const [OTP, setOTP] = useState("");
    const navigate = useNavigate();
    const [showph, setShowph] = useState(true);
    const [phone, setPhone] = useState(phone_no);
    const [user, setUser] = useState(null);
    const [confirmationResult, setConfirmationResult] = useState(null);

    const clrscr = () => {
        setOTP("");
    };

    const sendOtp = async () => {
        try {
            const recaptcha = new RecaptchaVerifier('recaptcha-container', {}, auth);
            const confirmation = await signInWithPhoneNumber(auth, "+" + phone, recaptcha);
            setConfirmationResult(confirmation);
        } catch (err) {
            console.error(err);
        }
    };

    const verifyOtp = async (e) => {
        e.preventDefault(); // Prevent form submission default behavior
        try {
            await confirmationResult.confirm(OTP);
            navigate('/SecurityQuestions');
        } catch (err) {
            console.error('Error verifying OTP:', err);
            toast.error('Failed to verify OTP');
        }
    };

    const OnEnter = () => setBdrRadius("20%");
    const onLeave = () => setBdrRadius("0%");
    const OnEnter2 = () => setBdrRadius2("20%");
    const onLeave2 = () => setBdrRadius2("0%");
    const OnEnter3 = () => setBdrRadius3("20%");
    const onLeave3 = () => setBdrRadius3("0%");

    let maskedNum = "XXXXXX";
    if (phone_no.length >= 10) {
        maskedNum += phone_no.slice(-4);
    } else {
        maskedNum += "XXXX";
    }

    const handleOTPcol = (event) => {
        setOTPCol(event.target.value);
    };

    // Timer logic
    const Ref = useRef(null);
    const [timer, setTimer] = useState("00:00:00");

    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        return { total, hours, minutes, seconds };
    };

    const startTimer = (e) => {
        let { total, hours, minutes, seconds } = getTimeRemaining(e);
        if (total >= 0) {
            setTimer(
                (hours > 9 ? hours : "0" + hours) +
                ":" +
                (minutes > 9 ? minutes : "0" + minutes) +
                ":" +
                (seconds > 9 ? seconds : "0" + seconds)
            );
        }
    };

    const clearTimer = (e) => {
        setTimer("00:00:10");
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000);
        Ref.current = id;
    };

    const getDeadTime = () => {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + 10);
        return deadline;
    };

    useEffect(() => {
        clearTimer(getDeadTime());
        sendOtp(); // Call sendOtp when the component mounts
    }, []);

    let shouldDispResend = timer === "00:00:00";
    const resendOtp = () => {
        clearTimer(getDeadTime());
        clrscr();
        alert("OTP re-sent! Please check your email.");
        sendOtp(); // Resend OTP
    };
    
    let shouldDispClear = otpCol.length > 0;

    return (
        <div>
            <h1 align="center">Verification Using Mobile OTP</h1>
            <hr color="black" />
            <br /><br /><br />
            <h2 align="center">
                <font>Request resend OTP in {timer}</font><br /><br />
                <form onSubmit={verifyOtp}>
                    <label>
                        Enter the OTP sent to your registered mobile number ({maskedNum}) :
                    </label>
                    <br /><br />
                    <input
                        type="text"
                        className="inputBox"
                        value={OTP}
                        onChange={(e) => setOTP(e.target.value)} // Corrected onChange handler
                        maxLength={6}
                        minLength={6}
                        placeholder='e.g. "123456"'
                        required
                    /><br /><br />
                    <div id="recaptcha-container"></div>
                    <button
                        type="submit"
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
                            type="button"
                            onClick={resendOtp}
                            className="buttons"
                            style={{ borderRadius: bdrRadius2 }}
                            onMouseEnter={OnEnter2}
                            onMouseLeave={onLeave2}
                        >
                            Resend OTP
                        </button>}<br />
                    {shouldDispClear &&
                        <button
                            type="button"
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
