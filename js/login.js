'use strict'

import { getClientesLogin, getFuncionariosLogin, iniciarTelaCarregamento, } from "./exports.js"

let allClientes
let allFuncionarios

//TELA DE CARREGAMENTO. AGUARDA A REQUISIÇÃO DO BANCO DE DADOS SER CONCLUÍDA
document.addEventListener('DOMContentLoaded', async () => {
    const telaCarregamento = document.createElement('div');
    iniciarTelaCarregamento(telaCarregamento)
    allClientes = await getClientesLogin()
    allFuncionarios = await getFuncionariosLogin()
    console.log(allFuncionarios);
    if(allClientes && allFuncionarios){
        telaCarregamento.classList.add('hidden')
    }
});

let visivel = false
document.getElementById('olho').addEventListener('click', function(){
    if(visivel){
        document.getElementById('senha').setAttribute('type', 'password')
        document.getElementById('olho').src = 'https://www.svgrepo.com/show/524041/eye-closed.svg'
        visivel = false
    } else {
        document.getElementById('senha').setAttribute('type', 'text')
        document.getElementById('olho').src = 'https://www.svgrepo.com/show/522847/eye.svg'
        visivel = true
    }
})


document.getElementById('logar').addEventListener('click', async function(){
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value
    
    console.log(allClientes);
    console.log(allFuncionarios);

    allClientes.forEach(client => {

        if(client.email == email && client.senha == senha){
            localStorage.setItem('idUsuarioLaika', client.id)
            window.location.href = './home.html'
        } else {    
            allFuncionarios.forEach(funcionario => {
                if(funcionario.email == email && funcionario.senha == senha){
                    if(funcionario.cargo != "Veterinário" && funcionario.cargo != "ADM" ){
                        window.location.href = "../administração (funcionário)/administração_funcionário.html"
                    } else if (funcionario.cargo == "Veterinário"){
                        alert('Veterinário')
                    } else if (funcionario.cargo == "ADM") {
                        alert('ADM')
                    }
                } else {
                    document.getElementById('errorMessage').classList.remove('hidden')
                    setTimeout(function() {
                        document.getElementById('errorMessage').classList.add('hidden');
                    }, 3000);
                }
            });
        }
    });
})