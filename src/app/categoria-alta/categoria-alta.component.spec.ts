import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaAltaComponent } from './categoria-alta.component';

describe('CategoriaAltaComponent', () => {
  let component: CategoriaAltaComponent;
  let fixture: ComponentFixture<CategoriaAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
