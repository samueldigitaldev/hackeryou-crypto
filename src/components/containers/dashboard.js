import React, {Component} from 'react'
import axios from 'axios'

import Financial from '../common/financial'
import TransactionList from '../common/transaction-list'
import TransactionsInputs from './transactions-inputs'

class Dashboard extends Component {
  constructor () {
    super()
    this.state = {
      transactionsList: [],
      cryptoApi: []
    }
  }

  componentDidMount() {
    this.getTransactions();
    this.cryptoApi();
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
        const nextTransaction = Array.from(this.state.transactionsList);
        nextTransaction.splice(index, 1);
        this.setState({
            transactionsList: nextTransaction
      })
      }).catch(function (error) {
        console.log(error)
      })
    }

    financialNet = () => {
      if (this.state.transactionsList.length !== 0){
        const transactionArray = []
        this.state.transactionsList.forEach((transactions, index) => {
          let transaction = transactions.dollarAmount
          if(transactions.transactionType !== true){
            transaction = -transaction
          }
          transactionArray.push(transaction)
        })
        const netTransactions = transactionArray.reduce((a, b) => a + b, 0);
        return netTransactions.toFixed(2);
      }else{
        const netTransactions = 0.00;
        return netTransactions.toFixed(2)
      }

    }
  
    cryptoApi = () => {
      axios.get(`https://api.coinmarketcap.com/v1/ticker/?convert=CAD&limit=10`)
        .then((res) => {
          let cryptoApi = [];
          res.data.map((crypto, index) => {
            if(crypto.id === "bitcoin" || crypto.id === "ethereum" || crypto.id === "litecoin"){
              cryptoApi.push(crypto)
            }
          })
          this.setState({cryptoApi})
        })
        .catch((err) => {
          console.log(err)
      })
    }

    currentValue = () => {
      let btcPrice
      let ethPrice
      let ltcPrice
  
      this.state.cryptoApi.map((crypto, index) => {
        if(crypto.id === "bitcoin"){
          btcPrice = crypto.price_cad
        }else if (crypto.id === "ethereum"){
          ethPrice = crypto.price_cad
        }else {
          ltcPrice = crypto.price_cad
        }
      })
  
      const netValueArray = []
      this.state.transactionsList.map((transaction, index) => {
        let realValue;
  
        if (transaction.cryptoCurrency === 0){
          const btcROI = transaction.price/btcPrice
          transaction.transactionType ? realValue = transaction.dollarAmount/btcROI : realValue = transaction.dollarAmount*btcROI*-1
          netValueArray.push(realValue)
        }else if(transaction.cryptoCurrency === 1){
          const ethROI = transaction.price/ethPrice
          transaction.transactionType ? realValue = transaction.dollarAmount/ethROI : realValue = transaction.dollarAmount*ethROI*-1
          netValueArray.push(realValue)
        }else{
          const ltcROI = transaction.price/ltcPrice
          transaction.transactionType ? realValue = transaction.dollarAmount/ltcROI : realValue = transaction.dollarAmount*ltcROI*-1
          netValueArray.push(realValue)
        }
      })
  
      const netValueOfAssets = netValueArray.reduce((a, b) => a + b, 0);
      if (netValueArray === NaN) {
        return 0.00
      }
      return netValueOfAssets.toFixed(2);
    }


  render () {
    return (
      <div>
        <Financial 
          transactionsList={this.state.transactionsList}
          financialNet={this.financialNet}
          currentValue={this.currentValue}

        />
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
