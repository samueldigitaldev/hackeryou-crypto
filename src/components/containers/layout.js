import React, {Component} from 'react'
import { Route } from 'react-router-dom'

import Home from '../common/home'
import Signup from '../containers/signup'
import Signin from '../containers/signin'
import Contact from '../common/contact'
import Dashboard from '../containers/dashboard'

import Nav from '../common/nav'
import Footer from '../common/footer'
import axios from 'axios'

class Layout extends Component {
  constructor () {
    super()
    this.state = {
      signedIn: false,
      redirect: 'signin',
      token: ''
    }
  }

  componentWillMount () {
    const {token} = localStorage
    if (token) {
      axios.get(`/authorize`, {
        headers: {
          'Authorization': token
        }
      })
        .then((response) => {
          const {data} = response

          this.setState({
            signedIn: data.signedIn
          })
          const {signedIn} = this.state
          console.log(signedIn)
          if (signedIn) {
            this.setState({
              redirect: 'dashboard'
            })
          } else {
            this.setState({
              redirect: 'signin'
            })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }

  // updateToken = () => {
  //   const {token} = localStorage
  //   this.setState({
  //     token
  //   })
  //   console.log(this.state.token)
  //   this.forceUpdate()
  // }

  render () {
    return (
      <div>
        <Nav
          signedIn={this.state.signedIn}
          redirect={this.state.redirect}
          token={this.state.token}
        />
        <Route exact path='/' component={Home} />
        <Route path='/signup' component={Signup} />
        <Route path='/signin' render={() => (
          <Signin />
          // updateToken={this.updateToken}
        )} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/contact' component={Contact} />
        <Route path='/404' componenet={Contact} />
        <Footer />
      </div>
    )
  }
}

export default Layout
