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

    const [chamados, setChamados] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [newChamado, setNewChamado] = useState({
        horario: '',
        cliente: '',
        motivo: '',
        solucao: '',
        horafim: ''
    });

    function handleOpenModal() {
        setModalOpen(true);
        setNewChamado({
            horario: '',
            cliente: '',
            motivo: '',
            solucao: '',
            horafim: ''
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
        document.title = "AutSuporte - Chamados";

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
                                <h1 className='dashboard-title'>Chamados</h1>
                                <p className='dashboard-subtitle'>Olá <font color='#0356bb'>{payload.username}!</font>, esse são os chamados realizados.</p>
                            </div>

                            <div className='dashboard-content-container-licenses'>

                                <button
                                    className='btn-new-chamado'
                                    style={{
                                        position: 'fixed',
                                        bottom: 20,
                                        right: 20,
                                        alignItems: 'center',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '50px',
                                        width: '50px',
                                        height: '50px',
                                        fontWeight: 'bold',
                                        fontSize: '1.2rem',
                                        marginBottom: '16px',
                                        cursor: 'pointer',
                                        border: '1px solid #ffdab7ff',
                                    }}
                                    onClick={handleOpenModal}
                                >
                                    +
                                </button>

                                {modalOpen && (
                                    <form className="modal-background" onSubmit={handleSaveChamado} style={{
                                        position: 'fixed',
                                        top: 0, left: 0, right: 0, bottom: 0,
                                        background: 'rgba(0, 0, 0, 0.48)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        zIndex: 9999
                                    }} onClick={handleCloseModal}>
                                        <div className="modal-content" style={{
                                            background: '#fff',
                                            padding: 32,
                                            borderRadius: 12,
                                            minWidth: 700,
                                            minHeight: 400,
                                            boxShadow: '0 2px 16px rgba(0,0,0,0.15)'
                                        }} onClick={e => e.stopPropagation()}>
                                            <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#00173aff', marginBottom: '15px', width: '100%', borderRadius: '12px' }}>
                                                <h2 style={{ padding: '15px', color: '#fff' }}>Novo Chamado</h2>
                                            </div>

                                            <div className='modal-form' style={{ display: 'flex', flexDirection: 'row', gap: '10px', textAlign: 'left' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', minWidth: '300px', marginRight: '20px' }}>
                                                    <h4 style={{ textAlign: 'center', marginBottom: '5px', fontSize: '1.1rem'  }}>Cliente</h4>
                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <label>
                                                            Data e Hora da Abertura
                                                        </label>

                                                        <input className='input-modal-chamados' type='datetime-local' name="horario" value={newChamado.horario} onChange={handleChange} required/>
                                                    </div>

                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>

                                                        <label>
                                                            Nome do Cliente
                                                        </label>
                                                        <input className='input-modal-chamados' type="text" name="cliente" value={newChamado.cliente} onChange={handleChange} placeholder='Nome do Cliente' required/>
                                                    </div>

                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <label>
                                                            Motivo do Chamado
                                                        </label>
                                                        <textarea className='comment-solution' name="motivo" value={newChamado.motivo} onChange={handleChange} cols={20} rows={5} placeholder='Escreva o motivo do chamado do cliente aqui...' required/>

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
                                                        <textarea className='comment-solution' name="solucao" value={newChamado.solucao} onChange={handleChange} cols={20} rows={5} placeholder='Escreva a solução encontrada...' required/>

                                                    </div>


                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <label>
                                                            Data e Hora Final
                                                        </label>
                                                        <input className='input-modal-chamados' type="datetime-local" name="horafim" value={newChamado.horafim} onChange={handleChange} required/>

                                                    </div>

                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>

                                                        <label>
                                                            Analista
                                                        </label>
                                                        <input className='input-modal-chamados' type="text" name="analista" value={newChamado.analista} onChange={handleChange} placeholder='Nome do Analista' required/>
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

                                <div className='dashboard-content-stats'>
                                    <div className='dashboard-stats-card'>
                                        <div className='dashboard-stats-title'>
                                            <AddCommentIcon style={{ color: '#ff9100ff' }} />
                                            <h1>Chamados em Aberto</h1>
                                        </div>
                                        <p style={{ fontSize: "1.6rem", fontWeight: "bold", color: "#000000" }}>
                                            42
                                        </p>
                                    </div>

                                    <div className='dashboard-stats-card'>
                                        <div className='dashboard-stats-title'>
                                            <FactCheckIcon style={{ color: '#00b300' }} />
                                            <h1>Chamados Resolvidos Hoje</h1>
                                        </div>

                                        <p style={{ fontSize: "1.6rem", fontWeight: "bold", color: "#000000" }}>
                                            61
                                        </p>
                                    </div>

                                    <div className='dashboard-stats-card'>
                                        <div className='dashboard-stats-title'>
                                            <AccessTimeIcon style={{ color: '#04204b' }} />
                                            <h1>Tempo Médio de Resolução</h1>
                                        </div>

                                        <p style={{ fontSize: "1.6rem", fontWeight: "bold", color: "#000000" }}>
                                            1:30h
                                        </p>
                                    </div>

                                    <div className='dashboard-stats-card'>
                                        <div className='dashboard-stats-title'>
                                            <SourceIcon style={{ color: '#008cffff' }} />
                                            <h1>Total de Chamados</h1>
                                        </div>

                                        <p style={{ fontSize: "1.6rem", fontWeight: "bold", color: "#000000" }}>
                                            4570
                                        </p>
                                    </div>
                                </div>



                                <div className='dashboard-content-licenses'>

                                    <table className='table-licenses'>
                                        <thead className='table-licenses-head'>
                                            <tr>
                                                <th>Horário da Abertura</th>
                                                <th>Nome do Cliente</th>
                                                <th>Motivo do Chamado</th>
                                                <th>Solução do Chamado</th>
                                                <th>Analista</th>
                                                <th>Horário Final</th>
                                            </tr>
                                        </thead>
                                        <tbody className='table-body'>
                                            {chamados.length === 0 ? (
                                                <tr>
                                                    <td colSpan={6} style={{ textAlign: 'center' }}>Nenhum dado encontrado.</td>
                                                </tr>
                                            ) : (
                                                chamados.map((chamado, index) => (
                                                    <tr key={index}>
                                                        <td className='datetime'>{chamado.horario.replace('T', ' ')}</td>
                                                        <td>{chamado.cliente}</td>
                                                        <td>{chamado.motivo}</td>
                                                        <td>{chamado.solucao}</td>
                                                        <td>{chamado.analista}</td>
                                                        <td className='datetime'>{chamado.horafim.replace('T', ' ')}</td>
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