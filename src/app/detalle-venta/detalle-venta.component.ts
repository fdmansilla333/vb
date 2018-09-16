import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from '../modelos/producto';
import { ProductosServicioService } from '../productos-servicio.service';
import { Renglon } from '../modelos/renglon';

@Component({
  selector: 'app-detalle-venta',
  templateUrl: './detalle-venta.component.html',
  styleUrls: ['./detalle-venta.component.css'],
  providers: [ProductosServicioService]
})
export class DetalleVentaComponent implements OnInit {

  detalles: Renglon[];
  productos: Producto[];
  total = 0;
  @Output() detallesFinal: EventEmitter<Renglon[]> = new EventEmitter();

  constructor(protected servicio: ProductosServicioService) {
    this.productos = new Array();
    this.servicio.obtenerTodos().subscribe(colProductos => {
      // se devuelven aquellos productos con cantidad y activos
      this.productos = colProductos.filter(p => {
        const devolver = p.cantidad > 0 && p.Activo;
        return devolver;
      });

    });
    this.detalles = new Array();
    this.agregarRenglon();

  }

  ngOnInit() {

  }



  actualizarProducto(d: Renglon) {

    d.cantidad = 1;
    d.precioVenta = d.producto.precioVenta;
    d.cantidadMaxima = d.producto.cantidad;

  }



  confirmar() {
    if (this.verificar(this.detalles)) {

      if (confirm('¿fin de venta?')) {
        this.detallesFinal.emit(this.detalles);
      }
    } else {
      alert('No se puede realizar la venta, revise los campos');
    }

  }

  verificar(detalles: Renglon[]): boolean {
    let verifica = true;
    if (detalles && detalles.length > 0) {
      detalles.map(d => {
        if (d.cantidad > d.cantidadMaxima) {
          verifica = false;
        }
        if (d.cantidad <= 0) {
          verifica = false;
        }
        if (this.total === 0) {
          verifica = false;
        }
      });
    }
    return verifica;
  }

  agregarRenglon() {
    let renglon = new Renglon();
    const posicion = this.detalles.length - 1;
    if (posicion >= 0) {
      this.total = this.detalles[posicion].precioVenta * this.detalles[posicion].cantidad + this.total;
      this.detalles[posicion].generado = true;
    }
    this.detalles.push(renglon);


  }

  quitarRenglon(indice: number) {
    let posicion = 0;
    if (this.detalles[indice].precioVenta) {
      this.total = this.total - Number(this.detalles[indice].precioVenta * this.detalles[indice].cantidad);
    }

    this.detalles = this.detalles.filter(d => {
      if (posicion++ !== indice) {
        return true;
      } else {

        return false;
      }

    });
  }

}
