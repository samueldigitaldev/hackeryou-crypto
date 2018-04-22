import React, {Component} from 'react'
import { Route } from 'react-router-dom'

import Home from '../common/home'
import Signup from '../common/signup'
import Signin from '../common/signin'
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
      signUpOrIn: '',
      token: '',
      email: '',
      password: '',
      fireRedirect: false
    }
  }

  verifyToken = () => {
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

  componentDidMount () {
    this.verifyToken()
  }

  handleEmailChange = (e) => {
    this.setState({email: e.target.value})
  }

  handlePasswordChange = (e) => {
      let endPoint = window.location.href.substr(window.location.href.length -7,7);
      this.setState({signUpOrIn: endPoint})
      this.setState({password: e.target.value})
  }

  handleSignUpIn = (e) => {
      e.preventDefault();
      axios.post(`${this.state.signUpOrIn}`, {
          email: this.state.email,
          password: this.state.password
      })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', response.data.user); //Use the JWT to find the user ID in the db instead of this method
        this.setState({
            email: '',
            password: '',
            fireRedirect: true,
            signedIn: true
        })
      })
      .catch(function (error) {
          console.log(error);
      });
    }

  logOut = (e) => {
    this.setState({signedIn: false, redirect: 'signin', fireRedirect: false})
    localStorage.clear();
  }
  

  render () {
    return (
      <div>
        <Nav
          signedIn={this.state.signedIn}
          redirect={this.state.redirect}
          logOut={this.logOut}
        />
        <Route exact path='/' component={Home} />
        <Route path='/signup' 
          render={() => (
          <Signup
          handleEmailChange={this.handleEmailChange}
          handlePasswordChange={this.handlePasswordChange}
          handleSignUpIn={this.handleSignUpIn}
          fireRedirect={this.state.fireRedirect}
          />
        )} 
        />

        <Route path='/signin' 
        render={() => (
          <Signin 
          handleEmailChange={this.handleEmailChange}
          handlePasswordChange={this.handlePasswordChange}
          handleSignUpIn={this.handleSignUpIn}
          fireRedirect={this.state.fireRedirect}
          emailPassword={this.state.emailPassword}
          />
        )} 
        />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/contact' component={Contact} />
        <Route path='/404' componenet={Contact} />
      </div>
    )
  }
}

export default Layout
