'use strict'
import { getCliente, getClientes, deleteCliente, putCliente, getAnimal, deleteAnimal, getAnimais, postAnimal, putAnimal, getTipos, getRaca ,getPortes,getAllAnimals,getAllServicos,animalDataById} from './exports.js'


getAllAnimals()

async function makeSelectSevicos(){

    const listaServicos = await getAllServicos()

listaServicos.forEach(element => {
    console.log(element);
    const servicoCheck = document.createElement('div')
    servicoCheck.classList.add('w-full','space-x-2','flex','justify-center','items-center','flex','flex-row','p-0')
    const input = document.createElement('input')
    input.setAttribute('type','checkbox')
    input.classList.add('h-1/2','w-1/6')
    input.value = element.id
    const nome = document.createElement('span')
    // nome.textContent = element
    nome.classList.add('text-xl')
    nome.textContent = element.nome
    servicoCheck.replaceChildren(input,nome)
    document.getElementById('servicos').appendChild(servicoCheck)
});

}

async function makeSelectAnimals(){
 
    const listaAnimais = await getAllAnimals()

    listaAnimais.forEach(animal => {


        console.log(animal);

        const animalOpção = document.createElement('option')
        animalOpção.textContent = animal.nome
        animalOpção.value = animal.id

        document.getElementById('petSelect').appendChild(animalOpção)
    });
}

function GetdataAnimalSelected() {
    var select = document.getElementById("petSelect");
    var selectedValue = select.options[select.selectedIndex].value;
    console.log("Valor selecionado: " + selectedValue);

    makeAnimalSelected(selectedValue)
}

async function makeAnimalSelected(id){

    const dadosAnimal = await animalDataById(id)

    console.log('dadosAnimal: ' + dadosAnimal.img);

    document.getElementById('imgAnimal').src = dadosAnimal.img
    document.getElementById('nomeAnimal').textContent = dadosAnimal.nome
}

document.addEventListener("click", function(event) {
    var select = document.getElementById("petSelect");
    var parentDiv = document.querySelector(".relative");
    var isClickInside = parentDiv.contains(event.target);
    if (!isClickInside && !select.classList.contains("hidden")) {
        select.classList.add("hidden");
    }
});

makeSelectSevicos()
makeSelectAnimals()

function toggleSelectPet() {
    var select = document.getElementById("petSelect");
    if (select.classList.contains("hidden")) {
        select.classList.remove("hidden");
    } else {
        select.classList.add("hidden");
    }
}

function toggleSelectPet() {
    var select = document.getElementById("petSelect");
    if (select.classList.contains("hidden")) {
        select.classList.remove("hidden");
    } else {
        select.classList.add("hidden");
    }
}