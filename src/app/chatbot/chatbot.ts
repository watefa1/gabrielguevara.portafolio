import { Component, Inject, PLATFORM_ID, Input, OnInit, ViewChild, ElementRef, AfterViewChecked } from "@angular/core";
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

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
  }

  ngOnInit(): void {
    if (this.initialMessage) {
      this.messages.push({ text: this.initialMessage, isUser: false });
      this.shouldScroll = true;
    }
    // Load local FAQ to answer predefined questions without calling the AI
    if (isPlatformBrowser(this.platformId)) {
      fetch('/assets/faq.json')
        .then(res => res.json())
        .then(data => { this.faq = data; })
        .catch(err => console.warn('Failed to load local FAQ:', err));
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
      this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
    } catch (err) {
      console.error("Error scrolling to bottom:", err);
    }
  }

  toggleChat(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.showWelcomeBubble = false;
    }
  }

  async sendSuggestion(suggestion: string): Promise<void> {
    this.newMessage = suggestion;
    await this.sendMessage();
    this.showSuggestions = false; // Ocultar sugerencias al hacer clic
  }

  async sendMessage(): Promise<void> {
    if (this.newMessage.trim() === "") return;

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
      const local = this.faq.find(f => {
        const q = this.normalizeText(f.question);
        return q === normalized || q.startsWith(normalized) || normalized.startsWith(q) || q.includes(normalized) || normalized.includes(q);
      });
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
            body: JSON.stringify({ message: userMessage }),
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
