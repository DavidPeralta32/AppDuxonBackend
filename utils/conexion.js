const mysql = require('mysql');
const { Router } = require('express');
const router = Router();
const conexion = mysql.createConnection({
    //http://173.212.215.56/
    host: 'localhost',
    user: 'root',
    //password: '1234',
    password: '',
    database: 'app'
});
//metodo para la conexión a la DB
const crearConexion={
    conexion: function() {
        return conexion;
    }
}
//cerrar conexion
const cerrarConexion={
    cerrar:function(){
        const cerrar = conexion.end();
    }
}
module.exports = {
    crearConexion,
    cerrarConexion
    
       
      
}
 