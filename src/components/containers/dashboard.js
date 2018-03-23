import React, {Component} from 'react'
import axios from 'axios'

import Financial from '../common/financial'
import TransactionList from '../common/transaction-list'
import TransactionsInputs from '../common/transactions-inputs'

class Dashboard extends Component {
  constructor () {
    super()
    this.state = {
      transactionsList: []
    }
  }

  componentDidMount() {
    const {token} = localStorage
    axios.get('/listtransactions', { 
        headers: 
        {
          "Authorization" : token
        }
    })
    .then((response) => {
      const { payload } = response.data;
      this.setState({
        transactionsList: payload
      })
    })
    .catch(function (error) {
      console.log(error);
      });
    }

    removeTransaction = (index) => {
      const nextTransaction = Array.from(this.state.transactionsList);
      nextTransaction.splice(index, 1);
      this.setState({
          transactionsList: nextTransaction
      })
    }
  
  render () {
    return (
      <div>
        <Financial />
        <TransactionList
          transactionsList={this.state.transactionsList}
          removeTransaction={this.removeTransaction} 

        />
        <TransactionsInputs />
      </div>
    )
  }
}

export default Dashboard
