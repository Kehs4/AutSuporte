const { Pool } = require('pg');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 9000;

// Configuração da conexão com o banco de dados
const pool = new Pool({
  user: 'postgres', // Substitua pelo seu usuário do PostgreSQL
  host: 'localhost', // Ou o endereço do servidor do banco
  password: 'boeing',
  database: 'autsuporte', // Nome do banco de dados
  port: 5432, // Porta padrão do PostgreSQL
});

// Testando a conexão
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Erro ao conectar ao banco de dados:', err.stack);
  }
  console.log('Conexão com o banco de dados da AutSuporte estabelecida com sucesso!');
  release();
});

module.exports = pool;

// Configuração do CORS
app.use(cors());

// Middleware para processar JSON
app.use(bodyParser.json());

app.get('/chamados', (req, res) => {
  pool.query('SELECT * FROM _at_chamados2025 ', (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Erro ao buscar chamados' });
    }
    res.status(200).json(results.rows);
  });
});


// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});