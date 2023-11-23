/* função para o botão de realizar o pagamento, ela:
    - confere se preencheu corretamente [X]
    - salva as variáveis como email para impressão [X]
    - envia os dados para o banco de dados já com o assento reservado [X]
*/

// funcoes de tratamento de dados recebidos

/*
function preencheuCidade(){
    let resultado = false;
    const cidadeInformada = document.getElementById("cidade").value;
    
    if (cidadeInformada.length > 0) {
        resultado = true;
    }
    
    return resultado;
}

function preencheuEstado(){
    let resultado = false;
    const estadoInformado = document.getElementById("estado").value;
    
    if (estadoInformado.length > 0) {
        resultado = true;
    }

    return resultado;
}

function preencheuPais(){
    let resultado = false;
    const paisInformado = document.getElementById("pais").value;
    
    if (paisInformado.length > 0) {
        resultado = true;
    }

    return resultado;
}
*/

function showStatusMessage(msg, error){
    var pStatus = document.getElementById("status");
    
    if (error === true){
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

    return fetch('http://localhost:3000/inserirCliente', requestOptions)
    .then(T => T.json())
}

// funcao para inserir o cliente na tabela de clientes, ao mesmo tempo que chamar a função para reservar o assento se der certo
function realizarPagamento(){
    /*
    if(!preencheuCidade()){
        showStatusMessage("Cidade não preenchida.", true);  
        return;
    }

    if(!preencheuEstado()){
        showStatusMessage("Estado não preenchido.", true);
        return;
    }

    if(!preencheuPais()){
        showStatusMessage("País não preenchido.", true);
        return;
    } */

    // obtém os dados do html
    const emailInserido = document.getElementById("email").value;
    const nomeInserido = document.getElementById("nome").value;
    var assentoInserido = sessionStorage.getItem("assentoReservado");
    var vooInserido = sessionStorage.getItem("vooEscolhido");

    // salva nas variáveis
    sessionStorage.setItem("pagamentoNome", nomeInserido);
    sessionStorage.setItem("pagamentoEmail", emailInserido);

    // promise
    fetchInserir({
        // lado esquerdo: as variaveis utilizadas devem ser as mesmas nos arquivos typescript
        nome: nomeInserido,
        email: emailInserido,
        assento: assentoInserido,
        voo: vooInserido
    }).then(resultado => {
            // obteve resposta
            if(resultado.status === "SUCCESS") {
                showStatusMessage("Cidade cadastrada!", false);
            } else {
                showStatusMessage("Erro ao cadastrar cidade...: " + message, true);
                console.log(resultado.message);
            }
        })
        .catch(()=>{
            showStatusMessage("Erro técnico ao cadastrar... Contate o suporte.", true);
            console.log("Falha grave ao cadastrar.")
        });

    
    reservarCadeira();
    // window.location.href = "/src/paginas/local/pagamento_confirmado.html";
}

// funções para reservar a cadeira
function fetchAlterar(body) {
    const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
    };

    return fetch('http://localhost:3000/reservarCadeira', requestOptions)
    .then(T => T.json())
}

function reservarCadeira(){

    // obtem os dados para a inserção
    const vooInserido = sessionStorage.getItem("vooEscolhido");;
    const cadeiraSelecionada = sessionStorage.getItem("assentoReservado");
    //window.location.href = "/src/paginas/local/pagamento_confirmado.html";
    console.log("teste1");

    // promise
    fetchAlterar({
        // lado esquerdo: as variaveis utilizadas devem ser as mesmas nos arquivos typescript
        vooReserva: vooInserido, 
        cadeiraReserva: cadeiraSelecionada })
        
        .then(resultado => {
            
            // obteve resposta
            
            if(resultado.status === "SUCCESS") {
                showStatusMessage("Aeronave cadastrada!", false);
                console.log("teste1");
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


