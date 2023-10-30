// funcoes de tratamento de dados recebidos
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

    return fetch('http://localhost:3000/inserirTrajeto', requestOptions)
    .then(T => T.json())
}

// funcao para inserir um novo trajeto
function inserirTrajeto(){

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

    // obtem os dados inseridos no html
    const origemInserida = document.getElementById("aeroportoOrigem").value;
    const destinoInserido = document.getElementById("aeroportoDestino").value;
    const duracaoInserida = document.getElementById("duração").value;
    const tipoCaminhoInserido = document.getElementById("tipo").value;

    // promise
    fetchInserir({
        // lado esquerdo: as variaveis utilizadas devem ser as mesmas nos arquivos typescript
        origem: origemInserida, 
        destino: destinoInserido,
        duracao: duracaoInserida,
        tipo: tipoCaminhoInserido })
        .then(resultado => {
            // obteve resposta
            if(resultado.status === "SUCCESS"){
            showStatusMessage("Aeronave cadastrada... ", false);
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