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
  database: 'keyflix', // Nome do banco de dados
  port: 5432, // Porta padrão do PostgreSQL
});

// Testando a conexão
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Erro ao conectar ao banco de dados:', err.stack);
  }
  console.log('Conexão com o banco de dados da Keyflix estabelecida com sucesso!');
  release();
});

module.exports = pool;

// Configuração do CORS
app.use(cors());

// Middleware para processar JSON
app.use(bodyParser.json());

// Endpoint para cadastro do usuário no banco de dados.
const bcrypt = require('bcrypt');

app.post('/api/signup', async (req, res) => {
  console.log('Dados recebidos:', req.body); // Log para verificar os dados recebidos

  const {
    name,
    surname,
    email,
    password,
    phone,
    cep,
    address,
    number,
    complement,
    city,
    state,
    birthdate,
  } = req.body;

  if (!name || !surname || !email || !password) {
    return res.status(400).json({ error: 'Campos obrigatórios estão faltando.' });
  }

  try {
    // Criptografar a senha antes de salvar
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (name, surname, email, password, phone, cep, address, number, complement, city, state, birthdate)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING id;
    `;
    const values = [name, surname, email, hashedPassword, phone, cep, address, number, complement, city, state, birthdate];

    const result = await pool.query(query, values);
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!', userId: result.rows[0].id });
  } catch (error) {
    console.error('Erro ao inserir dados no banco:', error);
    res.status(500).json({ error: 'Erro ao cadastrar o usuário.' });
  }
});

// Endpoint para login do usuário
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
  }

  try {
    const query = 'SELECT id, name, surname, password, email, phone, cep, address, number, complement, city, state, birthdate, keys FROM users WHERE email = $1';
    const values = [email];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Não existe nenhuma conta encontrada com essas informações.' });
    }

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Senha incorreta.' });
    }

    // Log de autenticação
    console.log(`[LOGIN] Usuário autenticado: ${user.name} ${user.surname} (E-mail: ${email}) às ${new Date().toLocaleString()}`);

    res.status(200).json({
      message: 'Login bem-sucedido!',
      userId: user.id,
      UserName: user.name,
      UserSurname: user.surname,
      UserEmail: user.email,
      UserPhone: user.phone,
      UserCEP: user.cep,
      UserAddress: user.address,
      UserNumber: user.number,
      UserComplement: user.complement,
      UserCity: user.city,
      UserState: user.state,
      UserBirthdate: user.birthdate,
      UserKeys: user.keys,
    });
  } catch (error) {
    console.error('Erro ao verificar login:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

// Endpoint para atualizar os dados do usuário
app.post('/api/user/update', async (req, res) => {
  const {
    email, // email é obrigatório para identificar o usuário
    name,
    surname,
    phone,
    cep,
    address,
    number,
    complement,
    city,
    state,
    birthdate
  } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'E-mail é obrigatório para atualizar o usuário.' });
  }

  try {
    const query = `
      UPDATE users
      SET name = $1,
          surname = $2,
          phone = $3,
          cep = $4,
          address = $5,
          number = $6,
          complement = $7,
          city = $8,
          state = $9,
          birthdate = $10
      WHERE email = $11
      RETURNING id, name, surname, email, phone, cep, address, number, complement, city, state, birthdate, keys;
    `;
    const values = [name, surname, phone, cep, address, number, complement, city, state, birthdate, email];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    res.status(200).json({
      message: 'Dados do usuário atualizados com sucesso!',
      user: result.rows[0]
    });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao atualizar usuário.' });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});