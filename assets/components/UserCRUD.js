import React from 'react';
import { useEffect, useState } from "react";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { get, makeRequest } from '../functions/requests';
import UserTable from './UserTable';


const UserCRUD = () => {

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


  const createUser = (e) => {
    e.preventDefault();

    let data = {
      email: email,
      login: login,
      firstname: firstname,
      lastname: lastname,
      password: password
    }
    
    makeRequest(`${url}create`, data, "POST")
    .then((response) => {
      console.log(response.status);
      if (!response.ok) {
          throw new Error("HTTP status " + response.status);
      }
      resetState();
    })
  }

  const findUser = (e) => {
    e.preventDefault();

    let data = {
      email: email
    }
    
    get(`${url}${data.email}`)
    .then((response) => {
      console.log(response.status);
      if (!response.ok) {
          throw new Error("HTTP status " + response.status);
      }
      return response.json()
    })
    .then((responseData) => {
      setFindTableData(responseData);
      console.log(responseData)
    });   
  }

  const deleteUser = (e) => {
    e.preventDefault();

    let data = {
      email: email,
    }
    
    makeRequest(`${url}delete`, data, "DELETE")
    .then((response) => {
      console.log(response.status);
      if (!response.ok) {
          throw new Error("HTTP status " + response.status);
      }
      resetState();
    })
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
      <Tabs>
        <TabList>
          <Tab>Add</Tab>
          <Tab>Edit</Tab>
          <Tab>Find</Tab>
          <Tab>Delete</Tab>
        </TabList>

        <TabPanel>
            <form onSubmit={createUser}>
              <label>User Login:</label>
              <input 
                type="text" 
                required 
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              /> 
              <label>User Email:</label>
              <input 
                type="text" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              /> 
              <label>User Firstname:</label>
              <input 
                type="text" 
                required 
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              /> 
              <label>User Lastname:</label>
              <input 
                type="text" 
                required 
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />  
              <label>User Password:</label>
              <input 
                type="text" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />      
              <button>Add user</button>
            </form>
          </TabPanel>
          <TabPanel>
            {!isUpdateFormActive && <form onSubmit={prepareForUpdate}>
              <label>User email:</label>
              <input 
                type="text" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />       
              <button>Find user</button>
            </form> }

            {isUpdateFormActive && <form onSubmit={updateUser}>
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
            </form> }
          </TabPanel>
          <TabPanel>
          <form onSubmit={findUser}>
              <label>User email:</label>
              <input 
                type="text" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />       
              <button>Find user</button>
            </form>
          </TabPanel>
          <TabPanel>
          <form onSubmit={deleteUser}>
              <label>User email:</label>
              <input 
                type="text" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />       
              <button>Delete user</button>
            </form>
          </TabPanel>
        </Tabs>
      
      </div>
        <div className="flex-column">
            {findTableData && findTableData[0] && 
              <div className="table-wrapper">
                <h3 className="h3-table">User found</h3>
                <table className="st-table">            
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Login</th>
                            <th>Email</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                        </tr>
                    </thead>
                    <tbody>
                      <tr key={findTableData[0].id}>
                          <td>{findTableData[0].id}</td>
                          <td>{findTableData[0].login}</td>
                          <td>{findTableData[0].email}</td>
                          <td>{findTableData[0].firstname}</td>
                          <td>{findTableData[0].lastname}</td>
                      </tr>
                    </tbody>      
                </table>
            </div> 
            }
          <UserTable />
      </div>
    </div>
  );
}
 
export default UserCRUD;
