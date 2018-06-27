import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuponesPagosComponent } from './cupones-pagos.component';

describe('CuponesPagosComponent', () => {
  let component: CuponesPagosComponent;
  let fixture: ComponentFixture<CuponesPagosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuponesPagosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuponesPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
