import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesBusquedaComponent } from './clientes-busqueda.component';

describe('ClientesBusquedaComponent', () => {
  let component: ClientesBusquedaComponent;
  let fixture: ComponentFixture<ClientesBusquedaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientesBusquedaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesBusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
