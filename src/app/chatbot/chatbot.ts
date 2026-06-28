import { Component, Inject, PLATFORM_ID, Input, OnInit } from "@angular/core";
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
export class ChatbotComponent implements OnInit {
  isOpen = false;
  messages: { text: string, isUser: boolean }[] = [];
  newMessage = "";
  isLoading = false;
  @Input() welcomeMessage = "";
  @Input() initialMessage = "";
  @Input() placeholder = "";
  @Input() suggestions: string[] = [];
  showWelcomeBubble = true;
  showSuggestions = true;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
  }

  ngOnInit(): void {
    if (this.initialMessage) {
      this.messages.push({ text: this.initialMessage, isUser: false });
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
    if (this.newMessage.trim() === "") {
      return;
    }

    this.showSuggestions = false; // Ocultar sugerencias al enviar un mensaje
    this.messages.push({ text: this.newMessage, isUser: true });
    const userMessage = this.newMessage;
    this.newMessage = "";
    this.isLoading = true;

    try {
      const response = await fetch("/.netlify/functions/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from the server.");
      }

      const data = await response.json();
      const assistantMessage = data.message;

      if (assistantMessage) {
        this.messages.push({ text: assistantMessage, isUser: false });
      }
    } catch (error) {
      console.error(error);
      this.messages.push({ text: "Sorry, something went wrong. Please try again.", isUser: false });
    } finally {
      this.isLoading = false;
    }
  }
}
