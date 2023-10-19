function id(){
    let resultado = false;
    const id = document.getElementById("id").value;
    const ID = parseInt(id);
    if (ID > 0){
    resultado = true;
    }
    return resultado; 
}
function selecionouTrajeto(){
    let resultado = false; 
    var trajeto = document.getElementById("trajeto");
    var valorSelecionado = trajeto.value;
    if (valorSelecionado !== "0"){
    resultado = true;
    }
    return resultado;
}
function selecionouAeronave(){
    let resultado = false; 
    var aeronave = document.getElementById("aeronave");
    var valorSelecionado = aeronave.value;
    if (valorSelecionado !== "0"){
    resultado = true;
    }
    return resultado;
}
function preencheuData(){
    let resultado = false;
    const data = document.getElementById("data").value;
    if(data.length > 0){
    resultado = true;
    }
    return resultado;
}
function preencheuIda(){
    let resultado = false;
    const ida = document.getElementById("horarioIda").value;
    if(ida.length > 0){
    resultado = true;
    }
    return resultado;
}
function preencheuChegada(){
    let resultado = false;
    const chegada = document.getElementById("horarioChegada").value;
    if(chegada.length > 0){
    resultado = true;
    }
    return resultado;
}
function preencheuValor(){
    let resultado = false;
    const valor = document.getElementById("valor").value;
    if(valor.length > 0){
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
function AlterarVoo(){
    if(!id()){
    showStatusMessage("Preencha o ID...",true);
    return;
    }

    if(!selecionouTrajeto()){
    showStatusMessage("Selecione o trajeto...", true);  
    return;
    }

    if(!selecionouAeronave()){
    showStatusMessage("Selecione a aeronave...", true);
    return;
    }

    if(!preencheuValor()){
    showStatusMessage("Preencha o valor...", true);
    return;
    }

    if(!preencheuChegada()){
    showStatusMessage("Preencha o horário de chegada...", true);
    return;
    }

    if(!preencheuIda()){
    showStatusMessage("Preencha o horário de Ida.", true);
    return;
    }

    if(!preencheuData()){
    showStatusMessage("Preencha a data.", true);
    return;
    }
}
