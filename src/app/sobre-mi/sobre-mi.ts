import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sobre-mi',
  imports: [CommonModule],
  templateUrl: './sobre-mi.html',
  styleUrl: './sobre-mi.css'
})
export class SobreMi {
  @Input() lang: 'es' | 'en' = 'es';

  softSkills = [
    { es: 'Problem Solving', en: 'Problem Solving' },
    { es: 'Adaptabilidad', en: 'Adaptability' },
    { es: 'Comunicación con clientes', en: 'Client communication' },
    { es: 'Trabajo en equipo', en: 'Teamwork' },
    { es: 'Gestión del tiempo', en: 'Time management' },
    { es: 'Atención al detalle', en: 'Attention to detail' },
    { es: 'Autonomía', en: 'Self-motivation' }
  ];
}
