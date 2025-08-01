import { React, useState, useEffect } from "react";
import Loading from "../../components/Loading";
import { data, Link, useNavigate } from "react-router-dom";
import './errors.css'
import '../header.css'
import '../painel/dashboard.css'
import '../../components/MenuAutSuporte.css'
import MenuAutSuporte from '../../components/MenuAutSuporte';
import StorageIcon from '@mui/icons-material/Storage';
import ApiIcon from '@mui/icons-material/GppMaybe';
import GppMaybeIcon from '@mui/icons-material/Api';

const Errors = () => {
    const [isLoading, setIsLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem("user"));

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

    const [errors, setErrors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(25);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function menuSwitch() {
        setIsMenuOpen((prev) => !prev);
    }

    function handleCloseMenu() {
        setIsMenuOpen(false);
    }

    async function fetchErrors() {
            try {
                const response = await fetch("http://177.11.209.38/vertis/VertisConnect.dll/api/V1.1/dados_itg/211/1");
                const data = await response.json();
                console.log(data);

                setErrors(Array.isArray(data) ? data : (data.ultimos_logs || []));
            } catch (erro) {
                console.error("Erro ao buscar dados da API:", erro);
            }
        }


    function refreshApis() {
       fetchErrors();
        setTimeout(() =>  1000); // Pequeno delay para UX
    }
    

    if (!user) {
        return <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', marginTop: '60px', color: '#ff0000', backgroundColor: '#f8d7da', padding: '20px', borderRadius: '10px', maxWidth: '600px', margin: 'auto' }}>
            <p>Usuário não encontrado. Por favor, faça login novamente.</p>

            <Link to="/home"><button style={{ backgroundColor: '#FFAAAA', color: 'red', padding: '10px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Home</button></Link>
        </div>;
    }

    useEffect(() => {
        document.title = "AutSuporte - Logs de Erros";

        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        setCurrentPage(1);
        fetchErrors();
        return () => clearTimeout(timer);

    }, [filterType, rowsPerPage]);

    if (isLoading) {
        return <Loading />;
    }

    

    // Filtra os erros conforme select e busca
    const filteredErrors = Array.isArray(errors) && errors
        .filter(error => {
            if (filterType !== "all") {
                return (error.desc_sistema || '').toLowerCase() === filterType.toLowerCase();
            }
            return true;
        })
        .filter(error => {
            return (
                (error.desc_sistema || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                (error.tabela || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                (error.msg_log || '').toLowerCase().includes(searchTerm.toLowerCase())
            );
        });

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredErrors.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(filteredErrors.length / rowsPerPage);

    const totalErrors = filteredErrors.length;
    const totalErrorsDB = filteredErrors.reduce((total, error) => total + (Number(error.errorDB) || 0), 0);
    const totalErrorsAPI = filteredErrors.reduce((total, error) => total + (Number(error.errorAPI) || 0), 0);

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
                <MenuAutSuporte isMenuOpen={isMenuOpen} user={user} onCloseMenu={handleCloseMenu} />

                <div className={`dashboard-container${isMenuOpen ? ' menu-open' : ''}`}>
                    <div className='dashboard-header'>
                        <h1 className='dashboard-title'>Logs de Erros</h1>
                        <p className='dashboard-subtitle'>Olá <font color='#0356bb'>{payload.username},</font> esses são os dados de log de erros dos clientes.</p>
                    </div>

                    <div className='dashboard-content-container-errors'>
                        <div className='dashboard-content-errors'>
                            <div className='dashboard-header-errors'>
                                <div className='dashboard-header-options'>
                                    <select
                                        name="errors-select"
                                        id="errors-select"
                                        className='errors-select'
                                        value={filterType}
                                        onChange={e => setFilterType(e.target.value)}
                                    >
                                        <option value="all">Todos</option>
                                        <option value="Pet Love">Pet Love</option>
                                        <option value="TMS Logistica">TMS Logística</option>
                                        <option value="Financeiro Smart">Financeiro Smart</option>
                                        <option value="Veros">Veros</option>
                                    </select>
                                </div>

                                <div className='dashboard-header-search'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                    </svg>
                                    <input
                                        type="text"
                                        placeholder='Buscar:'
                                        id='errors-search'
                                        value={searchTerm}
                                        onChange={e => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                

                                <div className='dashboard-errors-countrow'>
                                    <select
                                        name="rows-count"
                                        id="errors-row-count"
                                        className="errors-countrow"
                                        value={rowsPerPage}
                                        onChange={e => setRowsPerPage(Number(e.target.value))}
                                    >
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select>
                                </div>

                                <button
                                        className='button-refresh'
                                        onClick={refreshApis}
                                        style={{marginLeft: '2rem'}}
                                    >
                                        Atualizar Status das API's
                                    </button>

                                <div className="table-pagination">
                                    <button
                                        onClick={() => setCurrentPage(1)}
                                        disabled={currentPage === 1}
                                    >{"<<"}</button>
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                        disabled={currentPage === 1}
                                    >{"<"}</button>
                                    <span>Página {currentPage} de {totalPages}</span>
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                        disabled={currentPage === totalPages}
                                    >{">"}</button>
                                    <button
                                        onClick={() => setCurrentPage(totalPages)}
                                        disabled={currentPage === totalPages}
                                    >{">>"}</button>
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
                                            <th>ID</th>
                                            <th>Cód. Sistema</th>
                                            <th className="system-name">Nome do Sistema</th>
                                            <th>Tabela</th>
                                            <th className="cod-idv">Identificador Vertis</th>
                                            <th className="cod-idt">Identificador Terceiro</th>
                                            <th className="ind-origin">Origem</th>
                                            <th>Mensagem</th>
                                            <th className="dth-include">Data Inclusão</th>
                                            <th>Status Code</th>
                                        </tr>
                                    </thead>
                                    <tbody className='table-body-errors'>
                                        {currentRows.map((error, index) => (
                                            <tr key={index}>
                                                <td>{error.id}</td>
                                                <td>{error.cod_sistema}</td>
                                                <td>{error.desc_sistema}</td>
                                                <td>{error.tabela}</td>
                                                <td>{error.identificador_vertis}</td>
                                                <td>{error.identificador_terceiro}</td>
                                                <td>{error.ind_origem}</td>
                                                <td>{error.msg_log}</td>
                                                <td>{error.dth_inclusao}</td>
                                                <td>{error.status_code}</td>
                                            </tr>
                                        ))}
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
