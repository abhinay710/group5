import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DessertDialogComponent } from './dessert-dialog.component';

describe('DessertDialogComponent', () => {
  let component: DessertDialogComponent;
  let fixture: ComponentFixture<DessertDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DessertDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DessertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
