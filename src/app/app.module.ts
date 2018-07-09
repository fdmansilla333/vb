import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ClientesMorososComponent } from './clientes-morosos/clientes-morosos.component';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { ClientesBusquedaComponent } from './clientes-busqueda/clientes-busqueda.component';
import { ClientesComponent } from './clientes/clientes.component';
import { AppRoutingModule } from './/app-routing.module';
import { VentasComponent } from './ventas/ventas.component';
import { ProductosComponent } from './productos/productos.component';
import { ClienteAltaComponent } from './cliente-alta/cliente-alta.component';
import { ListadoClientesComponent } from './listado-clientes/listado-clientes.component';
import { ClienteModificarComponent } from './cliente-modificar/cliente-modificar.component';
import { ProductosBusquedaComponent } from './productos-busqueda/productos-busqueda.component';
import { ProductosModificarComponent } from './productos-modificar/productos-modificar.component';
import { ProductosAltaComponent } from './productos-alta/productos-alta.component';
import { ListadoProductosComponent } from './listado-productos/listado-productos.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CategoriaAltaComponent } from './categoria-alta/categoria-alta.component';
import { CategoriaModificarComponent } from './categoria-modificar/categoria-modificar.component';
import { CategoriaBusquedaComponent } from './categoria-busqueda/categoria-busqueda.component';
import { CategoriaListadoComponent } from './categoria-listado/categoria-listado.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { BusquedaVentasComponent } from './ventas/busqueda-ventas/busqueda-ventas.component';
import { ListadoVentasComponent } from './ventas/listado-ventas/listado-ventas.component';
import { AltaVentasComponent } from './ventas/alta-ventas/alta-ventas.component';
import { DetalleVentaComponent } from './detalle-venta/detalle-venta.component';
import { CuponesPagosComponent } from './cupones-pagos/cupones-pagos.component';


// Import ngx-barcode module
import { NgxBarcodeModule } from 'ngx-barcode';
import { ListadoEgresoClienteProductoComponent } from './listado-egreso-cliente-producto/listado-egreso-cliente-producto.component';
import { DevolucionMercaderiaComponent } from './devolucion-mercaderia/devolucion-mercaderia.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientesMorososComponent,
    EncabezadoComponent,
    ClientesBusquedaComponent,
    ClientesComponent,
    VentasComponent,
    ProductosComponent,
    ClienteAltaComponent,
    ListadoClientesComponent,
    ClienteModificarComponent,
    ProductosBusquedaComponent,
    ProductosModificarComponent,
    ProductosAltaComponent,
    ListadoProductosComponent,
    CategoriaComponent,
    CategoriaAltaComponent,
    CategoriaModificarComponent,
    CategoriaBusquedaComponent,
    CategoriaListadoComponent,
    BusquedaVentasComponent,
    ListadoVentasComponent,
    AltaVentasComponent,
    DetalleVentaComponent,
    CuponesPagosComponent,
    ListadoEgresoClienteProductoComponent,
    DevolucionMercaderiaComponent,
    NotificacionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule,
    NgxBarcodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
