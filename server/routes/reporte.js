const express = require('express');
const router = express.Router();
var dateFormat = require('dateformat');

const AutoReport = require('auto-report');
const AutoReportPDF = new AutoReport.PDF();
const fs = require('fs');




const path = require('path');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/vestiteBien');
var ObjectId = mongoose.Types.ObjectId;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('conectado a la db desde reporte');
});

const template =
    `<!DOCTYPE html>
<html>
    <head>
    </head>
    <body>
        <div>
            <p>{{@report_name}}</p>
        </div>
        {{@table}}
    </body>
</html>`

const templateFactura =
    `<!DOCTYPE html>
<html>
<head>
</head>
<body>
<div>
    <p>{{@nombre}}</p>
    <p>{{@apellido}}</p>
    <p>{{@cantidadCuotas}}</p>
    <p>{{@domicilio}}</p>
    <p>{{@telefono}}</p>
    <p>{{@total}}</p>
    <p>{{@fecha_alta}}</p>

    {{@detalles}}

</div>
</body>
</html>`
router.get('/test', (req, res) => {
    AutoReportPDF.init(template);
    AutoReportPDF.render('report_name', 'Prueba de reporte');
    AutoReportPDF.create('C:/vestiteBien/fileFacturaReporte.pdf').then(data => {
        res.sendFile(data.filepath);
    }).catch(err => console.log(err));
});

router.get('/reporteFactura/:id', (req, res) => {
    var id;
    fs.readFile(path.resolve(__dirname, 'templateFactura.html'), 'utf-8', (err, templateFacturaArchivo) => {

        if (req.params.id && templateFacturaArchivo) {
            id = req.params.id;
            var facturaSchema = mongoose.Schema({
                name: String
            });

            var factura = mongoose.model('facturas');
            factura.findById(ObjectId(id), function (err, doc) {
                if (err) return console.error();
                var factura = doc._doc;
                var clientes = mongoose.model('clientes');

                clientes.findById(ObjectId(factura.clienteID), function (err, resCliente) {
                    if (err) return console.error();
                    var cliente = resCliente._doc;
                    AutoReportPDF.init(templateFacturaArchivo);
                    const pathcss = path.resolve(__dirname, 'pdf-table.css');
                    AutoReportPDF.config({
                        charset: 'utf-8',
                        css: [pathcss]
                    });


                    AutoReportPDF.render('cantidadCuotas', factura.cantidadCuotas);
                    AutoReportPDF.render('nombre', cliente.Nombre);
                    AutoReportPDF.render('apellido', cliente.Apellido);
                    AutoReportPDF.render('domicilio', cliente.Domicilio);
                    AutoReportPDF.render('telefono', cliente.Telefono);
                    AutoReportPDF.render('total', factura.total);
                    var facturafecha = dateFormat(factura.fecha_alta, "dd-mm-yyyy");

                    AutoReportPDF.render('fecha_alta', facturafecha);

                    var detalles = [];
                    factura.detalles.map(d => {
                        detalles.push({ 'Producto': d.producto.Nombre, 'precioVenta': '$' + d.precioVenta, 'cantidad': d.cantidad, 'subtotal': '$' + d.cantidad * d.precioVenta });
                    });
                    const columnas = [{ name: 'Nombre producto' }, { name: 'Precio' }, { name: 'Cantidad' }, { name: 'Subtotal' }];

                    AutoReportPDF.renderTable(columnas, detalles, {
                        tag: 'detalles', //The tag that should be replaced.,
                        properties: ['Producto', 'precioVenta', 'cantidad', 'subtotal'] //Properties to access row object
                    });

                    AutoReportPDF.create('C:/vestiteBien/factura' + id + '.pdf').then(data => {
                        res.sendFile(data.filepath);
                    }).catch(err => console.log(err));
                })

            });
        }
    });

});

router.get('/reporteComprobante/:id', (req, res) => {
    var id;
    fs.readFile(path.resolve(__dirname, 'templateCuponPago.html'), 'utf-8', (err, templateComprobanteCupon) => {

        if (req.params.id && templateComprobanteCupon) {
            id = req.params.id;


            var cupones = mongoose.model('cuponespagos');
            cupones.findById(ObjectId(id), function (err, doc) {
                if (err) return console.error();
                var cuponPago = doc._doc;
                AutoReportPDF.init(templateComprobanteCupon);

                const pathcss = path.resolve(__dirname, 'pdf-table.css');
                AutoReportPDF.config({
                    charset: 'utf-8',
                    css: [pathcss]
                });

                const imagenPagado = 'file:///' + path.resolve(__dirname, 'pagado.png');


                
                AutoReportPDF.render('factura', cuponPago.factura);
                if (cuponPago.mora){
                    AutoReportPDF.render('poseeMora', 'Si');
                    AutoReportPDF.render('diasTranscurridos', cuponPago.diasTranscurridos);
                    AutoReportPDF.render('importeMora', cuponPago.importeMora.toFixed(2));
                    AutoReportPDF.render('total', (cuponPago.importeMora + cuponPago.importeCuota).toFixed(2));
                }else{
                    AutoReportPDF.render('poseeMora', 'No');
                    AutoReportPDF.render('diasTranscurridos', 0);
                    AutoReportPDF.render('importeMora', 0);
                    AutoReportPDF.render('total', cuponPago.importeMora);
                }

                
                AutoReportPDF.render('fecha_alta', dateFormat(cuponPago.fecha_alta, "dd-mm-yyyy"));
                AutoReportPDF.render('fecha_baja', dateFormat(cuponPago.fecha_baja, "dd-mm-yyyy"));
                AutoReportPDF.render('numeroCuota', cuponPago.numeroCuota);
                AutoReportPDF.render('activo', cuponPago.activo);
                AutoReportPDF.render('importeCuota', cuponPago.importeCuota.toFixed(2));
                AutoReportPDF.render('fecha_vencimiento', dateFormat(cuponPago.fechaVencimiento, "dd-mm-yyyy"));
                AutoReportPDF.render('pagado',  'https://www.aguasandinas.cl/aguascontema-theme/images/pagado.png');
                AutoReportPDF.create('C:/vestiteBien/comprobante_' + id + '.pdf').then(data => {
                    res.sendFile(data.filepath);
                }).catch(err => console.log(err));
            });

        }
    });

});

module.exports = router;