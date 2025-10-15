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

    // Traducciones
    const translations = {
      es: {
        nav: {
          sobreMi: 'Sobre mí',
          proyectos: 'Proyectos',
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

    // Cambiar idioma
    const langSelect = document.getElementById('lang-select') as HTMLSelectElement;
    function setLang(lang: 'es' | 'en') {
      document.getElementById('nav-sobre-mi')!.textContent = translations[lang].nav.sobreMi;
      document.getElementById('nav-proyectos')!.textContent = translations[lang].nav.proyectos;
      document.getElementById('nav-contacto')!.textContent = translations[lang].nav.contacto;
      document.getElementById('header-title')!.textContent = translations[lang].header.title;
      document.getElementById('header-subtitle')!.textContent = translations[lang].header.subtitle;
      document.getElementById('header-desc')!.textContent = translations[lang].header.desc;
      document.getElementById('footer-text')!.textContent = translations[lang].footer;
      // Sobre mí
      const sobreMiTitle = document.getElementById('sobre-mi-title');
      if (sobreMiTitle) sobreMiTitle.textContent = translations[lang].sobreMi.title;
      const sobreMiDesc = document.getElementById('sobre-mi-desc');
      if (sobreMiDesc) sobreMiDesc.textContent = translations[lang].sobreMi.desc;
      // Proyectos
      const proyectosTitle = document.getElementById('proyectos-title');
      if (proyectosTitle) proyectosTitle.textContent = translations[lang].proyectos.title;
      const cardTitle = document.getElementById('proyecto-card-title');
      if (cardTitle) cardTitle.textContent = translations[lang].proyectos.cardTitle;
      const cardDesc = document.getElementById('proyecto-card-desc');
      if (cardDesc) cardDesc.textContent = translations[lang].proyectos.cardDesc;
      const cardRolLabel = document.getElementById('proyecto-card-rol-label');
      if (cardRolLabel) cardRolLabel.textContent = translations[lang].proyectos.rolLabel;
      const cardRol = document.getElementById('proyecto-card-rol');
      if (cardRol) cardRol.textContent = translations[lang].proyectos.rol;
      const cardRespLabel = document.getElementById('proyecto-card-resp-label');
      if (cardRespLabel) cardRespLabel.textContent = translations[lang].proyectos.respLabel;
      const cardResp = document.getElementById('proyecto-card-resp');
      if (cardResp) cardResp.textContent = translations[lang].proyectos.resp;
      const cardBtn = document.getElementById('proyecto-card-btn');
      if (cardBtn) cardBtn.textContent = translations[lang].proyectos.btn;
      // Contacto
      const contactoTitle = document.getElementById('contacto-title');
      if (contactoTitle) contactoTitle.textContent = translations[lang].contacto.title;
      const contactoLabelEmail = document.getElementById('contacto-label-email');
      if (contactoLabelEmail) contactoLabelEmail.textContent = translations[lang].contacto.labelEmail;
      const contactoLabelSubject = document.getElementById('contacto-label-subject');
      if (contactoLabelSubject) contactoLabelSubject.textContent = translations[lang].contacto.labelSubject;
      const contactoLabelMessage = document.getElementById('contacto-label-message');
      if (contactoLabelMessage) contactoLabelMessage.textContent = translations[lang].contacto.labelMessage;
  const contactoBtn = document.getElementById('contacto-btn');
  if (contactoBtn) contactoBtn.textContent = translations[lang].contacto.btn;
  const contactoSocialLabel = document.getElementById('contacto-social-label');
  if (contactoSocialLabel) contactoSocialLabel.textContent = translations[lang].contacto.socialLabel;
  // Placeholders
  const contactoPhEmail = document.querySelector('[data-ph="contacto-ph-email"]') as HTMLInputElement;
  if (contactoPhEmail) contactoPhEmail.placeholder = translations[lang].contacto.phEmail;
  const contactoPhSubject = document.querySelector('[data-ph="contacto-ph-subject"]') as HTMLInputElement;
  if (contactoPhSubject) contactoPhSubject.placeholder = translations[lang].contacto.phSubject;
  const contactoPhMessage = document.querySelector('[data-ph="contacto-ph-message"]') as HTMLTextAreaElement;
  if (contactoPhMessage) contactoPhMessage.placeholder = translations[lang].contacto.phMessage;
    }
    langSelect.addEventListener('change', () => {
      setLang(langSelect.value as 'es' | 'en');
    });
    setLang('es'); // idioma por defecto

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = (link as HTMLAnchorElement).getAttribute('href');
        if (!targetId) return;

        // Remover 'active' de todas las cards principales
        document.querySelectorAll('.proyecto-card.active, .sobre-mi-container.active, #app-contacto.active').forEach(card => {
          card.classList.remove('active');
        });

        // Activar la card correspondiente según la sección
        if (targetId === '#app-proyectos') {
          const card = document.querySelector('.proyecto-card');
          if (card) card.classList.add('active');
        }
        if (targetId === '#app-sobre-mi') {
          const card = document.querySelector('.sobre-mi-container');
          if (card) card.classList.add('active');
        }
        if (targetId === '#app-contacto') {
          const card = document.querySelector('#app-contacto');
          if (card) card.classList.add('active');
        }

        const targetEl = document.querySelector(targetId) as HTMLElement;
        if (!targetEl) return;

        const elementTop = targetEl.getBoundingClientRect().top + window.scrollY;
        const scrollTo = elementTop - navHeight;

        window.scrollTo({ top: scrollTo, behavior: 'smooth' });
      });
    });
  }
}