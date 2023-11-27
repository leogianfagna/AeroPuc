// Função para verificar se o ID do item a ser excluído foi preenchido
function ids(){
    let resultado = false;
    const id = document.getElementById("id").value;
    
    if (parseInt(id) > 0) {
      resultado = true;
    }

    return resultado; 
}

// Função que é utilizada para as mensagens ao usuário, através do elemento com o ID "status"
// utilizando o padrão (classe) bootstrap
function showStatusMessage(msg, error){
    var pStatus = document.getElementById("status");
    
    if (error === true) {
      pStatus.className = "text-danger"; // de acordo com o bootstrap
    } else {
      pStatus.className = "text-success";
    }

    pStatus.textContent = msg;
}

// Função FETCH do tipo DELETAR que será usada para apagar uma linha da tabela
function fetchDeletar(body) {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };

    return fetch('http://localhost:3000/excluirAeroporto', requestOptions)
    .then(T => T.json())
}

// Função para excluir um aeroporto da tabela
function excluir(){
    
    if (!ids()) {
        showStatusMessage("ID deve ser preenchido.",true);
        return;
    }
    
    const idInserido = document.getElementById("id").value;
    fetchDeletar({
        id: idInserido})
        
    .then(resultado => {
        
        // obteve resposta, vamos simplesmente exibir como mensagem: 
        if (resultado.status === "SUCCESS") {
            showStatusMessage("Aeroporto excluido!", false);
        } else {
            showStatusMessage("Erro ao excluir aeroporto: " + message, true);
            console.log(resultado.message);
        }
    })

    .catch(()=>{
        showStatusMessage("Erro técnico ao excluir. Contate o suporte.", true);
        console.log("Falha grave ao excluir.")
    });
}
