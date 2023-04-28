const express = require('express');
const db = require("../../models/general/generalModel");
const conexion = require("../../utils/conexion");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { token } = require('morgan');
const emailjs = require('emailjs-com');
const nodemailer = require('nodemailer');
conn = conexion.crearConexion;


conn.conexion();


exports.validarLogin = async (req, res, next) => {
    var usuario = req.body.usuario;
    var password = req.body.password;
    res.setHeader('Access-Control-Allow-Origin', '*');
    //sql = "select count(*) as 'total' from Usuario where email='" + usuario + "' and hashed_password='" + password + "'";
    sql = "select idEmpleado,departamento, puesto, tipoUsuario,serviciosAsignados  from Empleado where status=1 AND correoDuxon='" + usuario + "' AND password='" + password + "'";

    try {

        conn.conexion().query(sql, (error, results) => {
            if (error) {
                res.json(error);

            } else {
                if (results == [] || results == '') {
                    res.json(['false', results])
                } else {
                    res.json(['true', results])

                }

            }
        });
    } catch (err) {
        console.log(error)
        //

    }
}

exports.permisoUsuarioRPatronal = async (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var idEmpleado = req.body.idEmpleado;


    sql = "SELECT idPermisoRP,nNuevoRPatronal,nVerRPatronal,nEditarRPatronal,nAgregarTarjetaLaboral,nAsignarServicios,nBajaRPatronal,nVerRPatronalBaja,nActivarRPatronal,idEmpleado  FROM permisosmoduloregistropatronal WHERE idEmpleado=" + idEmpleado + "";

    try {
        conn.conexion().query(sql, (error, results) => {
            if (error) {
                res.json(error);
            } else {
                res.json(results);
            }

        });
    } catch (err) {
        console.log(error)
        //

    }
}



exports.crearPermisoRPatronal = async (req, res, next) => {
    var idEmpleado = req.body.idEmpleado;

    res.setHeader('Access-Control-Allow-Origin', '*');
    //sql = "select count(*) as 'total' from Usuario where email='" + usuario + "' and hashed_password='" + password + "'";
    sql = " INSERT INTO permisosmoduloregistropatronal (idEmpleado) VALUES (" + idEmpleado + ");";

    try {
        conn.conexion().query(sql, (error, results) => {
            if (error) {
                res.json(error);
            } else {
                res.json(results);

            }

        });
    } catch (err) {
        console.log(error)
        //

    }
}


exports.actualizarPermisosUsuarioRPatronal = async (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    const idEmpleado = req.body.idEmpleado;
    //moduloCH: self.switchModuloCH,
    const nBajaRPatronal = req.body.nBajaRPatronal;
    const nAsignarServicios = req.body.nAsignarServicios;
    const nAgregarTarjetaLaboral = req.body.nAgregarTarjetaLaboral;
    const nEditarRPatronal = req.body.nEditarRPatronal;
    const nVerRPatronal = req.body.nVerRPatronal;
    const nNuevoRPatronal = req.body.nNuevoRPatronal;
    const nVerRPatronalBaja = req.body.nVerRPatronalBaja;
    const nActivarRPatronal = req.body.nActivarRPatronal;

   

    sql = "UPDATE permisosmoduloregistropatronal SET nNuevoRPatronal = "+nNuevoRPatronal+", nBajaRPatronal= "+nBajaRPatronal+", nAsignarServicios = "+nAsignarServicios+", nAgregarTarjetaLaboral = "+nAgregarTarjetaLaboral+", nEditarRPatronal = "+nEditarRPatronal+", nVerRPatronal = "+nVerRPatronal+", nVerRPatronalBaja = "+nVerRPatronalBaja+", nActivarRPatronal = "+nActivarRPatronal+"  WHERE idEmpleado=  "+ idEmpleado +"";
    
    try {
        conn.conexion().query(sql, (error, results) => {
            if (error) {
                res.json(error);
            } else {
                res.json(results)
            }

        });
    } catch (err) {
        console.log(error)
    }
}