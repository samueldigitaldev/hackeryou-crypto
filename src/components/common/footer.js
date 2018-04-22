import React from 'react'
import {Link, withRouter} from 'react-router-dom'

const Footer = withRouter(({history, ...props}) => (
  <footer class="page-footer black">
    <div class="footer-copyright">
      
        © 2018 Copyright Sam
        {/* <Link to='/contact'>Contact</Link> */}
      
    </div>
</footer> 
))

export default Footer
