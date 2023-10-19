// Função Aeronave
function id(){
    let resultado = false;
    const id = document.getElementById("id").value;
    const ID = parseInt(id);
    if (ID > 0){
    resultado = true;
    }
    return resultado; 
}
function anoValido(){
    let resultado = false;
    var strAno = document.getElementById("anoFabricacao").value;
    const ano = parseInt(strAno);
    console.log("Ano aeronave: " + ano.toString());
    if (ano >= 2000 && ano <= 2025){
    resultado = true;
    }
    return resultado; 
}
function totalAssentosValido(){
    let resultado = false;
    const strAssentos = document.getElementById("qtdeAssentos").value;
    const assentos = parseInt(strAssentos);
    if (assentos > 0){
    resultado = true;
    }
    return resultado; 
}
function selecionouFabricante(){
    let resultado = false; 
    var listaFabricantes = document.getElementById("fabricantesCombo");
    var valorSelecionado = listaFabricantes.value;
    if (valorSelecionado !== "0"){
    resultado = true;
    }
    return resultado;
}
function preencheuModelo(){
    let resultado = false;
    const modeloInformado = document.getElementById("modelo").value;
    if(modeloInformado.length > 0){
    resultado = true;
    }
    return resultado;
}
function preencheuRegistro(){
    let resultado = false;
    const registroReferencia = document.getElementById("referencia").value;
    if(registroReferencia.length > 0){
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

function alterarAeronave(){
    if(!id()){
    showStatusMessage("Preencha o ID...",true);
    return;
    }

    if(!selecionouFabricante()){
    showStatusMessage("Selecione o fabricante...", true);  
    return;
    }

    if(!preencheuModelo()){
    showStatusMessage("Preencha o modelo...", true);
    return;
    }

    if(!preencheuRegistro()){
    showStatusMessage("Preencha o registro da aeronave...", true);
    return;
    }

    if(!anoValido()){
    showStatusMessage("Ano deve de 2000 até 2025...", true);
    return;
    }

    if(!totalAssentosValido()){
    showStatusMessage("Preencha corretamente o total de assentos.", true);
    return;
    }
}
