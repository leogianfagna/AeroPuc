function id(){
    let resultado = false;
    const id = document.getElementById("id").value;
    const ID = parseInt(id);
    if (ID > 0){
    resultado = true;
    }
    return resultado; 
}
function selecionouOrigem(){
    let resultado = false; 
    var origem = document.getElementById("aeroportoOrigem");
    var valorSelecionado = origem.value;
    if (valorSelecionado !== "0"){
    resultado = true;
    }
    return resultado;
}
function selecionouDestino(){
    let resultado = false; 
    var destino = document.getElementById("aeroportoDestino");
    var valorSelecionado = destino.value;
    if (valorSelecionado !== "0"){
    resultado = true;
    }
    return resultado;
}
function preencheuDuracao(){
    let resultado = false;
    const duracao = document.getElementById("duração").value;
    if(duracao.length > 0){
    resultado = true;
    }
    return resultado;
}
function selecionouTipo(){
    let resultado = false; 
    var tipo = document.getElementById("tipo");
    var valorSelecionado = tipo.value;
    if (valorSelecionado !== "0"){
    resultado = true;
    }
    return resultado;
}
function showStatusMessage(msg, error){
    var pStatus = document.getElementById("status");
    if (error === true){
    pStatus.className = "statusError";
    }else{
    pStatus.className = "statusSuccess";
    }
    pStatus.textContent = msg;
}
function AlterarTrajeto(){
    if(!id()){
    showStatusMessage("Preencha o ID...",true);
    return;
    }

    if(!selecionouOrigem()){
    showStatusMessage("Selecione a origem...", true);  
    return;
    }

    if(!selecionouDestino()){
    showStatusMessage("Selecione o destino...", true);
    return;
    }

    if(!preencheuDuracao()){
    showStatusMessage("Preencha a duração...", true);
    return;
    }

    if(!selecionouTipo()){
    showStatusMessage("Selecione o tipo...", true);
    return;
    }
}