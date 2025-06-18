import {React, useState} from 'react';
import { Link } from 'react-router';
import '../header.css';

function Home() {
 
    
return <>
    
         <div className='autsuporte-container'>
            <div className='autsuporte-header'>
                <h1 className='autsuporte-header'>AutSuporte</h1>    
            </div>

            <nav className='autsuporte-options'>
                <Link to="/login">Login</Link>
            </nav>
        </div>  
    </>
};

export default Home;