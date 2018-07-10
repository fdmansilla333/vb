import { Component, OnInit } from '@angular/core';
import { Cliente } from '../modelos/cliente';
import { ClientesService } from '../clientes.service';
import { VentasService } from '../ventas/ventas.service';
import { Factura } from '../modelos/factura';
import { Renglon } from '../modelos/renglon';
import { AppComponent } from '../app.component';
import { ProductosServicioService } from '../productos-servicio.service';
import { Operacion } from '../modelos/operacion';

@Component({
  selector: 'app-devolucion-mercaderia',
  templateUrl: './devolucion-mercaderia.component.html',
  styleUrls: ['./devolucion-mercaderia.component.css'],
  providers: [ClientesService, VentasService, ProductosServicioService]
})
export class DevolucionMercaderiaComponent implements OnInit {
  activarBusquedaFacturas = false;
  activarBusquedaDetalles = false;
  verComprobante = false;
  clientes: Cliente[];
  clienteSeleccionado: Cliente;
  patron: string;
  cargando = false;
  coleccionFacturas: Factura[];
  facturaSeleccionada: Factura;
  colDetalles: Renglon[];
  rutaReporte: string;
  saldo: any;



  constructor(public servicio: ClientesService,
    protected servicioProducto: ProductosServicioService, protected servicioVentas: VentasService, app: AppComponent) {
    this.rutaReporte = app.urlReporte;
  }
  ngOnInit() {
  }

  buscar() {
    this.verComprobante = false;
    this.activarBusquedaFacturas = false;
    this.activarBusquedaDetalles = false;
    if (this.patron && this.patron.length > 3) {

      if (Number(this.patron)) {
        this.servicio.obtenerClientesPorTelefonoYDNI(this.patron).subscribe(colClientes => this.clientes = colClientes);
      } else {
        this.servicio.obtenerClientesPorNombre(this.patron).subscribe(colClientes => this.clientes = colClientes);
      }

    } else {
      this.clientes = [];
    }
  }

  elegirCliente(c: Cliente) {
    this.clienteSeleccionado = c;
    this.clientes = [];
    this.clientes.push(this.clienteSeleccionado);
    this.activarBusquedaFacturas = true;
    this.buscarFacturasCliente(c);

  }

  buscarFacturasCliente(c: Cliente) {
    this.servicioVentas.obtenerFacturasPorCliente(c._id).subscribe(colFacturas => {
      this.coleccionFacturas = colFacturas;
    });
  }

  elegirFactura(f: Factura) {

    this.facturaSeleccionada = f;
    this.activarBusquedaDetalles = true;
    this.colDetalles = f.detalles;
  }

  elegirProducto(d: Renglon) {
    if (confirm('¿Desea hacer devolución del producto?')) {
      this.verComprobante = true;
      console.log(this.facturaSeleccionada);
      d.anulado = true;

      this.servicioVentas.modificarFactura(this.facturaSeleccionada).subscribe(resFacturaModificada => console.log(resFacturaModificada));
      let subtotal = -1 * (d.precioVenta * d.cantidad);
      let operacion: Operacion = new Operacion();
      operacion.fecha_generacion = new Date();
      operacion.monto_operacion = subtotal;
      operacion.descripcion = 'Devolución de producto';
      operacion.tipo_operacion = operacion.ANULACION;
      this.servicioVentas.modificarSaldoCliente(this.clienteSeleccionado._id, subtotal, operacion).subscribe(resSaldo => {
        console.log(resSaldo);
        this.saldo = resSaldo;
        this.servicioProducto.obteneProductoPorId(d.producto._id).subscribe(resProducto => {
          // actualizo el stock
          resProducto.cantidad = d.producto.cantidad + resProducto.cantidad;
          this.servicioProducto.actualizarProducto(resProducto).subscribe(resProductoActualizado => console.log(resProductoActualizado));
        });



      });
    }

  }

  verNotaCredito(d: Renglon[]) {
    this.verComprobante = true;
  }

}
