import React from 'react'
import Transaction from './transaction-item'

const TransactionList = (props) => {
  const { transactionsList } = props  
  console.log(transactionsList)
  return (
    <ul> 
      {transactionsList.map((transaction, i) => {
        return(
          <Transaction 
              transaction={transaction}
              index={i}
              removeTodo={props.removeTodo}
          />
        )
      })}            
    </ul>

  )
}
export default TransactionList
