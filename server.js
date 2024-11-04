const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Configuração da conexão com o Banco de dados
const dbConfig = {
    user: 'UserLista',
    password: 'Lista',
    server: 'DESKTOP-NVT5NS4\SQLEXPRESS',
    database: 'TarefasDB',
    options: {
        trustServerCertificate: true
    }
};

// Obter Tarefas
app.get('/tarefas', async (req, res) => {
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request().query('SELECT * FROM Tarefas');
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao acessar o banco de dados');
    }
});

// Adicionar Tarefas
app.post('/tarefas', async (req, res) => {
    const { nome, custo, dataLimite, ordem } = req.body;
    try {
        let pool = await sql.connect(dbConfig);
        await pool.request()
            .input('Nome', sql.NVarChar, nome)
            .input('Custo', sql.Decimal(10, 2), custo)
            .input('DataLimite', sql.Date, dataLimite)
            .input('Ordem', sql.Int, ordem)
            .query('INSERT INTO Tarefas (Nome, Custo, DataLimite, Ordem) VALUES (@Nome, @Custo, @DataLimite, @Ordem)');
        res.status(201).send('Tarefa adicionada');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao adicionar tarefa');
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
