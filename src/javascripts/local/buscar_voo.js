// uma função para pegar os dados preenchidos na reserva de voo e dar um select nos voos
// que condizem com os dados preenchidos

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

    // limpar
    showStatusMessage("", true);
}

/*
fetch('http://localhost:3000/listarAeronaves')
    .then(response => response.json())
    .then(data => {
        if (data.status === 'SUCCESS') {
            const tabelaDeAeronaves = document.getElementById('tabelaDeAeronaves');
            tabelaDeAeronaves.innerHTML = ''; // Limpa o conteúdo atual

            data.payload.forEach(rowData => {
                const tr = document.createElement('tr');

                rowData.forEach(cellData => {
                    const td = document.createElement('td');
                    td.textContent = cellData;
                    tr.appendChild(td);
                });

                // aqui imprime o proximo tr
                tabelaDeAeronaves.appendChild(tr);
            });

            // Atualiza o contador de resultados
            var contadorElemento = document.getElementById("contadorResultados");
            contadorElemento.textContent = data.payload.length + ".";
            
        } else {
            console.error(`Erro ao obter dados: ${data.message}`);
        }
    })
    .catch(error => console.error('Erro ao conectar:', error)); */