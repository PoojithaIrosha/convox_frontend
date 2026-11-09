import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SocialAuthButtons } from './social-auth-buttons';

describe('SocialAuthButtons', () => {
  let component: SocialAuthButtons;
  let fixture: ComponentFixture<SocialAuthButtons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialAuthButtons],
    }).compileComponents();

    fixture = TestBed.createComponent(SocialAuthButtons);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
