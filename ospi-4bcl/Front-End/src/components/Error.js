import React, { useState } from 'react';
import './SignIn/signIn.css';
import errorGIF from './error_404.gif';

const Error = () =>{
    return (
        <div>
            <h1 align = "center" color = "red">
                404<br></br>Page not found!
                <br></br>
                <img src = {errorGIF} alt="404 Error GIF"/>
            </h1>
        </div>
    );
};

export default Error;