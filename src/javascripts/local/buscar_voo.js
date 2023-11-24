// Função "fetch" do tipo GET que RECEBE como parâmetro o número do voo e vai repassar esse parâmetro
// para a próxima função que vai usá-la
// tem como objetivo listar os assentos reservados do ID do voo que foi recebido
// utiliza esse parâmetro para usar na condição da busca do Oracle, por exemplo, WHERE id = num
function fetchResgatar(numeroVoo) {
    return fetch(`http://localhost:3000/listarAssentosReservados?voo=${numeroVoo}`)
        .then(response => response.json());
}
  
// Função para criar o mapa de assentos interativo no HTML, pronta para o usuário clicar
// e reservar o assento escolhido. Salva no sessionStorage o valor do voo pesquisado ao
// clicar em "Reservar" para utilizar posteriormente no banco de dados
function criarMapaAssentos(vooEscolhido){
    const vooInserido = vooEscolhido;
    sessionStorage.setItem("vooEscolhido", vooInserido);
  
    // usar o fetch com o parametro (vai receber no typescript)
    fetchResgatar(vooInserido)
      .then(data => {
        if (data.status === 'SUCCESS') {
            const assentosReservados = data.payload.map(row => row[0]); // transformar o SELECT assentos em array
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
                    console.log("cadeira vez: " + cadeiraVez + ", assentos reservados: " + assentosReservados);
                    console.log("resultado do include = ", assentosReservados.includes(cadeiraVez.toString()));
                    if (assentosReservados.includes(parseInt(cadeiraVez))) { //colocar toString única forma de funcionar
                        document.getElementById("mapaAssentos").innerHTML += `<button type="button" class="buttonMapaAssentoReservado" style="margin: 3px" disabled>${fileiraIdentificacao}</button>`;
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

// Função que exibe opção de data de volta pois, caso seja só ida, não há
// necessidade de exibir preenchimento da data de retorno
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


// Função que trata das datas preenchidas. Se a data de volta for igual ou menor que a de ida
// deve ser bloqueada e enviar mensagem. Usa o ID do tipoSelecionado e o valor se for IDA E VOLTA
// será "ambos"
function datasInvalidas() {
    var dataPartida = new Date();
    var dataVolta = new Date();
    var tipoSelecionado = document.getElementById("tipoPassagem").value;
    var resultado = false;

    dataPartida = document.getElementById("start").value;
    dataVolta = document.getElementById("back").value;

    if (tipoSelecionado === "ambos") { // necessita validação
        if (dataPartida >= dataVolta) {
            console.log("as datas são inválidas");
        } else {
            console.log("as datas estão CORRETAS!");
            resultado = true;
        }
    } else {
        console.log("tudo certo, não precisa de validação");
        resultado = true;
    }

    return resultado;
}

// Funções que tratam se os labels foram preenchidos, caso contrário, retornar mensagem para o usuário
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

// Função que é utilizada para as mensagens ao usuário, através do elemento com o ID "status"
// utilizando o padrão (classe) bootstrap
function showStatusMessage(msg, error){
    var pStatus = document.getElementById("status");
    
    if (error === true) {
        pStatus.className = "text-danger"; // de acordo com o bootstrap
    } else {
        pStatus.className = "text-success";
    }

    pStatus.textContent = msg;
}

// Função que é chamada ao clicar na busca de voos, após preencher os espaços com as informações
// que serão utilizadas no comando de query do Oracle. Essa função valida os dados recebidos
// e depois usa um fetch no servidor para retornar os resultados da busca.
//
// Além disso, foi adicionado transições para esconder os formulários da tela que não serão
// mais utilizados e deixar o ambiente mais limpo, utilizando style visibility, height e opacity
//
// Ela confere se as opções avançadas está selecionado pois, se não tiver, não precisa validar
// todos os dados. Se tiver, a busca deve ser feita de forma diferente
function buscarVoos(){
    var selecaoOpcoesAvancadas = document.getElementById("alterarOpcoesAvancadas");

    if(!selecionouCidadeDestino()){
        showStatusMessage("Cidade de destino não selecionada.", true);
        return;
    }

    if(!selecionouCidadePartida()){
        showStatusMessage("Cidade de partida não selecionada.", true);
        return;
    }

    if (selecaoOpcoesAvancadas.checked) {
        // conferir os demais dados

        if(!selecionouPassagem()){
            showStatusMessage("Tipo de passagem não selecionado.", true);  
            return;
        }

        if(!datasInvalidas()){
            showStatusMessage("Datas inválidas.", true);
            return;
        }
    }
    
    // esconder o formulário
    showStatusMessage("", true);
    var desaparecerDivDados = document.getElementById('cadastroCentral');
    desaparecerDivDados.style.opacity = '0';
    desaparecerDivDados.style.height = '0';

    var mostrarDivTabela = document.getElementById('tabelaResultados');
    mostrarDivTabela.style.opacity = '1';
    mostrarDivTabela.style.height = 'auto';
    mostrarDivTabela.style.visibility = 'visible';

    // obter os dados do HTML
    const dataPartidaFetch = document.getElementById("start").value;
    const destinoFetch = document.getElementById("localDestino").value;
    const origemFetch = document.getElementById("localPartida").value;

    // função que vai utilizar parâmetros inseridos no HTML
    fetch(`http://localhost:3000/buscarVoosLista?localDestino=${encodeURIComponent(dataPartidaFetch)}&localPartida=${encodeURIComponent(origemFetch)}`)
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

// Função que é chamada ao clicar na cadeira no mapa de assentos, ela apenas vai salvar a cadeira
// escolhida localmente pois só vai inserir no banco após o pagamento. Depois, abrir a página de
// pagamento
function reservarCadeira(cadeiraReservada){
    sessionStorage.setItem("reservaCadeira", cadeiraReservada); // conferir qual é o correto aqui
    sessionStorage.setItem("assentoReservado", cadeiraReservada);
    window.location.href = "/src/paginas/local/pagamento.html";
}

// Função que exibe mais opções na busca, todas as que são especificadas no escopo usando
// uma condição de habilitada/desabilitada com style visibility e height
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

// Função para preencher todas as opções <select> das cidades de origem em relação a cidade de
// partida preenchida pelo usuário. Ele se atualiza automaticamente, sendo possível apenas
// colocar no origem as cidades que possuem disponibilidade
function mostrarOpcoesDePartida(){
    
    var cidadeDestinoInserido = document.getElementById("localDestino").value;
    fetch(`http://localhost:3000/listarPartida?localDestino=${encodeURIComponent(cidadeDestinoInserido)}`)
    .then(response => response.json())
    .then(data => {
        if (data.status === 'SUCCESS') {
            const localPartidaSelect = document.getElementById('localPartida');
            localPartidaSelect.innerHTML = '';

            data.payload.forEach(rowData => {
              const option = document.createElement('option');
              option.value = rowData[0]; // value do <select> para usar na outra busca
              option.textContent = rowData[0]; // o que aparece no <select>

              localPartidaSelect.appendChild(option);
            });

        } else {
            console.error(`Erro ao obter dados: ${data.message}`);
        }
    })
    .catch(error => console.error('Erro ao conectar:', error));
}