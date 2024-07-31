import React, { useState } from 'react';
import SignIn from "./SignIn/SignIn";
import SecQues from "./SignIn/SecQues";
import PhoneNumVer from "./SignIn/PhoneNumVer";
import Dashboard from "./Dashboard/Dashboard";
import UpdatePswrd from "./Dashboard/UpdatePswrd";
import DeleteAccount from "./Dashboard/DeleteAccount";
//import PhoneOTP from "./SignIn/PhoneOTP";
import SignUp from "./SignUp/SignUp";
import Error from "./Error";
import PhoneOTP from "./otp_page"
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { Auth0ProviderWithNavigate } from "../auth0-provider-with-navigate";

const App = () => {


  
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [SQ1, setSQ1] = useState("");
  const [SQ2, setSQ2] = useState("");
  const [SQ3, setSQ3] = useState("");
  const [ans1, setAns1] = useState("");
  const [ans2, setAns2] = useState("");
  const [ans3, setAns3] = useState("");
  const [ctrF,setCtrF] = useState(0);
  const [ctrS,setCtrS] = useState(0);
  const [ctrT,setCtrT] = useState(0);
  const [phone_no, setphoneNo] = useState("");
  const [email_id, setEmailId] = useState("");
  

  return (
    <Router>
    
      <Routes>
      <Route path = "/SignIn" element = {(ctrF < 3 && <SignIn setUsername = {setUsername} setPassword = {setPassword} setSQ1 = {setSQ1} setSQ2 = {setSQ2}
      setSQ3 = {setSQ3} setAns1 = {setAns1}  setAns2 = {setAns2} setAns3 = {setAns3} setphoneNo = {setphoneNo} setEmailId = {setEmailId} ctrF = {ctrF} setCtrF = {setCtrF}/>) || (ctrF >= 3 && <Error />)}/>
      <Route path = "/SecurityQuestions" element = {((ctrS < 3 && username !== "") && <SecQues SQ1 = {SQ1} SQ2 = {SQ2} SQ3 = {SQ3} ans1 = {ans1} ans2 = {ans2} ans3 = {ans3} ctrS = {ctrS} setCtrS = {setCtrS}/>)|| ((username === "" || ctrS >= 3) && <Error />)}/>
     // <Route path = "/MobileNumberVerification" element = {((ctrT < 3 && username !== "") && <PhoneNumVer phone_no = {phone_no} ctrT = {ctrT} setCtrT = {setCtrT}/>) || ((username === "" || ctrT >= 3) && <Error />)}/>
      <Route path = "/MobileNumberOTP" element = {(username !== "" && <PhoneOTP />) || (username === "" && <Error />)}/>
      <Route path="/Home" element={
              (username !== "" ? <Dashboard username={username} setUsername = {setUsername} setPassword = {setPassword} setSQ1 = {setSQ1} setSQ2 = {setSQ2}
                setSQ3 = {setSQ3} setAns1 = {setAns1}  setAns2 = {setAns2} setAns3 = {setAns3} setphoneNo = {setphoneNo} setEmailId = {setEmailId}/> : <Error />)
            }/>
      <Route path = "/Home/UpdatePassword" element = {( <UpdatePswrd setPassword = {setPassword} password = {password}/>) || (username === "" && <Error />)}/>
      <Route path = "/Home/DeleteAccount" element = {( <DeleteAccount setUsername = {setUsername} setPassword = {setPassword} setSQ1 = {setSQ1} setSQ2 = {setSQ2}
      setSQ3 = {setSQ3} setAns1 = {setAns1}  setAns2 = {setAns2} setAns3 = {setAns3} setphoneNo = {setphoneNo} setEmailId = {setEmailId} password = {password}/>) || (username === "" && <Error />)}/>
      <Route path = "/SignUp" element = {<SignUp/>}/>
      </Routes>
  
  </Router>
  );
}

export default App;
