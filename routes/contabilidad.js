const express = require('express');
const router= express.Router()
const contabilidadController= require('../controllers/contabilidad/contabilidadController');

router.post('/getRegistroPatronal', contabilidadController.getRegistroPatronal);
router.post('/getRegistroPatronalBaja', contabilidadController.getRegistroPatronalBaja);
router.post('/altaRegistroPatronal', contabilidadController.altaRegistroPatronal);
router.post('/bajaRegistroPatronal', contabilidadController.bajaRegistroPatronal);
router.post('/activarRegistroPatronal', contabilidadController.activarRegistroPatronal);
router.post('/getRegistroPatronalxId', contabilidadController.getRegistroPatronalxId);
router.post('/editarRegistroPatronal', contabilidadController.editarRegistroPatronal);
router.post('/validarNRegistroPatronal', contabilidadController.validarNRegistroPatronal);



module.exports= router;