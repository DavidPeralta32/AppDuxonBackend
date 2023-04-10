const express = require('express');
const router= express.Router()
const generalController= require('../controllers/general/generalController');
 
//rutas para el uso general

//validarToken
function validarToken(req, res, next){
    const Cabecera= req.headers['authorization'];
    if(typeof Cabecera !=='undefined'){
   next()
    }else{
        //console.log('Error de autorización')  
        res.json("Auth correct")
    }
 
    }
//router.post('/login',validarToken,generalController.validarLogin);
router.post('/login',generalController.validarLogin);
router.post('/rol',generalController.getRol);
router.post('/servicios',generalController.getServicios)
router.post('/user',generalController.getUser)
router.post('/userPermisos',generalController.getPermisos)
router.post('/getModulos',generalController.getModulos)
router.post('/registrarModulo',generalController.registrarModulo)
router.post('/eliminarPermiso',generalController.eliminarPermiso)
router.post('/actualizarPermiso',generalController.actualizarPermiso)
router.post('/registrarNuevoUsuario',generalController.registrarNuevoUsuario)
router.post('/reestablecerContrasena',generalController.reestablecerContrasena)
router.post('/allServicios',generalController.getAllServicios)
router.post('/servicioxId',generalController.servicioxId)
router.post('/altaServicio',generalController.altaServicio)
router.post('/actualizarServicio',generalController.actualizarServicio)
router.post('/permisoUsuarioCH',generalController.permisoUsuarioCH)
router.post('/crearPermisoCH',generalController.crearPermisoCH)
router.post('/actualizarPermisosUsuarioCH',generalController.actualizarPermisosUsuarioCH)
router.post('/serviciosxId',generalController.serviciosxId)
router.post('/permisos',generalController.serviciosxId)
router.post('/listaServicios',generalController.listaServicios)





module.exports= router;