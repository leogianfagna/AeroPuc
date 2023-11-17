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
  if(!idVooInserido()){
    showStatusMessage("ID do voo não preenchido corretamente.", true);  
    return;
  } else {
    // limpar o dado caso ele tenha preenchido anteriormente de forma incorreta
    showStatusMessage("", true);  
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
                  document.getElementById("mapaAssentos").innerHTML += `<button type="button" class="btn btn-info" style="margin: 3px">🪑</button>`;
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