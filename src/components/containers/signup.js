import React, {Component} from 'react'
import axios from 'axios';
import { Route } from 'react-router-dom';
import Dashboard from '../containers/dashboard'

class Signup extends Component {
  constructor(){
    super();
    this.state = {
        email: '',
        password: ''
    }
}

handleEmailChange = (e) => {
    this.setState({email: e.target.value})
}

handlePasswordChange = (e) => {
    this.setState({password: e.target.value})
}

handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`/signup`, {
        email: this.state.email,
        password: this.state.password
    })
    .then(function (response) {
        localStorage.setItem('token', response.data.token);
        console.log(response.data.token);
        // this.setState({signedIn: true})

    })
    .catch(function (error) {
        console.log(error);
    });

}

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
        <label>
            Crypto Tracker Sign Up!
        </label>
            <label>Email</label>
            <input type="text" value={this.state.email} onChange={this.handleEmailChange} />
            <label> Password</label>
            <input type="text" value={this.state.password} onChange={this.handlePasswordChange} />
            <input type="submit" value="Submit" />  
      </form>

    );
  }
}

export default Signup
