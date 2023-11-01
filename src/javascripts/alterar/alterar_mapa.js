function id(){
    let resultado = false;
    const id = document.getElementById("id").value;
    const ID = parseInt(id);
    
    if (ID > 0) {
        resultado = true;
    }

    return resultado; 
}

function preencheuModelo(){
    let resultado = false;
    const modeloInformado = document.getElementById("modelo").value;
    
    if (modeloInformado.length > 0) {
        resultado = true;
    }

    return resultado;
}

function fileiras(){
    let resultado = false;
    const fileiras = document.getElementById("Fileiras").value;
    const Fileiras = parseInt(fileiras);
    
    if (Fileiras > 0) {
        resultado = true;
    }

    return resultado; 
}

function colunas(){
    let resultado = false;
    const colunas = document.getElementById("Colunas").value;
    const Colunas = parseInt(colunas);
    
    if (Colunas > 0) {
        resultado = true;
    }

    return resultado; 
}

function assentos(){
    let resultado = false;
    const assentos = document.getElementById("Assentos").value;
    const Assentos = parseInt(assentos);
    
    if (Assentos == Colunas * Fileiras) {
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
function AlterarMapa(){
    if (!id()) {
        showStatusMessage("Preencha o ID...",true);
        return;
    }

    if (!fileiras()) {
        showStatusMessage("Preencha as fileiras...", true);  
        return;
    }

    if (!preencheuModelo()) {
        showStatusMessage("Preencha o modelo...", true);
        return;
    }

    if (!colunas()) {
        showStatusMessage("Preencha as colunas...", true);
        return;
    }

    if (!assentos()) {
        showStatusMessage("Preencha o total de assentos...", true);
        return;
    }
}