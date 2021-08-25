/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
// start the Stimulus application
import './bootstrap';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/app.css';
import Navbar from './components/Navbar';
import UserTable from './components/UserTable';
    
ReactDOM.render(
    <Router>
        <Navbar />
        <UserTable />
    </Router>, 
    document.getElementById('root')
);