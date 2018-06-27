import { Component, OnInit } from '@angular/core';
import { Categoria } from '../modelos/categoria';
import { CategoriaService } from '../categoria.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-categoria-alta',
  templateUrl: './categoria-alta.component.html',
  styleUrls: ['./categoria-alta.component.css'],
  providers: [CategoriaService]
})
export class CategoriaAltaComponent implements OnInit {

 
  public categoria: Categoria;
  public error = false;
  public errorMensaje: any;
  constructor(public servicio: CategoriaService,   private location: Location) {
    this.categoria = new Categoria();
   }

  ngOnInit() {
  }


  guardar() {
    this.error = false;
    this.servicio.guardarCategoria(this.categoria).subscribe(resultado => {
      this.location.back();
    }, error => {
      this.error = true;
      this.errorMensaje = 'La categoria ya existe!';


    });

  }

}
