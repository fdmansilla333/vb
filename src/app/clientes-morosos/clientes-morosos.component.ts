import { Component, OnInit } from '@angular/core';
import { VentasService } from '../ventas/ventas.service';
import { Cliente } from '../modelos/cliente';

@Component({
  selector: 'app-clientes-morosos',
  templateUrl: './clientes-morosos.component.html',
  styleUrls: ['./clientes-morosos.component.css'],
  providers: [VentasService]

})
export class ClientesMorososComponent implements OnInit {

  cliente: Cliente;

  constructor( protected servicio: VentasService) { 
  
  }

  ngOnInit() {

  }

}
