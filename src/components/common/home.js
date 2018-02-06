import React from 'react';
import {Link} from 'react-router-dom';


const Home = () =>{
    return(
        <div>
            <div><Link to="/about">About</Link></div>
            <div><Link to="/contact">Contact Us</Link></div>
        </div>
        
    )       
}

export default Home;