import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export interface AppConfig {
  apiBaseUrl: string;
}

@Injectable({ providedIn: 'root' })
export class AppConfigService {
  private readonly http = new HttpClient(inject(HttpBackend));
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private config: AppConfig = { apiBaseUrl: '' };

  async load(): Promise<void> {
    if (!this.isBrowser) return; // config.json only exists for the browser

    this.config = await firstValueFrom(
      this.http.get<AppConfig>('/config.json', { headers: { 'Cache-Control': 'no-cache' } }),
    );
  }

  get apiBaseUrl(): string {
    return this.config.apiBaseUrl;
  }
}
