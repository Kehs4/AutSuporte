import { useState, useEffect } from 'react';
import '../header.css';
import './dashboard.css';
import { Link } from 'react-router-dom'
import Loading from '../../components/Loading';
import MenuToggleProvider from '../../components/MenuToggleProvider';

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    cep: '',
    address: '',
    number: '',
    complement: '',
    city: '',
    state: '',
    birthdate: '',
    keys: '',
  });




  const [userColor, setUserColor] = useState('');

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  useEffect(() => {
    document.title = "AutSuporte - Dashboard";

    // Recupera os dados do usuário do localStorage
    const storedUser = localStorage.getItem('user');

    if (storedUser && storedUser !== '{}') {
      setUser(JSON.parse(storedUser));
    }

    setUserColor(getRandomColor());

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);


    return () => clearTimeout(timer);
  }, []);


  if (isLoading) {
    return <Loading />;
  }

  return (
    <MenuToggleProvider>
      {({ isMenuOpen, menuSwitch }) => (
        <>
          <div className='autsuporte-container-dashboard'>
            <button className='btn-menu' id='menu-switch' onClick={menuSwitch}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi list" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
              </svg>
            </button>
            
            <h1 className='autsuporte-header-dashboard'>AutSuporte</h1>
            
              <nav className='autsuporte-options-dashboard'>
                <Link to="/profile">Meu Perfil</Link>
              </nav>
            </div>

          <div className="dashboard-flex-wrapper">
            <div className={`menu-keyflix${isMenuOpen ? ' open' : ''}`} id='menu-keyflix'>
              <div className='menu-keyflix-user'>
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
                    {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                  </div>
                )}
                <h1 className='menu-user-name'>{user.name} {user.surname}Nome será aqui</h1>
              </div>


              <div className='menu-options-box'>

                <div className='menu-options-dashboard'>
                  <img src="/public/home.svg" alt="" />
                  <Link to="/dashboard"><p>Dashboard</p></Link>
                </div>
                <div className='menu-options-user'>
                  <img src="/public/user.svg" alt="" />
                  <Link to="/profile"><p>Meu Perfil</p></Link>
                </div>

                <div className='menu-options-cart'>
                  <img src="/public/cart.svg" alt="" />
                  <p>Produtos</p>
                </div>

                <div className='menu-options-support'>
                  <img src="/public/support.svg" alt="" />
                  <p>Suporte KeyFlix</p>
                </div>
              </div>
            </div>

            <div className={`dashboard-container${isMenuOpen ? ' menu-open' : ''}`}>
              <div className='dashboard-header'>
                <h1 className='dashboard-title'>Dashboard</h1>
                <p className='dashboard-subtitle'>Bem-vindo(a) a KeyFlix, <font color='#0356bb'>{user.name}!</font></p>
              </div>

              <div className='dashboard-content'>

                <div className='dashboard-add-informations'>
                  <h2 className='dashboard-section-title'>Dados Cadastrais</h2>
                  <div className='add-informations-content'>
                    <h1 className='dashboard-informations-text'>Adicione seus dados e informações e disfrute dos nossos produtos!</h1>
                    <Link to="/profile"><button className='btn-header-user'>Meu Perfil</button></Link>
                  </div>
                </div>

              </div>


            </div>
          </div>
        </>
      )}
    </MenuToggleProvider>

  );

}

export default Dashboard;
