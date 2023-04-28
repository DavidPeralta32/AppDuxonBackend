const e = require('express');
const express = require('express');
const upload = require('express-uploadfiles')();



const db = require("../../models/general/generalModel");
const conexion = require("../../utils/conexion");
const fs = require('fs');
const dt = require('docx-templates')
const path = require('path');
const { isNull } = require('util');
// Importa easy-template-x y fs
//const TemplateHandler = require('easy-template-x');
//const createReport = require('docx-templates');




conn = conexion.crearConexion;
close = conexion.cerrarConexion;



exports.getInfoEmpleadosAltaImss = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    sql = "SELECT e.idEmpleado , e.nombre, e.fechaIngreso, e.tipoEmpleado, e.salario, e.NSS, e.CURP, e.RFC, e.cpCIF, e.direccionCIF,e.fechaNacimiento, e.numeroEmpleado, e.numCreditoInfonavit,e.infonavit FROM Empleado as e";
    
    try {
        conn.conexion().query(sql, (error, results) => {
            if (error) {
                res.json(error);
            } else {
                res.json(results);
            }

        });

    } catch (error) {
        console.log(error)
    }
}