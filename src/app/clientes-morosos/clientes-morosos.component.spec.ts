import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesMorososComponent } from './clientes-morosos.component';

describe('ClientesMorososComponent', () => {
  let component: ClientesMorososComponent;
  let fixture: ComponentFixture<ClientesMorososComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientesMorososComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesMorososComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
