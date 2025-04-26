const calcularQuantidadeTotal = (vendas) =>
    vendas.reduce((total, item) => total + item.quantidade, 0);
  
const calcularValorTotal = (vendas) =>
    vendas.reduce((total, item) => total + item.precoUnitario * item.quantidade, 0);
  
const calcularPrecoMedio = (valorTotal, quantidadeTotal) =>
    quantidadeTotal ? valorTotal / quantidadeTotal : 0;

const agruparPorChave = (chave, vendas) => {
    return vendas.reduce((resultado, item) => {
        const key = item[chave];
        if (!resultado[key]) {
            resultado[key] = { quantidadeTotal: 0, valorTotal: 0 };
        }
        resultado[key].quantidadeTotal += item.quantidade;
        resultado[key].valorTotal += item.precoUnitario * item.quantidade;
        resultado[key].precoMedio = (resultado[key].valorTotal / resultado[key].quantidadeTotal).toFixed(2);
        return resultado;
    }, {});
}

module.exports = {
    calcularQuantidadeTotal,
    calcularValorTotal,
    calcularPrecoMedio,
    agruparPorChave
}