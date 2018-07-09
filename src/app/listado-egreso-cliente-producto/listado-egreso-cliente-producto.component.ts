import { Component, OnInit } from '@angular/core';
import { VentasService } from '../ventas/ventas.service';
import { Factura } from '../modelos/factura';

@Component({
  selector: 'app-listado-egreso-cliente-producto',
  templateUrl: './listado-egreso-cliente-producto.component.html',
  styleUrls: ['./listado-egreso-cliente-producto.component.css'],
  providers: [VentasService]
})
export class ListadoEgresoClienteProductoComponent implements OnInit {

  facturas: Factura[];
  constructor(protected serviceVentas: VentasService) {
    this.serviceVentas.obtenerFacturas().subscribe(colFacturas => {
      this.facturas = colFacturas;
      this.facturas = this.facturas.map(f => {
        this.serviceVentas.obtenerClientePorId(f.clienteID).subscribe(resCliente => {
          f.cliente = resCliente;
        
        });
        return f;
      });

    });

   }

  ngOnInit() {
  }

}
