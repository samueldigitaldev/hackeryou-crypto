import React, {Component} from 'react'

import Financial from '../common/financial'
import Transactions from '../common/transactions'
import TransactionsInputs from '../common/transactions-inputs'

class Dashboard extends Component {
  constructor () {
    super()
    this.state = {
      email: ''
    }
  }

  render () {
    return (
      <div>

        <Financial />

        <Transactions />

        <TransactionsInputs />

      </div>
    )
  }
}

export default Dashboard
