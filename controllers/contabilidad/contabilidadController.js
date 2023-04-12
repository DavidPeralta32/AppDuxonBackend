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

    sql = `select ID as nID, nRegistroPatronal, date_format(dFechaAlta,"%d-%m-%Y") as dFechaAlta, nEstado, sZonaCiudad,nSalarioMinimoZRP, PrimaDeRiesgo, nElementos from registro_patronal WHERE nEstado = 1`;

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

exports.getRegistroPatronalBaja = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    sql = `select ID as nID, nRegistroPatronal, date_format(dFechaBaja,"%d-%m-%Y") as dFechaBaja, nEstado, sZonaCiudad,nSalarioMinimoZRP, PrimaDeRiesgo, nElementos, sMotivoBaja from registro_patronal WHERE nEstado = 2`;

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

exports.altaRegistroPatronal = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    const nRegistroPatronal = req.body.nRegistroPatronal;
    const dfechaAlta = req.body.dFechaAlta;
    const nEstado = 1;
    const sZonaCiudad = req.body.sZonaCiudad;
    const nSalarioMinimoZPR = req.body.nSalarioMinimoZPR;
    const nPrimaRiesgo = req.body.nPrimaRiesgo;
    const nElementos = req.body.nElementos;


    sql = "INSERT INTO registro_patronal (ID,nRegistroPatronal,dFechaAlta,nEstado,sZonaCiudad,nSalarioMinimoZRP,PrimaDeRiesgo, nElementos) VALUES(null,'"+nRegistroPatronal+"','"+dfechaAlta+"',"+nEstado+",'"+sZonaCiudad+"',"+nSalarioMinimoZPR+","+nPrimaRiesgo+","+nElementos+")";

    try {
        conn.conexion().query(sql, (error, results) => {
            if (error) {
                res.json(error);
            } else { 
                if (results.affectedRows > 0) {
                    res.json(results);
                }
            }
        });
        //cerrar

    } catch (error) {
        console.log(error)
    }
}

exports.bajaRegistroPatronal = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    const nRegistroPatronal = req.body.nRegistroPatronal;
    const dFechaBaja = req.body.dFechaBaja;
    const sMotivoBaja = req.body.sMotivoBaja;

    sql = "UPDATE registro_patronal SET nEstado = 2, dFechaBaja = '"+dFechaBaja+"', sMotivoBaja = '"+sMotivoBaja+"' WHERE nRegistroPatronal = '"+nRegistroPatronal+"' ";

    try {
        conn.conexion().query(sql, (error, results) => {
            if (error) {
                res.json(error);
            } else { 
                if (results.affectedRows > 0) {
                    res.json(results);
                }
            }
        });
    } catch (error) {
        console.log(error)
    }
}

exports.activarRegistroPatronal = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    const nRegistroPatronal = req.body.nRegistroPatronal;

    sql = "UPDATE registro_patronal SET nEstado = 1 WHERE nRegistroPatronal = '"+nRegistroPatronal+"' ";

    try {
        conn.conexion().query(sql, (error, results) => {
            if (error) {
                res.json(error);
            } else { 
                if (results.affectedRows > 0) {
                    res.json(results);
                }
            }
        });
    } catch (error) {
        console.log(error)
    }
}

exports.getRegistroPatronalxId = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    const nRegistroPatronal = req.body.nRegistroPatronal;

    sql = "select ID as nID, nRegistroPatronal, date_format(dFechaAlta,'%d-%m-%Y') as dFechaAlta, nEstado, sZonaCiudad,nSalarioMinimoZRP, PrimaDeRiesgo, nElementos from registro_patronal WHERE nRegistroPatronal  = '"+nRegistroPatronal+"'";

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


exports.editarRegistroPatronal = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    const nID = req.body.nID;
    const nRegistroPatronal = req.body.nRegistroPatronal;
    const sZonaCiudad =  req.body.sZonaCiudad;
    const nSalarioMinimoZRP =  req.body.nSalarioMinimoZRP;
    const PrimaDeRiesgo = req.body.PrimaDeRiesgo;
    const nElementos = req.body.nElementos;

    sql = "UPDATE registro_patronal SET nRegistroPatronal = '"+nRegistroPatronal+"', sZonaCiudad = '"+sZonaCiudad+"', nSalarioMinimoZRP = "+nSalarioMinimoZRP+", PrimaDeRiesgo = "+PrimaDeRiesgo+", nElementos = "+nElementos+" WHERE ID = '"+nID+"' ";

    try {
        conn.conexion().query(sql, (error, results) => {
            if (error) {
                res.json(error);
            } else { 
                if (results.affectedRows > 0) {
                    res.json(results);
                }
            }
        });
    } catch (error) {
        console.log(error)
    }
}

exports.validarNRegistroPatronal = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    const nRegistroPatronal = req.body.nRegistroPatronal;

    sql = "select nRegistroPatronal from registro_patronal WHERE nRegistroPatronal = '"+nRegistroPatronal+"'";

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


