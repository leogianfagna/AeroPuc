// funcoes de tratamento de dados recebidos
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
    
    if (data.length > 0) {
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
function fetchInserir(body) {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };

    return fetch('http://localhost:3000/inserirVoos', requestOptions)
    .then(T => T.json())
}

// funcao para inserir um novo voo
function inserirVoo(){

    if(!selecionouTrajeto()){
        showStatusMessage("Selecione o trajeto...", true);  
        return;
    }

    if(!selecionouAeronave()){
        showStatusMessage("Selecione a aeronave...", true);
        return;
    }

    if(!preencheuValor()){
        showStatusMessage("Preencha o valor...", true);
        return;
    }

    if(!preencheuChegada()){
        showStatusMessage("Preencha o horário de chegada...", true);
        return;
    }

    if(!preencheuIda()){
        showStatusMessage("Preencha o horário de Ida.", true);
        return;
    }

    if(!preencheuData()){
        showStatusMessage("Preencha a data.", true);
        return;
    }

    // obtem os dados inseridos no html
    const dataInserida = document.getElementById("data").value;
    const trajetoInserido = document.getElementById("trajeto").value;
    const aeronaveInserida = document.getElementById("aeronave").value;
    const horarioIdaInserido = document.getElementById("horarioIda").value;
    const horarioVoltaInserido = document.getElementById("horarioChegada").value;
    const precoVooInserido = document.getElementById("valor").value;

    // promise
    fetchInserir({
        // lado esquerdo: as variaveis utilizadas devem ser as mesmas nos arquivos typescript
        data: dataInserida, 
        trajeto: trajetoInserido, 
        aeronave: aeronaveInserida,
        horario_ida: horarioIdaInserido,
        horario_volta: horarioVoltaInserido,
        valor: precoVooInserido })
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
