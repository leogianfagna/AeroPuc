// bibliotecas importadas
import express from "express";
import oracledb, { Connection, ConnectionAttributes } from "oracledb";
import dotenv from "dotenv";
import cors from "cors";

// configurações da conexão
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

dotenv.config();

// tipo de resposta da conexão
type CustomResponse = {
  status: string,
  message: string,
  payload: any
};

// função listen do servidor
app.listen(port,()=>{
  console.log("Servidor HTTP ligado.");
});

// aeronaves = executar select
app.get("/listarAeronaves", async(req,res)=>{

  let cr: CustomResponse = {
      status: "ERROR", 
      message: "", 
      payload: undefined,
  };
  
  try {
    const connAttibs: ConnectionAttributes = {
      user: process.env.ORACLE_DB_USER,
      password: process.env.ORACLE_DB_PASSWORD,
      connectionString: process.env.ORACLE_CONN_STR,
    }

    const connection = await oracledb.getConnection(connAttibs);
    let resultadoConsulta = await connection.execute("SELECT * FROM aeronaves");
  
    await connection.close();
    cr.status = "SUCCESS"; 
    cr.message = "Dados obtidos";
    cr.payload = resultadoConsulta.rows;

  } catch(e) {
    if (e instanceof Error) {
      cr.message = e.message;
      console.log(e.message);
    } else {
      cr.message = "Erro ao conectar ao oracle. Sem detalhes";
    }
  } finally {
    res.send(cr);  
  }
});

// aeronaves = executar select
app.get("/listarMapaAssentos", async(req,res)=>{

  let cr: CustomResponse = {
      status: "ERROR", 
      message: "", 
      payload: undefined,
  };
  
  try {
    const connAttibs: ConnectionAttributes = {
      user: process.env.ORACLE_DB_USER,
      password: process.env.ORACLE_DB_PASSWORD,
      connectionString: process.env.ORACLE_CONN_STR,
    }

    const connection = await oracledb.getConnection(connAttibs);
    let resultadoConsulta = await connection.execute("SELECT * FROM mapa_assentos ORDER BY voo ASC, assento ASC");
  
    await connection.close();
    cr.status = "SUCCESS"; 
    cr.message = "Dados obtidos";
    cr.payload = resultadoConsulta.rows;

  } catch(e) {
    if (e instanceof Error) {
      cr.message = e.message;
      console.log(e.message);
    } else {
      cr.message = "Erro ao conectar ao oracle. Sem detalhes";
    }
  } finally {
    res.send(cr);  
  }
});

// clientes = executar select
app.get("/listarClientes", async(req,res)=>{

  let cr: CustomResponse = {
      status: "ERROR", 
      message: "", 
      payload: undefined,
  };
  
  try {
    const connAttibs: ConnectionAttributes = {
      user: process.env.ORACLE_DB_USER,
      password: process.env.ORACLE_DB_PASSWORD,
      connectionString: process.env.ORACLE_CONN_STR,
    }

    const connection = await oracledb.getConnection(connAttibs);
    let resultadoConsulta = await connection.execute("SELECT * FROM cliente");
  
    await connection.close();
    cr.status = "SUCCESS"; 
    cr.message = "Dados obtidos";
    cr.payload = resultadoConsulta.rows;

  } catch(e) {
    if (e instanceof Error) {
      cr.message = e.message;
      console.log(e.message);
    } else {
      cr.message = "Erro ao conectar ao oracle. Sem detalhes";
    }
  } finally {
    res.send(cr);  
  }
});

// função get para conseguir as cidades de origem, baseado na cidade 
// destino que o usuário registrou
app.get("/listarCidadesDestino", async(req,res)=>{
  var busca = req.query.voo as string;
  // busca = "Campinas";

  let cr: CustomResponse = {
      status: "ERROR", 
      message: "", 
      payload: undefined,
  };
  
  try {
    const connAttibs: ConnectionAttributes = {
      user: process.env.ORACLE_DB_USER,
      password: process.env.ORACLE_DB_PASSWORD,
      connectionString: process.env.ORACLE_CONN_STR,
    }

    const connection = await oracledb.getConnection(connAttibs);

    let resultadoConsulta = await connection.execute("SELECT origem FROM trajetos WHERE destino = 'campinas' ORDER BY origem ASC");
    console.log("Busca SQL: ", resultadoConsulta);
  
    await connection.close();
    cr.status = "SUCCESS"; 
    cr.message = "Dados obtidos";
    cr.payload = resultadoConsulta.rows;

  } catch(e) {
    if (e instanceof Error) {
      cr.message = e.message;
      console.log(e.message);
    } else {
      cr.message = "Erro ao conectar ao oracle. Sem detalhes";
    }
  } finally {
    res.send(cr);  
  }
});

// clientes = executar select somente na cadeira reservada
app.get("/listarAssentosReservados", async(req,res)=>{
  const numeroVoo = req.query.voo as string;

  let cr: CustomResponse = {
      status: "ERROR", 
      message: "", 
      payload: undefined,
  };
  
  try {
    const connAttibs: ConnectionAttributes = {
      user: process.env.ORACLE_DB_USER,
      password: process.env.ORACLE_DB_PASSWORD,
      connectionString: process.env.ORACLE_CONN_STR,
    }

    const connection = await oracledb.getConnection(connAttibs);
    
    console.log("Num recebido: ", numeroVoo);
    let resultadoConsulta = await connection.execute("select assento from mapa_assentos where status = 'Indisponível' and voo = :numeroVoo ORDER BY assento ASC", [numeroVoo]);
    console.log("resultado consulta: ", resultadoConsulta);
  
    await connection.close();
    cr.status = "SUCCESS"; 
    cr.message = "Dados obtidos";
    cr.payload = resultadoConsulta.rows;

  } catch(e) {
    if (e instanceof Error) {
      cr.message = e.message;
      console.log(e.message);
    } else {
      cr.message = "Erro ao conectar ao oracle. Sem detalhes";
    }
  } finally {
    res.send(cr);  
  }
});

// buscar os voos baseado nas datas e informações inseridas
// por enquanto só fazendo pela data
app.get("/buscarVoosLista", async(req,res)=>{
  var dataPartida = req.query.dataPreenchida as string;
  var localViagemDestino = req.query.localDestino as string;
  var localViagemOrigem = req.query.localPartida as string;

  console.log("Local destino:", localViagemDestino);
  console.log("Local partida:", localViagemOrigem);

  let cr: CustomResponse = {
      status: "ERROR", 
      message: "", 
      payload: undefined,
  };
  
  try {
    const connAttibs: ConnectionAttributes = {
      user: process.env.ORACLE_DB_USER,
      password: process.env.ORACLE_DB_PASSWORD,
      connectionString: process.env.ORACLE_CONN_STR,
    }

    const connection = await oracledb.getConnection(connAttibs);
    // let resultadoConsulta = await connection.execute(`SELECT id FROM trajetos WHERE destino = '${localViagemDestino}'`);
    
    let resultadoConsulta = await connection.execute(`SELECT voos.* FROM voos JOIN trajetos ON voos.trajeto = trajetos.id WHERE trajetos.origem = '${localViagemOrigem}' AND trajetos.destino = '${localViagemDestino}' AND voos.data_ida = '${dataPartida}'`); // AND voos.data_volta = '2023-11-08'

    await connection.close();
    cr.status = "SUCCESS"; 
    cr.message = "Dados obtidos";
    cr.payload = resultadoConsulta.rows;

  } catch(e) {
    if (e instanceof Error) {
      cr.message = e.message;
      console.log(e.message);
    } else {
      cr.message = "Erro ao conectar ao oracle. Sem detalhes";
    }
  } finally {
    res.send(cr);  
  }
});

// cliente = inserir modo administrativo
app.put("/inserirCliente", async(req,res)=>{
  const nome = req.body.nome as string;
  const email = req.body.email as string;
  const assento = req.body.assento as number;
  const voo = req.body.voo as number;

  let cr: CustomResponse = {
    status: "ERROR",
    message: "",
    payload: undefined,
  };

  let conn;

  try {
    conn = await oracledb.getConnection({
      user: process.env.ORACLE_DB_USER,
      password: process.env.ORACLE_DB_PASSWORD,
      connectionString: process.env.ORACLE_CONN_STR,
    });

    const cmdInsertAero = `INSERT INTO cliente
    (id, nome, email, assento, voo)
    VALUES (aeronaves_id.nextval, :1, :2, :3, :4)`;

    const dados = [nome, email, assento, voo];
    let resInsert = await conn.execute(cmdInsertAero, dados);
    
    await conn.commit();
    const rowsInserted = resInsert.rowsAffected;
    
    if (rowsInserted !== undefined && rowsInserted === 1) {
      cr.status = "SUCCESS"; 
      cr.message = "Aeronave inserida.";
    }

  } catch(e) {
    if (e instanceof Error) {
      cr.message = e.message;
      console.log(e.message);
    } else {
      cr.message = "Erro ao conectar ao oracle. Sem detalhes";
    }
  } finally {
    if (conn!== undefined) {
      await conn.close();
    }
    res.send(cr);  
  }
});

// função para setar uma cadeira como indisponível, ou seja, reservada
app.post("/reservarCadeira", async(req,res)=>{
  const vooReserva = req.body.vooReserva as number;
  const cadeiraReserva = req.body.cadeiraReserva as number;

  let cr: CustomResponse = {
    status: "ERROR",
    message: "",
    payload: undefined,
  };

  try {
    const connection = await oracledb.getConnection({
      user: process.env.ORACLE_DB_USER,
      password: process.env.ORACLE_DB_PASSWORD,
      connectionString: process.env.ORACLE_CONN_STR,
    });

    console.log("voo: ", vooReserva);
    console.log("voo: ", cadeiraReserva);
    const cmdUpdateAero = `UPDATE mapa_assentos SET status = 'Indisponível' WHERE voo = :1 AND assento = :2`
    const dados = [vooReserva, cadeiraReserva];

    let resUpdate = await connection.execute(cmdUpdateAero, dados);
    await connection.commit();
    const rowsUpdated = resUpdate.rowsAffected;
    console.log("Linhas afetadas:", rowsUpdated);
    
    if (rowsUpdated !== undefined && rowsUpdated === 1) {
      cr.status = "SUCCESS"; 
      cr.message = "Aeronave alterada.";
    } else {
      cr.message = "Aeronave não alterada. Verifique se o código informado está correto.";
      await connection.close();
    }

  } catch(e){
    if(e instanceof Error){
      cr.message = e.message;
      console.log(e.message);
    } else {
      cr.message = "Erro ao conectar ao oracle. Sem detalhes";
    }
  }
  finally {
    res.send(cr);  
  }
});

// aeronaves = inserir
app.put("/inserirAeronave", async(req,res)=>{
  const fabricante = req.body.fabricante as string;
  const modelo = req.body.modelo as string;
  const registro = req.body.registro as number;
  const qtdeAssentos = req.body.qtdeAssentos as number;
  const anoFab = req.body.anoFab as number;

  let cr: CustomResponse = {
    status: "ERROR",
    message: "",
    payload: undefined,
  };

  let conn;

  try {
    conn = await oracledb.getConnection({
      user: process.env.ORACLE_DB_USER,
      password: process.env.ORACLE_DB_PASSWORD,
      connectionString: process.env.ORACLE_CONN_STR,
    });

    const cmdInsertAero = `INSERT INTO aeronaves
    (id, numero_identificacao, fabricante, modelo, assentos, ano_fabricacao)
    VALUES (aeronaves_id.nextval, :1, :2, :3, :4, :5)`;

    const dados = [registro, fabricante, modelo, qtdeAssentos, anoFab];
    let resInsert = await conn.execute(cmdInsertAero, dados);
    
    await conn.commit();
    const rowsInserted = resInsert.rowsAffected;
    
    if (rowsInserted !== undefined && rowsInserted === 1) {
      cr.status = "SUCCESS"; 
      cr.message = "Aeronave inserida.";
    }

  } catch(e) {
    if (e instanceof Error) {
      cr.message = e.message;
      console.log(e.message);
    } else {
      cr.message = "Erro ao conectar ao oracle. Sem detalhes";
    }
  } finally {
    if (conn!== undefined) {
      await conn.close();
    }
    res.send(cr);  
  }
});

// aeronaves = excluir
app.delete("/excluirAeronave", async(req,res)=>{
  
  const id = req.body.id as number;
  let cr: CustomResponse = {
    status: "ERROR",
    message: "",
    payload: undefined,
  };

    try {
      const connection = await oracledb.getConnection({
         user: process.env.ORACLE_DB_USER,
         password: process.env.ORACLE_DB_PASSWORD,
         connectionString: process.env.ORACLE_CONN_STR,
      });
  
      const cmdDeleteAero = `DELETE FROM aeronaves WHERE id = :1`
      const dados = [id];
  
      let resDelete = await connection.execute(cmdDeleteAero, dados);
      
      await connection.commit();
      await connection.close();
      const rowsDeleted = resDelete.rowsAffected;
      
      if (rowsDeleted !== undefined &&  rowsDeleted === 1) {
        cr.status = "SUCCESS"; 
        cr.message = "Aeronave excluída.";
      } else {
        cr.message = "Aeronave não excluída. Verifique se o código informado está correto.";
      }
  
    } catch(e) {
      if (e instanceof Error) {
        cr.message = e.message;
        console.log(e.message);
      } else {
        cr.message = "Erro ao conectar ao oracle. Sem detalhes";
      }
    } finally {
      res.send(cr);  
    }
});

// aeronaves = alterar
app.post("/alterarAeronave", async(req,res)=>{
  const id = req.body.id as number;
  const fabricante = req.body.fabricante as string;
  const modelo = req.body.modelo as string;
  const qtdeAssentos = req.body.qtdeAssentos as number;
  const anoFab = req.body.anoFab as number;
  const registro = req.body.registro as number;
  
  let cr: CustomResponse = {
    status: "ERROR",
    message: "",
    payload: undefined,
  };

  try{
    const connection = await oracledb.getConnection({
      user: process.env.ORACLE_DB_USER,
      password: process.env.ORACLE_DB_PASSWORD,
      connectionString: process.env.ORACLE_CONN_STR,
    });

    const cmdUpdateAero = `UPDATE aeronaves SET fabricante = 'nada' WHERE id = 102`
    // const dados = [id, registro];

    let resUpdate = await connection.execute(cmdUpdateAero);
    await connection.commit();
    const rowsUpdated = resUpdate.rowsAffected;
    console.log("Linhas afetadas:", rowsUpdated);
    
    if (rowsUpdated !== undefined && rowsUpdated === 1) {
      cr.status = "SUCCESS"; 
      cr.message = "Aeronave alterada.";
    } else {
      cr.message = "Aeronave não alterada. Verifique se o código informado está correto.";
      await connection.close();
    }

  } catch(e){
    if(e instanceof Error){
      cr.message = e.message;
      console.log(e.message);
    } else {
      cr.message = "Erro ao conectar ao oracle. Sem detalhes";
    }
  }
  finally {
    res.send(cr);  
  }
});

// aeroportos = listar
app.get("/listarAeroportos", async(req,res)=>{

  let cr: CustomResponse = {
      status: "ERROR", 
      message: "", 
      payload: undefined,};
  
  try{
    const connAttibs: ConnectionAttributes = {
      user: process.env.ORACLE_DB_USER,
      password: process.env.ORACLE_DB_PASSWORD,
      connectionString: process.env.ORACLE_CONN_STR,
    }
    
    const connection = await oracledb.getConnection(connAttibs);
    let resultadoConsulta = await connection.execute("SELECT * FROM aeroportos");
  
    await connection.close();
    cr.status = "SUCCESS"; 
    cr.message = "Dados obtidos";
    cr.payload = resultadoConsulta.rows;

  }catch(e){
    if(e instanceof Error){
      cr.message = e.message;
      console.log(e.message);
    }else{
      cr.message = "Erro ao conectar ao oracle. Sem detalhes";
    }
  } finally {
    res.send(cr);  
  }
});

// aeroportos = inserir
app.put("/inserirAeroporto", async(req,res)=>{
  const aeroporto = req.body.aeroporto as string;
  const cidade = req.body.cidade as string;

  let cr: CustomResponse = {
    status: "ERROR",
    message: "",
    payload: undefined,
  };

  let conn;
  
  try {
    conn = await oracledb.getConnection({
        user: process.env.ORACLE_DB_USER,
        password: process.env.ORACLE_DB_PASSWORD,
        connectionString: process.env.ORACLE_CONN_STR,
    });

    const cmdInsertAero = `INSERT INTO aeroportos 
    VALUES(aeroportos_id.nextval,:1, :2)`
    const dados = [aeroporto, cidade];
    
    let resInsert = await conn.execute(cmdInsertAero, dados);
    await conn.commit();
    const rowsInserted = resInsert.rowsAffected;
    
    if (rowsInserted !== undefined &&  rowsInserted === 1) {
      cr.status = "SUCCESS"; 
      cr.message = "Aeroporto inserido.";
    }

  } catch(e) {
    if (e instanceof Error) {
      cr.message = e.message;
      console.log(e.message);
    } else {
      cr.message = "Erro ao conectar ao oracle. Sem detalhes";
    }
  } finally {
    if (conn!== undefined) {
      await conn.close();
    }
    
    res.send(cr);  
  }
});

// aeroportos - excluir
app.delete("/excluirAeroporto", async(req,res)=>{
  const id = req.body.id as number;
  
  let cr: CustomResponse = {
    status: "ERROR",
    message: "",
    payload: undefined,
  };

  try {
    const connection = await oracledb.getConnection({
        user: process.env.ORACLE_DB_USER,
        password: process.env.ORACLE_DB_PASSWORD,
        connectionString: process.env.ORACLE_CONN_STR,
    });

    const cmdDeleteAero = `DELETE FROM aeroportos WHERE id = :1`
    const dados = [id];

    let resDelete = await connection.execute(cmdDeleteAero, dados);
    await connection.commit();
    await connection.close();
    const rowsDeleted = resDelete.rowsAffected;
    
    if (rowsDeleted !== undefined && rowsDeleted === 1) {
      cr.status = "SUCCESS"; 
      cr.message = "Aeroporto excluída.";
    } else {
      cr.message = "Aeroporto não excluída. Verifique se o código informado está correto.";
    }

  } catch(e) {
    if (e instanceof Error) {
      cr.message = e.message;
      console.log(e.message);
    } else{ 
      cr.message = "Erro ao conectar ao oracle. Sem detalhes.";
    }
  } finally {
    res.send(cr);  
  }
});

// aeroportos - alterar
app.put("/alterarAeroporto", async(req,res)=>{
  const id = req.body.id as number;
  const aeroporto = req.body.aeroporto as string;
  const cidade = req.body.cidade as string;
   
  let cr: CustomResponse = {
    status: "ERROR",
    message: "",
    payload: undefined,
  };

  try {
    const connection = await oracledb.getConnection({
      user: process.env.ORACLE_DB_USER,
      password: process.env.ORACLE_DB_PASSWORD,
      connectionString: process.env.ORACLE_CONN_STR,
    });

    const cmdUpdateAero = `UPDATE aeroportos SET aeroporto = :2,
     cidade = :3 WHERE id = :1`
    const dados = [id, aeroporto,cidade];

    let resUpdate = await connection.execute(cmdUpdateAero, dados);
    
    await connection.commit();
    await connection.close();
    const rowsUpdated = resUpdate.rowsAffected;
    
    if (rowsUpdated !== undefined && rowsUpdated === 1) {
      cr.status = "SUCCESS"; 
      cr.message = "Aeroporto alterado.";
    } else {
      cr.message = "Aeroporto não alterado. Verifique se o código informado está correto.";
    }

  } catch(e) {
    if (e instanceof Error) {
      cr.message = e.message;
      console.log(e.message);
    } else {
      cr.message = "Erro ao conectar ao oracle. Sem detalhes";
    }
  } finally {
    res.send(cr);  
  }
});

// cidades = executar select
app.get("/listarCidades", async(req,res)=>{

  let cr: CustomResponse = {
      status: "ERROR", 
      message: "", 
      payload: undefined,};

  try {
    const connAttibs: ConnectionAttributes = {
      user: process.env.ORACLE_DB_USER,
      password: process.env.ORACLE_DB_PASSWORD,
      connectionString: process.env.ORACLE_CONN_STR,
    }
    
    const connection = await oracledb.getConnection(connAttibs);
    let resultadoConsulta = await connection.execute("SELECT * FROM cidades");
  
    await connection.close();
    cr.status = "SUCCESS"; 
    cr.message = "Dados obtidos";
    cr.payload = resultadoConsulta.rows;

  } catch(e) {
    if (e instanceof Error) {
      cr.message = e.message;
      console.log(e.message);
    } else {
      cr.message = "Erro ao conectar ao oracle. Sem detalhes.";
    }
  } finally {
    res.send(cr);  
  }
});

// cidades - inserir
app.put("/inserirCidade", async(req,res)=>{
  const cidade = req.body.cidade as string;
  const estado = req.body.estado as string;
  const pais = req.body.pais as number; 

  let cr: CustomResponse = {
    status: "ERROR",
    message: "",
    payload: undefined,
  };

  let conn;

  try {
    conn = await oracledb.getConnection({
        user: process.env.ORACLE_DB_USER,
        password: process.env.ORACLE_DB_PASSWORD,
        connectionString: process.env.ORACLE_CONN_STR,
    });

    const cmdInsertAero = `INSERT INTO cidades
    VALUES(cidades_id.nextval,:1, :2, :3)`
    const dados = [cidade,estado,pais];
    
    let resInsert = await conn.execute(cmdInsertAero, dados);
    await conn.commit();
    const rowsInserted = resInsert.rowsAffected;
    
    if (rowsInserted !== undefined && rowsInserted === 1) {
      cr.status = "SUCCESS"; 
      cr.message = "Cidade inserida.";
    }

  } catch(e) {
    if (e instanceof Error) {
      cr.message = e.message;
      console.log(e.message);
    } else {
      cr.message = "Erro ao conectar ao oracle. Sem detalhes";
    }
  } finally {
    if (conn!== undefined) {
      await conn.close();
    }
    res.send(cr);  
  }
});

// cidade - excluir
app.delete("/excluirCidade", async(req,res)=>{
  const id = req.body.id as number;
  
  let cr: CustomResponse = {
    status: "ERROR",
    message: "",
    payload: undefined,
  };

  try {
    const connection = await oracledb.getConnection({
        user: process.env.ORACLE_DB_USER,
        password: process.env.ORACLE_DB_PASSWORD,
        connectionString: process.env.ORACLE_CONN_STR,
    });

    const cmdDeleteAero = `DELETE FROM cidades WHERE id = :1`
    const dados = [id];

    let resDelete = await connection.execute(cmdDeleteAero, dados);
    await connection.commit();
    await connection.close();
    const rowsDeleted = resDelete.rowsAffected;
    
    if (rowsDeleted !== undefined && rowsDeleted === 1) {
      cr.status = "SUCCESS"; 
      cr.message = "Cidade excluída.";
    } else {
      cr.message = "Cidade não excluída. Verifique se o código informado está correto.";
    }

  } catch(e) {
    if (e instanceof Error) {
      cr.message = e.message;
      console.log(e.message);
    } else {
      cr.message = "Erro ao conectar ao oracle. Sem detalhes.";
    }
  } finally {
    res.send(cr);  
  }
});

// cidades - alterar
app.put("/alterarCidade", async(req,res)=>{
  const id = req.body.id as number;
  const cidade = req.body.cidade as string;
  const estado = req.body.estado as string;
  const pais = req.body.pais as number;
  
  let cr: CustomResponse = {
    status: "ERROR",
    message: "",
    payload: undefined,
  };

  try {
    const connection = await oracledb.getConnection({
       user: process.env.ORACLE_DB_USER,
       password: process.env.ORACLE_DB_PASSWORD,
       connectionString: process.env.ORACLE_CONN_STR,
    });

    const cmdUpdateAero = `UPDATE aeronaves SET cidade = :2,
     estado = :3, pais = :4 WHERE id = :1`
    const dados = [id, cidade, estado, pais];

    let resUpdate = await connection.execute(cmdUpdateAero, dados);
    await connection.commit();
    await connection.close();
    const rowsUpdated = resUpdate.rowsAffected;
    
    if (rowsUpdated !== undefined && rowsUpdated === 1) {
      cr.status = "SUCCESS"; 
      cr.message = "Cidade alterada.";
    } else {
      cr.message = "Cidade não alterada. Verifique se o código informado está correto.";
    }

  } catch(e) {
    if (e instanceof Error) {
      cr.message = e.message;
      console.log(e.message);
    } else {
      cr.message = "Erro ao conectar ao oracle. Sem detalhes.";
    }
  } finally {
    res.send(cr);  
  }
});

// mapa de assentos - executar select
app.get("/listarMapa", async(req,res)=>{
  let cr: CustomResponse = {
      status: "ERROR", 
      message: "", 
      payload: undefined,
  };

  try {
    const connAttibs: ConnectionAttributes = {
      user: process.env.ORACLE_DB_USER,
      password: process.env.ORACLE_DB_PASSWORD,
      connectionString: process.env.ORACLE_CONN_STR,
    }
    
    const connection = await oracledb.getConnection(connAttibs);
    
    let resultadoConsulta = await connection.execute("SELECT * FROM mapa_assentos");
  
    await connection.close();
    cr.status = "SUCCESS"; 
    cr.message = "Dados obtidos";
    cr.payload = resultadoConsulta.rows;

  } catch(e) {
    if (e instanceof Error) {
      cr.message = e.message;
      console.log(e.message);
    } else {
      cr.message = "Erro ao conectar ao oracle. Sem detalhes";
    }
  } finally {
    res.send(cr);  
  }
});

// mapa de assentos - inserir
app.put("/inserirMapa", async(req,res)=>{
  const fileiras = req.body.fileiras as number;
  const colunas = req.body.colunas as number;
  const total_assentos = req.body.total_assentos as number; 
  const aeronave = req.body.aeronave as string;

  let cr: CustomResponse = {
    status: "ERROR",
    message: "",
    payload: undefined,
  };

  let conn;

  try {
    conn = await oracledb.getConnection({
        user: process.env.ORACLE_DB_USER,
        password: process.env.ORACLE_DB_PASSWORD,
        connectionString: process.env.ORACLE_CONN_STR,
    });

    const cmdInsertAero = `INSERT INTO aeronaves 
    VALUES(aeronaves_id.nextval,:1, :2, :3, :4)`
    const dados = [fileiras, colunas, total_assentos, aeronave];
    
    let resInsert = await conn.execute(cmdInsertAero, dados);
    await conn.commit();
    const rowsInserted = resInsert.rowsAffected;
    
    if (rowsInserted !== undefined && rowsInserted === 1) {
      cr.status = "SUCCESS"; 
      cr.message = "Mapa de assentos inserido.";
    }

  } catch(e) {
    if (e instanceof Error) {
      cr.message = e.message;
      console.log(e.message);
    } else {
      cr.message = "Erro ao conectar ao oracle. Sem detalhes.";
    }
  } finally {
    if(conn!== undefined){
      await conn.close();
    }
    res.send(cr);  
  }
});

// mapa de assentos - excluir
app.delete("/excluirMapa", async(req,res)=>{
  const id = req.body.id as number;
  
  let cr: CustomResponse = {
    status: "ERROR",
    message: "",
    payload: undefined,
  };

  try {
    const connection = await oracledb.getConnection({
        user: process.env.ORACLE_DB_USER,
        password: process.env.ORACLE_DB_PASSWORD,
        connectionString: process.env.ORACLE_CONN_STR,
    });

    const cmdDeleteAero = `DELETE FROM mapa_assentos WHERE id = :1`
    const dados = [id];

    let resDelete = await connection.execute(cmdDeleteAero, dados);
    await connection.commit();
    await connection.close();
    const rowsDeleted = resDelete.rowsAffected;
    
    if (rowsDeleted !== undefined && rowsDeleted === 1) {
      cr.status = "SUCCESS"; 
      cr.message = "Mapa de assentos excluído.";
    } else {
      cr.message = "Mapa de assentos não excluído. Verifique se o código informado está correto.";
    }

  } catch(e) {
    if (e instanceof Error) {
      cr.message = e.message;
      console.log(e.message);
    } else {
      cr.message = "Erro ao conectar ao oracle. Sem detalhes.";
    }
  } finally {
    res.send(cr);
  }
});

// alterar mapa de assentos
app.put("/alterarMapa", async(req,res)=>{
  const id = req.body.id as number;
  const fileiras = req.body.fileiras as number;
  const colunas = req.body.colunas as number;
  const total_assentos = req.body.total_assentos as number; 
  const aeronave = req.body.aeronave as string;
  
  let cr: CustomResponse = {
    status: "ERROR",
    message: "",
    payload: undefined,
  };

  try {
    const connection = await oracledb.getConnection({
       user: process.env.ORACLE_DB_USER,
       password: process.env.ORACLE_DB_PASSWORD,
       connectionString: process.env.ORACLE_CONN_STR,
    });

    const cmdUpdateAero = `UPDATE mapa_assentos SET fileiras = :2,
     colunas = :3, total_assentos = :4, aeronave = :5  WHERE id = :1`
    const dados = [id, fileiras, colunas, total_assentos, aeronave];

    let resUpdate = await connection.execute(cmdUpdateAero, dados);
    await connection.commit();
    await connection.close();
    const rowsUpdated = resUpdate.rowsAffected;
    
    if (rowsUpdated !== undefined &&  rowsUpdated === 1) {
      cr.status = "SUCCESS"; 
      cr.message = "Mapa de assentos alterado.";
    } else {
      cr.message = "Mapa de assentos não alterado. Verifique se o código informado está correto.";
    }

  } catch(e) {
    if (e instanceof Error) {
      cr.message = e.message;
      console.log(e.message);
    } else {
      cr.message = "Erro ao conectar ao oracle. Sem detalhes";
    }
  } finally {
    res.send(cr);  
  }
});

// trajetos - executar select
app.get("/listarTrajetos", async(req,res)=>{

  let cr: CustomResponse = {
      status: "ERROR", 
      message: "", 
      payload: undefined,
  };

  try {
    const connAttibs: ConnectionAttributes = {
      user: process.env.ORACLE_DB_USER,
      password: process.env.ORACLE_DB_PASSWORD,
      connectionString: process.env.ORACLE_CONN_STR,
    }
    
    const connection = await oracledb.getConnection(connAttibs);
    let resultadoConsulta = await connection.execute("SELECT * FROM trajetos ORDER BY id ASC");

    await connection.close();
    cr.status = "SUCCESS"; 
    cr.message = "Dados obtidos";
    cr.payload = resultadoConsulta.rows;

  } catch(e) {
    if (e instanceof Error) {
      cr.message = e.message;
      console.log(e.message);
    } else {
      cr.message = "Erro ao conectar ao oracle. Sem detalhes";
    }
  } finally {
    res.send(cr);  
  }
});

// trajetos - inserir
app.put("/inserirTrajeto", async(req,res)=>{
  const origem = req.body.origem as string;
  const destino = req.body.destino as string; 
  const duracao = req.body.duracao as string;
  const tipo = req.body.tipo as string;

  let cr: CustomResponse = {
    status: "ERROR",
    message: "",
    payload: undefined,
  };

  let conn;

  try {
    conn = await oracledb.getConnection({
        user: process.env.ORACLE_DB_USER,
        password: process.env.ORACLE_DB_PASSWORD,
        connectionString: process.env.ORACLE_CONN_STR,
    });

    const cmdInsertAero = `INSERT INTO trajetos 
    VALUES(trajetos_id.nextval,:1, :2, :3, :4)`
    const dados = [origem,destino,duracao,tipo];
    
    let resInsert = await conn.execute(cmdInsertAero, dados);
    await conn.commit();
    const rowsInserted = resInsert.rowsAffected;
    
    if (rowsInserted !== undefined && rowsInserted === 1) {
      cr.status = "SUCCESS"; 
      cr.message = "Trajeto inserido.";
    }

  } catch(e) {
    if (e instanceof Error) {
      cr.message = e.message;
      console.log(e.message);
    } else {
      cr.message = "Erro ao conectar ao oracle. Sem detalhes";
    }
  } finally {
    if (conn!== undefined) {
      await conn.close();
    }
    res.send(cr);  
  }
});

// trajeto - excluir
app.delete("/excluirTrajeto", async(req,res)=>{
  const id = req.body.id as number;
  
  let cr: CustomResponse = {
    status: "ERROR",
    message: "",
    payload: undefined,
  };

  try {
    const connection = await oracledb.getConnection({
        user: process.env.ORACLE_DB_USER,
        password: process.env.ORACLE_DB_PASSWORD,
        connectionString: process.env.ORACLE_CONN_STR,
    });

    const cmdDeleteAero = `DELETE FROM trajetos WHERE id = :1`
    const dados = [id];

    let resDelete = await connection.execute(cmdDeleteAero, dados);
    await connection.commit();
    await connection.close();
    const rowsDeleted = resDelete.rowsAffected;
    
    if (rowsDeleted !== undefined && rowsDeleted === 1) {
      cr.status = "SUCCESS"; 
      cr.message = "Trajeto excluída.";
    } else {
      cr.message = "Trajeto não excluída. Verifique se o código informado está correto.";
    }
  } catch(e) {
    if (e instanceof Error) {
      cr.message = e.message;
      console.log(e.message);
    } else {
      cr.message = "Erro ao conectar ao oracle. Sem detalhes.";
    }
  } finally {
    res.send(cr);  
  }
});

// alterar trajetos
app.put("/alterarTrajeto", async(req,res)=>{
  const id = req.body.id as number;
  const origem = req.body.origem as string;
  const destino = req.body.destino as string; 
  const duracao = req.body.duracao as string;
  const tipo = req.body.tipo as string;
  
  let cr: CustomResponse = {
    status: "ERROR",
    message: "",
    payload: undefined,
  };

  try {
    const connection = await oracledb.getConnection({
       user: process.env.ORACLE_DB_USER,
       password: process.env.ORACLE_DB_PASSWORD,
       connectionString: process.env.ORACLE_CONN_STR,
    });

    const cmdUpdateAero = `UPDATE trajetos SET origem = :2,
       destino = :3,  duracao = :4, tipo= :5 WHERE id = :1`
    const dados = [id,origem,destino,duracao,tipo];

    let resUpdate = await connection.execute(cmdUpdateAero, dados);
    await connection.commit();
    await connection.close();
    const rowsUpdated = resUpdate.rowsAffected;
    
    if (rowsUpdated !== undefined && rowsUpdated === 1) {
      cr.status = "SUCCESS"; 
      cr.message = "Trajeto alterado.";
    } else {
      cr.message = "Trajeto não alterado. Verifique se o código informado está correto.";
    }

  } catch(e) {
    if (e instanceof Error) {
      cr.message = e.message;
      console.log(e.message);
    } else{
      cr.message = "Erro ao conectar ao oracle. Sem detalhes.";
    }
  } finally {
    res.send(cr);  
  }
});

// voos - executar select
app.get("/listarVoos", async(req,res)=>{

  let cr: CustomResponse = {
      status: "ERROR", 
      message: "", 
      payload: undefined,
  };
  
  try {
    const connAttibs: ConnectionAttributes = {
      user: process.env.ORACLE_DB_USER,
      password: process.env.ORACLE_DB_PASSWORD,
      connectionString: process.env.ORACLE_CONN_STR,
    }
    
    const connection = await oracledb.getConnection(connAttibs);
    let resultadoConsulta = await connection.execute("SELECT * FROM voos");
  
    await connection.close();
    cr.status = "SUCCESS"; 
    cr.message = "Dados obtidos";
    cr.payload = resultadoConsulta.rows;

  } catch(e) {
    if(e instanceof Error){
      cr.message = e.message;
      console.log(e.message);
    } else {
      cr.message = "Erro ao conectar ao oracle. Sem detalhes";
    }
  } finally {
    res.send(cr);  
  }
});

// resgatar todos os destinos possíveis
app.get("/listarDestinos", async(req,res)=>{

  let cr: CustomResponse = {
      status: "ERROR", 
      message: "", 
      payload: undefined,
  };
  
  try {
    const connAttibs: ConnectionAttributes = {
      user: process.env.ORACLE_DB_USER,
      password: process.env.ORACLE_DB_PASSWORD,
      connectionString: process.env.ORACLE_CONN_STR,
    }
    
    const connection = await oracledb.getConnection(connAttibs);
    let resultadoConsulta = await connection.execute("SELECT DISTINCT destino FROM trajetos");
  
    await connection.close();
    cr.status = "SUCCESS"; 
    cr.message = "Dados obtidos";
    cr.payload = resultadoConsulta.rows;

  } catch(e) {
    if(e instanceof Error){
      cr.message = e.message;
      console.log(e.message);
    } else {
      cr.message = "Erro ao conectar ao oracle. Sem detalhes";
    }
  } finally {
    res.send(cr);  
  }
});

// resgatar todos os aeroportos de partida possíveis, baseado no destino inserido acima
app.get("/listarPartida", async(req,res)=>{
  var localViagemDestino = req.query.localDestino as string;
  console.log("resgatou: ", localViagemDestino);

  let cr: CustomResponse = {
      status: "ERROR", 
      message: "", 
      payload: undefined,
  };
  
  try {
    const connAttibs: ConnectionAttributes = {
      user: process.env.ORACLE_DB_USER,
      password: process.env.ORACLE_DB_PASSWORD,
      connectionString: process.env.ORACLE_CONN_STR,
    }
    
    const connection = await oracledb.getConnection(connAttibs);
    let resultadoConsulta = await connection.execute(`SELECT DISTINCT origem FROM trajetos WHERE destino = '${localViagemDestino}'`);
  
    await connection.close();
    cr.status = "SUCCESS"; 
    cr.message = "Dados obtidos";
    cr.payload = resultadoConsulta.rows;

  } catch(e) {
    if(e instanceof Error){
      cr.message = e.message;
      console.log(e.message);
    } else {
      cr.message = "Erro ao conectar ao oracle. Sem detalhes";
    }
  } finally {
    res.send(cr);  
  }
});

// voos - inserir
app.put("/inserirVoos", async(req,res)=>{
  const data = req.body.data as string;
  const trajeto = req.body.trajeto as number;
  const aeronave = req.body.aeronave as string; 
  const horario_ida = req.body.horario_ida as string;
  const horario_volta = req.body.horario_volta as string;
  const valor = req.body.valor as string;

  let cr: CustomResponse = {
    status: "ERROR",
    message: "",
    payload: undefined,
  };

  let conn;

  try {
    conn = await oracledb.getConnection({
        user: process.env.ORACLE_DB_USER,
        password: process.env.ORACLE_DB_PASSWORD,
        connectionString: process.env.ORACLE_CONN_STR,
    });

    const cmdInsertAero = `INSERT INTO voos 
    VALUES(voos_id.nextval, :1, :2, :3, :4, :5, :6)`
    const dados = [data, trajeto, aeronave, horario_ida, horario_volta, valor];
    
    let resInsert = await conn.execute(cmdInsertAero, dados);
    await conn.commit();
    const rowsInserted = resInsert.rowsAffected;
    
    if (rowsInserted !== undefined && rowsInserted === 1) {
      cr.status = "SUCCESS"; 
      cr.message = "Voo inserido.";
    }

  } catch(e) {
    if (e instanceof Error) {
      cr.message = e.message;
      console.log(e.message);
    } else {
      cr.message = "Erro ao conectar ao oracle. Sem detalhes.";
    }
  } finally {
    if (conn!== undefined) {
      await conn.close();
    }
    res.send(cr);  
  }
});

// voos - excluir
app.delete("/excluirVoo", async(req,res)=>{
  const id = req.body.id as number;
  
  let cr: CustomResponse = {
    status: "ERROR",
    message: "",
    payload: undefined,
  };

  try {
    const connection = await oracledb.getConnection({
        user: process.env.ORACLE_DB_USER,
        password: process.env.ORACLE_DB_PASSWORD,
        connectionString: process.env.ORACLE_CONN_STR,
    });

    const cmdDeleteAero = `DELETE FROM voos WHERE id = :1`
    const dados = [id];

    let resDelete = await connection.execute(cmdDeleteAero, dados);
    await connection.commit();
    await connection.close();
    const rowsDeleted = resDelete.rowsAffected;
    
    if (rowsDeleted !== undefined && rowsDeleted === 1) {
      cr.status = "SUCCESS"; 
      cr.message = "Voo excluído.";
    } else {
      cr.message = "Voo não excluído. Verifique se o código informado está correto.";
    }

  } catch(e) {
    if(e instanceof Error) {
      cr.message = e.message;
      console.log(e.message);
    } else {
      cr.message = "Erro ao conectar ao oracle. Sem detalhes";
    }
  } finally {
    res.send(cr);  
  }
});

// voos - alterar
app.put("/alterarVoo", async(req,res)=>{
  const id = req.body.id as number;
  const data = req.body.data as string;
  const trajeto = req.body.trajeto as number;
  const aeronave = req.body.aeronave as string; 
  const horario_ida = req.body.horario_ida as string;
  const horario_volta = req.body.horario_volta as string;
  const valor = req.body.valor as string;
  
  let cr: CustomResponse = {
    status: "ERROR",
    message: "",
    payload: undefined,
  };

  try {
    const connection = await oracledb.getConnection({
       user: process.env.ORACLE_DB_USER,
       password: process.env.ORACLE_DB_PASSWORD,
       connectionString: process.env.ORACLE_CONN_STR,
    });

    const cmdUpdateAero = `UPDATE voos SET data = :2,
     trajeto = :3, aeronave = :4, horario_ida = :5, horario_volta = :6, valor = :7 WHERE id = :1`
    const dados = [id, data, trajeto, aeronave, horario_ida, horario_volta, valor];
    console.log("Dados inseridos: ", dados);

    let resUpdate = await connection.execute(cmdUpdateAero, dados);
    await connection.commit();
    await connection.close();
    const rowsUpdated = resUpdate.rowsAffected;
    
    if (rowsUpdated !== undefined && rowsUpdated === 1) {
      cr.status = "SUCCESS"; 
      cr.message = "Voo alterado.";
    } else {
      cr.message = "Voo não alterado. Verifique se o código informado está correto.";
    }

  } catch(e) {
    if (e instanceof Error) {
      cr.message = e.message;
      console.log(e.message);
    } else {
      cr.message = "Erro ao conectar ao oracle. Sem detalhes";
    }
  } finally {
    res.send(cr);  
  }
});
