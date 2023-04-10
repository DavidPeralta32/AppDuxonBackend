const e = require('express');
const express = require('express');
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
close = conexion.cerrarConexion


exports.getRegistroPatronal = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    sql = `select ID, nRegistroPatronal, date_format(dFechaAlta,"%d-%m-%Y") as dFechaAlta, nEstado, sZonaCiudad,nSalarioMinimoZRP, PrimaDeRiesgo, nElementos from registro_patronal`

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