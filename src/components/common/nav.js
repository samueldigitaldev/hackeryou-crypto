import React from 'react'
import {Link, withRouter} from 'react-router-dom'

const Nav = withRouter(({history, ...props}) => (

  <div>
      {console.log(props)}
    <ul>
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

      <li>
        <Link to='/contact'>Contact</Link>
      </li>
    </ul>
  </div>
))

export default Nav
