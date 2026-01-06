import { TestBed } from '@angular/core/testing';

import { FavDexie } from './fav-dexie';

describe('FavDexie', () => {
  let service: FavDexie;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavDexie);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
