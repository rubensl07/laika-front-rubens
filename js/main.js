import { getProdutos, getProduto} from './exports.js'

const containerProdutos=document.getElementById('containerProdutos')


function criarCard(produto) {

    const card = document.createElement('div')
    card.classList.add('max-w-[229px]','rounded-xl','bg-white','p-4','text-black')
    const id = produto.id
    //card.addEventListener('click', () => abrirproduto(id));
    
    const divAvaliacao = document.createElement('div')
    divAvaliacao.classList.add('flex','items-center')

    const avaliacao = document.createElement('h2')
    avaliacao.textContent = '4,5'
    avaliacao.classList.add('text-xl','font-extrabold')
        
    const imagemEstrela = document.createElement('img')
    imagemEstrela.src = './img/estrela.png'
    imagemEstrela.classList.add('w-[23px]')

    const imagemProduto = document.createElement('img')
    imagemProduto.src = produto.img
    imagemProduto.classList.add('w-[125px]','flex','justify-center','items-center','self-center','mt-2.5')

    const nomeProduto = document.createElement('h3')
    nomeProduto.textContent = produto.nome
    nomeProduto.classList.add('mt-4','font-bold')

    const preco = document.createElement('h4')
    preco.classList.add('mt-3','text-violet-950')
    // .toFixed(2).replace('.', ',')
    preco.textContent = `R$ ${produto.preco}`
    
    const btn_comprar=document.createElement('button')
    btn_comprar.textContent='Adicionar'
    btn_comprar.classList.add('mt-5','w-auto','bg-slate-300','border','border-solid','border-violet-950','rounded-xl','py-2.5','px-11','text-violet-950')

    divAvaliacao.replaceChildren(avaliacao,imagemEstrela)
    card.replaceChildren(divAvaliacao, imagemProduto,nomeProduto,preco,btn_comprar)
    containerProdutos.appendChild(card)
    console.log(produto);

    return containerProdutos
}



async function preencherContainer() {
    const container = document.querySelector('main')
    const produtos = await getProdutos()
    produtos.forEach(produto => {
        const main = criarCard(produto)
        container.appendChild(containerProdutos)
    });
}

preencherContainer()