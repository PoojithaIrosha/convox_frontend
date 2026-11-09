import { Component, DestroyRef, ElementRef, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialProvider } from '../../../models/auth.model';
import { SocialAuthButtons } from '../../../components/social-auth-buttons/social-auth-buttons';

@Component({
  imports: [ReactiveFormsModule, SocialAuthButtons],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly host: HTMLElement = inject(ElementRef).nativeElement;

  readonly form = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', Validators.required],
    remember: [false],
  });

  readonly loading = signal(false);
  readonly serverError = signal<string | null>(null);
  readonly showPassword = signal(false);
  readonly capsLock = signal(false);
  private readonly submitAttempted = signal(false);

  togglePassword(): void {
    this.showPassword.update((v) => !v);
  }

  checkCapsLock(event: KeyboardEvent): void {
    this.capsLock.set(event.getModifierState?.('CapsLock') ?? false);
  }

  submit(): void {
    
  }

  signInWith(provider: SocialProvider): void {
    // this.auth.startOAuth(provider);
  }

  private returnUrl(): string {
    const url = this.route.snapshot.queryParamMap.get('returnUrl');
    return url && url.startsWith('/') && !url.startsWith('//') ? url : '/';
  }
}
