import { TestBed } from '@angular/core/testing';

import { Kategori } from './kategori';

describe('Kategori', () => {
  let service: Kategori;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Kategori);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
