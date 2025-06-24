import { React, useState, useEffect } from "react";
import Loading from "../../components/Loading";
import { Link, useNavigate } from "react-router-dom";
import './errors.css'
import '../header.css'
import '../painel/dashboard.css'
import '../../components/MenuAutSuporte.css'
import MenuAutSuporte from '../../components/MenuAutSuporte';
import StorageIcon from '@mui/icons-material/Storage';
import ApiIcon from '@mui/icons-material/Api';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';

const Errors = () => {
    const [isLoading, setIsLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem("user"));

    const [userColor, setUserColor] = useState('');

    const [errors, setErrors] = useState([]);

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
        document.title = "AutSuporte - Logs de Erros";

        async function fetchErrors() {
            try {
                const response = await fetch("http://localhost:9000/api/clientes");
                const data = await response.json();
                setClients(data.user || []);
            } catch (erro) {
                console.error("Erro ao buscar dados da API:", erro);
            }
        }

        // Defina a cor do usuário ao montar o componente
        if (user) {
            setUserColor(getOrCreateUserColor(user.email || user.id || "default"));
        }

        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);


        fetchErrors();
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    const totalErrors = errors.length;
    const totalErrorsDB = errors.reduce((total, errors) => total + (Number(errors.errorDB) || 0), 0);
    const totalErrorsAPI = errors.reduce((total, errors) => total + (Number(errors.errorAPI) || 0), 0);

    return (
        <>
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
                        <h1 className='dashboard-title'>Logs de Erros</h1>
                        <p className='dashboard-subtitle'>Olá <font color='#0356bb'>{user.name},</font> esses são os dados de log de erros dos clientes.</p>
                    </div>

                    <div className='dashboard-content-container-errors'>
                        <div className='dashboard-content-errors'>
                            <div className='dashboard-header-errors'>
                                <div className='dashboard-header-options'>
                                    <select name="errors-select" id="errors-select" className='errors-select'>
                                        <option value="all">Todos</option>
                                        <option value="edb">Erros de Banco de Dados</option>
                                        <option value="eapi">Erros de API</option>
                                    </select>
                                </div>

                                <div className='dashboard-header-search'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                    </svg>
                                    <input type="text" placeholder='Buscar:' />
                                </div>

                                <div className='dashboard-errors-countrow'>
                                    <select name="rows-count" id="errors-row-count" className="errors-countrow">
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select>
                                </div>
                            </div>

                            <div className='dashboard-content-stats'>
                                <div className='dashboard-stats-card'>
                                    <div className='dashboard-stats-title'>
                                        <GppMaybeIcon style={{ color: 'red' }}></GppMaybeIcon>
                                        <h1>Total de Erros</h1>
                                    </div>
                                    <p style={{ fontSize: "1.6rem", fontWeight: "bold", color: "#000000" }}>
                                        {totalErrors}
                                    </p>
                                </div>

                                <div className='dashboard-stats-card'>
                                    <div className='dashboard-stats-title'>
                                        <StorageIcon style={{ color: 'purple' }}></StorageIcon>
                                        <h1>Total de Erros de Banco de Dados</h1>
                                    </div>

                                    <p style={{ fontSize: "1.6rem", fontWeight: "bold", color: "#000000" }}>
                                        {totalErrorsDB}
                                    </p>
                                </div>

                                <div className='dashboard-stats-card'>
                                    <div className='dashboard-stats-title'>
                                        <ApiIcon style={{ color: 'orange' }}></ApiIcon>
                                        <h1>Total de Erros de API</h1>
                                    </div>

                                    <p style={{ fontSize: "1.6rem", fontWeight: "bold", color: "#000000" }}>
                                        {totalErrorsAPI}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <table className='table-errors'>
                                    <thead className='table-errors-head'>
                                        <tr>
                                            <th>Nome do Cliente</th>
                                            <th>Error Log</th>
                                            <th>Mensagem</th>
                                        </tr>
                                    </thead>
                                    <tbody className='table-body-errors'>
                                        {errors.length === 0 ? (
                                            <tr>
                                                <td colSpan={3} style={{ textAlign: 'center' }}>Nenhum dado encontrado.</td>
                                            </tr>
                                        ) : (
                                            errors.map((error, index) => (
                                                <tr key={index}>
                                                    <td>{error.clientName}</td>
                                                    <td>{error.errorLog}</td>
                                                    <td>{error.message}</td>
                                                </tr>
                                            ))
                                        )} 
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Errors;
