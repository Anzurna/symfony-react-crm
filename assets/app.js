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
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './styles/app.css';
import Navbar from './components/Navbar';
import UserTable from './components/UserTable';
import NoteTable from './components/NoteTable';
    
ReactDOM.render(
    <Router>
       
        <div className='app'>
            
            <div className="content">
            <Navbar />
                <Switch>
                    <Route exact path="/">
                    
                    </Route>
                    <Route exact path="/administration">
                        <UserTable />
                    </Route>
                    <Route exact path="/notes">
                        <NoteTable />
                    </Route>
                    <Route exact path="/user">

                    </Route>

                </Switch>     
            </div>
            <footer className="footer">
                <div class="footer-content">
                ©2021 <i class="fas fa-bicycle"></i>
                </div>

            
            </footer>
        </div>
    </Router>, 
    document.getElementById('root')
);