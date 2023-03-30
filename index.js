
 
//Carregando o Express
const express = require("express");

const cors = require("cors");

//Criando nosso Express App
const app = express();


//é um mecanismo utilizado pelos navegadores para compartilhar recursos entre diferentes origens.
var corsOpcoes = {
    origin: "*"
}
//Solicitando que ele use o Cors
app.use(cors(corsOpcoes));

//A função express.json() é uma função de middleware integrada no Express. Ele analisa requests de entrada com cargas úteis JSON e é baseado no analisador de corpo 
app.use(express.json());// Para complemento ... é um parser das informações vindas de uma requisção post


//A opção "extended" diz para o express qual biblioteca ele deve utilizar para fazer o parsing do conteúdo das requisições que ele recebe. 
//Quando extended : true vai utilizar a biblioteca qs e quando for false ele vai utilizar a biblioteca querystring.
app.use(express.urlencoded({extended:true}));

// requerindo esse banco no meu index.js
const sql = require("./bd.js");

app.post("/api/cursos",(req,res) =>{
    let insert = "insert into cursos(nome, valor) values" +
    "('" + req.body.nome + "'," + req.body.valor + ")";
    sql.query(insert, (err, res)=> {
        if (err) {
            console.log("error: ", err);
            return;
        }
        console.log("criado: ", { id: res.insertId});
        //result (null, { id: res.insertId});
    });


    res.json({curso: req.body.nome})
});

app.get ("/api/cursos", (req, res) => {
    let select = "SELECT  * FROM cursos";
    var vetor = [];
    let obj = {};
    sql.query(select, (err, result) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("cursos: ", result);

        for (var i = 0; i < result.length; i++) {
            obj = {};
            obj['id'] = result[i].id;  
            obj['nome'] = result[i].nome;
            obj['valor'] = result[i].valor;  
            vetor.push(obj);

        
        }
        res.json(JSON.parse(JSON.stringify(vetor)));

    });
  console.log(vetor);
});





// modificar 

app.post("/api/aluno",(req,res) =>{
    let insert = "insert into aluno(id, nome, email, telefone ) values" +
    "('" + req.body.id + "','" + req.body.nome + "','" + req.body.email + "','" + req.body.telefone + "')";
    sql.query(insert, (err, res)=> {
        if (err) {
            console.log("error: ", err);
            return;
        }
        console.log("criado: ", { id: res.insertId});
        //result (null, { id: res.insertId});
    });


    res.json({aluno: req.body.nome})
});

app.get ("/api/aluno", (req, res) => {
    let select = "SELECT  * FROM aluno";
    var vetor = [];
    let obj = {};
    sql.query(select, (err, result) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("aluno: ", result);

        for (var i = 0; i < result.length; i++) {
            obj = {};
            obj['id'] = result[i].id;  
            obj['nome'] = result[i].nome;
            obj['email'] = result[i].email; 
            obj['telefone'] = result[i].telefone; 
            vetor.push(obj);

        
        }
        res.json(JSON.parse(JSON.stringify(vetor)));

    });
  console.log(vetor);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT,() =>{
    console.log("A porta do BackEnd está ligada");
});





