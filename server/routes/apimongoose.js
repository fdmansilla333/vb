const express = require('express');
const router = express.Router();


var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
mongoose.connect('mongodb://localhost/vestiteBien');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
require('mongoose').set('debug', true);
db.once('open', function () {
    console.log('conectado a la db');
});

var facturaSchema = mongoose.Schema({
    Activo: Boolean,
    detalles: Array
});


var saldoSchema = mongoose.Schema({
    cliente: String,
    monto: Number,
    operaciones: Array

});

var clienteSchema = mongoose.Schema({
    nombre: String,
    apellido: String,
    DNI: String
})

var cuponPagoSchema = mongoose.Schema({
    factura: String,
    numeroCuota: Number,
    importeCuota: Number,
    fechaVencimiento: Date,
    pagada: Boolean,
    mora: Boolean,
    importeMora: Number,
    diasTranscurridos: Number,
    total: Number,
    activa: Boolean
});


//generacion de modelos
var factura = mongoose.model('facturas', facturaSchema);
var saldo = mongoose.model('saldo', saldoSchema);
var cliente = mongoose.model('clientes', clienteSchema);
var cuponesPagos = mongoose.model('cuponespagos', cuponPagoSchema);


router.get('/test', (req, res) => {
    var f = new factura({ name: 'Silence' });
    console.log(f.name);

    f.save(function (err, f) {
        if (err) return console.error(err);
        res.json(f);
    });

});
router.get('/saldos/:cliente', (req, res) => {
    if (req.params.cliente) {
        const cliente = req.params.cliente;
        saldo.find({ cliente: cliente }, function (err, docs) {
            if (err) return console.error(err);
            res.json(docs);
        });


    }
});
router.get('/abrirSaldo/:cliente', (req, res) => {
    if (req.params.cliente) {
        const cliente = req.params.cliente;
        var operaciones = [];
        operaciones.push({ 'descripcion': 'Apertura de saldo', 'tipo_operacion': 1, 'fecha_generacion': new Date() });
        var s = new saldo({ 'cliente': cliente, 'monto': 0, 'operaciones': operaciones });

        s.save(function (err, s) {
            if (err) return console.error(err);
            res.json(s);
        });
    }
});
router.post('/saldos/:cliente', (req, res) => {
    if (req.params.cliente && req.body.importe) {
        // se busca el cliente y se actualiza el saldo
        saldo.findOne({ 'cliente': req.params.cliente }, function (err, saldoCliente) {
            if (err) return console.error(err);
            if (saldoCliente && saldoCliente.monto) {
                saldoCliente.operaciones.push(req.body.operaciones);
                saldoCliente.monto += req.body.importe;
            } else {
                //no posee cuenta hacemos un save
                var operaciones = [];
                operaciones.push({ 'descripcion': 'Apertura de cuenta', 'tipo_operacion': 1, 'fecha_generacion': new Date(), 'monto_operacion': 0 });
                var s = new saldo();
                s.cliente = req.params.cliente;
                s.monto = req.body.importe;
                operaciones.push({ 'descripcion': 'Nueva compra', 'tipo_operacion': 2, 'fecha_generacion': new Date(), 'monto_operacion': req.body.importe });
                s.operaciones = operaciones;
                saldoCliente = s;

            }
            saldoCliente.save(function (err, s) {
                if (err) return console.error(err);
                res.json(s);
            });

        });

    }
});
router.get('/facturas', (req, res) => {
    if (req.query.id) {
        factura.findOne({ '_id': ObjectId(req.query.id) }, function (err, factura) {
            if (err) return console.error(err);
            res.json(factura);
        });
    } else {


        factura.find({ 'activo': true }, function (err, facturas) {
            if (err) return console.error(err);
            res.json(facturas);
        });
    }
});

router.put('/facturas/:id', (req, res) => {
    if (req.params.id) {
        factura.findOne({ '_id': ObjectId(req.params.id) }, function (err, resfactura) {
            if (err) return console.error(err);
            var objetoFactura = req.body;
            resfactura.detalles = objetoFactura.detalles;
            resfactura.Activo = objetoFactura.activo;
            resfactura.save(function (err, s) {
                if (err) return console.error(err);
                res.json(s);
            });
        });
    }
});
router.get('/facturas/:termino', (req, res) => {

    if (req.params.termino) {
        // primero se busca por cliente
        const termino = req.params.termino;
        const comodin = { $regex: ".*" + termino + ".*" }
        cliente.findOne({ Nombre: comodin }, function (err, doc) {
            if (err) { return console.error(err); }
            if (doc) {
                factura.find({ clienteID: doc.id }, function (err, colfacturas) {
                    res.json(colfacturas);
                });
            } else {
                res.json(doc);
            }
        });
    }


});
router.get('/cuponesPagos/:idfactura', (req, res) => {

    if (req.params.idfactura) {
        const idF = req.params.idfactura;
        cuponesPagos.find({ factura: idF }, function (err, docs) {
            if (err) { return console.error; }
            res.json(docs);
        });
    }


});

router.put('/cuponesPagos/:id', (req, res) => {
    if (req.params.id) {
        var id = req.params.id;
        var cupon = req.body;
        cuponesPagos.findOne({ '_id': ObjectId(id) }, function (err, resCupon) {
            if (err) { return console.error; }
            resCupon.pagada = true;
            resCupon.fecha_baja = new Date();
            resCupon.mora = cupon.mora;
            resCupon.importeMora = cupon.importeMora;
            resCupon.diasTranscurridos = cupon.diasTranscurridos;
            resCupon.total = cupon.importeMora + cupon.importeCuota;
            resCupon.save(function (err, s) {
                if (err) return console.error(err);
                res.json(s);
            });


        });
    }
});

router.get('/morosos', (req, res) => {
    let ahora = new Date();
    ahora = ahora.toISOString();
    cuponesPagos.find({ pagada: false, activo: true }, function (err, docs) {
        if (err) { return console.error; }
        res.json(docs);
    });
});

router.get('/clientes/:id', (req, res) => {
    if (req.params.id) {
        const idc = req.params.id;
        cliente.findOne({ '_id': ObjectId(idc) }, function (err, docs) {
        if (err) {return console.error;}
        res.json(docs);

        });
    }
    
});













module.exports = router;