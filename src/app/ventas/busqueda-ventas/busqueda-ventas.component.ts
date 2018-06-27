import { Component, OnInit } from '@angular/core';
import { VentasService } from '../ventas.service';
import { Factura } from '../../modelos/factura';

@Component({
  selector: 'app-busqueda-ventas',
  templateUrl: './busqueda-ventas.component.html',
  styleUrls: ['./busqueda-ventas.component.css'],
  providers: [VentasService]
})
export class BusquedaVentasComponent implements OnInit {

  facturas: Factura[] = [];
  patron: string;
  cargando = false;

  constructor(public servicio: VentasService) { }

  ngOnInit() {
  }


  buscar() {
    if (this.patron.length > 3) {
      this.servicio.obtenerFacturasPorClienteNombre(this.patron).subscribe(colFacturas => this.facturas = colFacturas);
    } else {
      this.facturas = [];
    }
  }
  todos() {
    this.cargando = true;
    this.servicio.obtenerFacturas().subscribe(colFacturas => this.facturas = colFacturas, null, () => {this.cargando = false; });

  }
}
