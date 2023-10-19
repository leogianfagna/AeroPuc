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

//Listar aeroportos
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

//Inserir aeroportos
app.put("/inserirAeroporto", async(req,res)=>{
  const aeroporto = req.body.aeroporto as string;
  const cidade = req.body.cidade as string;

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

    const cmdInsertAero = `INSERT INTO aeroportos 
    VALUES(aeroportos_id.nextval,:1, :2)`

    const dados = [aeroporto, cidade];
    let resInsert = await conn.execute(cmdInsertAero, dados);
    
    await conn.commit();

    const rowsInserted = resInsert.rowsAffected
    if(rowsInserted !== undefined &&  rowsInserted === 1) {
      cr.status = "SUCCESS"; 
      cr.message = "Aeroporto inserido.";
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

//Excluir aeroportos
app.delete("/excluirAeroporto", async(req,res)=>{
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

    const cmdDeleteAero = `DELETE FROM aeroportos WHERE id = :1`
    const dados = [id];

    let resDelete = await connection.execute(cmdDeleteAero, dados);
    
    await connection.commit();

    await connection.close();

    const rowsDeleted = resDelete.rowsAffected
    
    if(rowsDeleted !== undefined &&  rowsDeleted === 1) {
      cr.status = "SUCCESS"; 
      cr.message = "Aeroporto excluída.";
    }else{
      cr.message = "Aeroporto não excluída. Verifique se o código informado está correto.";
    }

  } catch(e){
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

//Alterar aeroportos
app.put("/alterarAeroporto", async(req,res)=>{
   const id = req.body.id as number;
   const aeroporto = req.body.aeroporto as string;
   const cidade = req.body.cidade as string;
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

    const cmdUpdateAero = `UPDATE aeroportos SET aeroporto = :2,
     cidade = :3 WHERE id = :1`
    const dados = [id, aeroporto,cidade];

    let resUpdate = await connection.execute(cmdUpdateAero, dados);
    
    await connection.commit();
 
    await connection.close();

    const rowsUpdated = resUpdate.rowsAffected
    if(rowsUpdated !== undefined &&  rowsUpdated === 1) {
      cr.status = "SUCCESS"; 
      cr.message = "Aeroporto alterado.";
    }else{
      cr.message = "Aeroporto não alterado. Verifique se o código informado está correto.";
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