import { React, useState, useEffect } from "react";
import Loading from "../../../components/Loading";
import { Link, useNavigate } from "react-router-dom";
import '../../header.css'
import './profile.css'
import '../dashboard.css'
import '../../../components/MenuAutSuporte.css'
import MenuAutSuporte from '../../../components/MenuAutSuporte';


const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [userColor, setUserColor] = useState('');

  // Função para obter ou gerar cor persistente
  function getOrCreateUserColor(userId) {
    // Use o id do usuário como chave, se houver
    const key = `userColor_${userId}`;
    let color = localStorage.getItem(key);
    if (!color) {
      color = getRandomColor();
      localStorage.setItem(key, color);
    }
    return color;
  }

  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.clear();
    setUserColor('');
    setIsMenuOpen(false);
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function menuSwitch() {
    setIsMenuOpen((prev) => !prev);
  }

  if (!user) {
    return <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', marginTop: '60px', color: '#ff0000', backgroundColor: '#f8d7da', padding: '20px', borderRadius: '10px', maxWidth: '600px', margin: 'auto' }}>
      <p>Usuário não encontrado. Por favor, faça login novamente.</p>

      <Link to="/home"><button style={{ backgroundColor: '#FFAAAA', color: 'red', padding: '10px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Home</button></Link>
    </div>;
  }

  useEffect(() => {
    document.title = "AutSuporte - Perfil";

    // Defina a cor do usuário ao montar o componente
    if (user) {
      setUserColor(getOrCreateUserColor(user.email || user.id || "default"));
    }

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
      <MenuAutSuporte isMenuOpen={isMenuOpen} user={user} userColor={userColor} />

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

                <div className='menu-options-box-profile'>
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