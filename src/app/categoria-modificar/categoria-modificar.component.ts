import { Component, OnInit } from '@angular/core';
import { Categoria } from '../modelos/categoria';
import { CategoriaService } from '../categoria.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-categoria-modificar',
  templateUrl: './categoria-modificar.component.html',
  styleUrls: ['./categoria-modificar.component.css'],
  providers: [CategoriaService]
})
export class CategoriaModificarComponent implements OnInit {


  public categoria: Categoria;
  public error = false;
  public errorMensaje: any;

  constructor(public servicio: CategoriaService, private location: Location, private route: ActivatedRoute) {
    this.categoria = new Categoria();

  }

  ngOnInit() {
    this.getCategoria();

  }

  getCategoria(): void {
    let id = this.route.snapshot.params.id;
    this.servicio.obtenerCategoriaPorId(id).subscribe(resCategoria => {
    // this.categoria = resCategoria;
    const fechaAlta = new Date(resCategoria.fecha_alta);
    const fechaBaja = new Date(resCategoria.fecha_baja);
    this.categoria.nombre = resCategoria.nombre;
    this.categoria.activo = resCategoria.activo;
    this.categoria._id = resCategoria._id;
    this.categoria.fecha_alta = fechaAlta.toISOString().split('T')[0];
    this.categoria.fecha_baja = fechaBaja.toISOString().split('T')[0];
    }
    );

  }

  guardar() {
    this.error = false;
    this.servicio.actualizarCategoria(this.categoria).subscribe(resultado => {
      console.log(resultado);
      this.location.back();
    }, error => {
      this.error = true;
      this.errorMensaje = 'La categoria ya existe!';
    });

  }
}
