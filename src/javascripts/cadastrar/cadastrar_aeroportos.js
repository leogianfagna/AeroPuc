// funcoes de tratamento de dados recebidos
function selecionouCidade(){
    let resultado = false; 
    var cidade = document.getElementById("cidade").value;
    var id_cidade = parseInt(cidade);
    
    if (id_cidade > 0) {
        resultado = true;
    }

    return resultado; 
}
function preencheuNome(){
    let resultado = false;
    const nomeAeroporto = document.getElementById("aeroportoNome").value;
    
    if (nomeAeroporto.length > 0) {
        resultado = true;
    }
    
    return resultado;
}

function showStatusMessage(msg, error){
    var pStatus = document.getElementById("status");
    
    if (error === true){
        pStatus.className = "text-danger"; // de acordo com o bootstrap
    } else {
        pStatus.className = "text-success";
    }
    
    pStatus.textContent = msg;
}

// funcao fetch tipo PUT
function fetchInserir(body) {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };

    return fetch('http://localhost:3000/inserirAeroporto', requestOptions)
    .then(T => T.json())
}

// funcao para inserir os dados
function inserirAeroporto(){

    if(!selecionouCidade()){
        showStatusMessage("Cidade não selecionada.", true);  
        return;
    }

    if(!preencheuNome()){
        showStatusMessage("Nome do aeroporto deve ser preenchido.", true);
        return;
    }

    // obtem os dados inseridos no html
    const aeroportoInserido = document.getElementById("aeroportoNome").value;
    const cidadeInserida = document.getElementById("cidade").value;

    // promise
    fetchInserir({
        // lado esquerdo: as variaveis utilizadas devem ser as mesmas nos arquivos typescript
        aeroporto: aeroportoInserido,
        cidade: cidadeInserida })
        .then(resultado => {
            // obteve resposta
            if(resultado.status === "SUCCESS"){
            showStatusMessage("Aeroporto cadastrado!", false);
            }else{
            showStatusMessage("Erro ao cadastrar...: " + message, true);
            console.log(resultado.message);
            }
        })
        .catch(()=>{
            showStatusMessage("Erro técnico ao cadastrar... Contate o suporte.", true);
            console.log("Falha grave ao cadastrar.")
        });

        // uma possivel melhoria: se tenta inserir um modelo que ja existe da erro, pela unicidade
        // tentar personalizar essa mensagem
}