import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmInscriptionComponent } from './confirm-inscription.component';

describe('ConfirmInscriptionComponent', () => {
  let component: ConfirmInscriptionComponent;
  let fixture: ComponentFixture<ConfirmInscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmInscriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
