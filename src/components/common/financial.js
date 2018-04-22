import React from 'react'

const Financial = (props) => {
  return (
    <div>
      <h2>Transaction Dashboard</h2>
      <div>Net Amount Spent: {props.financialNet()}</div>
      <div>Net Value of Assets: {props.currentValue()}</div>
      <div>Return on Investment:
        {props.financialNet() == 0.00 ? " 0.00" : (((props.currentValue() / props.financialNet()) -1)*100).toFixed(2)}%
      </div>
    </div>
  )
}

export default Financial
