import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import "../SignIn/signIn.css";
import axios from 'axios';

const DeleteAccount = ({setUsername,setPassword,setSQ1,setSQ2,setSQ3,setAns1,setAns2,setAns3,setphoneNo,setEmailId,password,email_id}) =>{

    const [Pswrd, setPswrd] = useState("");
    const [bdrRadius, setBdrRadius] = useState("0%");
    const [bdrRadius2, setBdrRadius2] = useState("0%");
    const [ctrW, setCtrW] = useState(0);

    const navigate = useNavigate();

    const handlePswrd = (event) => {
        setPswrd(event.target.value);
    };

    const buttonStyle = {
        borderRadius: bdrRadius,
        height: "100px",
        width: "300px",
    };
    const OnEnter = () => {
        setBdrRadius("20%");
    };
    const onLeave = () => {
        setBdrRadius("0%");
    };
    const buttonStyle2 = {
        borderRadius: bdrRadius2,
        height: "100px",
        width: "300px",
    };
    const OnEnter2 = () => {
        setBdrRadius2("20%");
    };
    const onLeave2 = () => {
        setBdrRadius2("0%");
    };

    const DelAcc = async(event) => {
        event.preventDefault();

        if (Pswrd === password && ctrW < 3) {
            const decide = window.confirm("Are you sure you want to delete your account? By proceeding, you agree to all the terms and conditions.");
        if(decide){
            alert("Your account has successfully been deleted.");
            await axios.post('http://localhost:3001/send-email', {
                email: email_id, 
                subject: 'Account Deletion Confirmation',
                message: 'Your account has been successfully deleted.',
              });
            setUsername("");
            setPassword("");
            setSQ1("");
            setSQ2("");
            setSQ3("");
            setAns1("");
            setAns2("");
            setAns3("");
            setphoneNo("");
            setEmailId("");
            navigate('/SignIn');
        }
        else{
            alert("Deletion Cancelled!");
        }
        }
        else  if (Pswrd !== password && ctrW <= 3){
            alert("Deletion Cancelled! Please enter the correct password.");
            setCtrW(ctrW+1);
         }
         else{
            alert("Deletion Cancelled! You have been logged out, due to security reasons.");
            setCtrW(0);
            await axios.post('http://localhost:3001/send-email', {
                email: email_id, 
                subject: 'Account Deletion Attempt',
                message: 'Your account has been attempted to be deleted. If it was not you, please report the incident to us',
              });
        
        
            setUsername("");
            setPassword("");
            setSQ1("");
            setSQ2("");
            setSQ3("");
            setAns1("");
            setAns2("");
            setAns3("");
            setphoneNo("");
            setEmailId("");
            navigate("/SignIn");
         }   
           
    };
    const clrscr = () => {
        setPswrd("");
    };

    const shouldDispClear = (Pswrd.length > 0);
    return (
        <div>
            <h1 align="center">Delete Account</h1>
            <hr color="black" />
            <br /><br />
            <h2 align="center">
            <form onSubmit={DelAcc}>
            <label>Please enter your current password:</label><br /><br /><br />
                    <input
                        type="password"
                        className="inputBox"
                        value={Pswrd}
                        onChange={handlePswrd}
                        maxLength={20}
                        minLength={3}
                        required
                        autoComplete="off"
                    /> <br /><br /><br />
                    <button
                        type="submit"
                        className="buttons"
                        style={buttonStyle}
                        onMouseEnter={OnEnter}
                        onMouseLeave={onLeave}
                    >
                        Delete Account
                    </button> <br /><br /> <br />
                    {shouldDispClear && (
                        <div>
                            <br />
                            <button
                                onClick={clrscr}
                                className="buttons"
                                style={buttonStyle2}
                                onMouseEnter={OnEnter2}
                                onMouseLeave={onLeave2}
                            >
                                Clear
                            </button>
                        </div>
                    )}

            </form>
            </h2>
        </div>
    );
}

export default DeleteAccount;