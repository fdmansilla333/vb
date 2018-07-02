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


  constructor(protected servicio: VentasService) {

    this.servicio.obtenerCuponesImpagos().subscribe(
      colCuponesPagosVencidos => {
        colCuponesPagosVencidos.map(c => {
          // por cada cupon de pago se busca un cliente
          let cliente = this.obtenerCliente(c);
          // si existe el cliente se agrega lo vencido
          let clienteEncontrado = this.clientes.find(c => c.cliente.DNI === cliente.DNI);
          if (clienteEncontrado) {
            // se procede a totalizar el cliente para ello por cada cupon
            clienteEncontrado.total_deuda += c.importeCuota;
          } else {
            // si no existe el cliente se genera uno nuevo
            let cm = new ClienteMorosos();
            cm.cliente = cliente;
            cm.total_deuda = c.importeCuota;
            this.clientes.push(cm);
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
