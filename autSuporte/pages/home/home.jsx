import {React, useState} from 'react';
import AppRoutes from '../routes';
import { Link } from 'react-router';
import './home.css';

function Home() {
 
    
return <>
    
         <div className='autsuporte-container'>
            <div className='autsuporte-header'>
                <h1 className='autsuporte-header'>AutSuporte</h1>    
            </div>

            <nav className='autsuporte-options'>
                <Link to="/home">Contact</Link>
            </nav>
        </div>  
    </>
};

export default Home;