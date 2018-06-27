import { Component, OnInit, Output } from '@angular/core';
import { ClientesService } from '../clientes.service';
import { Cliente } from '../modelos/cliente';

@Component({
  selector: 'app-clientes-busqueda',
  templateUrl: './clientes-busqueda.component.html',
  styleUrls: ['./clientes-busqueda.component.css'],
  providers: [ClientesService]
})
export class ClientesBusquedaComponent implements OnInit {
  clientes: Cliente[];
  patron: string;
  cargando = false;
  constructor(public servicio: ClientesService) {

  }

  ngOnInit() {
  }

  buscar() {
    if (this.patron.length > 3) {
      this.servicio.obtenerClientesPorNombre(this.patron).subscribe(colClientes => this.clientes = colClientes);
    } else {
      this.clientes = [];
    }
  }
  todos() {
    this.cargando = true;
    this.servicio.obtenerClientes().subscribe(colClientes => this.clientes = colClientes, null, () => {this.cargando = false; });

  }

}
