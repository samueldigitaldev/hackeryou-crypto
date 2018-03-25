import React from 'react'
import Transaction from './transaction-item'

const TransactionList = (props) => {
  const { transactionsList } = props  
  return (
    <ul> 
      {transactionsList.map((transaction, i) => {
        return(
          <Transaction 
              transaction={transaction}
              index={i}
              removeTransaction={props.removeTransaction}
          />
        )
      })}            
    </ul>

  )
}
export default TransactionList
