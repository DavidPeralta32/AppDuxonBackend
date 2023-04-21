const express = require('express');
const router= express.Router()
const puestosController= require('../controllers/Puestos/puestosController');

router.post('/getPuestos', puestosController.getPuestos);
router.post('/agregarPuesto', puestosController.agregarPuesto);
router.post('/getPuestoxId', puestosController.getPuestoxId);
router.post('/editarPuesto', puestosController.editarPuesto);
router.post('/getPuestoxDepartamento', puestosController.getPuestoxDepartamento);




module.exports= router;