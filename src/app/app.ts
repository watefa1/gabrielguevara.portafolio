import { Component, signal, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SobreMi } from "./sobre-mi/sobre-mi";
import { Proyectos } from "./proyectos/proyectos";
import { Contacto } from "./contacto/contacto";
import { Skills } from "./skills/skills";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SobreMi, Proyectos, Skills, Contacto],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements AfterViewInit {
  protected readonly title = signal('portafolio');
  menuOpen = false;

  settingsModalOpen = false;

  openSettingsModal() {
    this.settingsModalOpen = true;
    setTimeout(() => {
      const langSelectModal = document.getElementById('lang-select-modal') as HTMLSelectElement;
      if (langSelectModal) {
        langSelectModal.removeEventListener('change', this._langChangeHandler);
        this._langChangeHandler = () => {
          this._setLangModal(langSelectModal.value as 'es' | 'en');
        };
        langSelectModal.addEventListener('change', this._langChangeHandler);
        this._setLangModal(langSelectModal.value as 'es' | 'en');
      }
    }, 0);
  }

  private _langChangeHandler: any;
  private _setLangModal(lang: 'es' | 'en') {
    const translations = {
      es: { close: 'Cerrar' },
      en: { close: 'Close' }
    };
    const closeModalBtn = document.querySelector('.close-modal-btn') as HTMLButtonElement;
    if (closeModalBtn) closeModalBtn.textContent = translations[lang].close;
    // Llama a setLang global si existe
    if ((window as any).setLang) (window as any).setLang(lang);
  }

  closeSettingsModal() {
    this.settingsModalOpen = false;
  }


  translations = {
    es: {
      nav: {
        sobreMi: 'Sobre mí',
        proyectos: 'Proyectos',
        skills: 'Habilidades',
        contacto: 'Contacto',
      },
      header: {
        title: 'Full Stack Web Developer',
        subtitle: 'Hola, me llamo Gabriel Esteban Guevara.',
        desc: 'Bienvenido a mi portfolio, un espacio para conocer un poco sobre las herramientas y las tecnologías que manejo.'
      },
      footer: '© 2025 Gabriel Esteban Guevara',
      sobreMi: {
        title: 'Sobre mí',
        desc: 'Me entusiasma asumir nuevos desafíos que impulsen mi crecimiento profesional. Disfruto trabajar en equipo, aportar ideas creativas y desarrollar soluciones eficientes que combinen funcionalidad y buen diseño. Mi objetivo es fortalecer mis habilidades técnicas y mantenerme actualizado con las tecnologías más relevantes para cada proyecto.'
      },
      proyectos: {
        title: 'Proyectos',
        cardTitle: 'Catálogo Web Profesional',
        cardDesc: 'Desarrollo integral de una plataforma web para catálogo de productos, optimizada para alto rendimiento y posicionamiento SEO. El proyecto incluyó el diseño UI/UX, adquisición y configuración de dominio y hosting, implementación de base de datos, desarrollo backend y frontend, y puesta en producción.',
        rolLabel: 'Rol:',
        rol: 'Full Stack Developer',
        respLabel: 'Responsabilidades:',
        resp: 'Diseño, desarrollo, arquitectura, compra de dominio y hosting, configuración de base de datos, optimización SEO, despliegue y mantenimiento.',
        btn: 'Ver Proyecto'
      },
      contacto: {
        title: 'Contacto',
        labelEmail: 'Email',
        labelSubject: 'Asunto',
        labelMessage: 'Mensaje',
        btn: 'Enviar',
        socialLabel: 'O podes encontrarme en:',
        phEmail: 'tu@email.com',
        phSubject: 'Asunto del mensaje',
        phMessage: 'Mensaje...'
      }
    },
    en: {
      nav: {
        sobreMi: 'About Me',
        proyectos: 'Projects',
        skills: 'Skills',
        contacto: 'Contact',
      },
      header: {
        title: 'Full Stack Web Developer',
        subtitle: "Hi, I'm Gabriel Esteban Guevara.",
        desc: 'Welcome to my portfolio, a space to discover the tools and technologies I use.'
      },
      footer: '© 2025 Gabriel Esteban Guevara',
      sobreMi: {
        title: 'About Me',
        desc: 'I am passionate about taking on new challenges that drive my professional growth. I enjoy teamwork, contributing creative ideas, and developing efficient solutions that combine functionality and good design. My goal is to strengthen my technical skills and stay up-to-date with the most relevant technologies for each project.'
      },
      proyectos: {
        title: 'Projects',
        cardTitle: 'Professional Web Catalog',
        cardDesc: 'Comprehensive development of a web platform for product catalog, optimized for high performance and SEO. The project included UI/UX design, domain and hosting setup, database implementation, backend and frontend development, and deployment.',
        rolLabel: 'Role:',
        rol: 'Full Stack Developer',
        respLabel: 'Responsibilities:',
        resp: 'Design, development, architecture, domain and hosting purchase, database setup, SEO optimization, deployment and maintenance.',
        btn: 'View Project'
      },
      contacto: {
        title: 'Contact',
        labelEmail: 'Email',
        labelSubject: 'Subject',
        labelMessage: 'Message',
        btn: 'Send',
        socialLabel: 'Or you can find me at:',
        phEmail: 'your@email.com',
        phSubject: 'Message subject',
        phMessage: 'Message...'
      }
    }
  };

  setLang(lang: 'es' | 'en') {
    const t = this.translations[lang];
  const ids = {
      'nav-sobre-mi': t.nav.sobreMi,
      'nav-proyectos': t.nav.proyectos,
      'nav-skills': t.nav.skills,
      'nav-contacto': t.nav.contacto,
      'header-title': t.header.title,
      'header-subtitle': t.header.subtitle,
      'header-desc': t.header.desc,
      'footer-text': t.footer,
      'sobre-mi-title': t.sobreMi.title,
      'sobre-mi-desc': t.sobreMi.desc,
      'proyectos-title': t.proyectos.title,
      'proyecto-card-title': t.proyectos.cardTitle,
      'proyecto-card-desc': t.proyectos.cardDesc,
      'proyecto-card-rol-label': t.proyectos.rolLabel,
      'proyecto-card-rol': t.proyectos.rol,
      'proyecto-card-resp-label': t.proyectos.respLabel,
      'proyecto-card-resp': t.proyectos.resp,
      'proyecto-card-btn': t.proyectos.btn,
      'contacto-title': t.contacto.title,
      'contacto-label-email': t.contacto.labelEmail,
      'contacto-label-subject': t.contacto.labelSubject,
      'contacto-label-message': t.contacto.labelMessage,
      'contacto-btn': t.contacto.btn,
  'contacto-social-label': t.contacto.socialLabel,
  'skills-title': t.nav.skills,
    };

    for (const id in ids) {
      const el = document.getElementById(id);
      if (el) el.textContent = ids[id as keyof typeof ids] as string;
    }

    // Mostrar/ocultar botón de CV según idioma
    const cvBtnEs = document.getElementById('cv-btn-es');
    const cvBtnEn = document.getElementById('cv-btn-en');
    if (cvBtnEs && cvBtnEn) {
      if (lang === 'es') {
        cvBtnEs.style.display = '';
        cvBtnEn.style.display = 'none';
      } else {
        cvBtnEs.style.display = 'none';
        cvBtnEn.style.display = '';
      }
    }

    const phs = {
      'contacto-ph-email': t.contacto.phEmail,
      'contacto-ph-subject': t.contacto.phSubject,
      'contacto-ph-message': t.contacto.phMessage,
    };
    (Object.keys(phs) as Array<keyof typeof phs>).forEach(k => {
      const input = document.querySelector(`[data-ph="${k}"]`) as HTMLInputElement | HTMLTextAreaElement;
      if (input) input.placeholder = phs[k];
    });

    // Actualizar el texto del botón de cerrar modal
    const closeModalBtn = document.querySelector('.close-modal-btn') as HTMLButtonElement;
    if (closeModalBtn) closeModalBtn.textContent = lang === 'es' ? 'Cerrar' : 'Close';
  }

  ngAfterViewInit() {
  const nav = document.querySelector('nav') as HTMLElement;
  const navHeight = nav.offsetHeight + 20;
  const centerOffset = window.innerHeight / 4; // Ajusta este valor para centrar más o menos

    const langSelectModal = document.getElementById('lang-select-modal') as HTMLSelectElement;
    if (langSelectModal) {
      langSelectModal.addEventListener('change', () => this.setLang(langSelectModal.value as 'es' | 'en'));
      this.setLang(langSelectModal.value as 'es' | 'en');
    } else {
      this.setLang('es');
    }

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = (link as HTMLAnchorElement).getAttribute('href');
        if (!targetId) return;

        document.querySelectorAll('.proyecto-card.active, .sobre-mi-container.active, #app-contacto.active')
          .forEach(card => card.classList.remove('active'));

        if (targetId === '#app-proyectos') document.querySelector('.proyecto-card')?.classList.add('active');
        if (targetId === '#app-sobre-mi') document.querySelector('.sobre-mi-container')?.classList.add('active');
        if (targetId === '#app-contacto') document.querySelector('#app-contacto')?.classList.add('active');

        const targetEl = document.querySelector(targetId) as HTMLElement;
        if (!targetEl) return;

        const elementTop = targetEl.getBoundingClientRect().top + window.scrollY;
        let scrollTo;
        if (targetId === '#app-sobre-mi') {
          scrollTo = elementTop - navHeight - centerOffset;
        } else if (targetId === '#app-proyectos') {
          scrollTo = elementTop - navHeight; // Offset menor para que quede más arriba
        } else if (targetId === '#app-skills') {
          scrollTo = elementTop - navHeight;
        } else if (targetId === '#app-contacto') {
          scrollTo = elementTop - navHeight;
        }
        window.scrollTo({ top: scrollTo, behavior: 'smooth' });
        this.closeMenu();
      });
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    const menu = document.querySelector('.nav-links');
    const burger = document.querySelector('.hamburger');
    menu?.classList.toggle('open', this.menuOpen);
    burger?.classList.toggle('active', this.menuOpen);
  }

  closeMenu() {
    this.menuOpen = false;
    document.querySelector('.nav-links')?.classList.remove('open');
    document.querySelector('.hamburger')?.classList.remove('active');
  }

  changeLang(event: Event) {
    const lang = (event.target as HTMLSelectElement).value as 'es' | 'en';
    // se maneja en ngAfterViewInit con setLang
  }
}
