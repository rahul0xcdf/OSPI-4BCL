


import React, { useState } from 'react';
import SignIn from "./SignIn/SignIn";
import SecQues from "./SignIn/SecQues";
import PhoneNumVer from "./SignIn/PhoneNumVer";
import Dashboard from "./Dashboard/Dashboard";
import UpdatePswrd from "./Dashboard/UpdatePswrd";
import EmailOTP from "./SignIn/EmailOTP";
import SignUp from "./SignUp/SignUp";

const App = () => {


  //sign up values
  /*
  const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [passwrd, setPasswrd] = useState('');//changed variable to not have conflicts
    const [selectedQuestions, setSelectedQuestions] = useState(['', '', '']);
    const [answers, setAnswers] = useState(['', '', '']);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    */
    //sign up details

  const [ffa, setFfa] = useState(false); // sign in
  const [sfa, setSfa] = useState(true); // sec ques
  const [tfa, setTfa] = useState(true); // phone num
  const [otpa,setOtpA] = useState(true);
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
  const [dbd,setDbd] = useState(true);
  const [updt,setUpdt] = useState(true);
  const [signUp,setSignUp] = useState(true);

  return (
    <div>
      {(ffa !== true && ctrF < 3) && <SignIn setSignUp = {setSignUp} setFfa={setFfa} setSfa={setSfa} setUsername = {setUsername} setPassword = {setPassword} setSQ1 = {setSQ1} setSQ2 = {setSQ2}
      setSQ3 = {setSQ3} setAns1 = {setAns1}  setAns2 = {setAns2} setAns3 = {setAns3} setphoneNo = {setphoneNo} setEmailId = {setEmailId} ctrF = {ctrF} setCtrF = {setCtrF}/>}
      {(sfa !== true && ctrS < 3) && <SecQues setSfa={setSfa} setTfa={setTfa} Q1 = {SQ1} SQ2 = {SQ2} SQ3 = {SQ3} ans1 = {ans1} ans2 = {ans2} ans3 = {ans3} ctrS = {ctrS} setCtrS = {setCtrS}/>}
      {(tfa !== true && ctrT < 3) && <PhoneNumVer setTfa={setTfa} setOtpA = {setOtpA} phone_no = {phone_no} ctrT = {ctrT} setCtrT = {setCtrT}/>}
      {otpa !== true && <EmailOTP setOtpA = {setOtpA} setDbd = {setDbd} email_id = {email_id}/>}
      {dbd !== true && <Dashboard setDbd = {setDbd} setUpdt = {setUpdt} username = {username}/>}
      {updt !== true && <UpdatePswrd setDbd = {setDbd} setUpdt = {setUpdt} setPassword = {setPassword} password = {password}/>}
      {signUp !== true && <SignUp setSignUp = {setSignUp} setFfa={setFfa}/>}
  </div>
  );
}

export default App;

