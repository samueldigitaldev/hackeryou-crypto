import React from 'react'

const TransactionsInputs = () => {
  return (
    <form>
      {/* onSubmit={props.handleSubmitSignin} */}
      <label>
            Crypto Tracker Inputs!
      </label>
      <label>Dollar Amount</label>
      <input type='text' />
      {/* <input type='text' value={props.email} onChange={props.handleEmailChange} /> */}
      <label>Buy/Sell</label>
      <select>
        <option selected value='option'>Buy or Sell</option>
        <option value='buy'>Buy</option>
        <option value='sell'>Sell</option>
      </select>

      <label>Price During Transaction</label>
      <input type='text' />

      <label>Cryptocurrency</label>
      <select>
        <option selected value='option'>Choose a Crypto</option>
        <option value='btc'>Bitcoin</option>
        <option value='eth'>Ethereum</option>
        <option value='ltc'>Litecoin</option>
      </select>

      <input type='submit' value='Submit' />

    </form>

  )
}
export default TransactionsInputs
