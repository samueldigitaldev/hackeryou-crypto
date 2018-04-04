import React from 'react'

const Financial = (props) => {
  console.log(props)
  return (
    <div>
      <h2>Restricted Dashboard</h2>
      <div>Net Amount Spent: {this.props.financialNet()}</div>
      <div>Net Value of Assets: {this.props.currentValue()}</div>
      <div>Return on Investment:
        {this.props.financialNet() === 0.00 ? " 0.00" : (((this.props.currentValue() / this.props.financialNet()) -1)*100).toFixed(2)}%
      </div>
    </div>
  )
}

export default Financial
