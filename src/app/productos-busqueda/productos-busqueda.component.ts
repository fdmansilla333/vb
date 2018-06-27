import { Component, OnInit } from '@angular/core';
import { ProductosServicioService } from '../productos-servicio.service';
import { Producto } from '../modelos/producto';

@Component({
  selector: 'app-productos-busqueda',
  templateUrl: './productos-busqueda.component.html',
  styleUrls: ['./productos-busqueda.component.css'],
  providers: [ProductosServicioService]
})
export class ProductosBusquedaComponent implements OnInit {
  productos: Producto[];
  patron: string;
  cargando = false;

  constructor(public servicio: ProductosServicioService) { }

  ngOnInit() {
  }


  buscar() {
    if (this.patron.length > 3) {
      this.servicio.obtenerProductosPorNombre(this.patron).subscribe(colProductos => this.productos = colProductos);
    } else {
      this.productos = [];
    }
  }
  todos() {
    this.cargando = true;
    this.servicio.obtenerTodos().subscribe(colProductos => this.productos = colProductos, null, () => {this.cargando = false; });

  }
}
