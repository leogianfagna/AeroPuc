function id(){
    let resultado = false;
    const id = document.getElementById("id").value;
    const ID = parseInt(id);
    if (ID > 0){
    resultado = true;
    }
    return resultado; 
}
function selecionouCidade(){
    let resultado = false; 
    var cidade = document.getElementById("cidade");
    var valorSelecionado = cidade.value;
    if (valorSelecionado !== "0"){
    resultado = true;
    }
    return resultado;
}
function preencheuNome(){
    let resultado = false;
    const nome = document.getElementById("Nome").value;
    if(nome.length > 0){
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
function alterarAeroporto(){
    if(!id()){
    showStatusMessage("Preencha o ID...",true);
    return;
    }

    if(!selecionouCidade()){
    showStatusMessage("Selecione a cidade...", true);  
    return;
    }

    if(!preencheuNome()){
    showStatusMessage("Preencha o nome...", true);
    return;
    }
}