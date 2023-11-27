function retonarTotalDeColunasDoAviao(){

    const voo = 5;

    fetch(`http://localhost:3000/listarLinhasEColunas?idDoVoo=${voo}`)
    .then(response => response.json())
    .then(data => {
        if (data.status === 'SUCCESS') {
            const resultado = data.payload;

            console.log("Colunas = ", resultado[0]);
            console.log("Assentos totais = ", resultado[1]);
            
        } else {
            console.error(`Erro ao obter dados: ${data.message}`);
        }
    })
    .catch(error => console.error('Erro ao conectar:', error));

}