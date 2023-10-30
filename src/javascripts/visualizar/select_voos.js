// Assume que a resposta tem a seguinte estrutura:
// { status: 'SUCCESS', message: 'Dados obtidos', payload: [ /*...dados...*/ ] }

fetch('http://localhost:3000/listarVoos')
    .then(response => response.json())
    .then(data => {
        if (data.status === 'SUCCESS') {
            const tabelaDeVoos = document.getElementById('tabelaDeVoos');
            tabelaDeVoos.innerHTML = ''; // Limpa o conteúdo atual

            data.payload.forEach(rowData => {
                const tr = document.createElement('tr');

                rowData.forEach(cellData => {
                    const td = document.createElement('td');
                    td.textContent = cellData;
                    tr.appendChild(td);
                });

                tabelaDeVoos.appendChild(tr);
            });

            // Atualiza o contador de resultados
            var contadorElemento = document.getElementById("contadorResultados");
            contadorElemento.textContent = data.payload.length + ".";
            
        } else {
            console.error(`Erro ao obter dados: ${data.message}`);
        }
    })
    .catch(error => console.error('Erro ao conectar:', error));
