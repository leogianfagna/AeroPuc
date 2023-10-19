// configurações
import express from "express";
import oracledb, { Connection, ConnectionAttributes } from "oracledb";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

dotenv.config();

type CustomResponse = {
  status: string,
  message: string,
  payload: any
};

//Listar mapa de assentos
app.get("/listarMapa", async(req,res)=>{
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
    let resultadoConsulta = await connection.execute("SELECT * FROM mapa_assentos");
  
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

//Inserir mapa de assentos 
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

  try{
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

    const rowsInserted = resInsert.rowsAffected
    if(rowsInserted !== undefined &&  rowsInserted === 1) {
      cr.status = "SUCCESS"; 
      cr.message = "Mapa de assentos inserido.";
    }

  }catch(e){
    if(e instanceof Error){
      cr.message = e.message;
      console.log(e.message);
    }else{
      cr.message = "Erro ao conectar ao oracle. Sem detalhes";
    }
  } finally {
    if(conn!== undefined){
      await conn.close();
    }
    res.send(cr);  
  }
});

//Excluir mapa de assentos
app.delete("/excluirMapa", async(req,res)=>{
  const id = req.body.id as number;
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

    const cmdDeleteAero = `DELETE FROM mapa_assentos WHERE id = :1`
    const dados = [id];

    let resDelete = await connection.execute(cmdDeleteAero, dados);
    
    await connection.commit();

    await connection.close();

    const rowsDeleted = resDelete.rowsAffected
    if(rowsDeleted !== undefined &&  rowsDeleted === 1) {
      cr.status = "SUCCESS"; 
      cr.message = "Mapa de assentos excluído.";
    }else{
      cr.message = "Mapa de assentos não excluído. Verifique se o código informado está correto.";
    }

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
  
app.listen(port,()=>{
  console.log("Servidor HTTP funcionando...");
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

  try{
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

    const rowsUpdated = resUpdate.rowsAffected
    if(rowsUpdated !== undefined &&  rowsUpdated === 1) {
      cr.status = "SUCCESS"; 
      cr.message = "Mapa de assentos alterado.";
    }else{
      cr.message = "Mapa de assentos não alterado. Verifique se o código informado está correto.";
    }

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