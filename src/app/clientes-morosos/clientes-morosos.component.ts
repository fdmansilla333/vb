import { Component, OnInit } from '@angular/core';
import { VentasService } from '../ventas/ventas.service';
import { Cliente } from '../modelos/cliente';
import { CuponPago } from '../modelos/cuponpago';
import { ClienteMorosos } from '../modelos/clientesMorosos';

@Component({
  selector: 'app-clientes-morosos',
  templateUrl: './clientes-morosos.component.html',
  styleUrls: ['./clientes-morosos.component.css'],
  providers: [VentasService]

})
export class ClientesMorososComponent implements OnInit {

  clientes: ClienteMorosos[];
  clientesMorososFuturos: ClienteMorosos[];
  corrimiento: number;


  constructor(protected servicio: VentasService) {
    this.corrimiento = 5; // 5 dias
    this.clientes = new Array();
    this.clientesMorososFuturos = new Array();
    const ahora = new Date();
    let diaCorrimiento = new Date();
    diaCorrimiento.setDate(diaCorrimiento.getDate() + this.corrimiento);
    this.servicio.obtenerCuponesImpagos().subscribe(
      colCuponesImpagos => {

        let cuponesVer = colCuponesImpagos.map(c => {
          const fechaVencimiento = new Date(c.fechaVencimiento);
          const fechaAlta = new Date(c.fecha_alta);
          const diferencia: number = (fechaVencimiento - fechaAlta) / (1000 * 60 * 60 * 24);
          let dif = diferencia / c.numeroCuota;
          if (dif > 30) {

            let fechaSu = new Date(fechaAlta);
            fechaSu.setDate(fechaSu.getDate() + 30);
            c.fechaSugeridaVencimiento = fechaSu;
            this.servicio.modificarCuponPago(c).subscribe(res => console.log(res));
          }
        });
        cuponesVer = cuponesVer.filter(c => c);
        console.log(cuponesVer);

        const colCuponesVencidos = colCuponesImpagos.filter(cuponImpago => {
          let fechaVencimiento: Date;
          if (cuponImpago.fechaSugeridaVencimiento) {
            fechaVencimiento = new Date(cuponImpago.fechaSugeridaVencimiento);
          } else {
            fechaVencimiento = new Date(cuponImpago.fechaVencimiento);
          }

          return fechaVencimiento <= ahora;
        });

        const colCuponesProntoVencerse = colCuponesImpagos.filter(cuponPago => {
          let fechaVencimiento: Date;
          if (cuponPago.fechaSugeridaVencimiento) {
            fechaVencimiento = new Date(cuponPago.fechaSugeridaVencimiento);
          } else {
            fechaVencimiento = new Date(cuponPago.fechaVencimiento);
          }

          // Obtener los cupones prontos a vencerse a 3 dias
          return fechaVencimiento > ahora && fechaVencimiento <= diaCorrimiento;
        });

        colCuponesVencidos.map(cupon => {
          // se debe buscar su dueño
          this.servicio.obtenerFacturaPorId(cupon.factura).subscribe(resFactura => {

            this.servicio.obtenerClientePorId(resFactura.clienteID).subscribe(resCliente => {
              let moroso = new ClienteMorosos;
              moroso.cliente = resCliente;
              moroso.total_deuda = Number(cupon.importeCuota.toFixed(2));
              this.clientes.push(moroso);
            });
          });
        });


        colCuponesProntoVencerse.map(cupon => {
          this.servicio.obtenerFacturaPorId(cupon.factura).subscribe(resFactura => {

            this.servicio.obtenerClientePorId(resFactura.clienteID).subscribe(resCliente => {
              let moroso = new ClienteMorosos;
              moroso.cliente = resCliente;
              moroso.total_deuda = Number(cupon.importeCuota.toFixed(2));
              this.clientesMorososFuturos.push(moroso);
            });
          });
        });

        this.clientesMorososFuturos = this.clientesMorososFuturos.sort((a, b) => {
          if (a.total_deuda > b.total_deuda) {
            return -1;
          } else {
            if (a.total_deuda < b.total_deuda) {
              return 1;
            } else {
              return 0;
            }
          }
        });


        this.clientes = this.clientes.sort((a, b) => {
          if (a.total_deuda > b.total_deuda) {
            return -1;
          } else {
            if (a.total_deuda < b.total_deuda) {
              return 1;
            } else {
              return 0;
            }
          }
        });


      }
    );
  }

  obtenerCliente(c: CuponPago): any {
    this.servicio.obtenerFacturaPorId(c.factura).subscribe(resFactura => {
      return resFactura.cliente;
    });
  }



  ngOnInit() {
  }

}
