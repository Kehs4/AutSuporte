 // Função para buscar os clientes
 async function getClientes() {
  const proxy = 'https://cors-anywhere.herokuapp.com/';
      const url = 'http://177.11.209.38/vertis/VertisConnect.dll/api/V1.1/vertis/clientesfat';
      const fullUrl = proxy + url;
     
      try {
        const response = await fetch(fullUrl)
        const data = await response.json();

        if (response.ok) {
          const tableBody = document.querySelector('#clientes-table tbody');
          tableBody.innerHTML = '';  // Limpa a tabela antes de popular

          data.forEach(cliente => {
            const row = document.createElement('tr');
            const rowID = row.setAttribute('id', cliente.cod_cliente);
            row.innerHTML = `
                <td id="client-code">${cliente.cod_cliente}</td>
                <td id="client-name-id">${cliente.nome_cliente}</td>
                <td>${cliente.acesso_cliente_teamviewer}</td>
                <td>${cliente.senha_acesso_cliente_teamviewer}</td>
                <td>${cliente.acesso_cliente_anydesk}</td>
                <td>${cliente.senha_acesso_cliente_anydesk}</td>
                <td>${cliente.versao_vertis_cliente}</td>
          	`;
            tableBody.appendChild(row);
          });
          
        } else {
            
          };
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
    }
};

export default getClientes;