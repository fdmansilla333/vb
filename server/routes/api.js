const express = require('express');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;
const assert = require('assert');

const MongoClient = require('mongodb').MongoClient;

// Controlar en el id
// id.match(/^[0-9a-fA-F]{24}$/)
// Connection URL

const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'vestiteBien';

// Use connect method to connect to the server


MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    client.close();
});

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

router.get('/clientes', (req, res) => {
    const buscarDocumento = function (db, nombre, callback) {
        const collection = db.collection('clientes');
        var consulta = { "Nombre": { $regex: ".*" + nombre + ".*" } };
        console.log(consulta);
        collection.find(consulta).toArray(function (err, docs) {
            res.json(docs);
        });
    }

    const buscarNumero = function (db, numero, callback) {
        const collection = db.collection('clientes');
        var consulta = [{ "Telefono": { $regex: ".*" + numero + ".*" } }, { "DNI": { $regex: ".*" + numero + ".*" } }];
        var consultaOr = { $or: consulta };

        collection.find(consultaOr).toArray(function (err, docs) {
            res.json(docs);
        });
    }

    const findDocuments = function (db, callback) {
        const collection = db.collection('clientes');
        collection.find().toArray(function (err, docs) {
            res.json(docs);
        });
    }

    if (req.query.nombre) {
        MongoClient.connect(url, function (err, client) {
            assert.equal(null, err);
            const db = client.db(dbName);
            buscarDocumento(db, req.query.nombre, function () {
                client.close();
            });
        });
    } else {
        if (req.query.numero) {
            MongoClient.connect(url, function (err, client) {
                assert.equal(null, err);
                const db = client.db(dbName);
                buscarNumero(db, req.query.numero, function () {
                    client.close();
                });
            });
        } else {
            MongoClient.connect(url, function (err, client) {
                assert.equal(null, err);
                const db = client.db(dbName);
                findDocuments(db, function () {
                    client.close();
                });
            });
        }
    }

});

router.get('/clientes/:id', (req, res) => {


    const buscarId = function (db, id, callback) {
        const collection = db.collection('clientes');
        var consulta = { "_id": new ObjectID(id) };
        console.log(consulta);
        collection.findOne(consulta, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
    }

    if (req.params.id) {
        MongoClient.connect(url, function (err, client) {
            assert.equal(null, err);
            const db = client.db(dbName);
            buscarId(db, req.params.id, function () {
                client.close();
            });
        });

    } else {
        res.json({ "error": 'El numero de documento debe ser enviado para buscar' });
    }

});

router.post('/clientes', (req, res, next) => {
    const insertDocuments = function (db, callback) {
        const collection = db.collection('clientes');
        collection.insertOne(req.body, function (err, result) {
            if (err) return next(err);
            res.send(result);
        });
    }

    MongoClient.connect(url, function (err, client) {
        const db = client.db(dbName);
        insertDocuments(db, function () {
            client.close();
        });
    });
});

router.put('/clientes/:id', (req, res, next) => {

    const actualizarDocumento = function (db, id, callback) {
        const collection = db.collection('clientes');
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            var consulta = { "_id": new ObjectID(id) };
            var datosNuevos = { $set: req.body };
            collection.updateOne(consulta, datosNuevos, function (err, result) {
                if (err) return next(err);
                console.log(result);
                res.json(result);
            });
        } else {
            res.json({ error: 'Formato incorrecto id' });
        }
    }
    if (req.params.id) {
        MongoClient.connect(url, function (err, client) {
            assert.equal(null, err);
            const db = client.db(dbName);
            actualizarDocumento(db, req.params.id, function () {
                client.close();
            });
        });
    } else {
        res.json({ "error": "No se especifico el id" });
    }

});

router.patch('/clientes/:id', (req, res) => {
    const anularDocumento = function (db, callback) {
        const collection = db.collection('clientes');
        if (req.param("id")) {
            var id = req.param("id");
            if (id.match(/^[0-9a-fA-F]{24}$/)) {
                var objeto = new ObjectID(id);
                var consulta = { "_id": objeto };
                var datosNuevos = { $set: { fecha_baja: new Date() } };

                collection.updateOne(consulta, datosNuevos, function (err, result) {
                    if (err) throw err;
                    console.log('Actualizando:' + result);
                    res.json(result);
                });
            } else {
                res.json({ "error": "El formato de id es incorrecto" });
            }
        } else {
            res.json({ "error": "No se especifico el id a anular" });
        }

    }

    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        const db = client.db(dbName);
        anularDocumento(db, function () {
            client.close();
        });
    });

});

// Manejo de categorias

router.get('/categorias', (req, res) => {
    const buscarCategorias = function (db, callback) {
        const collection = db.collection('categorias');
        collection.find().toArray(function (err, docs) {
            res.json(docs);
        });
    }

    const buscarCategoriasNombre = function (db, nombre, callback) {
        const collection = db.collection('categorias');
        var consulta = { "nombre": { $regex: ".*" + nombre + ".*" } };
        console.log(consulta);
        collection.find(consulta).toArray(function (err, docs) {
            res.json(docs);
        });
    }

    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        const db = client.db(dbName);

        if (!req.query.Nombre) {
            buscarCategorias(db, function () {
                client.close();
            });
        } else {
            buscarCategoriasNombre(db, req.query.Nombre, function () {
                client.close();
            });
        }

    });
});


router.get('/categorias/:id', (req, res) => {
    const buscarCategoria = function (db, id, callback) {
        const collection = db.collection('categorias');
        var consulta = { "_id": ObjectID(id) };
        console.log(consulta);
        collection.findOne(consulta, function (err, docs) {
            if (err) throw err;
            res.json(docs);
        });
    }
    if (req.params.id) {


        MongoClient.connect(url, function (err, client) {
            assert.equal(null, err);
            const db = client.db(dbName);
            buscarCategoria(db, req.params.id, function () {
                client.close();
            });
        });
    } else {
        res.json({ "error": 'El nombre de la categoria debe ser enviado para buscar' });

    }
});


router.post('/categorias', (req, res) => {
    const insertDocuments = function (db, callback) {
        const collection = db.collection('categorias');
        var documento = { "nombre": req.body.nombre, "fecha_alta": new Date(), "activo": true };
        collection.insertOne(documento, function (err, result) {
            if (err) throw err;
            console.log('Insertando:' + req.body);
            res.json(result);
        });
    }

    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        const db = client.db(dbName);
        insertDocuments(db, function () {
            client.close();
        });
    });
});


router.put('/categorias/:id', (req, res) => {

    const actualizarDocumento = function (db, id, callback) {
        const collection = db.collection('categorias');
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            var consulta = { "_id": new ObjectID(id) };
            var datosNuevos = { $set: req.body };
            collection.updateOne(consulta, datosNuevos, function (err, result) {
                if (err) throw err;
                res.json(result);
            });
        } else {
            res.json({ error: 'Formato incorrecto id' });
        }
    }
    if (req.params.id) {
        MongoClient.connect(url, function (err, client) {
            assert.equal(null, err);
            const db = client.db(dbName);
            actualizarDocumento(db, req.params.id, function () {
                client.close();
            });
        });
    } else {
        res.json({ "error": "No se especifico el id" });
    }

});


router.patch('/categorias/:id', (req, res) => {
    const anularDocumento = function (db, callback) {
        const collection = db.collection('categorias');
        if (req.param("id")) {
            var id = req.param("id");
            if (id.match(/^[0-9a-fA-F]{24}$/)) {
                var objeto = new ObjectID(id);
                var consulta = { "_id": objeto };
                var datosNuevos = { $set: { fecha_baja: new Date() } };

                collection.updateOne(consulta, datosNuevos, function (err, result) {
                    if (err) throw err;
                    console.log('Actualizando:' + result);
                    res.json(result);
                });
            } else {
                res.json({ "error": "El formato de id es incorrecto" });
            }
        } else {
            res.json({ "error": "No se especifico el id a anular" });
        }

    }

    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        const db = client.db(dbName);
        anularDocumento(db, function () {
            client.close();
        });
    });

});

// Manejo de productos

router.get('/productos', (req, res) => {
    const buscarProductos = function (db, callback) {
        const collection = db.collection('productos');
        collection.find().toArray(function (err, docs) {
            res.json(docs);
        });
    }
    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        const db = client.db(dbName);
        buscarProductos(db, function () {
            client.close();
        });
    });
});


router.get('/productos/:id', (req, res) => {
    const busquedaProductos = function (db, nombre, callback) {
        const collection = db.collection('productos');
        var consulta = { "nombre": { $regex: ".*" + nombre + ".*" } };
        console.log(consulta);
        collection.find(consulta).toArray(function (err, docs) {
            res.json(docs);
        });
    }

    const busquedaProductosPorId = function (db, id, callback) {
        const collection = db.collection('productos');
        var objeto = new ObjectID(id);
        var consulta = { "_id": objeto };
        console.log(consulta);
        collection.findOne(consulta, function (err, docs) {
            res.json(docs);
        });
    }



    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        const db = client.db(dbName);
        if (req.params.id) {
            busquedaProductosPorId(db, req.params.id, function () {
                client.close();
            });
        }
        else {
            if (req.query.nombre) {
                busquedaProductos(db, req.query.nombre, function () {
                    client.close();
                });
            }
        }



    });
});


router.post('/productos', (req, res) => {
    const insertDocuments = function (db, callback) {
        const collection = db.collection('productos');
        // TODO crear el objeto id de categoria e insertarlo.
        collection.insertOne(req.body, function (err, result) {
            if (err) throw err;
            console.log('Insertando:' + req.body);
            res.json(result);
        });
    }

    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        const db = client.db(dbName);
        insertDocuments(db, function () {
            client.close();
        });
    });
});


router.put('/productos/:id', (req, res) => {

    const actualizarDocumento = function (db, id, callback) {
        const collection = db.collection('productos');
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            var consulta = { "_id": new ObjectID(id) };
            var datosNuevos = { $set: req.body };
            collection.updateOne(consulta, datosNuevos, function (err, result) {
                if (err) throw err;
                res.json(result);
            });
        } else {
            res.json({ error: 'Formato incorrecto id' });
        }
    }
    if (req.params.id) {
        MongoClient.connect(url, function (err, client) {
            assert.equal(null, err);
            const db = client.db(dbName);
            actualizarDocumento(db, req.params.id, function () {
                client.close();
            });
        });
    } else {
        res.json({ "error": "No se especifico el id" });
    }

});


router.patch('/productos/:id', (req, res) => {
    const anularDocumento = function (db, callback) {
        const collection = db.collection('productos');
        if (req.param("id")) {
            var id = req.param("id");
            if (id.match(/^[0-9a-fA-F]{24}$/)) {
                var objeto = new ObjectID(id);
                var consulta = { "_id": objeto };
                var datosNuevos = { $set: { fecha_baja: new Date() } };

                collection.updateOne(consulta, datosNuevos, function (err, result) {
                    if (err) throw err;
                    console.log('Actualizando:' + result);
                    res.json(result);
                });
            } else {
                res.json({ "error": "El formato de id es incorrecto" });
            }
        } else {
            res.json({ "error": "No se especifico el id a anular" });
        }

    }

    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        const db = client.db(dbName);
        anularDocumento(db, function () {
            client.close();
        });
    });

});

// Definir factura
router.get('/facturas', (req, res) => {
    const buscarFacturas = function (db, callback) {
        const collection = db.collection('facturas');
        collection.find().toArray(function (err, docs) {
            res.json(docs);
        });
    }

    MongoClient.connect(url, function (err, client) {

        assert.equal(null, err);
        const db = client.db(dbName);
        buscarFacturas(db, function () {
            client.close();
        });

    });
});

router.get('/facturas/:cliente', (req, res) => {
    const busquedaPorCliente = function (db, cliente, callback) {
        const collection = db.collection('facturas');
        //var objeto = new ObjectID(cliente);
        var consulta = { "clienteID": cliente };

        collection.find(consulta).toArray(function (err, docs) {
            if (err) return console.error(err);

            res.json(docs);
        });
    }

    MongoClient.connect(url, function (err, client) {

        assert.equal(null, err);
        const db = client.db(dbName);

        if (req.params.cliente) {
            busquedaPorCliente(db, req.params.cliente, function () {
                client.close();
            });
        } else {
            buscarFacturas(db, function () {
                client.close();
            });
        }

    });
});

router.post('/facturas', (req, res) => {
    const insertDocuments = function (db, callback) {
        const collection = db.collection('facturas');
        //Usada para las secuencias

        collection.count(function (err, count) {
            count = count + 1;
            req.body.codigo = count;
            collection.insertOne(req.body, function (err, result) {
                if (err) throw err;

                res.json(req.body);
            });
        });



    }

    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        const db = client.db(dbName);
        insertDocuments(db, function () {
            client.close();
        });
    });
});



// Cupones de pago

router.post('/cupones_pagos', (req, res) => {
    const insertDocuments = function (db, callback) {
        const collection = db.collection('cuponespagos');
        collection.insertOne(req.body, function (err, result) {
            if (err) throw err;
            res.json(req.body._id);
        });
    }

    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        const db = client.db(dbName);
        insertDocuments(db, function () {
            client.close();
        });
    });
});


module.exports = router;