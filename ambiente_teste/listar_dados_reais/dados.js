// Assume que a resposta tem a seguinte estrutura:
// { status: 'SUCCESS', message: 'Dados obtidos', payload: [ /*...dados...*/ ] }

fetch('http://localhost:3000/listarAeronaves')
    .then(response => response.json())
    .then(data => {
        if (data.status === 'SUCCESS') {
            const tabelaCorpo = document.getElementById('tabelaCorpo');
            tabelaCorpo.innerHTML = ''; // Limpa o conteúdo atual

            data.payload.forEach(rowData => {
                const tr = document.createElement('tr');

                rowData.forEach(cellData => {
                    const td = document.createElement('td');
                    td.textContent = cellData;
                    tr.appendChild(td);
                });

                tabelaCorpo.appendChild(tr);
            });
        } else {
            console.error(`Erro ao obter dados: ${data.message}`);
        }
    })
    .catch(error => console.error('Erro ao conectar:', error));
