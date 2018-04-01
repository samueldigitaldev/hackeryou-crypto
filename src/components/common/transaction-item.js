import React from 'react';

const TransactionItem = (props) => {
    const { cryptoCurrency, dollarAmount, price, transactionType, _id } = props.transaction
    return (
        <div key={props.index}>
            <div>
                {transactionType ? "Bought" : "Sold"}
            </div>
            <div>${dollarAmount} CAD of:</div>

            {cryptoCurrency === 0 ? <div>Bitcoin</div> : null}
            {cryptoCurrency === 1 ? <div>Ethereum</div> : null}
            {cryptoCurrency === 2 ? <div>Litecoin</div> : null}  
            
            <div>At ${price} CAD/
            {cryptoCurrency === 0 ? 'Bitcoin' : null}
            {cryptoCurrency === 1 ? 'Ethereum' : null}
            {cryptoCurrency === 2 ? 'Litecoin' : null}  
            </div>
            <button onClick={() => props.removeTransaction(props.index, _id)}>
                Remove Transaction
            </button>
        </div>
    )
}
export default TransactionItem;