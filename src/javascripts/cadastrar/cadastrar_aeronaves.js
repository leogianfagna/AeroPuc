// funcoes de tratamento de dados recebidos
// Função para validar se o ano informado está no intervalo válido.
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

// Função para validar o número de assentos.
function totalAssentosValido(){
    let resultado = false;
    const strAssentos = document.getElementById("qtdeAssentos").value;
    const assentos = parseInt(strAssentos);

    const strFileiras = document.getElementById("fileiras").value;
    const fileira = parseInt(strFileiras);

    const strColunas = document.getElementById("colunas").value;
    const coluna = parseInt(strColunas);
    
    if (assentos === fileira * coluna) {
        resultado = true;
    }

    return resultado; 
}

// Função para verificar se um fabricante foi selecionado
function selecionouFabricante(){
    let resultado = false; 
    var listaFabricantes = document.getElementById("fabricantesCombo");
    var valorSelecionado = listaFabricantes.value;
    
    if (valorSelecionado !== "-1") {
        resultado = true;
    }

    return resultado;
}

// Função para verificar se o campo de modelo foi preenchido.
function preencheuModelo(){
    let resultado = false;
    const modeloInformado = document.getElementById("modelo").value;
    
    if (modeloInformado.length > 0) {
        resultado = true;
    }

    return resultado;
}

// Função para verificar se o campo de referência foi preenchido.
function preencheuRegistro(){
    let resultado = false;
    const registroReferencia = document.getElementById("referencia").value;
    
    if (registroReferencia.length > 0) {
        resultado = true;
    }

    return resultado;
}

// Função para exibir mensagens de status
function showStatusMessage(msg, error){
    var pStatus = document.getElementById("status");
    
    if (error === true) {
        pStatus.className = "text-danger"; // de acordo com o bootstrap
    } else {
        pStatus.className = "text-success";
    }

    pStatus.textContent = msg;
}

// Função para enviar dados para o servidor usando um método PUT.
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
// Validação: Fabricante selecionado
    if(!selecionouFabricante()){
        showStatusMessage("Fabricante não selecionado.", true);  
        return;
    }
   // Validação: Modelo preenchido
    if(!preencheuModelo()){
        showStatusMessage("Modelo deve ser preenchido.", true);
        return;
    }
 // Validação: Referência preenchida
    if(!preencheuRegistro()){
        showStatusMessage("Referência deve ser preenchida.", true);
        return;
    }
 // Validação: Ano de fabricação no intervalo válido
    if(!anoValido()){
        showStatusMessage("Ano de fabricação deve de 2000 até 2025.", true);
        return;
    }
// Validação: Quantidade de fileiras
    if(!fileirasValido()){
        showStatusMessage("Número de fileiras inválido.", true);
        return;
    }
// Validação: Quantidade de colunas
    if(!colunasValido()){
        showStatusMessage("Número de colunas inválido.", true);
        return;
    }
 // Validação: Total de assentos válido
    if(!totalAssentosValido()){
        showStatusMessage("Total de assentos inválido.", true);
        return;
    }

    // obtem os dados inseridos no html
    const fabricanteInserido = document.getElementById("fabricantesCombo").value;
    const modeloInserido = document.getElementById("modelo").value;
    const anoFabInserido = document.getElementById("anoFabricacao").value;
    const registroInserido = document.getElementById("referencia").value;
    const fileirasInserido = document.getElementById("fileiras").value;
    const colunasInserido = document.getElementById("colunas").value;
    const totalAssentosInserido = document.getElementById("qtdeAssentos").value;

    // promise
    fetchInserir({
        // lado esquerdo: as variaveis utilizadas devem ser as mesmas nos arquivos typescript
        fabricante: fabricanteInserido, 
        modelo: modeloInserido, 
        qtdeAssentos: totalAssentosInserido,
        anoFab: anoFabInserido,
        registro: registroInserido,
        colunas: colunasInserido,
        fileiras: fileirasInserido })
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
