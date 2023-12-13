// Função FETCH que executa uma busca no banco usando o comando SELECT * FROM <nome da tabela>
// O nome da tabela é passada como um argumento para utilizar a mesma função typescript
function imprimirDadosNaTabela(){

    fetch(`http://localhost:3000/queryTabelasAdministrativas?tabelaParaExecutarSelect=${"aeroportos"}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'SUCCESS') {
                let i = 0;
                const tabelaDeAeroportos = document.getElementById('tabelaDeAeroportos');
                tabelaDeAeroportos.innerHTML = ''; // Limpa o conteúdo atual

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
                    tabelaDeAeroportos.appendChild(tr);
                });

                // Atualiza o contador de resultados
                var contadorElemento = document.getElementById("contadorResultados");
                contadorElemento.textContent = data.payload.length;
                
            } else {
                console.error(`Erro ao obter dados: ${data.message}`);
            }
        })
        .catch(error => console.error('Erro ao conectar:', error));
}
imprimirDadosNaTabela();

// Função que vai re-imprimir a tabela, mas agora com os dados condizentes na busca
function buscarDadosPersonalizados(nomeDaTabela, nomeDaColuna){
    // Declaração das variáveis
    const dadoParaBuscarNaCondicao = document.getElementById("campoBusca").value;

    // Limpar a tabela atual do HTML
    tabelaDeAeroportos.innerHTML = '';

    // Função FETCH que executa uma busca no banco usando o comando SELECT * FROM <nome da tabela> WHERE "tipo de dado" = "busca"
    // O nome da tabela é passada como um argumento para utilizar a mesma função typescript
    fetch(`http://localhost:3000/queryOpcaoInseridaTabelaAdmin?tabelaQuery=${nomeDaTabela}&colunaQuery=${nomeDaColuna}&condicao=${dadoParaBuscarNaCondicao}`)
    .then(response => response.json())
    .then(data => {
        if (data.status === 'SUCCESS') {
            let i = 0;
            const tabelaDeAeroportos = document.getElementById('tabelaDeAeroportos');

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
                tabelaDeAeroportos.appendChild(tr);
            });

            // Atualiza o contador de resultados
            var contadorElemento = document.getElementById("contadorResultados");
            contadorElemento.textContent = data.payload.length;
            
        } else {
            console.error(`Erro ao obter dados: ${data.message}`);
        }
    })
    .catch(error => console.error('Erro ao conectar:', error));   
}