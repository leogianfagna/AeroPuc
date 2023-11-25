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

// Função para validar os dados recebidos na tela de pagamento, que é baseado conforme a tela
// de pagamento
function validarDadosRecebidos(){
    var resultado = false;
    var mensagemDeErro;
    var pStatus = document.getElementById("status");

    const tipoDePagamento = document.getElementById("metodo_pagamento").value;
    const emailDoUsuarioInserido = document.getElementById("email").value;
    const nomeDoUsuarioInserido = document.getElementById("nome").value;
    const nomeNoCartaoInserido = document.getElementById("nomeCartao").value;
    const numeroDoCartaoInserido = document.getElementById("numeroCartao").value;
    var validadeDoCartaoInserido = new Date();
    validadeDoCartaoInserido = document.getElementById("validadeCartao").value;
    const cvcDoCartaoInserido = document.getElementById("cvcCartao").value;

    console.log("validade: ", validadeDoCartaoInserido);

    if (tipoDePagamento === "n/a") {
        mensagemDeErro = "Uma forma de pagamento deve ser selecionada.";
    }

    if (tipoDePagamento === "cartao_credito" || tipoDePagamento === "cartao_debito") {
        if (emailDoUsuarioInserido.length > 0) {
            resultado = true;
        } else {
            mensagemDeErro = "E-mail inválido.";
        }

        if (nomeDoUsuarioInserido.length > 0) {
            resultado = true;
        } else {
            mensagemDeErro = "Nome completo inválido.";
        }

        if (nomeNoCartaoInserido.length > 0) {
            resultado = true;
        } else {
            mensagemDeErro = "Nome completo no cartão inválido.";
        }

        if (numeroDoCartaoInserido > 0) {
            resultado = true;
        } else {
            mensagemDeErro = "Número do cartão inválido.";
        }

        if (validadeDoCartaoInserido > 0) {
            resultado = true;
        } else {
            mensagemDeErro = "Validade do cartão inválida.";
        }

        if (cvcDoCartaoInserido > 0) {
            resultado = true;
        } else {
            mensagemDeErro = "CVC do cartão inválido.";
        }

    }

    if (tipoDePagamento === "pix") {
        if (emailDoUsuarioInserido.length > 0) {
            resultado = true;
        } else {
            mensagemDeErro = "E-mail inválido.";
        }

        if (nomeDoUsuarioInserido.length > 0) {
            resultado = true;
        } else {
            mensagemDeErro = "Nome completo inválido.";
        }
    }
    
    pStatus.textContent = mensagemDeErro;
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
    const emailInserido = document.getElementById("email").value;
    const nomeInserido = document.getElementById("nome").value;
    var assentoInserido = sessionStorage.getItem("assentoReservado");
    var vooInserido = sessionStorage.getItem("vooEscolhido");

    // salva nas variáveis
    sessionStorage.setItem("pagamentoNome", nomeInserido);
    sessionStorage.setItem("pagamentoEmail", emailInserido);

    fetchInserir({
        nome: nomeInserido,
        email: emailInserido,
        assento: assentoInserido,
        voo: vooInserido
    }).then(resultado => {
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


