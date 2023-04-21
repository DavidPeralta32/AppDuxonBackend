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

    sql = "SELECT regp.ID as nID, regp.nRegistroPatronal, date_format(regp.dFechaAlta,'%d-%m-%Y') as dFechaAlta, regp.sEstado, regp.sZonaCiudad,regp.nSalarioMinimoZRP, regp.PrimaDeRiesgo, COUNT(emp.idEmpleado) as nElementos FROM registro_patronal as regp LEFT JOIN servicio as serv ON FIND_IN_SET(serv.idServicio, regp.ServiciosAsignados) LEFT JOIN empleado as emp ON serv.idServicio = emp.idServicio WHERE regp.nEstatus = 1 GROUP BY regp.ID";

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

    sql = `select regp.ID as nID, regp.nRegistroPatronal, date_format(regp.dFechaBaja,"%d-%m-%Y") as dFechaBaja, regp.sEstado as sEstadoBaja, regp.sZonaCiudad, regp.nSalarioMinimoZRP, regp.PrimaDeRiesgo, regp.sMotivoBaja, COUNT(emp.idEmpleado) as nElementos from registro_patronal as regp left JOIN servicio as serv ON FIND_IN_SET(serv.idServicio, regp.ServiciosAsignados) > 0 left JOIN empleado as emp ON serv.idServicio = emp.idServicio WHERE regp.nEstatus = 2 GROUP BY regp.ID`;

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
    const sEstado = req.body.sEstado;
    const sZonaCiudad = req.body.sZonaCiudad;
    const nSalarioMinimoZPR = req.body.nSalarioMinimoZPR;
    const nPrimaRiesgo = req.body.nPrimaRiesgo;


    sql = "INSERT INTO registro_patronal (ID,nRegistroPatronal,dFechaAlta,sEstado,sZonaCiudad,nSalarioMinimoZRP,PrimaDeRiesgo, nEstatus) VALUES(null,'" + nRegistroPatronal + "','" + dfechaAlta + "','" + sEstado + "','" + sZonaCiudad + "'," + nSalarioMinimoZPR + "," + nPrimaRiesgo + ",1)";

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

    sql = "UPDATE registro_patronal SET nEstatus = 2, dFechaBaja = '" + dFechaBaja + "', sMotivoBaja = '" + sMotivoBaja + "' WHERE nRegistroPatronal = '" + nRegistroPatronal + "' ";

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

    sql = "UPDATE registro_patronal SET nEstatus = 1 WHERE nRegistroPatronal = '" + nRegistroPatronal + "' ";

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

    sql = "select ID as nID, nRegistroPatronal, date_format(dFechaAlta,'%Y-%m-%d') as dFechaAlta, sEstado, sZonaCiudad,nSalarioMinimoZRP, PrimaDeRiesgo from registro_patronal WHERE nRegistroPatronal  = '" + nRegistroPatronal + "'";

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

exports.getRegistroPatronalxIdBaja = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    const nRegistroPatronal = req.body.nRegistroPatronal;

    sql = "select ID as nID, nRegistroPatronal, date_format(dFechaBaja,'%Y-%m-%d') as dFechaBaja, sEstado, sZonaCiudad,nSalarioMinimoZRP, PrimaDeRiesgo, sMotivoBaja from registro_patronal WHERE nRegistroPatronal  = '" + nRegistroPatronal + "'";

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
    const dFechaAlta = req.body.dFechaAlta;
    const selectEstado = req.body.selectEstado;
    const sZonaCiudad = req.body.sZonaCiudad;
    const nSalarioMinimoZRP = req.body.nSalarioMinimoZRP;
    const PrimaDeRiesgo = req.body.PrimaDeRiesgo;

    sql = "UPDATE registro_patronal SET nRegistroPatronal = '" + nRegistroPatronal + "',dFechaAlta = '" + dFechaAlta + "' ,sEstado = '" + selectEstado + "' ,sZonaCiudad = '" + sZonaCiudad + "', nSalarioMinimoZRP = " + nSalarioMinimoZRP + ", PrimaDeRiesgo = " + PrimaDeRiesgo + " WHERE ID = '" + nID + "' ";

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

    sql = "select nRegistroPatronal from registro_patronal WHERE nRegistroPatronal = '" + nRegistroPatronal + "'";

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

exports.getServicios = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    const selectServicios = req.body.selectServicios;

    sql = "select idServicio, nombre, contrato,estado as estadoServicio from servicio WHERE idServicio IN(" + selectServicios + ")";

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

exports.getServiciosPrincipal = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    sql = "select idServicio, nombre from servicio";

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

exports.asignarServicios = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    let nRegistroPatronal = req.body.nRegistroPatronal;
    let serviciosAsignados = req.body.serviciosAsignados;

    sql = "UPDATE registro_patronal SET ServiciosAsignados ='" + serviciosAsignados + "' WHERE nRegistroPatronal  ='" + nRegistroPatronal + "'";
    try {
        conn.conexion().query(sql, (error, results) => {
            if (error) {
                res.json(error);
            } else {
                console.log(results)
                res.json(results)
            }
        });
        //cerrar

    } catch (error) {
        console.log(error)

    }
}

exports.serviciosxId = async (req, res, next) => {
    var nRegistroPatronal = req.body.nRegistroPatronal;

    res.setHeader('Access-Control-Allow-Origin', '*');
    //sql = "select count(*) as 'total' from Usuario where email='" + usuario + "' and hashed_password='" + password + "'";
    sql = "SELECT ServiciosAsignados from registro_patronal WHERE nRegistroPatronal  = '" + nRegistroPatronal + "'";

    try {
        conn.conexion().query(sql, (error, results) => {
            if (error) {
                //QUEPASO MAMA

                res.json('Quepashomama');
                //                res.json(error);
            } else {
                // res.json(results);
                //res.json(results[0].hashed_password);
                conn.conexion().query(sql, (errorCons, resultados) => {
                    if (errorCons) {
                        res.json(errorCons);
                    } else {
                        res.json(resultados)
                    }



                });
            }

        });
    } catch (err) {
        console.log(error)
        //

    }
}


exports.actualizarUrlTarjetaLAboral = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    var nRegistroPatronal = req.body.nRegistroPatronal;
    var url = req.body.url;

    sql = "UPDATE registro_patronal SET sUrlTarjetaLaboral = '" + url + "' WHERE nRegistroPatronal  =" + nRegistroPatronal + ""
    //sql = "select count(*) as 'total' from Usuario where email='" + usuario + "' and password='" + password + "'";
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


