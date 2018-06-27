import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaVentasComponent } from './alta-ventas.component';

describe('AltaVentasComponent', () => {
  let component: AltaVentasComponent;
  let fixture: ComponentFixture<AltaVentasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaVentasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
