const express = require('express');
const router= express.Router()
const contabilidadController= require('../controllers/contabilidad/contabilidadController');

router.post('/getRegistroPatronal', contabilidadController.getRegistroPatronal);



module.exports= router;