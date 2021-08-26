import React from 'react';
import { useEffect, useState } from "react";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


const UserCRUD = () => {
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
  }

  const createUser = (e) => {
    e.preventDefault();
    


  }

  return (
    <div className="user-crud">
      <h3>User</h3>
    <Tabs>
      <TabList>
        <Tab>Add</Tab>
        <Tab>Edit</Tab>
        <Tab>Find</Tab>
        <Tab>Delete</Tab>
      </TabList>

      <TabPanel>
          <form onSubmit={handleSubmit}>
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
        <form onSubmit={handleSubmit}>
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
            <button>Edit user</button>
          </form>
        </TabPanel>
        <TabPanel>
        <form onSubmit={handleSubmit}>
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
        <form onSubmit={handleSubmit}>
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
  );
}
 
export default UserCRUD;
