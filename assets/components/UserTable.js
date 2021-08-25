import React from 'react';
import { useEffect, useState } from "react";

const UserTable = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8000/users")
        .then(response => {
            return response.json();
        })
        .then(data => {
            setData(data);            
        })

    }, []);
    return (  
        
            <table className="user-table ">
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
        
    );
}
 
export default UserTable;
