// tratamento dos dados recebidos
function id(){
    let resultado = false;
    const id = document.getElementById("identificador").value;
    
    if (parseInt(id) > 10) {
        resultado = true;
    }

    return resultado; 
}

function anoValido(){
    let resultado = false;
    var strAno = document.getElementById("anoFabricacao").value;
    const ano = parseInt(strAno);
    
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
    
    if (valorSelecionado !== "0") {
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
function fetchAlterar(body) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };

    return fetch('http://localhost:3000/alterarAeronave', requestOptions)
    .then(T => T.json())
}

function alterarAeronave(){
    if (!id()) {
        showStatusMessage("ID não foi preenchido.",true);
        return;
    }

    if (!selecionouFabricante()) {
        showStatusMessage("Fabricante não foi selecionado.", true);  
        return;
    }

    if (!preencheuModelo()) {
        showStatusMessage("Modelo não foi preenchido.", true);
        return;
    }

    if (!preencheuRegistro()) {
        showStatusMessage("Registro não foi preenchido.", true);
        return;
    }

    if (!anoValido()) {
        showStatusMessage("Ano da aeronave deve de 2000 até 2025.", true);
        return;
    }

    if (!totalAssentosValido()) {
        showStatusMessage("Preencha corretamente o total de assentos.", true);
        return;
    }

    // obtem os dados inseridos no html
    const idInserido = document.getElementById("identificador").value;
    const fabricanteInserido = document.getElementById("fabricantesCombo").value;
    const modeloInserido = document.getElementById("modelo").value;
    const anoFabInserido = document.getElementById("anoFabricacao").value;
    const registroInserido = document.getElementById("referencia").value;
    const totalAssentosInserido = document.getElementById("qtdeAssentos").value;

    // promise
    fetchAlterar({
        // lado esquerdo: as variaveis utilizadas devem ser as mesmas nos arquivos typescript
        id: idInserido, 
        fabricante: fabricanteInserido, 
        modelo: modeloInserido, 
        qtdeAssentos: totalAssentosInserido,
        anoFab: anoFabInserido,
        registro: registroInserido })
        
        .then(resultado => {
            
            // obteve resposta
            
            if(resultado.status === "SUCCESS") {
                showStatusMessage("Aeronave cadastrada!", false);
            } else {
                showStatusMessage("Erro ao cadastrar aeronave: " + resultado.message, true);
                console.log(resultado.message);
            }
        })
        
        .catch(()=>{
            showStatusMessage("Erro técnico ao cadastrar. Contate o suporte.", true);
            console.log("Falha grave ao cadastrar.");
        });
}
