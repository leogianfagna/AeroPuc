function preencheuId(){
    let resultado = false;
    const id = document.getElementById("id").value;
    const ID = parseInt(id);
    
    if (ID > 0) {
        resultado = true;
    }

    return resultado; 
}

function selecionouStatus(){
    let resultado = false; 
    var origem = document.getElementById("statusDoAssento");
    var valorSelecionado = origem.value;
    
    if (valorSelecionado !== "0") {
        resultado = true;
    }

    return resultado;
}

function showStatusMessage(msg, error){
    var pStatus = document.getElementById("status");
    
    if (error === true) {
        pStatus.className = "text-danger"; // de acordo com o bootstrap
    } else {
        pStatus.className = "text-success";
    }

    pStatus.textContent = msg;
}

// Função que realizar uma requisição HTTP do tipo POST usando API Fetch
function fetchAlterar(body) {

    // Define as opções para a requisição
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };

    // Realizar a requisição para o URL fornecido com as opções "requestOptions"
    return fetch('http://localhost:3000/alterarAssentoManualmente', requestOptions)
    .then(T => T.json()) // Mapeia a resposta para o formato JSON
}

function alterarStatusAssentoAdministrativo(){

    if (!preencheuId()) {
        showStatusMessage("ID não foi preenchido.",true);
        return;
    }

    if (!selecionouStatus()) {
        showStatusMessage("Novo status não foi selecionado.", true);  
        return;
    }

    // obtem os dados inseridos no html
    const idInserido = document.getElementById("id").value;
    const statusInserido = document.getElementById("statusDoAssento").value;

    // promise
    fetchAlterar({
        // lado esquerdo: as variaveis utilizadas devem ser as mesmas nos arquivos typescript
        id: idInserido,
        novoStatus: statusInserido })

        // Obteve a resposta "resultado" e usa um método encadeado (=>) para executar a função callback
        .then(resultado => {

            if(resultado.status === "SUCCESS") {
                showStatusMessage("Status do assento alterado!", false);
            } else {
                showStatusMessage("Erro ao alterar status do assento: " + message, true);
                console.log(resultado.message);
            }
        })

        // Nenhum parâmetro necessário, mas pode se usar "error" caso necessário
        .catch(()=>{
            showStatusMessage("Erro técnico ao alterar. Contate o suporte.", true);
            console.log("Falha grave ao alterar.")
        });
}




