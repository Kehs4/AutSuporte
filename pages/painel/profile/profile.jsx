import { React, useState, useEffect } from "react";
import Loading from "../../../components/Loading";
import { Link, useNavigate } from "react-router-dom";
import './profile.css'
import '../dashboard.css'


const Profile = () => {
    const [isLoading, setIsLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem("user"));

    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const [userColor, setUserColor] = useState('');

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function handleLogout() {
        localStorage.removeItem("user");
        setUserColor('');
        setIsMenuOpen(false);
    }

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function menuSwitch() {
        setIsMenuOpen((prev) => !prev);
    }

    if (!user) {
        return  <div style={{ display:'flex', flexDirection: 'column', justifyContent:'center',  textAlign: 'center', marginTop: '60px', color: '#ff0000', backgroundColor: '#f8d7da', padding: '20px', borderRadius: '10px', maxWidth: '600px', margin: 'auto' }}>
                    <p>Usuário não encontrado. Por favor, faça login novamente.</p>

                    <Link to="/home"><button style={{ backgroundColor: '#FFAAAA', color: 'red', padding: '10px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Home</button></Link>
                </div>;
    }

    useEffect(() => {
        document.title = "KeyFlix - Perfil";

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
        <>
            {showLogoutModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Deseja realmente sair da plataforma?</h2>
                        <div className="modal-actions">
                        <Link to="/home"><button className="btn-logout-confirm" onClick={handleLogout}>Sim, sair</button></Link>
                            <button className="btn-logout-cancel" onClick={() => setShowLogoutModal(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}

            <div className='autsuporte-container-dashboard'>

            <div className='autsuporte-header'>
              <button className='btn-menu' id='menu-switch' onClick={menuSwitch}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi list" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                </svg>
              </button>

              <h1 className='autsuporte-header-title'>AutSuporte</h1>
            </div>



            <nav className='autsuporte-header-options'>
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
                    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                  </svg>
                  <Link to="/dashboard"><p>Dashboard</p></Link>
                </div>
                <div className='menu-options-user'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                  </svg>
                  <Link to="/profile"><p>Meu Perfil</p></Link>
                </div>

                <div className='menu-options-cart'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-data" viewBox="0 0 16 16">
                    <path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0z" />
                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
                  </svg>
                  <p>Licenças de Uso</p>
                </div>
              </div>
            </div>

                <div className={`dashboard-container${isMenuOpen ? ' menu-open' : ''}`}>
                    <div className='dashboard-header'>
                        <h1 className='dashboard-title'>Meu Perfil</h1>
                        <p className='dashboard-subtitle'>Olá <font color='#0356bb'>{user.name},</font> esses são seus dados e informações.</p>
                    </div>

                    <div className='dashboard-content-container'>
                        <div className='dashboard-content-profile'>
                            <div className='user-info-container'>
                                <div className='user-image-container'>
                                    <img src="" alt="" srcset="" />
                                    {user.image ? (
                                        <img src={user.image} alt="Foto do usuário" className='user-image' id='user-image' width={80} height={80} />
                                    ) : (
                                        <div
                                            className='user-initial'
                                            style={{
                                                backgroundColor: userColor,
                                                width: '80px',
                                                height: '80px',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                fontSize: '26px',
                                                fontWeight: 'bold',
                                                color: '#fff'
                                            }}
                                        >
                                            {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                                        </div>
                                    )}
                                </div>
                                <div className='user-details'>
                                    <h2 className='user-name'>{user.name} {user.surname}</h2>
                                    <p className='user-email'>{user.email}</p>
                                    <p className='keys-quantity'>{user.keys} Keys</p>

                                    <Link to="/profile/edit">
                                        <button className='btn-edit-profile'>Editar Perfil</button>
                                    </Link>
                                </div>
                            </div>
                            <div className='user-details-container'>
                                <div className='user-details-info'>
                                    <h2 className='user-details-title'>Informações Pessoais</h2>
                                    <div className='user-info-grid'>

                                        <div>
                                            <label htmlFor="user-name" className='info-label'>Nome Completo:</label>
                                            <p>{user.name} {user.surname}</p>

                                            <label htmlFor="user-email" className='info-label'>E-mail:</label>
                                            <p>{user.email}</p>
                                        </div>

                                        <div>
                                            <label htmlFor="user-phone" className='info-label'>Telefone:</label>
                                            <p>{user.phone}</p>

                                            <label htmlFor="user-birthDate" className='info-label'>Data de Nascimento:</label>
                                            <p>{user.birthdate}</p>
                                        </div>

                                    </div>
                                </div>

                                <div className='user-address-container'>
                                    <h2 className='user-details-title'>Endereço:</h2>
                                    <div className='user-info-grid'>
                                        <div>
                                            <label htmlFor="user-address" className='info-label'>Logradouro:</label>
                                            <p>{user.address}</p>

                                            <label htmlFor="user-cep" className='info-label'>CEP:</label>
                                            <p>{user.cep}</p>

                                            <label htmlFor="user-number" className='info-label'>Número:</label>
                                            <p>{user.number}</p>

                                            <label htmlFor="user-complement" className='info-label'>Complemento:</label>
                                            <p>{user.complement}</p>
                                        </div>

                                        <div>
                                            <label htmlFor="user-city" className='info-label'>Cidade:</label>
                                            <p>{user.city}</p>

                                            <label htmlFor="user-state" className='info-label'>Estado:</label>
                                            <p>{user.state}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className='menu-options-box'>
                                <button className='btn-logout' onClick={() => setShowLogoutModal(true)}>Logout</button>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>

    );
};

export default Profile;