import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GppMaybeIcon from '@mui/icons-material/Api';


const MenuAutSuporte = ({ isMenuOpen, userColor, onCloseMenu }) => {
  // Carrega o usuário do localStorage ao montar o componente

  const user = JSON.parse(localStorage.getItem("user"));

  // Basta passar o token JWT para esta função
  function parseJwt(token) {
    if (!token) return null;
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  }
  const token = user.token;

  // Exemplo de uso:
  const payload = parseJwt(token);
  console.log(payload);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleScroll = () => {
      if (isMenuOpen) {
        onCloseMenu();
      }
    };

    function handleCloseMenu() {
      setIsMenuOpen(false);
    }


    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen, onCloseMenu]);

  return (
    <div className={`menu-autsuporte${isMenuOpen ? ' open' : ''}`} id='menu-autsuporte'>
      <div className='menu-autsuporte-user'>
        {user.image ? (
          <img src={user.image} alt="Foto do usuário" className='user-image' id='user-image' width={40} height={40} />
        ) : (
          <div
            className='user-initial'
            style={{
              backgroundColor: userColor,
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#fff',
              margin: '0 15px'
            }}
          >
            {payload.username ? payload.username.charAt(0).toUpperCase() : '?'}
          </div>
        )}
        <h1 className='menu-user-name'>{payload.username || payload.token || 'Usuário'}</h1>
      </div>

      <div className='menu-options-box'>

        <div className='menu-options-dashboard'>
          <div className='menu-options-hover'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16">
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
            </svg>
            <Link to="/dashboard"><p>Dashboard</p></Link>
          </div>
        </div>

        <div className='menu-options-user'>
          <div className='menu-options-hover'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
            </svg>
            <Link to="/profile"><p>Meu Perfil</p></Link>
          </div>

        </div>

        <div className='menu-options-licences'>
          <div className='menu-options-hover'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clipboard-data" viewBox="0 0 16 16">
              <path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0z" />
              <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
              <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
            </svg>
            <Link to='/licences'><p>Licenças de Uso</p></Link>
          </div>

        </div>

        <div className='menu-options-errors'>
          <div className='menu-options-hover'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-exclamation-square" viewBox="0 0 16 16">
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
            </svg>
            <Link to='/errors'><p>Log de Erros</p></Link>
          </div>

        </div>

        <div className='menu-options-clients'>
          <div className='menu-options-hover'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-people" viewBox="0 0 16 16">
              <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
            </svg>
            <Link to='/clientstb'><p>Clientes</p></Link>
          </div>

        </div>

        <div className='menu-options-clients'>
          <div className='menu-options-hover'>
            <GppMaybeIcon style={{ fontSize: '16px' }} />
            <Link to='/apilogs'><p>Logs das API's</p></Link>
          </div>

        </div>

      </div>
    </div>


  );
};

export default MenuAutSuporte;
