import { Component, OnInit } from '@angular/core';
import { Cliente } from '../modelos/cliente';
import { ClientesService } from '../clientes.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cliente-alta',
  templateUrl: './cliente-alta.component.html',
  styleUrls: ['./cliente-alta.component.css'],
  providers: [ClientesService]
})
export class ClienteAltaComponent implements OnInit {

  public cliente: Cliente;
  public error = false;
  public errorMensaje: any;
  constructor(public servicio: ClientesService,   private location: Location) {
    this.cliente = new Cliente();
   }

  ngOnInit() {
  }


  guardar() {
    this.error = false;
    this.cliente.Fecha_alta = new Date();
    this.cliente.Activo = true;
    this.servicio.guardarCliente(this.cliente).subscribe(resultado => {
      this.location.back();
    }, error => {
      this.error = true;
      this.errorMensaje = 'El cliente ya existe!';


    });

  }

}
