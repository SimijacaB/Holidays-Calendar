import { TestBed } from '@angular/core/testing';

import { TipoFestivoService } from './tipo-festivo.service';

describe('TipoFestivoService', () => {
  let service: TipoFestivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoFestivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
