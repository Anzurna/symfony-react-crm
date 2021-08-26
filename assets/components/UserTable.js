import React from 'react';
import { useEffect, useState } from "react";

const UserTable = () => {
    const [data, setData] = useState(null);

    const fetchAllUsers = () => {
        fetch("http://localhost:8000/api/users")
            .then(response => {
                console.log(response)
                return response.json();
            })
            .then(data => {
                setData(data);            
        })
    }

    useEffect(() => {
        fetchAllUsers();
        
        let timer1 = setInterval(() =>        
            fetchAllUsers(), 5000);
        
    }, []);
    return (  
            <div className="table-wrapper">
                <h3 className="h3-table">All users</h3>
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
                        {data && data.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.login}</td>
                                <td>{user.email}</td>
                                <td>{user.firstname}</td>
                                <td>{user.lastname}</td>
                            </tr>
                        ))}
                    </tbody>      
                </table>
            </div>                
    );
}
 
export default UserTable;
