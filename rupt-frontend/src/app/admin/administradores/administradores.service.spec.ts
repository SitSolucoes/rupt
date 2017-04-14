import { TestBed, inject } from '@angular/core/testing';

import { AdministradoresService } from './administradores.service';

describe('AdministradoresService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdministradoresService]
    });
  });

  it('should ...', inject([AdministradoresService], (service: AdministradoresService) => {
    expect(service).toBeTruthy();
  }));
});
