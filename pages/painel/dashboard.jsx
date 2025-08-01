import { useState, useEffect } from 'react';
import '../header.css';
import './dashboard.css';
import '../../components/MenuAutSuporte.css'
import { Link } from 'react-router-dom'
import Loading from '../../components/Loading';
import MenuToggleProvider from '../../components/MenuToggleProvider';
import MenuAutSuporte from '../../components/MenuAutSuporte';
import AssignmentIcon from '@mui/icons-material/Assignment';

function Dashboard() {

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const userOn = JSON.parse(localStorage.getItem("user"));

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
  const token = userOn?.token;
  const payload = parseJwt(token);

  if (!userOn) {
    return <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', marginTop: '60px', color: '#ff0000', backgroundColor: '#f8d7da', padding: '20px', borderRadius: '10px', maxWidth: '600px', margin: 'auto' }}>
      <p>Usuário não encontrado. Por favor, faça login novamente.</p>

      <Link to="/home"><button style={{ backgroundColor: '#FFAAAA', color: 'red', padding: '10px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Home</button></Link>
    </div>;
  }

  useEffect(() => {
    document.title = "AutSuporte - Dashboard";

    // Recupera os dados do usuário do localStorage
    const storedUser = localStorage.getItem('user');

    if (storedUser && storedUser !== '{}') {
      setUser(JSON.parse(storedUser));
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
    <MenuToggleProvider>
      {({ isMenuOpen, menuSwitch }) => (
        <>
          <div className='autsuporte-container-dashboard'>

            <div className='autsuporte-header'>
              <button className='btn-menu' id='menu-switch' onClick={menuSwitch}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi list" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                </svg>
              </button>

              <h1 className='autsuporte-header-title'>AutSuporte</h1>
            </div>

            <nav className='autsuporte-header-options'>
              <Link to="/profile">Meu Perfil</Link>
            </nav>
          </div>

          <div className="dashboard-flex-wrapper">
            <MenuAutSuporte isMenuOpen={isMenuOpen} user={user} onCloseMenu={menuSwitch} />

            <div className={`dashboard-container${isMenuOpen ? ' menu-open' : ''}`}>
              <div className='dashboard-header'>
                <h1 className='dashboard-title'>Dashboard</h1>
                <p className='dashboard-subtitle'>Bem-vindo(a) a AutSuporte, <font color='#0356bb'>{payload.username}!</font></p>
              </div>

              <div className='dashboard-content'>

                <div className='dashboard-informations'>
                  <div className='dashboard-add-informations'>
                    <div className='add-informations-content'>
                      <h2 className='dashboard-section-title'>Chamados Abertos</h2>
                      <h1 className='dashboard-informations-text' style={{ fontWeight: '700', fontSize: '25px' }}>{payload.chamados}42</h1>
                      <p className='dashboard-infos-status' style={{ fontWeight: '600' }}>{payload.statuschamado}+8% nessa semana</p>
                    </div>
                  </div>

                  <div className='dashboard-add-informations'>
                    <div className='add-informations-content'>
                      <h2 className='dashboard-section-title'>Tempo médio de Resolução</h2>
                      <h1 className='dashboard-informations-text' style={{ fontWeight: '700', fontSize: '25px' }}>{payload.statusresolucao}1:30h</h1>
                      <p className='dashboard-infos-status' style={{ fontWeight: '600' }}>{payload.statusresolucaoinfo}-15% nessa semana</p>
                    </div>
                  </div>

                  <div className='dashboard-add-informations'>
                    <div className='add-informations-content'>
                      <h2 className='dashboard-section-title'>Clientes Ativos</h2>
                      <h1 className='dashboard-informations-text' style={{ fontWeight: '700', fontSize: '25px' }}>{payload.statusresolucao}215</h1>
                      <p className='dashboard-infos-status' style={{ fontWeight: '600' }}>{payload.statusresolucaoinfo}+3 nesse mês</p>
                    </div>
                  </div>
                </div>

                <div className='dashboard-section-informations'>
                  <div style={{ border: '1px solid #ccccccaf', borderRadius: '10px', padding: '20px', width: '80%' }}>
                    <div className='dashboard-section-att'>

                      <h2 className='section-title'>Atualizações do Sistema</h2>

                      <div className='section-informations-content'>
                        <p style={{ fontSize: '15px', fontWeight: 300, color: '#666c7e', alignSelf: 'flex-start', minWidth: '150px', marginTop: '10px', marginBottom: '8px' }}>10/07/2025 10:43</p>
                        <h1 className='dashboard-section-text'>Vertis está atualizado na versão 2.9.62.2</h1>

                        <div className='section-status-whomade'>
                          <p>Atualizado por: {payload.username}</p>
                        </div>
                      </div>

                    </div>


                    <div className='section-status-date' style={{ borderTop: '1px solid #ccccccaf', paddingTop: '10px', marginTop: '10px', width: '100%' }}>
                      <p style={{ fontSize: '15px', fontWeight: 300, color: '#666c7e', alignSelf: 'flex-start' }}>
                        Ultima atualização: Hoje às 10:43
                      </p>
                    </div>


                  </div>

                  <div className='dashboard-section-profile'>
                    <div className='section-informations-content-profile'>
                      <h2 className='section-title'>Dados Cadastrais</h2>
                      <h1 className='dashboard-section-text'>Adicione ou edite seus dados e informações aqui!</h1>
                      <button className='dashboard-infos-button'> <Link to="/profile">Meu Perfil</Link></button>
                    </div>
                  </div>
                </div>

                <div className='dashboard-section-quickactions'>

                  <h2 className='section-title'>Ações Rápidas</h2>

                  <div className='dashboard-quickactions-content'>
                      <div className='dashboard-quickaction-options'>
                        <div className='dashboard-quickaction-item'>
                          <div className='dashboard-quickaction-icon-1'>
                            +
                          </div>

                          <div className='dashboard-quickaction-content'>
                            <h2 className='dashboard-quickaction-text'>Novo Chamado</h2>
                            <p className='dashboard-quickaction-text-p'>Registrar novo ticket de suporte.</p>
                          </div>
                          <Link to="/chamados">
                            <button className='dashboard-quickaction-button'>Criar Chamado</button>
                          </Link>
                        </div>

                        <div className='dashboard-quickaction-item'>
                          <div className='dashboard-quickaction-icon'>
                            <AssignmentIcon style={{ fontSize: '40px', color: '#04204b' }} />
                          </div>

                          <div className='dashboard-quickaction-content'>
                            <h2 className='dashboard-quickaction-text'>Verificar Manutenções</h2>
                            <p className='dashboard-quickaction-text-p'>Datas e horários de manutenções agendadas.</p>
                          </div>
                          <Link to="/chamados">
                            <button className='dashboard-quickaction-button'>Visualizar</button>
                          </Link>
                        </div>
                      </div>
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
