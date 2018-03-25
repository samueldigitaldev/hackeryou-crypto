import React, {Component} from 'react'
import axios from 'axios'

import Financial from '../common/financial'
import TransactionList from '../common/transaction-list'
import TransactionsInputs from './transactions-inputs'

class Dashboard extends Component {
  constructor () {
    super()
    this.state = {
      transactionsList: []
    }
  }

  componentDidMount() {
    this.getTransactions();
  }

  getTransactions = () => {
    const {token} = localStorage
    axios.get('/listtransactions', { 
        headers: 
        {
          "Authorization" : token
        }
    })
    .then((response) => {
      console.log(response)
      const { payload } = response.data;
      this.setState({
        transactionsList: payload
      })
    })
    .catch(function (error) {
      console.log(error);
      });
    }
    
    removeTransaction = (index, id) => {
      const {token} = localStorage
      
      axios({
        method: 'delete',
        url: '/deleteTransaction',
        data: {
          _id: id
        },
        headers: {
          "Authorization" : token,
        }
      })
      .then((response) => {
        console.log(response)
        const nextTransaction = Array.from(this.state.transactionsList);
        nextTransaction.splice(index, 1);
        this.setState({
            transactionsList: nextTransaction
      })
      }).catch(function (error) {
        console.log(error)
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
        <TransactionsInputs
          getTransactions={this.getTransactions} 
          
        />
      </div>
    )
  }
}

export default Dashboard
