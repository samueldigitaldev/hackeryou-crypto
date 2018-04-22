import React from 'react'
import { Redirect } from 'react-router'

const SignUp = (props) => {
  return (
    <form onSubmit={props.handleSignUpIn}>
      <h2>
            Crypto Tracker Sign Up!
      </h2>
      <label>Email</label>
      <input type='text' value={props.email} onChange={props.handleEmailChange} />
      <label> Password</label>
      <input type='password' value={props.password} onChange={props.handlePasswordChange} />
      <input class="waves-effect waves-light btn" type='submit' value='Submit' />
      {
        props.fireRedirect && (
          <Redirect to={'/dashboard'} />
        )
      }
      
    </form>

  )
}

export default SignUp
