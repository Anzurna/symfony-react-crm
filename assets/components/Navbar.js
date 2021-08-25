import React, {Component} from 'react';
import {Route, Switch,Redirect, Link, withRouter} from 'react-router-dom';
    
class Navbar extends Component {   
    render() {
        return (
           <nav className="navbar">
               <h1><Link to="/">SmolCRM</Link></h1>
               <div className="links">
                   <Link to="/administration">Administration</Link>
                   <Link to="/notes">Notes</Link>
                   <Link to="/user">User page</Link>
               </div>
           </nav>
        )
    }
}
    
export default Navbar;