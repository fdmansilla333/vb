import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Factura } from '../../modelos/factura';
import { VentasService } from '../ventas.service';
import { Location } from '@angular/common';
import { ClientesService } from '../../clientes.service';
import { AppComponent } from '../../app.component';
import { Operacion } from '../../modelos/operacion';


@Component({
  selector: 'app-listado-ventas',
  templateUrl: './listado-ventas.component.html',
  styleUrls: ['./listado-ventas.component.css'],
  providers: [VentasService, ClientesService]
})
export class ListadoVentasComponent implements OnInit {

  @Input() colFacturas: Factura[];
  rutaReporte: string;

  constructor(public app: AppComponent,
    private location: Location, protected servicio: VentasService, protected scliente: ClientesService) {
    this.rutaReporte = app.urlReporte;
  }

  ngOnInit() {
    this.agregarDetalles();

  }
  agregarDetalles() {
    this.colFacturas.map(f => {
      // por cada factura se solicita datos del cliente
      this.scliente.obtenerClientePorId(f.clienteID).subscribe(cliente => f.cliente = cliente);
    });
  }
  anular(f: Factura) {
    confirm('¿Desea anular la factura?') {
      f.activo = false;
      this.servicio.modificarFactura(f).subscribe(resFactura => {

        let operacion = new Operacion();
        operacion.descripcion = 'Anulación de la factura';
        operacion.tipo_operacion = operacion.ANULACION;
        operacion.fecha_generacion = new Date();
        operacion.monto_operacion = -1 * (f.neto);
        this.servicio.modificarSaldoCliente(f.clienteID, operacion.monto_operacion , operacion).subscribe(resSaldo => {
          console.log(resSaldo);
        });
      });
    }
  }
  ver(id: string) {
    console.log(id);
  }




}
