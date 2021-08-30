import React, {Component} from 'react';
import {Route, Switch,Redirect, Link, withRouter, NavLink} from 'react-router-dom';
    
class Navbar extends Component {   
    render() {
        return (
           <nav className="navbar">
               <h1><Link to="/" >SmolCRM</Link></h1>
               <div className="links">
                   <NavLink to="/administration" activeClassName="active">Administration</NavLink>
                   <NavLink to="/notes" activeClassName="active">Notes</NavLink>
                   <NavLink to="/user" activeClassName="active">User page</NavLink>
               </div>
           </nav>
        )
    }
}
    
export default Navbar;