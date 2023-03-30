//Arquivo de conecção para o banco de dados

const mysql = require("mysql");

const connection = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "",
    database:"academico"

});
connection.connect(error =>{
    if(error) throw error;
    console.log("Agora estamos conectado com o banco de dados Flavia")
});

//exportando minha conecção
module.exports = connection;