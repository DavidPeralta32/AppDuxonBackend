const express = require('express');
const app = express();
const morgan= require('morgan');
const mysql= require('mysql');
const bodyParser= require('body-parser');

//configuraciones
app.set('port', process.env.PORT || 3050);
app.set("json spaces",2)
//intermedios
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json())

//Rutas
app.use(require('./routes/index'));
app.use('/api/login',require('./routes/login/iniciarSesion.js'));




//MySql
const connection= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1234',
    database:'empleadosApp'
})
//verificar conexion

connection.connect(error=>{
    if(error) throw error;
    console.log("La base de datos esta corriendo");
})

 

//Iniciando servidor
app.listen(app.get('port'),()=>{
    console.log('Servidor en puerto 3000')    
})