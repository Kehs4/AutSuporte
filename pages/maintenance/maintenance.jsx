import { useState, useEffect } from 'react';
import './maintenance.css';
import '../../components/MenuAutSuporte.css'
import { Link } from 'react-router-dom'
import Loading from '../../components/Loading';
import MenuToggleProvider from '../../components/MenuToggleProvider';
import MenuAutSuporte from '../../components/MenuAutSuporte';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

function Maintenance() {

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

    const [userColor, setUserColor] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [clientData, setClientData] = useState(null);
    const [scriptLog, setScriptLog] = useState('Retornar os logs do andamento do script abaixo');

    useEffect(() => {
        document.title = "AutSuporte - Manutenção Mensal";

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

    // Função para buscar dados do cliente
    //async function fetchClientMaintenance(clientName) {
    // try {

    //       const response = await fetch(`http://seu-endpoint.com/api/clientes?nome=${encodeURIComponent(clientName)}`);
    //       const data = await response.json();
    //        setClientData(data);
    //     } catch (error) {
    //         setClientData(null);
    //      }
    //  }


    const handleRowDoubleClick = (clientName) => {
        //setSelectedClient(clientName);
        setModalVisible(true);
        //fetchClientMaintenance(clientName);
    };

    // Função para fechar o modal
    const closeModal = () => {
        setModalVisible(false);
        setClientData(null);
        setSelectedClient(null);
        setScriptLog('Retornar os logs do andamento do script abaixo');
    };

    function getNextMaintenanceDate(lastDate) {
        if (!lastDate) return '';
        const date = new Date(lastDate.split('/').reverse().join('-'));
        date.setMonth(date.getMonth() + 1);
        return date.toLocaleDateString('pt-BR');
    }

    function MaintenanceScript() {
        setScriptLog('Script de manutenção rodando...');
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
                                <h1 className='dashboard-title'>Manutenção Mensal</h1>
                                <p className='dashboard-subtitle'>Olá <font color='#0356bb'>{payload.username}!</font>, esses são os dados da Manutenção Mensal dos clientes.</p>
                            </div>

                            <div className='dashboard-content-maintenance'>
                                <div className='dashboard-header-errors'>
                                    <div className='dashboard-header-options'>
                                        <div className='dashboard-header-search'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                            </svg>
                                            <input
                                                type="text"
                                                placeholder='Buscar:'
                                                id='errors-search'
                                            />
                                        </div>
                                    </div>

                                    <button
                                        className='button-refresh'
                                        style={{ marginLeft: '2rem' }}
                                    >
                                        Atualizar
                                    </button>
                                </div>

                                <div className='dashboard-content-stats'>
                                    <div className='dashboard-stats-card'>
                                        <div className='dashboard-stats-title'>
                                            <ManageAccountsIcon style={{ color: 'blue' }} />
                                            <h1>Manutenções Realizadas</h1>
                                        </div>
                                        <p style={{ fontSize: "1.6rem", fontWeight: "bold", color: "#000000" }}>
                                            2
                                        </p>
                                    </div>

                                    <div className='dashboard-stats-card'>
                                        <div className='dashboard-stats-title'>
                                            <ManageAccountsIcon style={{ color: 'red' }} />
                                            <h1>Manutenções não Realizadas</h1>
                                        </div>
                                        <p style={{ fontSize: "1.6rem", fontWeight: "bold", color: "#000000" }}>
                                            1
                                        </p>
                                    </div>
                                </div>


                                {modalVisible && (
                                    <div className='modal-maintenance-background' onClick={closeModal}>
                                        <div className='modal-maintenance-content' onClick={e => e.stopPropagation()}>
                                            <div className='modal-maintenance-header'>
                                                <h2 className='dashboard-content-maintenance-title'>
                                                    {selectedClient || 'Cliente A'}
                                                </h2>
                                                <button onClick={closeModal}>×</button>
                                            </div>
                                            <div className='modal-maintenance-body'>
                                                <div className='modal-maintenance-info'>
                                                    <p className='maintenance-date'>Data da última atualização: 01/01/2023</p>
                                                    <p className='maintenance-date'>Data da próxima atualização: <font color='blue'>01/02/2023</font></p>
                                                    <p className='maintenance-status'>Status: <font color='red'>{clientData ? 'Realizada' : 'Não Realizada'}</font></p>

                                                    <h4 style={{ marginTop: '1rem', color: '#04204b' }}>Informações do Servidor</h4>
                                                    <p className='maintenance-server-info'>Nome do Servidor: Servidor A</p>
                                                    <p className='maintenance-server-info'>IP do Servidor: 192.168.0.150</p>
                                                    <p className='maintenance-server-info'>Sistema Operacional: Windows Server 2019</p>
                                                    <p className='maintenance-server-info'>Versão do Postgres: 9.0.23</p>
                                                    <p className='maintenance-server-info'>Antivírus: Karpesky</p>
                                                </div>



                                                <div className='modal-maintenance-actions'>
                                                    <div>
                                                        <h4>Log do Script</h4>
                                                        <textarea
                                                            className='maintenance-script-log'
                                                            name=""
                                                            id="maintenance-script-log"
                                                            cols="30"
                                                            rows="10"
                                                            value={scriptLog}
                                                            readOnly
                                                        />
                                                    </div>
                                                    <button
                                                        className='btn-modal-script'
                                                        onClick={MaintenanceScript}
                                                    >
                                                        Rodar Script
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className='dashboard-content-maintenance-table'>
                                    <table className='table-maintenance'>
                                        <thead className='table-maintenance-head'>
                                            <tr>
                                                <th>ID</th>
                                                <th>Cliente</th>
                                                <th>Data da Manutenção</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className='table-body'>
                                            <tr onDoubleClick={() => handleRowDoubleClick('Cliente A')}>
                                                <td>1</td>
                                                <td>Cliente A</td>
                                                <td>01/01/2023</td>
                                                <td>Realizada</td>
                                            </tr>
                                            <tr onDoubleClick={() => handleRowDoubleClick('Cliente B')}>
                                                <td>2</td>
                                                <td>Cliente B</td>
                                                <td>02/01/2023</td>
                                                <td>Não Realizada</td>
                                            </tr>
                                            <tr onDoubleClick={() => handleRowDoubleClick('Cliente C')}>
                                                <td>3</td>
                                                <td>Cliente C</td>
                                                <td>03/01/2023</td>
                                                <td>Realizada</td>
                                            </tr>
                                        </tbody>

                                    </table>
                                </div>
                            </div>


                        </div>
                    </div>
                </>
            )}
        </MenuToggleProvider>

    );

}

export default Maintenance;
