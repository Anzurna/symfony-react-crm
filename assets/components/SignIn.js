import React from 'react';
import { useEffect, useState } from "react";
import { browserHistory } from 'react-router';

import { get, makeRequest } from '../functions/requests';


const SignIn = () => {

  const url = "http://localhost:8000/auth";

  const [authEmail, setEmail] = useState('');
  const [authPass, setPassword] = useState('');

  function resetState() {
    setEmail("");
    setPassword("");
  }

  const signIn = (e) => {
    e.preventDefault();

    let data = {
      email: authEmail,
      password: authPass
    }
    
    makeRequest(`${url}`, data, "POST")
    .then((response) => {
      console.log(response.status);
      if (!response.ok) {
        resetState();
          throw new Error("HTTP status " + response.status);
      } else {
        window.location.href = 'http://localhost:8000/administration';
      }

    });   
}


  return (
    <div className="flex-row">
      <div className="crud">
        <h3>Sign In</h3>
          <form onSubmit={signIn}>
            <label>User Email:</label>
            <input 
              type="text" 
              required 
              value={authEmail}
              onChange={(e) => setEmail(e.target.value)}
            /> 
            <label>User Password:</label>
            <input 
              type="password" 
              required 
              value={authPass}
              onChange={(e) => setPassword(e.target.value)}
            />      
            <button>Sing In</button>
          </form>        
      </div>
    </div>
  );
}
 
export default SignIn;
