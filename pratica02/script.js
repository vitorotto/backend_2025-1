const vendas = require('./vendas1.json');
const express = require('express');
const func = require('./functions.js')

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Olá, Mundo!')
})

app.get('/resumoVendas', (req, res) => {
  const quantidadeTotal = func.calcularQuantidadeTotal(vendas);
  const valorTotal = func.calcularValorTotal(vendas);
  const precoMedio = func.calcularPrecoMedio(valorTotal, quantidadeTotal);

  console.log(' - Quantidade Total Vendida:', quantidadeTotal);
  console.log(' - Valor Total:', valorTotal.toFixed(2));
  console.log(' - Preço Médio Geral:', precoMedio.toFixed(2));

  res.json({ quantidadeTotal, valorTotal, precoMedio })
})

app.get('/vendasPorData', (req, res) => {
  const vendasPorData = func.agruparPorChave('data', vendas);
  res.json(vendasPorData);
});

app.get('/vendasPorUf', (req, res) => {
  const vendasPorUF = func.agruparPorChave('uf', vendas);
  res.json(vendasPorUF);
});


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})



