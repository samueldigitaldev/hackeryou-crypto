import React from 'react'
import { Redirect } from 'react-router'

const Signin = (props) => {
  return (
    <form onSubmit={props.handleSignUpIn}>
      <label>
            Crypto Tracker Sign In!
      </label>
      <label>Email</label>
      <input type='text' value={props.email} onChange={props.handleEmailChange} />
      <label> Password</label>
      <input type='password' value={props.password} onChange={props.handlePasswordChange} />
      <input type='submit' value='Submit' />
      {
        props.fireRedirect && (
          <Redirect to={'/dashboard'} />
      )}

    </form>
    

  )
}

export default Signin
