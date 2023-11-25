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
    var cidade = document.getElementById("cidade");
    var valorSelecionado = cidade.value;
    
    if (valorSelecionado !== "0") {
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

// funcao fetch tipo POST
function fetchAlterar(body) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };

    return fetch('http://localhost:3000/alterarAeroporto', requestOptions)
    .then(T => T.json())
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

    .then(resultado => {
        
        // obteve resposta
        if(resultado.status === "SUCCESS") {
            showStatusMessage("Aeroporto alterado!", false);
        } else {
            showStatusMessage("Erro ao alterar aeroporto: " + resultado.message, true);
            console.log(resultado.message);
        }
    })
    
    .catch(()=>{
        showStatusMessage("Erro técnico ao alterar. Contate o suporte.", true);
        console.log("Falha grave ao alterar.");
    });
}