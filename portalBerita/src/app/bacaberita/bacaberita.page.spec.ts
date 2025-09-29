import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BacaberitaPage } from './bacaberita.page';

describe('BacaberitaPage', () => {
  let component: BacaberitaPage;
  let fixture: ComponentFixture<BacaberitaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BacaberitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
