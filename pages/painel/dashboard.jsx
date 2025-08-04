import { useState, useEffect } from 'react';
import '../header.css';
import './dashboard.css';
import '../../components/MenuAutSuporte.css'
import { Link } from 'react-router-dom'
import Loading from '../../components/Loading';
import MenuToggleProvider from '../../components/MenuToggleProvider';
import MenuAutSuporte from '../../components/MenuAutSuporte';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { LineChart } from '@mui/x-charts/LineChart';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddCommentIcon from '@mui/icons-material/AddComment';

function Dashboard() {

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const userOn = JSON.parse(localStorage.getItem("user"));
  if (!userOn) {
    return <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', marginTop: '60px', color: '#ff0000', backgroundColor: '#f8d7da', padding: '20px', borderRadius: '10px', maxWidth: '600px', margin: 'auto' }}>
      <p>Usuário não encontrado. Por favor, faça login novamente.</p>

      <Link to="/home"><button style={{ backgroundColor: '#FFAAAA', color: 'red', padding: '10px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Home</button></Link>
    </div>;
  }

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
                    <div className='add-informations-content' style={{ display: 'flex', flexDirection: 'row' }}>
                      <div>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
                          <AddCommentIcon style={{ fontSize: '20px', color: '#04204b' }} />
                          <h2 className='dashboard-section-title'>Chamados Abertos</h2>
                        </div>

                        <h1 className='dashboard-informations-text' style={{ fontWeight: '700', fontSize: '25px' }}>{payload.chamados}42</h1>
                        <p className='dashboard-infos-status' style={{ fontWeight: '600' }}>{payload.statuschamado}+8% nessa semana</p>
                      </div>

                      <div>
                        <LineChart
                          xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7] }]}
                          series={[
                            {
                              curve: "linear",
                              data: [47, 54, 50, 58, 42, 21, 8],

                              area: true,
                              color: '#04204b',
                            },
                          ]}
                          height={108}
                          width={350}
                          margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                          grid={{ horizontal: true }}

                        />
                      </div>
                    </div>
                  </div>

                  <div className='dashboard-add-informations'>
                    <div className='add-informations-content'>
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
                        <AccessTimeIcon style={{ fontSize: '20px', color: '#04204b' }} />
                        <h2 className='dashboard-section-title'>Tempo médio de Resolução</h2>
                      </div>
                      <div>
                        <h1 className='dashboard-informations-text' style={{ fontWeight: '700', fontSize: '25px' }}>{payload.statusresolucao}1:30h</h1>
                        <p className='dashboard-infos-status' style={{ fontWeight: '600' }}>{payload.statusresolucaoinfo}-15% nessa semana</p>
                      </div>
                    </div>
                  </div>

                  <div className='dashboard-add-informations'>
                    <div className='add-informations-content' style={{ display: 'flex', flexDirection: 'row' }}>
                      <div>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-people" viewBox="0 0 16 16" style={{ color: '#04204b' }}>
                            <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
                          </svg>
                          <h2 className='dashboard-section-title'>Clientes Ativos</h2>
                        </div>
                        <h1 className='dashboard-informations-text' style={{ fontWeight: '700', fontSize: '25px' }}>{payload.chamados}192</h1>
                        <p className='dashboard-infos-status' style={{ fontWeight: '600' }}>{payload.statuschamado}+3 nesse mês</p>
                      </div>

                      <div>
                        <LineChart
                          xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }]}
                          series={[
                            {
                              curve: "linear",
                              data: [168, 172, 175, 179, 180, 178, 181, 184, 187, 189, 190, 192],
                              color: '#04204b',
                            },
                          ]}
                          height={108}
                          width={450}
                          margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                          grid={{ horizontal: true }}

                        />
                      </div>
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
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16" style={{ color: '#04204b' }}>
                          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                        </svg>
                        <h2 className='section-title'>Dados Cadastrais</h2>
                      </div>


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
