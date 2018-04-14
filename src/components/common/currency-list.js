import React from 'react';

import CurrencyItem from './currency-item';

function CurrencyList (props) {
    if(!props){
        return <div> </div>
    }
    const currencyListItem = props.marketCapTickerArray.map((listItem) => {
        if (listItem.name !== "Bitcoin Cash" ){
            return ( 
                <CurrencyItem 
                    onFeaturedCurrency={props.onFeaturedCurrency}
                    listItem={listItem} 
                    key={listItem.id} 
                    firstAndLastTransactions={props.firstAndLastTransactions}
                    quadrigacxTicker={props.quadrigacxTicker}
                />
            )
        }else{
            return null
        }

    });

    return( 
        <div>
            <div className="currency-item-list">
                {currencyListItem}
            </div>
        </div>
    )
}

export default CurrencyList;