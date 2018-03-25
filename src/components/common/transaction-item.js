import React from 'react';

const TransactionItem = (props) => {
    const { cryptoCurrency, dollarAmount, price, transactionType } = props.transaction
    return (
        <div key={props.index}>
            <div>
                {transactionType ? "Bought" : "Sold"}
            </div>
            <div>{dollarAmount}</div>

            {cryptoCurrency === 0 ? <div>Bitcoin</div> : null}
            {cryptoCurrency === 1 ? <div>Ethereum</div> : null}
            {cryptoCurrency === 2 ? <div>Litecoin</div> : null}  
            
            <div>{price}</div>
            <button onClick={() => props.removeTransaction(props.index)}>
                Remove Transaction
            </button>
        </div>
    )
}
export default TransactionItem;