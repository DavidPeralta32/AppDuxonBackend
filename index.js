const express = require('express');
const app = express();
const morgan = require('morgan');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const { request } = require('express');
const bcrypt = require("bcrypt");
const fileUpload = require('express-fileupload');

const cors = require('cors');
//configuraciones
app.set('port', process.env.PORT || 7005);
app.set("json spaces", 2)
app.use(cors());
//intermedios
app.use(morgan('dev'));
app.use(fileUpload());
app.use(express.static('images'));
app.use(express.static('documents'));

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
 
 
//Rutas

//End points de uso general
app.use('/general', require('../Servidor Pruebas/routes/general'));
app.use('/empleados', require('../Servidor Pruebas/routes/empleados'));
app.use('/contabilidad',require('../Servidor Pruebas/routes/contabilidad'));
app.use('/departamentos',require('../Servidor Pruebas/routes/departamentos'));
app.use('/puestos',require('../Servidor Pruebas/routes/puestos'));




//End point empleados

 

//MySql




//Iniciando servidor
app.listen(app.get('port'), () => {

    console.log('Servidor en puerto 7005')
})