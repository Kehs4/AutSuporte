
//Endpoint para salvar os valores que estão dentro dos inputs do Modal.
async function saveDataClients(req, res){
        // Dados dos Cliente.
        const nome_cliente = document.getElementById('client-name').value;
        const cod_unid_neg = document.getElementById('client-cod-unid').value;
        const cod_unid_oper = document.getElementById('client-cod-unid-oper').value;
        const versao_vertis_cliente = document.getElementById('client-version').value;
        const data_atualizado = document.getElementById('client-update').value;
        const sql_cliente = document.getElementById('client-update-sql').value;
        const cod_cliente = document.getElementById('client-code').value;
        const tipo_unidade = document.getElementById('client-type').value;
        const observacao = document.getElementById('client-observation').value;
        const ind_auditoria = document.getElementById('client-audit').value;
        
        // Dados de Acesso.
        const acesso_cliente_teamviewer = document.getElementById('client-teamviewer').value;
        const senha_acesso_cliente_teamviewer = document.getElementById('client-teamviewer-password').value;
        const acesso_cliente_anydesk = document.getElementById('client-anydesk').value;
        const senha_acesso_cliente_anydesk = document.getElementById('client-anydesk-password').value;
        const usuario_acesso_cliente = document.getElementById('client-user').value;
        const senha_acesso_usuario = document.getElementById('client-user-password').value;
        const alternativo = document.getElementById('client-alternative-info').value;
        const ip_servidor_cliente = document.getElementById('client-ip-server').value;
        const senha_criptografada = document.getElementById('client-bd-password').value;
        const porta_bd = document.getElementById('client-bd-port').value;
        const so_server = document.getElementById('client-so-server').value;
        const postgres_versao = document.getElementById('client-postgres').value;

        // Contatos
        const contatos = document.getElementById('client-manager').value;
        const email_cliente = document.getElementById('client-email').value;
        const ddd_telefone = document.getElementById('client-ddd').value;
        const telefone1 = document.getElementById('client-contact-1').value;
        const telefone2 = document.getElementById('client-contact-2').value;
        
        // Manutenção.
        const licencas_cliente = document.getElementById('client-licences').value;
        const dth_manutencao_realizada = document.getElementById('client-maintenance').value;
        const dth_manutencao_futura = document.getElementById('client-maintenance-future').value;
        const ind_script = document.getElementById('client-maintenance-alert').value;
        const manutencao_backup = document.getElementById('client-maintenance-data').value;
        const antivirus_cliente = document.getElementById('client-maintenance-antivirus').value;

        //Financeiro.
        const ind_banco_boleto = document.getElementById('client-boleto').value;
        const cliente_municipio = document.getElementById('client-municipio').value;
        const ind_sat = document.getElementById('client-sat').value;
        const ind_lol = document.getElementById('client-lol').value;
        const ind_loe = document.getElementById('client-loe').value;
        const ind_gerador_pdf = document.getElementById('client-generator-pdf').value;
        const ind_faturamento_email = document.getElementById('client-fat-email').value;
        const ind_portal_novo = document.getElementById('client-portal-new').value; 
        const ind_contigencia = document.getElementById('client-contigencia').value;
        const ind_solic_exam_portal = document.getElementById('client-exames-ldonline').value;
        const ibt_calculo_correto = document.getElementById('client-ibpt').value;
        const ind_emite_nfs_api = document.getElementById('client-nf-api').value;
        const ind_publ_s3 = document.getElementById('client-publ-s3').value;
        const ind_itf_m = document.getElementById('client-itf-m').value;

        //Backup.
        const manutencao_armazenamento = document.getElementById('client-path-backup').value;
        const conta_nuvem_backup = document.getElementById('client-email-backup').value;
        const senha_conta_nuvem = document.getElementById('client-password-backup').value;
        const tipo_backup_nuvem = document.getElementById('client-type-backup').value;
        const pin_google_desktop = document.getElementById('client-pin-google').value;
        const tamanho_backup = document.getElementById('client-size-backup').value;
        const horario_backups = document.getElementById('client-time-backup').value;
        const horario_vacuum = document.getElementById('client-time-vaccum').value;
        const horarios_reindex = document.getElementById('client-time-reindex').value;
        const senha_smartvertis = document.getElementById('client-pw-smartvertis').value;
        const ind_qrcode = document.getElementById('client-qrcode').value;
        
        //Alertas
        const showAlert = document.getElementById('alert-modal-box')
        const alertTitle = document.getElementById('alert-title')
        const alertParagraph = document.getElementById('alert-textp')
        const alertStatus = document.getElementById('alert-status')
        const alertClose = document.getElementById('btn-confirm-alert')
        const inputs = document.querySelectorAll('.btns')

        
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const url = 'http://177.11.209.38/vertis/VertisConnect.dll/api/V1.1/vertis/clientesfat';
        const fullUrl = proxy + url;
        //const url = 'http://177.11.209.38/vertis/VertisConnect.dll/api/V1.1/vertis/clientesfat';
        
        
        const response = await fetch(fullUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
                body: JSON.stringify({nome_cliente, cod_unid_neg, cod_unid_oper, versao_vertis_cliente, data_atualizado, sql_cliente, cod_cliente, tipo_unidade, observacao, ind_auditoria, acesso_cliente_teamviewer, senha_acesso_cliente_teamviewer, acesso_cliente_anydesk, senha_acesso_cliente_anydesk, usuario_acesso_cliente, senha_acesso_usuario, alternativo, ip_servidor_cliente, senha_criptografada, porta_bd, so_server, postgres_versao, contatos, email_cliente, ddd_telefone, telefone1, telefone2, licencas_cliente, dth_manutencao_realizada, dth_manutencao_futura, ind_script, manutencao_backup, antivirus_cliente, ind_banco_boleto, cliente_municipio, ind_sat, ind_lol, ind_loe, ind_gerador_pdf, ind_faturamento_email, ind_portal_novo, ind_contigencia, ind_solic_exam_portal, ibt_calculo_correto, ind_emite_nfs_api, ind_publ_s3, ind_itf_m, manutencao_armazenamento, conta_nuvem_backup, senha_conta_nuvem, tipo_backup_nuvem, pin_google_desktop, tamanho_backup, horario_backups, horario_vacuum, horarios_reindex, senha_smartvertis, ind_qrcode}),
        });
    
            if (response.ok) {
                const result = await response.text();
                console.log(result);
                showAlert.style.display = 'flex';
                alertTitle.innerHTML = 'Uhuull!..'
                alertStatus.style.color = 'green'
                alertStatus.innerHTML = '<font color="gray">Status</font> <br>' + '(200) Ok!.';
                alertParagraph.innerHTML = ('Cliente ' + nome_cliente + ' atualizado com sucesso!');
                alertClose.addEventListener('click', function() {
                    showAlert.style.display = 'none';
                    inputs.forEach(input => {
                        input.disabled = true
                    });
                })
            } else {
                const error = await response.text();
                console.error(error);
                showAlert.style.display = 'flex';
                alertTitle.innerHTML = 'Viishh...'
                alertStatus.style.color = 'red'
                alertStatus.innerHTML = ('<font color="gray">Status</font> <br>' + error);
                alertParagraph.innerHTML = ('Não conseguimos atualizar o cliente ' + nome_cliente + ' para você :(. <br>' );
                alertClose.addEventListener('click', function() {
                    showAlert.style.display = 'none';
                    validarCamposInvalidos();
                })
            }
};

export default saveDataClients;