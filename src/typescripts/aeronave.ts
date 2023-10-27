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

//Listar aeronaves

app.get("/listarAeronaves", async(req,res)=>{

    let cr: CustomResponse = {
        status: "ERROR", 
        message: "", 
        payload: undefined,
    };
  
    try{
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
  
      // Envia os dados como resposta, independente de erro (por enquanto)
      res.send(cr);

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

//Inserir aeronaves 
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
  try{
    conn = await oracledb.getConnection({
        user: process.env.ORACLE_DB_USER,
        password: process.env.ORACLE_DB_PASSWORD,
        connectionString: process.env.ORACLE_CONN_STR,
    });

    const cmdInsertAero = `INSERT INTO aeronaves
    (numero_identificacao, fabricante, modelo, assentos, ano_fabricacao)
    VALUES (aeronaves_id.nextval, :1, :2, :3, :4)`;

    const dados = [fabricante, modelo, qtdeAssentos, anoFab];
    let resInsert = await conn.execute(cmdInsertAero, dados);
    
    await conn.commit();

    const rowsInserted = resInsert.rowsAffected
    if(rowsInserted !== undefined &&  rowsInserted === 1) {
      cr.status = "SUCCESS"; 
      cr.message = "Aeronave inserida.";
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

//Excluir aeronave
app.delete("/excluirAeronave", async(req,res)=>{
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
  
      const cmdDeleteAero = `DELETE FROM aeronaves WHERE id = :1`
      const dados = [id];
  
      let resDelete = await connection.execute(cmdDeleteAero, dados);
      
      await connection.commit();

      await connection.close();
 
      const rowsDeleted = resDelete.rowsAffected
      if(rowsDeleted !== undefined &&  rowsDeleted === 1) {
        cr.status = "SUCCESS"; 
        cr.message = "Aeronave excluída.";
      }else{
        cr.message = "Aeronave não excluída. Verifique se o código informado está correto.";
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

//Alterar aeronaves
app.put("/alterarAeronave", async(req,res)=>{
  const id = req.body.id as number;
  const fabricante = req.body.fabricante as string;
  const modelo = req.body.modelo as string;
  const registro = parseInt(req.body.registro);
  const qtdeAssentos = parseInt(req.body.qtdeAssentos);
  const anoFab = parseInt(req.body.anoFab);
  
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

    const cmdUpdateAero = `UPDATE aeronaves SET numero_identificacao = :2,
     modelo = :3, fabricante = :4, ano_fabricacao = :5, assentos = :6 WHERE id = :1`
    const dados = [id, registro, modelo, fabricante, anoFab, qtdeAssentos];

    let resUpdate = await connection.execute(cmdUpdateAero, dados);
    
    await connection.commit();
 
    await connection.close();

    const rowsUpdated = resUpdate.rowsAffected
    if(rowsUpdated !== undefined &&  rowsUpdated === 1) {
      cr.status = "SUCCESS"; 
      cr.message = "Aeronave alterada.";
    }else{
      cr.message = "Aeronave não alterada. Verifique se o código informado está correto.";
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