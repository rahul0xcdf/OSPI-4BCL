


import React, { useState } from 'react';
import SignIn from "./SignIn/SignIn";
import SecQues from "./SignIn/SecQues";
import PhoneNumVer from "./SignIn/PhoneNumVer";

const App = () => {
<<<<<<< HEAD
  const [ffa, setFfa] = useState(false); // sign in
  const [sfa, setSfa] = useState(true); // sec ques
  const [tfa, setTfa] = useState(true); // phone num
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
=======
  const [ffa, setFfa] = useState(false);
  const [sfa, setSfa] = useState(true);
  const [tfa, setTfa] = useState(true);
  const [userName, setUsnm] = useState("");
  const [password, setPswrd] = useState("");
>>>>>>> f8aec1b854a969991c9248839c0eb012507e7aab
  const [SQ1, setSQ1] = useState("");
  const [SQ2, setSQ2] = useState("");
  const [SQ3, setSQ3] = useState("");
  const [ans1, setAns1] = useState("");
  const [ans2, setAns2] = useState("");
  const [ans3, setAns3] = useState("");
<<<<<<< HEAD
  const [phone_no, setphoneNo] = useState("");

  return (
    <div>
      {ffa !== true && <SignIn setFfa={setFfa} setSfa={setSfa} setUsername = {setUsername} setPassword = {setPassword} setSQ1 = {setSQ1} setSQ2 = {setSQ2}
      setSQ3 = {setSQ3} setAns1 = {setAns1}  setAns2 = {setAns2} setAns3 = {setAns3} setphoneNo = {setphoneNo}/>}
      {sfa !== true && <SecQues setSfa={setSfa} setTfa={setTfa} Q1 = {SQ1} SQ2 = {SQ2} SQ3 = {SQ3} ans1 = {ans1} ans2 = {ans2} ans3 = {ans3}/>}
      {tfa !== true && <PhoneNumVer setTfa={setTfa} phone_no = {phone_no}/>}
=======
  const [phNo, setPhNo] = useState("");

  return (
    <div>
      {ffa !== true && <SignIn setFfa={setFfa} setSfa = {setSfa} setUsnm = {setUsnm} setPswrd = {setPswrd} setSQ1 = {setSQ1} setSQ2 = {setSQ2}
      setSQ3 = {setSQ3} setAns1 = {setAns1}  setAns2 = {setAns2} setAns3 = {setAns3} setPhNo = {setPhNo}/>}
      {sfa !== true && <SecQues setSfa={setSfa} setTfa = {setTfa} SQ1 = {SQ1} SQ2 = {SQ2} SQ3 = {SQ3}
      ans1 = {ans1} ans2 = {ans2} ans3 = {ans3}/>}
      {tfa !== true && <PhoneNumVer setTfa={setTfa} phNo = {phNo}/>}
>>>>>>> f8aec1b854a969991c9248839c0eb012507e7aab
    </div>
  );
}

export default App;

