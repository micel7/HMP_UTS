import { TestBed } from '@angular/core/testing';

import { Databerita } from './dataBerita';

describe('Databerita', () => {
  let service: Databerita;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Databerita);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
