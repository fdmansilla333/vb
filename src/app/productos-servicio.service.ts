import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppComponent } from './app.component';
import { Producto } from './modelos/producto';


@Injectable()
export class ProductosServicioService {

  constructor(private http: HttpClient, private app: AppComponent) { }

  obtenerProductosPorNombre(nombre: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.app.urlBase + 'productos?nombre=' + nombre);
  }

  obtenerTodos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.app.urlBase + 'productos');
  }

  obteneProductoPorId(id: string): Observable<Producto> {
    return this.http.get<Producto>(this.app.urlBase + 'productos/' + id);
  }


  guardarProducto(producto: Producto): Observable<Producto> {
    console.log(producto);
    return this.http.post<Producto>(this.app.urlBase + 'productos', producto);
  }


  actualizarProducto(producto: Producto): Observable<Producto> {
    const id = producto._id;
    delete producto._id;
    return this.http.put<Producto>(this.app.urlBase + 'productos/' + id, producto);
  }

}
