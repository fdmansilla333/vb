import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClientesMorososComponent } from './clientes-morosos/clientes-morosos.component';
import { VentasComponent } from './ventas/ventas.component';
import { ProductosComponent } from './productos/productos.component';
import { ClienteAltaComponent } from './cliente-alta/cliente-alta.component';
import { ClienteModificarComponent } from './cliente-modificar/cliente-modificar.component';
import { ProductosAltaComponent } from './productos-alta/productos-alta.component';
import { ProductosModificarComponent } from './productos-modificar/productos-modificar.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CategoriaAltaComponent } from './categoria-alta/categoria-alta.component';
import { CategoriaModificarComponent } from './categoria-modificar/categoria-modificar.component';
import { AltaVentasComponent } from './ventas/alta-ventas/alta-ventas.component';
import { CuponesPagosComponent } from './cupones-pagos/cupones-pagos.component';



const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'ventas', component: VentasComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'categorias', component: CategoriaComponent },
  { path: 'clientes/alta', component: ClienteAltaComponent },
  { path: 'clientes/modificar/:id', component: ClienteModificarComponent },
  { path: 'clientes/morosos', component: ClientesMorososComponent },
  { path: 'productos/alta', component: ProductosAltaComponent },
  { path: 'productos/modificar/:id', component: ProductosModificarComponent },
  { path: 'categorias/alta', component: CategoriaAltaComponent },
  { path: 'categorias/modificar/:id', component: CategoriaModificarComponent },
  { path: 'ventas/alta', component: AltaVentasComponent },
  { path: 'cuponesPagos', component: CuponesPagosComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
