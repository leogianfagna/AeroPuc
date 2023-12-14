// funcoes de tratamento de dados recebidos
// Função para validar se uma cidade foi selecionada
function selecionouCidade(){
    let resultado = false; 
    var cidade = document.getElementById("cidade").value;
    var id_cidade = parseInt(cidade);
    
    if (id_cidade > 0) {
        resultado = true;
    }

    return resultado; 
}
// Função para verificar se o campo de nome do aeroporto foi preenchido.
function preencheuNome(){
    let resultado = false;
    const nomeAeroporto = document.getElementById("aeroportoNome").value;
    
    if (nomeAeroporto.length > 0) {
        resultado = true;
    }
    
    return resultado;
}
// Função para exibir mensagens de status
function showStatusMessage(msg, error){
    var pStatus = document.getElementById("status");
    
    if (error === true){
        pStatus.className = "text-danger"; // de acordo com o bootstrap
    } else {
        pStatus.className = "text-success";
    }
    
    pStatus.textContent = msg;
}

// Função que realizar uma requisição HTTP do tipo PUT usando API Fetch
function fetchInserir(body) {

    // Define as opções para a requisição
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };

    // Realizar a requisição para o URL fornecido com as opções "requestOptions"
    return fetch('http://localhost:3000/inserirAeroporto', requestOptions)
    .then(T => T.json()) // Mapeia a resposta para o formato JSON
}

// Função principal para inserir um novo aeroporto, realizando validações antes do envio.
function inserirAeroporto(){

    // Validação de dados
    if(!selecionouCidade()){
        showStatusMessage("Cidade não selecionada.", true);  
        return;
    }

    if(!preencheuNome()){
        showStatusMessage("Nome do aeroporto deve ser preenchido.", true);
        return;
    }

    // obtem os dados inseridos no html
    const aeroportoInserido = document.getElementById("aeroportoNome").value;
    const cidadeInserida = document.getElementById("cidade").value;

    // Chamada da função fetchInserir para enviar os dados ao servidor
    // promise
    fetchInserir({
        // lado esquerdo: as variaveis utilizadas devem ser as mesmas nos arquivos typescript
        aeroporto: aeroportoInserido,
        cidade: cidadeInserida })
        .then(resultado => {
            // Verifica se a resposta foi bem-sucedida ou apresentou erro
            if(resultado.status === "SUCCESS"){
            showStatusMessage("Aeroporto cadastrado!", false);
            }else{
            showStatusMessage("Erro ao cadastrar...: " + message, true);
            console.log(resultado.message);
            }
        })
        .catch(()=>{
            showStatusMessage("Erro técnico ao cadastrar... Contate o suporte.", true);
            console.log("Falha grave ao cadastrar.")
        });
}