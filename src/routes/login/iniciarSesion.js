const {Router}= require('express');
const router= Router();

router.get('/',(req, res)=>{
    res.send('Inicio de sesión');
});

module.exports= router;