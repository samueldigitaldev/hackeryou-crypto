import React from 'react'
import { Redirect } from 'react-router'

const SignUp = (props) => {
  return (
    <form onSubmit={props.handleSignUpIn}>
      <label>
            Crypto Tracker Sign Up!
      </label>
      <label>Email</label>
      <input type='text' value={props.email} onChange={props.handleEmailChange} />
      <label> Password</label>
      <input type='text' value={props.password} onChange={props.handlePasswordChange} />
      <input type='submit' value='Submit' />
      {
        props.fireRedirect && (
          <Redirect to={'/dashboard'} />
        )
      }

      
    </form>

  )
}

export default SignUp
