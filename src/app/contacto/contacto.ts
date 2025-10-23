import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contacto',
  imports: [CommonModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css'
})
export class Contacto implements OnInit {
  showPrivModal = false;
  lang: 'es' | 'en' = 'es';
  sending = false;
  sent = false;
  error = false;

  ngOnInit(): void {
    this.lang = (window as any).lang || 'es';
    (window as any).setLangContacto = (lang: 'es' | 'en') => {
      this.lang = lang;
    };
    // Interceptar el submit del formulario
    setTimeout(() => {
      const form = document.querySelector('.glass-form') as HTMLFormElement;
      if (form) {
        form.onsubmit = (e) => {
          e.preventDefault();
          this.sendForm(form);
          return false;
        };
      }
    }, 0);
  }

  async sendForm(form: HTMLFormElement) {
    this.sending = true;
    this.sent = false;
    this.error = false;
    const data = new FormData(form);
    try {
      const res = await fetch('https://formspree.io/f/xblazovg', {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        this.sent = true;
        form.reset();
        setTimeout(() => { this.sent = false; }, 4000);
      } else {
        this.error = true;
        setTimeout(() => { this.error = false; }, 4000);
      }
    } catch {
      this.error = true;
      setTimeout(() => { this.error = false; }, 4000);
    }
    this.sending = false;
  }
}
