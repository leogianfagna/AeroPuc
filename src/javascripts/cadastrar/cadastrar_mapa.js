// funcoes de tratamento de dados recebidos
function preencheuModelo(){
    let resultado = false;
    const modeloInformado = document.getElementById("modelo").value;
    
    if(modeloInformado.length > 0){
        resultado = true;
    }

    return resultado;
}

function fileiras(){
    let resultado = false;
    const fileiras = document.getElementById("Fileiras").value;
    const Fileiras = parseInt(fileiras);
    
    if (Fileiras > 0){
        resultado = true;
    }

    return resultado; 
}

function colunas(){
    let resultado = false;
    const colunas = document.getElementById("Colunas").value;
    const Colunas = parseInt(colunas);
    
    if (Colunas > 0){
        resultado = true;
    }

    return resultado; 
}

function assentos(){
    let resultado = false;
    const assentos = document.getElementById("Assentos").value;
    const Assentos = parseInt(assentos);
    
    if (Assentos == Colunas * Fileiras){
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

    return fetch('http://localhost:3000/inserirMapa', requestOptions)
    .then(T => T.json())
}

// funcao para inserir um novo mapa de assentos
function inserirMapa(){

    if(!fileiras()){
        showStatusMessage("Preencha as fileiras...", true);  
        return;
    }

    if(!preencheuModelo()){
        showStatusMessage("Preencha o modelo...", true);
        return;
    }

    if(!colunas()){
        showStatusMessage("Preencha as colunas...", true);
        return;
    }

    if(!assentos()){
        showStatusMessage("Preencha o total de assentos...", true);
        return;
    }

    // obtem os dados inseridos no html
    const quantidadeFileirasInserida = document.getElementById("Fileiras").value;
    const quantidadeColunasInserida = document.getElementById("Colunas").value;
    const quantidadeAssentosInserido = document.getElementById("Assentos").value;
    const modeloAeronaveInserido = document.getElementById("modelo").value;

    // promise
    fetchInserir({
        // lado esquerdo: as variaveis utilizadas devem ser as mesmas nos arquivos typescript
        fileira: quantidadeFileirasInserida, 
        colunas: quantidadeColunasInserida, 
        total_assentos: quantidadeAssentosInserido,
        aeronave: modeloAeronaveInserido })
        .then(resultado => {
            // obteve resposta
            if(resultado.status === "SUCCESS"){
            showStatusMessage("Aeronave cadastrada!", false);
            }else{
            showStatusMessage("Erro ao cadastrar aeronave...: " + message, true);
            console.log(resultado.message);
            }
        })
        .catch(()=>{
            showStatusMessage("Erro técnico ao cadastrar... Contate o suporte.", true);
            console.log("Falha grave ao cadastrar.")
        });
}