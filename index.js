//npm init -y
//npm install oracledb
//node index.js
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
async function run() {
    let con;
    try{
        con = await oracledb.getConnection( {
            user          : "bd290823215",
            password      : "Ezmfq9",
            connectString : "172.16.12.14"});
        const data = await con.execute(
            'select * from aeronaves',
        );
        console.log(data.rows);
    }
    catch(err){
        console.error(err);
    }
}
    
run();
