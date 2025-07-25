import getClientes from "./getclients";

//Endpoint para salvar os valores que estão dentro dos inputs do Modal.
async function saveData(req, res) {
    const nome_cliente = document.getElementById('client-name-input').value;
    const cod_unid_neg = document.getElementById('client-cod-unid').value;
    const cod_unid_oper = document.getElementById('client-cod-unid-oper').value;
    const cod_cliente = document.getElementById('client-cod').value;
    const versao_vertis_cliente = document.getElementById('client-version').value;
    const dth_manutencao_realizada = document.getElementById('client-maintenance').value;
    const dth_manutencao_futura = document.getElementById('client-maintenance-future').value;
    const licencas_cliente = document.getElementById('client-licences').value;
    const acesso_cliente_teamviewer = document.getElementById('client-teamviewer').value;
    const senha_acesso_cliente_teamviewer = document.getElementById('client-teamviewer-password').value;
    const acesso_cliente_anydesk = document.getElementById('client-anydesk').value;
    const senha_acesso_cliente_anydesk = document.getElementById('client-anydesk-password').value;
    const ip_servidor_cliente = document.getElementById('client-ip-server').value;
    const alternativo = document.getElementById('client-alternative').value;
    const usuario_acesso_cliente = document.getElementById('client-user').value;
    const senha_acesso_usuario = document.getElementById('client-user-password').value;
    const senha_criptografada = document.getElementById('client-bd-password').value;
    const contatos = document.getElementById('client-manager').value;
    const email_cliente = document.getElementById('client-email').value;
    const ddd_telefone = document.getElementById('client-ddd').value;
    const telefone1 = document.getElementById('client-contact-1').value;
    const telefone2 = document.getElementById('client-contact-2').value;
    const observacao = document.getElementById('client-observation').value;
    const showAlert = document.getElementById('alert-modal-box')
    const alertTitle = document.getElementById('alert-title')
    const alertParagraph = document.getElementById('alert-textp')
    const alertStatus = document.getElementById('alert-status')
    const alertClose = document.getElementById('btn-confirm-alert')

    // Endpoint retornando os dados das informações dos clientes PostgreSQL.
    try {

        const response = await fetch('http://177.11.209.38/vertis/VertisConnect.dll/api/V1.1/vertis/clientesfat', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': 'Basic',
                    },
                        body: JSON.stringify({nome_cliente, cod_unid_neg, cod_unid_oper, versao_vertis_cliente, dth_manutencao_realizada, dth_manutencao_futura, licencas_cliente, acesso_cliente_teamviewer, senha_acesso_cliente_teamviewer, acesso_cliente_anydesk, senha_acesso_cliente_anydesk, ip_servidor_cliente, alternativo, usuario_acesso_cliente, senha_acesso_usuario, senha_criptografada, contatos, email_cliente, ddd_telefone, telefone1, telefone2, observacao, cod_cliente}),
        });

        if (response.ok) {
            const result = await response.text();
            console.log(result);
            showAlert.style.display = 'flex';
            alertTitle.innerHTML = 'Uhuull!..'
            alertStatus.style.color = 'green'
            alertStatus.innerHTML = '<font color="gray">Status</font> <br>' + '(200) Ok!.';
            alertParagraph.innerHTML = ('Cliente ' + nome_cliente + ' atualizado com sucesso!');
            alertClose.addEventListener('click', function () {
                showAlert.style.display = 'none';
                getClientes();
            })
        } else {
            const error = await response.text();
            console.error(error);
            showAlert.style.display = 'flex';
            alertTitle.innerHTML = 'Viishh...'
            alertStatus.style.color = 'red'
            alertStatus.innerHTML = ('<font color="gray">Status</font> <br>' + error);
            alertParagraph.innerHTML = ('Não conseguimos atualizar o cliente ' + nome_cliente + ' para você :(. <br>');
            alertClose.addEventListener('click', function () {
                showAlert.style.display = 'none';
            })
        };
    }
    catch (error) {
        console.error('Erro ao buscar clientes:', error);
    }
};


export default saveData;




