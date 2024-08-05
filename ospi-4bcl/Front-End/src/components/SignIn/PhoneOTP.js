import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import OTPInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";

import "./OtpPage.css";

const PhoneOTP = ({ phone_no }) => {
    const [otpCol, setOtpCol] = useState("");
    const [bdrRadius, setBdrRadius] = useState("0%");
    const [bdrRadius2, setBdrRadius2] = useState("0%");
    const [bdrRadius3, setBdrRadius3] = useState("0%");
    const navigate = useNavigate();

    const clrscr = () => {
        setOtpCol("");
    };

    const OnSubmitFxn = (event) => {
        event.preventDefault();
        let otp1 = "654321";
        if (otpCol === otp1) {
            alert("Verified successfully!");
            navigate('/SecurityQuestions');
        } else {
            alert("Verification unsuccessful! Wrong OTP entered.");
            navigate('/SignIn');
        }
    }

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
        setOtpCol(event.target.value);
    };

    const Ref = useRef(null);

    const [timer, setTimer] = useState("00:00:00");

    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        return {
            total,
            hours,
            minutes,
            seconds,
        };
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
    }, []);

    let shouldDispResend = (timer === "00:00:00");
    const resendOtp = () => {
        clearTimer(getDeadTime());
        clrscr();
        alert("OTP re-sent! Please check your email.");
    }
    let shouldDispClear = otpCol.length > 0;

    return (
        <div className="otp-page-container">
            <h1 align="center">Verification Using Mobile OTP</h1>
            <hr color="black" />
            <br /><br /><br />
            <h2 align="center">
                <font>Request resend OTP in {timer}</font><br /><br />
                <form onSubmit={OnSubmitFxn}>
                    <label>
                        Enter the OTP sent to your registered mobile number({maskedNum}) :
                    </label>
                    <br /><br />
                    <input
                        type="text"
                        className="otp-input-box"
                        value={otpCol}
                        onChange={handleOTPcol}
                        maxLength={6}
                        minLength={6}
                        placeholder='e.g. "123456" '
                        required
                    /><br /><br />
                    <button
                        type="submit"
                        className="otp-buttons"
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
                            className="otp-buttons"
                            style={{ borderRadius: bdrRadius2 }}
                            onMouseEnter={OnEnter2}
                            onMouseLeave={onLeave2}
                        >
                            Resend OTP
                        </button>}
                    <br />
                    {shouldDispClear &&
                        <button
                            onClick={clrscr}
                            className="otp-buttons"
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
