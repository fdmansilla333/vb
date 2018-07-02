import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppComponent } from './../app.component';
import { Observable } from 'rxjs/Observable';
import { Factura } from '../modelos/factura';
import { CuponPago } from '../modelos/cuponpago';
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
  modificarSaldoCliente(clienteId: string, importeNuevo: number): Observable<any> {
    let objeto = {importe: importeNuevo};
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
}
