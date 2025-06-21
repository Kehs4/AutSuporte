import { React, useState } from 'react';
import { Link } from 'react-router';
import '../header.css';
import './home.css';

function Home() {


    return <>

        <div className='autsuporte-container-dashboard'>

            <div className='autsuporte-header'>
                <h1 className='autsuporte-header-title'>AutSuporte</h1>
            </div>

            <nav className='autsuporte-header-options'>
                <Link to="/login">Entrar</Link>
            </nav>
        </div>
       
        <div className="home-background">
            <div className="home-container">
                <h1 className='home-title'>Bem-vindo a AutSuporte</h1>
                <p className='home-description'>Sua plataforma de suporte técnico personalizada da Vertis.</p>
            </div>
        </div>
    </>
};

export default Home;