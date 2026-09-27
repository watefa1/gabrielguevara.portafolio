import { Component, Inject, Input, AfterViewInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './proyectos.html',
  styleUrls: ['./proyectos.css']
})
export class Proyectos implements AfterViewInit, OnDestroy {
  @Input() lang: 'es' | 'en' = 'es';

  filter: 'all' | 'web' | 'ia' | '3d' = 'all';

  filters: { key: 'all' | 'web' | 'ia' | '3d', es: string, en: string }[] = [
    { key: 'all', es: 'Todos', en: 'All' },
    { key: 'web', es: 'Web', en: 'Web' },
    { key: 'ia', es: 'IA', en: 'AI' },
    { key: '3d', es: '3D', en: '3D' }
  ];

  // Descripciones recortadas (line-clamp en mobile) y expandidas por el usuario
  clampedDescs = new Set<number>();
  expandedDescs = new Set<number>();
  private resizeTimer: NodeJS.Timeout | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.measureClamped();
    window.addEventListener('resize', this.onResize);
    window.addEventListener('load', this.onResize);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('load', this.onResize);
    clearTimeout(this.resizeTimer);
  }

  private onResize = () => {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => this.measureClamped(), 150);
  };

  // Marca las descripciones que el line-clamp de mobile está recortando
  private measureClamped(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (window.innerWidth > 600) {
      this.clampedDescs = new Set<number>();
      return;
    }
    const next = new Set<number>();
    document.querySelectorAll('.proj-card p[data-desc]').forEach(p => {
      const el = p as HTMLElement;
      const n = Number(el.dataset['desc']);
      // Si el usuario la expandió, mantener el botón para poder colapsar
      if (this.expandedDescs.has(n)) {
        next.add(n);
        return;
      }
      if (el.scrollHeight > el.clientHeight + 2) next.add(n);
    });
    this.clampedDescs = next;
  }

  onFilterChange(key: 'all' | 'web' | 'ia' | '3d'): void {
    this.filter = key;
    // Las tarjetas visibles cambian: re-medir qué descripciones quedan recortadas
    setTimeout(() => this.measureClamped(), 0);
  }

  toggleDesc(n: number): void {
    const next = new Set(this.expandedDescs);
    if (next.has(n)) {
      next.delete(n);
    } else {
      next.add(n);
    }
    this.expandedDescs = next;
  }
}
