import { getProdutos, getProduto} from './exports.js'

const containerProdutos=document.getElementById('containerProdutos')


function criarCard(produto) {

    const card = document.createElement('div')
    card.classList.add('max-w-[229px]','rounded-xl','bg-white','p-4','text-black', 'cursor-pointer')
    const id = produto.id
    card.addEventListener('click', () => abrirProduto(id));
    
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


async function abrirProduto(id) {
    const produto = await getProduto(id)

    CriarCardFocusProduto(produto)
}

function fecharproduto() {
    divFundo.classList.add('hidden')
}
async function CriarCardFocusProduto(produto, classificacao) {
    divFundo.classList.remove('hidden')

    const lateral_esquerda = document.createElement('div')
    lateral_esquerda.classList.add('bg-roxo_cinza', 'h-screen', 'w-5/12', 'flex', 'flex-col', 'justify-between', 'items-start', 'p-8')

    const btn_voltar = document.createElement('img')
    btn_voltar.src ='./img/voltar.png'
    btn_voltar.classList.add('cursor-pointer')
    btn_voltar.addEventListener('click', fecharproduto)

    const div_capa = document.createElement('div')
    div_capa.classList.add('flex', 'justify-center', 'w-full')

    const capa_produto = document.createElement('img')
    capa_produto.src = produto.foto_capa

    const logo = document.createElement("img")
    logo.src ='./img/logo_completa.png'

    const lateral_direita = document.createElement('div')
    lateral_direita.classList.add('flex', 'flex-col', 'pt-36', 'pb-24', 'pr-32', 'pl-20', 'gap-12')

    const titulo_sinopse = document.createElement('div')
    titulo_sinopse.classList.add('h-1/2')

    const titulo_produto = document.createElement('h1')
    titulo_produto.textContent = produto.nome
    titulo_produto.classList.add('text-amarelo', 'text-4xl')

    const sinopse_produto = document.createElement('h2')
    sinopse_produto.textContent = produto.sinopse
    sinopse_produto.classList.add('text-branco', 'text-2xl')

    const lancamento_duracao = document.createElement('div')

    const data_lancamento = document.createElement('h3')
    data_lancamento.textContent = `Data de lançamento: ${produto.data_lancamento}`
    data_lancamento.classList.add('text-branco', 'text-xl')

    const genero = document.createElement('h3')
    genero.textContent = `Data de lançamento: ${produto.genero}`
    genero.classList.add('text-branco', 'text-xl')

    const duracao = document.createElement('h3')
    duracao.textContent = `Duração: ${produto.duracao}`
    duracao.classList.add('text-branco', 'text-xl')

    const div_classificacao = document.createElement('div')
    div_classificacao.classList.add('flex' ,'gap-1')

    const img_classificacao = document.createElement('img')
    // img_classificacao.src=produto.classificacao
    img_classificacao.src =classificacao.classificacao_foto

    const text_classificacao = document.createElement('h4')
    text_classificacao.classList.add('text-branco')
    // text_classificacao.textContent=produto.classificacao_escrita
    text_classificacao.textContent = `Classificacao ${classificacao.classificacao}`

    const botoes = document.getElementById('botoes')

    div_capa.appendChild(capa_produto)
    lateral_esquerda.replaceChildren(btn_voltar, div_capa, logo)

    div_classificacao.replaceChildren(img_classificacao, text_classificacao)
    lancamento_duracao.replaceChildren(data_lancamento, duracao)
    titulo_sinopse.replaceChildren(titulo_produto, sinopse_produto)
    lateral_direita.replaceChildren(titulo_sinopse, lancamento_duracao, div_classificacao, botoes)

    divFundo.replaceChildren(lateral_esquerda, lateral_direita)
    return divFundo
}
