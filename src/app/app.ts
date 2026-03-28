import { Component, signal, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { SobreMi } from "./sobre-mi/sobre-mi";
import { Proyectos } from "./proyectos/proyectos";
import { Contacto } from "./contacto/contacto";
import { Skills } from "./skills/skills";

@Component({
  selector: 'app-root',
  imports: [CommonModule, SobreMi, Proyectos, Skills, Contacto],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements AfterViewInit {
  protected readonly title = signal('portafolio');
  menuOpen = false;

  lang: 'es' | 'en' = 'es';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  toggleLang(): void {
    this.lang = this.lang === 'es' ? 'en' : 'es';
    this.setLang(this.lang);
    if (isPlatformBrowser(this.platformId)) {
      if ((window as any).setLang) {
        (window as any).setLang(this.lang);
      }
      if ((window as any).setLangContacto) {
        (window as any).setLangContacto(this.lang);
      }
    }
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
        title: 'Gabriel Esteban Guevara',
        subtitle: 'Hola, me llamo',
        subtitle2: 'a',
        desc: 'Bienvenido a mi portfolio, un espacio para conocer un poco sobre las herramientas y las tecnologías que manejo.'
      },
      footer: '© 2026 Gabriel Esteban Guevara',
      sobreMi: {
        title: 'Sobre mí',
        desc: 'Me entusiasma asumir nuevos desafíos que impulsen mi crecimiento profesional. Disfruto trabajar en equipo, aportar ideas creativas y desarrollar soluciones eficientes que combinen funcionalidad y buen diseño. Mi objetivo es fortalecer mis habilidades técnicas y mantenerme actualizado con las tecnologías más relevantes para cada proyecto.'
      },
      skills: {
        php: 'PHP',
        html: 'HTML5',
        css: 'CSS',
        mysql: 'MySql',
        restApi: 'API REST',
        vue: 'Vue.js',
        dotnet: '.NET',
        csharp: 'C#',
        js: 'JavaScript',
        sqlserver: 'SQL Server',
        seo: 'SEO',
        uiux: 'UI/UX',
        angular: 'Angular',
        react: 'React',
        three: 'Three.js',
        fiber: 'React Three Fiber',
        vite: 'Vite',
        netlify: 'Netlify',
        docker: 'Docker',
        mariadb: 'MariaDB',
        codeigniter: 'Codeigniter',
        node: 'Node.js',
        express: 'Express',
        groq: 'Groq API',
        openai: 'OpenAI API',
        gemini: 'Google Gemini API',
        multer: 'Multer',
        pdfparse: 'pdf-parse',
        render: 'Render',
        git: 'Git',
        backendSecurity: 'Seguridad backend'
      },
      proyectos: {
        title: 'Proyectos',
        cardTitle: 'Catálogo Web Profesional',
        cardDesc: 'Desarrollo integral de una plataforma web para catálogo de productos, optimizada para alto rendimiento y posicionamiento SEO. El proyecto incluyó el diseño UI/UX, adquisición y configuración de dominio y hosting, implementación de base de datos, desarrollo backend y frontend, y puesta en producción.',
        rolLabel: 'Rol: ',
        rol: 'Desarrollador Web Full Stack',
        respLabel: 'Responsabilidades: ',
        resp: 'Diseño, desarrollo, arquitectura, compra de dominio y hosting, configuración de base de datos, optimización SEO, despliegue y mantenimiento.',
        btn: 'Ver Proyecto',
        cardTitle2: 'Sistema Solar Interactivo',
        cardDesc2: 'Simulación interactiva en 3D del sistema solar con animaciones realistas, texturas de alta calidad generadas con IA y controles intuitivos. Los usuarios pueden explorar planetas, modificar la velocidad de rotación y órbita, y obtener información detallada de cada cuerpo celeste.',
        rol2: 'Frontend Developer & 3D Artist',
        resp2: 'Desarrollo 3D, generación de texturas con IA, optimización de rendimiento, diseño de interfaz, animaciones y despliegue.',
        btn2: 'Ver Proyecto',
        btnGithub2: 'Ver Código',
        cardTitle3: 'Landing Page Autogestionable',
        cardDesc3: 'Sitio web moderno para hamburguesería con sistema de gestión de pedidos y menú interactivo. Implementación de base de datos en tiempo real, optimización SEO avanzada y diseño responsivo para ofrecer una experiencia de usuario fluida en todos los dispositivos.',
        rol3: 'Desarrollador Web Full Stack',
        resp3: 'Desarrollo frontend y backend, integración con Supabase, optimización SEO, diseño responsive y despliegue en Netlify.',
        btn3: 'Ver Proyecto',
        cardTitle4: 'Moon Pixel - Landing Page Profesional',
        cardDesc4: 'Desarrollo completo de landing page multipágina con 7 secciones interactivas. Implementación de diseño responsive mobile-first, animaciones on-scroll con Intersection Observer API, formulario de contacto integrado con Netlify Forms y protección anti-spam, junto con optimización SEO avanzada y efectos parallax.',
        rol4: 'Desarrollador Web Full Stack',
        resp4: 'Desarrollo de landing page multipágina, diseño responsive mobile-first, animaciones on-scroll con Intersection Observer, integración de formularios Netlify con anti-spam, optimización SEO, efectos parallax, integración WhatsApp Business API y despliegue en Netlify.',
        btn4: 'Ver Proyecto',
        cardTitle5: 'Portfolio 3D',
        cardDesc5: 'Landing page de mi portfolio de proyectos 3D, enfocada en una presentación visual clara del trabajo, navegación simple y despliegue optimizado para web.',
        rol5: 'Frontend Developer & 3D Artist',
        resp5: 'Diseño y desarrollo de la landing page, estructura de contenido, optimización visual y despliegue en Netlify.',
        btn5: 'Ver Proyecto',
        cardTitle6: 'Gestoria Integral',
        cardDesc6: 'Sitio web profesional para Gestoria Integral, desarrollado desde cero con enfoque en claridad de servicios, presencia digital y experiencia de usuario responsive.',
        rol6: 'Desarrollador Web Full Stack',
        resp6: 'Diseño, desarrollo frontend y backend, estructura completa del sitio, implementación visual, optimización y despliegue.',
        btn6: 'Ver Proyecto',
        cardTitle7: 'QuizZIA - Generador de Quiz con IA',
        cardDesc7: 'Desarrollo full-stack de plataforma educativa de quizzes con IA, con generación automática de preguntas por tema y niveles de dificultad, lógica de juego con vidas y progreso por etapas, explicaciones pedagógicas ante errores, carga de contenido desde PDF y arquitectura segura en backend con rate limiting, validación de inputs, token de acceso y protección anti prompt-injection. Integración de múltiples proveedores LLM (Groq, OpenAI y Gemini), cache en memoria para optimización de costo/rendimiento y despliegue cloud de frontend y API.',
        rol7: 'Full Stack Developer',
        resp7: 'Desarrollo de aplicación full-stack de quizzes con IA, implementación de UI en React con lógica de juego por niveles, construcción de API REST en Node.js/Express, integración de modelos LLM (Groq/OpenAI/Gemini), procesamiento de PDFs para generación de contenido, aplicación de seguridad backend (rate limit, token, validación y sanitización, anti prompt-injection), implementación de cache en memoria para optimización de costos, manejo de errores/reintentos y despliegue en Netlify + Render.',
        btn7: 'Ver Proyecto',
        btnGithub7: 'Ver Código'
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
        title: 'Gabriel Esteban Guevara',
        subtitle: "Hi, I'm",
        subtitle2: 'a',
        desc: 'Welcome to my portfolio, a space to discover the tools and technologies I use.'
      },
      footer: '© 2026 Gabriel Esteban Guevara',
      sobreMi: {
        title: 'About Me',
        desc: 'I am passionate about taking on new challenges that drive my professional growth. I enjoy teamwork, contributing creative ideas, and developing efficient solutions that combine functionality and good design. My goal is to strengthen my technical skills and stay up-to-date with the most relevant technologies for each project.'
      },
      skills: {
        php: 'PHP',
        html: 'HTML5',
        css: 'CSS',
        mysql: 'MySql',
        restApi: 'REST API',
        vue: 'Vue.js',
        dotnet: '.NET',
        csharp: 'C#',
        js: 'JavaScript',
        sqlserver: 'SQL Server',
        seo: 'SEO',
        uiux: 'UI/UX',
        angular: 'Angular',
        react: 'React',
        three: 'Three.js',
        fiber: 'React Three Fiber',
        vite: 'Vite',
        netlify: 'Netlify',
        docker: 'Docker',
        mariadb: 'MariaDB',
        codeigniter: 'Codeigniter',
        node: 'Node.js',
        express: 'Express',
        groq: 'Groq API',
        openai: 'OpenAI API',
        gemini: 'Google Gemini API',
        multer: 'Multer',
        pdfparse: 'pdf-parse',
        render: 'Render',
        git: 'Git',
        backendSecurity: 'Backend Security'
      },
      proyectos: {
        title: 'Projects',
        cardTitle: 'Professional Web Catalog',
        cardDesc: 'Comprehensive development of a web platform for product catalog, optimized for high performance and SEO. The project included UI/UX design, domain and hosting setup, database implementation, backend and frontend development, and deployment.',
        rolLabel: 'Role: ',
        rol: 'Full Stack Web Developer',
        respLabel: 'Responsibilities: ',
        resp: 'Design, development, architecture, domain and hosting purchase, database setup, SEO optimization, deployment and maintenance.',
        btn: 'View Project',
        cardTitle2: 'Interactive Solar System',
        cardDesc2: 'Interactive 3D simulation of the solar system with realistic animations, high-quality AI-generated textures, and intuitive controls. Users can explore planets, modify rotation and orbit speeds, and get detailed information about each celestial body.',
        rol2: 'Frontend Developer & 3D Artist',
        resp2: '3D development, AI texture generation, performance optimization, interface design, animations and deployment.',
        btn2: 'View Project',
        btnGithub2: 'View Code',
        cardTitle3: 'Self-Managed Landing Page',
        cardDesc3: 'Modern website for a burger restaurant with order management and an interactive menu. Includes real-time database implementation, advanced SEO optimization, and responsive design to deliver a smooth user experience across all devices.',
        rol3: 'Full Stack Web Developer',
        resp3: 'Frontend and backend development, Supabase integration, SEO optimization, responsive design, and Netlify deployment.',
        btn3: 'View Project',
        cardTitle4: 'Moon Pixel - Professional Landing Page',
        cardDesc4: 'Full development of a multi-page landing website with 7 interactive sections. Includes mobile-first responsive design, on-scroll animations with Intersection Observer API, contact form integration with Netlify Forms and anti-spam protection, plus advanced SEO optimization and parallax effects.',
        rol4: 'Full Stack Web Developer',
        resp4: 'Multi-page landing development, mobile-first responsive design, on-scroll animations with Intersection Observer, Netlify forms with anti-spam, SEO optimization, parallax effects, WhatsApp Business API integration, and Netlify deployment.',
        btn4: 'View Project',
        cardTitle5: '3D Portfolio',
        cardDesc5: 'Landing page for my 3D projects portfolio, focused on clear visual presentation, simple navigation, and web-optimized deployment.',
        rol5: 'Frontend Developer & 3D Artist',
        resp5: 'Landing page design and development, content structure, visual optimization, and Netlify deployment.',
        btn5: 'View Project',
        cardTitle6: 'Integrated Management',
        cardDesc6: 'Professional website for Integrated Management, built from scratch with a focus on service clarity, digital presence, and responsive user experience.',
        rol6: 'Full Stack Web Developer',
        resp6: 'Design, frontend and backend development, complete site structure, visual implementation, optimization, and deployment.',
        btn6: 'View Project',
        cardTitle7: 'QuizZIA - AI Quiz Generator',
        cardDesc7: 'Full-stack development of an AI-powered educational quiz platform, with automatic question generation by topic and difficulty levels, game logic with lives and stage progression, pedagogical explanations on mistakes, PDF content ingestion, and secure backend architecture with rate limiting, input validation, access token, and anti prompt-injection protection. Integration of multiple LLM providers (Groq, OpenAI, and Gemini), in-memory caching for cost/performance optimization, and cloud deployment of frontend and API.',
        rol7: 'Full Stack Web Developer',
        resp7: 'Full-stack AI quiz app development, React UI implementation with level-based game logic, Node.js/Express REST API construction, LLM model integration (Groq/OpenAI/Gemini), PDF processing for content generation, backend security implementation (rate limit, token, input validation and sanitization, anti prompt-injection), in-memory cache implementation for cost optimization, error/retry handling, and deployment on Netlify + Render.',
        btn7: 'View Project',
        btnGithub7: 'View Code'
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
    if (!isPlatformBrowser(this.platformId)) return;
    
    const t = this.translations[lang];
  const ids = {
      'nav-sobre-mi': t.nav.sobreMi,
      'nav-proyectos': t.nav.proyectos,
      'nav-skills': t.nav.skills,
      'nav-contacto': t.nav.contacto,
      'header-title': t.header.title,
      'header-subtitle': t.header.subtitle,
      'header-subtitle2': t.header.subtitle2,
      'header-desc': t.header.desc,
      'footer-text': t.footer,
      'sobre-mi-title': t.sobreMi.title,
      'sobre-mi-desc': t.sobreMi.desc,
      'skill-php': t.skills.php,
      'skill-html': t.skills.html,
      'skill-css': t.skills.css,
      'skill-mysql': t.skills.mysql,
      'skill-rest-api': t.skills.restApi,
      'skill-vue': t.skills.vue,
      'skill-dotnet': t.skills.dotnet,
      'skill-csharp': t.skills.csharp,
      'skill-js': t.skills.js,
      'skill-sqlserver': t.skills.sqlserver,
      'skill-seo': t.skills.seo,
      'skill-uiux': t.skills.uiux,
      'skill-angular': t.skills.angular,
      'skill-react': t.skills.react,
      'skill-three': t.skills.three,
      'skill-fiber': t.skills.fiber,
      'skill-vite': t.skills.vite,
      'skill-netlify': t.skills.netlify,
      'skill-docker': t.skills.docker,
      'skill-mariadb': t.skills.mariadb,
      'skill-codeigniter': t.skills.codeigniter,
      'skill-node': t.skills.node,
      'skill-express': t.skills.express,
      'skill-groq': t.skills.groq,
      'skill-openai': t.skills.openai,
      'skill-gemini': t.skills.gemini,
      'skill-multer': t.skills.multer,
      'skill-pdfparse': t.skills.pdfparse,
      'skill-render': t.skills.render,
      'skill-git': t.skills.git,
      'skill-backend-security': t.skills.backendSecurity,
      'proyectos-title': t.proyectos.title,
      'proyecto-card-title': t.proyectos.cardTitle,
      'proyecto-card-desc': t.proyectos.cardDesc,
      'proyecto-card-rol-label': t.proyectos.rolLabel,
      'proyecto-card-rol': t.proyectos.rol,
      'proyecto-card-resp-label': t.proyectos.respLabel,
      'proyecto-card-resp': t.proyectos.resp,
      'proyecto-card-btn': t.proyectos.btn,
      'proyecto-card-title-2': t.proyectos.cardTitle2,
      'proyecto-card-desc-2': t.proyectos.cardDesc2,
      'proyecto-card-rol-label-2': t.proyectos.rolLabel,
      'proyecto-card-rol-2': t.proyectos.rol2,
      'proyecto-card-resp-label-2': t.proyectos.respLabel,
      'proyecto-card-resp-2': t.proyectos.resp2,
      'proyecto-card-btn-2': t.proyectos.btn2,
      'proyecto-github-btn-2': t.proyectos.btnGithub2,
      'proyecto-card-title-3': t.proyectos.cardTitle3,
      'proyecto-card-desc-3': t.proyectos.cardDesc3,
      'proyecto-card-rol-label-3': t.proyectos.rolLabel,
      'proyecto-card-rol-3': t.proyectos.rol3,
      'proyecto-card-resp-label-3': t.proyectos.respLabel,
      'proyecto-card-resp-3': t.proyectos.resp3,
      'proyecto-card-btn-3': t.proyectos.btn3,
      'proyecto-card-title-4': t.proyectos.cardTitle4,
      'proyecto-card-desc-4': t.proyectos.cardDesc4,
      'proyecto-card-rol-label-4': t.proyectos.rolLabel,
      'proyecto-card-rol-4': t.proyectos.rol4,
      'proyecto-card-resp-label-4': t.proyectos.respLabel,
      'proyecto-card-resp-4': t.proyectos.resp4,
      'proyecto-card-btn-4': t.proyectos.btn4,
      'proyecto-card-title-5': t.proyectos.cardTitle5,
      'proyecto-card-desc-5': t.proyectos.cardDesc5,
      'proyecto-card-rol-label-5': t.proyectos.rolLabel,
      'proyecto-card-rol-5': t.proyectos.rol5,
      'proyecto-card-resp-label-5': t.proyectos.respLabel,
      'proyecto-card-resp-5': t.proyectos.resp5,
      'proyecto-card-btn-5': t.proyectos.btn5,
      'proyecto-card-title-6': t.proyectos.cardTitle6,
      'proyecto-card-desc-6': t.proyectos.cardDesc6,
      'proyecto-card-rol-label-6': t.proyectos.rolLabel,
      'proyecto-card-rol-6': t.proyectos.rol6,
      'proyecto-card-resp-label-6': t.proyectos.respLabel,
      'proyecto-card-resp-6': t.proyectos.resp6,
      'proyecto-card-btn-6': t.proyectos.btn6,
      'proyecto-card-title-7': t.proyectos.cardTitle7,
      'proyecto-card-desc-7': t.proyectos.cardDesc7,
      'proyecto-card-rol-label-7': t.proyectos.rolLabel,
      'proyecto-card-rol-7': t.proyectos.rol7,
      'proyecto-card-resp-label-7': t.proyectos.respLabel,
      'proyecto-card-resp-7': t.proyectos.resp7,
      'proyecto-card-btn-7': t.proyectos.btn7,
      'proyecto-github-btn-7': t.proyectos.btnGithub7,
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
    if (!isPlatformBrowser(this.platformId)) return;
    
  const nav = document.querySelector('nav') as HTMLElement;
  const navHeight = nav.offsetHeight + 20;

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
        const scrollTo = Math.max(0, elementTop - navHeight + 8);
        window.scrollTo({ top: scrollTo, behavior: 'smooth' });
        this.closeMenu();
      });
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    const menu = document.querySelector('.nav-links');
    menu?.classList.toggle('open', this.menuOpen);
  }

  closeMenu() {
    this.menuOpen = false;
    document.querySelector('.nav-links')?.classList.remove('open');
  }

  changeLang(event: Event) {
    const lang = (event.target as HTMLSelectElement).value as 'es' | 'en';
    // se maneja en ngAfterViewInit con setLang
  }
}
