import React from 'react'
import {Link} from 'react-router-dom'

import About from './about'

const Home = () => {
  return (
    <div>

      <About />
      <div><Link to='/contact'>Contact Us</Link></div>

    </div>

  )
}

export default Home
