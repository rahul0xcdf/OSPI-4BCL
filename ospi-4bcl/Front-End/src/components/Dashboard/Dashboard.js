import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../SignIn/signIn.css";
import userIcon from "./IconUserNew.png";
import * as onz from 'onz-auth';

const auth = new onz.Auth({
    clientID: 'mfa-0124f1c6a0', // Replace with your client id
    containerID: 'myLoginDiv', // Optional, defaults to 'container'
    isIframe: false, // Optional, defaults to 'false'
});

const Dashboard = ({
    username, setUsername, setPassword, setSQ1, setSQ2, setSQ3,
    setAns1, setAns2, setAns3, setphoneNo, setEmailId
}) => {
    const [bdrRadius, setBdrRadius] = useState("0%");
    const [bdrRadius2, setBdrRadius2] = useState("0%");
    const [bdrRadius3, setBdrRadius3] = useState("0%");
    const [bdrRadius4, setBdrRadius4] = useState("0%");
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        // Redirect based on authentication status
        if (auth.isAuthenticated()) {
            updateUserTokens();
        } else {
            navigate('/Home');
        }

        auth.on("authenticated", () => {
            setIsLoggingIn(false);
            updateUserTokens();
        });

        auth.on("logged_out", () => {
            navigate('/Home');
        });

        auth.on("error", error => {
            alert(error);
            setIsLoggingIn(false);
        });
    }, []);

    const handleUpdatePassword = () => {
        if (auth.isAuthenticated()) {
            navigate('/Home/UpdatePassword');
        } else {
            handleLogin();
        }
    };

    const handleLogin = () => {
        setIsLoggingIn(true);
        auth.showLogin();
    };

    const handleLogout = () => {
        auth.logout();
    };

    const handleCancelLogin = () => {
        auth.close();
        setIsLoggingIn(false);
    };

    const updateUserTokens = () => {
        const accessToken = auth.getAccessToken();
        const accessTokenJwt = auth.getDecodedAccessToken();
        const idTokenJwt = auth.getDecodedIDToken();
        // Manage user tokens as needed
    };

    const buttonStyle = {
        borderRadius: bdrRadius,
        height: "80px",
        width: "200px",
        marginLeft: "30px",
    };

    const OnEnter = () => setBdrRadius("20%");
    const onLeave = () => setBdrRadius("0%");

    const buttonStyle2 = {
        borderRadius: bdrRadius2,
        height: "80px",
        width: "200px",
        marginLeft: "30px",
        marginRight: "50px",
        paddingRight: "50px",
        paddingLeft: "50px",
    };

    const OnEnter2 = () => setBdrRadius2("20%");
    const onLeave2 = () => setBdrRadius2("0%");

    const buttonStyle3 = {
        borderRadius: bdrRadius3,
        height: "80px",
        width: "200px",
        marginLeft: "30px",
    };

    const OnEnter3 = () => setBdrRadius3("20%");
    const onLeave3 = () => setBdrRadius3("0%");

    const buttonStyle4 = {
        borderRadius: bdrRadius4,
        height: "80px",
        width: "200px",
        marginRight: "30px",
    };

    const OnEnter4 = () => setBdrRadius4("20%");
    const onLeave4 = () => setBdrRadius4("0%");

    const DelAccount = () => {
        navigate('/Home/DeleteAccount');
    };

    const SignOut = () => {
        const decide = window.confirm("Are you sure you want to sign out?");
        if (decide) {
            alert("You have been successfully signed out.");
            resetUserData();
            navigate('/SignIn');
        } else {
            alert("Sign Out Cancelled!");
        }
    };

    const resetUserData = () => {
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
    };

    return (
        <div>
            <div id="myLoginDiv"></div>
            <h1 align="center">
                <img
                    src={userIcon}
                    alt="User Icon"
                    style={{ width: '50px', height: '50px', marginRight: '10px', verticalAlign: 'middle' }}
                />
                Welcome back,<br /> {username} !
            </h1>
            <hr color="black" />
            <br /><br /><br />
            <h2 align="left">
                <span style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <button className="buttons" style={buttonStyle} onMouseEnter={OnEnter} onMouseLeave={onLeave} onClick={handleUpdatePassword}>
                        Update Password
                    </button>
                    <br />
                    <span style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <button className="buttons" style={buttonStyle2} onMouseEnter={OnEnter2} onMouseLeave={onLeave2} onClick={DelAccount}>
                            Delete Account
                        </button>
                        <br />
                        <button className="buttons" style={buttonStyle4} onMouseEnter={OnEnter4} onMouseLeave={onLeave4} onClick={SignOut}>
                            Sign Out
                        </button>
                    </span>
                    <br />
                    <button className="buttons" style={buttonStyle3} onMouseEnter={OnEnter3} onMouseLeave={onLeave3} onClick={() => {
                        if (isLoggingIn) {
                            handleCancelLogin();
                            return;
                        }
                        if (auth.isAuthenticated()) {
                            handleLogout();
                        } else {
                            handleLogin();
                        }
                    }}>
                        {isLoggingIn ? 'Authenticating' : (auth.isAuthenticated() ? 'Unauthenticate' : 'Authenticate')}
                    </button>
                </span>
            </h2>
        </div>
    );
}

export default Dashboard;
