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
function criarMapaAssentos(vooEscolhido, cadeiraSelecionadaNoMapa){
    const vooInserido = vooEscolhido;
    sessionStorage.setItem("vooEscolhido", vooInserido);

    // Função fetch que vai retornar em um array [colunas, assentos] do avião responsável pelo voo a ser reservado
    fetch(`http://localhost:3000/listarLinhasEColunas?idDoVoo=${vooEscolhido}`)
    .then(response => response.json())
    .then(data => {
        if (data.status === 'SUCCESS') {
            const resultado = data.payload;
            const NumeroDeColunasDoAviao = resultado[0];
            const NumeroDeAssentosDoAviao = resultado[1];
            
        // Função fetch que retorna os assentos reservados no banco de dados do voo escolhido para a reserva.
        // Caso seja sucesso, cria e imprime o mapa de assentos no HTML, usando o número de colunas e total
        // de assentos da função anterior como parâmetro para a impressão
        fetchResgatar(vooInserido)
        .then(data => {
            if (data.status === 'SUCCESS') {
                const assentosReservados = data.payload.map(row => row[0]); // Transformar o SELECT assentos (resultado da query) em array
                console.log('Assentos Reservados:', assentosReservados);

                const divReceberMapaAssentos = document.getElementById('mapaAssentos');
                divReceberMapaAssentos.innerHTML = ''; // Limpa o conteúdo atual
                
                const fileirasAviao = NumeroDeAssentosDoAviao / NumeroDeColunasDoAviao;
                let cadeiraVez = 0;
                let poltronaLetra = 65; // letra 'A' na tabela ASCII
                let fileiraIdentificacao;
                let letraExtra = "";

                // Criação do botão de confirmação de assento. Passa como variável para reservar a cadeira escolhida e confere
                // se ela foi definida (ou seja, o usuário clicou em um assento para escolher)
                if (cadeiraSelecionadaNoMapa === undefined) {
                    document.getElementById("mapaAssentos").innerHTML += `<button onClick="reservarCadeira(${cadeiraSelecionadaNoMapa});" type="button" class="btn btn-primary" style="margin: 5px" disabled>Confirmar assento</button>`;
                    document.getElementById("mapaAssentos").innerHTML += `<br>`;
                } else {
                    document.getElementById("mapaAssentos").innerHTML += `<button onClick="reservarCadeira(${cadeiraSelecionadaNoMapa});" type="button" class="btn btn-primary" style="margin: 5px">Confirmar assento</button>`;
                    document.getElementById("mapaAssentos").innerHTML += `<br>`;
                }
            
                // For para as fileiras
                for (let i = 0; i < fileirasAviao; i++) {
            
                    // For para cada assento da fileira. É aqui que ele imprime os botões (assentos) ou corredor
                    for (let j = 0; j < NumeroDeColunasDoAviao; j++) {
                        cadeiraVez++;
                        fileiraIdentificacao = String.fromCharCode(poltronaLetra) + letraExtra + (j + 1);
            
                        // Conferir se é um corredor
                        if (j === NumeroDeColunasDoAviao / 2) {
                            document.getElementById("mapaAssentos").innerHTML += `<button type="button" class="buttonCorredor" disabled></button>`;
                        }

                        // Checa se o ARRAY de assentosReservados possui o número cadeiraVez, para entender qual tipo de botão deve ser impresso
                        if (assentosReservados.includes(parseInt(cadeiraVez))) {
                            document.getElementById("mapaAssentos").innerHTML += `<button type="button" class="buttonMapaAssentoReservado" style="margin: 3px" disabled>${fileiraIdentificacao}</button>`;
                        } else if (cadeiraVez === cadeiraSelecionadaNoMapa) {
                            document.getElementById("mapaAssentos").innerHTML += `<button type="button" class="buttonMapaAssentoSelecionado" style="margin: 3px" disabled>${fileiraIdentificacao}</button>`;
                        } else {
                            document.getElementById("mapaAssentos").innerHTML += `<button onClick="criarMapaAssentos(${vooInserido}, ${cadeiraVez});" type="button" class="buttonMapaAssento" style="margin: 3px">${fileiraIdentificacao}</button>`;
                        }
                    }
            
                    // Criar uma nova coluna, pular linha e avançar uma letra para identificar as poltronas
                    document.getElementById("mapaAssentos").innerHTML += `<br>`;
                    poltronaLetra++;

                    if (poltronaLetra === 91) {
                        poltronaLetra = 65;
                        letraExtra = "A";
                    }
                }

                // Criação do botão de confirmação de assento. Passa como variável para reservar a cadeira escolhida e confere
                // se ela foi definida (ou seja, o usuário clicou em um assento para escolher)
                if (cadeiraSelecionadaNoMapa === undefined) {
                    document.getElementById("mapaAssentos").innerHTML += `<button onClick="reservarCadeira(${cadeiraSelecionadaNoMapa});" type="button" class="btn btn-primary" style="margin: 5px" disabled>Confirmar assento</button>`;
                } else {
                    document.getElementById("mapaAssentos").innerHTML += `<button onClick="reservarCadeira(${cadeiraSelecionadaNoMapa});" type="button" class="btn btn-primary" style="margin: 5px">Confirmar assento</button>`;
                }
                

            } else {
                console.error('Erro ao obter os assentos reservados:', data.message);
            }

    }).catch(error => {
          console.error('Erro ao fazer a requisição:', error);
    });
        } else {
            console.error(`Erro ao obter dados: ${data.message}`);
        }
    })
    .catch(error => console.error('Erro ao conectar:', error));
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
    desaparecerDivDados.style.visibility = 'hidden';

    var mostrarDivTabela = document.getElementById('tabelaResultados');
    mostrarDivTabela.style.opacity = '1';
    mostrarDivTabela.style.height = 'auto';
    mostrarDivTabela.style.visibility = 'visible';

    // Obter os dados do HTML e já prepara para enviar ao fetch (com encodeURIComponent)
    // Encode necessário por conta de caracteres especiais, espaços e símbolos nas datas
    const dataPartidaFetch = encodeURIComponent(document.getElementById("start").value);
    const dataVoltaFetch = encodeURIComponent(document.getElementById("back").value);
    const destinoFetch = encodeURIComponent(document.getElementById("localDestino").value);
    const origemFetch = encodeURIComponent(document.getElementById("localPartida").value);
    const incluiVoltaNaPassagem = encodeURIComponent(document.getElementById("tipoPassagem").value);
    var tipoDeBuscaSimplesOuAvancada = "simples";
    var checarMarcacaoCheckbox = document.getElementById("alterarOpcoesAvancadas");

    if (checarMarcacaoCheckbox.checked) {
        tipoDeBuscaSimplesOuAvancada = "avancado";
    }

    // função que vai utilizar parâmetros inseridos no HTML
    fetch(`http://localhost:3000/buscarVoosLista?localDestino=${destinoFetch}&localPartida=${origemFetch}&dataPreenchida=${dataPartidaFetch}&tipoDeVoo=${incluiVoltaNaPassagem}&tipoBusca=${tipoDeBuscaSimplesOuAvancada}&dataVoltaPreenchida=${dataVoltaFetch}`)
    .then(response => response.json())
    .then(data => {
        if (data.status === 'SUCCESS') {
            let i = 0;
            const tabelaDeAeronaves = document.getElementById('tabelaDeAeronaves');
            tabelaDeAeronaves.innerHTML = ''; // limpar o conteúdo atual

            // Payload é a propriedade definida pelo typescript, que é o resultado da query (assumindo que é um array)
            data.payload.forEach(rowData => {
                const tr = document.createElement('tr');
              
                // Itera sobre cada elemento do array rowData, sendo cellData o valor e o index indica a posição do elemento na linha
                rowData.forEach((cellData, index) => {
                const td = document.createElement('td');
            
                // Verifique se a coluna é a coluna ID
                if (index === 0) {
                    // declarando os atributos do mesmo estilo que o bootstrap
                    const botaoExcluir = document.createElement('button');
                    botaoExcluir.type = 'button'; 
                    botaoExcluir.className = 'btn btn-outline-info';
                    botaoExcluir.textContent = `Reservar`;
                    // Cada botão tem um ouvinte de evento "clique" para executar a função criarMapaAssentos baseado no número do voo/aeronave,
                    // que é cellData. 
                    botaoExcluir.addEventListener('click', () => criarMapaAssentos(`${cellData}`));
                    td.appendChild(botaoExcluir);

                } else {
                    td.textContent = cellData;
                }
            
                // appendChild adiciona elementos como "filhos" a outros elementos
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
    sessionStorage.setItem("assentoReservado", cadeiraReservada);
    window.location.href = "/src/paginas/local/pagamento/cartao_credito.html";
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