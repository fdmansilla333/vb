import { Component, OnInit } from '@angular/core';
import { Factura } from '../../modelos/factura';
import { VentasService } from '../ventas.service';
import { ClientesService } from '../../clientes.service';
import { Location } from '@angular/common';
import { Cliente } from '../../modelos/cliente';
import { Producto } from '../../modelos/producto';
import { ProductosServicioService } from '../../productos-servicio.service';
import { Renglon } from '../../modelos/renglon';
import { CuponPago } from '../../modelos/cuponpago';
import {
  Router
} from '@angular/router';
import { Operacion } from '../../modelos/operacion';

@Component({
  selector: 'app-alta-ventas',
  templateUrl: './alta-ventas.component.html',
  styleUrls: ['./alta-ventas.component.css'],
  providers: [VentasService, ClientesService, ProductosServicioService]
})
export class AltaVentasComponent implements OnInit {

  idFactura: any;
  public factura: Factura;
  public clientes: Cliente[];
  public clienteSeleccionado: any;
  public productos: Producto[];
  public error = false;
  public errorMensaje: any;
  public facturas: Factura[];
  public categoriaSeleccionada: any;
  public detalles: Renglon[];
  public cantidad: number;
  public total: number = 0;
  importeCuota: number = 0;
  diasMora = 28;
  entrega = 0;
  cantCuotas = 1;

  recargo = 0;
  descuento = 0;

  constructor(public servicio: VentasService,
    public clienteService: ClientesService,
    private productoService: ProductosServicioService,
    private location: Location, protected router: Router) {
    this.clienteService.obtenerClientes().subscribe(colClientes => {
      this.clientes = colClientes.map(c => {
        c.formateo = c.Nombre + ' ' + c.Apellido + ' ' + c.Telefono;
        return c;
      });
    });
    this.productoService.obtenerTodos().subscribe(colProductos => {

    });
    this.detalles = new Array();
  }

  ngOnInit() {

  }



  guardar() {
    this.error = false;
    let factura = new Factura();
    this.servicio.guardarFactura(factura).subscribe(facturaAlmacenada => {
      this.location.back();
    }, error => {
      this.error = true;
      this.errorMensaje = 'La factura ya existe!';
    });

  }
  finPedido(renglones: Renglon[]) {
    renglones = renglones.filter(r => r.producto);
    this.detalles = renglones;
    this.detalles.map(d => {
      this.total = this.total + d.precioVenta * d.cantidad;
    });
    this.importeCuota = this.total;


  }

  cancelarCompra() {
    this.detalles = [];
  }
  actualizarImporteCuota() {
    let subtotal = this.total - (this.descuento / 100) * this.total + (this.recargo / 100) * this.total;
    subtotal = subtotal - this.entrega;
    this.importeCuota = Number((subtotal / this.cantCuotas).toFixed(2));
  }
  actualizarImportePorEntrega() {
    if (this.entrega > 0 && this.entrega <= this.total) {
      this.actualizarImporteCuota();
    }

  }

  generarCupones() {

    if (confirm('Importe total $' + this.total + ' cantidad de cuotas: ' + this.cantCuotas + ' importe cuota:$' + this.importeCuota)) {
      this.verificarDeudasCliente();
      // TODO tiene que analizar si el cliente posee deuda, si posee deuda imposibilita la venta sino

      this.generarFactura();


      // TODO debe generar una factura e impactar en el saldo
      // TODO incluyendo el detalle

      this.modificarSaldo();
      // TODO generando los cupones de pago
      // TODO actualiza el saldo
      alert('Venta realizada!');
      this.router.navigate(['ventas']);
    }

  }

  verificarDeudasCliente() {
    this.servicio.obtenerSaldoCliente(this.clienteSeleccionado)
      .subscribe(clienteConSaldo => {
        /*
        if (clienteConSaldo != null && clienteConSaldo.length > 0) {
          alert('Problemas detectados al  realizar la venta, el cliente posee deuda');

        } else {
          alert('El cliente no posee cuenta vinculada');
          this.servicio.abrirSaldo(this.clienteSeleccionado).subscribe( res => console.log(res));

        }
        */
      });
  }

  generarFactura() {
    let factura = new Factura();
    factura.activo = true;
    factura.entrega = this.entrega;
    factura.cantidadCuotas = this.cantCuotas;
    factura.importeCuota = this.importeCuota;
    factura.clienteID = this.clienteSeleccionado;
    factura.detalles = this.detalles;
    factura.fecha_alta = new Date();
    factura.fecha_baja = null;
    factura.pagoparcial = this.cantCuotas > 1 ? true : false;
    factura.cantidadDiasMoroso = this.diasMora;
    factura.total = this.total;
    factura.recargo = this.recargo;
    factura.descuento = this.descuento;
    factura.neto = factura.total - (factura.descuento / 100) * factura.total + (factura.recargo / 100) * factura.total - this.entrega;
    this.servicio.guardarFactura(factura).subscribe(
      resultadoFactura => {
        this.idFactura = resultadoFactura._id;
        // se obtiene la factura id y con ella se genera los cupones de pagos
        let cupones = [];

        let hoy = new Date();
        // Se actualiza los productos (actualizar stock)
        this.actualizarStock(resultadoFactura);
        for (let index = 1; index <= this.cantCuotas; index++) {
          let c = new CuponPago();
          c.factura = resultadoFactura._id; // se asigna el id
          c.fecha_alta = new Date();
          c.fecha_baja = null;
          c.numeroCuota = index;
          c.activo = true;
          c.importeCuota = resultadoFactura.neto / this.cantCuotas;
          c.fechaVencimiento = hoy;
          c.fechaVencimiento.setDate(c.fechaVencimiento.getDate() + this.diasMora);
          // c.fechaVencimiento.setMonth(c.fechaVencimiento.getMonth() + 1); // Se corre un mes
          // hoy = c.fechaVencimiento;
          // c.fechaVencimiento.setDate(c.fechaVencimiento.getDate() + factura.cantidadDiasMoroso); // se corren diez dias

          this.servicio.guardarCuponPago(c).subscribe(res => console.log(res));
        }


      }
    );

  }

  actualizarStock(f: Factura) {
    if (f.detalles && f.detalles.length > 0) {
      f.detalles.map(d => {
        let producto: Producto = d.producto;
        producto.cantidad = producto.cantidad - d.cantidad;
        this.productoService.actualizarProducto(producto).subscribe(res => console.log(res));
      });
    }


  }
  modificarSaldo() {
    let operacion = new Operacion();
    operacion.tipo_operacion = operacion.COMPRA;
    operacion.descripcion = 'Venta de producto';
    operacion.fecha_generacion = new Date();
    operacion.monto_operacion = this.total;

    this.servicio.modificarSaldoCliente(this.clienteSeleccionado, this.total, operacion).subscribe(res => console.log(res));
  }



}
