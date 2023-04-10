const {Router}= require('express');
const router= Router();

//rutas
router.get('/pruebas', (req, res)=>{
    const data={
        "name":"Google",
        "website":"https://google.com.mx"
    };
    res.json(data);
});



module.exports= router;