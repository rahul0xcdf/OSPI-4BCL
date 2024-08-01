import React, { useState } from 'react';
import './signIn.css';
import { useNavigate } from 'react-router-dom';


const PhoneNumVer = ({ setDbd,setTfa, phone_no,ctrT,setCtrT }) => {
    const [phNumCol, setPhNumCol] = useState("");
    
    const [bdrRadius, setBdrRadius] = useState("0%");
    const [bdrRadius2, setBdrRadius2] = useState("0%");

    const navigate = useNavigate();

    const clrscr = () => {
        setPhNumCol("");
    };

    const OnSubmitFxn = (event) => {
        event.preventDefault();
        if (phNumCol === phone_no) {
            navigate('/MobileNumberOTP');
        } else {
            if (ctrT < 3) {
                alert("ERROR! Please enter correct mobile number.");
                setCtrT(ctrT + 1);
                clrscr();
            } else {
                alert("ERROR! All your tries are over! Please try again later.");
            }
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

    let maskedNum = "XXXXXX";
    for (let i = 1; i <= 4; i++) {
        maskedNum += phone_no[i + 5];
    }

    const handlePhNum = (event) => {
        setPhNumCol(event.target.value);
    };

    const shouldDispClear = phNumCol.length > 0;

    return (
        <div>
            <h1 align="center">Verification Using Registered Mobile Number</h1>
            <hr color="black" />
            <br /><br /><br />
            <h2 align="center">
                <form onSubmit={OnSubmitFxn} id="PhoneNumVerForm">
                    <label>
                        Enter your registered mobile number ({maskedNum}) :
                    </label>
                    <br /><br />
                    <input 
                        type="text" 
                        className="inputBox" 
                        value={phNumCol} 
                        onChange={handlePhNum} 
                        maxLength={10} 
                        minLength={10}
                        placeholder='e.g. "2940312783" ' 
                        required 
                    />
                    <br /><br />
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
                    {shouldDispClear && 
                        <button 
                            onClick={clrscr} 
                            className="buttons" 
                            style={{ borderRadius: bdrRadius2 }} 
                            onMouseEnter={OnEnter2} 
                            onMouseLeave={onLeave2}
                        >
                            Clear
                        </button>
                    }
                </form>
            </h2>
        </div>
    );
};

export default PhoneNumVer;
