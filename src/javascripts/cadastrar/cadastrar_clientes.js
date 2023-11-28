// funcoes de tratamento de dados recebidos
// Função para verificar se o campo de cidade foi preenchido.
function preencheuCidade(){
    let resultado = false;
    const cidadeInformada = document.getElementById("cidade").value;
    
    if (cidadeInformada.length > 0) {
        resultado = true;
    }
    
    return resultado;
}
// Função para verificar se o campo de estado foi preenchido.
function preencheuEstado(){
    let resultado = false;
    const estadoInformado = document.getElementById("estado").value;
    
    if (estadoInformado.length > 0) {
        resultado = true;
    }

    return resultado;
}
// Função para verificar se o campo de país foi preenchido.
function preencheuPais(){
    let resultado = false;
    const paisInformado = document.getElementById("pais").value;
    
    if (paisInformado.length > 0) {
        resultado = true;
    }

    return resultado;
}

// Função para exibir mensagens de status
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

    return fetch('http://localhost:3000/inserirCliente', requestOptions)
    .then(T => T.json())
}

// funcao para inserir o cliente
function inserirCliente(){
    /*
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
    } */

    // obtem os dados inseridos no html
    const nomeInserido = document.getElementById("nomeCliente").value;
    const emailInserido = document.getElementById("emailCliente").value;
    const assentoInserido = document.getElementById("assentoReservado").value;
    const vooInserido = document.getElementById("vooCliente").value;

    // promise
    fetchInserir({
        // lado esquerdo: as variaveis utilizadas devem ser as mesmas nos arquivos typescript
        nome: nomeInserido, 
        email: emailInserido, 
        assento: assentoInserido,
        voo: vooInserido
    }).then(resultado => {
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
}