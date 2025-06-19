"use client";
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './BackgroundCanvas.module.scss';

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    let animationId: number;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let particles: THREE.Points;
    let color = '#954ce9';

    const isDark = () => document.documentElement.classList.contains('dark');
    const getColor = () => (isDark() ? '#ba68ff' : '#954ce9');

    function init() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 30;
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      rendererRef.current = renderer;

      // Particles
      const particleCount = 1000;
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const baseColor = new THREE.Color(getColor());
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] = (Math.random() - 0.5) * 100;
        positions[i + 1] = (Math.random() - 0.5) * 100;
        positions[i + 2] = (Math.random() - 0.5) * 100;
        colors[i] = baseColor.r;
        colors[i + 1] = baseColor.g;
        colors[i + 2] = baseColor.b;
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      const material = new THREE.PointsMaterial({
        size: 0.7,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
      });
      particles = new THREE.Points(geometry, material);
      scene.add(particles);
      particlesRef.current = particles;
    }

    function animate() {
      animationId = requestAnimationFrame(animate);
      if (particlesRef.current) {
        particlesRef.current.rotation.x += 0.0005;
        particlesRef.current.rotation.y += 0.0005;
      }
      renderer.render(scene, camera);
    }

    function handleResize() {
      if (!rendererRef.current || !camera) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    }

    function handleThemeChange() {
      if (!particlesRef.current) return;
      const c = new THREE.Color(getColor());
      const colors = (particlesRef.current.geometry as THREE.BufferGeometry).attributes.color.array as Float32Array;
      for (let i = 0; i < colors.length; i += 3) {
        colors[i] = c.r;
        colors[i + 1] = c.g;
        colors[i + 2] = c.b;
      }
      (particlesRef.current.geometry as THREE.BufferGeometry).attributes.color.needsUpdate = true;
    }

    init();
    animate();
    window.addEventListener('resize', handleResize);
    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas + ' background-canvas'}></canvas>;
}
