function id() {
    let resultado = false;
    const id = document.getElementById("id").value;
    const ID = parseInt(id);
    
    if (ID > 0) {
        resultado = true;
    }

    return resultado; 
}

function selecionouTrajeto(){
    let resultado = false; 
    var trajeto = document.getElementById("trajeto");
    var valorSelecionado = trajeto.value;
    
    if (valorSelecionado !== "0") {
        resultado = true;
    }

    return resultado;
}

function selecionouAeronave(){
    let resultado = false; 
    var aeronave = document.getElementById("aeronave");
    var valorSelecionado = aeronave.value;
    
    if (valorSelecionado !== "0") {
        resultado = true;
    }

    return resultado;
}

function preencheuData(){
    let resultado = false;
    const data = document.getElementById("data").value;
    
    if(data.length > 0) {
        resultado = true;
    }

    return resultado;
}

function preencheuIda(){
    let resultado = false;
    const ida = document.getElementById("horarioIda").value;
    
    if (ida.length > 0) {
        resultado = true;
    }

    return resultado;
}

function preencheuChegada(){
    let resultado = false;
    const chegada = document.getElementById("horarioChegada").value;
    
    if (chegada.length > 0) {
        resultado = true;
    }

    return resultado;
}

function preencheuValor(){
    let resultado = false;
    const valor = document.getElementById("valor").value;
    
    if (valor.length > 0) {
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
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };

    return fetch('http://localhost:3000/alterarVoo', requestOptions)
    .then(T => T.json())
}

function alterarVoo(){
    if (!id()) {
        showStatusMessage("ID não foi preenchido.",true);
        return;
    }

    if (!selecionouTrajeto()) {
        showStatusMessage("Trajeto não foi preenchido.", true);  
        return;
    }

    if (!selecionouAeronave()) {
        showStatusMessage("Aeronave não foi selecionada.", true);
        return;
    }

    if (!preencheuValor()) {
        showStatusMessage("Valor não foi preenchido.", true);
        return;
    }

    if (!preencheuChegada()) {
        showStatusMessage("Horário de chegada não foi preenchido.", true);
        return;
    }

    if (!preencheuIda()) {
        showStatusMessage("Horário de partida não foi preenchido.", true);
        return;
    }

    if (!preencheuData()) {
        showStatusMessage("Data não foi preenchida.", true);
        return;
    }

    // obtem os dados inseridos no html
    const identificadorInserido = document.getElementById("id").value;
    const dataInserida = document.getElementById("data").value;
    const trajetoInserido = document.getElementById("trajeto").value;
    const aeronaveInserida = document.getElementById("aeronave").value;
    const horarioIdaInserido = document.getElementById("horarioIda").value;
    const horarioVoltaInserido = document.getElementById("horarioChegada").value;
    const precoVooInserido = document.getElementById("valor").value;

    if (horarioVoltaInserido === undefined) {
        horarioVoltaInserido = 10;
    }

    // promise
    fetchAlterar({
        // lado esquerdo: as variaveis utilizadas devem ser as mesmas nos arquivos typescript
        id: parseInt(identificadorInserido),
        data: dataInserida, 
        trajeto: parseInt(trajetoInserido), 
        aeronave: aeronaveInserida,
        horario_ida: horarioIdaInserido,
        horario_volta: horarioVoltaInserido,
        valor: precoVooInserido })
        .then(resultado => {
            // obteve resposta
            if(resultado.status === "SUCCESS") {
                showStatusMessage("Voo alterado!", false);
            } else {
                showStatusMessage("Erro ao alterar voo: " + resultado.message, true);
                console.log(resultado.message);
            }
        })
        .catch(()=>{
            showStatusMessage("Erro técnico ao alterar! Contate o suporte.", true);
            console.log("Falha grave ao alterar.")
        });
}
