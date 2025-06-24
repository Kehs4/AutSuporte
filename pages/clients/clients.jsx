import { useState, useEffect } from 'react'
import MenuAutSuporte from '../../components/MenuAutSuporte';
import Loading from '../../components/Loading';
import getSearch from '../../components/search'
import switchModal from '../../components/modal'
import saveData from '../../components/saveDataModal'
import insertData from '../../components/insertData'
import { Link } from 'react-router-dom'
import infoClientes from '../../components/infoclientes'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import './clients.css'

function Clients() {
    const [isLoading, setIsLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem("user"));

    const [userColor, setUserColor] = useState('');

    const [clientspl, setClientspl] = useState([])
    const [rowCount, setRowCount] = useState('');

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

    function handleCloseMenu() {
        setIsMenuOpen(false);
    }

    if (!user) {
        return <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', marginTop: '60px', color: '#ff0000', backgroundColor: '#f8d7da', padding: '20px', borderRadius: '10px', maxWidth: '600px', margin: 'auto' }}>
            <p>Usuário não encontrado. Por favor, faça login novamente.</p>

            <Link to="/home"><button style={{ backgroundColor: '#FFAAAA', color: 'red', padding: '10px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Home</button></Link>
        </div>;
    }
    useEffect(() => {
        document.title = "AutSuporte - Clientes";

        const carregarScripts = async () => {
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const url = 'http://177.11.209.38/vertis/VertisConnect.dll/api/V1.1/vertis/clientesfat';
            const fullUrl = proxy + url;

            try {
                const response = await fetch(fullUrl)
                const data = await response.json();

                if (response.ok) {
                    const tableBody = document.querySelector('#clientes-table tbody');
                    tableBody.innerHTML = '';  // Limpa a tabela antes de popular

                    // Filtra pelo searchTerm
                    const filteredData = data.filter(cliente =>
                        cliente.nome_cliente.toLowerCase().includes(searchTerm.toLowerCase())
                    );

                    const limitedData = rowCount ? filteredData.slice(0, Number(rowCount)) : filteredData;

                    limitedData.forEach(cliente => {
                        const row = document.createElement('tr');
                        row.setAttribute('id', cliente.cod_cliente);
                        row.innerHTML = `
                        <td id="client-code">${cliente.cod_cliente}</td>
                        <td id="client-name-id" class="client-name-cell">${cliente.nome_cliente}</td>
                        <td>${cliente.acesso_cliente_teamviewer}</td>
                        <td>${cliente.senha_acesso_cliente_teamviewer}</td>
                        <td>${cliente.acesso_cliente_anydesk}</td>
                        <td>${cliente.senha_acesso_cliente_anydesk}</td>
                        <td>${cliente.versao_vertis_cliente}</td>
                    `;
                        tableBody.appendChild(row);
                    });
                };

            } catch (error) {
                console.error("Erro ao carregar os dados:", error);
                const showAlert = document.getElementById('alert-modal-box')
                const alertTitle = document.getElementById('alert-title')
                const alertParagraph = document.getElementById('alert-textp')
                const alertStatus = document.getElementById('alert-status')
                const alertClose = document.getElementById('btn-confirm-alert')
                showAlert.style.display = 'flex';
                alertTitle.innerHTML = 'Viishh...'
                alertStatus.style.color = 'red'
                alertStatus.innerHTML = ('<font color="gray">Status</font> <br>' + error);
                alertParagraph.innerHTML = ('Não conseguimos carregar os dados dos clientes para você :( <br>');
                alertClose.addEventListener('click', function () {
                    showAlert.style.display = 'none';
                })
            }
        };

        if (user) {
            setUserColor(getOrCreateUserColor(user.email || user.id || "default"));
        }

        carregarScripts();


        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);


        return () => clearTimeout(timer);
    }, [rowCount]); // O array vazio garante que isso seja chamado apenas uma vez, na montagem do componente

    const [searchTerm, setSearchTerm] = useState('');


    // Adicione este useEffect para filtrar a tabela conforme o texto digitado
    useEffect(() => {
        const input = document.getElementById('search-clients');
        if (input) {
            input.value = searchTerm;
        }

        const table = document.getElementById('clientes-table');
        if (!table) return;

        const rows = table.getElementsByTagName('tr');
        for (let i = 1; i < rows.length; i++) { // Começa do 1 para pular o cabeçalho
            const nameCell = rows[i].querySelector('.client-name-cell');
            if (nameCell) {
                const name = nameCell.textContent.toLowerCase();
                if (name.includes(searchTerm.toLowerCase())) {
                    rows[i].style.display = '';
                } else {
                    rows[i].style.display = 'none';
                }
            }
        }
    }, [searchTerm]);

    if (isLoading) {
        return <Loading />;
    }

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
                <MenuAutSuporte isMenuOpen={isMenuOpen} user={user} userColor={userColor} onCloseMenu={handleCloseMenu} />

                <div className={`dashboard-container${isMenuOpen ? ' menu-open' : ''}`}>
                    <div className='dashboard-header'>
                        <h1 className='dashboard-title'>Clientes</h1>
                        <p className='dashboard-subtitle'>Olá <font color='#0356bb'>{user.name},</font> esses são os dados dos clientes.</p>
                    </div>

                    <div className='dashboard-content-container-clients'>
                       <div className='dashboard-content-stats-clients'>
                            <div className='dashboard-stats-card'>
                                <div className='dashboard-stats-title'>
                                    <PeopleOutlineIcon style={{ color: '#006AAA' }}></PeopleOutlineIcon>
                                    <h1>Total de Clientes</h1>
                                </div>
                                <p style={{ fontSize: "1.6rem", fontWeight: "bold", color: "#000000" }}>
                                    0
                                </p>
                            </div>

                            <div className='dashboard-stats-card'>
                                <div className='dashboard-stats-title'>
                                    <PeopleOutlineIcon style={{ color: '#006AAA' }}></PeopleOutlineIcon>
                                    <h1>Versão Atual</h1>
                                </div>
                                <p style={{ fontSize: "1.6rem", fontWeight: "bold", color: "#000000" }}>
                                    2.9.61.2
                                </p>
                            </div>

                        </div>
                       
                        <div className='dashboard-header-clients'>

                            <div className='dashboard-header-search'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder='Buscar:'
                                    id='search-clients'
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <div className='dashboard-clients-countrow'>
                                <select
                                    name="rows-count"
                                    id="clients-row-count"
                                    className="clients-countrow"
                                    value={rowCount}
                                    onChange={e => setRowCount(Number(e.target.value))}
                                >
                                    <option value="">Todos</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>
                            </div>
                        </div>

                        <div className="div-form-clients">
                            <div className="div-form-clients-content">
                                <form className="form-clients" action="">
                                    <div className='client-identifier'>
                                        <h1 id='client-modal'></h1>

                                        <button id='btn-info-client' className='btn-info-client' onClick={infoClientes}>+ Informações</button>
                                    </div>

                                    <div className="search-clients">
                                        <fieldset className='client-data'>
                                            <legend>Dados do Cliente</legend>
                                            <label htmlFor="client-name-input">Nome do Cliente <font color="red">*</font></label>
                                            <input type="text" className='btns' id="client-name-input" placeholder="Nome do Cliente" required disabled></input>

                                            <label htmlFor="client-cod-unid">Código Unidade de Negócio<font color="red">*</font></label>
                                            <input type="number" className='btns' id="client-cod-unid" placeholder="Código da Unidade de Negócio" required disabled></input>

                                            <label htmlFor="client-cod-unid-oper">Código Unid. Operacional <font color="red">*</font></label>
                                            <input type="number" className='btns' id="client-cod-unid-oper" placeholder="Código da Unid. Operacional" required disabled></input>

                                            <label htmlFor="client-cod">Cód. Planilha GPI</label>
                                            <input type="number" className='btns-cod' id="client-cod" placeholder="Código do Cliente" disabled></input>

                                            <label htmlFor="client-version">Versão do Vertis</label>
                                            <input type="text" className='btns' id="client-version" placeholder="Versão do Vertis" disabled></input>

                                            <label htmlFor="client-maintenance">Manutenção Realizada</label>
                                            <input type="text" className='btns' id="client-maintenance" placeholder="Manutenção do Vertis" disabled></input>

                                            <label htmlFor="client-maintenance">Manutenção Futura</label>
                                            <input type="text" className='btns' id="client-maintenance-future" placeholder="Próxima Manutenção" disabled></input>

                                            <label htmlFor="client-licences">Licenças da Unidade</label>
                                            <input type="text" className='btns' id="client-licences" placeholder="Total de Licenças" disabled></input>
                                        </fieldset>

                                        <fieldset className='client-access'>
                                            <legend>Dados de Acesso</legend>
                                            <label htmlFor="client-teamviewer">TeamViewer</label>
                                            <input type="text" className='btns' id="client-teamviewer" placeholder="TeamViewer do cliente" disabled></input>

                                            <label htmlFor="client-teamviewer-password">Senha TeamViewer</label>
                                            <input type="text" className='btns' id="client-teamviewer-password" placeholder="Senha do TeamViewer" disabled></input>

                                            <label htmlFor="client-anydesk">AnyDesk</label>
                                            <input type="text" className='btns' id="client-anydesk" placeholder="AnyDesk do cliente" disabled></input>

                                            <label htmlFor="client-anydesk-password">Senha AnyDesk</label>
                                            <input type="text" className='btns' id="client-anydesk-password" placeholder="Senha do AnyDesk" disabled></input>

                                            <label htmlFor="client-licences">IP Servidor do Cliente</label>
                                            <input type="text" className='btns' id="client-ip-server" placeholder="IP" disabled></input>

                                            <label htmlFor="client-alternative">Acesso Alternativo Servidor</label>
                                            <input type="text" className='btns' id="client-alternative" placeholder="Acessos Alternativos do Servidor" disabled></input>

                                            <label htmlFor="client-user">Usuário do Servidor</label>
                                            <input type="text" className='btns' id="client-user" placeholder="Usuário do Servidor do Cliente" disabled></input>

                                            <label htmlFor="client-user-password">Senha do Usuário</label>
                                            <input type="text" className='btns' id="client-user-password" placeholder="Senha do Usuário do Cliente" disabled></input>

                                            <label htmlFor="client-bd-password">Senha Criptografada BD</label>
                                            <input type="text" className='btns' id="client-bd-password" placeholder="Senha Criptografada BD" disabled></input>
                                        </fieldset>

                                        <fieldset className='client-contacts'>
                                            <legend>Contatos</legend>
                                            <label htmlFor="client-manager">Responsável Unidade</label>
                                            <input type="text" className='btns' id="client-manager" placeholder='Responsável pela unid.' disabled></input>

                                            <label htmlFor="client-email">E-mail</label>
                                            <input type="text" className='btns' id="client-email" placeholder='E-mail do Cliente' disabled></input>

                                            <label htmlFor="client-ddd">DDD</label>
                                            <input type="number" className='btns' id="client-ddd" placeholder='DDD do Cliente' disabled></input>

                                            <label htmlFor="client-contact-1">Telefone 1</label>
                                            <input type="text" className='btns' id="client-contact-1" placeholder='Telefone 1' disabled></input>

                                            <label htmlFor="client-contact-2">Telefone 2</label>
                                            <input type="text" className='btns' id="client-contact-2" placeholder='Telefone 2' disabled></input>

                                            <label htmlFor="client-observation">Observação</label>
                                            <input type="text" className='btns' id="client-observation" placeholder="Observações Gerais do Cliente" disabled></input>
                                        </fieldset>

                                    </div>

                                    <div className="search-clients-buttons">
                                        <button className="btn-update" id='btn-update' type="button">Alterar</button>
                                        <button className="btn-insert" id='btn-insert' type="button" onClick={insertData}>Incluir</button>
                                        <button className="btn-save" id='btn-save' type="button" onClick={saveData}>Salvar</button>
                                        <button className="btn-close" id='btn-close' type="button">Fechar</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className='alert-modal-box' id='alert-modal-box'>
                            <div className='alert-modal' id='alert-modal'>
                                <h1 id='alert-title'></h1>
                                <p id='alert-textp'></p>
                                <p id='alert-status'></p>
                                <div className='btn-alert-modal'>
                                    <button className='btn-confirm' id='btn-confirm-alert'>OK</button>
                                </div>
                            </div>
                        </div>

                        <table id="clientes-table" className='table-clients'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome do Cliente</th>
                                    <th>TeamViewer</th>
                                    <th>Senha TeamViewer</th>
                                    <th>AnyDesk</th>
                                    <th>Senha AnyDesk</th>
                                    <th>Versão Vertis</th>
                                </tr>

                            </thead>
                            <tbody id='tbody-list' className='table-body-clients' onDoubleClick={switchModal} onDoubleClickCapture={getSearch}>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </>
    )

}

export default Clients;