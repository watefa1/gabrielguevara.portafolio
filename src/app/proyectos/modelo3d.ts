import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

@Component({
  selector: 'app-modelo3d',
  template: `<div #container class="modelo-3d"></div>`,
  styles: [`.modelo-3d { width: 30vw; height: 600px; margin: 0; display: block; }`]
})
export class Modelo3D implements AfterViewInit {
  @ViewChild('container', { static: false }) container!: ElementRef;

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;

    const container = this.container.nativeElement;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    let targetRotationY = 0;
    let model: THREE.Object3D | null = null;

    // Interacción con el mouse
    container.addEventListener('mousemove', (event: MouseEvent) => {
  const rect = container.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const percent = x / rect.width;
  // Limita la rotación entre -0.2 y 0.2 radianes (~11°)
  targetRotationY = (percent - 0.5) * 0.8;
    });

    const loader = new GLTFLoader();
    loader.load(
      'assets/modelo.glb',
      (gltf) => {
        model = gltf.scene;
        model.position.set(0, 0, 0);
        model.scale.set(1, 1, 1);
        scene.add(model);
        console.log('Modelo GLB cargado correctamente:', model);

        const clock = new THREE.Clock();
        const animate = () => {
          requestAnimationFrame(animate);
          if (model) {
            // Interpolación suave hacia la rotación objetivo
            model.rotation.y += (targetRotationY - model.rotation.y) * 0.08;
          }
          renderer.render(scene, camera);
        };
        animate();
      },
      undefined,
      (error) => {
        console.error('Error cargando modelo GLB:', error);
      }
    );
  }
}
