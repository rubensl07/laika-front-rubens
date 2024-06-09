'use strict'
import { getCliente, getClientes, deleteCliente, putCliente, deleteAnimal, getAnimais, postAnimal, putAnimal, getTipos, getRaca ,getPortes,getAllServicos,getAnimal, getFuncionarios, postAgendamento} from './exports.js'

const idPerfil=2
// const idPerfil = localStorage.getItem('idUsuario')
if (!idPerfil) {
  window.location.href = '../index.html'
}

async function makeSelectSevicos(){
    const listaServicos = await getAllServicos()
listaServicos.forEach(element => {
    const servicoCheck = document.createElement('div')
    servicoCheck.id='divCheckbox'
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
 
    const cliente = await getCliente(idPerfil)
    const listaAnimais=cliente.animais
    listaAnimais.forEach(animal => {

        const animalOpção = document.createElement('option')
        animalOpção.textContent = animal.nome
        animalOpção.value = animal.id

        let select = document.getElementById('petSelect')
        select.appendChild(animalOpção)
        select.addEventListener('focusout',getDataAnimalSelected)
        });
        
}

// async function makeSelectFuncionarios(){
 
//     const funcionarios = await getFuncionarios()
//     console.log(funcionarios);
//     funcionarios.forEach(funcionario => {

//         const funcionarioOpção = document.createElement('option')
//         funcionarioOpção.textContent = funcionario.nome
//         funcionarioOpção.value = funcionario.id

//         let select = document.getElementById('petSelect')
//         select.appendChild(funcionarioOpção)
//         console.log(select);
//         // select.addEventListener('focusout',getDatafuncionarioSelected)
//         });
        
// }
// makeSelectFuncionarios()





const employees = await getFuncionarios()

const dropdown = document.getElementById('dropdown');
        const dropdownContent = document.getElementById('dropdown-content');
        const selectedEmployeesContainer = document.getElementById('.selected-employees');
        dropdown.addEventListener('click', () => {
            dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
        });
        let servicoString = '';
        employees.forEach(employee => {
            let employeeCargos=employee.cargos
            if (employeeCargos) {
                employeeCargos.forEach(cargo=>{
                    servicoString+=cargo.nome+', '
                })
            } else {
                servicoString='Sem cargo atribuido'
            }
            const employeeDiv = document.createElement('div');
            employeeDiv.classList.add('employee');
            employeeDiv.id = employee.id;
            const cargos=servicoString.slice(0, servicoString.length - 2)
            let img='../img/perfilSemFoto.jpg'
            if (employee.img) {
                    img=employee.img
                }
                employeeDiv.innerHTML = `<img src="${img}" alt="${employee.nome}"><div class="name">${employee.nome} - ${cargos}</div>`;
            dropdownContent.appendChild(employeeDiv);
            
            employeeDiv.addEventListener('click', () => {
                addEmployeeToSelection(employee);
                employeeDiv.classList.toggle('selected')
            });
        });

        function addEmployeeToSelection(employee) {
            const existingSelectedEmployee = document.querySelector(`.selected-employees .employee[id="${employee.id}"]`);
            if (!existingSelectedEmployee) {
                const selectedEmployeeDiv = document.createElement('div');
                selectedEmployeeDiv.classList.add('employee', 'flex', 'items-center', 'p-2', 'border', 'border-gray-200', 'bg-white');
                selectedEmployeeDiv.id = employee.id;
                let img='../img/perfilSemFoto.jpg'
                if (employee.img) {
                    img=employee.img
                }
                selectedEmployeeDiv.innerHTML = `<img src="${img}" alt="${employee.nome}" class="w-8 h-8 rounded-full mr-3"><div class="name">${employee.nome}</div>`;
                selectedEmployeesContainer.appendChild(selectedEmployeeDiv);

                selectedEmployeeDiv.addEventListener('click', () => {
                    selectedEmployeesContainer.removeChild(selectedEmployeeDiv);
                });
            } else {
                selectedEmployeesContainer.removeChild(existingSelectedEmployee);
            }
           
        }

        window.addEventListener('click', (event) => {
            if (!dropdown.contains(event.target) && !dropdownContent.contains(event.target)) {
                dropdownContent.style.display = 'none';
            }
        });











async function getDataAnimalSelected() {
    
    let select = document.getElementById("petSelect");

    let selectedValue = select.options[select.selectedIndex].value;

    await makeAnimalSelected(selectedValue)
}

async function makeAnimalSelected(id){

    const dadosAnimal = await getAnimal(id)

    document.getElementById('imgAnimal').src = dadosAnimal.img
    document.getElementById('nomeAnimal').textContent = dadosAnimal.nome
}



// function toggleSelectPet() {
//     let select = document.getElementById("petSelect");
//     if (select.classList.contains("hidden")) {
//         select.classList.remove("hidden");
//     } else {
//         select.classList.add("hidden");
//     }
// }

makeSelectSevicos()
makeSelectAnimals()


const dataAgendamento=document.getElementById('dataAgendamento')
dataAgendamento.addEventListener('focusout',verificarDiaAgendamento)

function verificarDiaAgendamento() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    if (dataAgendamento.value.substring(8,10)<dd+1) {
        alert('Não é possivel fazer agendamento para um dia que já passou ou para o mesmo dia em que o agendamento foi feito, verifique a data escolhida')
    }
    else{
        dataAgendamento.removeEventListener('focusout',verificarDiaAgendamento)
        return dataAgendamento
    }
}


const btn_agendar=document.getElementById('btn_agendar')
btn_agendar.addEventListener('click',async ()=>{
    const dataAgendamento=document.getElementById('dataAgendamento').value

        let select = document.getElementById("petSelect");
        

        var divSelecionados = document.getElementById("divSelecionados");
        var selecionados = divSelecionados.getElementsByTagName("div");
        let arrayDivFuncionarios=[]
        
        for (var i = 0; i < selecionados.length; i++) {
            var id = selecionados[i].getAttribute("id");
            if (id) { // Verifica se o elemento possui um ID
                arrayDivFuncionarios.push(Number(id));
            }
            // console.log(selecionados);
            // arrayDivFuncionarios.push(Number(selecionados[i].value))
    }
    console.log(arrayDivFuncionarios);

    let selectedValue = select.options[select.selectedIndex].value;

        var div = document.getElementById("servicos");
        var checkboxes = div.getElementsByTagName("input");
        let arrayCheckboxServicos=[]
        
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].type == "checkbox") {
                if (checkboxes[i].checked) {
                    console.log(checkboxes[i]);
                    arrayCheckboxServicos.push(Number(checkboxes[i].value))
                } else {
                }
            }
        
    }
    console.log(arrayCheckboxServicos);
    if (dataAgendamento==null|| dataAgendamento==undefined|| dataAgendamento==''|| selectedValue==null|| selectedValue==undefined||selectedValue==''||arrayCheckboxServicos==undefined||arrayCheckboxServicos==null||arrayCheckboxServicos==''||arrayDivFuncionarios==null||arrayDivFuncionarios==undefined||arrayDivFuncionarios=='') {
        alert('verifique os campos')
    } else {
        
        const novoAgendamentoJSON = {
            data_agendamento: dataAgendamento,
            animal_id: Number(selectedValue),
            servicos: arrayCheckboxServicos,
    funcionarios:arrayDivFuncionarios
        }
    
        console.log(novoAgendamentoJSON);
    
        const retornoApi= await postAgendamento(novoAgendamentoJSON)
    if (retornoApi) {
        alert('Agendado com sucesso')
        window.location.href='./agendamentos.html'
    } else {
        alert('Não foi possivel realizar agendamento, verifique as informações')
    }
    }



    


})
