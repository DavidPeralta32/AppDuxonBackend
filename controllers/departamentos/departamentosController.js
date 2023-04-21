const conexion = require("../../utils/conexion");


conn = conexion.crearConexion;
close = conexion.cerrarConexion

exports.getDepartamentos = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    sql = "SELECT idDepartamento, sNombreDepartamento, sDescripcion FROM departamentos";

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

exports.agregarDepartamento = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    const sNombreDepartamento = req.body.sNombreDepartamento;
    const sDescripcion = req.body.sDescripcion;

    sql = "INSERT INTO departamentos (sNombreDepartamento, sDescripcion) VALUES('"+sNombreDepartamento+"', '"+sDescripcion+"')";

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


exports.getDepartamentosxId = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    const idDepartamento = req.body.idDepartamento;

    sql = "SELECT idDepartamento, sNombreDepartamento, sDescripcion FROM departamentos WHERE idDepartamento = "+idDepartamento+"";

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

exports.editarDepartamento = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    const idDepartamento = req.body.idDepartamento;
    const sNombreDepartamento = req.body.sNombreDepartamento;
    const sDescripcion = req.body.sDescripcion;

    sql = "UPDATE departamentos SET sNombreDepartamento = '"+sNombreDepartamento+"', sDescripcion = '"+sDescripcion+"' WHERE idDepartamento = "+idDepartamento+"";

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