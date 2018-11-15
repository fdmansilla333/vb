import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pago-parcial',
  templateUrl: './pago-parcial.component.html',
  styleUrls: ['./pago-parcial.component.css']
})
export class PagoParcialComponent implements OnInit {

  constructor(protected route: ActivatedRoute, protected navegacion: Router) { }

  ngOnInit() {
    const id_cupon_pago = this.route.snapshot.paramMap.get('id');
    console.log(id_cupon_pago);

  }

  volver(){
    this.navegacion.navigateByUrl('/cuponesPagos');
  }

}
