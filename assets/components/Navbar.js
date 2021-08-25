import React, {Component} from 'react';
import {Route, Switch,Redirect, Link, withRouter} from 'react-router-dom';
    
class Navbar extends Component {   
    render() {
        return (
           <nav className="navbar">
               <h1><a href="/">SmolCRM</a></h1>
               <div className="links">
                   <a href="/administration">Administration</a>
                   <a href="/notes">Notes</a>
                   <a href="/user">User page</a>
               </div>
           </nav>
        )
    }
}
    
export default Navbar;