// funcoes de tratamento de dados recebidos
// Função para verificar se a origem foi selecionada
function selecionouOrigem(){
    let resultado = false; 
    var origem = document.getElementById("cidadeOrigem");
    var valorSelecionado = origem.value;
    
    if (valorSelecionado !== "0"){
        resultado = true;
    }

    return resultado;
}
// Função para verificar se o destino foi selecionado
function selecionouDestino(){
    let resultado = false; 
    var destino = document.getElementById("cidadeDestino");
    var valorSelecionado = destino.value;
    
    if (valorSelecionado !== "0"){
        resultado = true;
    }

    return resultado;
}
// Função para verificar se o campo de duração foi preenchido.
function preencheuDuracao(){
    let resultado = false;
    const duracao = document.getElementById("duração").value;
    
    if(duracao.length > 0){
        resultado = true;
    }
    
    return resultado;
}
// Função para verificar se o tipo foi selecionado
function selecionouTipo(){
    let resultado = false; 
    var tipo = document.getElementById("tipo");
    var valorSelecionado = tipo.value;
    
    if (valorSelecionado !== "0"){
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

// Função para enviar dados para o servidor usando um método PUT.
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
    // Validação: Origem selecionada
    if(!selecionouOrigem()){
        showStatusMessage("Selecione a origem...", true);  
        return;
    }
    // Validação: Destino selecionado
    if(!selecionouDestino()){
        showStatusMessage("Selecione o destino...", true);
        return;
    }
    // Validação: Duração preenchida
    if(!preencheuDuracao()){
        showStatusMessage("Preencha a duração...", true);
        return;
    }
    // Validação: Tipo selecionado
    if(!selecionouTipo()){
        showStatusMessage("Selecione o tipo...", true);
        return;
    }

    // obtem os dados inseridos no html
    const origemInserida = document.getElementById("cidadeOrigem").value;
    const destinoInserido = document.getElementById("cidadeDestino").value;
    const duracaoInserida = document.getElementById("duração").value;
    const tipoCaminhoInserido = document.getElementById("tipo").value;
    
    // Chamada da função fetchInserir para enviar os dados ao servidor
    // promise
    fetchInserir({
        // lado esquerdo: as variaveis utilizadas devem ser as mesmas nos arquivos typescript
        origem: origemInserida, 
        destino: destinoInserido,
        duracao: duracaoInserida,
        tipo: tipoCaminhoInserido })
        .then(resultado => {
            // Verifica se a resposta foi bem-sucedida ou apresentou erro
            if(resultado.status === "SUCCESS"){
            showStatusMessage("Trajeto cadastrado!", false);
            }else{
            showStatusMessage("Erro ao cadastrar trajeto...: " + message, true);
            console.log(resultado.message);
            }
        })
        .catch(()=>{
            showStatusMessage("Erro técnico ao cadastrar... Contate o suporte.", true);
            console.log("Falha grave ao cadastrar.")
        });
}