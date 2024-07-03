import React, { useState } from 'react';
import SignIn from "./SignIn/SignIn";
import SecQues from "./SignIn/SecQues";
import PhoneNumVer from "./SignIn/PhoneNumVer";

const App = () => {
  const [ffa, setFfa] = useState(false);
  const [sfa, setSfa] = useState(true);
  const [tfa, setTfa] = useState(true);

  return (
    <div>
      {ffa !== true && <SignIn setFfa={setFfa} setSfa = {setSfa}/>}
      {sfa !== true && <SecQues setSfa={setSfa} setTfa = {setTfa}/>}
      {tfa !== true && <PhoneNumVer setTfa={setTfa} />}
    </div>
  );
}

export default App;

