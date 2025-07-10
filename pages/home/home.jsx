import { React, useEffect, useState } from 'react';
import { Link } from 'react-router';
import '../header.css';
import './home.css';

function Home() {
useEffect(() => {
    document.title = "AutSuporte - Home";


    function setLight() {
    const bgText = document.getElementById('bgText');

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        bgText.style.maskImage = `radial-gradient(circle 200px at ${x}px ${y}px, white 0%, transparent 100%)`;
        bgText.style.webkitMaskImage = `radial-gradient(circle 200px at ${x}px ${y}px, white 0%, transparent 100%)`;
    });
    }
    setLight();
}, []);



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
                <p className='home-description'>AutSuporte é uma plataforma desenvolvida pela Vertis,
                    projetada para fornecer suporte técnico personalizado e eficiente.<br></br>
                    Com uma interface amigável e recursos avançados, AutSuporte facilita a gestão de tickets,
                    o acompanhamento de solicitações e a comunicação entre usuários e técnicos.</p>
                
                <div className='home-items-box'>
                    <div className='home-item'>
                        <p className='home-item-title'>Licenças de Uso dos Clientes</p>
                        <p className='home-item-text'>Quantidade de Licenças de Uso por Cliente</p>
                        <p className='home-item-text'>Quantidade de Licenças de Servidores</p>
                        <p className='home-item-text'>Tudo atualizado em tempo real.</p>
                    </div>

                    <div className='home-item'>
                        <p className='home-item-title'>Gerenciamento de Chamados</p>
                        <p className='home-item-text'>Históricos dos Chamados por Cliente</p>
                        <p className='home-item-text'>Tempo total até a finalização do chamado</p>
                        <p className='home-item-text'>Quantidade de Chamados em Aberto</p>
                        <p className='home-item-text'>Observações dos Chamados Realizados</p>
                    </div>

                    <div className='home-item'>
                        <p className='home-item-title'>Planilha de Clientes</p>
                        <p className='home-item-text'>Lista de Clientes Cadastrados</p>
                        <p className='home-item-text'>Informações de Contatos</p>
                        <p className='home-item-text'>Endereços e Detalhes dos Clientes</p>
                    </div>

                    <div className='home-item'>
                        <p className='home-item-title'>Logs de Erros</p>
                        <p className='home-item-text'>Registro de Erros do Sistema</p>
                        <p className='home-item-text'>Detalhes dos Erros para Diagnóstico</p>
                        <p className='home-item-text'>Facilita a Identificação de Problemas</p>
                    </div>

                    <div className='home-item'>
                        <p className='home-item-title'>Logs das API's</p>
                        <p className='home-item-text'>Registro de Chamadas de API</p>
                        <p className='home-item-text'>Detalhes das Requisições e Respostas</p>
                        <p className='home-item-text'>Facilita o Monitoramento de Integrações</p>
                    </div>
                </div>
            </div>
        </div>


        <div class="bg-text" id="bgText">
            VERTIS VERTIS VERTIS VERTIS VERTIS VERTIS VERTIS VERTIS VERTIS<br></br>
            VERTIS  VERTIS  VERTIS  VERTIS VERTIS VERTIS VERTIS VERTIS<br></br>
            VERTIS VERTIS VERTIS VERTIS VERTIS VERTIS VERTIS VERTIS VERTIS<br></br>
            VERTIS  VERTIS  VERTIS  VERTIS VERTIS VERTIS VERTIS VERTIS<br></br>
            VERTIS VERTIS VERTIS VERTIS VERTIS VERTIS VERTIS VERTIS VERTIS<br></br>
            VERTIS  VERTIS  VERTIS  VERTIS VERTIS VERTIS VERTIS VERTIS<br></br>
            VERTIS VERTIS VERTIS VERTIS VERTIS VERTIS VERTIS VERTIS VERTIS<br></br>
            VERTIS  VERTIS  VERTIS  VERTIS VERTIS VERTIS VERTIS VERTIS<br></br>
            VERTIS VERTIS VERTIS VERTIS VERTIS VERTIS VERTIS VERTIS VERTIS<br></br>
            VERTIS  VERTIS  VERTIS  VERTIS VERTIS VERTIS VERTIS VERTIS<br></br>
            VERTIS VERTIS VERTIS VERTIS VERTIS VERTIS VERTIS VERTIS VERTIS<br></br>
            VERTIS  VERTIS  VERTIS  VERTIS VERTIS VERTIS VERTIS VERTIS<br></br>
            VERTIS VERTIS VERTIS VERTIS VERTIS VERTIS VERTIS VERTIS VERTIS<br></br>
            VERTIS  VERTIS  VERTIS  VERTIS VERTIS VERTIS VERTIS VERTIS<br></br>
        </div>

    </>
};

export default Home;