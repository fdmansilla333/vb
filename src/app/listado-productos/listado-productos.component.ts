import { Component, OnInit, Input } from '@angular/core';
import { Producto } from '../modelos/producto';
import { CategoriaService } from '../categoria.service';
import { ProductosServicioService } from '../productos-servicio.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styleUrls: ['./listado-productos.component.css'],
  providers: [CategoriaService, ProductosServicioService]
})
export class ListadoProductosComponent implements OnInit {
  @Input() productos: Producto[];

  fuenteCodigoBarra: any;

  constructor(private location: Location, protected servicio: CategoriaService, protected servicioProducto: ProductosServicioService) { }

  ngOnInit() {
    this.productos.map(p => {
      const idCategoria = p.categoria.toString();
      this.servicio.obtenerCategoriaPorId(idCategoria).subscribe(categoria => p.categoria = categoria.nombre);
    }
    );
  }

  anular(id: string) {
    if (confirm('¿Desea anular el producto?')) {
      let producto = new Producto();
      producto._id = id;
      producto.Activo = false;
      producto.fecha_baja = new Date().toISOString();
      this.servicioProducto.actualizarProducto(producto).subscribe(res => this.location.back());
    }

  }
  completarModal(p: Producto) {
    this.fuenteCodigoBarra = p._id;
  }

}
