import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import "../SignIn/signIn.css";
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';



const UpdatePswrd = ({ setPassword, password }) => {
    const [oldPswrd, setOldPswrd] = useState("");
    const [newPswrd1, setNewPswrd1] = useState("");
    const [newPswrd2, setNewPswrd2] = useState("");
    const [bdrRadius, setBdrRadius] = useState("0%");
    const [bdrRadius2, setBdrRadius2] = useState("0%");
    const [message, setMessage] = useState("");



    //const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
    const navigate = useNavigate();

/*
    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated) {
                loginWithRedirect(); // Redirects to Auth0 login page
            }
        }
    }, [isAuthenticated, isLoading, loginWithRedirect]);
*/
    const handleOldPswrd = (event) => {
        setOldPswrd(event.target.value);
    };
    const handleNewPswrd1 = (event) => {
        setNewPswrd1(event.target.value);
    };
    const handleNewPswrd2 = (event) => {
        setNewPswrd2(event.target.value);
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


    const ChangePassword = async(event) => {
        event.preventDefault();

        if (oldPswrd === password) {
            if (newPswrd1 === newPswrd2) {
                if (oldPswrd !== newPswrd1) {
                try {
                    // Call the API to update the password
                    const response = await axios.put('http://localhost:3001/updatePassword', {
                        //username: username?.sub, // Use user ID or username as per your implementation
                        oldPswrd,
                        newPswrd1
                    });



                    if (response.status === 200) {
                        setPassword(newPswrd1);
                        setMessage("You have successfully changed your password!");
                    } else {
                        setMessage("Password change was unsuccessful! Please try again.");
                    }
                } catch (error) {
                    console.error("Error updating password:", error);
                    setMessage("An error occurred while updating the password.");
                }
            } else {
                setMessage("Password change was unsuccessful! New password must be different from the current one.");
            }
        } else {
            setMessage("Password change was unsuccessful! Please ensure that both the new password columns have the same content.");
        }
    

        navigate('/Home');
    };

    const clrscr = () => {
        setOldPswrd("");
        setNewPswrd1("");
        setNewPswrd2("");
    };

    const shouldDispClear = (oldPswrd.length > 0 || newPswrd1.length > 0 || newPswrd2.length > 0);

    return (
        <div>
            <h1 align="center">Change Password</h1>
            <hr color="black" />
            <br /><br />
            <h2 align="center">
                <form onSubmit={ChangePassword}>
                    <label>Please enter your current password:</label><br />
                    <input
                        type="password"
                        className="inputBox"
                        value={oldPswrd}
                        onChange={handleOldPswrd}
                        maxLength={20}
                        minLength={3}
                        required
                        autoComplete="off"
                    /> <br /><br />
                    <label>Please enter your new password:</label><br />
                    <input
                        type="password"
                        className="inputBox"
                        value={newPswrd1}
                        onChange={handleNewPswrd1}
                        maxLength={20}
                        minLength={3}
                        required
                        autoComplete="off"
                    /><br /><br />
                    <label>Please re-enter your new password:</label><br />
                    <input
                        type="password"
                        className="inputBox"
                        value={newPswrd2}
                        onChange={handleNewPswrd2}
                        maxLength={20}
                        minLength={3}
                        required
                        autoComplete="off"
                    /> <br /><br />
                    <button
                        type="submit"
                        className="buttons"
                        style={buttonStyle}
                        onMouseEnter={OnEnter}
                        onMouseLeave={onLeave}
                    >
                        Change Password
                    </button>
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
            {message && <p style={{ marginTop: '10px' }}>{message}</p>}
        </div>
    );
    };
};
export default UpdatePswrd;
