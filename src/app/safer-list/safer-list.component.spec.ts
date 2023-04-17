import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaferListComponent } from './safer-list.component';

describe('SaferListComponent', () => {
  let component: SaferListComponent;
  let fixture: ComponentFixture<SaferListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaferListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaferListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
