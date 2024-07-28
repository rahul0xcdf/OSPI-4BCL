import React, { useState } from 'react';
import './SignIn/signIn.css';
import errorGIF from './error_404.gif';

const Error = () =>{
    return (
        <div>
            <h1 align = "center" color = "red">
                Page not found!
                <br></br>
                <img src = {errorGIF} alt="404 Error GIF" style = {{width: '400px', height: '400px'}}/>
            </h1>
        </div>
    );
};

export default Error;