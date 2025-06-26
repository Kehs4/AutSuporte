async function infoClientes() {
    
    // Selecionando o ID do Cliente para puxar os dados.
    const cod_cliente = document.getElementById('client-cod').value; 
    window.open(`clients?id=${cod_cliente}`, '_blank');
    
};

export default infoClientes;