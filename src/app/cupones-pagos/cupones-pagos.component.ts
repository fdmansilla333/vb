import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../clientes.service';
import { Cliente } from '../modelos/cliente';
import { VentasService } from '../ventas/ventas.service';
import { Factura } from '../modelos/factura';
import { CuponPago } from '../modelos/cuponpago';
import { AppComponent } from '../app.component';
import * as moment from 'moment';
import { Operacion } from '../modelos/operacion';

@Component({
  selector: 'app-cupones-pagos',
  templateUrl: './cupones-pagos.component.html',
  styleUrls: ['./cupones-pagos.component.css'],
  providers: [ClientesService, VentasService]
})
export class CuponesPagosComponent implements OnInit {

  hoy: Date;
  patron: any;
  clientes: Cliente[];
  cargando = false;
  facturas: Factura[];
  facturasListas = false;
  rutaReporte: string;

  clienteSeleccionado: string;
  constructor(app: AppComponent, protected servicio: ClientesService, protected vservice: VentasService) {
    this.facturas = [];
    this.rutaReporte = app.urlReporte;

  }

  ngOnInit() {
    this.hoy = new Date();
  }
  buscar() {
    this.facturas = [];
    this.clienteSeleccionado = '';
    if (this.patron.length > 3) {
      this.cargando = true;
      this.servicio.obtenerClientesPorNombre(this.patron).subscribe(colClientes => {
        this.clientes = colClientes;
        this.cargando = false;
      });
    } else {
      this.clientes = [];
      this.cargando = false;
    }
  }

  buscarCupones() {
    // buscar todas las facturas activas
    this.facturasListas = false;
    this.vservice.obtenerFacturasPorCliente(this.clienteSeleccionado).subscribe(colFacturas => {

      this.facturas = colFacturas.map(f => {
        this.vservice.obtenerCuponesPorFactura(f._id).subscribe(cupones => {

          f.cupones = cupones;

          f.cupones.sort((a, b) => {
            if (a.numeroCuota < b.numeroCuota) {
              return -1;
            } else {
              if (a.numeroCuota > b.numeroCuota) {
                return 1;
              } else {
                return 0;
              }
            }

          });
        });
        return f;
      });

      this.facturasListas = true;

    });
    // buscar todos los cupones asociadas
  }


  /**
   *  Este metodo realiza la actualización del pagado de un cupon
   * @param c CuponPago
   */
  pagar(c: CuponPago) {
    c = this.calcularMora(c);
    c.activo = false;
    c.pagada = true;
    c.fecha_baja = new Date();

    let operacion = new Operacion();
    operacion.tipo_operacion = operacion.PAGO;
    operacion.descripcion = 'Pago de cupon';
    operacion.fecha_generacion = new Date();
    operacion.monto_operacion = c.importeCuota;
    this.vservice.modificarSaldoCliente(this.clienteSeleccionado, -1 * c.importeCuota, operacion)
      .subscribe(resSaldo => console.log(resSaldo));

    if (c.mora) {
      let operacion2 = new Operacion();
      operacion2.tipo_operacion = operacion.MORA;
      operacion2.descripcion = 'Pago de Mora de $' + c.importeMora;
      operacion2.fecha_generacion = new Date();
      operacion2.monto_operacion = c.importeMora;
      this.vservice.modificarSaldoCliente(this.clienteSeleccionado, 0, operacion2)
        .subscribe(resSaldo => console.log(resSaldo));

    }
    this.vservice.modificarCuponPago(c).subscribe(res => console.log(res));
  }



  /**
   * Calcular mora verifica cuanta mora tiene que pagar el cliente
   * Y confirma con un mensaje abonando un 1 % del valor del cupon. por dia de mora
   * @param c
   */
  calcularMora(c: CuponPago): CuponPago {
    let hoy: moment.Moment = moment(new Date());
    let vencimiento: moment.Moment = moment(c.fechaVencimiento);
    const diferencia = hoy.diff(vencimiento, 'days');
    if (diferencia > 0) {
      c.mora = true;
      c.importeMora = (1 / 100) * c.importeCuota * diferencia;
      c.diasTranscurridos = diferencia;
      const acepta = confirm('El pago posee mora,  es de: $' + c.importeMora.toFixed(2) + ' con  ' + diferencia + ' dias transcurridos '
        + 'acepta pagar la mora?');
      if (!acepta) {
        c.mora = false;
        c.importeMora = 0;
        c.diasTranscurridos = 0;
      }
    }

    return c;
  }

  presentaMora(c: CuponPago): boolean {
    let hoy: moment.Moment = moment(new Date());
    let vencimiento: moment.Moment = moment(c.fechaVencimiento);
    const diferencia = hoy.diff(vencimiento, 'days');
    if (diferencia > 0) {

      return true;
    } else {
      return false;
    }
  }
  mostrarMora(c: CuponPago): Number {
    let hoy: moment.Moment = moment(new Date());
    let vencimiento: moment.Moment = moment(c.fechaVencimiento);
    const diferencia = hoy.diff(vencimiento, 'days');
    return diferencia * 0.01 * c.importeCuota;
  }
}
