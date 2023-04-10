const express = require('express');
const db = require("../../models/general/generalModel");
const conexion = require("../../utils/conexion");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { token } = require('morgan');
const emailjs = require('emailjs-com');
const nodemailer = require('nodemailer');
conn = conexion.crearConexion;
//close = conexion.cerrarConexion

conn.conexion();
exports.listaServicios = async (req, res, next) => {
    var servicios = req.body.servicios;

    res.setHeader('Access-Control-Allow-Origin', '*');
    //sql = "select count(*) as 'total' from Usuario where email='" + usuario + "' and hashed_password='" + password + "'";
    sql = "SELECT * FROM Servicio WHERE Servicio.idServicio IN ("+servicios+")";
     
    try {
        conn.conexion().query(sql, (error, results) => {
            if (error) {
                //QUEPASO MAMA

                res.json(error);
                //                res.json(error);
            } else {
                res.json(results);
            }

        });
    } catch (err) {
        console.log(error)
        //

    }
}
exports.serviciosxId = async (req, res, next) => {
    var idEmpleado = req.body.idEmpleado;

    res.setHeader('Access-Control-Allow-Origin', '*');
    //sql = "select count(*) as 'total' from Usuario where email='" + usuario + "' and hashed_password='" + password + "'";
    sql = "SELECT serviciosAsignados from Empleado WHERE idEmpleado=" + idEmpleado + "";

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

exports.actualizarPermisosUsuarioCH = async (req, res, next) => {
    var idEmpleado = req.body.idEmpleado;
    var moduloCH = req.body.moduloCH
    var nuevoEmpleado = req.body.nuevoEmpleado
    var verExpediente = req.body.verExpediente
    var edicionEmpleado = req.body.edicionEmpleado
    var generarHojaVida = req.body.generarHojaVida
    var generarGafete = req.body.generarGafete
    var darBajaEmpleado = req.body.darBajaEmpleado
    var agregarEncuestaSalida = req.body.agregarEncuestaSalida
    var agregarMotivoBaja = req.body.agregarMotivoBaja
    var reingresarEmpleado = req.body.reingresarEmpleado
    var editarExpediente = req.body.editarExpediente
    var editarDocumentacion = req.body.editarDocumentacion
    var agregarFotografias = req.body.agregarFotografias
    var verHistorialLaboral = req.body.verHistorialLaboral

    res.setHeader('Access-Control-Allow-Origin', '*');

    //sql = "select count(*) as 'total' from Usuario where email='" + usuario + "' and hashed_password='" + password + "'";
    sql = `UPDATE permisosModuloCH as pm SET pm.moduloCH=` + moduloCH + `, pm.nuevoEmpleado=` + nuevoEmpleado + `,pm.verExpediente=` + verExpediente + `, pm.edicionEmpleado=` + edicionEmpleado + `, pm.edicionEmpleado=` + edicionEmpleado + `, pm.generarHojaVida=` + generarHojaVida + `,    pm.generarGafete=` + generarGafete + `,    pm.darBajaEmpleado=` + darBajaEmpleado + `,    pm.agregarEncuestaSalida=` + agregarEncuestaSalida + `, pm.agregarMotivoBaja=` + agregarMotivoBaja + `,    pm.reingresarEmpleado=` + reingresarEmpleado + `, pm.editarExpediente=` + editarExpediente + `, pm.editarDocumentacion=` + editarDocumentacion + `,pm.verHistorialLaboral=` + verHistorialLaboral + `, pm.agregarFotografias=` + agregarFotografias + ` WHERE pm.idEmpleado=` + idEmpleado + ``
    try {
        conn.conexion().query(sql, (error, results) => {
            console.log(sql)
            if (error) {
                res.json(error);
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
exports.crearPermisoCH = async (req, res, next) => {
    var idEmpleado = req.body.idEmpleado;

    res.setHeader('Access-Control-Allow-Origin', '*');
    //sql = "select count(*) as 'total' from Usuario where email='" + usuario + "' and hashed_password='" + password + "'";
    sql = " INSERT INTO `permisosModuloCH` (`moduloCH`, `nuevoEmpleado`, `verExpediente`, `edicionEmpleado`, `generarHojaVida`, `generarGafete`, `darBajaEmpleado`, `agregarEncuestaSalida`, `agregarMotivoBaja`, `reingresarEmpleado`, `editarExpediente`, `editarDocumentacion`, `agregarFotografias`, `verHistorialLaboral`, `idEmpleado`) VALUES (1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, " + idEmpleado + ");";

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
exports.permisoUsuarioCH = async (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var idEmpleado = req.body.idEmpleado;

    //sql = "select count(*) as 'total' from Usuario where email='" + usuario + "' and hashed_password='" + password + "'";
    sql = "SELECT* FROM permisosModuloCH WHERE idEmpleado=" + idEmpleado + "";

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
exports.actualizarServicio = async (req, res, next) => {
    var idServicio = req.body.idServicio
    var nombre = req.body.nombre;
    var zona = req.body.zona;
    var contrato = req.body.contrato;

    res.setHeader('Access-Control-Allow-Origin', '*');
    //sql = "select count(*) as 'total' from Usuario where email='" + usuario + "' and hashed_password='" + password + "'";
    sql = "UPDATE `Servicio` SET `nombre`='" + nombre + "', `zona`='" + zona + "', `contrato`='" + contrato + "'  WHERE `idServicio`=" + idServicio + ";";
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

exports.altaServicio = async (req, res, next) => {
    var nombre = req.body.nombre;
    var zona = req.body.zona;
    var contrato = req.body.contrato;

    res.setHeader('Access-Control-Allow-Origin', '*');
    //sql = "select count(*) as 'total' from Usuario where email='" + usuario + "' and hashed_password='" + password + "'";
    sql = "INSERT INTO `Servicio` ( `nombre`, `zona`, `contrato`, `estado`) VALUES ('" + nombre + "', '" + zona + "', '" + contrato + "', 1);";

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
exports.servicioxId = async (req, res, next) => {
    var idServicio = req.body.idServicio;

    res.setHeader('Access-Control-Allow-Origin', '*');
    //sql = "select count(*) as 'total' from Usuario where email='" + usuario + "' and hashed_password='" + password + "'";
    sql = "select* from Servicio where idServicio=" + idServicio + "";

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
exports.getRol = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    var email = req.body.email;
    sql = "SELECT* FROM DuxonApp.Usuario AS USER LEFT JOIN Rol ON Rol.idRol= USER.idRol WHERE USER.email='" + email + "'"
    try {
        conn.conexion().query(sql, (error, results) => {
            if (error) {
                res.json(error);
            } else {
                res.json(results);
            }
        });
        // 

    } catch (error) {
        console.log(error)
        //

    }
}
exports.getServicios = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    var zona = req.body.zona;
    var servicios = req.body.servicios;

    sql = "SELECT* FROM Servicio WHERE zona='" + zona + "' AND idServicio IN(" + servicios + ")"
    console.log(sql)
    try {
        conn.conexion().query(sql, (error, results) => {
            if (error) {
                res.json(error);
            } else {
                res.json(results);
            }
        });
        // 

    } catch (error) {
        console.log(error)
        //

    }
}
exports.getAllServicios = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    var zona = req.body.zona;
    sql = "SELECT* FROM Servicio"
    try {
        conn.conexion().query(sql, (error, results) => {
            if (error) {
                res.json(error);
            } else {
                res.json(results);
            }
        });
        // 

    } catch (error) {
        console.log(error)
        //

    }
}
exports.getUser = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    var zona = req.body.zona;
    // sql = "SELECT  FROM Usuario WHERE active=1 AND email!='' OR !ISNULL(email)"
    sql = "SELECT idEmpleado, CONCAT(nombre,' ',apellidoPaterno,' ', apellidoMaterno) AS 'nombre', departamento, correoDuxon, puesto FROM Empleado WHERE `status`=1 AND correoDuxon!='' AND PASSWORD !=''"
    try {
        conn.conexion().query(sql, (error, results) => {
            if (error) {
                res.json(error);
            } else {

                res.json(results);
            }
        });
        // 

    } catch (error) {
        console.log(error)
        //

    }
}
exports.getPermisos = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    var id = req.body.id;
    sql = "SELECT pm.idPermisosModulo, pm.idModulo, IF(tipoPermiso=1,'Escritura','Solo lectura') AS 'tipoPermiso',md.nombre  FROM permisosModulo AS pm  LEFT JOIN modulos AS md ON md.idModulo=pm.idModulo WHERE pm.idUsuario=" + id + " AND pm.active=1"
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
        //

    }
}
exports.getModulos = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    var id = req.body.id;

    sql = "SELECT* FROM modulos AS md WHERE md.idModulo NOT IN((SELECT pm.idModulo FROM permisosModulo AS pm WHERE active=1 AND pm.idUsuario=" + id + "))"
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
exports.registrarModulo = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    var id = req.body.id;
    var idModulo = req.body.modulo;
    var tipoPermiso = req.body.tipoPermiso;


    sql = "INSERT INTO `permisosModulo` (`idModulo`, `tipoPermiso`, `idUsuario`, `active`) VALUES (" + idModulo + ", " + tipoPermiso + ", " + id + ", 1);"
    try {
        conn.conexion().query(sql, (error, results) => {
            if (error) {
                res.json(error);
            } else {
                res.json(results);
            }
        });
        // 

    } catch (error) {
        console.log(error)
    }
}
exports.eliminarPermiso = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    //Id del permiso
    var id = req.body.id;
    sql = " UPDATE `permisosModulo` SET   `active`=0 WHERE `idPermisosModulo`=" + id + ";"
    try {
        conn.conexion().query(sql, (error, results) => {
            if (error) {
                res.json(error);
            } else {
                res.json(results);
            }
        });
        // 

    } catch (error) {
        console.log(error)
    }
}

exports.actualizarPermiso = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    //Id del permiso
    var id = req.body.id;
    //permiso
    var permiso = req.body.permiso
    sql = " UPDATE `permisosModulo` SET `tipoPermiso`=" + permiso + " WHERE `idPermisosModulo`=" + id + ";"
    try {
        conn.conexion().query(sql, (error, results) => {
            if (error) {
                res.json(error);
            } else {
                res.json(results);
            }
        });
        // 

    } catch (error) {
        console.log(error)
    }
}

exports.registrarNuevoUsuario = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    //curp para validar
    var curp = req.body.inputClaveCurp;
    var correo = req.body.inputCorreoInstitucional;

    sql = "select count(*) as 'total', idEmpleado, correoDuxon from Empleado where CURP='" + curp + "' GROUP BY idEmpleado";
    try {
        conn.conexion().query(sql, (error, results) => {
            if (error) {
                res.json(error);
            } else {

                if (results == '' || results == []) {
                    res.json([0, 0]);
                } else {

                    var idEmpleadoARegistrar = results[0].idEmpleado;
                    if (results[0].total == 1) {
                        if (results[0].correoDuxon == null || results[0].correoDuxon == '') {


                            let sql2 = "select count(*) as 'total', idEmpleado from Empleado where correoDuxon='" + correo + "' AND status='1' GROUP BY idEmpleado";
                            conn.conexion().query(sql2, (error2, results2) => {
                                if (error2) {
                                    res.json(error2);
                                } else {
                                    if (results2 == [] || results2 == '') {

                                        var pass = '';
                                        let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
                                            'abcdefghijklmnopqrstuvwxyz0123456789@#$';

                                        for (let i = 1; i <= 8; i++) {
                                            var char = Math.floor(Math.random()
                                                * str.length + 1);

                                            pass += str.charAt(char)
                                        }

                                        sql3 = " UPDATE `Empleado` SET   correoDuxon='" + correo + "', password='" + pass + "' WHERE `idEmpleado`='" + idEmpleadoARegistrar + "'";

                                        conn.conexion().query(sql3, (error3, results3) => {

                                            if (error3) {
                                                res.json(error3);
                                            } else {

                                                let jConfig = {
                                                    host: "mail.duxon.com.mx",
                                                    port: 465,
                                                    secure: true,
                                                    auth: {
                                                        "type": "login",
                                                        "user": "programador@duxon.com.mx",
                                                        "pass": "9%X_Qv%X7q-M",
                                                    },
                                                    tls: {
                                                        rejectUnauthorized: false
                                                    },
                                                };

                                                let email = {
                                                    from: "programador@duxon.com.mx",  //remitente
                                                    to: correo,  //destinatario
                                                    subject: "Registro correcto",  //asunto del correo
                                                    html: ` 
                                                    <div> 
                                                    <p>Tu registro fue exitoso, tu contraseña de acceso es la siguiente:  ${pass}
                                                    </p> 
                                                    </div> 
                                                `,
                                                };

                                                let createTransport = nodemailer.createTransport(jConfig);

                                                createTransport.sendMail(email, function (error4, info) {
                                                    if (error4) {
                                                        console.log(error4);
                                                        res.json([1, 0]);
                                                    } else {
                                                        console.log("Correo enviado correctamente");
                                                        res.json([1, 0]);
                                                    }
                                                    createTransport.close();
                                                });


                                            }
                                        });


                                    } else {
                                        res.json([1, 1]);
                                    }




                                }
                            });
                        } else {
                            res.json([0, 1]);
                        }


                    }
                }
            }
        });
        // 

    } catch (error) {
        console.log(error)
    }
}
exports.reestablecerContrasena = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    //curp para validar
    var curp = req.body.inputClaveCurpR;
    var correo = req.body.inputCorreoInstitucionalR;

    sql = "select count(*) as 'total', idEmpleado, correoDuxon from Empleado where CURP='" + curp + "' AND correoDuxon='" + correo + "' AND STATUS='1' group by idEmpleado";
    try {
        conn.conexion().query(sql, (error, results) => {
            if (error) {
                res.json(error);
            } else {

                if (results != '' && results != []) {
                    var idEmpleadoARegistrar = results[0].idEmpleado;
                    var pass = '';
                    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
                        'abcdefghijklmnopqrstuvwxyz0123456789@#$';

                    for (let i = 1; i <= 8; i++) {
                        var char = Math.floor(Math.random()
                            * str.length + 1);

                        pass += str.charAt(char)
                    }

                    sql2 = " UPDATE `Empleado` SET  password='" + pass + "' WHERE `idEmpleado`='" + idEmpleadoARegistrar + "'";

                    conn.conexion().query(sql2, (error1, results3) => {

                        if (error1) {
                            res.json(error1);
                        } else {

                            let jConfig = {
                                host: "mail.duxon.com.mx",
                                port: 465,
                                secure: true,
                                auth: {
                                    "type": "login",
                                    "user": "programador@duxon.com.mx",
                                    "pass": "9%X_Qv%X7q-M",
                                },
                                tls: {
                                    rejectUnauthorized: false
                                },
                            };

                            let email = {
                                from: "programador@duxon.com.mx",  //remitente
                                to: correo,  //destinatario
                                subject: "Reestablecimiento correcto",  //asunto del correo
                                html: ` 
                                                    <div> 
                                                    <p>Reestablecimiento de contraseña exitoso, tu contraseña de acceso es la siguiente:  ${pass}
                                                    </p> 
                                                    </div> 
                                                `,
                            };

                            let createTransport = nodemailer.createTransport(jConfig);

                            createTransport.sendMail(email, function (error2, info) {
                                if (error2) {
                                    console.log(error2);
                                    res.json([1, 0]);
                                } else {
                                    console.log("Correo enviado correctamente");
                                    res.json([1, 1]);
                                }
                                createTransport.close();
                            });


                        }
                    });




                } else {
                    res.json([0, 0]);
                }




            }
        });
        // 

    } catch (error) {
        console.log(error)
    }
}
