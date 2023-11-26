// Função que é utilizada para as mensagens ao usuário, através do elemento com o ID "status"
// utilizando o padrão (classe) bootstrap
function showStatusMessage(msg, error){
    var pStatus = document.getElementById("status");
    
    if (error === true){
        pStatus.className = "text-danger";
    } else {
        pStatus.className = "text-success";
    }

    pStatus.textContent = msg;
}

// Funções em sequência para validar os dados inseridos no HTML
function nomeCompletoValido(){
    let resultado = false;
    const dadoInserido = document.getElementById("nomeCompletoUsuario").value;
    
    if (dadoInserido.length > 0) {
        resultado = true;
    }

    return resultado; 
}

function emailValido(){
    let resultado = false;
    const dadoInserido = document.getElementById("emailUsuario").value;
    
    if (dadoInserido.length > 0) {
        resultado = true;
    }

    return resultado; 
}

function nomeCartaoValido(){
    let resultado = false;
    const dadoInserido = document.getElementById("nomeNoCartaoUsuario").value;
    
    if (dadoInserido.length > 0) {
        resultado = true;
    }

    return resultado; 
}

function numeroCartaoValido(){
    let resultado = false;
    const dadoInserido = document.getElementById("numeroDoCartaoUsuario").value;
    
    if (dadoInserido.length > 0) {
        resultado = true;
    }

    return resultado; 
}

function validadeCartaoValido(){
    let resultado = false;
    const dadoInserido = document.getElementById("dataValidadeCartaoUsuario").value;
    
    if (dadoInserido !== "") {
        resultado = true;
    }

    return resultado; 
}

function codigoSegurancaCartaoValido(){
    let resultado = false;
    const dadoInserido = document.getElementById("cvvCartaoUsuario").value;
    
    if (dadoInserido !== "") {
        resultado = true;
    }

    return resultado; 
}

// Função fetch tipo PUT para cadastrar o novo cliente no banco de dados
function fetchInserir(body) {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };

    return fetch('http://localhost:3000/inserirCliente', requestOptions)
    .then(T => T.json())
}

// Função que insere os dados do cliente na tabela, salva variáveis para serem utilizadas na reserva
// de cadeira usando sessionStorage e chama a função reservarCadeira(), que é a função responsável
// para dar PUT na tabela de assentos
function realizarPagamento(){
    // declaração de variáveis

    const emailInserido = document.getElementById("emailUsuario").value;
    const nomeInserido = document.getElementById("nomeCompletoUsuario").value;
    var assentoInserido = sessionStorage.getItem("assentoReservado");
    var vooInserido = sessionStorage.getItem("vooEscolhido");

    // conferir dados inseridos
    if(!nomeCompletoValido()){
        showStatusMessage("Nome completo não inserido ou inválido.", true);  
        return;
    }

    if(!emailValido()){
        showStatusMessage("E-mail não inserido ou inválido.", true);  
        return;
    }

    if(!nomeCartaoValido()){
        showStatusMessage("Nome no cartão não inserido ou inválido.", true);  
        return;
    }

    if(!numeroCartaoValido()){
        showStatusMessage("Número do cartão não inserido ou inválido.", true);  
        return;
    }

    if(!validadeCartaoValido()){
        showStatusMessage("Validade do cartão não inserida ou inválida.", true);  
        return;
    }

    if(!codigoSegurancaCartaoValido()){
        showStatusMessage("CVV do cartão não inserido ou inválido.", true);  
        return;
    }

    // salva nas variáveis
    sessionStorage.setItem("pagamentoNome", nomeInserido);
    sessionStorage.setItem("pagamentoEmail", emailInserido);

    fetchInserir({
        nome: nomeInserido,
        email: emailInserido,
        assento: assentoInserido,
        voo: vooInserido})

    .then(resultado => {
            if(resultado.status === "SUCCESS") {
                sconsole.log("Cliente cadastrado!");
            } else {
                showStatusMessage("Erro ao cadastrar cidade...: " + message, true);
                console.log(resultado.message);
            }
    })
        
    .catch(()=>{
            showStatusMessage("Erro técnico ao cadastrar! Contate o suporte.", true);
            console.log("Falha grave ao cadastrar.")
    });

    reservarCadeira();
    window.location.href = "/src/paginas/local/pagamento_confirmado.html";
}

// Função fetch do tipo POST que comunica com o servidor http pelo typescript, utilizando o comando Oracle
// UPDATE no mapa de assentos, será passado como dados o voo e a cadeira selecionada (número)
function fetchAlterar(body) {
    const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
    };

    return fetch('http://localhost:3000/reservarCadeira', requestOptions)
    .then(T => T.json())
}

// Função chamada no momento de clicar em "pagar" que vai reservar a cadeira, utilizando a função fetchAlterar
function reservarCadeira(){
    const vooInserido = sessionStorage.getItem("vooEscolhido");;
    const cadeiraSelecionada = sessionStorage.getItem("assentoReservado");

    fetchAlterar({
        vooReserva: vooInserido, 
        cadeiraReserva: cadeiraSelecionada })
        
        .then(resultado => {
            if(resultado.status === "SUCCESS") {
                console.log("Assento reservado!", false);
            } else {
                showStatusMessage("Erro ao reservar assento: " + resultado.message, true);
                console.log(resultado.message);
            }
        })
        
        .catch(()=>{
            showStatusMessage("Erro técnico ao reservar. Contate o suporte.", true);
            console.log("Falha grave ao reservar.");
        }); 
}


