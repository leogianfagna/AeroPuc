function ids(){
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
function fetchInserir(body) {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };

    return fetch('http://localhost:3000/excluirAeroporto', requestOptions)
    .then(T => T.json())
  }
function excluir(){
    if(!ids()){
    showStatusMessage("Preencha o ID...",true);
    return;
    }
  const idInserido = document.getElementById("id").value;
  fetchInserir({
    id: idInserido})
    .then(resultado => {
        // obteve resposta, vamos simplesmente exibir como mensagem: 
        if(resultado.status === "SUCCESS"){
        showStatusMessage("Aeroporto excluido... ", false);
        }else{
        showStatusMessage("Erro ao excluir aeroporto...: " + message, true);
        console.log(resultado.message);
        }
    })
    .catch(()=>{
        showStatusMessage("Erro técnico ao excluir... Contate o suporte.", true);
        console.log("Falha grave ao excluir.")
    });
}
