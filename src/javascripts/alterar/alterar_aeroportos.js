function id(){
    let resultado = false;
    const id = document.getElementById("id").value;
    const ID = parseInt(id);
    
    if (ID > 0) {
        resultado = true;
    }

    return resultado; 
}

function selecionouCidade(){
    let resultado = false; 
    var cidade = document.getElementById("cidade").value;
    var id_cidade = parseInt(cidade);
    
    if (id_cidade > 0) {
        resultado = true;
    }

    return resultado; 
}

function preencheuNome(){
    let resultado = false;
    const nome = document.getElementById("aeroportoNome").value;
    
    if(nome.length > 0) {
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
    return fetch('http://localhost:3000/alterarAeroporto', requestOptions)
    .then(T => T.json()) // Mapeia a resposta para o formato JSON
}

function alterarAeroporto(){
    if (!id()) {
        showStatusMessage("ID não foi preenchido.",true);
        return;
    }

    if (!selecionouCidade()) {
        showStatusMessage("Cidade não foi preenchida.", true);  
        return;
    }

    if (!preencheuNome()) {
        showStatusMessage("Nome não foi preenchido.", true);
        return;
    }

    // obtem os dados inseridos no html
    const idInserido = document.getElementById("id").value;
    const cidadeInserida = document.getElementById("cidade").value;
    const nomeInserido = document.getElementById("aeroportoNome").value;

    // promise
    fetchAlterar({
        // lado esquerdo: as variaveis utilizadas devem ser as mesmas nos arquivos typescript
        idAeroporto: idInserido, 
        cidadeLocalizada: cidadeInserida,
        nomeAeroporto: nomeInserido })

    // Obteve a resposta "resultado" e usa um método encadeado (=>) para executar a função callback
    .then(resultado => {
        
        if(resultado.status === "SUCCESS") {
            showStatusMessage("Aeroporto alterado!", false);
        } else {
            showStatusMessage("Erro ao alterar aeroporto: " + resultado.message, true);
            console.log(resultado.message);
        }
    })
    
    // Nenhum parâmetro necessário, mas pode se usar "error" caso necessário
    .catch(()=>{
        showStatusMessage("Erro técnico ao alterar. Contate o suporte.", true);
        console.log("Falha grave ao alterar.");
    });
}