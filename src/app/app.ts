import { Component, signal, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SobreMi } from "./sobre-mi/sobre-mi";
import { Proyectos } from "./proyectos/proyectos";
import { Contacto } from "./contacto/contacto";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SobreMi, Proyectos, Contacto],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements AfterViewInit {
  protected readonly title = signal('portafolio');

  ngAfterViewInit() {
    const nav = document.querySelector('nav') as HTMLElement;
    const navHeight = nav.offsetHeight + 20;

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = (link as HTMLAnchorElement).getAttribute('href');
        if (!targetId) return;

        const targetEl = document.querySelector(targetId) as HTMLElement;
        if (!targetEl) return;

        const elementTop = targetEl.getBoundingClientRect().top + window.scrollY;
        const scrollTo = elementTop - navHeight;

        window.scrollTo({ top: scrollTo, behavior: 'smooth' });
      });
    });
  }
}