const express = require('express');
const router= express.Router()
const empleadosController= require('../controllers/empleados/empleadosController');
//rutas para el uso general
router.post('/registrar',empleadosController.registrarEmpleado);
router.post('/getEmpleados', empleadosController.getEmpleados);
router.post('/baja', empleadosController.bajaEmpleado);
router.post('/getEmpleadosBaja', empleadosController.getEmpleadosBaja);
router.post('/getEmpleadoInfo',empleadosController.getEmpleadoInfo)
router.post('/getEmpleadoxId',empleadosController.getEmpleadoxId)
router.post('/updateEmpleado',empleadosController.ActualizarEmpleado)
router.post('/reingreso',empleadosController.reingreso)
router.post('/expediente',empleadosController.getExpediente)
router.post('/updateExpediente',empleadosController.actualizarExpediente)
router.post('/documentos',empleadosController.getdocumentos)
router.post('/uURLdoc',empleadosController.actualizarURLDoc)
router.post('/actualizarEncuestaSalida',empleadosController.actualizarEncuestaSalida)
router.post('/encuestaSalidaxEmpleado',empleadosController.encuestaSalida)
router.post('/URLfotografia',empleadosController.actualizarFotografia)
router.post('/subirfoto',empleadosController.subirFoto)
router.post('/getHistorial',empleadosController.getHistorial)
router.post('/getHistorialElector',empleadosController.getHistorialElector)
router.post('/getGafeteInfo',empleadosController.getGafeteInfo)
router.post('/getGafeteInfoOperativo',empleadosController.getGafeteInfoOperativo)
router.post('/getHojaVida',empleadosController.getHojaVida)
router.post('/asignarServicios',empleadosController.asignarServicios)
router.post('/updateNADocumentos',empleadosController.updateNADocumentos)
 

router.post('/validarClave', empleadosController.validarRegistro)
router.post('/updateDocumentacion',empleadosController.actualizarDocumentacion)

router.post('/agregarMotivoBaja', empleadosController.agregarMotivoBaja)
router.post('/getTotalEmpleados', empleadosController.getTotalEmpleados)
module.exports= router;
