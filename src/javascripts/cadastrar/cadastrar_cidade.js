// funcoes de tratamento de dados recebidos
function preencheuCidade(){
    let resultado = false;
    const cidadeInformada = document.getElementById("cidade").value;
    
    if (cidadeInformada.length > 0) {
        resultado = true;
    }
    
    return resultado;
}

function preencheuEstado(){
    let resultado = false;
    const estadoInformado = document.getElementById("estado").value;
    
    if (estadoInformado.length > 0) {
        resultado = true;
    }

    return resultado;
}

function preencheuPais(){
    let resultado = false;
    const paisInformado = document.getElementById("pais").value;
    
    if (paisInformado.length > 0) {
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

    return fetch('http://localhost:3000/inserirCidade', requestOptions)
    .then(T => T.json())
}

// funcao para inserir uma nova cidade
function inserirCidade(){
    if(!preencheuCidade()){
        showStatusMessage("Cidade não preenchida.", true);  
        return;
    }

    if(!preencheuEstado()){
        showStatusMessage("Estado não preenchido.", true);
        return;
    }

    if(!preencheuPais()){
        showStatusMessage("País não preenchido.", true);
        return;
    }

    // obtem os dados inseridos no html
    const cidadeInserida = document.getElementById("cidade").value;
    const estadoInserido = document.getElementById("estado").value;
    const paisInserido = document.getElementById("pais").value;

    // promise
    fetchInserir({
        // lado esquerdo: as variaveis utilizadas devem ser as mesmas nos arquivos typescript
        cidade: cidadeInserida, 
        estado: estadoInserido, 
        pais: paisInserido })
        .then(resultado => {
            // obteve resposta
            if(resultado.status === "SUCCESS"){
            showStatusMessage("Cidade cadastrada!", false);
            }else{
            showStatusMessage("Erro ao cadastrar cidade...: " + message, true);
            console.log(resultado.message);
            }
        })
        .catch(()=>{
            showStatusMessage("Erro técnico ao cadastrar... Contate o suporte.", true);
            console.log("Falha grave ao cadastrar.")
        });

        // uma possivel melhoria: se tenta inserir uma cidade que ja existe da erro, pela unicidade
        // tentar personalizar essa mensagem
}