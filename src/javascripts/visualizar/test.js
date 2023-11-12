//var iGlobal = 0;

fetch('http://localhost:3000/listarAeronaves')
    .then(response => response.json())
    .then(data => {
        if (data.status === 'SUCCESS') {
            let i = 1;
            const tabelaDeAeronaves = document.getElementById('tabelaDeAeronaves');
            tabelaDeAeronaves.innerHTML = ''; // Limpa o conteúdo atual

            data.payload.forEach(rowData => {
                const tr = document.createElement('tr');

                rowData.forEach(cellData => {
                    const td = document.createElement('td');
                    td.textContent = cellData;
                    
                    tr.appendChild(td);
                });

                // controlador do ID do <tr>
                tr.id = i;
                i++;

                // adiciona a coluna de botões de exclusão
                const tdExcluir = document.createElement('td');
                const botaoExcluir = document.createElement('button');
                botaoExcluir.type = 'button'; // declarando os atributos do mesmo estilo que o bootstrap
                botaoExcluir.className = 'btn btn-danger';
                botaoExcluir.textContent = '🗑️';
                botaoExcluir.addEventListener('click', excluir(i)); // função excluir que passa i como argumento
                tdExcluir.appendChild(botaoExcluir);
                tr.appendChild(tdExcluir);

                // aqui imprime o proximo tr, colocando o ID para identificar cada linha
                tabelaDeAeronaves.appendChild(tr);
            });

            // Atualiza o contador de resultados
            var contadorElemento = document.getElementById("contadorResultados");
            contadorElemento.textContent = data.payload.length + ".";
            
        } else {
            console.error(`Erro ao obter dados: ${data.message}`);
        }
    })
    .catch(error => console.error('Erro ao conectar:', error));


function excluir(){

}
/*
// enviar mensagem de erro
function showStatusMessage(msg, error){
    var pStatus = document.getElementById("status");
    
    if (error === true) {
        pStatus.className = "text-danger"; // de acordo com o bootstrap
    } else {
        pStatus.className = "text-success";
    }
    
    pStatus.textContent = msg;
}

// funcao fetch do tipo deletar
function fetchDeletar(body) {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };

    return fetch('http://localhost:3000/ExcluirAeronave', requestOptions)
    .then(T => T.json())
}

// funcao para excluir
function excluir(idExcluir){
    if (!ids()) {
        showStatusMessage("ID deve ser preenchido.", true);
        return;
    }
    
    // const idInserido = document.getElementById("id").value;
    fetchDeletar({
        // lado esquerdo: as variaveis utilizadas devem ser as mesmas nos arquivos typescript
        id: idExcluir
     })
        
        .then(resultado => {
            // obteve resposta
            if (resultado.status === "SUCCESS") {
                showStatusMessage("Aeronave excluida!", false);
            } else {
                showStatusMessage("Erro ao excluir aeronave: " + message, true);
                console.log(resultado.message);
            }
        })
        
        .catch(()=>{
            showStatusMessage("Erro técnico ao excluir. Contate o suporte.", true);
            console.log("Falha grave ao excluir.")
        });
} */
