import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DaftarberitaPage } from './daftarberita.page';

describe('DaftarberitaPage', () => {
  let component: DaftarberitaPage;
  let fixture: ComponentFixture<DaftarberitaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DaftarberitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
