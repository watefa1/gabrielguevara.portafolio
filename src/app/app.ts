import { Component, signal, AfterViewInit, Inject, PLATFORM_ID } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { isPlatformBrowser } from "@angular/common";
import { SobreMi } from "./sobre-mi/sobre-mi";
import { Proyectos } from "./proyectos/proyectos";
import { Contacto } from "./contacto/contacto";
import { Skills } from "./skills/skills";
import { ChatbotComponent } from "./chatbot/chatbot";

@Component({
    selector: "app-root",
    imports: [CommonModule, FormsModule, SobreMi, Proyectos, Skills, Contacto, ChatbotComponent],
    templateUrl: "./app.html",
    styleUrls: ["./app.css"]
})
export class App implements AfterViewInit {
    protected readonly title = signal("portafolio");
    menuOpen = false;

    lang: "es" | "en" = "es";

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        if (isPlatformBrowser(this.platformId)) {
            const browserLang = navigator.language.split("-")[0];
            this.lang = browserLang === "es" ? "es" : "en";
        }
    }

    toggleLang(): void {
        this.lang = this.lang === "es" ? "en" : "es";
        this.setLang(this.lang);
        if (isPlatformBrowser(this.platformId)) {
            if ((window as any).setLang) {
                (window as any).setLang(this.lang);
            }
        }
    }

    private lastFocusedElement: HTMLElement | null = null;
    private focusableMenuSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

    private updateActiveNavLink(): void {
        const hash = window.location.hash || '#app-sobre-mi';
        document.querySelectorAll('.nav-link').forEach((link) => {
            const anchor = link as HTMLElement;
            const active = anchor.getAttribute('href') === hash;
            anchor.classList.toggle('is-active', active);
        });
    }

    private trapFocus(event: KeyboardEvent): void {
        if (!this.menuOpen || event.key !== 'Tab') return;
        const menu = document.querySelector('.nav-links');
        if (!(menu instanceof HTMLElement)) return;

        const focusable = Array.from(menu.querySelectorAll(this.focusableMenuSelector)).filter(
            (item) => !((item as HTMLElement).hasAttribute('disabled'))
        ) as HTMLElement[];

        if (focusable.length === 0) {
            event.preventDefault();
            return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }


    translations = {
        es: {
            nav: {
                sobreMi: "Sobre mí",
                proyectos: "Proyectos",
                experiencia: "Experiencia",
                skills: "Habilidades",
                contacto: "Contacto",
            },
            header: {
                title: "Gabriel Guevara",
                subtitle: "Hola, soy",
                subtitle2: "a",
                desc: "Desarrollador Full Stack con más de 4 años llevando sistemas a producción: en Alephoo trabajo con PHP, Go y Angular sobre AWS, y manejo integraciones de IA aplicada al producto. También fundé Moon Pixel, mi emprendimiento de desarrollo web."
            },
            hero: {
                chip1: "Full Stack en Alephoo"
            },
            footer: "© 2026 Gabriel Esteban Guevara",
            sobreMi: {
                title: "Sobre mí",
                desc: "Me entusiasma asumir nuevos desafíos que impulsen mi crecimiento profesional. Disfruto trabajar en equipo, aportar ideas creativas y desarrollar soluciones eficientes que combinen funcionalidad y buen diseño. Mi objetivo es fortalecer mis habilidades técnicas y mantenerme actualizado con las tecnologías más relevantes para cada proyecto."
            },
            skills: {
                php: "PHP",
                html: "HTML5",
                css: "CSS",
                mysql: "MySQL",
                restApi: "API REST",
                vue: "Vue.js",
                dotnet: ".NET",
                csharp: "C#",
                js: "JavaScript",
                sqlserver: "SQL Server",
                seo: "SEO",
                uiux: "UI/UX",
                angular: "Angular",
                react: "React",
                three: "Three.js",
                fiber: "React Three Fiber",
                vite: "Vite",
                netlify: "Netlify",
                docker: "Docker",
                mariadb: "MariaDB",
                codeigniter: "Codeigniter",
                node: "Node.js",
                express: "Express",
                groq: "Groq API",
                openai: "OpenAI API",
                gemini: "Google Gemini API",
                multer: "Multer",
                pdfparse: "pdf-parse",
                render: "Render",
                git: "Git",
                backendSecurity: "Seguridad backend"
            },
            proyectos: {
                title: "Proyectos",
                cardTitle: "Catálogo Web Profesional",
                cardDesc: "Desarrollo integral de una plataforma web para catálogo de productos, optimizada para alto rendimiento y posicionamiento SEO. El proyecto incluyó el diseño UI/UX, adquisición y configuración de dominio y hosting, implementación de base de datos, desarrollo backend y frontend, y puesta en producción.",
                btn: "Ver sitio en vivo",
                cardTitle2: "Sistema Solar Interactivo",
                cardDesc2: "Simulación interactiva en 3D del sistema solar con animaciones realistas, texturas de alta calidad generadas con IA y controles intuitivos. Los usuarios pueden explorar planetas, modificar la velocidad de rotación y órbita, y obtener información detallada de cada cuerpo celeste.",
                btn2: "Ver Proyecto",
                btnGithub2: "Ver Código",
                cardTitle3: "Landing Page Autogestionable",
                cardDesc3: "Sitio web moderno para hamburguesería con sistema de gestión de pedidos y menú interactivo. Implementación de base de datos en tiempo real, optimización SEO avanzada y diseño responsivo para ofrecer una experiencia de usuario fluida en todos los dispositivos.",
                btn3: "Ver sitio en vivo",
                cardTitle4: "Moon Pixel - Landing Page Profesional",
                cardDesc4: "Desarrollo completo de landing page multipágina con 7 secciones interactivas. Implementación de diseño responsive mobile-first, animaciones on-scroll con Intersection Observer API, formulario de contacto integrado con Netlify Forms y protección anti-spam, junto con optimización SEO avanzada y efectos parallax.",
                btn4: "Ver sitio en vivo",
                cardTitle5: "Portfolio 3D",
                cardDesc5: "Landing page de mi portfolio de proyectos 3D, enfocada en una presentación visual clara del trabajo, navegación simple y despliegue optimizado para web.",
                btn5: "Ver Proyecto",
                cardTitle6: "Gestoria Integral",
                cardDesc6: "Sitio web profesional para Gestoria Integral, desarrollado desde cero con enfoque en claridad de servicios, presencia digital y experiencia de usuario responsive.",
                btn6: "Ver sitio en vivo",
                cardTitle7: "QuizZIA - Generador de Quiz con IA",
                cardDesc7: "Desarrollo full-stack de plataforma educativa de quizzes con IA, con generación automática de preguntas por tema y niveles de dificultad, lógica de juego con vidas y progreso por etapas, explicaciones pedagógicas ante errores, carga de contenido desde PDF y arquitectura segura en backend con rate limiting, validación de inputs, token de acceso y protección anti prompt-injection. Integración de múltiples proveedores LLM (Groq, OpenAI y Gemini), cache en memoria para optimización de costo/rendimiento y despliegue cloud de frontend y API.",
                btn7: "Ver Proyecto",
                cardTitle8: "Gestión Mascotas — SaaS Veterinaria",
                cardDesc8: "Plataforma multi-tenant para la gestión integral de clínicas veterinarias: pacientes, turnos e historias clínicas. Arquitectura propia, infraestructura y despliegue productivo. En desarrollo activo.",
                btnGithub7: "Ver Código"
            },
            contacto: {
                title: "¿Sumás un Full Stack a tu equipo?",
                labelEmail: "Email",
                labelSubject: "Asunto",
                labelMessage: "Mensaje",
                btn: "Enviar",
                socialLabel: "O podes encontrarme en:",
                phEmail: "tu@email.com",
                phSubject: "Asunto del mensaje",
                phMessage: "Mensaje..."
            },
            chatbot: {
                welcome: "Meow! Puedes hablar conmigo",
                initial: "Hola, soy Luna. Compañero gatuno de Gabriel. Puedes preguntarme lo que necesites saber de él",
                placeholder: "O puedes preguntar lo que quieras",
                suggestions: [
                    "¿Cuáles son los hobbies de Gabriel?",
                    "¿Qué tecnologías conoce Gabriel?",
                    "¿Quién es Luna?"
                ]
            }
        },
        en: {
            nav: {
                sobreMi: "About Me",
                proyectos: "Projects",
                experiencia: "Experience",
                skills: "Skills",
                contacto: "Contact",
            },
            header: {
                title: "Gabriel Guevara",
                subtitle: "Hi, I'm",
                subtitle2: "a",
                desc: "Full Stack developer with 4+ years taking systems to production: at Alephoo I work with PHP, Go and Angular on AWS, and I build applied-AI integrations. I also run Moon Pixel, my own web development business."
            },
            hero: {
                chip1: "Full Stack at Alephoo"
            },
            footer: "© 2026 Gabriel Esteban Guevara",
            sobreMi: {
                title: "About Me",
                desc: "I am passionate about taking on new challenges that drive my professional growth. I enjoy teamwork, contributing creative ideas, and developing efficient solutions that combine functionality and good design. My goal is to strengthen my technical skills and stay up-to-date with the most relevant technologies for each project."
            },
            skills: {
                php: "PHP",
                html: "HTML5",
                css: "CSS",
                mysql: "MySQL",
                restApi: "REST API",
                vue: "Vue.js",
                dotnet: ".NET",
                csharp: "C#",
                js: "JavaScript",
                sqlserver: "SQL Server",
                seo: "SEO",
                uiux: "UI/UX",
                angular: "Angular",
                react: "React",
                three: "Three.js",
                fiber: "React Three Fiber",
                vite: "Vite",
                netlify: "Netlify",
                docker: "Docker",
                mariadb: "MariaDB",
                codeigniter: "Codeigniter",
                node: "Node.js",
                express: "Express",
                groq: "Groq API",
                openai: "OpenAI API",
                gemini: "Google Gemini API",
                multer: "Multer",
                pdfparse: "pdf-parse",
                render: "Render",
                git: "Git",
                backendSecurity: "Backend Security"
            },
            proyectos: {
                title: "Projects",
                cardTitle: "Professional Web Catalog",
                cardDesc: "Comprehensive development of a web platform for product catalog, optimized for high performance and SEO. The project included UI/UX design, domain and hosting setup, database implementation, backend and frontend development, and deployment.",
                btn: "Visit live site",
                cardTitle2: "Interactive Solar System",
                cardDesc2: "Interactive 3D simulation of the solar system with realistic animations, high-quality AI-generated textures, and intuitive controls. Users can explore planets, modify rotation and orbit speeds, and get detailed information about each celestial body.",
                btn2: "View Project",
                btnGithub2: "View Code",
                cardTitle3: "Self-Managed Landing Page",
                cardDesc3: "Modern website for a burger restaurant with order management and an interactive menu. Includes real-time database implementation, advanced SEO optimization, and responsive design to deliver a a smooth user experience across all devices.",
                btn3: "Visit live site",
                cardTitle4: "Moon Pixel - Professional Landing Page",
                cardDesc4: "Full development of a multi-page landing website with 7 interactive sections. Includes mobile-first responsive design, on-scroll animations with Intersection Observer API, contact form integration with Netlify Forms and anti-spam protection, plus advanced SEO optimization and parallax effects.",
                btn4: "Visit live site",
                cardTitle5: "3D Portfolio",
                cardDesc5: "Landing page for my 3D projects portfolio, focused on clear visual presentation, simple navigation, and web-optimized deployment.",
                btn5: "View Project",
                cardTitle6: "Integrated Management",
                cardDesc6: "Professional website for Integrated Management, built from scratch with a focus on service clarity, digital presence, and responsive user experience.",
                btn6: "Visit live site",
                cardTitle7: "QuizZIA - AI Quiz Generator",
                cardDesc7: "Full-stack development of an AI-powered educational quiz platform, with automatic question generation by topic and difficulty levels, game logic with lives and stage progression, pedagogical explanations on mistakes, PDF content ingestion, and secure backend architecture with rate limiting, input validation, access token, and anti prompt-injection protection. Integration of multiple LLM providers (Groq, OpenAI, and Gemini), in-memory caching for cost/performance optimization, and cloud deployment of frontend and API.",
                btn7: "View Project",
                cardTitle8: "Pet Management — Veterinary SaaS",
                cardDesc8: "Multi-tenant platform for full veterinary clinic management: patients, appointments and clinical records. Custom architecture, infrastructure and production deployment. In active development.",
                btnGithub7: "View Code"
            },
            contacto: {
                title: "Looking to add a Full Stack dev to your team?",
                labelEmail: "Email",
                labelSubject: "Subject",
                labelMessage: "Message",
                btn: "Send",
                socialLabel: "Or you can find me at:",
                phEmail: "your@email.com",
                phSubject: "Message subject",
                phMessage: "Message..."
            },
            chatbot: {
                welcome: "You can talk to me, meow",
                initial: "Hi, I'm Luna, Gabriel's feline companion. You can ask me anything you need to know about him",
                placeholder: "Or you can ask whatever you want",
                suggestions: [
                    "What are Gabriel's hobbies?",
                    "What technologies does Gabriel know?",
                    "Who is Luna?"
                ]
            }
        }
    };

    setLang(lang: "es" | "en") {
        if (!isPlatformBrowser(this.platformId)) return;
        this.lang = lang;
        document.documentElement.lang = lang;
        (window as any).lang = lang;
        (window as any).setLang = (nextLang: "es" | "en") => {
            this.lang = nextLang;
            this.setLang(nextLang);
        };
        
        const t = this.translations[lang];
    const ids = {
            "nav-sobre-mi": t.nav.sobreMi,
            "nav-proyectos": t.nav.proyectos,
            "nav-experiencia": t.nav.experiencia,
            "nav-skills": t.nav.skills,
            "nav-contacto": t.nav.contacto,
            "header-title": t.header.title,
            "header-subtitle": t.header.subtitle,
            "header-desc": t.header.desc,
            "footer-text": t.footer,
            "sobre-mi-title": t.sobreMi.title,
            "sobre-mi-desc": t.sobreMi.desc,
            "skill-php": t.skills.php,
            "skill-html": t.skills.html,
            "skill-css": t.skills.css,
            "skill-mysql": t.skills.mysql,
            "skill-rest-api": t.skills.restApi,
            "skill-vue": t.skills.vue,
            "skill-dotnet": t.skills.dotnet,
            "skill-js": t.skills.js,
            "skill-sqlserver": t.skills.sqlserver,
            "skill-seo": t.skills.seo,
            "skill-uiux": t.skills.uiux,
            "skill-angular": t.skills.angular,
            "skill-three": t.skills.three,
            "skill-vite": t.skills.vite,
            "skill-netlify": t.skills.netlify,
            "skill-docker": t.skills.docker,
            "skill-mariadb": t.skills.mariadb,
            "skill-codeigniter": t.skills.codeigniter,
            "skill-node": t.skills.node,
            "skill-express": t.skills.express,
            "skill-git": t.skills.git,
            "skill-backend-security": t.skills.backendSecurity,
            "proyectos-title": t.proyectos.title,
            "proyecto-card-title": t.proyectos.cardTitle,
            "proyecto-card-desc": t.proyectos.cardDesc,
            "proyecto-card-btn": t.proyectos.btn,
            "proyecto-card-title-2": t.proyectos.cardTitle2,
            "proyecto-card-desc-2": t.proyectos.cardDesc2,
            "proyecto-card-btn-2": t.proyectos.btn2,
            "proyecto-github-btn-2": t.proyectos.btnGithub2,
            "proyecto-card-title-3": t.proyectos.cardTitle3,
            "proyecto-card-desc-3": t.proyectos.cardDesc3,
            "proyecto-card-btn-3": t.proyectos.btn3,
            "proyecto-card-title-4": t.proyectos.cardTitle4,
            "proyecto-card-desc-4": t.proyectos.cardDesc4,
            "proyecto-card-btn-4": t.proyectos.btn4,
            "proyecto-card-title-5": t.proyectos.cardTitle5,
            "proyecto-card-desc-5": t.proyectos.cardDesc5,
            "proyecto-card-btn-5": t.proyectos.btn5,
            "proyecto-card-title-6": t.proyectos.cardTitle6,
            "proyecto-card-desc-6": t.proyectos.cardDesc6,
            "proyecto-card-btn-6": t.proyectos.btn6,
            "proyecto-card-title-7": t.proyectos.cardTitle7,
            "proyecto-card-desc-7": t.proyectos.cardDesc7,
            "proyecto-card-btn-7": t.proyectos.btn7,
            "proyecto-github-btn-7": t.proyectos.btnGithub7,
            "contacto-title": t.contacto.title,
            "contacto-label-email": t.contacto.labelEmail,
            "contacto-label-subject": t.contacto.labelSubject,
            "contacto-label-message": t.contacto.labelMessage,
            "contacto-btn": t.contacto.btn,
    "skills-title": t.nav.skills,
            "hero-chip-1": t.hero.chip1,
            "proyecto-card-title-8": t.proyectos.cardTitle8,
            "proyecto-card-desc-8": t.proyectos.cardDesc8,
        };

        for (const id in ids) {
            const el = document.getElementById(id);
            if (el) el.textContent = ids[id as keyof typeof ids] as string;
        }

        // Mostrar/ocultar botones de CV según idioma (nav + hero)
        const showEs = lang === "es";
        document.querySelectorAll<HTMLElement>(".cv-btn-es").forEach(el => (el.style.display = showEs ? "" : "none"));
        document.querySelectorAll<HTMLElement>(".cv-btn-en").forEach(el => (el.style.display = showEs ? "none" : ""));

        const phs = {
            "contacto-ph-email": t.contacto.phEmail,
            "contacto-ph-subject": t.contacto.phSubject,
            "contacto-ph-message": t.contacto.phMessage,
        };
        (Object.keys(phs) as Array<keyof typeof phs>).forEach(k => {
            const input = document.querySelector(`[data-ph="${k}"]`) as HTMLInputElement | HTMLTextAreaElement;
            if (input) input.placeholder = phs[k];
        });

        // Actualizar el texto del botón de cerrar modal
        const closeModalBtn = document.querySelector(".close-modal-btn") as HTMLButtonElement;
        if (closeModalBtn) closeModalBtn.textContent = lang === "es" ? "Cerrar" : "Close";
    }

    ngAfterViewInit() {
        if (!isPlatformBrowser(this.platformId)) return;
        this.setLang(this.lang);
        this.updateActiveNavLink();
        window.addEventListener('hashchange', () => this.updateActiveNavLink());

        const nav = document.querySelector("nav") as HTMLElement | null;
        const navHeight = nav ? nav.offsetHeight + 20 : 60;

        try {
            document.querySelectorAll(".nav-links a, .mobile-drawer-links a").forEach(link => {
                link.addEventListener("click", (e) => {
                    const targetId = (link as HTMLAnchorElement).getAttribute("href");
                    if (!targetId || !targetId.startsWith("#")) {
                        this.closeMenu();
                        return;
                    }
                    e.preventDefault();
                    const targetEl = document.querySelector(targetId) as HTMLElement | null;
                    if (!targetEl) return;
                    const elementTop = targetEl.getBoundingClientRect().top + window.scrollY;
                    const scrollTo = Math.max(0, elementTop - navHeight + 8);
                    window.scrollTo({ top: scrollTo, behavior: "smooth" });
                    this.closeMenu();
                });
            });
        } catch (err) {
            console.error("[app] link handlers FAILED", err);
        }

        this.registerShellObservers();

        document.addEventListener('keydown', this._onKeyDown);

        // Hidratación/re-render tardío puede revertir textos y observers registrados en
        // ngAfterViewInit: re-aplicar cuando el carga completo terminó. Idempotente.
        if (!this.shellLoadHook) {
            this.shellLoadHook = () => {
                this.setLang(this.lang);
                this.updateActiveNavLink();
                this.registerShellObservers();
            };
            window.addEventListener('load', this.shellLoadHook);
            setTimeout(this.shellLoadHook, 2000);
        }
    }

    private shellLoadHook: (() => void) | null = null;
    private shellObserver: IntersectionObserver | null = null;
    private revealObserver: IntersectionObserver | null = null;

    private registerShellObservers(): void {
        const spyTargets = ["app-sobre-mi", "app-proyectos", "app-experiencia", "app-skills", "app-contacto"]
            .map(id => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null);
        if (!this.shellObserver) {
            this.shellObserver = new IntersectionObserver((entries) => {
                const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                if (!visible) return;
                const id = "#" + visible.target.id;
                document.querySelectorAll('.nav-link').forEach((link) => {
                    const active = (link as HTMLAnchorElement).getAttribute('href') === id;
                    link.classList.toggle('is-active', active);
                });
            }, { rootMargin: "-35% 0px -55% 0px" });
        }
        spyTargets.forEach(el => this.shellObserver!.observe(el));

        if (!this.revealObserver) {
            this.revealObserver = new IntersectionObserver((entries) => entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in');
                    this.revealObserver!.unobserve(entry.target);
                }
            }), { threshold: 0.12 });
        }
        document.querySelectorAll('.reveal').forEach(el => {
            if (!el.classList.contains('in')) this.revealObserver!.observe(el);
        });
    }

    ngOnDestroy(): void {
        if (isPlatformBrowser(this.platformId)) {
            document.removeEventListener('keydown', this._onKeyDown);
        }
    }

    private _onKeyDown = (event: KeyboardEvent) => {
        if (this.menuOpen && event.key === 'Escape') {
            this.closeMenu();
            return;
        }

        this.trapFocus(event);
    };

    toggleMenu() {
        this.menuOpen = !this.menuOpen;
        const menu = document.querySelector('.mobile-drawer');
        const toggle = document.querySelector('.mobile-toggle');
        menu?.classList.toggle('open', this.menuOpen);
        toggle?.classList.toggle('open', this.menuOpen);
        document.body.classList.toggle('menu-open', this.menuOpen);
        document.querySelector('.mobile-overlay')?.classList.toggle('open', this.menuOpen);

        if (this.menuOpen) {
            this.lastFocusedElement = document.activeElement as HTMLElement | null;
            const firstFocusable = menu?.querySelector('a, button') as HTMLElement | null;
            firstFocusable?.focus();
        } else {
            this.lastFocusedElement?.focus();
            this.lastFocusedElement = null;
        }
    }

    closeMenu() {
        this.menuOpen = false;
        document.querySelector('.mobile-drawer')?.classList.remove('open');
        document.querySelector('.mobile-toggle')?.classList.remove('open');
        document.body.classList.remove('menu-open');
        document.querySelector('.mobile-overlay')?.classList.remove('open');
        const trigger = document.querySelector('.mobile-toggle') as HTMLElement | null;
        trigger?.focus();
    }

    changeLang(langOrEvent: Event | "es" | "en") {
        const lang = typeof langOrEvent === 'string'
            ? langOrEvent
            : ((langOrEvent.target as HTMLButtonElement | HTMLSelectElement).value || 'es') as "es" | "en";

        const nextLang = lang === 'en' ? 'en' : 'es';
        this.lang = nextLang;
        this.setLang(nextLang);
    }

    openLuna(): void {
        if (isPlatformBrowser(this.platformId)) {
            window.dispatchEvent(new Event('abrir-luna'));
        }
    }
}
