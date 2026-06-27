﻿import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-chatbot",
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: "./chatbot.html",
  styleUrls: ["./chatbot.css"]
})
export class ChatbotComponent {
  isOpen = false;
  messages: { text: string, isUser: boolean }[] = [];
  newMessage = "";
  isLoading = false;

  toggleChat(): void {
    this.isOpen = !this.isOpen;
  }

  async sendMessage(): Promise<void> {
    if (this.newMessage.trim() === "") {
      return;
    }

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
