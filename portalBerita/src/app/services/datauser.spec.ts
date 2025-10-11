import { TestBed } from '@angular/core/testing';

import { Datauser } from './datauser';

describe('Datauser', () => {
  let service: Datauser;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Datauser);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
