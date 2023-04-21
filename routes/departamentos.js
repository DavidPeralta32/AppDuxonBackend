const express = require('express');
const router= express.Router()
const departamentosController= require('../controllers/departamentos/departamentosController');

router.post('/getDepartamentos', departamentosController.getDepartamentos);
router.post('/agregarDepartamento', departamentosController.agregarDepartamento);
router.post('/getDepartamentosxId', departamentosController.getDepartamentosxId);
router.post('/editarDepartamento', departamentosController.editarDepartamento);




module.exports= router;