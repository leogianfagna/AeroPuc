// uma função para pegar os dados preenchidos na reserva de voo e dar um select nos voos
// que condizem com os dados preenchidos

// vai tratar o dado inserido no tipo de passagem e exibir a nova <div>
function conferirTipoViagem(){
    var tipoPassagem = document.getElementById("dia").value;
    let resultado = false;
    var divTalvez = document.getElementById("talvez");
    divTalvez.style.display = "none";
    
    // conferir selecionado
    if (tipoPassagem !== 0) {
        resultado = true;
        console.log("tipo de passagem: ", tipoPassagem);
    }

    // exibir se necessário
    if (tipoPassagem === "ambos") {
        divTalvez.style.display = "block";
    }

    return resultado; 
}


// funções para tratar os dados inseridos
function testeData() {
    var datefrom = new Date();
    var dateto = new Date();

    var datefrom = document.getElementById("start").value;
    dateto = document.getElementById("start").value;

    console.log("data: ", datefrom);
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