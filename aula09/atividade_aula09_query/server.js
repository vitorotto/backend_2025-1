const express = require('express');
const app = express();
const PORT = 3000;

// Permite que o Express entenda JSON no corpo da requisição
app.use(express.json());

// Permite servir arquivos HTML e JS do diretório 'public'
app.use(express.static('public'));

// Simulando um banco de dados em memória
let dados = [
  { id: 1, name: 'vitor', message: 'Primeira mensagem' },
  { id: 2, name: 'anderson', message: 'Segunda mensagem' }
];

// GET com ou sem ID
app.get('/api/data/:id', (req, res) => {
    const { id } = req.params; // Acessando param da URL (ex: /api/data/1)
    if (id) {
      const item = dados.find(d => d.id == id);
      if (!item) {
        return res.status(404).json({ error: 'ID não encontrado' });
      }
      return res.status(200).json(item);
    }
    // Se não passar id, retorna todos
    res.status(200).json(dados);
  });

// Filtrando por nome
app.get('/api/data/', (req, res) => {
    const { name } = req.query; // Acessando a query
    if (name) {
      const item = dados.find(d => d.name == name.toLowerCase());
      if (!item) {
        return res.status(404).json({ error: 'name não encontrado' });
      }
      return res.status(200).json(item);
    }
    // Se não passar id, retorna todos
    res.status(200).json(dados);
  });

  
// POST - Cria novo registro
app.post('/api/data', (req, res) => {
  const { message, name } = req.body; // Acessando corpo da requisição
  if (!message) {
    return res.status(400).json({ error: 'Campo "message" é obrigatório' });
  }
  if (!name) {
    return res.status(400).json({ error: 'Campo "name" é obrigatório' });
  }
  const novo = {
    id: dados.length ? Math.max(...dados.map(d => d.id)) + 1 : 1,
    message,
    name
  };
  dados.push(novo);
  res.status(201).json(novo);
});

// PUT - Atualiza completamente um registro existente
app.put('/api/data/:id', (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  const index = dados.findIndex(d => d.id == id);
  if (index === -1) {
    return res.status(404).json({ error: 'ID não encontrado' });
  }
  if (!message) {
    return res.status(400).json({ error: 'Campo "message" é obrigatório' });
  }
  dados[index].message = message;
  res.status(200).json(dados[index]);
});

// PATCH - Atualiza parcialmente um registro
app.patch('/api/data/:id', (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  const item = dados.find(d => d.id == id);
  if (!item) {
    return res.status(404).json({ error: 'ID não encontrado' });
  }
  if (!message) {
    return res.status(400).json({ error: 'Campo "message" é obrigatório' });
  }
  item.message += ' ' + message;
  res.status(200).json(item);
});

// DELETE - Remove um item pelo ID
app.delete('/api/data/:id', (req, res) => {
  const { id } = req.params;
  const index = dados.findIndex(d => d.id == id);
  if (index === -1) {
    return res.status(404).json({ error: 'ID não encontrado' });
  }
  dados.splice(index, 1);
  res.status(204).send(); // No Content
});

// Rota não encontrada
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
