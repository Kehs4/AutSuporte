import { useState, useEffect } from 'react';
import '../../components/MenuAutSuporte.css'
import { Link } from 'react-router-dom'
import Loading from '../../components/Loading';
import MenuToggleProvider from '../../components/MenuToggleProvider';
import MenuAutSuporte from '../../components/MenuAutSuporte';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddCommentIcon from '@mui/icons-material/AddComment';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import SourceIcon from '@mui/icons-material/Source';
import './chamados.css'

function Chamados() {

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    const userOn = JSON.parse(localStorage.getItem("user"));
    if (!userOn) {
        return <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', marginTop: '60px', color: '#ff0000', backgroundColor: '#f8d7da', padding: '20px', borderRadius: '10px', maxWidth: '600px', margin: 'auto' }}>
            <p>Usuário não encontrado. Por favor, faça login novamente.</p>

            <Link to="/home"><button style={{ backgroundColor: '#FFAAAA', color: 'red', padding: '10px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Home</button></Link>
        </div>;
    }
    const agora = new Date();
    const pad = n => n.toString().padStart(2, '0');
    const dataFormatada = `${agora.getFullYear()}-${pad(agora.getMonth() + 1)}-${pad(agora.getDate())} ${pad(agora.getHours())}:${pad(agora.getMinutes())}`;
    
    const [chamados, setChamados] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [newChamado, setNewChamado] = useState({
        dataFormatada: '',
        data_chamado: '',
        cliente: '',
        chamado: '',
        solucao: '',
        encerrado: ''
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(25);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    function handleOpenModal() {
        
        
        setModalOpen(true);
        setNewChamado({
            dataFormatada: dataFormatada,
            data_chamado: '',
            cliente: '',
            chamado: '',
            solucao: '',
            encerrado: ''
        });
    }

    function handleCloseModal() {
        setModalOpen(false);
    }

    function handleChange(e) {
        setNewChamado({ ...newChamado, [e.target.name]: e.target.value });
    }

    function handleSaveChamado() {
        setChamados(prev => [...prev, newChamado]);
        setModalOpen(false);
    }

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

    async function fetchChamados() {
        try {
            const response = await fetch('http://localhost:9000/chamados');
            if (!response.ok) {
                throw new Error('Erro ao buscar chamados');
            }
            const data = await response.json();
            setChamados(data);
        } catch (error) {
            console.error('Erro ao buscar chamados:', error);
        }
    }

    useEffect(() => {
        document.title = "AutSuporte - Chamados";

        // Recupera os dados do usuário do localStorage
        const storedUser = localStorage.getItem('user');

        if (storedUser && storedUser !== '{}') {
            setUser(JSON.parse(storedUser));
        }


        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        fetchChamados();
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    function formatDateOnly(value) {
        if (!value) return '';
        // Aceita formatos: "2025-01-02 03:00:00.00" ou "2025-01-02"
        const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
        if (!match) return value;
        const [, year, month, day] = match;
        return `${day}/${month}/${year}`;
    }

    function formatDateHourMinute(value) {
        if (!value) return '';
        // Aceita formatos: "2025-01-02 03:00:00.00" ou "2025-01-02 03:00:00"
        const match = value.match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})/);
        if (!match) return value;
        const [, year, month, day, hour, minute] = match;
        return `${day}/${month}/${year} ${hour}:${minute}`;
    }

    // Função para filtrar chamados pelo período selecionado
    function filtrarPorPeriodo(chamados) {
        if (!startDate && !endDate) return chamados;
        return chamados.filter(chamado => {
            const data = chamado.data_hora ? new Date(chamado.data_hora) : null;
            if (!data || isNaN(data.getTime())) return false;
            let afterStart = true, beforeEnd = true;
            if (startDate) {
                const inicio = new Date(startDate);
                afterStart = data >= inicio;
            }
            if (endDate) {
                const fim = new Date(endDate);
                // Inclui o dia final até 23:59
                fim.setHours(23, 59, 59, 999);
                beforeEnd = data <= fim;
            }
            return afterStart && beforeEnd;
        });
    }

    // Aplica filtro de período antes do filtro de busca
    const chamadosPeriodo = filtrarPorPeriodo(chamados);

    // Função para buscar em todas as colunas da linha
    function chamadoMatchesSearch(chamado, searchTerm) {
        if (!searchTerm) return true;
        const term = searchTerm.toLowerCase();

        const campos = [
            'data_chamado',
            'cliente',
            'contato',
            'data_hora',
            'categoria',
            'chamado',
            'solucao',
            'status',
            'encerrado',
            'tempo',
            'analista',
            'nota'
        ];
        return campos.some(campo => {
            const valor = chamado[campo];
            return valor && String(valor).toLowerCase().includes(term);
        });
    }

    // Filtra chamados pelo nome do cliente
    const filteredChamados = chamadosPeriodo.filter(chamado =>
        chamadoMatchesSearch(chamado, searchTerm)
    );

    function handleSort(key) {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    }

    function getSortedChamados(chamados) {
        // Se não houver sortConfig, ordena por data_hora decrescente (mais recente primeiro)
        if (!sortConfig.key) {
            return [...chamados].sort((a, b) => {
                const aValue = new Date(a.data_hora || a.data_chamado);
                const bValue = new Date(b.data_hora || b.data_chamado);
                return bValue - aValue; // decrescente
            });
        }
        return [...chamados].sort((a, b) => {
            let aValue = a[sortConfig.key] || '';
            let bValue = b[sortConfig.key] || '';
            if (sortConfig.key === 'data_chamado' || sortConfig.key === 'data_hora' || sortConfig.key === 'encerrado') {
                aValue = new Date(aValue);
                bValue = new Date(bValue);
            } else {
                aValue = String(aValue).toLowerCase();
                bValue = String(bValue).toLowerCase();
            }
            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }

    const sortedChamados = getSortedChamados(filteredChamados);
    const totalPages = Math.ceil(sortedChamados.length / itemsPerPage);
    const paginatedChamados = sortedChamados.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    function handleRowDoubleClick(chamado) {
        setNewChamado({
            dataFormatada: formatDateHourMinute(chamado.data_chamado || newChamado.dataFormatada || ''),
            data_hora: formatDateHourMinute(chamado.data_hora || ''),
            cliente: chamado.cliente || '',
            chamado: chamado.chamado || '',
            solucao: chamado.solucao || '',
            encerrado: chamado.encerrado || '',
            analista: chamado.analista || ''
        });
        setModalOpen(true);
    }
    const chamadosEmAberto = sortedChamados.filter(c => c.status === 'Pendente').length;
    const quantidadeChamadosTotal = sortedChamados.length;


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
                                <h1 className='dashboard-title'>Chamados</h1>
                                <p className='dashboard-subtitle'>Olá <font color='#0356bb'>{payload.username}!</font>, esse são os chamados realizados.</p>
                            </div>

                            <div className='dashboard-content-container-licenses'>

                                <div className='dashboard-content-stats'>
                                    <div className='dashboard-stats-card'>
                                        <div className='dashboard-stats-title'>
                                            <AddCommentIcon style={{ color: '#ff9100ff' }} />
                                            <h1>Chamados em Aberto</h1>
                                        </div>
                                        <p style={{ fontSize: "1.6rem", fontWeight: "bold", color: "#000000" }}>
                                            {chamadosEmAberto}
                                        </p>
                                    </div>

                                    <div className='dashboard-stats-card'>
                                        <div className='dashboard-stats-title'>
                                            <FactCheckIcon style={{ color: '#00b300' }} />
                                            <h1>Chamados Resolvidos Hoje</h1>
                                        </div>
                                        <p style={{ fontSize: "1.6rem", fontWeight: "bold", color: "#000000" }}>
                                            0
                                        </p>
                                    </div>

                                    <div className='dashboard-stats-card'>
                                        <div className='dashboard-stats-title'>
                                            <AccessTimeIcon style={{ color: '#04204b' }} />
                                            <h1>Tempo Médio de Resolução (7 dias)</h1>
                                        </div>

                                        <p style={{ fontSize: "1.6rem", fontWeight: "bold", color: "#000000" }}>
                                            1h30min
                                        </p>
                                    </div>

                                    <div className='dashboard-stats-card'>
                                        <div className='dashboard-stats-title'>
                                            <SourceIcon style={{ color: '#008cffff' }} />
                                            <h1>Total de Chamados</h1>
                                        </div>

                                        <p style={{ fontSize: "1.6rem", fontWeight: "bold", color: "#000000" }}>
                                            {quantidadeChamadosTotal}
                                        </p>
                                    </div>
                                </div>


                                <button
                                    className='btn-new-chamado'
                                    style={{ position: 'fixed', bottom: 20, right: 20, alignItems: 'center', color: '#fff',
                                        border: 'none', borderRadius: '50px', width: '50px', height: '50px', fontWeight: 'bold',
                                        fontSize: '1.2rem', marginBottom: '16px', cursor: 'pointer', border: '1px solid #ffdab7ff',
                                    }}
                                    onClick={handleOpenModal}
                                >
                                    +
                                </button>

                                {modalOpen && (
                                    <form className="modal-background" onSubmit={handleSaveChamado} style={{
                                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                                        background: 'rgba(0, 0, 0, 0.48)', display: 'flex', alignItems: 'center',
                                        justifyContent: 'center', zIndex: 9999
                                    }} onClick={handleCloseModal}>
                                        <div className="modal-content" style={{
                                            background: '#fff', padding: 32, borderRadius: 12,
                                            minWidth: 700, minHeight: 400, boxShadow: '0 2px 16px rgba(0,0,0,0.15)'
                                        }} onClick={e => e.stopPropagation()}>
                                            <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#00173aff', marginBottom: '15px', width: '100%', borderRadius: '12px' }}>
                                                <h2 style={{ padding: '15px', color: '#fff' }}>Novo Chamado</h2>
                                            </div>

                                            <div className='modal-form' style={{ display: 'flex', flexDirection: 'row', gap: '10px', textAlign: 'left' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', minWidth: '300px', marginRight: '20px' }}>
                                                    <h4 style={{ textAlign: 'center', marginBottom: '5px', fontSize: '1.1rem' }}>Cliente</h4>

                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>

                                                        <label>
                                                            Data
                                                        </label>

                                                        <input
                                                            className='input-modal-chamados'
                                                            type='text'
                                                            name="dataFormatada"
                                                            value={newChamado.dataFormatada}
                                                            onChange={handleChange}
                                                            required
                                                            disabled
                                                        />
                                                    </div>

                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>

                                                        <label>
                                                            Data e Hora da Abertura
                                                        </label>

                                                        <input
                                                            className='input-modal-chamados'
                                                            type='text'
                                                            name="data_hora"
                                                            value={newChamado.data_hora}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>

                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>

                                                        <label>
                                                            Nome do Cliente
                                                        </label>
                                                        <input className='input-modal-chamados' type="text" name="cliente" value={newChamado.cliente} onChange={handleChange} placeholder='Nome do Cliente' required />
                                                    </div>

                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <label>
                                                            Motivo do Chamado
                                                        </label>
                                                        <textarea className='comment-solution' name="chamado" value={newChamado.chamado} onChange={handleChange} cols={20} rows={5} placeholder='Escreva o motivo do chamado do cliente aqui...' required />

                                                    </div>
                                                </div>

                                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '300px', borderLeft: '1px solid #04024B' }}>

                                                </div>

                                                <div style={{ display: 'flex', flexDirection: 'column', minWidth: '300px', marginLeft: '20px' }}>
                                                    <h4 style={{ textAlign: 'center', marginBottom: '5px', fontSize: '1.1rem' }}>Analista</h4>
                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <label>
                                                            Solução do Chamado
                                                        </label>
                                                        <textarea className='comment-solution' name="solucao" value={newChamado.solucao} onChange={handleChange} cols={20} rows={5} placeholder='Escreva a solução encontrada...' required />

                                                    </div>


                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <label>
                                                            Data e Hora Final
                                                        </label>
                                                        <input
                                                            className='input-modal-chamados'
                                                            type="text"
                                                            name="encerrado"
                                                            value={newChamado.encerrado}
                                                            onChange={handleChange}
                                                            required
                                                        />

                                                    </div>

                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>

                                                        <label>
                                                            Analista
                                                        </label>
                                                        <input className='input-modal-chamados' type="text" name="analista" value={newChamado.analista} onChange={handleChange} placeholder='Nome do Analista' required />
                                                    </div>
                                                </div>

                                            </div>

                                            <div style={{ marginTop: 24, display: 'flex', gap: '12px', justifyContent: 'flex-end', alignItems: 'center' }}>
                                                <button className='btn-cancel-chamados' onClick={handleCloseModal}>Cancelar</button>

                                                <button className='btn-save-chamado' type="submit">
                                                    <span class="button__icon-wrapper">
                                                        <svg
                                                            viewBox="0 0 14 15"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            class="button__icon-svg"
                                                            width="10"
                                                        >
                                                            <path
                                                                d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                                                                fill="currentColor"
                                                            ></path>
                                                        </svg>

                                                        <svg
                                                            viewBox="0 0 14 15"
                                                            fill="none"
                                                            width="10"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            class="button__icon-svg button__icon-svg--copy"
                                                        >
                                                            <path
                                                                d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                                                                fill="currentColor"
                                                            ></path>
                                                        </svg>
                                                    </span>
                                                    Salvar</button>
                                            </div>
                                        </div>
                                    </form>
                                )}

                                <div className='dashboard-header-chamados'>

                                    <div className='dashboard-header-search'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                        </svg>
                                        <input
                                            type="text"
                                            placeholder='Buscar:'
                                            id='search-clients'
                                            value={searchTerm}
                                            onChange={e => {
                                                setSearchTerm(e.target.value);
                                                setCurrentPage(1); // volta para a primeira página ao pesquisar
                                            }}
                                        />
                                    </div>

                                    <div className='dashboard-chamados-countrow'>
                                        <select
                                            name="rows-count"
                                            id="chamados-row-count"
                                            className="chamados-countrow"
                                            value={itemsPerPage}
                                            onChange={e => {
                                                const value = e.target.value === "" ? filteredChamados.length : Number(e.target.value);
                                                setItemsPerPage(value);
                                                setCurrentPage(1); // volta para a primeira página ao mudar o tamanho
                                            }}
                                        >
                                            <option value="">Todos</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                        </select>
                                    </div>

                                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '0 10px', marginLeft: '20px' }}>
                                        <label style={{ fontSize: '0.9rem' }}>
                                            De:&nbsp;
                                            <input
                                                type="date"
                                                value={startDate}
                                                onChange={e => {
                                                    setStartDate(e.target.value);
                                                    setCurrentPage(1);
                                                }}
                                                style={{ padding: '4px', minWidth: '150px', fontSize: '0.8rem', border: '1px solid #ccc', marginLeft: '5px', outline: 'none' }}
                                            />
                                        </label>
                                        <label>
                                            Até:&nbsp;
                                            <input
                                                type="date"
                                                value={endDate}
                                                onChange={e => {
                                                    setEndDate(e.target.value);
                                                    setCurrentPage(1);
                                                }}
                                                style={{ padding: '4px', minWidth: '150px', fontSize: '0.8rem', border: '1px solid #ccc', outline: 'none' }}
                                            />
                                        </label>
                                    </div>

                                    {totalPages > 1 && (
                                        <div className="table-pagination" style={{ display: 'flex', justifyContent: 'center' }}>
                                            <button
                                                onClick={() => setCurrentPage(1)}
                                                disabled={currentPage === 1}
                                            >{"<<"}</button>
                                            <button
                                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                                disabled={currentPage === 1}
                                            >{"<"}</button>
                                            <span>
                                                Página {currentPage} de {totalPages}
                                            </span>
                                            <button
                                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                                disabled={currentPage === totalPages}
                                            >{">"}</button>
                                            <button
                                                onClick={() => setCurrentPage(totalPages)}
                                                disabled={currentPage === totalPages}
                                            >{">>"}</button>
                                        </div>
                                    )}
                                </div>



                                <div className='dashboard-content-licenses'>

                                    <table className='table-chamados'>
                                        <thead className='table-licenses-head'>
                                            <tr>
                                                <th onClick={() => handleSort('data_chamado')} style={{ cursor: 'pointer' }}>Data</th>
                                                <th onClick={() => handleSort('cliente')} style={{ cursor: 'pointer' }}>Nome do Cliente</th>
                                                <th onClick={() => handleSort('contato')} style={{ cursor: 'pointer' }}>Contato</th>
                                                <th onClick={() => handleSort('encerrado')} style={{ cursor: 'pointer' }}>Horário do Chamado</th>
                                                <th onClick={() => handleSort('categoria')} style={{ cursor: 'pointer' }}>Categoria</th>
                                                <th onClick={() => handleSort('chamado')} style={{ cursor: 'pointer' }}>Motivo do Chamado</th>
                                                <th onClick={() => handleSort('solucao')} style={{ cursor: 'pointer' }}>Solução do Chamado</th>
                                                <th onClick={() => handleSort('status')} style={{ cursor: 'pointer' }}>Status</th>
                                                <th onClick={() => handleSort('data_hora')} style={{ cursor: 'pointer' }}>Horário Final</th>
                                                <th onClick={() => handleSort('tempo')} style={{ cursor: 'pointer' }}>Tempo decorrido</th>
                                                <th onClick={() => handleSort('analista')} style={{ cursor: 'pointer' }}>Analista</th>
                                                <th onClick={() => handleSort('nota')} style={{ cursor: 'pointer' }}>Nota</th>
                                            </tr>
                                        </thead>
                                        <tbody className='table-body-chamados'>
                                            {paginatedChamados.length === 0 ? (
                                                <tr>
                                                    <td colSpan={12} style={{ textAlign: 'center' }}>Nenhum dado encontrado.</td>
                                                </tr>
                                            ) : (
                                                paginatedChamados.map((chamado, index) => (
                                                    <tr
                                                        key={index}
                                                        onDoubleClick={() => handleRowDoubleClick(chamado)}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        <td className='datetime' style={{ fontSize: '10px' }}>
                                                            {formatDateHourMinute(chamado.data_chamado || newChamado.dataFormatada || '' )}
                                                        </td>
                                                        <td className='column-name-chamado'>{chamado.cliente}</td>
                                                        <td className='column-name-chamado'>{chamado.contato}</td>
                                                        <td className='datetime' style={{ fontSize: '10px' }}>{formatDateHourMinute(chamado.data_hora)}</td>
                                                        <td>{chamado.categoria}</td>
                                                        <td>{chamado.chamado}</td>
                                                        <td>{chamado.solucao}</td>
                                                        <td>{chamado.status}</td>
                                                        <td className='datetime' style={{ fontSize: '10px' }}>{formatDateHourMinute(chamado.encerrado)}</td>
                                                        <td>{chamado.tempo}</td>
                                                        <td>{chamado.analista}</td>
                                                        <td>{chamado.nota}</td>
                                                    </tr>
                                                ))
                                            )}
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

export default Chamados;