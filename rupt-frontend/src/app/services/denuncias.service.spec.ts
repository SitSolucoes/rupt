import { TestBed, inject } from '@angular/core/testing';

import { DenunciasService } from './denuncias.service';

describe('DenunciasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DenunciasService]
    });
  });

  it('should ...', inject([DenunciasService], (service: DenunciasService) => {
    expect(service).toBeTruthy();
  }));
});
