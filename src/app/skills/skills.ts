import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skills',
  standalone: true,
  templateUrl: './skills.html',
  styleUrls: ['./skills-cv-container.css']
})
export class Skills {
  @Input() lang: 'es' | 'en' = 'es';
}
