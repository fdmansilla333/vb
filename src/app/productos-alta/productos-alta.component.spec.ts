import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosAltaComponent } from './productos-alta.component';

describe('ProductosAltaComponent', () => {
  let component: ProductosAltaComponent;
  let fixture: ComponentFixture<ProductosAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductosAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
