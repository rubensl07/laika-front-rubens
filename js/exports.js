const url = `https://laika-back.onrender.com`
const versao = "v1"
// const url = `http://localhost:8080/`

export async function getProdutos(filtro) {
    // const link = `${url}/${versao}/laika/produtos`
    let nomeSearch=''
    let valorMinSearch=''
    let valorMaxSearch =''
    let categoriaSearch = ''
    if(filtro.nome){
        nomeSearch=filtro.nome
    }
    if(filtro.valorMin){
        valorMinSearch=filtro.valorMin
    }
    if(filtro.valorMax){
        valorMaxSearch=filtro.valorMax
    }
    if(filtro.categoria){
        categoriaSearch=filtro.categoria
    }
    const link = `${url}/${versao}/laika/produtos?nome=${nomeSearch}&valorMin=${valorMinSearch}&valorMax=${valorMaxSearch}&categoria=${categoriaSearch}`
    console.log(link);
    const response=await fetch(link)
    const data=await response.json()
    
    return data.produtos
}
export async function getProduto(id) {
    const link =`${url}/${versao}/laika/produto/${id}`
    const response=await fetch(link)
    const data= await response.json()
    return data.dados
}
/*export async function getProdutoFiltro(filtro) {
    const link =`http://localhost:8080/V2/ACMEProdutos/Produtos/filtro?nome=${filtro}`
    const response=await fetch(link)
    const data= await response.json()
    return data.Produto
}

export async function postProduto(Produto) {
    const link=`http://localhost:8080/V2/ACMEProdutos/Produto`
    const options={
        method:`POST`,
        headers:{
            `Content-type`:`application/json`
        },
        body:JSON.stringify(Produto)
    }
    const response=await fetch(link,options)
    return response.ok
}

export async function putProduto(Produto,id) {
    const link=`http://localhost:8080/V2/ACMEProdutos/Produto/${id}`
    const options={
        method:`PUT`,
        headers:{
            `Content-type`:`application/json`
        },
        body:JSON.stringify(Produto)
    }
    console.log(Produto);
    const response=await fetch(link,options)
    console.log(response);
    console.log(response.ok);
    return response.ok
}
export async function deleteProduto(id) {
    const link=`http://localhost:8080/V2/ACMEProdutos/Produto/${id}`
    const options={
        method:`DELETE`
    }
    const response=await fetch(link,options)
    return response.ok
}*/
export async function getClientes() {
    const link = `${url}/${versao}/laika/clientes`
    const response=await fetch(link)
    const data=await response.json()
    
    return data.clientes
}
export async function getCliente(id) {
    const link =`${url}/${versao}/laika/cliente/${id}`
    
    const response=await fetch(link)
    const data= await response.json()    
    return data.dados
}
/*export async function getClienteFiltro(filtro) {
    const link =`http://localhost:8080/V2/ACMEClientes/Clientes/filtro?nome=${filtro}`
    const response=await fetch(link)
    const data= await response.json()
    return data.Cliente
}

export async function postCliente(Cliente) {
    const link=`http://localhost:8080/V2/ACMEClientes/Cliente`
    const options={
        method:`POST`,
        headers:{
            `Content-type`:`application/json`
        },
        body:JSON.stringify(Cliente)
    }
    const response=await fetch(link,options)
    return response.ok
}
*/
export async function putCliente(cliente,id) {
    const link=`${url}/${versao}/laika/cliente/${id}`
    const options={
        method:`PUT`,
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(cliente)
    }
    console.log(cliente);
    const response=await fetch(link,options)
    console.log(response);
    return response.ok
}
export async function deleteCliente(id) {
    const link=`${url}/${versao}/laika/cliente/${id}`
    const options={
        method:`DELETE`
    }
    const response=await fetch(link,options)
    return response.ok
}















export async function getAnimais() {
    const link = `${url}/${versao}/laika/animais`
    const response=await fetch(link)
    const data=await response.json()
    
    return data.animais
}
export async function getAnimal(id) {
    const link =`${url}/${versao}/laika/animal/${id}`
    
    const response=await fetch(link)
    const data= await response.json()    
    
    return data.dados
}

export async function postAnimal(animal) {
    const link=`${url}/${versao}/laika/animal`
    const options={
        method:`POST`,
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(animal)
    }
    const response=await fetch(link,options)
    return response.ok
}

export async function putAnimal(animal,id) {
        const link=`${url}/${versao}/laika/animal/${id}`
    const options={
        method:`PUT`,
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(animal)
    }
    console.log(animal);
    const response=await fetch(link,options)
    return response.ok

    
}
export async function deleteAnimal(id) {
    const link=`${url}/${versao}/laika/animal/${id}`
    const options={
        method:`DELETE`
    }
    const response=await fetch(link,options)
    return response.ok
}















export async function getaAgendamentos() {
    const link = `${url}/${versao}/laika/agendamentos`
    const response=await fetch(link)
    const data=await response.json()
    
    return data.Agendamentos
}
export async function getAgendamento(id) {
    const link =`${url}/${versao}/laika/agendamento/${id}`
    
    const response=await fetch(link)
    const data= await response.json()    
    
    return data.dados
}

export async function postAgendamento(Agendamento) {
    const link=`${url}/${versao}/laika/agendamento`
    const options={
        method:`POST`,
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(Agendamento)
    }
    const response=await fetch(link,options)
    return response.ok
}

export async function putAgendamento(Agendamento,id) {
    const link=`${url}/${versao}/laika/agendamento/${id}`
    const options={
        method:`PUT`,
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(Agendamento)
    }
    const response=await fetch(link,options)
    return response.ok
}
export async function deleteAgendamento(id) {
    const link=`${url}/${versao}/laika/agendamento/${id}`
    const options={
        method:`DELETE`
    }
    const response=await fetch(link,options)
    return response.ok
}
















export async function getTipos() {
        const link = `${url}/${versao}/laika/tipos`
        const response=await fetch(link)
        const data=await response.json()
        
        return data.dados


}
export async function getRaca(id) {
    
    const link =`${url}/${versao}/laika/racas/tipo/${id}`
    
    const response=await fetch(link)
    const data= await response.json()    

    return data.dados
}


export async function getPortes() {
    const link = `${url}/${versao}/laika/portes`
    const response=await fetch(link)
    const data=await response.json()
    
    return data.dados


}

export async function getCategorias() {
    const link = `${url}/${versao}/laika/categorias`
    const response=await fetch(link)
    const data=await response.json()
    return data.dados
}











export async function getAllServicos() {
    
    const endpoint = 'https://laika-back.onrender.com/v1/laika/servicos';
    const funcionariosApi = await fetch(endpoint);
    const listFuncionarios = await funcionariosApi.json();
    return listFuncionarios.servicos;
}

export async function getAllAnimals(){

    const endpoint = 'https://laika-back.onrender.com/v1/laika/animais';
    const funcionariosApi = await fetch(endpoint);
    const listFuncionarios = await funcionariosApi.json();
    console.log(listFuncionarios.dados);
    return listFuncionarios.dados;
}

export async function animalDataById(id){

    const endpoint = `https://laika-back.onrender.com/v1/laika/animal/${id}`;
    const funcionariosApi = await fetch(endpoint);
    const listFuncionarios = await funcionariosApi.json();
    console.log(listFuncionarios.dados);
    return listFuncionarios.dados;
}

async function postarNovoCliente(cliente){

    console.log('enviar');

    const endpoint = `${url}${versao}/laika/cliente`
    
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cliente),
    };

    try {
        const response = await fetch(endpoint, options);
        return response.ok;
      } catch (error) {
        console.error('Erro ao enviar cliente: ', error);
      }
}