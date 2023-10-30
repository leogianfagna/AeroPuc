// funcoes de tratamento de dados recebidos
function anoValido(){
    let resultado = false;
    var strAno = document.getElementById("anoFabricacao").value;
    const ano = parseInt(strAno);
    console.log("Ano aeronave: " + ano.toString());
    
    if (ano >= 2000 && ano <= 2025) {
        resultado = true;
    }

    return resultado; 
}

function totalAssentosValido(){
    let resultado = false;
    const strAssentos = document.getElementById("qtdeAssentos").value;
    const assentos = parseInt(strAssentos);
    
    if (assentos > 0) {
        resultado = true;
    }

    return resultado; 
}

function selecionouFabricante(){
    let resultado = false; 
    var listaFabricantes = document.getElementById("fabricantesCombo");
    var valorSelecionado = listaFabricantes.value;
    
    if (valorSelecionado !== "-1") {
        resultado = true;
    }

    return resultado;
}

function preencheuModelo(){
    let resultado = false;
    const modeloInformado = document.getElementById("modelo").value;
    
    if (modeloInformado.length > 0) {
        resultado = true;
    }

    return resultado;
}
function preencheuRegistro(){
    let resultado = false;
    const registroReferencia = document.getElementById("referencia").value;
    
    if (registroReferencia.length > 0) {
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

// funcao fetch tipo PUT
function fetchInserir(body) {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };

    return fetch('http://localhost:3000/inserirAeronave', requestOptions)
    .then(T => T.json())
}

// funcao para inserir uma nova aeronave
function inserirAeronave(){

    if(!selecionouFabricante()){
        showStatusMessage("Fabricante não selecionado.", true);  
        return;
    }

    if(!preencheuModelo()){
        showStatusMessage("Modelo deve ser preenchido.", true);
        return;
    }

    if(!preencheuRegistro()){
        showStatusMessage("Referência deve ser preenchida.", true);
        return;
    }

    if(!anoValido()){
        showStatusMessage("Ano de fabricação deve de 2000 até 2025.", true);
        return;
    }

    if(!totalAssentosValido()){
        showStatusMessage("Total de assentos inválido.", true);
        return;
    }

    // obtem os dados inseridos no html
    const fabricanteInserido = document.getElementById("fabricantesCombo").value;
    const modeloInserido = document.getElementById("modelo").value;
    const anoFabInserido = document.getElementById("anoFabricacao").value;
    const registroInserido = document.getElementById("referencia").value;
    const totalAssentosInserido = document.getElementById("qtdeAssentos").value;

    // promise
    fetchInserir({
        // lado esquerdo: as variaveis utilizadas devem ser as mesmas nos arquivos typescript
        fabricante: fabricanteInserido, 
        modelo: modeloInserido, 
        qtdeAssentos: totalAssentosInserido,
        anoFab: anoFabInserido,
        registro: registroInserido })
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

        // uma possivel melhoria: se tenta inserir um modelo que ja existe da erro, pela unicidade
        // tentar personalizar essa mensagem
}
