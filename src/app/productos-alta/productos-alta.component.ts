import { Component, OnInit } from '@angular/core';
import { Producto } from '../modelos/producto';
import { ProductosServicioService } from '../productos-servicio.service';
import { Location } from '@angular/common';
import { CategoriaService } from '../categoria.service';
import { Categoria } from '../modelos/categoria';

@Component({
  selector: 'app-productos-alta',
  templateUrl: './productos-alta.component.html',
  styleUrls: ['./productos-alta.component.css'],
  providers: [ProductosServicioService, CategoriaService]
})
export class ProductosAltaComponent implements OnInit {


  public producto: Producto;
  public error = false;
  public errorMensaje: any;
  public categorias: Categoria[];
  public categoriaSeleccionada: any;
  constructor(public servicio: ProductosServicioService, servicioCategorias: CategoriaService,    private location: Location) {
    this.producto = new Producto();
    servicioCategorias.obtenerTodos().subscribe(colCategorias => {
      this.categorias = colCategorias.filter(c => c.activo);

    });

   }

  ngOnInit() {
  }



  guardar() {
    this.error = false;
    this.producto.categoria = this.categoriaSeleccionada;
    this.producto.Activo = true;
    this.producto.fecha_alta = new Date().toISOString();
    this.servicio.guardarProducto(this.producto).subscribe(resultado => {
      this.location.back();
    }, error => {
      this.error = true;
      this.errorMensaje = 'El producto ya existe!';


    });

  }

}
