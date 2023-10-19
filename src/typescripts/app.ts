// typescript para apenas rodar o servidor
import express from "express";

// aplicação backend web com o frame work express
const app = express();
const port = 3000;

app.get("/", (req, res)=>{
    res.send("Estou funcionando na rota default /");
});

app.get("/clientes", (req, res)=>{
    res.send("Listagem dos clientes cadastrados, vai aparecer aqui")
});

app.listen(port, ()=>{
    console.log(`HTPP Server started on ${port} port`);
});

