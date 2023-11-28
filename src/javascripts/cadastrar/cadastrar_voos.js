// funcoes de tratamento de dados recebidos
// Função para verificar se um trajeto foi selecionado
function selecionouTrajeto(){
    let resultado = false; 
    var trajeto = document.getElementById("trajeto");
    var valorSelecionado = trajeto.value;
    
    if (valorSelecionado !== "0") {
        resultado = true;
    }

    return resultado;
}
// Função para verificar se uma aeronave foi selecionada
function selecionouAeronave(){
    let resultado = false; 
    var aeronave = document.getElementById("aeronave");
    var valorSelecionado = aeronave.value;
    
    if (valorSelecionado !== "0") {
        resultado = true;
    }
    
    return resultado;
}

// Função para verificar se o campo de data de ida foi preenchido.
function preencheuDataida(){
    let resultado = false;
    const data = document.getElementById("data_ida").value;
    
    if (data.length > 0) {
        resultado = true;
    }
    
    return resultado;
}
// Função para verificar se o campo de data de volta foi preenchido.
function preencheuDatavolta(){
    let resultado = false;
    const data = document.getElementById("data_volta").value;
    
    if (data.length > 0) {
        resultado = true;
    }
    
    return resultado;
}
// Função para verificar se o campo de horário de ida foi preenchido.
function preencheuIda(){
    let resultado = false;
    const ida = document.getElementById("horarioIda").value;
    
    if (ida.length > 0) {
        resultado = true;
    }

    return resultado;
}
// Função para verificar se o campo de horário de chegada foi preenchido.
function preencheuChegada(){
    let resultado = false;
    const chegada = document.getElementById("horarioChegada").value;
    
    if (chegada.length > 0) {
        resultado = true;
    }

    return resultado;
}
// Função para verificar se o campo de valor foi preenchido.
function preencheuValor(){
    let resultado = false;
    const valor = document.getElementById("valor").value;
    
    if (valor.length > 0) {
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

    return fetch('http://localhost:3000/inserirVoos', requestOptions)
    .then(T => T.json())
}

// funcao para inserir um novo voo
function inserirVoo(){

    // Validação: Trajeto selecionado
    if(!selecionouTrajeto()){
        showStatusMessage("Selecione o trajeto...", true);
        return;
    }
    // Validação: Aeronave selecionada
    if(!selecionouAeronave()){
        showStatusMessage("Selecione a aeronave...", true);
        return;
    }
    // Validação: Valor preenchido
    if(!preencheuValor()){
        showStatusMessage("Preencha o valor...", true);
        return;
    }
    // Validação: Horário de chegada preenchido
    if(!preencheuChegada()){
        showStatusMessage("Preencha o horário de chegada...", true);
        return;
    }
    // Validação: Horário de ida preenchido
    if(!preencheuIda()){
        showStatusMessage("Preencha o horário de Ida.", true);
        return;
    }
    // Validação: Data de ida preenchida
    if(!preencheuDataida()){
        showStatusMessage("Preencha a data de ida.", true);
        return;
    }
    // Validação: Data de volta preenchida
    if(!preencheuDatavolta()){
        showStatusMessage("Preencha a data de volta.", true);
        return;
    }

    // obtem os dados inseridos no html
    const dataIdaInserida = document.getElementById("data_ida").value;
    const dataVoltaInserida = document.getElementById("data_volta").value;
    const trajetoInserido = document.getElementById("trajeto").value;
    const aeronaveInserida = document.getElementById("aeronave").value;
    const horarioIdaInserido = document.getElementById("horarioIda").value;
    const horarioVoltaInserido = document.getElementById("horarioChegada").value;
    const precoVooInserido = document.getElementById("valor").value;

    // promise
    fetchInserir({
        // lado esquerdo: as variaveis utilizadas devem ser as mesmas nos arquivos typescript
        data_ida: dataIdaInserida, 
        data_volta: dataVoltaInserida,
        trajeto: trajetoInserido, 
        aeronave: aeronaveInserida,
        horario_ida: horarioIdaInserido,
        horario_volta: horarioVoltaInserido,
        valor: precoVooInserido })
        .then(resultado => {
            // Verifica se a resposta foi bem-sucedida ou apresentou erro
            if(resultado.status === "SUCCESS"){
                showStatusMessage("Voo cadastrado!", false);
            } else {
                showStatusMessage("Erro ao cadastrar voo...: " + message, true);
                console.log(resultado.message);
            }
        })
        .catch(()=>{
            showStatusMessage("Erro técnico ao cadastrar... Contate o suporte.", true);
            console.log("Falha grave ao cadastrar.")
        });
}
