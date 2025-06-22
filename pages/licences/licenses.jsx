import { React, useState, useEffect } from "react";
import Loading from "../../components/Loading";
import { Link, useNavigate } from "react-router-dom";
import './licenses.css'
import '../header.css'
import '../painel/dashboard.css'
import '../../components/MenuAutSuporte.css'
import MenuAutSuporte from '../../components/MenuAutSuporte';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import StorageIcon from '@mui/icons-material/Storage';

const Licenses = () => {
    const [isLoading, setIsLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem("user"));

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

    const [clients, setClients] = useState([]);
    const [error, setError] = useState(null);

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
        document.title = "AutSuporte - Licenças de Uso";

        async function fetchClientes() {
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



        fetchClientes();
        return () => clearTimeout(timer);
    }, []);


    if (isLoading) {
        return <Loading />;
    }

    const calcularTendencia = (atual, anterior) => {
        if (anterior > 0) {
            const variacao = ((atual - anterior) / anterior) * 100;
            return variacao.toFixed(2);
        } else if (atual > 0) {
            return "∞";
        }
        return "0.00";
    };

    const getClasseTendencia = (valor) => {
        if (valor === "∞" || parseFloat(valor) > 0) return "positivo";
        if (parseFloat(valor) < 0) return "negativo";
        return "neutro";
    };

    const getIconeTendencia = (valor) => {
        if (valor === "∞" || parseFloat(valor) > 0) return "↑";
        if (parseFloat(valor) < 0) return "↓";
        return "→";
    };

    const totalClientes = clients.length;
    const totalLicencasAtivas = clients.reduce((total, client) => total + (Number(client.keys) || 0), 0);
    const totalLicencasMesPassado = clients.reduce((total, client) => total + (Number(client.keys_mes_passado) || 0), 0);
    const totalLicencasServidor = clients.reduce((total, client) => total + (Number(client.licencas_servidor) || 0), 0);

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
                        <h1 className='dashboard-title'>Licenças de Uso</h1>
                        <p className='dashboard-subtitle'>Olá <font color='#0356bb'>{user.name},</font> esses são os dados de licenças de usos dos clientes.</p>
                    </div>



                    <div className='dashboard-content-container-licenses'>

                        <div className='dashboard-content-stats'>
                            <div className='dashboard-stats-card'>
                                <div className='dashboard-stats-title'>
                                    <PeopleOutlineIcon style={{ color: '#006AAA' }}></PeopleOutlineIcon>
                                    <h1>Total de Clientes</h1>
                                </div>
                                <p style={{ fontSize: "1.6rem", fontWeight: "bold", color: "#000000" }}>
                                    {totalClientes}
                                </p>
                            </div>

                            <div className='dashboard-stats-card'>
                                <div className='dashboard-stats-title'>
                                    <AutoGraphIcon style={{ color: 'green' }}></AutoGraphIcon>
                                    <h1>Licenças de Uso Ativas</h1>
                                </div>

                                <p style={{ fontSize: "1.6rem", fontWeight: "bold", color: "#000000" }}>
                                    {totalLicencasAtivas}
                                </p>
                            </div>

                            <div className='dashboard-stats-card'>
                                <div className='dashboard-stats-title'>
                                    <SignalCellularAltIcon style={{ color: 'orange' }}></SignalCellularAltIcon>
                                    <h1>Licenças Mês Passado</h1>
                                </div>

                                <p style={{ fontSize: "1.6rem", fontWeight: "bold", color: "#000000" }}>
                                    {totalLicencasMesPassado}
                                </p>
                            </div>

                            <div className='dashboard-stats-card'>
                                <div className='dashboard-stats-title'>
                                    <StorageIcon style={{ color: 'purple' }}></StorageIcon>
                                    <h1>Licenças de Servidor</h1>
                                </div>

                                <p style={{ fontSize: "1.6rem", fontWeight: "bold", color: "#000000" }}>
                                    {totalLicencasServidor}
                                </p>
                            </div>
                        </div>

                        <div className='dashboard-content-licenses'>

                            <table className='table-licenses'>
                                <thead className='table-licenses-head'>
                                    <tr>
                                        <th>Nome do Cliente</th>
                                        <th>Licenças no mês passado</th>
                                        <th>Licenças no mês atual</th>
                                        <th>Licenças de Servidor</th>
                                        <th>Tendência</th>
                                    </tr>
                                </thead>
                                <tbody className='table-body'>
                                    {clients.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} style={{ textAlign: 'center' }}>Nenhum dado encontrado.</td>
                                        </tr>
                                    ) : (
                                        clients.map((client, index) => {
                                            const tendencia = calcularTendencia(
                                                Number(client.keys),
                                                Number(client.keys_mes_passado)
                                            );
                                            const classe = getClasseTendencia(tendencia);
                                            const icone = getIconeTendencia(tendencia);

                                            return (
                                                <tr key={index}>
                                                    <td>{client.name}</td>
                                                    <td>{client.keys_mes_passado}</td>
                                                    <td>{client.keys}</td>
                                                    <td>{client.licencas_servidor}</td>
                                                    <td style={{ ...tendenciaStyle[classe], }}>
                                                        {icone} {tendencia === "∞" ? "∞%" : `${tendencia}%`}
                                                    </td>
                                                </tr>
                                            );
                                        }))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

const tendenciaStyle = {
    positivo: { color: "rgb(24, 180, 32)", fontWeight: "bold" },
    negativo: { color: "rgb(189, 27, 27)", fontWeight: "bold" },
    neutro: { color: "rgb(189, 189, 189)", fontWeight: "bold" },
};

export default Licenses;