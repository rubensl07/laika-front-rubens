import { getCliente, getClientes, deleteCliente, putCliente } from './exports.js'

'use strict'

//Pega o id fornecido pelo login pra dps usar ele em confirmacoes
const idPerfil = 2

// const idPerfil = localStorage.getItem('idusuario')
if (!idPerfil) {
  window.location.href = '../index.html'
}
const editar = document.getElementById('btn_confirmar')

const perfilAntigo = await getCliente(idPerfil)

const nome = document.getElementById('nomeUsuario')
nome.value = perfilAntigo.nome
const email = document.getElementById('emailUsuario')
email.value = perfilAntigo.email
const telefone = document.getElementById('telefoneUsuario')
//   .substring(11, 19)
telefone.value = perfilAntigo.telefone
const senha = document.getElementById('senhaUsuario')
//   .substring(0, 10)  
senha.value = perfilAntigo.senha
const endereco = document.getElementById('cep')
endereco.value = '06335040'

const numero = document.getElementById('numeroDaCasa')
// const fotoPerfil = document.getElementById('fotoPerfil')
// fotoPerfil.value = perfilAntigo.img
preencherCampos()

const btn_excluir = document.getElementById('btn_excluir')
btn_excluir.addEventListener('click', async function () {
  var confirmado = confirm(`Deseja deletar sua conta?`);
  if (confirmado) {
    var certezaDeConfirmacao = confirm(`Tem certeza de que deseja deletar sua conta? essa alteração é irreversivel`);
    if (certezaDeConfirmacao) {
      deleteCliente(idPerfil)
      window.location.reload();
      alert('Conta deletada com sucesso');
    } else {
      alert('Operação cancelada');
    }
  } else {
    alert('Operação cancelada');
  }
})

async function pegarCep(endereco) {

  const url = `https://viacep.com.br/ws/${endereco.value}/json/`
  const response = await fetch(url)
  const cepInfo = await response.json()

  return cepInfo
}

async function preencherCampos() {
  const rua = document.getElementById('rua')
  const bairro = document.getElementById('bairro')
  const cidade = document.getElementById('cidade')
  const estado = document.getElementById('estado')
  const cepInfo = await pegarCep(endereco)
  rua.value = cepInfo.logradouro
  bairro.value = cepInfo.bairro
  cidade.value = cepInfo.localidade
  estado.value = cepInfo.uf
}

const containerEditando = document.getElementById('edicao')
const containerInformacoes = document.getElementById('containerCliente')
let salvar=false
editar.addEventListener('click', editarPerfil)
function editarPerfil(){
  
    editar.textContent='Salvar'
    nome.disabled = false;
    email.disabled = false;
    telefone.disabled = false;
    senha.disabled = false;
    endereco.disabled = false;
    numero.disabled = false;
  
     salvar=true
    console.log(salvar);
    editar.removeEventListener('click', editarPerfil)
    editar.addEventListener('click', () => enviarParaBack(idPerfil))
  
    // ou use inputElement.removeAttribute("disabled");
    // containerInformacoes.classList.add('hidden')
    // containerEditando.classList.remove('hidden')
  
}

// if (salvar) {
//   console.log('entrei aqui');
  
  async function enviarParaBack(idPerfil) {
console.log('to editando');

preencherCampos()
    const nomeAtualizado = document.getElementById('nomeUsuario').value
    const emailAtualizado = document.getElementById('emailUsuario').value
    const telefoneAtualizado = document.getElementById('telefoneUsuario').value
    const senhaAtualizado = document.getElementById('senhaUsuario').value
    const enderecoAtualizado = document.getElementById('cep').value
    const numeroAtualizado = document.getElementById('numeroDaCasa').value
    // const fotoPerfil = document.getElementById('fotoPerfil').value
    // fotoPerfil = 'https://osegredo.com.br/wp-content/uploads/2023/09/1-81.jpg.webp'
    const novosDados = {
      nome: nomeAtualizado,
      telefone: telefoneAtualizado,
      email: emailAtualizado,
      senha: senhaAtualizado,
      // img: fotoPerfil,
//       endereco: [
// bairro

//       ]
      // endereco: numeroAtualizado,
    }
    if (novosDados) {
      let status = await putCliente(novosDados, idPerfil)
      console.log(novosDados);
            
      if (status) {
        alert('Dados Atualizados com sucesso')
        // window.location.href = './perfil.html'
      }
      else {
        alert('Não foi possivel atualizar seus dados')
        // window.location.href = './perfil.html'
      }
    }
    nome.disabled = false;
    email.disabled = false;
    telefone.disabled = false;
    senha.disabled = false;
    endereco.disabled = false;
    numero.disabled = false;
    salvar=false
  }
// }



// function fecharcampoEdicao() {
//     window.location.href = './perfil.html'
// }
// const fecharCampo = document.getElementById('fecharcampoEdicao')
// fecharCampo.addEventListener('click', fecharcampoEdicao)
