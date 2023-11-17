// uma função para pegar os dados preenchidos na reserva de voo e dar um select nos voos
// que condizem com os dados preenchidos

// funcao para conferir dados colocados
function idVooInserido(){
    let resultado = false;
    const vooInserido = document.getElementById("vooEscolhido").value;
    
    if (parseInt(vooInserido) > 0) {
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
function criarMapaAssentos(){
    // conferir o dado enviado
    var pStatus = document.getElementById("statusReserva");
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
    }
  
    const vooInserido = document.getElementById("vooEscolhido").value;
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
        
        // deve fazer a linha e depois imprimir, depois seguir para a proxima
    
        // passar por todas as colunas
        for (let i = 0; i < fileiras; i++) {
    
            // passar pela linha inteira
            for (let j = 0; j < colunas; j++) {
                cadeiraVez++; // conta em qual cadeira está
    
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
                    document.getElementById("mapaAssentos").innerHTML += `<button type="button" class="btn btn-info" style="margin: 3px" disabled>🪑</button>`;
                } else {
                    document.getElementById("mapaAssentos").innerHTML += `<button onClick="reservarCadeira(${cadeiraVez});" type="button" class="btn btn-info" style="margin: 3px">🪑</button>`;
                }
            }
    
            document.getElementById("mapaAssentos").innerHTML += `<br>`;
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

    // limpar mensagem de erro se tiver
    showStatusMessage("", true);

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

                rowData.forEach(cellData => {
                    const td = document.createElement('td');
                    td.textContent = cellData;
                    tr.appendChild(td);
                });

                // aqui imprime o proximo tr, colocando um ID para identificar cada linha
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
    const vooPreenchidoReserva = document.getElementById("vooEscolhido").value;
    console.log("Foi reservado a cadeira: ", cadeiraReservada);
    sessionStorage.setItem("reservaCadeira", cadeiraReservada);
    
    console.log("Foi escolhido o voo: ", vooPreenchidoReserva);

    // variáveis para uso posterior
    sessionStorage.setItem("assentoReservado", cadeiraReservada);
    sessionStorage.setItem("vooEscolhido", vooPreenchidoReserva);

    window.location.href = "/src/paginas/local/pagamento.html";
}