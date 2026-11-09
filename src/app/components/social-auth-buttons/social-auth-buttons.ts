import { Component, input, output } from '@angular/core';
import { SocialProvider } from '../../models/auth.model';

@Component({
  imports: [],
  selector: 'app-social-auth-buttons',
  styleUrl: './social-auth-buttons.css',
  templateUrl: './social-auth-buttons.html',
})
export class SocialAuthButtons {
  readonly mode = input<'sign-in' | 'sign-up'>('sign-in');

  readonly providerSelected = output<SocialProvider>();
}
