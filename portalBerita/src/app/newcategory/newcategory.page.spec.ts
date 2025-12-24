import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewcategoryPage } from './newcategory.page';

describe('NewcategoryPage', () => {
  let component: NewcategoryPage;
  let fixture: ComponentFixture<NewcategoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewcategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
