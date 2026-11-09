import { HttpInterceptorFn } from '@angular/common/http';

export const bearerTokenInterceptor: HttpInterceptorFn = (req, next) => {

  const HARDCODED_TOKEN =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1NmNmNGI0OC1hYTIxLTQyYmItOGJlOC0yNjM4MzNkYmRlYzgiLCJyb2xlIjoiUk9MRV9BRE1JTiIsIm9yZyI6IjkzM2ZjY2RmLWI4ZGItNDBkOS05MGUzLWUyYjRiOGU1YTAyNSIsImlzcyI6ImNvbS5raWNrb2RlLmNvbnZveCIsImV4cCI6MTc5MjQyNzgyMCwiaWF0IjoxNzkyMzQxNDIwLCJlbWFpbCI6InBvb2ppdGhhaXJvc2hhOTMxMUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InBvb2ppdGhhaXJvc2hhIn0.N4l1BoqZI0XsBturYu_lFnNJmGOX1xVsaJz0I5wiUMY';
  if (req.url.endsWith('config.json')) {
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: { Authorization: `Bearer ${HARDCODED_TOKEN}` },
    }),
  );
}
