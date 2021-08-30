import React from 'react';
import { useEffect, useState } from "react";

import { get, makeRequest } from '../functions/requests';
import UserTable from './UserTable';


const UserPageCRUD = () => {

  const url = "http://localhost:8000/api/users/";

  const [email, setEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [login, setLogin] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');

  const [findTableData, setFindTableData] = useState(null);

  const [isUpdateFormActive, setIsUpdateFormActive] = useState(false);

  function setCredentials({email, login, firstname, lastname}) {
    setEmail(email);
    setFirstname(firstname);
    setLastname(lastname);
    setLogin(login);
  }

  function resetState() {
    setEmail("");
    setFirstname("");
    setLastname("");
    setLogin("");
    setPassword("");
    setNewEmail("");
    setFindTableData(null);
    setIsUpdateFormActive(false);
  }

  const prepareForUpdate = (e) => {
    e.preventDefault();

    get(`${url}${email}`)
    .then((response) => {
      console.log(response.status);
      if (!response.ok) {
          throw new Error("HTTP status " + response.status);
      }
      return response.json()
    })
    .then((responseData) => {
      setIsUpdateFormActive(true);
      console.log(responseData);
      setCredentials(responseData[0]);
    });
  }

  const updateUser = (e) => {
    e.preventDefault();

    let data = {
      curr_email: email,
      new_email: newEmail,
      login: login,
      firstname: firstname,
      lastname: lastname
    }
    
    makeRequest(`${url}update`, data, "PUT")
    .then((response) => {
      console.log(response.status);
      if (!response.ok) {
          throw new Error("HTTP status " + response.status);
      }
      resetState();
    })
  }

  return (
    <div className="flex-row">
      <div className="crud">
        <h3>User</h3>
        { !isUpdateFormActive && <form onSubmit={prepareForUpdate}>
          <label>User email:</label>
          <input 
            type="text" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />       
          <button>Find user</button>
        </form> 
        }

        { isUpdateFormActive && <form onSubmit={updateUser}>
          <label>Enter new login:</label>
          <input 
            type="text" 
            required 
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          /> 
          <label>Enter new email:</label>
          <input 
            type="text" 
            required 
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          /> 
          <label>Enter new firstname:</label>
          <input 
            type="text" 
            required 
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          /> 
          <label>Enter new lastname:</label>
          <input 
            type="text" 
            required 
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />  
          <button>Edit user</button>
        </form> 
        }       
      </div>     
  </div>
  );
}
 
export default UserPageCRUD;
