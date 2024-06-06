import { getProduto } from './exports.js'

const idProduto = new URLSearchParams(window.location.search).get('id');
console.log(idProduto);
if(!idProduto){
    window.location.href='./main.html'
} else {
    const info = await getProduto(idProduto)
    document.getElementById('nome').textContent = info.nome
    document.getElementById('descricao').textContent = info.descricao
    document.getElementById('preco').textContent = "R$" +info.preco
    document.getElementById('imagem').src = info.img
    var quantidadeEstoqueElement = document.getElementById('quantidadeEstoque'); 
     var quantidadeEstoque = info.quantidade_estoque;
     quantidadeEstoqueElement.textContent = quantidadeEstoque;
     if (quantidadeEstoque <= 5) {
         quantidadeEstoqueElement.style.backgroundColor = 'red';
         quantidadeEstoqueElement.style.color = 'white';
     } else if (quantidadeEstoque <= 15) {
         quantidadeEstoqueElement.style.backgroundColor = 'orange';
         quantidadeEstoqueElement.style.color = 'white';
     }

    console.log(info);
}



