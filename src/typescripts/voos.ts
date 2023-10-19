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

//Listar voos
app.get("/listarVoos", async(req,res)=>{

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
    let resultadoConsulta = await connection.execute("SELECT * FROM voos");
  
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

//Inserir voos
app.put("/inserirVoos", async(req,res)=>{
  const data = req.body.data as string;
  const trajeto = req.body.trajeto as number;
  const aeronave = req.body.aeronave as string; 
  const horario_ida = req.body.horario_ida as string;
  const horario_volta = req.body.hoario_volta as string;
  const valor = req.body.valor as string;

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

    const cmdInsertAero = `INSERT INTO voos 
    VALUES(voos_id.nextval,:1, :2, :3, :4, :5, :6)`

    const dados = [data,trajeto,aeronave,horario_ida,horario_volta,valor];
    let resInsert = await conn.execute(cmdInsertAero, dados);
    
    await conn.commit();

    const rowsInserted = resInsert.rowsAffected
    if(rowsInserted !== undefined &&  rowsInserted === 1) {
      cr.status = "SUCCESS"; 
      cr.message = "Voo inserido.";
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

//Excluir voo
app.delete("/excluirVoo", async(req,res)=>{
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

    const cmdDeleteAero = `DELETE FROM voos WHERE id = :1`
    const dados = [id];

    let resDelete = await connection.execute(cmdDeleteAero, dados);
    
    await connection.commit();

    await connection.close();

    const rowsDeleted = resDelete.rowsAffected
    if(rowsDeleted !== undefined &&  rowsDeleted === 1) {
      cr.status = "SUCCESS"; 
      cr.message = "Voo excluído.";
    }else{
      cr.message = "Voo não excluído. Verifique se o código informado está correto.";
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

//Alterar voos
app.put("/alterarVoo", async(req,res)=>{
  const id = req.body.id as number;
  const data = req.body.data as string;
  const trajeto = req.body.trajeto as number;
  const aeronave = req.body.aeronave as string; 
  const horario_ida = req.body.horario_ida as string;
  const horario_volta = req.body.hoario_volta as string;
  const valor = req.body.valor as string;
  
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

    const cmdUpdateAero = `UPDATE voos SET data = :2,
     trajeto = :3, aeronave = :4, horario_ida = :5, horario_volta = :6, valor = :7 WHERE id = :1`
     const dados = [id,data,trajeto,aeronave,horario_ida,horario_volta,valor];

    let resUpdate = await connection.execute(cmdUpdateAero, dados);
    
    await connection.commit();
 
    await connection.close();

    const rowsUpdated = resUpdate.rowsAffected
    if(rowsUpdated !== undefined &&  rowsUpdated === 1) {
      cr.status = "SUCCESS"; 
      cr.message = "Voo alterado.";
    }else{
      cr.message = "Voo não alterado. Verifique se o código informado está correto.";
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