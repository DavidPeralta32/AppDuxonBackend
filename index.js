const express = require('express');
const app = express();
const morgan = require('morgan');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const { request } = require('express');
const bcrypt = require("bcrypt");
const fileUpload = require('express-fileupload');
const path = require("path")

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

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//Rutas

//End points de uso general
app.use('/general', require('../Servidor Pruebas/routes/general'));
app.use('/empleados', require('../Servidor Pruebas/routes/empleados'));
app.use('/contabilidad', require('../Servidor Pruebas/routes/contabilidad'));
app.use('/departamentos', require('../Servidor Pruebas/routes/departamentos'));
app.use('/puestos', require('../Servidor Pruebas/routes/puestos'));

app.post('/upload', function(req, res) {

    let sampleFile;
    let uploadPath;
    let estatusArchivo;
  
    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).send('No se selecciono ningun archivo.');
      return;
    }
  
    //console.log('req.files >>>', req.files); // eslint-disable-line
  
    sampleFile = req.files.sampleFile;
  
    uploadPath = __dirname + '/uploads/' + sampleFile.name;
  
    sampleFile.mv(uploadPath, function(err,resp) {
      if (err) {
        return res.status(500).send(err);
      }else{
        estatusArchivo = true;
      }
      
      if(estatusArchivo){
        res.send("OK");
      }
  
      //res.send('Archivo cargado en la ruta:  ' + uploadPath);
      
    });

  });
  




//End point empleados



//MySql




//Iniciando servidor
app.listen(app.get('port'), () => {

    console.log('Servidor en puerto 7005')
})