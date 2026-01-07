import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewberitaPage } from './newberita.page';

describe('NewberitaPage', () => {
  let component: NewberitaPage;
  let fixture: ComponentFixture<NewberitaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewberitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
