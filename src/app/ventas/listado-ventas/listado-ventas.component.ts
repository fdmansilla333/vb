import { Component, OnInit, Input , OnChanges} from '@angular/core';
import { Factura } from '../../modelos/factura';
import { VentasService } from '../ventas.service';
import { Location } from '@angular/common';
import { ClientesService } from '../../clientes.service';
import { AppComponent } from '../../app.component';


@Component({
  selector: 'app-listado-ventas',
  templateUrl: './listado-ventas.component.html',
  styleUrls: ['./listado-ventas.component.css'],
  providers: [VentasService, ClientesService]
})
export class ListadoVentasComponent implements OnInit {

  @Input() colFacturas: Factura[];
  rutaReporte: string;

  constructor( public app: AppComponent,
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
  anular(id: string) {
    console.log(id);
  }
  ver(id: string) {
    console.log(id);
  }




}
