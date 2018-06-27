import { TestBed, inject } from '@angular/core/testing';

import { ProductosServicioService } from './productos-servicio.service';

describe('ProductosServicioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductosServicioService]
    });
  });

  it('should be created', inject([ProductosServicioService], (service: ProductosServicioService) => {
    expect(service).toBeTruthy();
  }));
});
