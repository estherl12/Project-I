const mysql = require('mysql2/promise');
const config = require('../dbconfig')

async function query(sql,params){
    const connection =await mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'mypassword',
        database:'gpkmc_college',
        port: '3306',
        connectTimeout:60000
    });
    if(!connection){
        console.log("Unable to Database Connection ")
    }
    const [results] = await connection.execute(sql,params);

    return results;
}
module.exports = {
    query
}