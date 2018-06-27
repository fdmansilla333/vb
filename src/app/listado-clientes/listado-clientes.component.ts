import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Cliente } from '../modelos/cliente';
import { ClientesService } from '../clientes.service';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.css'],
  providers: [ClientesService]

})
export class ListadoClientesComponent implements OnInit {

  @Input() clientes: Cliente[];
  constructor(protected servicio: ClientesService) {
  }

  ngOnInit() {
  }

  anular(id: string) {
    if (confirm('¿Desea anular el cliente?')) {
    let cliente = new Cliente();
    cliente._id = id;
    cliente.Activo = false;
    cliente.Fecha_baja = new Date();
  this.servicio.actualizarCliente(cliente).subscribe(res => console.log(res));
    }
  }

}
