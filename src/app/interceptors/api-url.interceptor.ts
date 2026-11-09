import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AppConfigService } from '../services/app-config.service';

export const apiUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const base = inject(AppConfigService).apiBaseUrl;
  if (!base || /^https?:\/\//.test(req.url) || req.url.endsWith('.json')) {
    return next(req);
  }
  return next(req.clone({ url: `${base.replace(/\/$/, '')}/${req.url.replace(/^\//, '')}` }));
};
