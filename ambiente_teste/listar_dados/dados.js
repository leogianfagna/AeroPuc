// Função para gerar um número inteiro aleatório dentro de um intervalo
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  // Gera dados aleatórios para simular uma consulta ao banco de dados
  function gerarDadosAleatorios() {
    const dados = [];
  
    for (let i = 1; i <= 10; i++) {
      const id = i;
      const nome = `Item ${i}`;
      const quantidade = getRandomInt(1, 100);
      const preco = (Math.random() * 1000).toFixed(2); // Gera um valor decimal aleatório
  
      dados.push([id, nome, quantidade, preco]);
    }
  
    return dados;
  }
  
  // Obtém os dados aleatórios
  const dadosAleatorios = gerarDadosAleatorios();
  
  // Constrói a tabela HTML
  const tbody = document.querySelector('tbody');
  
  dadosAleatorios.forEach(rowData => {
    const tr = document.createElement('tr');
  
    rowData.forEach(cellData => {
      const td = document.createElement('td');
      td.textContent = cellData;
      tr.appendChild(td);
    });
  
    tbody.appendChild(tr);
  });
  