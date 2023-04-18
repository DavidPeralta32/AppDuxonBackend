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
//connected= conn.conexion();
//conn.conexion();
exports.asignarServicios = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    let idEmpleado = req.body.idEmpleado;
    let serviciosAsignados = req.body.serviciosAsignados;

    sql = "UPDATE Empleado SET `serviciosAsignados`='" + serviciosAsignados + "' WHERE idEmpleado=" + idEmpleado;
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

exports.getGafeteInfo = async (req, res, next) => {

    res.header('Access-Control-Allow-Origin', '*');
    //para mostrar el path del archivo a elegir 

    var id = req.body.id;
    sql = `SELECT DISTINCT   Date_format(date_add(fechaIngreso, INTERVAL 90 DAY),'%d/%m/%Y')  AS 'fechaFin',fotoLateral1,fotoLateral2, fotoFrontal,Date_format(fechaBaja,'%d/%m/%Y') fechaBaja,motivoBaja, Empleado.fechaContrato2, Servicio.nombre AS 'nombreServicio', Empleado.idServicio   AS 'idServicio',  Empleado.idEmpleado, numeroEmpleado, Date_format(fechaIngreso,'%d/%m/%Y') fechaIngreso  , turno, departamento, puesto, sueldoDeseado, Empleado.zona, Empleado.nombre, apellidoPaterno, apellidoMaterno, sexo,  Date_format(fechaNacimiento,'%d/%m/%Y') 'fechaNacimiento',
        lugarNacimiento, municipioNacimiento, estadoNacimiento, paisNacimiento, nacionalidad, estatura, peso, estadoCivil, complexion, fuma, toma, calle, nExterior,nInterior, fraccColonia, 
        codigoPostal, entreCalle,yCalle, ciudad, telefono, celular, correo, nCartilla, medicamentoQueToma, nPasaporte, CURP, RFC, afore, NSS, claveElector, tipoLicencia, fechaVigencia, tipoSangre, banco,
        cuenta, clabe, libretaMar, observaciones, numeroContrato, Date_format(fechaContrato1,'%d/%m/%Y')  fechaContrato1, nivelEstudios, infonavit, Date_format(fechaAltaImms,'%d/%m/%Y')  fechaAltaImms, 'añosLaborados', contactoEmergencia, parentescoCE, numeroCE,beneficiario,
        parentescoBE, numeroBE, comentarios,donadorOrganos, tieneAlergia, alergias, alergiasMedicamento,tieneTatuajes, tienePerforaciones, usaLentes, colorCabello, colorOjos, tipoEmpleado, Date_format(fechaContratoIndeterminado,'%d/%m/%Y') fechaContratoIndeterminado,
        numCreditoInfonavit, cpCIF, direccionCIF, poblacionCIF, 'status', enfermedadCronica, numeroLicitacion, salario, cuotaSalario, edadBeneficiario, representanteBeneficiario, equipoACargo
        FROM Empleado LEFT JOIN Empleados_servicios ON Empleado.idEmpleado = Empleados_servicios.idEmpleado
        LEFT JOIN Servicio ON Servicio.idServicio= Empleado.idServicio
        WHERE Empleado.idEmpleado=`+ id;
    try {
        conn.conexion().query(sql, async (error, results) => {
            if (error) {
                res.json(error);
            } else {
                if (!isNull(results[0].fotoFrontal)) {
                    imagen = results[0].fotoFrontal
                } else {
                    imagen = 'default.jpg'
                }
                //ESTO SEGUN PARA MOSTRAR LA RUTA  
                const template = fs.readFileSync(path.resolve() + '/templatesDoc/Gafetes admin template.docx');

                //"D:/Produccion/Servidor Pruebas/images/" + results[0].fotoFrontal
                const buffer = await dt.createReport({
                    template,
                    data: {
                        nombre: results[0].nombre + ' ' + results[0].apellidoPaterno + ' ' + results[0].apellidoPaterno,
                        curp: results[0].CURP,
                        nss: results[0].NSS,
                        alergias: results[0].alergias,
                        celular: results[0].celular,
                        domicilio: results[0].calle + ', ' + results[0].entreCalle + ' #' + results[0].nExterior + results[0].fraccColonia + ' CP. ' + results[0].codigoPostal + ' COL' + results[0].fraccColonia + ', ' + results[0].ciudad,
                        puesto: results[0].puesto
                    },
                    cmdDelimiter: ['{', '}'],
                    additionalJsContext: {
                        injectSvg: () => {
                            const foto = fs.readFileSync(path.resolve() + "/images/" + imagen);
                            return { width: 2.3, height: 2.8, data: foto, extension: '.png' };
                        }
                    }
                });
                var nombre = results[0].nombre + ' ' + results[0].apellidoPaterno + ' ' + results[0].apellidoPaterno;
                var aleatorio = Math.random();
                var nombreDocumento = "GafeteAdministrativo-" + nombre + aleatorio
                fs.writeFileSync('documents/' + nombreDocumento + '.docx', buffer)
                // console.log(documento)


                res.json([results, nombreDocumento])
                //res.json([results,config]);
            }



        });

    } catch (error) {
        console.log(error)

    }
},
    exports.getHojaVida = async (req, res, next) => {

        res.header('Access-Control-Allow-Origin', '*');

        var id = req.body.id;
        sql =
            sql = `SELECT DISTINCT   Date_format(date_add(fechaIngreso, INTERVAL 90 DAY),'%d/%m/%Y')  AS 'fechaFin',fotoLateral1,fotoLateral2, fotoFrontal,Date_format(fechaBaja,'%d/%m/%Y') fechaBaja,motivoBaja, Empleado.fechaContrato2, Servicio.nombre AS 'nombreServicio', Empleado.idServicio   AS 'idServicio',  Empleado.idEmpleado, numeroEmpleado, Date_format(fechaIngreso,'%d/%m/%Y') fechaIngreso  , turno, departamento, puesto, sueldoDeseado, Empleado.zona, Empleado.nombre, apellidoPaterno, apellidoMaterno, sexo,  Date_format(fechaNacimiento,'%d/%m/%Y') 'fechaNacimiento',
        lugarNacimiento, municipioNacimiento, estadoNacimiento, paisNacimiento, nacionalidad, estatura, peso, estadoCivil, complexion, fuma, toma, calle, nExterior,nInterior, fraccColonia, 
        codigoPostal, entreCalle,yCalle, ciudad, telefono, celular, correo, nCartilla, medicamentoQueToma, nPasaporte, CURP, RFC, afore, NSS, claveElector, tipoLicencia, fechaVigencia, tipoSangre, banco,
        cuenta, clabe, libretaMar, observaciones, numeroContrato, Date_format(fechaContrato1,'%d/%m/%Y')  fechaContrato1, nivelEstudios, infonavit, Date_format(fechaAltaImms,'%d/%m/%Y')  fechaAltaImms, 'añosLaborados', contactoEmergencia, parentescoCE, numeroCE,beneficiario,
        parentescoBE, numeroBE, comentarios,donadorOrganos, tieneAlergia, alergias, alergiasMedicamento,tieneTatuajes, tienePerforaciones, usaLentes, colorCabello, colorOjos, tipoEmpleado, Date_format(fechaContratoIndeterminado,'%d/%m/%Y') fechaContratoIndeterminado,
        numCreditoInfonavit, cpCIF, direccionCIF, poblacionCIF, 'status', enfermedadCronica, numeroLicitacion, salario, cuotaSalario, edadBeneficiario, representanteBeneficiario, equipoACargo
        FROM Empleado LEFT JOIN Empleados_servicios ON Empleado.idEmpleado = Empleados_servicios.idEmpleado
        LEFT JOIN Servicio ON Servicio.idServicio= Empleado.idServicio
        WHERE Empleado.idEmpleado=`+ id;
        try {
            let imagen = '';
            conn.conexion().query(sql, async (error, results) => {
                if (error) {
                    res.json(error);
                } else {
                    //  let image=fs.readFileSync("D:/Produccion/Servidor Pruebas/images/" + results[0].fotoFrontal)
                    const template = fs.readFileSync(path.resolve() + '/templatesDoc/Hoja de Vida template1.docx');
                    if (!isNull(results[0].fotoFrontal)) {
                        imagen = results[0].fotoFrontal
                    } else {
                        imagen = 'default.jpg'
                    }
                    const buffer = await dt.createReport({
                        template,
                        data: {
                            nombre: results[0].nombre + ' ' + results[0].apellidoPaterno + ' ' + results[0].apellidoPaterno,
                            puesto: results[0].puesto,
                            fechaIngreso: results[0].fechaIngreso,
                            lugarNacimiento: results[0].lugarNacimiento,
                            fechaNacimiento: results[0].fechaNacimiento,
                            CURP: results[0].CURP,
                            RFC: results[0].RFC,
                            sexo: results[0].sexo,
                            estadoCivil: results[0].estadoCivil,
                            NSS: results[0].NSS,
                            celular: results[0].celular,
                            tipoLicencia: results[0].tipoLicencia,
                            cartillaMilitar: results[0].nCartilla,
                            libretaMar: results[0].libretaMar,
                            calle: results[0].calle + ' entre: ' + results[0].entreCalle + ' #' + results[0].nExterior,
                            // este de colonia puede salir mal:
                            colonia: results[0].fraccColonia,
                            codigoPostal: results[0].codigoPostal,
                            ciudad: results[0].ciudad,
                            celular: results[0].celular,
                            tipoSangre: results[0].tipoSangre,
                            enfermedadCronica: results[0].enfermedadCronica,
                            medicamentoQueToma: results[0].medicamentoQueToma,
                            donadorOrganos: results[0].donadorOrganos,
                            //EDAD: EDAD   
                            peso: results[0].peso,
                            estatura: results[0].estatura,
                            tieneAlergia: results[0].tieneAlergia,
                            alergiasMedicamento: results[0].alergiasMedicamento,
                            tieneTatuajes: results[0].tieneTatuajes,
                            tienePerforaciones: results[0].tienePerforaciones,
                            complexion: results[0].complexion,
                            colorOjos: results[0].colorOjos,
                            colorCabello: results[0].colorCabello,
                            usaLentes: results[0].usaLentes,
                            fuma: results[0].fuma,
                            toma: results[0].toma,
                            contactoEmergencia: results[0].contactoEmergencia,
                            parentescoCE: results[0].parentescoCE,
                            numeroCE: results[0].numeroCE,
                            beneficiario: results[0].beneficiario,
                            parentescoBE: results[0].parentescoBE,
                            numeroBE: results[0].numeroBE,
                        },
                        cmdDelimiter: ['{', '}'],
                        additionalJsContext: {
                            injectSvg: () => {
                                const foto = fs.readFileSync(path.resolve() + "\\images\\" + imagen);
                                return { width: 2.68, height: 2.94, data: foto, extension: '.png' };
                            }
                        }
                    });
                    var nombre = results[0].nombre + ' ' + results[0].apellidoPaterno + ' ' + results[0].apellidoPaterno;
                    var aleatorio = Math.random();
                    var nombreDocumento = "Hoja de Vida de:" + nombre + aleatorio
                    fs.writeFileSync('documents/' + nombreDocumento + '.docx', buffer)
                    // console.log(documento)


                    res.json([results, nombreDocumento])
                    //res.json([results,config]);
                }



            });

        } catch (error) {
            console.log(error)

        }
    },
    exports.getGafeteInfoOperativo = async (req, res, next) => {

        let imagen = '';
        res.header('Access-Control-Allow-Origin', '*');

        var id = req.body.id;
        sql = `SELECT DISTINCT   Date_format(date_add(fechaIngreso, INTERVAL 90 DAY),'%d/%m/%Y')  AS 'fechaFin',fotoLateral1,fotoLateral2, fotoFrontal,Date_format(fechaBaja,'%d/%m/%Y') fechaBaja,motivoBaja, Empleado.fechaContrato2, Servicio.nombre AS 'nombreServicio', Empleado.idServicio   AS 'idServicio',  Empleado.idEmpleado, numeroEmpleado, Date_format(fechaIngreso,'%d/%m/%Y') fechaIngreso  , turno, departamento, puesto, sueldoDeseado, Empleado.zona, Empleado.nombre, apellidoPaterno, apellidoMaterno, sexo,  Date_format(fechaNacimiento,'%d/%m/%Y') 'fechaNacimiento',
        lugarNacimiento, municipioNacimiento, estadoNacimiento, paisNacimiento, nacionalidad, estatura, peso, estadoCivil, complexion, fuma, toma, calle, nExterior,nInterior, fraccColonia, 
        codigoPostal, entreCalle,yCalle, ciudad, telefono, celular, correo, nCartilla, medicamentoQueToma, nPasaporte, CURP, RFC, afore, NSS, claveElector, tipoLicencia, fechaVigencia, tipoSangre, banco,
        cuenta, clabe, libretaMar, observaciones, numeroContrato, Date_format(fechaContrato1,'%d/%m/%Y')  fechaContrato1, nivelEstudios, infonavit, Date_format(fechaAltaImms,'%d/%m/%Y')  fechaAltaImms, 'añosLaborados', contactoEmergencia, parentescoCE, numeroCE,beneficiario,
        parentescoBE, numeroBE, comentarios,donadorOrganos, tieneAlergia, alergias, alergiasMedicamento,tieneTatuajes, tienePerforaciones, usaLentes, colorCabello, colorOjos, tipoEmpleado, Date_format(fechaContratoIndeterminado,'%d/%m/%Y') fechaContratoIndeterminado,
        numCreditoInfonavit, cpCIF, direccionCIF, poblacionCIF, 'status', enfermedadCronica, numeroLicitacion, salario, cuotaSalario, edadBeneficiario, representanteBeneficiario, equipoACargo
        FROM Empleado LEFT JOIN Empleados_servicios ON Empleado.idEmpleado = Empleados_servicios.idEmpleado
        LEFT JOIN Servicio ON Servicio.idServicio= Empleado.idServicio
        WHERE Empleado.idEmpleado=`+ id;
        try {
            conn.conexion().query(sql, async (error, results) => {
                if (error) {
                    res.json(error);
                } else {
                    if (!isNull(results[0].fotoFrontal)) {
                        imagen = results[0].fotoFrontal
                    } else {
                        imagen = 'default.jpg'
                    }
                    //  let image=fs.readFileSync("D:/Produccion/Servidor Pruebas/images/" + results[0].fotoFrontal)
                    const template = fs.readFileSync(path.resolve() + '\\templatesDoc\\GAFETE OPERATIVO template.docx');
                    //"D:/Produccion/Servidor Pruebas/images/" + results[0].fotoFrontal
                    const buffer = await dt.createReport({
                        template,
                        data: {
                            nombre: results[0].nombre + ' ' + results[0].apellidoPaterno + ' ' + results[0].apellidoPaterno,
                            curp: results[0].CURP,
                            nss: results[0].NSS,
                            alergias: results[0].alergias,
                            celular: results[0].celular,
                            domicilio: results[0].calle + ', ' + results[0].entreCalle + ' #' + results[0].nExterior + results[0].fraccColonia + ' CP. ' + results[0].codigoPostal + ' COL' + results[0].fraccColonia + ', ' + results[0].ciudad,
                            puesto: results[0].puesto
                        },
                        cmdDelimiter: ['{', '}'],
                        additionalJsContext: {
                            injectSvg: () => {
                                const foto = fs.readFileSync(path.resolve() + "\\images\\" + imagen);
                                return { width: 2.25, height: 2.61, data: foto, extension: '.png' };
                            }
                        }
                    });
                    var nombre = results[0].nombre + ' ' + results[0].apellidoPaterno + ' ' + results[0].apellidoPaterno;
                    var aleatorio = Math.random();
                    var nombreDocumento = "GafeteOperativo-" + nombre + aleatorio
                    fs.writeFileSync('documents/' + nombreDocumento + '.docx', buffer)
                    // console.log(documento)


                    res.json([results, nombreDocumento])
                    //res.json([results,config]);
                }

            });

        } catch (error) {
            console.log(error)

        }
    }

exports.registrarEmpleado = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    var cpCIF = req.body.cpCIF;
    var direccionCIF = req.body.direccionCIF;
    var poblacionCIF = req.body.poblacionCIF;

    var nEmpleado = req.body.nEmpleado;
    var fechaIngreso = req.body.fechaIngreso;
    var selectTurno;
    var sueldoDeseado = req.body.sueldoDeseado;
    var fechaContrato2 = req.body.fechaContrato2;
    if (req.body.selectTurno == "Selecciona una opción") {
        selectTurno = '';
    } else {
        selectTurno = req.body.selectTurno;
    }
    var selectDepartamento;
    if (req.body.selectDepartamento == "Selecciona una opción") {
        selectDepartamento = '';
    } else {
        selectDepartamento = req.body.selectDepartamento;
    }

    var selectPuesto;
    if (req.body.selectPuesto == "Selecciona una opción") {
        selectPuesto = '';
    } else {
        selectPuesto = req.body.selectPuesto;
    }


    var selectZona = req.body.selectZona;
    if (req.body.selectZona == "Selecciona una opción") {
        selectZona = '';
    } else {
        selectZona = req.body.selectZona;
    }

    var numContrato = req.body.numContrato;
    var fechaContrato1 = req.body.fechaContrato1;

    var selectNivelEstudios;
    if (req.body.selectNivelEstudios == "Selecciona una opción") {
        selectNivelEstudios = '';
    } else {
        selectNivelEstudios = req.body.selectNivelEstudios;
    }
    var selectInfonavit;
    if (req.body.selectInfonavit == "Selecciona una opción") {
        selectInfonavit = '';
    } else {
        selectInfonavit = req.body.selectInfonavit;
    }


    var fechaImms = req.body.fechaImms;
    var aniosLaborados = req.body.aniosLaborados;
    var nombre = req.body.nombre;
    var apellidoPaterno = req.body.apellidoPaterno;
    var apellidoMaterno = req.body.apellidoMaterno;
    var selectSexo;
    if (req.body.selectSexo == "Selecciona una opción") {
        selectSexo = '';
    } else {
        selectSexo = req.body.selectSexo;
    }


    var selectEstadoNacimiento = req.body.selectEstadoNacimiento;
    var fechaNacimiento = req.body.fechaNacimiento;
    var lugarNacimiento = req.body.lugarNacimiento;
    var municipioNacimiento = req.body.municipioNacimiento;
    var paisNacimiento = req.body.paisNacimiento;
    var nacionalidad = req.body.nacionalidad;
    var estatura = req.body.estatura;
    var peso = req.body.peso;
    var selectEstadoCivil;
    if (req.body.selectEstadoCivil == "Selecciona una opción") {
        selectEstadoCivil = '';
    } else {
        selectEstadoCivil = req.body.selectEstadoCivil;
    }

    var selectComplexion;
    if (req.body.selectComplexion == "Selecciona una opción") {
        selectComplexion = '';
    } else {
        selectComplexion = req.body.selectComplexion;
    }

    var selectFuma;
    if (req.body.selectFuma == "Selecciona una opción") {
        selectFuma = '';
    } else {
        selectFuma = req.body.selectFuma;
    }

    var selectToma;
    if (req.body.selectToma == "Selecciona una opción") {
        selectToma = '';
    } else {
        selectToma = req.body.selectToma;
    }

    var calle = req.body.calle;
    var nExterior = req.body.nExterior;
    var nInterior = req.body.nInterior;
    var FraccColonia = req.body.FraccColonia;
    var entreCalle = req.body.entreCalle;
    var yCalle = req.body.yCalle;
    var ciudad = req.body.ciudad;
    var telefono = req.body.telefono;
    var celular = req.body.celular;
    var correo = req.body.correo;
    var nCartilla = req.body.nCartilla;
    var curp = req.body.curp;
    var nPasaporte = req.body.nPasaporte;
    var rfc = req.body.rfc;
    var afore = req.body.afore;
    var nss = req.body.nss;
    var claveElector = req.body.claveElector;
    var selectTipoLicencia;
    if (req.body.selectTipoLicencia == "Selecciona una opción") {
        selectTipoLicencia = '';
    } else {
        selectTipoLicencia = req.body.selectTipoLicencia;
    }
    var fechaVigencia = req.body.fechaVigencia;
    var selectTipoSangre;
    if (req.body.selectTipoSangre == "Selecciona una opción") {
        selectTipoSangre = '';
    } else {
        selectTipoSangre = req.body.selectTipoSangre;
    }
    var banco = req.body.banco;
    var cuenta = req.body.cuenta;
    var libretaMar = req.body.libretaMar;
    var codigoPostal = req.body.codigoPostal;
    var clabe = req.body.clabe;
    var selectOrganos;
    if (req.body.selectOrganos == "Selecciona una opción") {
        selectOrganos = '';
    } else {
        selectOrganos = req.body.selectOrganos;
    }
    var selectAlergia;
    if (req.body.selectAlergia == "Selecciona una opción") {
        selectAlergia = '';
    } else {
        selectAlergia = req.body.selectAlergia;
    }
    var alergias = req.body.alergias;
    var alergiasMedicamento = req.body.alergiasMedicamento;
    var selectTatuajes;
    if (req.body.selectTatuajes == "Selecciona una opción") {
        selectTatuajes = '';
    } else {
        selectTatuajes = req.body.selectTatuajes;
    }

    var selectPerforaciones;
    if (req.body.selectPerforaciones == "Selecciona una opción") {
        selectPerforaciones = '';
    } else {
        selectPerforaciones = req.body.selectPerforaciones;
    }
    var selectLentes;
    if (req.body.selectLentes == "Selecciona una opción") {
        selectLentes = '';
    } else {
        selectLentes = req.body.selectLentes;
    }
    var medicamentos = req.body.medicamentos;
    var colorCabello = req.body.colorCabello;
    var colorOjos = req.body.colorOjos;
    var contactoEmergencia = req.body.notificarA;
    var parentescoEmergencia = req.body.parentescoEmergencia;
    var numeroContacto = req.body.numeroContacto;
    var beneficiario = req.body.beneficiario;
    var parentescoBeneficiario = req.body.parentescoBeneficiario;
    //var numeroContactoBene = req.body.numeroContactoBene;
    var comentarios = req.body.comentarios;
    var tipoEmpleado = req.body.tipoEmpleado;
    var numCreditoInfonavit = req.body.numCreditoInfonavit;
    if (req.body.tipoEmpleado == "Selecciona una opción") {
        tipoEmpleado = '';
    } else {
        tipoEmpleado = req.body.tipoEmpleado;
    }
    var numeroLicitacion = req.body.numeroLicitacion;
    var salario = req.body.salario;
    var cuotaSalario = req.body.cuotaSalario;
    //var edadBeneficiario = req.body.edadBeneficiario;
    //var representanteBeneficiario = req.body.representanteBeneficiario;
    var selectEquipoACargo = req.body.selectEquipoACargo;
    if (req.body.selectEquipoACargo == "Selecciona una opción") {
        selectEquipoACargo = '';
    } else {
        selectEquipoACargo = req.body.selectEquipoACargo;
    }

    var fechaContratoIndeterminado = req.body.fechaContratoIndeterminado;
    var servicio = req.body.idServicio;
    if (servicio == null || servicio == '') {
        servicio = 1
    }
    var enfermedadCronica = req.body.enfermedadCronica;

    //sql = "select count(*) as 'total' from Usuario where email='" + usuario + "' and password='" + password + "'";
    sql = " INSERT INTO Empleado(numeroLicitacion, salario, cuotaSalario, equipoACargo,fechaContrato2, idServicio, status, numeroEmpleado, fechaIngreso, turno, departamento, puesto, sueldoDeseado, zona, nombre, apellidoPaterno, apellidoMaterno, sexo, fechaNacimiento, lugarNacimiento, municipioNacimiento, estadoNacimiento, paisNacimiento, nacionalidad, estatura, peso, estadoCivil, complexion, fuma, toma, calle, nExterior, nInterior, fraccColonia, codigoPostal, entreCalle, yCalle, ciudad, telefono, celular, correo, nCartilla, nPasaporte, CURP, RFC, afore, NSS, claveElector,tipoLicencia, fechaVigencia, tipoSangre, banco, cuenta, clabe, comentarios, numeroContrato, fechaContrato1, nivelEstudios, infonavit, fechaaltaImms, aniosLaborados,libretaMar, contactoEmergencia, parentescoCE, numeroCE, beneficiario, parentescoBE,donadorOrganos, tieneAlergia, alergias,alergiasMedicamento, tieneTatuajes, tienePerforaciones,usaLentes, colorCabello, colorOjos, tipoEmpleado, fechacontratoIndeterminado,numCreditoInfonavit, cpCIF,direccionCIF,poblacionCIF,medicamentoQueToma, enfermedadCronica )" +
        "VALUES('" + numeroLicitacion + "','" + salario + "','" + cuotaSalario + "','" + selectEquipoACargo + "','" + fechaContrato2 + "'," + servicio + ",1,'" + nEmpleado + "','" + fechaIngreso + "','" + selectTurno + "','" + selectDepartamento + "','" + selectPuesto + "','" + sueldoDeseado + "','" + selectZona + "','" + nombre + "','" + apellidoPaterno + "','" + apellidoMaterno + "','" + selectSexo + "','" + fechaNacimiento + "','" + lugarNacimiento + "','" + municipioNacimiento + "','" + selectEstadoNacimiento + "','" + paisNacimiento + "','" + nacionalidad + "','" + estatura + "','" + peso + "','" + selectEstadoCivil + "','" + selectComplexion + "','" + selectFuma + "','" + selectToma + "','" + calle + "','" + nExterior + "','" + nInterior + "','" + FraccColonia + "','" + codigoPostal + "','" + entreCalle + "','" + yCalle + "','" + ciudad + "','" + telefono + "','" + celular + "','" + correo + "','" + nCartilla + "','" + nPasaporte + "','" + curp + "','" + rfc + "','" + afore + "','" + nss + "','" + claveElector + "','" + selectTipoLicencia + "','" + fechaVigencia + "','" + selectTipoSangre + "','" + banco + "','" + cuenta + "','" + clabe + "','" + comentarios + "','" + numContrato + "','" + fechaContrato1 + "','" + selectNivelEstudios + "','" + selectInfonavit + "','" + fechaImms + "','" + aniosLaborados + "','" + libretaMar + "','" + contactoEmergencia + "','" + parentescoEmergencia + "','" + numeroContacto + "','" + beneficiario + "','" + parentescoBeneficiario + "','" + selectOrganos + "','" + selectAlergia + "','" + alergias + "','" + alergiasMedicamento + "','" + selectTatuajes + "','" + selectPerforaciones + "','" + selectLentes + "','" + colorCabello + "','" + colorOjos + "','" + tipoEmpleado + "','" + fechaContratoIndeterminado + "','" + numCreditoInfonavit + "','" + cpCIF + "','" + direccionCIF + "','" + poblacionCIF + "','" + medicamentos + "','" + enfermedadCronica + "') "

    try {
        conn.conexion().query(sql, (error, results) => {
            if (error) {
                res.json(error);
            } else {
                if (results.affectedRows == 1) {
                    //results.insertId
                    let sqlInsertExpediente = "INSERT INTO expedienteDocumentos   VALUES (0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0," + results.insertId + ")";
                    conn.conexion().query(sqlInsertExpediente, (error, results) => {

                    });
                    let sqlDocumentos = "INSERT INTO `Documentos` ( `idEmpleado`,`curp`, `rfc`, `nss`, `cartillaMilitar`, `ine`, `comprobanteDomicilio`, `actaNacimiento`, `comprobanteEstudios`, `contratoBanco`,  `libretaMar`, `licencia`, `estadoCurp`, `estadoRfc`, `estadoNss`, `estadoCartillaMilitar`, `estadoIne`, `estadoComprobanteDomicilio`, `estadoActaNacimiento`, `estadoComprobanteEstudios`, `estadoContratoBanco`, `estadoLibretaMar`, `estadoLicencia`) VALUES (" + results.insertId + ", '', '', '', '', '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);"
                    //let sqlDocumentos = "INSERT INTO Documentos(idEmpleado) VALUES(" + results.insertId + ")";
                    conn.conexion().query(sqlDocumentos, (error, results) => {
                    });

                    let sqlInsertarPermisos = " INSERT INTO `permisosModuloCH` (`moduloCH`, `nuevoEmpleado`, `verExpediente`, `edicionEmpleado`, `generarHojaVida`, `generarGafete`, `darBajaEmpleado`, `agregarEncuestaSalida`, `agregarMotivoBaja`, `reingresarEmpleado`, `editarExpediente`, `editarDocumentacion`, `agregarFotografias`, `verHistorialLaboral`, `idEmpleado`) VALUES (1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, " + results.insertId + ");";
                    conn.conexion().query(sqlInsertarPermisos, (error, results) => {
                    });
                }
                res.json(results);
            }
        });

    } catch (error) {
        console.log(error)

    }









}
exports.bajaEmpleado = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    let fechaBaja = req.body.fechaBaja;
    let idEmpleado = req.body.idEmpleado;
    let fechaIngreso = req.body.fechaIngreso;
    let servicio = req.body.servicio;
    let puesto = req.body.puesto;
    let motivoBaja = req.body.motivoBaja;


    sql = "UPDATE Empleado SET `status`=0, fechaBaja='" + fechaBaja + "' WHERE idEmpleado=" + idEmpleado;
    try {
        conn.conexion().query(sql, (error, results) => {
            if (error) {
                res.json(error);
            } else {
                // res.json(results);
                if (results.affectedRows > 0) {
                    sqlAgregarHistorial = " INSERT INTO `historial_empleado` (  `idEmpleado`, `fechaIngreso`, `fechaBaja`, `puesto`, `idServicio`, `motivoBaja`) VALUES (" + idEmpleado + " , '" + fechaIngreso + "',  '" + fechaBaja + "',  '" + puesto + "',  " + servicio + ", '" + motivoBaja + "');";
                    conn.conexion().query(sqlAgregarHistorial, (errors2, results2) => {
                        if (errors2) {
                            res.json(errors2);
                        } else {
                            res.json(results2);
                        }
                    });

                }
            }
        });
        //cerrar

    } catch (error) {
        console.log(error)

    }
}

exports.getEmpleados = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    let servicios = req.body.servicios;
    if (servicios == '' || servicios == null) {
        servicios = 0
    }

    /*sql += `SET @total_Campos := 0.27;`;
    sql += `SELECT DISTINCT idEmpleado, CONCAT(emp.nombre,' ', apellidoPaterno,' ', apellidoMaterno) AS 'nombre',
        IF(fechaIngreso='' ||  ISNULL(fechaIngreso),'0000-00-00',fechaIngreso) AS 'fechaIngreso' , 
       IF(service.nombre='' ||  ISNULL(service.nombre),'',service.nombre)  'servicio', 
       service.idServicio, 
       emp.motivoBaja, fotoFrontal,
        IF(emp.puesto='' ||  ISNULL(emp.puesto),'S/D',emp.puesto)  AS 'puesto', 
       
       (SELECT CONCAT(FORMAT((SUM(ed.perfilPuestos+ ed.solicitudEmpleo+ ed.altaImms +ed.reporteEntrevistaAdmin+ ed.reporteEntrevistaOp+ ed.avisoRetencionesCredito+ ed.avisoPrivacidadSolicitante+ ed.contratoDeterminado1+ ed.contratoDeterminado2+ ed.contratoIndeterminado+ ed.convenioConfi+ ed.acuerdoAntidoping+ ed.convenioTerminacionLaboral+ ed.renunciaVoluntaria+ ed.entregaDocumentacion+ ed.prestamoDocumentacion+ doc.estadoCurp + doc.estadoRfc + doc.estadoNss + doc.estadoCartillaMilitar + doc.estadoIne + doc.estadoComprobanteDomicilio+ doc.estadoActaNacimiento + doc.estadoComprobanteEstudios+ doc.estadoContratoBanco)/ IF(emp.sexo != 'Masculino', @total_Campos - 0.01, IF(emp.NALibretaMar = 1, @total_Campos - 0.01, IF(emp.NALicencia = 1,@total_Campos - 0.01,@total_Campos)))),2),'%') 
         FROM expedienteDocumentos AS ed
         LEFT JOIN Documentos AS doc
         ON ed.idEmpleado= doc.idEmpleado
         WHERE ed.idEmpleado=emp.idEmpleado) AS '% expediente', 'S/D' AS 'vacaciones', tipoEmpleado
        FROM Empleado AS emp 
         LEFT JOIN Servicio AS service ON emp.idServicio= service.idServicio 
         WHERE emp.status='1' AND emp.idServicio IN (`+ servicios + `)   order by fechaIngreso DESC`;*/

    sql = ` SELECT DISTINCT idEmpleado, CONCAT(emp.nombre,' ', apellidoPaterno,' ', apellidoMaterno) AS 'nombre',
    IF(fechaIngreso='' ||  ISNULL(fechaIngreso),'0000-00-00',fechaIngreso) AS 'fechaIngreso' , 
   IF(service.nombre='' ||  ISNULL(service.nombre),'',service.nombre)  'servicio', 
   service.idServicio, 
   emp.motivoBaja, fotoFrontal,
    IF(emp.puesto='' ||  ISNULL(emp.puesto),'S/D',emp.puesto)  AS 'puesto', 
    (SELECT CONCAT(FORMAT((SUM(ed.perfilPuestos+ ed.solicitudEmpleo+ ed.altaImms +ed.reporteEntrevistaAdmin+ ed.reporteEntrevistaOp+ ed.avisoRetencionesCredito+ ed.avisoPrivacidadSolicitante+ ed.contratoDeterminado1+ ed.contratoDeterminado2+ ed.contratoIndeterminado+ ed.convenioConfi+ ed.acuerdoAntidoping+ ed.convenioTerminacionLaboral+ ed.renunciaVoluntaria+ ed.entregaDocumentacion+ ed.prestamoDocumentacion+ doc.estadoCurp + doc.estadoRfc + doc.estadoNss + doc.estadoCartillaMilitar + doc.estadoIne + doc.estadoComprobanteDomicilio+ doc.estadoActaNacimiento + doc.estadoComprobanteEstudios+ doc.estadoContratoBanco+ doc.estadoLibretaMar+ doc.estadoLicencia
	  )/ IF(emp.sexo = 'Femenino',0.24,0.25)),2),'%')  FROM expedienteDocumentos AS ed LEFT JOIN Documentos AS doc ON ed.idEmpleado= doc.idEmpleado WHERE ed.idEmpleado=emp.idEmpleado) AS '% expediente', 'S/D' AS 'vacaciones', tipoEmpleado
    FROM Empleado AS emp 
	 LEFT JOIN Servicio AS service ON emp.idServicio= service.idServicio 
	 WHERE emp.status='1' AND emp.idServicio IN (`+ servicios + `)   order by fechaIngreso DESC
	  `

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
exports.getEmpleadosBaja = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    let servicios = req.body.servicios;
    if (servicios == '' || servicios == null) {
        servicios = 0
    }
    sql = `SELECT DISTINCT emp.tipoEmpleado, emp.status, urlEncuestaSalida, idEmpleado, CONCAT(emp.nombre,' ', apellidoPaterno,' ', apellidoMaterno) AS 'nombre',
    IF(fechaBaja='' ||  ISNULL(fechaBaja),'S/D',fechaBaja) AS 'fechaBaja' , 
    service.nombre AS 'servicio', 
    motivoBaja, 
	 IF(aniosLaborados='' || ISNULL(aniosLaborados),'S/D',aniosLaborados) as 'aniosLaborados'
    FROM Empleado AS emp LEFT JOIN Servicio AS service ON emp.idServicio= service.idServicio 
    WHERE emp.status='0' AND emp.idServicio IN (`+ servicios + `)`

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
exports.getEmpleadoInfo = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    var id = req.body.id;
    sql = `SELECT DISTINCT   Date_format(date_add(fechaIngreso, INTERVAL 90 DAY),'%d/%m/%Y')  AS 'fechaFin',fotoLateral1,fotoLateral2, fotoFrontal,Date_format(fechaBaja,'%d/%m/%Y') fechaBaja,motivoBaja, Empleado.fechaContrato2, Servicio.nombre AS 'nombreServicio', Empleado.idServicio   AS 'idServicio',  Empleado.idEmpleado, numeroEmpleado, Date_format(fechaIngreso,'%d/%m/%Y') fechaIngreso  , turno, departamento, puesto, sueldoDeseado, Empleado.zona, Empleado.nombre, apellidoPaterno, apellidoMaterno, sexo,  Date_format(fechaNacimiento,'%d/%m/%Y') 'fechaNacimiento',
        lugarNacimiento, municipioNacimiento, estadoNacimiento, paisNacimiento, nacionalidad, estatura, peso, estadoCivil, complexion, fuma, toma, calle, nExterior,nInterior, fraccColonia, 
        codigoPostal, entreCalle,yCalle, ciudad, telefono, celular, correo, nCartilla, medicamentoQueToma, nPasaporte, CURP, RFC, afore, NSS, claveElector, tipoLicencia, fechaVigencia, tipoSangre, banco,
        cuenta, clabe, libretaMar, observaciones, numeroContrato, Date_format(fechaContrato1,'%d/%m/%Y')  fechaContrato1, nivelEstudios, infonavit, Date_format(fechaAltaImms,'%d/%m/%Y')  fechaAltaImms, aniosLaborados, contactoEmergencia, parentescoCE, numeroCE,beneficiario,
        parentescoBE, numeroBE, comentarios,donadorOrganos, tieneAlergia, alergias, alergiasMedicamento,tieneTatuajes, tienePerforaciones, usaLentes, colorCabello, colorOjos, tipoEmpleado, Date_format(fechaContratoIndeterminado,'%d/%m/%Y') fechaContratoIndeterminado,
        numCreditoInfonavit, cpCIF, direccionCIF, poblacionCIF, 'status', enfermedadCronica, numeroLicitacion, salario, cuotaSalario, edadBeneficiario, representanteBeneficiario, equipoACargo
        FROM Empleado LEFT JOIN Empleados_servicios ON Empleado.idEmpleado = Empleados_servicios.idEmpleado
        LEFT JOIN Servicio ON Servicio.idServicio= Empleado.idServicio
        WHERE Empleado.idEmpleado=`+ id;
    try {
        conn.conexion().query(sql, (error, results) => {
            if (error) {
                res.json(error);
            } else {
                res.json(results);
            }
        });
    } catch (error) {
        res.json(error)
        console.log(error)
    }
}
exports.getEmpleadoxId = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    var id = req.body.id;

    sql = `SELECT DISTINCT fechaIngreso AS 'fechaFin',fotoLateral1,fotoLateral2, fotoFrontal,fechaBaja,motivoBaja, Empleado.fechaContrato2, Servicio.nombre AS 'nombreServicio', Empleado.idServicio   AS 'idServicio',  Empleado.idEmpleado, numeroEmpleado, fechaIngreso , turno, departamento, puesto, sueldoDeseado, Empleado.zona, Empleado.nombre, apellidoPaterno, apellidoMaterno, sexo, fechaNacimiento,
        lugarNacimiento, municipioNacimiento, estadoNacimiento, paisNacimiento, nacionalidad, estatura, peso, estadoCivil, complexion, fuma, toma, calle, nExterior,nInterior, fraccColonia, 
        codigoPostal, entreCalle,yCalle, ciudad, telefono, celular, correo, nCartilla, medicamentoQueToma, nPasaporte, CURP, RFC, afore, NSS, claveElector, tipoLicencia, fechaVigencia, tipoSangre, banco,
        cuenta, clabe, libretaMar, observaciones, numeroContrato, fechaContrato1, nivelEstudios, infonavit, fechaAltaImms, aniosLaborados, contactoEmergencia, parentescoCE, numeroCE,beneficiario,
        parentescoBE, numeroBE, comentarios,donadorOrganos, tieneAlergia, alergias, alergiasMedicamento,tieneTatuajes, tienePerforaciones, usaLentes, colorCabello, colorOjos, tipoEmpleado, Empleado.fechaContratoIndeterminado,
        numCreditoInfonavit, cpCIF, direccionCIF, poblacionCIF, 'status', enfermedadCronica, numeroLicitacion, salario, cuotaSalario, edadBeneficiario, representanteBeneficiario, equipoACargo
        FROM Empleado LEFT JOIN Empleados_servicios ON Empleado.idEmpleado = Empleados_servicios.idEmpleado
        LEFT JOIN Servicio ON Servicio.idServicio= Empleado.idServicio
        WHERE Empleado.idEmpleado=`+ id;
    try {
        conn.conexion().query(sql, (error, results) => {
            if (error) {
                res.json(error);
            } else {

                let base64;
                if (results[0].fotoFrontal != null && results[0].fotoFrontal != '') {
                    base64 = results[0].fotoFrontal.toString('ascii');
                } else {
                    base64 = ''
                }

                let fotoLateral1;
                if (results[0].fotoLateral1 != '' && results[0].fotoLateral1 != null) {
                    fotoLateral1 = results[0].fotoLateral1.toString('ascii');
                } else {
                    fotoLateral1 = '';
                }

                let fotoLateral2;
                if (results[0].fotoLateral2 != '' && results[0].fotoLateral2 != null) {
                    fotoLateral2 = results[0].fotoLateral2.toString('ascii');
                } else {
                    fotoLateral2 = ''
                }

                let resp = [base64, fotoLateral1, fotoLateral2]
                res.json([results, resp]);


            }
        });

    } catch (error) {
        console.log(error)

    }
}
exports.ActualizarEmpleado = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    var idServicio = req.body.idServicio;

    var fechaContrato2 = req.body.fechaContrato2;

    var id = req.body.id;
    var cpCIF = req.body.cpCIF;
    var direccionCIF = req.body.direccionCIF;
    var poblacionCIF = req.body.poblacionCIF;

    var nEmpleado = req.body.nEmpleado;
    var fechaIngreso = req.body.fechaIngreso;
    var selectTurno;
    var sueldoDeseado = req.body.sueldoDeseado;

    if (req.body.selectTurno == "Selecciona una opción") {
        selectTurno = '';
    } else {
        selectTurno = req.body.selectTurno;
    }
    var selectDepartamento;
    if (req.body.selectDepartamento == "Selecciona una opción") {
        selectDepartamento = '';
    } else {
        selectDepartamento = req.body.selectDepartamento;
    }

    var selectPuesto;
    if (req.body.selectPuesto == "Selecciona una opción") {
        selectPuesto = '';
    } else {
        selectPuesto = req.body.selectPuesto;
    }


    var selectZona = req.body.selectZona;
    if (req.body.selectZona == "Selecciona una opción") {
        selectZona = '';
    } else {
        selectZona = req.body.selectZona;
    }

    var numContrato = req.body.numContrato;
    var fechaContrato1 = req.body.fechaContrato1;

    var selectNivelEstudios;
    if (req.body.selectNivelEstudios == "Selecciona una opción") {
        selectNivelEstudios = '';
    } else {
        selectNivelEstudios = req.body.selectNivelEstudios;
    }
    var selectInfonavit;
    if (req.body.selectInfonavit == "Selecciona una opción") {
        selectInfonavit = '';
    } else {
        selectInfonavit = req.body.selectInfonavit;
    }


    var fechaImms = req.body.fechaImms;
    var aniosLaborados = req.body.aniosLaborados;
    var nombre = req.body.nombre;
    var apellidoPaterno = req.body.apellidoPaterno;
    var apellidoMaterno = req.body.apellidoMaterno;
    var selectSexo;
    if (req.body.selectSexo == "Selecciona una opción") {
        selectSexo = '';
    } else {
        selectSexo = req.body.selectSexo;
    }


    var selectEstadoNacimiento = req.body.selectEstadoNacimiento;
    var fechaNacimiento = req.body.fechaNacimiento;
    var lugarNacimiento = req.body.lugarNacimiento;
    var municipioNacimiento = req.body.municipioNacimiento;
    var paisNacimiento = req.body.paisNacimiento;
    var nacionalidad = req.body.nacionalidad;
    var estatura = req.body.estatura;
    var peso = req.body.peso;
    var selectEstadoCivil;
    if (req.body.selectEstadoCivil == "Selecciona una opción") {
        selectEstadoCivil = '';
    } else {
        selectEstadoCivil = req.body.selectEstadoCivil;
    }

    var selectComplexion;
    if (req.body.selectComplexion == "Selecciona una opción") {
        selectComplexion = '';
    } else {
        selectComplexion = req.body.selectComplexion;
    }

    var selectFuma;
    if (req.body.selectFuma == "Selecciona una opción") {
        selectFuma = '';
    } else {
        selectFuma = req.body.selectFuma;
    }

    var selectToma;
    if (req.body.selectToma == "Selecciona una opción") {
        selectToma = '';
    } else {
        selectToma = req.body.selectToma;
    }

    var calle = req.body.calle;
    var nExterior = req.body.nExterior;
    var nInterior = req.body.nInterior;
    var FraccColonia = req.body.FraccColonia;
    var entreCalle = req.body.entreCalle;
    var yCalle = req.body.yCalle;
    var ciudad = req.body.ciudad;
    var telefono = req.body.telefono;
    var celular = req.body.celular;
    var correo = req.body.correo;
    var nCartilla = req.body.nCartilla;
    var curp = req.body.curp;
    var nPasaporte = req.body.nPasaporte;
    var rfc = req.body.rfc;
    var afore = req.body.afore;
    var nss = req.body.nss;
    var claveElector = req.body.claveElector;
    var selectTipoLicencia;
    if (req.body.selectTipoLicencia == "Selecciona una opción") {
        selectTipoLicencia = '';
    } else {
        selectTipoLicencia = req.body.selectTipoLicencia;
    }
    var fechaVigencia = req.body.fechaVigencia;
    var selectTipoSangre;
    if (req.body.selectTipoSangre == "Selecciona una opción") {
        selectTipoSangre = '';
    } else {
        selectTipoSangre = req.body.selectTipoSangre;
    }
    var banco = req.body.banco;
    var cuenta = req.body.cuenta;
    var libretaMar = req.body.libretaMar;
    var codigoPostal = req.body.codigoPostal;
    var clabe = req.body.clabe;
    var selectOrganos;
    if (req.body.selectOrganos == "Selecciona una opción") {
        selectOrganos = '';
    } else {
        selectOrganos = req.body.selectOrganos;
    }
    var selectAlergia;
    if (req.body.selectAlergia == "Selecciona una opción") {
        selectAlergia = '';
    } else {
        selectAlergia = req.body.selectAlergia;
    }
    var alergias = req.body.alergias;
    var alergiasMedicamento = req.body.alergiasMedicamento;
    var selectTatuajes;
    if (req.body.selectTatuajes == "Selecciona una opción") {
        selectTatuajes = '';
    } else {
        selectTatuajes = req.body.selectTatuajes;
    }

    var selectPerforaciones;
    if (req.body.selectPerforaciones == "Selecciona una opción") {
        selectPerforaciones = '';
    } else {
        selectPerforaciones = req.body.selectPerforaciones;
    }
    var selectLentes;
    if (req.body.selectLentes == "Selecciona una opción") {
        selectLentes = '';
    } else {
        selectLentes = req.body.selectLentes;
    }
    var medicamentos = req.body.medicamentos;
    var colorCabello = req.body.colorCabello;
    var colorOjos = req.body.colorOjos;
    var contactoEmergencia = req.body.notificarA;
    var parentescoEmergencia = req.body.parentescoEmergencia;
    var numeroContacto = req.body.numeroContacto;
    var beneficiario = req.body.beneficiario;
    var parentescoBeneficiario = req.body.parentescoBeneficiario;
    //var numeroContactoBene = req.body.numeroContactoBene;
    var comentarios = req.body.comentarios;
    var tipoEmpleado = req.body.tipoEmpleado;
    var numCreditoInfonavit = req.body.numCreditoInfonavit;
    if (req.body.tipoEmpleado == "Selecciona una opción") {
        tipoEmpleado = '';
    } else {
        tipoEmpleado = req.body.tipoEmpleado;
    }
    var fechaContratoIndeterminado = req.body.fechaContratoIndeterminado;
    var servicios = req.body.servicios;
    var enfermedadCronica = req.body.enfermedadCronica;
    var numeroLicitacion = req.body.numeroLicitacion;
    var salario = req.body.salario;
    var cuotaSalario = req.body.cuotaSalario;
    // var edadBeneficiario = req.body.edadBeneficiario;
    // var representanteBeneficiario = req.body.representanteBeneficiario;
    var selectEquipoACargo = req.body.selectEquipoACargo;
    if (req.body.selectEquipoACargo == "Selecciona una opción") {
        selectEquipoACargo = '';
    } else {
        selectEquipoACargo = req.body.selectEquipoACargo;
    }


    //sql = "select count(*) as 'total' from Usuario where email='" + usuario + "' and password='" + password + "'";
    sql = "UPDATE Empleado SET status=1, numeroLicitacion='" + numeroLicitacion + "', salario='" + salario + "', cuotaSalario='" + cuotaSalario + "', equipoACargo='" + selectEquipoACargo + "',fechaContrato2='" + fechaContrato2 + "', idServicio=" + idServicio + ", numeroEmpleado='" + nEmpleado + "', fechaIngreso='" + fechaIngreso + "',turno='" + selectTurno + "',departamento='" + selectDepartamento + "',puesto='" + selectPuesto + "',sueldoDeseado='" + sueldoDeseado + "',zona='" + selectZona + "',nombre='" + nombre + "',apellidoPaterno='" + apellidoPaterno + "',apellidoMaterno='" + apellidoMaterno + "',sexo='" + selectSexo + "',fechaNacimiento='" + fechaNacimiento + "',lugarNacimiento='" + lugarNacimiento + "',municipioNacimiento='" + municipioNacimiento + "',estadoNacimiento='" + selectEstadoNacimiento + "',paisNacimiento='" + paisNacimiento + "',nacionalidad='" + nacionalidad + "',estatura='" + estatura + "',peso='" + peso + "',estadoCivil='" + selectEstadoCivil + "',complexion='" + selectComplexion + "', fuma='" + selectFuma + "',toma='" + selectToma + "',calle='" + calle + "',nExterior='" + nExterior + "',nInterior='" + nInterior + "',fraccColonia='" + FraccColonia + "',codigoPostal='" + codigoPostal + "',entreCalle= '" + entreCalle + "',yCalle='" + yCalle + "', ciudad='" + ciudad + "',telefono='" + telefono + "',celular='" + celular + "',correo='" + correo + "',nCartilla='" + nCartilla + "',nPasaporte='" + nPasaporte + "',CURP='" + curp + "',RFC='" + rfc + "',afore='" + afore + "',NSS='" + nss + "',claveElector='" + claveElector + "',tipoLicencia='" + selectTipoLicencia + "',fechaVigencia='" + fechaVigencia + "',tipoSangre='" + selectTipoSangre + "',banco='" + banco + "',cuenta='" + cuenta + "',clabe= '" + clabe + "',comentarios='" + comentarios + "',numeroContrato='" + numContrato + "', fechaContrato1='" + fechaContrato1 + "', nivelEstudios='" + selectNivelEstudios + "',infonavit= '" + selectInfonavit + "',fechaaltaImms='" + fechaImms + "',aniosLaborados='" + aniosLaborados + "',libretaMar='" + libretaMar + "',contactoEmergencia='" + contactoEmergencia + "',parentescoCE= '" + parentescoEmergencia + "',numeroCE='" + numeroContacto + "',beneficiario='" + beneficiario + "',parentescoBE='" + parentescoBeneficiario + "',donadorOrganos='" + selectOrganos + "',tieneAlergia='" + selectAlergia + "',alergias='" + alergias + "',alergiasMedicamento='" + alergiasMedicamento + "',tieneTatuajes='" + selectTatuajes + "',tienePerforaciones='" + selectPerforaciones + "',usaLentes='" + selectLentes + "',colorCabello='" + colorCabello + "',colorOjos='" + colorOjos + "',tipoEmpleado='" + tipoEmpleado + "',fechacontratoIndeterminado='" + fechaContratoIndeterminado + "',numCreditoInfonavit='" + numCreditoInfonavit + "',cpCIF='" + cpCIF + "',direccionCIF='" + direccionCIF + "',poblacionCIF='" + poblacionCIF + "',medicamentoQueToma='" + medicamentos + "',enfermedadCronica='" + enfermedadCronica + "' WHERE idEmpleado=" + id + "";
    console.log(sql)






    try {
        conn.conexion().query(sql, (error, results) => {
            if (error) {
                res.json(error);
            } else {
                if (results.affectedRows > 0 && servicios != null) {


                    for (let index = 0; index < servicios.length; index++) {
                        const servicio = servicios[index];
                        let query = "INSERT INTO Empleados_servicios(idServicio, idEmpleado) values(" + servicio + "," + results.insertId + ")"
                        conn.conexion().query(query, (error, results) => { })

                    }
                }
                res.json(results);

                //res.json(results.insertId)
            }
        });

    } catch (error) {

        console.log(error)
    }









}

exports.reingreso = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    var id = req.body.id;
    var fechareIngreso = req.body.fechareIngreso;
    var departamento = req.body.selectDepartamento;
    var tipoEmpleado = req.body.tipoEmpleado;
    var zona = req.body.selectZona;
    var idServicio = req.body.selectServicio;
    var puesto = req.body.selectPuesto;

    //sql = "select count(*) as 'total' from Usuario where email='" + usuario + "' and password='" + password + "'";
    sql = "UPDATE Empleado SET urlEncuestaSalida='',motivoBaja='',status=1, fechareIngreso='" + fechareIngreso + "', departamento='" + departamento + "', tipoEmpleado='" + tipoEmpleado + "', zona='" + zona + "',idServicio=" + idServicio + ",puesto='" + puesto + "' WHERE idEmpleado=" + id + "";
    try {
        conn.conexion().query(sql, (error, results) => {
            if (error) {
                res.json(error);
            } else {
                res.json(results);
                //res.json(results.insertId)
            }
        });

    } catch (error) {
        console.log(error)

    }









}

exports.getExpediente = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    var id = req.body.id;
    var fechareIngreso = req.body.fechareIngreso;

    //sql = "select count(*) as 'total' from Usuario where email='" + usuario + "' and password='" + password + "'";
    sql = "SELECT ED.perfilPuestos,ED.solicitudEmpleo, ED.reporteEntrevistaAdmin, ED.reporteEntrevistaOp, ED.avisoRetencionesCredito, ED.avisoPrivacidadSolicitante, ED.contratoDeterminado1, ED.contratoDeterminado2, ED.ContratoIndeterminado, ED.convenioConfi, ED.acuerdoAntidoping, ED.altaImms, ED.convenioTerminacionLaboral, ED.renunciaVoluntaria,ED.entregaDocumentacion, ED.prestamoDocumentacion    FROM expedienteDocumentos AS ED INNER JOIN Empleado ON ED.idEmpleado= Empleado.idEmpleado WHERE Empleado.idEmpleado=" + id + "";
    try {
        conn.conexion().query(sql, (error, results) => {
            if (error) {
                res.json(error);
            } else {
                res.json(results);
                //res.json(results.insertId)
            }
        });

    } catch (error) {
        console.log(error)

    }
}
exports.getdocumentos = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    var id = req.body.id;


    //sql = "select count(*) as 'total' from Usuario where email='" + usuario + "' and password='" + password + "'";
    sql = "SELECT doc.curp, doc.rfc, doc.nss, doc.cartillaMilitar, doc.ine, doc.comprobanteDomicilio, doc.actaNacimiento, doc.actaNacimiento, doc.comprobanteEstudios, doc.contratoBanco, doc.libretaMar, doc.licencia, Empleado.NALibretaMar, Empleado.NALicencia  FROM Documentos AS doc INNER JOIN Empleado ON doc.idEmpleado= Empleado.idEmpleado WHERE Empleado.idEmpleado=" + id + "";
    try {
        conn.conexion().query(sql, (error, results) => {
            if (error) {
                res.json(error);
            } else {
                res.json(results);
                //res.json(results.insertId)
            }
        });

    } catch (error) {

        console.log(error)
    }
}
exports.actualizarExpediente = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    var id = req.body.id;
    var columnaExpediente = req.body.columna;
    var estado = req.body.estado;

    sql = "UPDATE expedienteDocumentos SET " + columnaExpediente + "=" + estado + " WHERE idEmpleado=" + id + ""
    //sql = "select count(*) as 'total' from Usuario where email='" + usuario + "' and password='" + password + "'";
    try {
        conn.conexion().query(sql, (error, results) => {
            if (error) {
                res.json(error);
            } else {
                res.json(results);
                //res.json(results.insertId)
            }
        });

    } catch (error) {

        console.log(error)
    }
}

exports.actualizarURLDoc = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    var id = req.body.id;
    var documento = req.body.columna;
    var url = req.body.url;

    sql = "UPDATE Documentos SET " + documento + "='" + url + "' WHERE idEmpleado=" + id + ""
    //sql = "select count(*) as 'total' from Usuario where email='" + usuario + "' and password='" + password + "'";
    try {
        conn.conexion().query(sql, (error, results) => {
            if (error) {
                res.json(error);
            } else {
                res.json(results);
                //res.json(results.insertId)
            }
        });

    } catch (error) {

        console.log(error)
    }
}

exports.actualizarEncuestaSalida = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    var id = req.body.id;
    var url = req.body.url;

    sql = "UPDATE Empleado SET urlEncuestaSalida='" + url + "' WHERE idEmpleado=" + id + ""
    //sql = "select count(*) as 'total' from Usuario where email='" + usuario + "' and password='" + password + "'";
    try {
        conn.conexion().query(sql, (error, results) => {
            if (error) {
                res.json(error);
            } else {
                res.json(results);
                //res.json(results.insertId)
            }
        });

    } catch (error) {

        console.log(error)
    }
}
exports.getEncuestaSalidaByEmpleado = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    var id = req.body.id;

    //sql = "select count(*) as 'total' from Usuario where email='" + usuario + "' and password='" + password + "'";
    sql = "SELECT urlEncuestaSalida FROM Empleado WHERE Empleado.idEmpleado=" + id + "";
    try {
        conn.conexion().query(sql, (error, results) => {
            if (error) {
                res.json(error);
            } else {
                res.json(results);
                //res.json(results.insertId)
            }
        });

    } catch (error) {
        console.log(error)
    }
}
exports.actualizarFotografia = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    var id = req.body.id;
    var url = req.body.url;
    var campo = req.body.campo;

    sql = "UPDATE Empleado SET " + campo + "='" + url + "' WHERE idEmpleado=" + id + ""
    //sql = "select count(*) as 'total' from Usuario where email='" + usuario + "' and password='" + password + "'";
    try {
        conn.conexion().query(sql, (error, results) => {
            if (error) {
                res.json(error);
            } else {
                res.json(results);
                //res.json(results.insertId)
            }
        });

    } catch (error) {

        console.log(error)
    }
}
exports.getUrlFotografia = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    var id = req.body.id;

    //sql = "select count(*) as 'total' from Usuario where email='" + usuario + "' and password='" + password + "'";
    sql = "SELECT fotoPerfil, fotoFrontal FROM Empleado WHERE Empleado.idEmpleado=" + id + "";
    try {
        conn.conexion().query(sql, (error, results) => {
            if (error) {
                res.json(error);
            } else {
                res.json(results);
                //res.json(results.insertId)
            }
        });

    } catch (error) {

        console.log(error)
    }
}
exports.foto = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.json(req.body);

}
exports.subirFoto = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    //let b64Image = req.body.foto;
    var b64Image = req.body.foto.replace(/^data:image\/png;base64,/, "");

    let id = req.body.id;
    let tipoFoto = req.body.tipoFoto;

    let random = Math.random();
    let nombreFoto = tipoFoto + "-" + id + "-" + random
    require("fs").writeFile("images/" + nombreFoto + ".png", b64Image, 'base64', function (err) { console.log(err); });
    sql = "UPDATE Empleado SET " + tipoFoto + "= '" + nombreFoto + ".png' WHERE idEmpleado=" + id + ""

    try {
        conn.conexion().query(sql, (error, results) => {
            if (error) {
                res.json(error);
            } else {
                res.json(results);
                //res.json(results.insertId)
            }
        });

    } catch (error) {

        console.log(error)
    }





}
exports.getHistorial = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    var id = req.body.id;

    sql = " SELECT * FROM historial_empleado AS he LEFT JOIN Servicio AS serv ON serv.idServicio= he.idServicio where idEmpleado=" + id + "";
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
exports.agregarMotivoBaja = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    var id = req.body.id;
    var motivoBaja = req.body.motivoBaja;

    //sql = "select count(*) as 'total' from Usuario where email='" + usuario + "' and password='" + password + "'";
    //sql = "UPDATE empleado SET motivoBaja='" + motivoBaja + "' WHERE idEmpleado=" + id + "";
    sql = "UPDATE historial_empleado AS HE1 SET HE1.motivoBaja='" + motivoBaja + "'WHERE HE1.idHistorial=(SELECT * from (select HE.idHistorial FROM historial_empleado AS HE WHERE HE.idEmpleado = '" + id + "'  ORDER BY HE.idHistorial DESC LIMIT 1) as t)";

    try {
        conn.conexion().query(sql, (error, results) => {
            if (error) {
                res.json(error);
            } else {
                sql = "UPDATE Empleado SET motivoBaja='" + motivoBaja + "' WHERE idEmpleado=" + id + "";
                conn.conexion().query(sql, (error, results) => {
                });
                console.log(sql)
                res.json(results);



                //res.json(results.insertId)
            }
        });

    } catch (error) {
        console.log(error)

    }

}

exports.encuestaSalida = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    var id = req.body.id;

    //sql = "select count(*) as 'total' from Usuario where email='" + usuario + "' and password='" + password + "'";
    sql = "SELECT urlEncuestaSalida from Empleado WHERE idEmpleado=" + id + "";

    try {
        conn.conexion().query(sql, (error, results) => {
            if (error) {
                res.json(error);
            } else {
                res.json(results);
                //res.json(results.insertId)
            }
        });

    } catch (error) {
        console.log(error)

    }









}
exports.validarRegistro = async (req, res, next) => {
    var clave = req.body.clave;
    res.setHeader('Access-Control-Allow-Origin', '*');


    sql="SELECT  CONCAT(Empleado.nombre,' ',Empleado.apellidoPaterno,' ',Empleado.apellidoMaterno) as nombre ,idEmpleado, STATUS,departamento, puesto, tipoEmpleado, Servicio.nombre AS 'servicio' from Empleado LEFT JOIN Servicio ON Servicio.idServicio= Empleado.idServicio  WHERE CURP='"+clave+"'"
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

exports.actualizarDocumentacion = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    var id = req.body.id;
    var estado = req.body.estado;
    var columna = req.body.columna;



    sql = "UPDATE Documentos SET " + columna + "=" + estado + " WHERE idEmpleado=" + id + ""
    //sql = "select count(*) as 'total' from Usuario where email='" + usuario + "' and password='" + password + "'";
    try {
        conn.conexion().query(sql, (error, results) => {
            if (error) {
                res.json(error);
            } else {
                res.json(results);
                //res.json(results.insertId)
            }
        });
    } catch (error) {

        console.log(error)
    }
}

exports.getHistorialElector = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    var curp = req.body.curp;


    sql = " SELECT hemp.idHistorial, hemp.fechaIngreso,hemp.fechaBaja, hemp.motivoBaja,hemp.puesto,hemp.idServicio, hemp.idEmpleado FROM historial_empleado AS hemp  LEFT JOIN Empleado ON Empleado.idEmpleado= hemp.idEmpleado WHERE Empleado.CURP='" + curp + "'";
    try {
        conn.conexion().query(sql, (error, results) => {
            //console.log(sql)
            if (error) {
                res.json(error);
            } else {
                sqlIdEmpleado = "Select idEmpleado from Empleado where CURP='" + curp + "'";
                console.log(sqlIdEmpleado)
                conn.conexion().query(sqlIdEmpleado, (error2, results2) => {
                    res.json([results, results2]);
                });


            }
        });

    } catch (error) {
        console.log(error)

    }
}
exports.getTotalEmpleados = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    var servicios = req.body.servicios;
   // sql2 = " SELECT hemp.idHistorial, hemp.fechaIngreso,hemp.fechaBaja, hemp.motivoBaja,hemp.puesto,hemp.idServicio, hemp.idEmpleado FROM historial_empleado AS hemp  LEFT JOIN Empleado ON Empleado.idEmpleado= hemp.idEmpleado WHERE Empleado.CURP='" + curp + "'";
    sql = "SELECT (SELECT COUNT(*) FROM Empleado AS emp LEFT JOIN Servicio AS service ON emp.idServicio = service.idServicio  WHERE emp.status = '1' AND emp.idServicio IN("+servicios+")   order by fechaIngreso DESC) AS activos, (SELECT COUNT(*) FROM Empleado AS emp  LEFT JOIN Servicio AS service ON emp.idServicio = service.idServicio  WHERE emp.status = '0' AND emp.idServicio IN("+servicios+")   order by fechaIngreso DESC) AS bajas,(SELECT COUNT(*) FROM registro_patronal WHERE nEstatus = 1 order by dFechaAlta DESC) as registroPatronal"
    try {
        conn.conexion().query(sql, (error, results) => {
            if (error) {
                res.json(error);
            } else {
              res.json(results)
            }
        });

    } catch (error) {
        console.log(error)

    }
}

exports.updateNADocumentos = async(req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');

    let id = req.body.id;
    let columna = req.body.columna;
    let value = req.body.value;

    sql = "UPDATE empleado SET " + columna + "=" + value + " WHERE idEmpleado=" + id + ""
    try {
        conn.conexion().query(sql, (error, results) => {
            if (error) {
                res.json(error);
            } else {
                res.json(results);
                //res.json(results.insertId)
            }
        });
    } catch (error) {

        console.log(error)
    }
}
