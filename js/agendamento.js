
'use strict'
import { getCliente, getClientes, deleteCliente, putCliente, getAnimal, deleteAnimal, getAnimais, postAnimal, putAnimal, getTipos, getRaca ,getPortes} from './exports.js'

// const idPerfil = 2

const idPerfil = localStorage.getItem('idUsuario')
if (!idPerfil) {
  window.location.href = '../index.html'
}



document.addEventListener("DOMContentLoaded", async function () {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = today.getMonth(); // Note que aqui pegamos o mês como um índice (0 a 11)
    const yyyy = today.getFullYear();
    
    const mesCalendario = document.getElementById('mesCalendario');
    const nomesMeses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    mesCalendario.textContent = nomesMeses[mm]; // Define o nome do mês

    const cliente = await getCliente(idPerfil);

    const daysInMonth = new Date(yyyy, mm + 1, 0).getDate(); // +1 porque Date usa 0-11 para meses
    const calendar = document.getElementById('calendar');
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day rounded-lg bg-gray-200';
        dayElement.innerHTML = day;
        calendar.appendChild(dayElement);
    }

    // Verifica se há agendamentos
    let agendamentos = cliente.agendamentos;

    try {
        if (!agendamentos || agendamentos.length === 0) {
            throw new Error("Você não tem nenhum agendamento este mês");
        }

        agendamentos.forEach(agendamento => {
            const diaAgendamento = agendamento.data_agendamento.substring(8, 10);
            let servicoString = 'Serviço: ';
            let nomePet = 'Pet: ';
            const arrayServicos = agendamento.servicos;

            arrayServicos.forEach(element => {
                servicoString += element.nome + ', ';
                nomePet += agendamento.animal.nome;
                console.log(nomePet);
            });

            let json = {
                diaId: diaAgendamento,
                servicos: servicoString.slice(0, servicoString.length - 2),
                pet: nomePet
            };

            const dayElement = calendar.children[json.diaId - 1];
            console.log(json);
            console.log(dayElement);

            dayElement.classList.add('has-appointment');
            dayElement.addEventListener('click', () => {
                const infoAgendamentoServico = document.getElementById('agendamento_servico');
                const infoAgendamentoPet = document.getElementById('agendamento_pet');
                infoAgendamentoServico.textContent = json.servicos;
                infoAgendamentoPet.textContent = json.pet;
                document.getElementById('appointment-details').classList.remove('hidden');
            });
        });
    } catch (error) {
        alert(error.message); // Exibe uma mensagem de alerta para o usuário
    }

    document.getElementById('close-button').addEventListener('click', () => {
        document.getElementById('appointment-details').classList.add('hidden');
    });
});

document.addEventListener("DOMContentLoaded", async function () {
    const cliente=await getCliente(idPerfil)

    // { 2: 'Consulta Médica às 10h', 12: 'Reunião de Trabalho às 14h', 20: 'Dentista às 16h', 22: 'Ginástica às 18h' };
  // Verifica se há agendamentos
let agendamentos = cliente.agendamentos;

// try {
    // if (!agendamentos || agendamentos.length === 0) {
    //     throw new Error("Você não tem nenhum agendamento este mês");
    // }

    agendamentos.forEach(agendamento => {
        const diaAgendamento = agendamento.data_agendamento.substring(8, 10);
        let servicoString = 'Serviço: ';
        let nomePet = 'Pet: ';
        const arrayServicos = agendamento.servicos;

        arrayServicos.forEach(element => {
            servicoString += element.nome + ', ';
            nomePet += agendamento.animal.nome;
            console.log(nomePet);
        });

        let json = {
            diaId: diaAgendamento,
            servicos: servicoString.slice(0, servicoString.length - 2),
            pet: nomePet
        };

        const dayElement = calendar.children[json.diaId - 1];
        console.log(json);
        console.log(dayElement);

        dayElement.classList.add('has-appointment');
        dayElement.addEventListener('click', () => {
            const infoAgendamentoServico = document.getElementById('agendamento_servico');
            const infoAgendamentoPet = document.getElementById('agendamento_pet');
            infoAgendamentoServico.textContent = json.servicos;
            infoAgendamentoPet.textContent = json.pet;
            document.getElementById('appointment-details').classList.remove('hidden');
        });
    });
// } catch (error) {
//     console.error(error.message);
//     alert(error.message); // Exibe uma mensagem de alerta para o usuário
// }

document.getElementById('close-button').addEventListener('click', () => {
    document.getElementById('appointment-details').classList.add('hidden');
});
})
async function preencherContainer() {
    const info = await getCliente(idPerfil)
    console.log(info);
    document.getElementById('nomeUser').textContent = info.nome
}
preencherContainer()

