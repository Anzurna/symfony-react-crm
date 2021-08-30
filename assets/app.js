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
import './styles/app.scss';
import Navbar from './components/Navbar';
import UserCRUD from './components/UserCRUD';
import Footer from './components/Footer';
import NoteCRUD from './components/NoteCRUD';
import SignIn from './components/SignIn';
import UserPageCRUD from './components/UserPageCRUD';
    
ReactDOM.render(
    <Router>
       
        <div className='app'>
        <Navbar />
            <div className="content">
            
                <Switch>
                    <Route exact path="/">
                        <SignIn />
                    </Route>
                    <Route exact path="/administration">
                        <UserCRUD />     
                        <NoteCRUD />                     
                    </Route>
                    <Route exact path="/notes">
                        <NoteCRUD /> 
                    </Route>
                    <Route exact path="/user">
                        <UserPageCRUD />
                    </Route>

                </Switch>     
            </div>
            <Footer />
        </div>
    </Router>, 
    document.getElementById('root')
);