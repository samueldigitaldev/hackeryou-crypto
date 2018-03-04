import React, {Component} from 'react'
import axios from 'axios';
import { Redirect } from 'react-router'

class Signin extends Component {
  constructor(props){
    super(props);
    this.state = {
        email: '',
        password: '',
        fireRedirect: false
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
    axios.post(`/signin`, {
        email: this.state.email,
        password: this.state.password
    })
    .then((response) => {
      localStorage.setItem('token', response.data.token);
      this.setState({
          email: '',
          password: '',
          fireRedirect: true
      })
      console.log(response.data.token);
      console.log(this.props)
    //   {this.props.updateToken()}

    })
    .catch(function (error) {
        console.log(error);
    });

}



  render() {
    return (

        <form onSubmit={this.handleSubmit}>
        <label>
            Crypto Tracker Sign In!
        </label>
            <label>Email</label>
            <input type="text" value={this.state.email} onChange={this.handleEmailChange} />
            <label> Password</label>
            <input type="text" value={this.state.password} onChange={this.handlePasswordChange} />
            <input type="submit" value="Submit" />  
            {
                this.state.fireRedirect && (
                <Redirect to={'/dashboard'}/>
            )}
      </form>


    );
  }
}

export default Signin
