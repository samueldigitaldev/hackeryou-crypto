import React from 'react'
import {Link, withRouter} from 'react-router-dom'

const Footer = withRouter(({history, ...props}) => (
  <div>
    <footer>Footer</footer>
    <Link to='/contact'>Contact</Link>
  </div>
))

export default Footer
