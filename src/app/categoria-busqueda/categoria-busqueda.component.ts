import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../categoria.service';
import { Categoria } from '../modelos/categoria';

@Component({
  selector: 'app-categoria-busqueda',
  templateUrl: './categoria-busqueda.component.html',
  styleUrls: ['./categoria-busqueda.component.css'],
  providers: [CategoriaService]
})
export class CategoriaBusquedaComponent implements OnInit {

  categorias: Categoria[];
  patron: string;
  cargando = false;
  constructor(public servicio: CategoriaService) {

  }

  ngOnInit() {
  }

  buscar() {
    if (this.patron.length >= 3) {
      this.servicio.obtenerCategoriaPorNombre(this.patron).subscribe(colCategorias => this.categorias = colCategorias);
    } else {
      this.categorias = [];
    }
  }
  todos() {
    this.cargando = true;
    this.servicio.obtenerTodos().subscribe(colCategorias => this.categorias = colCategorias, null, () => {this.cargando = false; });

  }

}
