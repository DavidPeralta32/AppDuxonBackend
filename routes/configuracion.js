const express = require('express');
const router = express.Router()
const configuracionController = require('../controllers/configuracion/configuracionController');



router.post('/login', configuracionController.validarLogin);
router.post('/permisoUsuarioRPatronal',configuracionController.permisoUsuarioRPatronal);
router.post('/crearPermisoRPatronal',configuracionController.crearPermisoRPatronal);
router.post('/actualizarPermisosUsuarioRPatronal',configuracionController.actualizarPermisosUsuarioRPatronal);


module.exports= router;