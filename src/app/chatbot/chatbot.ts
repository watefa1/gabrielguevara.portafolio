import { Component, Inject, PLATFORM_ID, Input, OnInit, ViewChild, ElementRef, AfterViewChecked, NgZone } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { isPlatformBrowser } from "@angular/common";

@Component({
  selector: "app-chatbot",
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: "./chatbot.html",
  styleUrls: ["./chatbot.css"]
})
export class ChatbotComponent implements OnInit, AfterViewChecked {
  @ViewChild("chatBody") private chatBody!: ElementRef;
  isOpen = false;
  messages: { text: string, isUser: boolean }[] = [];
  newMessage = "";
  isLoading = false;
  loadingMessage = "";
  private loadingTimeout: any;
  private funnyMessageInterval: any;
  @Input() welcomeMessage = "";
  @Input() initialMessage = "";
  @Input() placeholder = "";
  @Input() suggestions: string[] = [];
  showWelcomeBubble = true;
  showSuggestions = true;
  private shouldScroll = false;
  private faq: { question: string, answer: string }[] = [];
  private portfolioLang: string = 'en';
  private welcomeBubbleTimer: any = null;
  private readonly lunaOpenListener = () => {
    if (!this.isOpen) this.toggleChat();
  };

  // Respuestas grabadas para las sugerencias: no consumen tokens del asistente
  private readonly recordedReplies: Record<string, string> = {
    "¿Cuáles son los hobbies de Gabriel?": "Blender y diseño de entornos 3D (mucho de eso vive en 3d.gguevara.dev), explorar nuevas tecnologías como IA y backend, y tiempo en familia con Thaylys y Luna, su gato.",
    "¿Qué tecnologías conoce Gabriel?": "PHP (CodeIgniter 3) —su stack principal—, Go, Java con Spring Boot, Node.js, Angular, TypeScript, Vue.js, MySQL/MariaDB/PostgreSQL y AWS (EC2, ECS, Amplify, Lambda).",
    "¿Quién es Luna?": "Soy yo: el gato de Gabriel (9 años, tranquilo y curioso) y el asistente IA de este portfolio, construido con Netlify Functions sobre una base de conocimiento estructurada.",
    "What are Gabriel's hobbies?": "Blender and 3D environment design (a lot of it lives at 3d.gguevara.dev), exploring new technologies like AI and backend architecture, and family time with Thaylys and Luna, his cat.",
    "What technologies does Gabriel know?": "PHP (CodeIgniter 3) — his main stack —, Go, Java with Spring Boot, Node.js, Angular, TypeScript, Vue.js, MySQL/MariaDB/PostgreSQL and AWS (EC2, ECS, Amplify, Lambda).",
    "Who is Luna?": "That's me: Gabriel's cat (9 years old, calm and curious) and this portfolio's AI assistant, built with Netlify Functions on top of a structured knowledge base."
  };
  
  private normalizeText(text: string): string {
    if (!text) return "";
    // remove diacritics and punctuation, keep letters/numbers/spaces
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .toLowerCase()
      .trim();
  }

  constructor(@Inject(PLATFORM_ID) private platformId: object, private ngZone: NgZone) {
  }

  private syncPortfolioLang(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    try {
      const globalLang = (window as any).lang;
      const docLang = (document && document.documentElement && document.documentElement.lang) || '';
      const navLang = (navigator && (navigator.language || (navigator as any).userLanguage)) || '';
      const detected = (globalLang || docLang || navLang || 'en').split('-')[0].toLowerCase();
      this.portfolioLang = detected.startsWith('es') ? 'es' : 'en';
    } catch (e) {
      this.portfolioLang = 'en';
    }
  }

  ngOnInit(): void {
    if (this.initialMessage) {
      this.messages.push({ text: this.initialMessage, isUser: false });
      this.shouldScroll = true;
    }

    if (isPlatformBrowser(this.platformId)) {
      this.syncPortfolioLang();
      sessionStorage.removeItem('luna-bubble-dismissed');

      // Burbuja: aparece a los 2s y se va a los 9s. Manipula clases fuera de la
      // zona para no mantener tareas pendientes (NG0506) ni depender del CD.
      this.ngZone.runOutsideAngular(() => {
        this.welcomeBubbleTimer = setTimeout(() => {
          const bubble = document.querySelector('.welcome-bubble');
          if (!bubble) return;
          bubble.classList.add('show');
          this.welcomeBubbleTimer = setTimeout(() => {
            bubble.classList.remove('show');
            bubble.classList.add('hide');
            sessionStorage.setItem('luna-bubble-dismissed', 'true');
            setTimeout(() => { (bubble as HTMLElement).style.display = 'none'; }, 400);
          }, 7000);
        }, 2000);
      });

      fetch('/assets/faq.json')
        .then(res => res.json())
        .then(data => { this.faq = data; })
        .catch(err => console.warn('Failed to load local FAQ:', err));

      window.addEventListener('abrir-luna', this.lunaOpenListener);
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('abrir-luna', this.lunaOpenListener);
    }
    if (this.welcomeBubbleTimer) {
      clearTimeout(this.welcomeBubbleTimer);
    }
  }

  ngAfterViewChecked(): void {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  scrollToBottom(): void {
    try {
      if (!this.chatBody || !this.chatBody.nativeElement) return;
      this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
    } catch (err) {
      console.error("Error scrolling to bottom:", err);
    }
  }

  toggleChat(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.showWelcomeBubble = false;
      if (isPlatformBrowser(this.platformId)) {
        sessionStorage.setItem('luna-bubble-dismissed', 'true');
      }
      return;
    }

    if (isPlatformBrowser(this.platformId)) {
      const dismissed = sessionStorage.getItem('luna-bubble-dismissed');
      this.showWelcomeBubble = !dismissed;
    }
  }

  async sendSuggestion(suggestion: string): Promise<void> {
    this.showSuggestions = false; // Ocultar sugerencias al hacer clic

    const recorded = this.recordedReplies[suggestion];
    if (recorded !== undefined) {
      // Respuesta grabada local: no se llama a la función de IA
      this.messages.push({ text: suggestion, isUser: true });
      this.shouldScroll = true;
      this.isLoading = true;
      this.loadingMessage = "estoy buscando la respuesta...";
      // Executor form: el lib del proyecto (pre-ES2024) no tiene Promise.withResolvers
      await new Promise(resolve => setTimeout(resolve, 600));
      this.isLoading = false;
      this.messages.push({ text: recorded, isUser: false });
      this.shouldScroll = true;
      return;
    }

    this.newMessage = suggestion;
    await this.sendMessage();
  }

  async sendMessage(): Promise<void> {
    if (this.newMessage.trim() === "") return;

    this.syncPortfolioLang();
    this.showSuggestions = false;
    this.messages.push({ text: this.newMessage, isUser: true });
    this.shouldScroll = true;
    const userMessage = this.newMessage;
    this.newMessage = "";
    this.isLoading = true;
    
    this.loadingMessage = "estoy buscando la respuesta...";
    const funnyMessages = [
      "me distraje con una mosca...",
      "estaba durmiendo una siesta...",
      "persiguiendo un puntito rojo en la pared...",
      "afilando mis uñas en el sofá..."
    ];
    let messageIndex = 0;

    this.loadingTimeout = setTimeout(() => {
      if (!this.isLoading) return;
      this.loadingMessage = funnyMessages[messageIndex++];
      this.shouldScroll = true;

      this.funnyMessageInterval = setInterval(() => {
        if (!this.isLoading) {
          clearInterval(this.funnyMessageInterval);
          return;
        }
        this.loadingMessage = funnyMessages[messageIndex % funnyMessages.length];
        messageIndex++;
        this.shouldScroll = true;
      }, 4000);
    }, 3000);
    
    let assistantMessage: { text: string, isUser: boolean } | null = null;

    try {
      // Check local FAQ for an exact or close match to avoid calling AI
      const normalized = this.normalizeText(userMessage);
      // Prefer FAQ entries matching the portfolio language first
      let local = this.faq.find(f => {
        if ((f as any).lang && (f as any).lang !== this.portfolioLang) return false;
        const q = this.normalizeText(f.question);
        return q === normalized || q.startsWith(normalized) || normalized.startsWith(q) || q.includes(normalized) || normalized.includes(q);
      });
      // Fallback: try matching across all languages
      if (!local) {
        local = this.faq.find(f => {
          const q = this.normalizeText(f.question);
          return q === normalized || q.startsWith(normalized) || normalized.startsWith(q) || q.includes(normalized) || normalized.includes(q);
        });
      }
      if (local) {
        clearTimeout(this.loadingTimeout);
        clearInterval(this.funnyMessageInterval);
        this.isLoading = false;
        this.messages.push({ text: local.answer, isUser: false });
        this.shouldScroll = true;
        return;
      }
        const response = await fetch("/.netlify/functions/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage, lang: this.portfolioLang }),
        });

        clearTimeout(this.loadingTimeout);
        clearInterval(this.funnyMessageInterval);
        
        if (!response.ok) {
            throw new Error(`Failed to get response from the server. Status: ${response.status}`);
        }

        if (!response.body) {
            throw new Error("Response body is missing");
        }

        this.isLoading = false;
        
        assistantMessage = { text: "", isUser: false };
        this.messages.push(assistantMessage);
        
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            assistantMessage.text += decoder.decode(value, { stream: true });
            this.shouldScroll = true;
        }

    } catch (error) {
        console.error(error);
        if (assistantMessage && assistantMessage.text === "") {
            // If we added a message object but never got any text for it, remove it.
            this.messages.pop();
        }
        this.messages.push({ text: "Sorry, something went wrong. Please try again.", isUser: false });
        this.shouldScroll = true;
    } finally {
        this.isLoading = false;
        clearTimeout(this.loadingTimeout);
        if (this.funnyMessageInterval) {
          clearInterval(this.funnyMessageInterval);
        }
        this.shouldScroll = true;
    }
  }
}
