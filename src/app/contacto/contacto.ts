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

  ngOnInit(): void {
    this.lang = (window as any).lang || 'es';
    (window as any).setLangContacto = (lang: 'es' | 'en') => {
      this.lang = lang;
    };
  }
}
