import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';


import Nav from './components/containers/nav';
import Footer from './components/common/footer';
import Layout from './components/containers/layout';

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Nav />
            <Layout />
            <Footer />
        </div>
    </BrowserRouter>
    , document.getElementById("root"));

