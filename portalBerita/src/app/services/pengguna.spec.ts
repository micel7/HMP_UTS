import { TestBed } from '@angular/core/testing';

import { Pengguna } from './pengguna';

describe('Pengguna', () => {
  let service: Pengguna;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Pengguna);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
