import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DessertPrepDialogComponent } from './dessert-prep-dialog.component';

describe('DessertPrepDialogComponent', () => {
  let component: DessertPrepDialogComponent;
  let fixture: ComponentFixture<DessertPrepDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DessertPrepDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DessertPrepDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
