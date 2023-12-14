// tratamento dos dados recebidos
function id(){
    let resultado = false;
    const id = document.getElementById("identificador").value;
    
    if (parseInt(id) > 0) {
        resultado = true;
    }

    return resultado; 
}

function anoValido(){
    let resultado = false;
    var strAno = document.getElementById("anoFabricacao").value;
    const ano = parseInt(strAno);
    
    if (ano >= 1900 && ano <= 2025) {
        resultado = true;
    }

    return resultado; 
}

// Função para validar o número de fileiras.
function fileirasValido(){
    let resultado = false;
    const strFileiras = document.getElementById("fileiras").value;
    const fileira = parseInt(strFileiras);
    
    if (fileira > 0) {
        resultado = true;
    }

    return resultado; 
}

// Função para validar o número de colunas.
function colunasValido(){
    let resultado = false;
    const strColunas = document.getElementById("colunas").value;
    const coluna = parseInt(strColunas);
    
    if (coluna > 0) {
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

// Função que realizar uma requisição HTTP do tipo POST usando API Fetch
function fetchAlterar(body) {

    // Define as opções para a requisição
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };

    // Realizar a requisição para o URL fornecido com as opções "requestOptions"
    return fetch('http://localhost:3000/alterarAeronave', requestOptions)
    .then(T => T.json()) // Mapeia a resposta para o formato JSON
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

    if(!fileirasValido()){
        showStatusMessage("Número de fileiras inválido.", true);
        return;
    }

    if(!colunasValido()){
        showStatusMessage("Número de colunas inválido.", true);
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
    const fileirasInserido = document.getElementById("fileiras").value;
    const colunasInserido = document.getElementById("colunas").value;
    const totalAssentosInserido = document.getElementById("qtdeAssentos").value;

    // promise
    fetchAlterar({
        // Chamando a função fetchAlterar e passando um objeto como argumento
        // As chaves da esquerda devem coincidir com a expectativa do servidor
        id: idInserido, 
        fabricante: fabricanteInserido, 
        modelo: modeloInserido, 
        qtdeAssentos: totalAssentosInserido,
        anoFab: anoFabInserido,
        registro: registroInserido,
        colunas: colunasInserido,
        fileiras: fileirasInserido })
        
    // Obteve a resposta "resultado" e usa um método encadeado (=>) para executar a função callback
    .then(resultado => {
        
        if(resultado.status === "SUCCESS") {
            showStatusMessage("Aeronave alterada!", false);
        } else {
            showStatusMessage("Erro ao alterar aeronave: " + resultado.message, true);
            console.log(resultado.message);
        }
    })
    
    // Nenhum parâmetro necessário, mas pode se usar "error" caso necessário
    .catch(()=>{
        showStatusMessage("Erro técnico ao alterar. Contate o suporte.", true);
        console.log("Falha grave ao alterar.");
    });
}
