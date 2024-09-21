import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignatureActionsComponent } from './signature-actions.component';

describe('SignatureActionsComponent', () => {
  let component: SignatureActionsComponent;
  let fixture: ComponentFixture<SignatureActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignatureActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignatureActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
