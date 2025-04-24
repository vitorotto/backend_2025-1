const vendas = require('./vendasTeste.json');

const calcularQuantidadeTotal = (vendas) =>
  vendas.reduce((total, item) => total + item.quantidade, 0);

const calcularValorTotal = (vendas) =>
  vendas.reduce((total, item) => total + item.precoUnitario * item.quantidade, 0);

const calcularPrecoMedio = (valorTotal, quantidadeTotal) =>
  quantidadeTotal ? valorTotal / quantidadeTotal : 0;

const exibirResumoVendas = () => {
  const quantidadeTotal = calcularQuantidadeTotal(vendas);
  const valorTotal = calcularValorTotal(vendas);
  const precoMedio = calcularPrecoMedio(valorTotal, quantidadeTotal);

  console.log(' - Quantidade Total Vendida:', quantidadeTotal);
  console.log(' - Valor Total:', valorTotal.toFixed(2));
  console.log(' - Preço Médio Geral:', precoMedio.toFixed(2));
};

exibirResumoVendas()
