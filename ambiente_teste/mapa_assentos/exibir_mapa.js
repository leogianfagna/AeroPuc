// Faz uma requisição para obter os assentos reservados

fetch('http://localhost:3000/listarAssentosReservados')
  .then(response => response.json())
  .then(data => {
    if (data.status === 'SUCCESS') {
      const assentosReservados = data.payload.map(row => row.ASSSENTO);
      console.log('Assentos Reservados:', assentosReservados);

      // Agora você pode manipular o array 'assentosReservados' conforme necessário.
    } else {
      console.error('Erro ao obter os assentos reservados:', data.message);
    }
  })
  .catch(error => {
    console.error('Erro ao fazer a requisição:', error);
  });
