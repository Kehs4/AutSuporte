import { useState, useEffect } from 'react';
import '../../components/MenuAutSuporte.css'
import './apilogs.css';
import { Link } from 'react-router-dom'
import Loading from '../../components/Loading';
import MenuToggleProvider from '../../components/MenuToggleProvider';
import MenuAutSuporte from '../../components/MenuAutSuporte';
import GppMaybeIcon from '@mui/icons-material/Api';

function ApiLogs() {

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

    const [statusVertis, setStatusVertis] = useState('');
    const [statusLaudos, setStatusLaudos] = useState('');
    const [statusConstellation, setStatusConstellation] = useState('');
    const [statusNFSe, setStatusNFSe] = useState('');
    const [statusProvetHom, setStatusProvetHom] = useState('');
    const [statusProvetPro, setStatusProvetPro] = useState('');

    async function fetchStatusVertis() {
        try {
            const response = await fetch('http://177.11.209.38/vertis/VertisConnect.dll/api/V1.1/status', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Basic',
                },
            });
            const textV = await response.text();
            setStatusVertis(textV);
        } catch (error) {
            console.error('Não foi possível receber os dados da API do Vertis', error)
        }
    }

    async function fetchStatusLaudosOnline() {
        try {
            const response = await fetch('http://177.11.209.38/lol/IISLaudosONLineAPI.dll/lol-api/V1.1/status', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic',
                },
            });
            
            if (response) {
            const text = await response.text();
            setStatusLaudos(text);
            }
        } catch (error) {
            console.error('Não foi possível receber os dados da API Laudos Online', error)
        }
    }

    async function fetchStatusConstellation() {
        try {
            const response = await fetch('http://177.11.209.38:80/constellation/IISConstellationAPI.dll/constellation-api/V1.1/status', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic',
                },
            });
            const text = await response.text();
            setStatusConstellation(text);
        } catch (error) {
            console.error('Não foi possível receber os dados da API Constellation', error)
        }
    }

    async function fetchStatusNFSe() {
        try {
            const response = await fetch('http://177.11.209.38:8080/api/status', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic',
                },
            });
            const text = await response.text();
            setStatusNFSe(text);
        } catch (error) {
            console.error('Não foi possível receber os dados da API NFSe', error)
        }
    }

    async function fetchStatusProvetHom() {
        try {
            const response = await fetch('http://10.0.18.15:9001/api/V1.1/status', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic',
                },
            });
            const text = await response.text();
            setStatusProvetHom(text);
        } catch (error) {
            console.error('Não foi possível receber os dados da API Provet(Hom)', error)
        }
    }

    async function fetchStatusProvetPro() {
        try {
            const response = await fetch('http://10.0.18.15:9000/api/V1.1/status', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic',
                },
            });
            const text = await response.text();
            setStatusProvetPro(text);
        } catch (error) {
            console.error('Não foi possível receber os dados da API Provet(Pro)', error)
        }
    }

    // Função utilitária para determinar status
    function getApiStatus(text) {
        if (!text) return { label: 'Offline' , color: 'red' };
        
        const normalized = text.toLowerCase();
        if (
            normalized.includes('online')
        ) {
            return { label: 'Online', color: 'green' };
        }
        return { label: 'Offline', color: 'red' };
    }

    useEffect(() => {
        document.title = "AutSuporte - Logs API's";

        // Recupera os dados do usuário do localStorage
        const storedUser = localStorage.getItem('user');

        if (storedUser && storedUser !== '{}') {
            setUser(JSON.parse(storedUser));
        }

        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);


        fetchStatusVertis();
        fetchStatusLaudosOnline();
        fetchStatusConstellation();
        fetchStatusNFSe();
        fetchStatusProvetHom();
        fetchStatusProvetPro();
        return () => clearTimeout(timer);
    }, []);


    if (isLoading) {
        return <Loading />;
    }

    // Antes do return, calcule os totais:
    const apiStatuses = [
        getApiStatus(statusVertis),
        getApiStatus(statusLaudos),
        getApiStatus(statusConstellation),
        getApiStatus(statusNFSe),
        getApiStatus(statusProvetHom),
        getApiStatus(statusProvetPro),
    ];

    const onlineCount = apiStatuses.filter(status => status.label === 'Online').length;
    const offlineCount = apiStatuses.filter(status => status.label === 'Offline').length;

    function refreshAllApis() {
        fetchStatusVertis();
        fetchStatusLaudosOnline();
        fetchStatusConstellation();
        fetchStatusNFSe();
        fetchStatusProvetHom();
        fetchStatusProvetPro();
        setTimeout(() =>  1000); // Pequeno delay para UX
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
                                <h1 className='dashboard-title'>Logs das API's</h1>
                                <p className='dashboard-subtitle'>Olá <font color='#0356bb'>{payload.username}!,</font> esses são os dados das API's da GPI.</p>
                            </div>

                            <div className='dashboard-content-apilogs'>


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
                                        onClick={refreshAllApis}
                                        style={{marginLeft: '2rem'}}
                                    >
                                        Atualizar Status das API's
                                    </button>
                                </div>

                                <div className='dashboard-content-stats'>
                                    <div className='dashboard-stats-card'>
                                        <div className='dashboard-stats-title'>
                                            <GppMaybeIcon style={{ color: 'green' }} />
                                            <h1>API's Online</h1>
                                        </div>
                                        <p style={{ fontSize: "1.6rem", fontWeight: "bold", color: "#000000" }}>
                                            {onlineCount}
                                        </p>
                                    </div>

                                    <div className='dashboard-stats-card'>
                                        <div className='dashboard-stats-title'>
                                            <GppMaybeIcon style={{ color: 'red' }} />
                                            <h1>API's Offline</h1>
                                        </div>
                                        <p style={{ fontSize: "1.6rem", fontWeight: "bold", color: "#000000" }}>
                                            {offlineCount}
                                        </p>
                                    </div>
                                </div>

                                <div className='dashboard-content-apilogs-table'>
                                    <table className='table-apilogs'>
                                        <thead className='table-apilogs-head'>
                                            <tr>
                                                <th style={{minWidth: '400px'}}>Nome da API</th>
                                                <th>Mensagem</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className='table-body'>
                                            <tr>
                                                <td>Vertis Connect API</td>
                                                <td>{statusVertis}</td>
                                                <td>
                                                    {(() => {
                                                        const status = getApiStatus(statusVertis);
                                                        return (
                                                            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                                <span style={{
                                                                    display: 'inline-block',
                                                                    width: 10,
                                                                    height: 10,
                                                                    borderRadius: '50%',
                                                                    backgroundColor: status.color,
                                                                }}></span>
                                                                {status.label}
                                                            </span>
                                                        );
                                                    })()}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Laudos Online API</td>
                                                <td>{statusLaudos}</td>
                                                <td>
                                                    {(() => {
                                                        const status = getApiStatus(statusLaudos);
                                                        return (
                                                            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                                <span style={{
                                                                    display: 'inline-block',
                                                                    width: 10,
                                                                    height: 10,
                                                                    borderRadius: '50%',
                                                                    backgroundColor: status.color,
                                                                }}></span>
                                                                {status.label}
                                                            </span>
                                                        );
                                                    })()}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Constellation API</td>
                                                <td>{statusConstellation}</td>
                                                <td>
                                                    {(() => {
                                                        const status = getApiStatus(statusConstellation);
                                                        return (
                                                            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                                <span style={{
                                                                    display: 'inline-block',
                                                                    width: 10,
                                                                    height: 10,
                                                                    borderRadius: '50%',
                                                                    backgroundColor: status.color,
                                                                }}></span>
                                                                {status.label}
                                                            </span>
                                                        );
                                                    })()}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>NFSe</td>
                                                <td>{statusNFSe}</td>
                                                <td>
                                                    {(() => {
                                                        const status = getApiStatus(statusNFSe);
                                                        return (
                                                            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                                <span style={{
                                                                    display: 'inline-block',
                                                                    width: 10,
                                                                    height: 10,
                                                                    borderRadius: '50%',
                                                                    backgroundColor: status.color,
                                                                }}></span>
                                                                {status.label}
                                                            </span>
                                                        );
                                                    })()}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Provet (Hom)</td>
                                                <td>{statusProvetHom}</td>
                                                <td>
                                                    {(() => {
                                                        const status = getApiStatus(statusProvetHom);
                                                        return (
                                                            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                                <span style={{
                                                                    display: 'inline-block',
                                                                    width: 10,
                                                                    height: 10,
                                                                    borderRadius: '50%',
                                                                    backgroundColor: status.color,
                                                                }}></span>
                                                                {status.label}
                                                            </span>
                                                        );
                                                    })()}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Provet (Pro)</td>
                                                <td>{statusProvetPro}</td>
                                                <td>
                                                    {(() => {
                                                        const status = getApiStatus(statusProvetPro);
                                                        return (
                                                            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                                <span style={{
                                                                    display: 'inline-block',
                                                                    width: 10,
                                                                    height: 10,
                                                                    borderRadius: '50%',
                                                                    backgroundColor: status.color,
                                                                }}></span>
                                                                {status.label}
                                                            </span>
                                                        );
                                                    })()}
                                                </td>
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

export default ApiLogs;