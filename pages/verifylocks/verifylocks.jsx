import { useState, useEffect } from 'react';
import '../../components/MenuAutSuporte.css'
import './verifylocks.css';
import { Link } from 'react-router-dom'
import Loading from '../../components/Loading';
import MenuToggleProvider from '../../components/MenuToggleProvider';
import MenuAutSuporte from '../../components/MenuAutSuporte';

function VerifyLocks() {

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [clients, setClients] = useState([]);
    const [selectedClientId, setSelectedClientId] = useState('');
    const [clientDetails, setClientDetails] = useState(null);

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

    useEffect(() => {
        document.title = "AutSuporte - Verificar Locks";

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

    async function fetchClients() {
        try {
            const response = await fetch('http://177.11.209.38/vertis/VertisConnect.dll/api/V1.1/vertis/clientesfat', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Basic',
                },

            })
            const data = await response.json();
            setClients(data);
        } catch (error) {
            setClients([]);
        }
    }

    useEffect(() => {

        fetchClients();
    }, []);

    async function handleClientSelect(e) {
        const cod_cliente = e.target.value;
        setSelectedClientId(cod_cliente);
        if (!cod_cliente) {
            setClientDetails(null);
            return;
        }
        try {
            const response = await fetch(`http://177.11.209.38/vertis/VertisConnect.dll/api/V1.1/vertis/clientesfat/${cod_cliente}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Basic',
                },
            });
            const data = await response.json();
            console.log(data)
            setClientDetails(Array.isArray(data) ? data[0] : data);
        } catch (error) {
            console.error('Erro ao buscar detalhes do cliente:', error);
            setClientDetails(null);
        }
    }

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
                                <h1 className='dashboard-title'>Verificar Locks</h1>
                                <p className='dashboard-subtitle'>Olá <font color='#0356bb'>{payload.username}!</font>, essa é uma ferramenta que verifica se há locks nos servidores dos clientes.</p>
                            </div>

                            <div className='dashboard-content-verifylocks'>
                                <div className='dashboard-content-verifylocks-header'>
                                    <p className='dashboard-content-verifylocks-text'>Selecione um cliente para verificar se há lock no banco de dados.</p>
                                    <select
                                        className='clients-select'
                                        name="clients-select"
                                        id="clients-select"
                                        value={selectedClientId}
                                        onChange={handleClientSelect}
                                    >
                                        <option value="">Selecione um cliente</option>
                                        {clients.map((client) => (
                                            <option key={client.cod_cliente} value={client.cod_cliente}>
                                                {client.nome_cliente}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {clientDetails && (
                                    <div className='dashboard-content-verifylocks-body'>
                                        <h3 className='dashboard-content-verifylocks-title'>
                                            Cliente Selecionado: <font color='blue'>{clientDetails?.nome_cliente}</font>
                                        </h3>
                                        <div>
                                            <h4 style={{textAlign: 'center', fontSize: '20px', fontWeight: '400'}} className='dashboard-content-verifylocks-text'>Dados do Cliente</h4>
                                            <p className='dashboard-content-verifylocks-text'>
                                                Código do Cliente: {clientDetails?.cod_cliente || ''}
                                            </p>
                                            <p className='dashboard-content-verifylocks-text'>
                                                Banco de Dados do Cliente: PostgreSQL
                                            </p>
                                            <p className='dashboard-content-verifylocks-text'>
                                                IP do Servidor: {clientDetails?.ip_servidor_cliente || ''}
                                            </p>
                                            <p className='dashboard-content-verifylocks-text'>
                                                Porta do Servidor: {clientDetails?.porta_bd || ''}
                                            </p>
                                            <p className='dashboard-content-verifylocks-text'>
                                                Usuário do Banco de Dados: {clientDetails?.usuario_acesso_cliente || ''}
                                            </p>
                                            <p className='dashboard-content-verifylocks-text'>
                                                Senha do Banco de Dados: {clientDetails?.senha_criptografada || ''}
                                            </p>
                                        </div>

                                        <div>
                                            <p className='dashboard-content-verifylocks-text'>Clique no botão abaixo para verificar os locks do cliente selecionado.</p>
                                            <button className='btn-verify-locks' onClick={() => alert('Verificando locks...')}>Verificar Locks</button>
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </>
            )}
        </MenuToggleProvider>

    );

}

export default VerifyLocks;