import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaBusquedaComponent } from './categoria-busqueda.component';

describe('CategoriaBusquedaComponent', () => {
  let component: CategoriaBusquedaComponent;
  let fixture: ComponentFixture<CategoriaBusquedaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaBusquedaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaBusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
