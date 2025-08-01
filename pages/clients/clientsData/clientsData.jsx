import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loading from '../../../components/Loading';
import ChangeInputs from '../../../components/changeInputs';
import MenuAutSuporte from '../../../components/MenuAutSuporte';
import '../../../components/MenuAutSuporte.css'
import './clientsData.css'
import { Link } from 'react-router-dom'
import saveDataClients from '../../../components/saveDataClients';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function ClientsData() {
    const query = useQuery();
    const cod_cliente = query.get('id'); // <- aqui você pega o id corretamente

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


    const [isMenuOpen, setIsMenuOpen] = useState(false);
    function menuSwitch() {
        setIsMenuOpen((prev) => !prev);
    }

    function handleCloseMenu() {
        setIsMenuOpen(false);
    }


    useEffect(() => {
        const fetchData = async () => {
            if (cod_cliente) {
                try {
                    const response = await fetch('http://177.11.209.38/vertis/VertisConnect.dll/api/V1.1/vertis/clientesfat' + `/${cod_cliente}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': 'Basic',
                        },

                    })

                    const data = await response.json();
                    document.title = "AutSuporte -  " + data[0].nome_cliente;

                    const clientTitle = document.getElementById('client-title');
                    clientTitle.innerHTML = data[0].nome_cliente;

                    const clientSubtitle = document.getElementById('client-subtitle')

                    clientSubtitle.innerHTML = 'Olá <font color="#0356bb">' + [payload.username] + '</font>, esses são os dados do cliente <font color="#0356bb">' + data[0].nome_cliente; + '</font>.'

                    // Retornando todos os inputs das informações dos Dados dos Clientes.
                    const getNomeCliente = document.getElementById('client-name');
                    const getCodUnid = document.getElementById('client-cod-unid')
                    const getCodUnidOper = document.getElementById('client-cod-unid-oper');
                    const getVersCliente = document.getElementById('client-version');
                    const getUpdateCliente = document.getElementById('client-update')
                    const getVersionSQL = document.getElementById('client-update-sql')
                    const getCodCliente = document.getElementById('client-code');
                    const getTipCliente = document.getElementById('client-type');
                    const getObsCliente = document.getElementById('client-observation');
                    const getAuditCliente = document.getElementById('client-audit')

                    // Declarando as informações dentro dos inputs dos Dados dos Clientes.
                    getNomeCliente.value = data[0].nome_cliente || null;
                    getCodUnid.value = data[0].cod_unid_neg || null;
                    getCodUnidOper.value = data[0].cod_unid_oper || null;
                    getVersCliente.value = data[0].versao_vertis_cliente || null;
                    getUpdateCliente.value = data[0].data_atualizado || null;
                    getVersionSQL.value = data[0].sql_cliente || null;
                    getCodCliente.value = data[0].cod_cliente || null;
                    getTipCliente.value = data[0].tipo_unidade || null;
                    getObsCliente.value = data[0].observacao || null;
                    getAuditCliente.value = data[0].ind_auditoria || null;

                    // Retornando todos os inputs das informações dos Dados de Acesso dos Clientes.
                    const getAcessoTVCliente = document.getElementById('client-teamviewer');
                    const getAcessoPWTVCliente = document.getElementById('client-teamviewer-password');
                    const getAcessoADCliente = document.getElementById('client-anydesk');
                    const getAcessoPWADCliente = document.getElementById('client-anydesk-password');
                    const getUserServer = document.getElementById('client-user');
                    const getUserPasswordServer = document.getElementById('client-user-password');
                    const getAlternativeAccess = document.getElementById('client-alternative-info');
                    const getIPServidorCliente = document.getElementById('client-ip-server');
                    const getPasswordCriptog = document.getElementById('client-bd-password');
                    const getPortBD = document.getElementById('client-bd-port');
                    const getSOServer = document.getElementById('client-so-server');
                    const getPostgreSQLVersion = document.getElementById('client-postgres');

                    // Declarando as informações dentro dos inputs dos Dados de Acesso dos Clientes.
                    getAcessoTVCliente.value = data[0].acesso_cliente_teamviewer || null;
                    getAcessoPWTVCliente.value = data[0].senha_acesso_cliente_teamviewer || null;
                    getAcessoADCliente.value = data[0].acesso_cliente_anydesk || null;
                    getAcessoPWADCliente.value = data[0].senha_acesso_cliente_anydesk || null;
                    getUserServer.value = data[0].usuario_acesso_cliente || null;
                    getUserPasswordServer.value = data[0].senha_acesso_usuario || null;
                    getAlternativeAccess.value = data[0].alternativo || null;
                    getIPServidorCliente.value = data[0].ip_servidor_cliente || null;
                    getPasswordCriptog.value = data[0].senha_criptografada || null;
                    getPortBD.value = data[0].porta_bd || null;
                    getSOServer.value = data[0].so_server || null;
                    getPostgreSQLVersion.value = data[0].postgres_versao || null;

                    // Retornando todos os inputs das informações dos Dados dos Contatos dos Clientes.
                    const getRespCliente = document.getElementById('client-manager');
                    const getEmailCliente = document.getElementById('client-email');
                    const getDDDCliente = document.getElementById('client-ddd');
                    const getContact1Cliente = document.getElementById('client-contact-1');
                    const getContact2Cliente = document.getElementById('client-contact-2');

                    // Declarando as informações dentro dos inputs dos Dados dos Contatos dos Clientes.
                    getRespCliente.value = data[0].contatos || null;
                    getEmailCliente.value = data[0].email_cliente || null;
                    getDDDCliente.value = data[0].ddd_telefone || null;
                    getContact1Cliente.value = data[0].telefone1 || null;
                    getContact2Cliente.value = data[0].telefone2 || null;

                    // Retornando todos os inputs das informações das Manutenções dos Clientes.
                    const getLicCliente = document.getElementById('client-licences');
                    const getMainCliente = document.getElementById('client-maintenance');
                    const getMainFCliente = document.getElementById('client-maintenance-future');
                    const getAvisaMan = document.getElementById('client-maintenance-alert');
                    const getArmazenamento = document.getElementById('client-maintenance-data');
                    const getAntivirus = document.getElementById('client-maintenance-antivirus');

                    // Declarando as informações dentro dos inputs das Manutenções dos Clientes.
                    getLicCliente.value = data[0].licencas_cliente || null;
                    getMainCliente.value = data[0].dth_manutencao_realizada || null;
                    getMainFCliente.value = data[0].dth_manutencao_futura || null;
                    getAvisaMan.value = data[0].ind_script || null;
                    getArmazenamento.value = data[0].manutencao_backup || null;
                    getAntivirus.value = data[0].antivirus_cliente || null;

                    // Retornando todos os inputs das informações Financeiras dos Clientes.
                    const getBoletoCliente = document.getElementById('client-boleto');
                    const getMunicipioCliente = document.getElementById('client-municipio');
                    const getSATCliente = document.getElementById('client-sat');
                    const getClientLOL = document.getElementById('client-lol');
                    const getClientLOE = document.getElementById('client-loe');
                    const getGeradorPDF = document.getElementById('client-generator-pdf');
                    const getFatEmail = document.getElementById('client-fat-email');
                    const getPortalNovo = document.getElementById('client-portal-new');
                    const getContigencia = document.getElementById('client-contigencia');
                    const getExamLdoOnline = document.getElementById('client-exames-ldonline');
                    const getIBPTCliente = document.getElementById('client-ibpt');
                    const getNFAPI = document.getElementById('client-nf-api');
                    const getPublS3 = document.getElementById('client-publ-s3');
                    const getITFM = document.getElementById('client-itf-m');

                    // Declarando as informações dentro dos inputs das informações Financeiras dos Clientes.
                    getBoletoCliente.value = data[0].ind_banco_boleto || null;
                    getMunicipioCliente.value = data[0].cliente_municipio || null;
                    getSATCliente.value = data[0].ind_sat || null;
                    getClientLOL.value = data[0].ind_lol || null;
                    getClientLOE.value = data[0].ind_loe || null;
                    getGeradorPDF.value = data[0].ind_gerador_pdf || null;
                    getFatEmail.value = data[0].ind_faturamento_email || null;
                    getPortalNovo.value = data[0].ind_portal_novo || null;
                    getContigencia.value = data[0].ind_contigencia || null;
                    getExamLdoOnline.value = data[0].ind_solic_exam_portal || null;
                    getIBPTCliente.value = data[0].ibt_calculo_correto || null;
                    getNFAPI.value = data[0].ind_emite_nfs_api || null;
                    getPublS3.value = data[0].ind_publ_s3 || null;
                    getITFM.value = data[0].ind_itf_m || null;

                    // Retornando todos os inputs dos informações de Backup dos Clientes.
                    const getCaminhoBackup = document.getElementById('client-path-backup');
                    const getEmailBackup = document.getElementById('client-email-backup');
                    const getPasswordBackup = document.getElementById('client-password-backup');
                    const getTypeBackup = document.getElementById('client-type-backup');
                    const getPINGoogle = document.getElementById('client-pin-google');
                    const getSizeBackup = document.getElementById('client-size-backup');
                    const getTimeBackup = document.getElementById('client-time-backup');
                    const getTimeVaccum = document.getElementById('client-time-vaccum');
                    const getTimeReindex = document.getElementById('client-time-reindex');
                    const getSenhaSmartVertis = document.getElementById('client-pw-smartvertis')
                    const getQRCode = document.getElementById('client-qrcode');

                    // Declarando as informações dentro dos inputs das informações de Backup dos Clientes.
                    getCaminhoBackup.value = data[0].manutencao_armazenamento || null;
                    getEmailBackup.value = data[0].conta_nuvem_backup || null;
                    getPasswordBackup.value = data[0].senha_conta_nuvem || null;
                    getTypeBackup.value = data[0].tipo_backup_nuvem || null;
                    getPINGoogle.value = data[0].pin_google_desktop || null;
                    getSizeBackup.value = data[0].tamanho_backup || null;
                    getTimeBackup.value = data[0].horario_backups || null;
                    getTimeVaccum.value = data[0].horario_vacuum || null;
                    getTimeReindex.value = data[0].horarios_reindex || null;
                    getSenhaSmartVertis.value = data[0].senha_smartvertis || null;
                    getQRCode.value = data[0].ind_qrcode || null;


                } catch (error) {
                    const showAlert = document.getElementById('alert-modal-box')
                    const alertTitle = document.getElementById('alert-title')
                    const alertParagraph = document.getElementById('alert-textp')
                    const alertStatus = document.getElementById('alert-status')
                    const alertClose = document.getElementById('btn-confirm-alert')
                    showAlert.style.display = 'flex';
                    alertTitle.innerHTML = 'Viishh...'
                    alertStatus.style.color = 'red'
                    alertStatus.innerHTML = ('<font color="gray">Status</font> <br>' + error);
                    alertParagraph.innerHTML = ('Não conseguimos carregar os dados do cliente para você :( <br>');
                    alertClose.addEventListener('click', function () {
                        showAlert.style.display = 'none';
                    })
                }
            } else {
                console.error(error);
            }
        };
        fetchData();

    }, [cod_cliente]);



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
                        <h1 className='dashboard-title' id='client-title'></h1>
                        <p className='dashboard-subtitle' id='client-subtitle'></p>
                    </div>
                    <div className='test'>
                        <div className='dashboard-content-container-clients'>
                            <div className="search-clients-info">
                                <div className='agroup-div'>
                                    <fieldset className='client-data-info'>
                                        <legend>Dados do Cliente</legend>

                                        <div className='responsive-div'>
                                            <div>
                                                <label htmlFor="client-name">Nome do Cliente <font color="red">*</font></label>
                                                <input type="text" className='btns' id="client-name" placeholder="Nome do Cliente" required disabled></input>

                                                <label htmlFor="client-cod-unid">Código Unidade de Negócio<font color="red">*</font></label>
                                                <input type="number" className='btns' id="client-cod-unid" placeholder="Código da Unidade de Negócio" required disabled></input>

                                                <label htmlFor="client-cod-unid-oper">Código Unid. Operacional <font color="red">*</font></label>
                                                <input type="number" className='btns' id="client-cod-unid-oper" placeholder="Código da Unid. Operacional" required disabled></input>
                                            </div>

                                            <div>
                                                <label htmlFor="client-version">Versão do Vertis</label>
                                                <input type="text" className='btns' id="client-version" placeholder="Versão do Vertis" disabled></input>

                                                <label htmlFor="client-update">Atualização do Vertis</label>
                                                <input type="text" className='btns' id="client-update" placeholder="Data da Atualização do Sistema" disabled></input>

                                                <label htmlFor="client-update-sql">Script SQL</label>
                                                <input type="text" className='btns' id="client-update-sql" placeholder="SQL's Scripts rodados" disabled></input>
                                            </div>
                                        </div>

                                        <div className='responsive-div'>
                                            <div>
                                                <label htmlFor="client-code">Cód. Planilha GPI</label>
                                                <input type="number" className='btns' id="client-code" placeholder="Código do Cliente" disabled></input>

                                                <label htmlFor="client-type">Tipo da Unidade</label>
                                                <input type="text" className='btns' id="client-type" placeholder="Tipo da Unidade do Cliente" disabled></input>

                                                <label htmlFor="client-observation">Observação</label>
                                                <input type="text" className='btns' id="client-observation" placeholder="Observações Gerais do Cliente" disabled></input>
                                            </div>

                                            <div>
                                                <label htmlFor="client-audit"> Auditoria Table BD</label>
                                                <input type="text" className='btns' id="client-audit" placeholder="Tabela com Auditoria do Cliente" disabled></input>
                                            </div>
                                        </div>
                                    </fieldset>

                                    <div className='div-client-contacts-maintenance'>
                                        <fieldset className='client-contacts-info'>
                                            <legend>Contatos</legend>
                                            <div className='responsive-div'>
                                                <div>
                                                    <label htmlFor="client-manager">Responsável Unidade</label>
                                                    <input type="text" className='btns' id="client-manager" placeholder='Responsável pela unid.' disabled></input>

                                                    <label htmlFor="client-email">E-mail</label>
                                                    <input type="text" className='btns' id="client-email" placeholder='E-mail do Cliente' disabled></input>
                                                </div>

                                                <div>
                                                    <label htmlFor="client-ddd">DDD</label>
                                                    <input type="text" className='btns' id="client-ddd" placeholder='DDD do Cliente' disabled></input>
                                                </div>

                                                <div>
                                                    <label htmlFor="client-contact-1">Telefone 1</label>
                                                    <input type="text" className='btns' id="client-contact-1" placeholder='Telefone 1' disabled></input>

                                                    <label htmlFor="client-contact-2">Telefone 2</label>
                                                    <input type="text" className='btns' id="client-contact-2" placeholder='Telefone 2' disabled></input>
                                                </div>
                                            </div>
                                        </fieldset>

                                        <fieldset className='client-manteinance-info'>
                                            <legend>Manutenção</legend>
                                            <div className='responsive-div'>
                                                <div>
                                                    <label htmlFor="client-licences">Licenças da Unidade</label>
                                                    <input type="text" className='btns' id="client-licences" placeholder="Total de Licenças" disabled></input>

                                                    <label htmlFor="client-maintenance">Manutenção Realizada</label>
                                                    <input type="text" className='btns' id="client-maintenance" placeholder="Manutenção do Vertis" disabled></input>

                                                    <label htmlFor="client-maintenance-future">Manutenção Futura</label>
                                                    <input type="text" className='btns' id="client-maintenance-future" placeholder="Próxima Manutenção" disabled></input>
                                                </div>

                                                <div>
                                                    <label htmlFor="client-maintenance-alert">Solicita acesso?</label>
                                                    <input type="text" className='btns' id="client-maintenance-alert" placeholder="Aviso do Cliente para Acesso" disabled></input>

                                                    <label htmlFor="client-maintenance-data">Armazenamento do Cliente</label>
                                                    <input type="text" className='btns' id="client-maintenance-data" placeholder="Espaço de Armazenamento do Cliente" disabled></input>

                                                    <label htmlFor="client-maintenance-antivirus">Antivírus do Cliente</label>
                                                    <input type="text" className='btns' id="client-maintenance-antivirus" placeholder="Antivírus do Cliente" disabled></input>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>

                                </div>


                                <fieldset className='client-access-info'>
                                    <legend>Dados de Acesso</legend>

                                    <div className='responsive-div'>
                                        <div>
                                            <label htmlFor="client-teamviewer">TeamViewer</label>
                                            <input type="text" className='btns' id="client-teamviewer" placeholder="TeamViewer do cliente" disabled></input>

                                            <label htmlFor="client-teamviewer-password">Senha TeamViewer</label>
                                            <input type="text" className='btns' id="client-teamviewer-password" placeholder="Senha do TeamViewer" disabled></input>
                                        </div>

                                        <div>
                                            <label htmlFor="client-anydesk">AnyDesk</label>
                                            <input type="text" className='btns' id="client-anydesk" placeholder="AnyDesk do cliente" disabled></input>

                                            <label htmlFor="client-anydesk-password">Senha AnyDesk</label>
                                            <input type="text" className='btns' id="client-anydesk-password" placeholder="Senha do AnyDesk" disabled></input>
                                        </div>
                                    </div>

                                    <div className='responsive-div'>
                                        <div>
                                            <label htmlFor="client-user">Usuário do Servidor</label>
                                            <input type="text" className='btns' id="client-user" placeholder="Senha do AnyDesk" disabled></input>

                                            <label htmlFor="client-user-password">Senha do Usuário</label>
                                            <input type="text" className='btns' id="client-user-password" placeholder="Senha do AnyDesk" disabled></input>
                                        </div>

                                        <div>
                                            <label htmlFor="client-alternative-info">Acesso Alternativo Servidor</label>
                                            <input type="text" className='btns' id="client-alternative-info" placeholder="Acessos Alternativos do Servidor" disabled></input>

                                            <label htmlFor="client-licences">IP Servidor do Cliente</label>
                                            <input type="text" className='btns' id="client-ip-server" placeholder="IP" disabled></input>
                                        </div>
                                    </div>

                                    <div className='responsive-div'>
                                        <div>
                                            <label htmlFor="client-bd-password">Senha Criptografada BD</label>
                                            <input type="text" className='btns' id="client-bd-password" placeholder="Senha Criptografada BD" disabled></input>

                                            <label htmlFor="client-bd-port">Porta do Banco de Dados</label>
                                            <input type="text" className='btns' id="client-bd-port" placeholder="Porta do Banco de Dados" disabled></input>
                                        </div>

                                        <div>
                                            <label htmlFor="client-so-server">Sistema Operacional do Servidor</label>
                                            <input type="text" className='btns' id="client-so-server" placeholder="Sistema Operacional do Servidor" disabled></input>

                                            <label htmlFor="client-postgres">Versão do PostgreSQL</label>
                                            <input type="text" className='btns' id="client-postgres" placeholder="Versão do PostgreSQL" disabled></input>
                                        </div>
                                    </div>
                                </fieldset>

                                <div className='agroup-div'>
                                    <fieldset className='client-finance-info'>
                                        <legend>Financeiro</legend>

                                        <div className='responsive-div'>
                                            <div>
                                                <label htmlFor="client-boletos">Boleto</label>
                                                <input type="text" className='btns' id="client-boleto" placeholder="Banco do Boleto do Cliente" disabled></input>

                                                <label htmlFor="client-municipio">Município do Cliente</label>
                                                <input type="text" className='btns' id="client-municipio" placeholder="Município da NF Cliente" disabled></input>

                                                <label htmlFor="client-sat">SAT</label>
                                                <input type="text" className='btns' id="client-sat" placeholder="SAT Utilizado pelo Cliente" disabled></input>
                                            </div>

                                            <div>
                                                <label htmlFor="client-lol">LOL</label>
                                                <input type="number" className='btns' id="client-lol" placeholder="LOL Cliente" disabled></input>

                                                <label htmlFor="client-loe">LOE</label>
                                                <input type="number" className='btns' id="client-loe" placeholder="LOE Cliente" disabled></input>

                                                <label htmlFor="client-generator-pdf">Gerador PDF</label>
                                                <input type="text" className='btns' id="client-generator-pdf" placeholder="Gerador PDF do Cliente" disabled></input>
                                            </div>

                                            <div>
                                                <label htmlFor="client-fat-email">Faturamento Email</label>
                                                <input type="text" className='btns' id="client-fat-email" placeholder="Faturamento Email?" disabled></input>
                                            </div>
                                        </div>

                                        <div className='responsive-div'>
                                            <div>
                                                <div className='selects-option'>
                                                    <label htmlFor="client-portal-new" className='label-select'>Portal Novo?</label>
                                                    <select className='btns' name="Portal Cliente" id="client-portal-new" disabled>
                                                        <option value=""></option>
                                                        <option value="S">Sim</option>
                                                        <option value="N">Não</option>
                                                    </select>

                                                    <label htmlFor="client-contigencia" className='label-select'>Contigência?</label>
                                                    <select className='btns' name="Contigencia" id="client-contigencia" disabled>
                                                        <option value=""></option>
                                                        <option value="S">Sim</option>
                                                        <option value="N">Não</option>
                                                    </select>

                                                    <label htmlFor="client-exames-ldonline">Solicita Exame Portal?</label>
                                                    <select className='btns' name="Exames Laudos Online" id="client-exames-ldonline" disabled>
                                                        <option value=""></option>
                                                        <option value="S">Sim</option>
                                                        <option value="N">Não</option>
                                                    </select>
                                                </div>
                                            </div>


                                            <div className='selects-option'>

                                                <label htmlFor="client-ibpt">IBPT Cálculo Correto?</label>
                                                <select className='btns' name="IBPT Calculo Correto" id="client-ibpt" disabled>
                                                    <option value=""></option>
                                                    <option value="X">Sim</option>
                                                    <option value="N">Não</option>
                                                </select>

                                                <label htmlFor="client-nf-api">Emite NF via API?</label>
                                                <select className='btns' name="Emite NF via API" id="client-nf-api" disabled>
                                                    <option value=""></option>
                                                    <option value="X">Sim</option>
                                                    <option value="N">Não</option>
                                                </select>

                                                <label htmlFor="client-publ-s3">Publica S3?</label>
                                                <select className='btns' name="Publica S3" id="client-publ-s3" disabled>
                                                    <option value=""></option>
                                                    <option value="X">Sim</option>
                                                    <option value="N">Não</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='responsive-div'>
                                            <div className='selects-option'>
                                                <label htmlFor="client-itf-m">ITF M?</label>
                                                <select className='btns' name="ITF M" id="client-itf-m" disabled>
                                                    <option value=""></option>
                                                    <option value="S">Sim</option>
                                                    <option value="N">Não</option>
                                                </select>
                                            </div>
                                        </div>
                                    </fieldset>

                                    <fieldset className='client-backups-info'>
                                        <legend>Backups</legend>
                                        <div className='responsive-div'>
                                            <div>
                                                <label htmlFor="client-path-backup">Diretório/Caminho Backup</label>
                                                <input type="text" className='btns' id="client-path-backup" placeholder="Caminho do /Backup Servidor" disabled></input>

                                                <label htmlFor="client-email-backup">Email Conta de Backup</label>
                                                <input type="email" className='btns' id="client-email-backup" placeholder="E-mail da Conta de Backup" disabled></input>

                                                <label htmlFor="client-password-backup">Senha Conta de Backup </label>
                                                <input type="text" className='btns' id="client-password-backup" placeholder="Senha da Conta de Backup" disabled></input>
                                            </div>

                                            <div>
                                                <label htmlFor="client-type-backup">Tipo de Backup Nuvem</label>
                                                <input type="text" className='btns' id="client-type-backup" placeholder="Tipo do Backup da Nuvem" disabled></input>

                                                <label htmlFor="client-pin-google">PIN do Google Desktop</label>
                                                <input type="text" className='btns' id="client-pin-google" placeholder="PIN do Google Desktop" disabled></input>

                                                <label htmlFor="client-size-backup">Tamanho do Backup</label>
                                                <input type="text" className='btns' id="client-size-backup" placeholder="Tamanho do Backup da Conta Nuvem" disabled></input>
                                            </div>
                                        </div>

                                        <div className='responsive-div'>
                                            <div>
                                                <label htmlFor="client-time-backup">Horário dos Backups</label>
                                                <input type="text" className='btns' id="client-time-backup" placeholder="Horários dos Backups do Cliente" disabled></input>

                                                <label htmlFor="client-time-vaccum">Horários do Vaccum BD</label>
                                                <input type="text" className='btns' id="client-time-vaccum" placeholder="Horários do Vaccum do Cliente" disabled></input>

                                                <label htmlFor="client-time-reindex">Horários ReIndex</label>
                                                <input type="text" className='btns' id="client-time-reindex" placeholder="Horários do ReIndex do Cliente" disabled></input>
                                            </div>

                                            <div>
                                                <label htmlFor="client-pw-smartvertis">Senha do Smart Vertis</label>
                                                <input type="text" className='btns' id="client-pw-smartvertis" placeholder="Senha do Smart Vertis do Cliente" disabled></input>
                                            </div>


                                            <div className='selects-option'>
                                                <label htmlFor="client-qrcode">QR Code</label>
                                                <select className='btns' name="QR Code" id="client-qrcode" disabled>
                                                    <option value=""></option>
                                                    <option value="Sim">Sim</option>
                                                    <option value="Não">Não</option>
                                                </select>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>

                            </div>
                            <div className="search-clients-buttons-info">
                                <button className="btn-update-clients" id='btn-update-clients' type="button" onClick={ChangeInputs}>Alterar</button>
                                <button className="btn-save-clients" id='btn-save-clients' type="button" onClick={saveDataClients}>Salvar</button>
                            </div>

                            <div className='alert-modal-box' id='alert-modal-box'>
                                <div className='alert-modal' id='alert-modal'>
                                    <h1 id='alert-title'></h1>
                                    <p id='alert-textp'></p>
                                    <p id='alert-status'></p>
                                    <div className='btn-alert-modal'>
                                        <button className='btn-yes' id='btn-yes' type='button'>Sim</button>
                                        <button className='btn-no' id='btn-no' type='button'>Não</button>
                                        <button className='btn-confirm' id='btn-confirm-alert'>OK</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ClientsData;