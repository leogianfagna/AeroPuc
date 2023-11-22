// uma função para pegar os dados preenchidos na reserva de voo e dar um select nos voos
// que condizem com os dados preenchidos

// funcao para conferir dados colocados
function idVooInserido(){
    let resultado = false;
    const vooInserido = document.getElementById("vooEscolhido").value;
    
    if (parseInt(vooInserido) > 0) {
        sessionStorage.setItem("vooSelecionado", vooInserido); // salvar o num do voo escolhido para ser usado depois
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
  
// funcao fetch tipo get
function fetchResgatar(numeroVoo) { // passando como parametro o numero do voo
    return fetch(`http://localhost:3000/listarAssentosReservados?voo=${numeroVoo}`) // passando como parametro o numero do voo
        .then(response => response.json());
}
  
  
// função para fazer a listagem dos assentos
function criarMapaAssentos(vooEscolhido){
    // conferir o dado enviado
    var pStatus = document.getElementById("statusReserva");
    

    /* não precisa mais pois agora é diretamente clicando no botão 
    var resultado;
    pStatus.className = "text-success";

    if(!idVooInserido()){
        pStatus.textContent = "ID do voo não preenchido corretamente.";
        resultado = true;
        pStatus.className = "text-danger";
        return;
    } else {
        // limpar o dado caso ele tenha preenchido anteriormente de forma incorreta
        pStatus.textContent = "";
        resultado = true;
        pStatus.className = "text-danger";
    } */
  
    //const vooInserido = document.getElementById("vooEscolhido").value;
    const vooInserido = vooEscolhido;
    console.log("Voo inserido no html: ", vooInserido);
  
    // usar o fetch com o parametro (vai receber no typescript)
    fetchResgatar(vooInserido)
      .then(data => {
        if (data.status === 'SUCCESS') {
          const assentosReservados = data.payload.map(row => row[0][0]); // transformar o SELECT assentos em string
          console.log('Assentos Reservados:', assentosReservados);
        
        // criando um array dos assentos reservados para imprimir
        const colunas = 6;
        const fileiras = 30;
        let cadeiraVez = 0;
        let poltronaLetra = 65; // letra 'A' na tabela ASCII
        let fileiraIdentificacao;
        let letraExtra = "";
        
        // deve fazer a linha e depois imprimir, depois seguir para a proxima
    
        // passar por todas as colunas
        for (let i = 0; i < fileiras; i++) {
    
            // passar pela linha inteira
            for (let j = 0; j < colunas; j++) {
                cadeiraVez++; // conta em qual cadeira está
                fileiraIdentificacao = String.fromCharCode(poltronaLetra) + letraExtra + (j + 1);
    
                // conferir se é um corredor
                // lógica é pegar colunas e dividir por 2, quando for esse resultado, pula
                if (j === colunas/2) {
                    document.getElementById("mapaAssentos").innerHTML += `<button type="button" class="btn btn-light" disabled></button>`;
                }
    
                // AQUI VAI TER QUE SER ASSIM:
                // ele nao pode conferir posição por posição, vai ter que conferir se o numero cadeiraVez
                // tem algum resultado no array!!!
    
                // conferir se está ocupado ou desocupado
                if (assentosReservados.includes(cadeiraVez.toString())) { //colocar toString única forma de funcionar
                    document.getElementById("mapaAssentos").innerHTML += `<button type="button" class="buttonMapaAssentoReservado" style="margin: 3px">${fileiraIdentificacao}</button>`;
                } else {
                    document.getElementById("mapaAssentos").innerHTML += `<button onClick="reservarCadeira(${cadeiraVez});" type="button" class="buttonMapaAssento" style="margin: 3px">${fileiraIdentificacao}</button>`;
                }
            }
    
            // nova coluna, pular linha e avançar uma letra para identificar as poltronas
            document.getElementById("mapaAssentos").innerHTML += `<br>`;
            poltronaLetra++;

            if (poltronaLetra === 91) {
                poltronaLetra = 65;
                letraExtra = "A";
            }
        }
    
    
      } else {
          console.error('Erro ao obter os assentos reservados:', data.message);
      }
    }).catch(error => {
          console.error('Erro ao fazer a requisição:', error);
    });
}

// vai tratar o dado inserido no tipo de passagem e exibir a nova <div>
function conferirTipoViagem(){
    var tipoSelecionado = document.getElementById("tipoPassagem").value;
    let resultado = false;
    var divTalvez = document.getElementById("talvez");
    divTalvez.style.display = "none";
    
    // conferir selecionado
    if (tipoSelecionado !== 0) {
        resultado = true;
        console.log("tipo de passagem: ", tipoSelecionado);
    }

    // exibir se necessário
    if (tipoSelecionado === "ambos") {
        divTalvez.style.display = "block";
    }

    return resultado; 
}


// funções para tratar os dados inseridos
function datasInvalidas() {
    var dataPartida = new Date();
    var dataVolta = new Date();
    var tipoSelecionado = document.getElementById("tipoPassagem").value; // se não for ambos, não precisa validar
    var resultado = false;

    dataPartida = document.getElementById("start").value;
    dataVolta = document.getElementById("back").value;

    // console.log("data partida: ", dataPartida);
    // console.log("data volta: ", dataVolta);

    if (tipoSelecionado === "ambos") {
        // precisa validar
        if (dataPartida >= dataVolta) {
            console.log("as datas são inválidas");
        } else {
            console.log("as datas estão CORRETAS!");
            resultado = true;
        }
    } else {
        // não precisa validar
        console.log("tudo certo, não precisa de validação");
        resultado = true;
    }

    return resultado;
}

function selecionouPassagem(){
    let resultado = false;
    const tipoSelecionado = document.getElementById("tipoPassagem").value;
    
    if (tipoSelecionado !== "0") {
        resultado = true;
    }

    return resultado;
}

function selecionouCidadePartida(){
    let resultado = false;
    const partidaSelecionada = document.getElementById("localPartida").value;
    
    if (partidaSelecionada !== "0") {
        resultado = true;
    }

    return resultado;
}

function selecionouCidadeDestino(){
    let resultado = false;
    const destinoSelecionado = document.getElementById("localDestino").value;
    
    if (destinoSelecionado !== "0") {
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

function buscarVoos(){

    if(!selecionouPassagem()){
        showStatusMessage("Tipo de passagem não selecionado.", true);  
        return;
    }

    if(!selecionouCidadePartida()){
        showStatusMessage("Cidade de partida não selecionada.", true);
        return;
    }

    if(!selecionouCidadeDestino()){
        showStatusMessage("Cidade de destino não selecionada.", true);
        return;
    }

    if(!datasInvalidas()){
        showStatusMessage("Datas inválidas.", true);
        return;
    }

    // passou por todas as validações com sucesso
    // agora é só dar fetch na tabela e imprimir a tabela
    // + esconder a parte de preenchimento de dados
    
    showStatusMessage("", true);
    var desaparecerDivDados = document.getElementById('cadastroCentral'); // usa a opacidade para dar efeito de fade
    desaparecerDivDados.style.opacity = '0';
    desaparecerDivDados.style.height = '0';

    var mostrarDivTabela = document.getElementById('tabelaResultados');
    mostrarDivTabela.style.opacity = '1';
    mostrarDivTabela.style.height = 'auto';
    mostrarDivTabela.style.visibility = 'visible';

    // obtém os dados do HTML
    const dataPartidaFetch = document.getElementById("start").value;
    const destinoFetch = document.getElementById("localDestino").value;
    const origemFetch = document.getElementById("localPartida").value;

    // um fetch que envia a data enviada como parâmetro lá pro typescript
    // tem que usar o encode por se tratar de uma data
    fetch(`http://localhost:3000/buscarVoosLista?dataPreenchida=${encodeURIComponent(dataPartidaFetch)}&localDestino=$${encodeURIComponent(destinoFetch)}`)
    .then(response => response.json())
    .then(data => {
        if (data.status === 'SUCCESS') {
            let i = 0;
            const tabelaDeAeronaves = document.getElementById('tabelaDeAeronaves');
            tabelaDeAeronaves.innerHTML = ''; // limpar o conteúdo atual

            data.payload.forEach(rowData => {
                const tr = document.createElement('tr');
              
                rowData.forEach((cellData, index) => {
                  const td = document.createElement('td');
              
                  // Verifique se a coluna é a coluna ID
                  if (index === 0) {
                    // declarando os atributos do mesmo estilo que o bootstrap
                    const botaoExcluir = document.createElement('button');
                    botaoExcluir.type = 'button'; 
                    botaoExcluir.className = 'btn btn-outline-info';
                    botaoExcluir.textContent = `Reservar`;
                    // cada botão chama a função que é a criarMapaAssentos, passando como parâmetro o ID do voo
                    botaoExcluir.addEventListener('click', () => criarMapaAssentos(`${cellData}`));
                    td.appendChild(botaoExcluir);

                    // adiciona a coluna de botões de exclusão
                    /*
                    const botaoExcluir = document.createElement('button');
                    botaoExcluir.type = 'button'; // declarando os atributos do mesmo estilo que o bootstrap
                    botaoExcluir.className = 'btn btn-danger';
                    botaoExcluir.textContent = '🗑️';
                    botaoExcluir.addEventListener('click', excluir(i)); // função excluir que passa i como argumento
                    tdExcluir.appendChild(botaoExcluir);
                    tr.appendChild(tdExcluir); */
                  } else {
                    td.textContent = cellData;
                  }
              
                  tr.appendChild(td);
                });
              
                // Aqui imprime o próximo tr, colocando um ID para identificar cada linha
                tr.id = i;
                i++;
                tabelaDeAeronaves.appendChild(tr);
              });
              
            
        } else {
            console.error(`Erro ao obter dados: ${data.message}`);
        }
    }).catch(error => console.error('Erro ao conectar:', error));
}

function reservarCadeira(cadeiraReservada){
    // controle
    const vooPreenchidoReserva = document.getElementById("vooSelecionado");
    console.log("Foi reservado a cadeira: ", cadeiraReservada);
    sessionStorage.setItem("reservaCadeira", cadeiraReservada);
    
    console.log("Foi escolhido o voo: ", vooPreenchidoReserva);

    // variáveis para uso posterior
    sessionStorage.setItem("assentoReservado", cadeiraReservada);
    sessionStorage.setItem("vooEscolhido", vooPreenchidoReserva);

    window.location.href = "/src/paginas/local/pagamento.html";
}

// função para mostrar a outra div, com todas as opções do escopo ao invés da div com opções básicas
function opcoesAvancadas(){
    // zerar a opacidade da div simples
    var desaparecerDivDados = document.getElementById('invisivelDiv'); // usa a opacidade para dar efeito de fade
    var checarMarcacaoCheckbox = document.getElementById("alterarOpcoesAvancadas");

    if (checarMarcacaoCheckbox.checked) {
        // checkbox marcado = mostrar as opções avançadas
        desaparecerDivDados.style.visibility = 'visible';
        desaparecerDivDados.style.height = 'auto';
    } else {
        // checkbox desmarcada = esconder as opções avançadas
        desaparecerDivDados.style.visibility = 'hidden';
        desaparecerDivDados.style.height = 0;
    }


}