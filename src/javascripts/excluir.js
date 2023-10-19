function id(){
    let resultado = false;
    const id = document.getElementById("id").value;
    const ID = parseInt(id);
    if (ID > 0){
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
function excluir(){
    if(!id()){
    showStatusMessage("Preencha o ID...",true);
    return;
    }
}