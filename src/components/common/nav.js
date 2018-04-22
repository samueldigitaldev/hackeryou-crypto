import React from 'react'
import {Link, withRouter} from 'react-router-dom'

const Nav = withRouter(({history, ...props}) => (
  <div>
    <nav class="teal lighten-2">
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li>
          <Link to='/'>Home</Link>
        </li>
        {props.signedIn ? '' : <li><Link to='/signup'>Sign Up</Link></li>}
        {props.signedIn ? '' : <li><Link to='/signin'>Sign In</Link></li>}
        <li
          onClick={() => { history.push(`/${props.redirect}`) }}
        >
          <Link to='/dashboard'>Dashboard</Link>
        </li>

        {props.signedIn ? <li onClick={props.logOut}><Link to='/'>Log Out</Link></li> : ''}
      </ul>
    </nav>
  </div>
))

export default Nav
