import { getCliente, getAnimal, deleteAnimal, postAnimal, putAnimal, getTipos, getRacaByTipo ,getPortes, idUsuario, verificarUsuarioExistente, iniciarTelaCarregamento, getAnimaisCliente, getRacas} from './exports.js'

'use strict'

//o de cadastrar ta tinindo(falta só arrumar o bglh de porte, raca e tipo), o de aparecer tds os pets precisa de uma alteração no back pra funcionar tinindo, falta o de editar

if (!idUsuario) {
    window.location.href = './login.html'
} else {
    if(!verificarUsuarioExistente(idUsuario)){
        window.location.href = './login.html'
    }
}

let listaPets
let listaTipos
let listaRacas
let listaPortes

document.addEventListener('DOMContentLoaded', async () => {
    const telaCarregamento = document.createElement('div');
    iniciarTelaCarregamento(telaCarregamento)
    listaPets = await getAnimaisCliente(idUsuario)
    listaTipos = await getTipos()
    listaRacas = await getRacas()
    listaPortes = await getPortes()
    if(listaPets){
        telaCarregamento.classList.add('hidden')
    }
    executarSite()
  });

async function executarSite(){
            // document.getElementById('nomeUser').textContent = info.nome

    const telaCriar = document.getElementById('criarPet')
    const telaNormal = document.getElementById('telaNormal')
    const telaEditar = document.getElementById('editarPet')
    
    document.getElementById('btn_cadastrarPet').addEventListener('click', () => {
        telaCriar.classList.remove('hidden')
        telaNormal.classList.add('hidden');
    }
    )
    listaPortes.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria.id;
        option.textContent = categoria.nome;
        document.getElementById('novoPorte').appendChild(option);
});
    listaTipos.forEach(tipo => {
        const option = document.createElement('option');
        option.value = tipo.id;
        option.textContent = tipo.nome;
        document.getElementById('novoTipo').appendChild(option);
    });

    document.getElementById('novoTipo').addEventListener('change', async function() {
    const tipoId = this.value;
    document.getElementById('novaRaca').innerHTML = '';
    
    if (tipoId>0) {
        const listaRacasAnimal= filtrarRacas(tipoId)
            listaRacasAnimal.forEach(raca => {
            const option = document.createElement('option');
            option.value = raca.id;
            option.textContent = raca.nome;
            document.getElementById('novaRaca').appendChild(option);
        });
    }
    });

    
    document.getElementById('btn_mandarInfo').addEventListener('click', async ()=>{
        let nome = document.getElementById('novoNome').value
        let porte = document.getElementById('novoPorte').value
        let peso = document.getElementById('novoPeso').value
        let dataNascimento = document.getElementById('novaDataNascimento').value
        let raca = document.getElementById('novaRaca').value
        const img=document.getElementById('novaFotoPet').value
    
    if (nome == '' || porte == '' || peso == '' || dataNascimento == '' || raca == ''|| img==''||
    nome == null || porte == null || peso == '' || dataNascimento == null || raca == null|| img==null||
    nome == undefined || porte == undefined || peso == undefined || dataNascimento == undefined || raca == undefined|| img==undefined) {
            alert('Preencha todos os campos')
        }
        else {
            const animal = {
                nome: nome,
                nascimento: dataNascimento,
                peso: peso,
                img: img,
                dono_id: idUsuario,
                porte_id: Number(porte),
                raca_id: Number(raca)
            }
    
            try {
                const retornoInsert= await postAnimal(animal)
                if (retornoInsert) {
                    telaCriar.classList.add('hidden');
                    telaNormal.classList.remove('hidden')
                } else {
                    alert('Não foi possivel cadastrar novo pet, verifique as informações')
                }
            }
            catch (error) {
                console.error(error)
            }
        }
})

    
    
    function criarCard(dados) {
        const card = document.createElement('div')
        card.classList.add('flex', 'flex-col', 'items-center', 'bg-white', 'p-1.5', 'w-52', 'h-68', 'rounded-xl')
        card.addEventListener('click', () => {
            abrirCardAnimal(dados)
        })
    
        const iconeAnimal = document.createElement('img')
        iconeAnimal.src = dados.tipo.icon
        iconeAnimal.classList.add('self-end','w-[32px]')
    
        const ImagemAnimal = document.createElement('img')
        ImagemAnimal.src = dados.img
        ImagemAnimal.classList.add('self-center', 'rounded-full','w-32','h-32')
    
    
        const nomeAnimal = document.createElement('h2')
        nomeAnimal.textContent = dados.nome
        nomeAnimal.classList.add('mt-2.5', 'text-xl', 'font-extrabold', 'self-center')
    
        const nomeanimal = document.createElement('h3')
        nomeanimal.textContent = dados.nome
        nomeanimal.classList.add('mt-4', 'font-bold')
    
        const racaAnimal = document.createElement('h2')
    if (dados.raca) {
        racaAnimal.textContent = dados.raca.nome
    } else {
        racaAnimal.textContent='Sem raça'
    }
        racaAnimal.classList.add('self-center')
        const linha = document.createElement('hr')
        linha.classList.add('border-2', 'border-solid', 'bg-violet-950', 'border-violet-950', 'w-[80%]')
    
        const divIdadePeso = document.createElement('div')
        divIdadePeso.classList.add('flex', 'gap-5', 'mt-2', 'text-zinc-900')

        const idade = (((new Date()).getFullYear())-(dados.nascimento.substring(0, 4)))
        const idadeAnimal = document.createElement('p')
        let stringIdade
        if(idade>0){
            stringIdade = idade + ' anos'
        } else {
            stringIdade = "Recém-nascido"
        }
        idadeAnimal.textContent = stringIdade
    
        const pesoAnimal = document.createElement('p')
        pesoAnimal.textContent = `${dados.peso} Kg`
    
        divIdadePeso.replaceChildren(idadeAnimal, pesoAnimal)
        card.replaceChildren(iconeAnimal, ImagemAnimal, nomeAnimal, racaAnimal, linha, divIdadePeso)
        telaNormal.appendChild(card)
    }
        const container = document.querySelector('main')
        listaPets.forEach(dado => {
            criarCard(dado)
            container.appendChild(telaNormal)
        });
    
    async function abrirCardAnimal(animalAntigo) {
        telaEditar.classList.remove('hidden')
        telaNormal.classList.add('hidden')
    
    document.getElementById('imgEditadaLink').value=animalAntigo.img
    const img=document.getElementById('imgEditada')
    img.src=document.getElementById('imgEditadaLink').value
    
    document.getElementById('meusPets').classList.add('hidden')
    document.getElementById('iconEditar').classList.remove('hidden')
    const nome = document.getElementById('nomeEditado')
    nome.classList.remove('hidden')
    nome.value = animalAntigo.nome
    
    document.getElementById('editarData').value = animalAntigo.nascimento.substring(0, 10)
    
    listaPortes.forEach(dado => {
        const option = document.createElement('option');
        option.value = dado.id;
        option.textContent = dado.nome;
        document.getElementById('editarPorte').appendChild(option);
    });
    
    document.getElementById('editarPorte').value = animalAntigo.porte.id
    const tipoId = animalAntigo.tipo.id;
    const racaSelect = document.getElementById('editarRaca');
    
    if (tipoId) {
        const data=filtrarRacas(tipoId)
            data.forEach(dado => {
            const option = document.createElement('option');
            option.value = dado.id;
            option.textContent = dado.nome;
            racaSelect.appendChild(option);
        });
    
    }
    
    if (animalAntigo.raca) {
        document.getElementById('editarRaca').value = animalAntigo.raca.id
    } else {
        document.getElementById('editarRaca').value='0'
    }
    
    const peso = document.getElementById('editarPeso')
    peso.value = animalAntigo.peso
    
    const editar = document.getElementById('btn_confirmar')
    editar.addEventListener('click', async ()=>{
    
        const imgLink=document.getElementById('imgEditadaLink').value
    
        const nomeAtualizado = document.getElementById('nomeEditado').value
        const nascimentoAtualizado = document.getElementById('editarData').value
        const porteAtualizado = document.getElementById('editarPorte').value
        const racaAtualizado = document.getElementById('editarRaca').value
        const pesoAtualizado = document.getElementById('editarPeso').value
        // const fotoPerfil = document.getElementById('fotoPerfil').value
        // fotoPerfil = 'https://osegredo.com.br/wp-content/uploads/2023/09/1-81.jpg.webp'
        const novosDados = {
            nome: nomeAtualizado,
            nascimento: nascimentoAtualizado,
            peso:Number(pesoAtualizado),
            img:imgLink,
            dono_id:idUsuario,
          porte_id: Number(porteAtualizado),
          raca_id: Number(racaAtualizado)
        }
        console.log(novosDados);
        if (novosDados) {
          let status = await putAnimal(novosDados, animalAntigo.id)
          if (status) {
            window.location.reload()
        } else {
            alert('Não foi possivel cadastrar novo pet, verifique as informações')
        }
        }
      
    })
    
    const btn_excluir = document.getElementById('btn_excluir')
    btn_excluir.addEventListener('click', async function () {
      var confirmado = confirm(`Deseja deletar pet ${nome.value}?`);
      if (confirmado) {
        var certezaDeConfirmacao = confirm(`Tem certeza de que deseja deletar o pet ${nome.value}? essa alteração é irreversivel`);
        if (certezaDeConfirmacao) {
          deleteAnimal(idBixo)
          window.location.reload();
          alert('Pet deletado com sucesso');
        } else {
          alert('Operação cancelada');
        }
      } else {
        alert('Operação cancelada');
      }
    })
    }


    function filtrarRacas(idTipo){
        let racasTipo = []
        listaRacas.forEach(raca => {
            if(raca.tipo_id == idTipo){
                racasTipo.push(raca)
                }
                });
                return racasTipo
        }
}