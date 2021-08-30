import React from 'react';
import { useEffect, useState } from "react";

const NoteTable = () => {
    const [data, setData] = useState(null);

    const fetchAllNotes = () => {
        fetch("http://localhost:8000/api/notes")
            .then(response => {
                console.log(response)
                return response.json();
            })
            .then(data => {
                setData(data);            
        })
    }

    useEffect(() => {

        fetchAllNotes();
        
        let refresh_interval = 5000;

        let timer1 = setInterval(() =>        
            fetchAllNotes(), refresh_interval);
        
    }, []);
    return (  
            <div className="table-wrapper">
                <h3 className="h3-table">All notes</h3>
                <table className="st-table">            
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Content</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map(note => (
                            <tr key={note.id}>
                                <td>{note.id}</td>
                                <td>{note.title}</td>
                                <td>{note.content}</td>
                            </tr>
                        ))}
                    </tbody>      
                </table>
            </div>                
    );
}
 
export default NoteTable;
