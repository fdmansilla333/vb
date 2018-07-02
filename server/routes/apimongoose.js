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
    name: String
});


var saldoSchema = mongoose.Schema({
    cliente: String,
    monto: Number

});

var clienteSchema = mongoose.Schema({
    nombre: String,
    apellido: String
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
        var s = new saldo({ 'cliente': cliente, 'monto': 0 });

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
                saldoCliente.monto += req.body.importe;
            } else {
                //no posee cuenta hacemos un save
                var s = new saldo();
                s.cliente = req.params.cliente;
                s.monto = req.body.importe;
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

    factura.find({}, function (err, docs) {
        res.json(docs);
    });


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
        cuponesPagos.findOne({'_id': ObjectId(id)}, function (err, resCupon) {
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

router.get('/morosos', (req, res)=> {
    let ahora = new Date();
    ahora = ahora.toISOString();
    cuponesPagos.find({fechaVencimiento: {$lte: ahora}}, function(err, docs){
        if (err){return console.error;}
        res.json(docs);
    });
});





module.exports = router;