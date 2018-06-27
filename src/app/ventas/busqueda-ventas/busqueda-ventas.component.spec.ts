import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaVentasComponent } from './busqueda-ventas.component';

describe('BusquedaVentasComponent', () => {
  let component: BusquedaVentasComponent;
  let fixture: ComponentFixture<BusquedaVentasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaVentasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
