import React from 'react'
import Transaction from './transaction-item'

const TransactionList = (props) => {
  const { transactionsList } = props  
  return (
    <div>
      {transactionsList.map((transaction, i) => {
        return(
          <Transaction 
              transaction={transaction}
              index={i}
              removeTransaction={props.removeTransaction}
          />
        )
      })}   
    </div>         

  )
}
export default TransactionList
