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

function fetchInserir(body) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };

    return fetch('http://localhost:3000/alterarAssentoManualmente', requestOptions)
    .then(T => T.json())
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
    fetchInserir({
        // lado esquerdo: as variaveis utilizadas devem ser as mesmas nos arquivos typescript
        id: idInserido,
        novoStatus: statusInserido })
        .then(resultado => {
            // obteve resposta
            if(resultado.status === "SUCCESS") {
                showStatusMessage("Status do assento alterado!", false);
            } else {
                showStatusMessage("Erro ao alterar status do assento: " + message, true);
                console.log(resultado.message);
            }
        })
        .catch(()=>{
            showStatusMessage("Erro técnico ao alterar. Contate o suporte.", true);
            console.log("Falha grave ao alterar.")
        });
}




