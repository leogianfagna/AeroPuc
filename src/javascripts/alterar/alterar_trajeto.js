function id(){
    let resultado = false;
    const id = document.getElementById("id").value;
    const ID = parseInt(id);
    
    if (ID > 0) {
        resultado = true;
    }

    return resultado; 
}

function selecionouOrigem(){
    let resultado = false; 
    var origem = document.getElementById("cidadeOrigem");
    var valorSelecionado = origem.value;
    
    if (valorSelecionado !== "0") {
        resultado = true;
    }

    return resultado;
}

function selecionouDestino(){
    let resultado = false; 
    var destino = document.getElementById("cidadeDestino");
    var valorSelecionado = destino.value;
    
    if (valorSelecionado !== "0") {
        resultado = true;
    }

    return resultado;
}

function preencheuDuracao(){
    let resultado = false;
    const duracao = document.getElementById("duração").value;
    
    if (duracao.length > 0) {
        resultado = true;
    }

    return resultado;
}

function selecionouTipo(){
    let resultado = false; 
    var tipo = document.getElementById("tipo");
    var valorSelecionado = tipo.value;
    
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
    return fetch('http://localhost:3000/alterarTrajeto', requestOptions)
    .then(T => T.json()) // Mapeia a resposta para o formato JSON
}

function AlterarTrajeto(){
    if (!id()) {
        showStatusMessage("ID não foi preenchido.",true);
        return;
    }

    if (!selecionouOrigem()) {
        showStatusMessage("Origem não foi preenchida.", true);  
        return;
    }

    if (!selecionouDestino()) {
        showStatusMessage("Destino não foi preenchido.", true);
        return;
    }

    if (!preencheuDuracao()) {
        showStatusMessage("Duração da viagem não foi preenchida.", true);
        return;
    }

    if (!selecionouTipo()) {
        showStatusMessage("Tipo de passagem não foi preenchido.", true);
        return;
    }

    // obtem os dados inseridos no html
    const idInserido = document.getElementById("id").value;
    const origemInserida = document.getElementById("cidadeOrigem").value;
    const destinoInserido = document.getElementById("cidadeDestino").value;
    const duracaoInserida = document.getElementById("duração").value;
    const tipoCaminhoInserido = document.getElementById("tipo").value;

    // promise
    fetchAlterar({
        // lado esquerdo: as variaveis utilizadas devem ser as mesmas nos arquivos typescript
        idInserido: idInserido,
        origem: origemInserida, 
        destino: destinoInserido,
        duracao: duracaoInserida,
        tipo: tipoCaminhoInserido })

        // Obteve a resposta "resultado" e usa um método encadeado (=>) para executar a função callback
        .then(resultado => {

            if(resultado.status === "SUCCESS"){
                showStatusMessage("Trajeto alterado!", false);
            }else{
                showStatusMessage("Erro ao alterar trajeto...: " + message, true);
                console.log(resultado.message);
            }
        })

        // Nenhum parâmetro necessário, mas pode se usar "error" caso necessário
        .catch(()=>{
            showStatusMessage("Erro técnico ao alterar... Contate o suporte.", true);
            console.log("Falha grave ao alterar.")
        });
}




