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
    
    if (error === true) {
        pStatus.className = "text-danger"; // de acordo com o bootstrap
    } else {
        pStatus.className = "text-success";
    }

    pStatus.textContent = msg;
}
function excluir(){
    if(!ids()){
    showStatusMessage("ID deve ser preenchido.",true);
    return;
    }
}
function fetchInserir(body) {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };

    return fetch('http://localhost:3000/excluirMapa', requestOptions)
    .then(T => T.json())
  }
  const idInserido = document.getElementById("id").value;
  fetchInserir({
    id: idInserido})
    .then(resultado => {
        // obteve resposta, vamos simplesmente exibir como mensagem: 
        if(resultado.status === "SUCCESS"){
        showStatusMessage("Mapa de assnetos excluído!", false);
        }else{
        showStatusMessage("Erro ao excluir mapa de assentos...: " + message, true);
        console.log(resultado.message);
        }
    })
    .catch(()=>{
        showStatusMessage("Erro técnico ao excluir... Contate o suporte.", true);
        console.log("Falha grave ao excluir.")
    });

