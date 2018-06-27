import { Component, OnInit, Input } from '@angular/core';
import { Categoria } from '../modelos/categoria';
import { CategoriaService } from '../categoria.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-categoria-listado',
  templateUrl: './categoria-listado.component.html',
  styleUrls: ['./categoria-listado.component.css'],
  providers: [CategoriaService]
})
export class CategoriaListadoComponent implements OnInit {
  @Input() categorias: Categoria[];

  constructor(protected servicio: CategoriaService, private location: Location) { }

  ngOnInit() {
  }

  anular(id: string) {

    if (confirm('¿Desea proseguir con la anulación?')) {
      const categoria = new Categoria();
      categoria._id = id;
      categoria.activo = false;
      categoria.fecha_baja = new Date();
      this.servicio.actualizarCategoria(categoria).subscribe(resultado => {
        this.servicio.obtenerTodos().subscribe(categorias => this.categorias = categorias);
      });
      
    }
    
  }
}
