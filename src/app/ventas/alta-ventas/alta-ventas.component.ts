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
  diasMora = 10;
  entrega = 0;
  cantCuotas = 1;

  constructor(public servicio: VentasService,
    public clienteService: ClientesService,
    private productoService: ProductosServicioService,
    private location: Location, protected router: Router) {
    this.clienteService.obtenerClientes().subscribe(colClientes => this.clientes = colClientes);
    this.productoService.obtenerTodos().subscribe(colProductos => this.productos = colProductos);
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
    this.importeCuota = Math.round((this.total - this.entrega) / this.cantCuotas);
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
      alert('Venta realizada');
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
    factura.cantidadCuotas = this.cantCuotas;
    factura.clienteID = this.clienteSeleccionado;
    factura.detalles = this.detalles;
    factura.fecha_alta = new Date();
    factura.fecha_baja = null;
    factura.pagoparcial = this.cantCuotas > 1 ? true : false;
    factura.cantidadDiasMoroso = this.diasMora;
    factura.total = this.total;
    this.servicio.guardarFactura(factura).subscribe(
      resultadoFactura => {
        this.idFactura = resultadoFactura;
        // se obtiene la factura id y con ella se genera los cupones de pagos
        let cupones = [];

        let hoy = new Date();
        for (let index = 1; index <= this.cantCuotas; index++) {
          let c = new CuponPago();
          c.factura = resultadoFactura; // se asigna el id
          c.fecha_alta = new Date();
          c.fecha_baja = null;
          c.numeroCuota = index;
          c.activo = true;
          c.importeCuota = this.total / this.cantCuotas;
          c.fechaVencimiento = hoy;
          c.fechaVencimiento.setMonth(c.fechaVencimiento.getMonth() + 1); // Se corre un mes
          hoy = c.fechaVencimiento;
          c.fechaVencimiento.setDate(c.fechaVencimiento.getDate() + factura.cantidadDiasMoroso); // se corren diez dias
          this.servicio.guardarCuponPago(c).subscribe(res => console.log(res));
        }


      }
    );

  }

  modificarSaldo() {
    this.servicio.modificarSaldoCliente(this.clienteSeleccionado, this.total).subscribe(res => console.log(res));
  }



}
