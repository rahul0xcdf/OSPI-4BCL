


import React, { useState } from 'react';
import SignIn from "./SignIn/SignIn";
import SecQues from "./SignIn/SecQues";
import PhoneNumVer from "./SignIn/PhoneNumVer";

const App = () => {

  const [ffa, setFfa] = useState(false); // sign in
  const [sfa, setSfa] = useState(true); // sec ques
  const [tfa, setTfa] = useState(true); // phone num
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  ;

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

  </div>
=======
  const [phNo, setPhNo] = useState("");
  const [ctrF,setCtrF] = useState(0);
  const [ctrS,setCtrS] = useState(0);
  const [ctrT,setCtrT] = useState(0);

  return (
    <div>
      {(ffa !== true && ctrF < 3) && <SignIn setFfa={setFfa} setSfa = {setSfa} setUsnm = {setUsnm} setPswrd = {setPswrd} setSQ1 = {setSQ1} setSQ2 = {setSQ2}
      setSQ3 = {setSQ3} setAns1 = {setAns1}  setAns2 = {setAns2} setAns3 = {setAns3} setPhNo = {setPhNo} ctrF = {ctrF} setCtrF = {setCtrF}/>}
      {(sfa !== true && ctrS < 3) && <SecQues setSfa={setSfa} setTfa = {setTfa} SQ1 = {SQ1} SQ2 = {SQ2} SQ3 = {SQ3}
      ans1 = {ans1} ans2 = {ans2} ans3 = {ans3} ctrS = {ctrS} setCtrS = {setCtrS}/>}
      {(tfa !== true && ctrT < 3) && <PhoneNumVer setTfa={setTfa} phNo = {phNo} ctrT = {ctrT} setCtrT = {setCtrT}/>}
    </div>
>>>>>>> d93d3762fe87e3207d72d9b90ed517c527ef274e
  );
}

export default App;

