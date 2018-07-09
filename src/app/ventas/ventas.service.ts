import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppComponent } from './../app.component';
import { Observable } from 'rxjs/Observable';
import { Factura } from '../modelos/factura';
import { CuponPago } from '../modelos/cuponpago';
import { Cliente } from '../modelos/cliente';
import { Renglon } from '../modelos/renglon';
import { Operacion } from '../modelos/operacion';
@Injectable()
export class VentasService {

  constructor(private http: HttpClient, private app: AppComponent) { }


  obtenerFacturasPorCliente(clienteid: string): Observable<Factura[]> {
    return this.http.get<Factura[]>(this.app.urlBase2 + 'facturas?cliente=' + clienteid);
  }
  obtenerFacturas(): Observable<Factura[]> {
    return this.http.get<Factura[]>(this.app.urlBase2 + 'facturas');
  }
  guardarFactura(factura: Factura): Observable<Factura> {
    return this.http.post<Factura>(this.app.urlBase + 'facturas', factura);
  }

  guardarCuponPago(cupon: CuponPago): Observable<any> {
    return this.http.post(this.app.urlBase + 'cupones_pagos', cupon);
  }
  obtenerFacturasPorClienteNombre(termino: string): Observable<Factura[]> {
    return this.http.get<Factura[]>(this.app.urlBase2 + 'facturas/' + termino);
  }


  obtenerSaldoCliente(clienteId: string): Observable<any> {
    return this.http.get(this.app.urlBase2 + 'saldos/' + clienteId);
  }
  modificarSaldoCliente(clienteId: string, importeNuevo: number, operaciones: Operacion): Observable<any> {
    let objeto = {importe: importeNuevo, operaciones: operaciones};
    return this.http.post(this.app.urlBase2 + 'saldos/' + clienteId, objeto);
  }
  abrirSaldo(clienteId: string): Observable <any> {
  return this.http.get(this.app.urlBase2 + 'abrirSaldo/ ' + clienteId);
  }

  obtenerCuponesPorFactura(idFactura: string): Observable <CuponPago[]> {
    return this.http.get<CuponPago[]>(this.app.urlBase2 + 'cuponesPagos/' + idFactura);
  }

  modificarCuponPago(cupon: CuponPago): Observable<any> {
    return this.http.put(this.app.urlBase2 + 'cuponesPagos/' + cupon._id, cupon);
  }

  obtenerCuponesImpagos(): Observable <CuponPago[]> {
    return this.http.get<CuponPago[]>(this.app.urlBase2 + 'morosos');
  }
  obtenerFacturaPorId(id: string): Observable <Factura> {
    return this.http.get<Factura>(this.app.urlBase2 + 'facturas?id=' + id);
  }

  obtenerClientePorId(idCliente: string): Observable <Cliente> {
    return this.http.get<Cliente>(this.app.urlBase2 + 'clientes/' + idCliente);
  }

  modificarFactura(factura: Factura): Observable <Factura> {
    return this.http.put<Factura>(this.app.urlBase2 + 'facturas/' + factura._id, factura);
  }

  
}
