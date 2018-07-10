import { Component, OnInit } from '@angular/core';
import { VentasService } from '../ventas/ventas.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css'],
  providers: [VentasService]
})
export class NotificacionesComponent implements OnInit {
  activarNotificacion = false;
  mensaje: string;
  titulo: string;
  constructor(protected sVentas: VentasService) { }

  ngOnInit() {
    setInterval(() => this.comprobar(), 1000 * 10 );

  }

  comprobar() {

    this.sVentas.obtenerCuponesImpagos().subscribe(colCuponesImpagos => {
      if (colCuponesImpagos.length > 0) {
        this.activarNotificacion = true;
        this.mensaje = 'Existen ' + colCuponesImpagos.length + 'cupones impagos. \n';
        let vencidos = 0;
        let proximosVencer = 0;
        let ahora = new Date();
        colCuponesImpagos.map(c => {
          const fechaVencimiento = new Date(c.fechaVencimiento);
          const corrimiento = new Date(fechaVencimiento);
          corrimiento.setDate(corrimiento.getDate() + 5);
          if (fechaVencimiento <= ahora) {
            vencidos += 1;
          }
          if (fechaVencimiento > ahora && corrimiento < fechaVencimiento) {
            proximosVencer += 1;
          }

        });
        this.mensaje += ' Vencidos: ' + vencidos + '. \n';
        this.mensaje += ' Próximos a vencer: ' + proximosVencer + '. \n';
      } else {
        this.activarNotificacion = false;
        this.titulo = '';
        this.mensaje = '';
      }
    });

  }

}
