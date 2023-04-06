import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentMapComponent } from './parent-map.component';

describe('ParentMapComponent', () => {
  let component: ParentMapComponent;
  let fixture: ComponentFixture<ParentMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
