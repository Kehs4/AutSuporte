async function infoClientes() {
    
    // Selecionando o ID do Cliente para puxar os dados.
    const cod_cliente = document.getElementById('client-cod').value; 
    window.open(`clientes?id=${cod_cliente}`, '_blank');
    
};

export default infoClientes;