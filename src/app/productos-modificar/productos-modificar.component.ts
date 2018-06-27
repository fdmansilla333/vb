import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../modelos/producto';
import { ProductosServicioService } from '../productos-servicio.service';

@Component({
  selector: 'app-productos-modificar',
  templateUrl: './productos-modificar.component.html',
  styleUrls: ['./productos-modificar.component.css'],
  providers: [ProductosServicioService]
})
export class ProductosModificarComponent implements OnInit {

  public producto: Producto;
  public error = false;
  public errorMensaje: any;

  constructor(public servicio: ProductosServicioService,   private location: Location, private route: ActivatedRoute) {
    this.producto = new Producto();

   }

   ngOnInit() {
    this.getProducto();

  }
  getProducto(): void {
    let id = this.route.snapshot.params.id;
    this.servicio.obteneProductoPorId(id).subscribe(resProducto =>
      this.producto = resProducto
    );

  }

  guardar() {
    this.error = false;
    if (this.producto.Activo && this.producto.fecha_baja) {
      // Esto quiere decir que estaba dado de baja
      this.producto.fecha_baja = new Date('2099/01/01').toISOString();
    } else {
      this.producto.fecha_baja = new Date().toISOString();
    }
    this.servicio.actualizarProducto(this.producto).subscribe(resultado => {
      console.log(resultado);
      this.location.go('productos');
    }, error => {
      this.error = true;
      this.errorMensaje = 'El producto ya existe!';
    });

  }


}
