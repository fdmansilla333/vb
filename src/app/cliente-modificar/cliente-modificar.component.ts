import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../clientes.service';
import { Cliente } from '../modelos/cliente';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cliente-modificar',
  templateUrl: './cliente-modificar.component.html',
  styleUrls: ['./cliente-modificar.component.css'],
  providers: [ClientesService]
})
export class ClienteModificarComponent implements OnInit {

  public cliente: Cliente;
  public error = false;
  public errorMensaje: any;

  constructor(public servicio: ClientesService,   private location: Location, private route: ActivatedRoute) {
    this.cliente = new Cliente();

   }

   ngOnInit() {
    this.getCliente();

  }

  getCliente(): void {
    let id = this.route.snapshot.params.id;
    this.servicio.obtenerClientePorId(id).subscribe(resCliente =>
      this.cliente = resCliente
    );

  }

  guardar() {
    this.error = false;
    this.servicio.actualizarCliente(this.cliente).subscribe(resultado => {
      console.log(resultado);
      this.location.back();
    }, error => {
      this.error = true;
      this.errorMensaje = 'El cliente ya existe!';
    });

  }

}
