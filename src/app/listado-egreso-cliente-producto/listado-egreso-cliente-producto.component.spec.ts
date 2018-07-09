import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoEgresoClienteProductoComponent } from './listado-egreso-cliente-producto.component';

describe('ListadoEgresoClienteProductoComponent', () => {
  let component: ListadoEgresoClienteProductoComponent;
  let fixture: ComponentFixture<ListadoEgresoClienteProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoEgresoClienteProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoEgresoClienteProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
