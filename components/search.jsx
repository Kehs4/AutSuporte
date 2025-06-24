// Função para puxar os dados dos clientes por doubleclick.

async function getSearch(event) {
    const rowElement = event.target.closest('tr'); // Encontra a <tr> mais próxima do elemento clicado
    const clientId = rowElement ? rowElement.getAttribute('id') : null; // Obtém o atributo 'id' da <tr>

    if (!clientId) {
        console.error('ID do cliente não encontrado.');
        return;
    }

    // Endpoint retornando os dados das informações dos clientes PostgreSQL.

    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const url = 'http://177.11.209.38/vertis/VertisConnect.dll/api/V1.1/vertis/clientesfat';
    const fullUrl = proxy + url;

    
    try {
        const response = await fetch(fullUrl + `/${clientId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();

        // Encontra o cliente no array de dados pelo ID
        const client = data.find(item => String(item.cod_cliente).trim() === String(clientId).trim());

        if (!client) {
            console.error('Cliente não encontrado no array de dados.');
            return;
        }

        const clientModal = document.getElementById('client-modal');
        clientModal.innerText = client.nome_cliente;

        // Retornando todos os inputs das informações dos Dados dos Clientes.
        const getNomeCliente = document.getElementById('client-name-input');
        const getCodUnid = document.getElementById('client-cod-unid');
        const getCodUnidOper = document.getElementById('client-cod-unid-oper');
        const getCodCliente = document.getElementById('client-cod');
        const getVersCliente = document.getElementById('client-version');
        const getMainCliente = document.getElementById('client-maintenance');
        const getMainFCliente = document.getElementById('client-maintenance-future');
        const getLicCliente = document.getElementById('client-licences');

        // Declarando as informações dentro dos inputs dos Dados dos Clientes.
        getNomeCliente.value = client.nome_cliente || null;
        getCodUnid.value = client.cod_unid_neg || null;
        getCodUnidOper.value = client.cod_unid_oper || null;
        getCodCliente.value = client.cod_cliente || null;
        getVersCliente.value = client.versao_vertis_cliente || null;
        getMainCliente.value = client.dth_manutencao_realizada || null;
        getMainFCliente.value = client.dth_manutencao_futura || null;
        getLicCliente.value = client.licencas_cliente || null;

        // Retornando todos os inputs das informações dos Dados de Acesso dos Clientes.
        const getAcessoTVCliente = document.getElementById('client-teamviewer');
        const getAcessoPWTVCliente = document.getElementById('client-teamviewer-password');
        const getAcessoADCliente = document.getElementById('client-anydesk');
        const getAcessoPWADCliente = document.getElementById('client-anydesk-password');
        const getIPServidorCliente = document.getElementById('client-ip-server');
        const getAlternativeAccess = document.getElementById('client-alternative');
        const getUserServer = document.getElementById('client-user');
        const getUserPasswordServer = document.getElementById('client-user-password');
        const getPasswordCriptog = document.getElementById('client-bd-password');

        // Declarando as informações dentro dos inputs dos Dados de Acesso dos Clientes.
        getAcessoTVCliente.value = client.acesso_cliente_teamviewer || null;
        getAcessoPWTVCliente.value = client.senha_acesso_cliente_teamviewer || null;
        getAcessoADCliente.value = client.acesso_cliente_anydesk || null;
        getAcessoPWADCliente.value = client.senha_acesso_cliente_anydesk || null;
        getIPServidorCliente.value = client.ip_servidor_cliente || null;
        getAlternativeAccess.value = client.alternativo || null;
        getUserServer.value = client.usuario_acesso_cliente || null;
        getUserPasswordServer.value = client.senha_acesso_usuario || null;
        getPasswordCriptog.value = client.senha_criptografada || null;

        // Retornando todos os inputs das informações dos Dados dos Contatos dos Clientes.
        const getRespCliente = document.getElementById('client-manager');
        const getEmailCliente = document.getElementById('client-email');
        const getDDDCliente = document.getElementById('client-ddd');
        const getContact1Cliente = document.getElementById('client-contact-1');
        const getContact2Cliente = document.getElementById('client-contact-2');
        const getObsCliente = document.getElementById('client-observation');

        // Declarando as informações dentro dos inputs dos Dados dos Contatos dos Clientes.
        getRespCliente.value = client.contatos || null;
        getEmailCliente.value = client.email_cliente || null;
        getDDDCliente.value = client.ddd_telefone || null;
        getContact1Cliente.value = client.telefone1 || null;
        getContact2Cliente.value = client.telefone2 || null;
        getObsCliente.value = client.observacao || null;
    } catch (error) {
        console.error('Erro ao buscar dados do cliente:', error);
    };
};

export default getSearch;