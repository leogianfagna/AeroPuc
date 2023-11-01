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
    var origem = document.getElementById("aeroportoOrigem");
    var valorSelecionado = origem.value;
    
    if (valorSelecionado !== "0") {
        resultado = true;
    }

    return resultado;
}

function selecionouDestino(){
    let resultado = false; 
    var destino = document.getElementById("aeroportoDestino");
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
}