import { React, useState } from 'react';
import { Link } from 'react-router';
import '../header.css';
import './home.css';

function Home() {

    const bgText = document.getElementById('bgText');

    document.addEventListener('mousemove', (e) => {
      const x = e.clientX;
      const y = e.clientY;
      bgText.style.maskImage = `radial-gradient(circle 200px at ${x}px ${y}px, white 0%, transparent 100%)`;
      bgText.style.webkitMaskImage = `radial-gradient(circle 200px at ${x}px ${y}px, white 0%, transparent 100%)`;
    });

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
    <div class="bg-text" id="bgText">
    VERTIS VERTIS VERTIS VERTIS VERTIS<br></br>
        VERTIS  VERTIS  VERTIS  VERTIS <br></br>
    VERTIS VERTIS VERTIS VERTIS VERTIS<br></br>
        VERTIS  VERTIS  VERTIS  VERTIS <br></br>
    VERTIS VERTIS VERTIS VERTIS VERTIS<br></br>
        VERTIS  VERTIS  VERTIS  VERTIS 
    </div>
         
    </>
};

export default Home;