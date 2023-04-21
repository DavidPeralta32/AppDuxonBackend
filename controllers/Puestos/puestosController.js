const conexion = require("../../utils/conexion");


conn = conexion.crearConexion;
close = conexion.cerrarConexion

exports.getPuestos = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    sql = "SELECT pue.idPuestos, pue.sNombrePuesto, pue.sDescripcion, pue.idDepartamento, dep.sNombreDepartamento as Departamento FROM puestos as pue INNER JOIN departamentos as dep ON dep.idDepartamento = pue.idDepartamento";

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

exports.getPuestoxDepartamento = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    const idDepartamento = req.body.nIdDepartamento;

    sql = "SELECT pue.idPuestos, pue.sNombrePuesto, pue.sDescripcion as sDescripcionPuesto, pue.idDepartamento, dep.sNombreDepartamento as Departamento FROM puestos as pue INNER JOIN departamentos as dep ON dep.idDepartamento = pue.idDepartamento WHERE pue.idDepartamento = "+idDepartamento+"";

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


exports.agregarPuesto = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    const sNombrePuesto = req.body.sNombrePuesto;
    const sDescripcion = req.body.sDescripcion;
    const idDepartamento = req.body.idDepartamento;

    sql = "INSERT INTO puestos (sNombrePuesto,sDescripcion,idDepartamento) VALUES ('"+sNombrePuesto+"','"+sDescripcion+"', "+idDepartamento+")";

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


exports.getPuestoxId = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    const idPuesto = req.body.nIdPuesto;

    sql = "SELECT pue.idPuestos , pue.sNombrePuesto , pue.sDescripcion, dep.idDepartamento as nidDepartamento, dep.sNombreDepartamento as Departamento FROM puestos as pue INNER JOIN departamentos as dep ON pue.idDepartamento = dep.idDepartamento WHERE pue.idPuestos = "+idPuesto+"";

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


exports.editarPuesto = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    const idPuesto = req.body.nIdPuesto;
    const sNombrePuesto = req.body.sNombrePuesto;
    const sDescripcion = req.body.sDescripcion;
    const idDepartamento = req.body.idDepartamento;

    sql = "UPDATE puestos SET sNombrePuesto = '"+sNombrePuesto+"', sDescripcion = '"+sDescripcion+"', idDepartamento = "+idDepartamento+" WHERE idPuestos = "+idPuesto+" ";

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