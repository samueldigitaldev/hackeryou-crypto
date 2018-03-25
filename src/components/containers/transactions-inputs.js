import React, {Component} from 'react'
import axios from 'axios'

class TransactionsInputs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionType: true,
      cryptoType: '0',
      dollarAmount: '',
      priceOfTransaction: ''

    }
  }

  handleTransaction = (e) => {
    if (e.target.name === 'transactionType'){
      const isTrueSet = (e.target.value === 'true');
      this.setState({transactionType: isTrueSet});
    }
    if(e.target.name === 'cryptoType'){
      this.setState({cryptoType: e.target.value})
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
    // if (e.target.name === 'clear') {

    // }

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          Crypto Tracker Inputs!
        </div>

        <div>
          <label>Transaction Type</label>
          <select name="transactionType" onChange={this.handleTransaction} value={this.state.transactionType}>
            <option value='true' selected="Bought">Bought</option>
            <option value='false'>Sold</option>
          </select>
        </div>

        <div>
          <label>Cryptocurrency</label>
          <select name="cryptoType" onChange={this.handleTransaction} value={this.state.cryptoType}>
            <option value='0'>Bitcoin</option>
            <option value='1'>Ethereum</option>
            <option value='2'>Litecoin</option>
          </select>
        </div>

        <div>
          <label>Dollar Amount</label>
          <input name="dollarAmount" type='number' onChange={this.handleTransaction} value={this.state.dollarAmount}/>
        </div>
    
        <div>
          <label>Price per Crypto</label>
          <input name="price" type='number' onChange={this.handleTransaction} value={this.state.priceOfTransaction}/>
        </div>
  
        <input name="submit" type='submit' value='Submit' onSubmit={this.handleSubmit}/>
  
      </form>
    )  
  }
}
export default TransactionsInputs
