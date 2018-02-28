import React, {Component} from 'react'
import { Route } from 'react-router-dom'

import Home from '../common/home'
import Signup from '../containers/signup'
import Signin from '../containers/signin'
import Contact from '../common/contact'

class Layout extends Component {
  render () {
    return (
      <div>
        <Route exact path='/' component={Home} />
        <Route path='/signup' component={Signup} />
        <Route path='/signin' component={Signin} />
        <Route path='/contact' component={Contact} />
      </div>
    )
  }
}

export default Layout
