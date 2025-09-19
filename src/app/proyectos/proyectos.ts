import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Modelo3D } from './modelo3d';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [CommonModule, Modelo3D],
  templateUrl: './proyectos.html',
  styleUrls: ['./proyectos.css']
})
export class Proyectos {}
