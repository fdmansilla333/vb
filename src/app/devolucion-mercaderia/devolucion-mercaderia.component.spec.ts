import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolucionMercaderiaComponent } from './devolucion-mercaderia.component';

describe('DevolucionMercaderiaComponent', () => {
  let component: DevolucionMercaderiaComponent;
  let fixture: ComponentFixture<DevolucionMercaderiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevolucionMercaderiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevolucionMercaderiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
