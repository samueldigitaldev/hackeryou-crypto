import React, {Component} from 'react'
import axios from 'axios'

class TransactionsInputs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionType: true,
      cryptoType: '0',
      dollarAmount: '',
      priceOfTransaction: '',
      numToCrypto: 'Bitcoin'
    }
  }

  handleTransaction = (e) => {
    if (e.target.name === 'transactionType'){
      const isTrueSet = (e.target.value === 'true');
      this.setState({transactionType: isTrueSet});
    }
    if(e.target.name === 'cryptoType'){
      this.setState({cryptoType: e.target.value})
      this.numToCrypto(e.target.value);
    }
    if(e.target.name === 'dollarAmount'){
      this.setState({dollarAmount: e.target.value})
    }
    if(e.target.name === 'price'){
      this.setState({priceOfTransaction: e.target.value})
    }

  }

  handleSubmit = (e) =>{
    e.preventDefault();   
      axios.post(`/postTransactions`, {
        headers: {
          "Authorization": localStorage.token
        },
        transactionType: this.state.transactionType,
        cryptoCurrency: this.state.cryptoType,
        price: this.state.priceOfTransaction,
        dollarAmount: this.state.dollarAmount,
        user: localStorage.user
      })
      .then((response) => {
        this.setState({
          transactionType: true,
          cryptoType: '0',
          dollarAmount: '',
          priceOfTransaction: ''
        })
      })
      .then(this.props.getTransactions)
      .catch(function (error) {
        console.log(error)
      })
  }

  numToCrypto = (cryptoType) => {
    if(cryptoType === '0') {
      this.setState({numToCrypto: "Bitcoin"})
    }
    if(cryptoType === '1') {
      this.setState({numToCrypto: "Ethereum"})
    }
    if(cryptoType === '2') {
      this.setState({numToCrypto: "Litecoin"})
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          Crypto Tracker Inputs!
        </div>

        <div class="input-field col s12">
          <select name="transactionType" onChange={this.handleTransaction} value={this.state.transactionType}>
            <option value='true' selected="Bought">Bought</option>
            {/* <option value='false'>Sold</option> */}
          </select>
          <label>Transaction Type</label>
        </div>

        <div class="input-field col s12">
          <select name="cryptoType" onChange={this.handleTransaction} value={this.state.cryptoType}>
            <option value='0'>Bitcoin</option>
            <option value='1'>Ethereum</option>
            <option value='2'>Litecoin</option>
          </select>
          <label>Cryptocurrency</label>
        </div>

        <div class="input-field col s12">
          <input name="dollarAmount" type='number' onChange={this.handleTransaction} value={this.state.dollarAmount}/>
          <label>Dollar Amount</label>
        </div>
    
        <div class="input-field col s12">
          <input name="price" type='number' onChange={this.handleTransaction} value={this.state.priceOfTransaction}/>
          <label>Price per {this.state.numToCrypto}</label>
        </div>
  
        <input class="waves-effect waves-light btn" name="submit" type='submit' value='Submit' onSubmit={this.handleSubmit}/>
  
      </form>
    )  
  }
}
export default TransactionsInputs
