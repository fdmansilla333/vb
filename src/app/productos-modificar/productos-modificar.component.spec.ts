import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosModificarComponent } from './productos-modificar.component';

describe('ProductosModificarComponent', () => {
  let component: ProductosModificarComponent;
  let fixture: ComponentFixture<ProductosModificarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductosModificarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
