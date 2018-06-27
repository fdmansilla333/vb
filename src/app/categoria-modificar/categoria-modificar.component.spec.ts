import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaModificarComponent } from './categoria-modificar.component';

describe('CategoriaModificarComponent', () => {
  let component: CategoriaModificarComponent;
  let fixture: ComponentFixture<CategoriaModificarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaModificarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
