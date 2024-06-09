import { getProdutos, getServico, iniciarTelaCarregamento} from './exports.js'

//TELA DE CARREGAMENTO. AGUARDA A REQUISIÇÃO DO BANCO DE DADOS SER CONCLUÍDA


let produtos
let hospedagem
let babySitter
let creche

document.addEventListener('DOMContentLoaded', async () => {
    const telaCarregamento = document.createElement('div');
    iniciarTelaCarregamento(telaCarregamento)
    produtos = await getProdutos({})
    hospedagem = await getServico(8)
    babySitter = await getServico(7)
    creche = await getServico(6)
    if(produtos && hospedagem && babySitter && creche){
        telaCarregamento.classList.add('hidden')
        executarSite()
    }
});

function executarSite(){
    function criarCardProduto(info) {
        const card = document.createElement('div')
        card.classList.add('bg-white','w-1/4','h-80','rounded-xl','flex','flex-col','items-center','p-4')
        
        card.style.border = '3px'
        card.style.borderStyle = 'solid';

        const imagemProduto = document.createElement('img')
        imagemProduto.src = info.img
        imagemProduto.classList.add('h-1/2')
    
        const contentBottom = document.createElement('div')
        contentBottom.classList.add('h-1/2','flex','flex-col','items-center','w-full','justify-around')
    
        const textInfos= document.createElement('div') 
        textInfos.classList.add('w-full')
    
        const nome = document.createElement('h2')
        nome.textContent = info.nome
    
        const preco = document.createElement('h2')
        preco.classList.add('text-[#2A00A8]','font-medium')
        // .toFixed(2).replace('.', ',')
        preco.textContent = `R$${info.preco}`
        
        const btn_comprar=document.createElement('button')
        btn_comprar.textContent='Adicionar'
        btn_comprar.classList.add('bg-[#86A7FC]','duration-500','border-[#2A00A8]','border-1','rounded-full','p-2','text-[#2A00A8]','w-2/3','hover:bg-[#6385EC]','hover:text-white')
        btn_comprar.style.border = '2px'
        btn_comprar.style.borderStyle = 'solid';


        textInfos.replaceChildren(nome,preco)
        contentBottom.replaceChildren(textInfos,btn_comprar)
        card.replaceChildren(imagemProduto,contentBottom)
        document.getElementById('containerProdutos').appendChild(card)
    
        btn_comprar.addEventListener('click',()=>{
            window.location.href='./telaCompra.html?id='+info.id
        })
    }
    
    for (let index = 0; index < 4; index++) {
        console.log(produtos);
        criarCardProduto(produtos[index])
    }
    
    
    
    function criarCardServico(dados) {
        const info = dados.dados
        const icone = dados.img
        const card = document.createElement('div')
        card.classList.add('bg-white', 'w-1/3', 'flex', 'items-center', 'flex-col', 'rounded-xl', 'h-full', 'justify-between', 'p-4')

        card.style.border = '3px'
        card.style.borderStyle = 'solid';

        const top = document.createElement('div')
        top.classList.add('flex', 'w-full', 'items-center', 'justify-around')
        const nome = document.createElement('h2')
        nome.textContent = info.nome
        nome.classList.add('font-bold', 'text-[#2A00A8]', 'text-3xl')
        const img = document.createElement('img')
        img.src = icone
        const sinopse =document.createElement('h4')
        sinopse.textContent = info.descricao
        sinopse.classList.add('text-center')
        const botao = document.createElement('button')
        botao.textContent = "Contratar serviço"
        botao.style.border = '3px'
        botao.style.borderStyle = 'solid';
        botao.classList.add('bg-[#CFD4E5]', 'hover:bg-[#a5a9b4]', 'duration-300', 'rounded-md', 'text-[#2A00A8]', 'text-2xl', 'hover:text-[#3800ee]', 'p-4')
        botao.addEventListener('click',()=>{
            window.location.href='./telaServico.html?id='+info.id
        })
    
        top.replaceChildren(nome,img)
        card.replaceChildren(top,sinopse,botao)
        document.getElementById('containerServicos').appendChild(card)
    
    }
    
    const servicos = []
    servicos.push({dados: hospedagem, img:"../img/servicos/Pillow.png"})
    servicos.push({dados: babySitter, img:"../img/servicos/Dog House.png"})
    servicos.push({dados: creche, img:"../img/servicos/Baby Mobile.png"})
    
    for (let index = 0; index < 3; index++) {
        criarCardServico(servicos[index])    
    }
    
}

document.getElementById('goToProdutos').addEventListener('click',()=>{
    document.getElementById('produtosField').scrollIntoView({ behavior: 'smooth' });
})
document.getElementById('goToServicos').addEventListener('click',()=>{
    document.getElementById('servicosField').scrollIntoView({ behavior: 'smooth' });
})
document.getElementById('goToVeterinarios').addEventListener('click',()=>{
    document.getElementById('veterinariosField').scrollIntoView({ behavior: 'smooth' });
})