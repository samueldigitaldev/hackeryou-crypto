import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import './styles/App.css'

import Layout from './components/containers/layout'

ReactDOM.render(
  <BrowserRouter>
      <Layout />
  </BrowserRouter>
  , document.getElementById('root'))
