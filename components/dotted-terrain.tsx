"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroDotMountain() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();

    const camera = new THREE.OrthographicCamera(
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      1,
      1000,
    );

    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    const dots: number[] = [];

    const spacing = 16;

    const cols = Math.floor(width / spacing);
    const rows = Math.floor(height / spacing);

    const centerX = width / 2;
    const peakY = height * 0.25;

    const sigmaX = width * 0.28;
    const sigmaY = height * 0.35;

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * spacing - width / 2;
        const y = j * spacing - height / 2;

        const dx = i * spacing - centerX;
        const dy = j * spacing - peakY;

        const intensity = Math.exp(
          -(dx * dx) / (2 * sigmaX * sigmaX) -
            (dy * dy) / (2 * sigmaY * sigmaY),
        );

        if (intensity < 0.03) continue;

        dots.push(x, -y, 0);
      }
    }

    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(dots, 3),
    );

    const material = new THREE.PointsMaterial({
      color: 0x000000,
      size: 2,
      transparent: true,
      opacity: 0.18,
    });

    const points = new THREE.Points(geometry, material);

    scene.add(points);

    renderer.render(scene, camera);

    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-[320px]" />;
}
