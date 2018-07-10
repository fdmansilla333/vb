import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  titulo = 'app';
  urlBase = 'http://192.168.0.100:3000/api/';
  urlBase2 = 'http://192.168.0.100:3000/api2/';
  urlReporte = 'http://192.168.0.100:3000/reporte/';
}
