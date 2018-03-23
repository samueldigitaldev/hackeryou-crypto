import React from 'react';

const TransactionItem = (props) => {
    const { cryptoAmount, dollarAmount, price, transactionType } = props.transaction
    console.log(cryptoAmount, dollarAmount, price, transactionType)
    return (
        <div key={props.index}>
            <div>{cryptoAmount}</div>
            <div>{dollarAmount}</div>
            <div>{price}</div>
            <div>{transactionType}</div>
            <button onClick={() => props.removeTransaction(props.index)}>
                Remove Transaction
            </button>
        </div>
    )
}
export default TransactionItem;