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

// Cria um novo tipo para resposta da conexão
// depois declara valores globalmente para ser utilizado em todas as funções
type CustomResponse = {
  status: string,
  message: string,
  payload: any
};

let cr: CustomResponse = {
  status: "ERROR", 
  message: "", 
  payload: undefined,
};

// função listen do servidor
app.listen(port,()=>{
  console.log("Servidor HTTP ligado.");
});

function tryH(){
  const connAttibs: ConnectionAttributes = {
    user: process.env.ORACLE_DB_USER,
    password: process.env.ORACLE_DB_PASSWORD,
    connectionString: process.env.ORACLE_CONN_STR,
  }

  return connAttibs;
}

// Função para executar um SELECT * no banco de dados, na tabela que foi
// passada como parâmetro. Apenas tabelas no modo administrativo, que são
// mostrada todas as colunas
app.get("/queryTabelasAdministrativas", async(req,res)=>{

  try {
    const connAttibs: ConnectionAttributes = {
      user: process.env.ORACLE_DB_USER,
      password: process.env.ORACLE_DB_PASSWORD,
      connectionString: process.env.ORACLE_CONN_STR,
    }

    var tabela = req.query.tabelaParaExecutarSelect as string;
    const connection = await oracledb.getConnection(connAttibs);
    let resultadoConsulta = await connection.execute(`SELECT * FROM ${tabela}`);
  
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
  var dataPartidaVoo = req.query.dataPreenchida as string;
  var dataVoltaVoo = req.query.dataVoltaPreenchida as string;
  var cidadeDestinoViagem = req.query.localDestino as string;
  var cidadeOrigemViagem = req.query.localPartida as string;
  var incluiVoltaNaPassagem = req.query.tipoDeVoo as string;
  var tipoDeBuscaSimplesOuAvancada = req.query.tipoBusca as string;
  
  try {
    const connAttibs: ConnectionAttributes = {
      user: process.env.ORACLE_DB_USER,
      password: process.env.ORACLE_DB_PASSWORD,
      connectionString: process.env.ORACLE_CONN_STR,
    }

    const connection = await oracledb.getConnection(connAttibs);
    let resultadoConsulta;
    
    const queryBancoDeDados = "voos.id, voos.data_ida,voos.data_volta,aeronaves.modelo AS modelo_aeronave,voos.horario_ida,voos.horario_volta,voos.valor";
    if (tipoDeBuscaSimplesOuAvancada === "avancado") {
      // consulta complexa onde além das localizações confere DATA PARTIDA e TIPO DE VIAGEM
      if (incluiVoltaNaPassagem === "ida") {
        // por ser apenas IDA, o campo de DATA_VOLTA deve ser vazio
        resultadoConsulta = await connection.execute(`SELECT ${queryBancoDeDados} FROM voos JOIN trajetos ON voos.trajeto = trajetos.id JOIN
        aeronaves ON voos.aeronave = aeronaves.id WHERE trajetos.origem = '${cidadeOrigemViagem}' AND trajetos.destino = '${cidadeDestinoViagem}' AND voos.data_ida = '${dataPartidaVoo}' AND voos.data_volta =''`);
      } else {
        // campo DATA_VOLTA deve ser preenchido por se tratar de uma passagem IDA E VOLTA
        resultadoConsulta = await connection.execute(`SELECT ${queryBancoDeDados} FROM voos JOIN trajetos ON voos.trajeto = trajetos.id JOIN
        aeronaves ON voos.aeronave = aeronaves.id WHERE trajetos.origem = '${cidadeOrigemViagem}' AND trajetos.destino = '${cidadeDestinoViagem}' AND voos.data_ida = '${dataPartidaVoo}' AND voos.data_volta = '${dataVoltaVoo}'`);
      }
    } else {
      // consulta simples onde só é levado ORIGEM e DESTINO
      resultadoConsulta = await connection.execute(`SELECT ${queryBancoDeDados} FROM voos JOIN trajetos ON voos.trajeto = trajetos.id JOIN
      aeronaves ON voos.aeronave = aeronaves.id WHERE trajetos.origem = '${cidadeOrigemViagem}' AND trajetos.destino = '${cidadeDestinoViagem}'`);
    }
    
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

  let conn;

  try {
    conn = await oracledb.getConnection({
      user: process.env.ORACLE_DB_USER,
      password: process.env.ORACLE_DB_PASSWORD,
      connectionString: process.env.ORACLE_CONN_STR,
    });

    const cmdInsertAero = `INSERT INTO cliente
    (id, nome, email, assento, voo)
    VALUES (clientes_id.nextval, :1, :2, :3, :4)`;

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
      cr.message = "Assento reservado.";
    } else {
      cr.message = "Assento não reservado.";
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

  try{
    const connection = await oracledb.getConnection({
      user: process.env.ORACLE_DB_USER,
      password: process.env.ORACLE_DB_PASSWORD,
      connectionString: process.env.ORACLE_CONN_STR,
    });

    const cmdUpdateAero = `UPDATE aeronaves SET fabricante = :1, numero_identificacao = :2, ano_fabricacao = :3, assentos = :4, modelo = :5 WHERE id = :6`
    const dados = [fabricante, registro, anoFab, qtdeAssentos, modelo, id];

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

// aeroportos = inserir
app.put("/inserirAeroporto", async(req,res)=>{
  const aeroporto = req.body.aeroporto as string;
  const cidade = req.body.cidade as number;

  let conn;

  try {
    conn = await oracledb.getConnection({
      user: process.env.ORACLE_DB_USER,
      password: process.env.ORACLE_DB_PASSWORD,
      connectionString: process.env.ORACLE_CONN_STR,
    });

    const cmdInsertAero = `INSERT INTO aeroportos
    (id, aeroporto, cidade)
    VALUES (500, Campinas, Teste)`;

    const dados = [aeroporto, cidade];
    
    let resInsert = await conn.execute(cmdInsertAero);
    await conn.commit();
    const rowsInserted = resInsert.rowsAffected;
    console.log("Colunas afetadas: ", rowsInserted);
    
    if (rowsInserted !== undefined && rowsInserted === 1) {
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
app.post("/alterarAeroporto", async(req,res)=>{
  const id = req.body.idAeroporto as number;
  const cidade = req.body.cidadeLocalizada as number;
  const aeroporto= req.body.nomeAeroporto as string;

  console.log("ID: ", id);
  console.log("ID2: ", aeroporto);
  console.log("ID3: ", cidade);


  try {
    const connection = await oracledb.getConnection({
      user: process.env.ORACLE_DB_USER,
      password: process.env.ORACLE_DB_PASSWORD,
      connectionString: process.env.ORACLE_CONN_STR,
    });

    const cmdUpdateAero = `UPDATE aeroportos SET aeroporto = :1, cidade = :2 WHERE id = :3`
    const dados = [aeroporto, cidade,id];

    let resUpdate = await connection.execute(cmdUpdateAero, dados);
    
    await connection.commit();
    await connection.close();
    const rowsUpdated = resUpdate.rowsAffected;
    console.log("Linhas afetadas:", rowsUpdated);
    
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

// cidades - inserir
app.put("/inserirCidade", async(req,res)=>{
  const cidade = req.body.cidade as string;
  const estado = req.body.estado as string;
  const pais = req.body.pais as string; 

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
  const pais = req.body.pais as string;

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

// trajetos - inserir
app.put("/inserirTrajeto", async(req,res)=>{
  const origem = req.body.origem as string;
  const destino = req.body.destino as string; 
  const duracao = req.body.duracao as string;
  const tipo = req.body.tipo as string;

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
app.post("/alterarTrajeto", async(req,res)=>{
  const id = req.body.id as number;
  const origem = req.body.origem as string;
  const destino = req.body.destino as string; 
  const duracao = req.body.duracao as string;
  const tipo = req.body.tipo as string;

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

// resgatar todos os destinos possíveis
app.get("/listarDestinos", async(req,res)=>{
  
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
  const data_ida = req.body.data_ida as string;
  const data_volta = req.body.data_volta as string;
  const trajeto = req.body.trajeto as number;
  const aeronave = req.body.aeronave as number; 
  const horario_ida = req.body.horario_ida as string;
  const horario_volta = req.body.horario_volta as string;
  const valor = req.body.valor as string;

  let conn;

  try {
    conn = await oracledb.getConnection({
        user: process.env.ORACLE_DB_USER,
        password: process.env.ORACLE_DB_PASSWORD,
        connectionString: process.env.ORACLE_CONN_STR,
    });

    const cmdInsertAero = `INSERT INTO voos 
    VALUES(voos_id.nextval, :1, :2, :3, :4, :5, :6, :7)`
    const dados = [data_ida,data_volta ,trajeto, aeronave, horario_ida, horario_volta, valor];
    
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
app.post("/alterarVoo", async(req,res)=>{
  const id = req.body.id as number;
  const data_ida = req.body.data_ida as string;
  const data_volta = req.body.data_volta as string;
  const trajeto = req.body.trajeto as number;
  const aeronave = req.body.aeronave as number; 
  const horario_ida = req.body.horario_ida as string;
  const horario_volta = req.body.horario_volta as string;
  const valor = req.body.valor as string;

  try {
    const connection = await oracledb.getConnection({
       user: process.env.ORACLE_DB_USER,
       password: process.env.ORACLE_DB_PASSWORD,
       connectionString: process.env.ORACLE_CONN_STR,
    });

    const cmdUpdateAero = `UPDATE voos SET data_ida = :2, data_volta :8,
     trajeto = :3, aeronave = :4, horario_ida = :5, horario_volta = :6, valor = :7 WHERE id = :1`
    const dados = [id, data_ida, trajeto, aeronave, horario_ida, horario_volta, valor, data_volta];
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


// Função GET para resgatar dentro de um array o [número de colunas, número de assentos] de um avião para ser utilizado na
// impressão do mapa de assentos. Constroi um IF para checar se foi retornado algo e, se positivo, retornar apenas uma posição
// do array, para não criar um array dentro de um array
app.get("/listarLinhasEColunas", async(req,res)=>{
  const numeroVoo = req.query.idDoVoo as string;
  
  try {
    const connAttibs: ConnectionAttributes = {
      user: process.env.ORACLE_DB_USER,
      password: process.env.ORACLE_DB_PASSWORD,
      connectionString: process.env.ORACLE_CONN_STR,
    }
    
    const connection = await oracledb.getConnection(connAttibs);
    let resultadoConsulta = await connection.execute("SELECT a.colunas as numero_de_colunas, a.assentos as numero_de_assentos FROM voos v JOIN aeronaves a ON v.aeronave = a.id WHERE v.id = :numeroVoo", [numeroVoo]);

    console.log(resultadoConsulta);

    await connection.close();
    cr.status = "SUCCESS"; 
    cr.message = "Dados obtidos";

    if (resultadoConsulta.rows && resultadoConsulta.rows.length > 0) {
      cr.payload = resultadoConsulta.rows[0];
    } else {
      cr.payload = [];
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
