import React from 'react';
import { useEffect, useState } from "react";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { get, makeRequest } from '../functions/requests';
import NoteTable from './NoteTable';

const NoteCRUD = () => {

  const url = "http://localhost:8000/api/notes/";

  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  

  const [findTableData, setFindTableData] = useState(null);

  const [isUpdateFormActive, setIsUpdateFormActive] = useState(false);

  function setNoteInfo({title, content}) {
    setTitle(title);
    setContent(content);
  }

  function resetState() {
    setId("");
    setTitle("");
    setContent("");
    setFindTableData(null);
    setIsUpdateFormActive(false);
  }

  const create = (e) => {
    e.preventDefault();

    let data = {
      title: title,
      content: content,
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

  const find = (e) => {
    e.preventDefault();

    let data = {
      id: id
    }
    
    get(`${url}${data.id}`)
    .then((response) => {
      console.log(response.status);
      if (!response.ok) {
          throw new Error("HTTP status " + response.status);
      }
      return response.json()
    })
    .then((responseData) => {
      setFindTableData(responseData);
    });   
  }

  const deleteNote = (e) => {
    e.preventDefault();

    let data = {
        id: id
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

    get(`${url}${id}`)
    .then((response) => {
      console.log(response.status);
      if (!response.ok) {
          throw new Error("HTTP status " + response.status);
      }
      return response.json()
    })
    .then((responseData) => {
      setIsUpdateFormActive(true);
      setNoteInfo(responseData[0]);
    });
  }

  const update = (e) => {
    e.preventDefault();

    let data = {
        id: id,
        title: title,
        content: content
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
        <h3>Note</h3>
      <Tabs>
        <TabList>
          <Tab>Add</Tab>
          <Tab>Edit</Tab>
          <Tab>Find</Tab>
          <Tab>Delete</Tab>
        </TabList>

        <TabPanel>
            <form onSubmit={create}>
              <label>Note title:</label>
              <input 
                type="text" 
                required 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              /> 
              <label>Note content:</label>
              <textarea 
                required 
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />    
              <button>Add note</button>
            </form>
          </TabPanel>
          <TabPanel>
            {!isUpdateFormActive && <form onSubmit={prepareForUpdate}>
              <label>Note Id:</label>
              <input 
                type="text" 
                required 
                value={id}
                onChange={(e) => setId(e.target.value)}
              />       
              <button>Find</button>
            </form> }

            {isUpdateFormActive && <form onSubmit={update}>
              <label>New note title:</label>
              <input 
                type="text" 
                required 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              /> 
              <label>New note content:</label>
              <textarea 
                required 
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />    
              <button>Edit note</button>
            </form> }
          </TabPanel>
          <TabPanel>
            <form onSubmit={find}> 
                <label>Note Id:</label>
                <input 
                    type="text" 
                    required 
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />       
                <button>Find</button>
            </form>
          </TabPanel>
          <TabPanel>
            <form onSubmit={deleteNote}>
                <label>Note Id:</label>
                <input 
                    type="text" 
                    required 
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />       
                <button>Delete</button>
            </form>
          </TabPanel>
        </Tabs>
      
      </div>
        <div className="flex-column">
            {findTableData && findTableData[0] && 
              <div className="table-wrapper">
                <h3 className="h3-table">Note found</h3>
                <table className="st-table">            
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Content</th>
                        </tr>
                    </thead>
                    <tbody>
                      <tr key={findTableData[0].id}>
                          <td>{findTableData[0].id}</td>
                          <td>{findTableData[0].title}</td>
                          <td>{findTableData[0].content}</td>

                      </tr>
                    </tbody>      
                </table>
            </div> 
            }
          <NoteTable />
      </div>
    </div>
  );
}
 
export default NoteCRUD;