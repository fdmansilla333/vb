import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { Categoria } from './modelos/categoria';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CategoriaService {

  constructor(private http: HttpClient, private app: AppComponent) { }

  obtenerCategoriaPorNombre(nombre: string): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.app.urlBase + 'categorias?Nombre=' + nombre);
  }

  obtenerTodos(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.app.urlBase + 'categorias');
  }

  obtenerCategoriaPorId(id: string): Observable<Categoria> {
    return this.http.get<Categoria>(this.app.urlBase + 'categorias/' + id);
  }


  guardarCategoria(categoria: Categoria): Observable<Categoria> {

    return this.http.post<Categoria>(this.app.urlBase + 'categorias', categoria);
  }


  actualizarCategoria(categoria: Categoria): Observable<Categoria> {
    const id = categoria._id;
    if (categoria.activo) {
      categoria.fecha_baja = new Date('2099-01-01');
    } else {
      categoria.fecha_baja = new Date();


    }
    categoria.fecha_alta = new Date(categoria.fecha_alta);
    delete categoria._id;
    console.log(categoria);
    return this.http.put<Categoria>(this.app.urlBase + 'categorias/' + id, categoria);
  }
}
