import { RenderMode, ServerRoute } from '@angular/ssr';

// SSR en runtime (Netlify Function) en vez de prerender en build:
// el prerender local/Netlify explotaba con `window is not defined`.
export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];
