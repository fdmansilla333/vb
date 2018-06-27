import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppComponent } from './app.component';
import { Observable } from 'rxjs/Observable';
import { Cliente } from './modelos/cliente';

@Injectable()
export class ClientesService {

  constructor(private http: HttpClient, private app: AppComponent) { }

  obtenerClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.app.urlBase + 'clientes');
  }

  obtenerClientesPorNombre(nombre: string): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.app.urlBase + 'clientes?nombre=' + nombre);
  }

  obtenerClientePorId(id: string): Observable<Cliente> {
    return this.http.get<Cliente>(this.app.urlBase + 'clientes/' + id);
  }


  guardarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.app.urlBase + 'clientes', cliente);
  }

  obtenerCliente(): Observable<Cliente> {
    return this.http.get<Cliente>(this.app.urlBase + 'clientes');
  }

  actualizarCliente(cliente: Cliente): Observable<Cliente> {
    const id = cliente._id;
    delete cliente._id;
    return this.http.put<Cliente>(this.app.urlBase + 'clientes/' + id, cliente);
  }
}
