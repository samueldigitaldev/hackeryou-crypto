import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Nav extends Component{

    render(){
        return(
            <div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/signin">Sign In</Link></li>
                </ul>
            </div>
        )
    }
}

export default Nav;