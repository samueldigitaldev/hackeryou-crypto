import React, {Component} from 'react';
import axios from 'axios';

import CurrencyList from '../common/currency-list';
import FeaturedCurrency from '../common/featured-currency';

let _ = require('lodash');
const quadrigacxTickerApi = `https://api.quadrigacx.com/v2/ticker?book=all`;
const marketCapTickerApi = `https://api.coinmarketcap.com/v1/ticker/?limit=15`;

class Tracker extends Component{
    constructor(props){
        super(props)
        this.state = {
            quadrigacxArray: [],
            marketCapTickerArray: [],
            featuredCurrency: {}
        };
    }

    componentDidMount() {
        axios.get(quadrigacxTickerApi)
        .then((response) => {
            const tickerDataObj = response.data;
            let tickerDataArray = _.map(tickerDataObj, function(value,id){
                if(id.includes("cad")){
                    return {id, value}
                }
            });
            tickerDataArray = tickerDataArray.filter(ticker => ticker !== undefined);
            this.setState({quadrigacxArray:tickerDataArray});
        })
        .then(() => {
            axios.get(marketCapTickerApi)
            .then((response) => {
                const marketCapTickerApiData = response.data;
                let currencyList = this.state.quadrigacxArray;
                let marketCapTickerArray = [];

                marketCapTickerApiData.forEach((ticker, index) =>{
                    currencyList.forEach((currency) => {
                        if(ticker.symbol.toUpperCase() === currency.id.substring(0,3).toUpperCase()){
                            marketCapTickerArray.push(marketCapTickerApiData[index]);
                            this.setState({marketCapTickerArray})
                        }
                        this.setState({featuredCurrency:this.state.marketCapTickerArray[0]})
                    });
                });
            })
        })
        .then(() => {
            axios.get('https://api.cryptowat.ch/markets/quadriga/btccad/summary')
            .then ((response) => {
                console.log(response);
            })
        })
    }
    
    render() {
        return (
            <div>
                <h2>Crypto Tracker</h2>
                <div>
                    <FeaturedCurrency 
                        featuredCurrency={this.state.featuredCurrency}
                        quadrigacxTicker={this.state.quadrigacxArray}
                    />
                    <CurrencyList 
                        marketCapTickerArray={this.state.marketCapTickerArray}
                        onFeaturedCurrency={(featuredCurrency) => this.setState({featuredCurrency})}
                        quadrigacxTicker={this.state.quadrigacxArray}
                    />
                    
                </div>
            </div>
        );
    }
}

export default Tracker