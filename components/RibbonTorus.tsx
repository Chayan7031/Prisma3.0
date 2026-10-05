'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface RibbonTorusProps {
  className?: string;
  speed?: number;
  interactive?: boolean;
}

export const RibbonTorus: React.FC<RibbonTorusProps> = ({
  className = '',
  speed = 1.0,
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Build the Torus Moiré Rib Geometry
    const group = new THREE.Group();
    scene.add(group);

    const RIB_COUNT = 150; // Number of cross-sectional wireframe rings
    const SEGMENTS_PER_RIB = 48; // Vertices per ring
    const MAJOR_RADIUS = 1.2; // Center of tube
    const MINOR_RADIUS = 0.5; // Tube thickness

    // Colors: Left side Charcoal / Slate Graphite, Right side Electric Orange / Coral
    const colorCharcoalDark = new THREE.Color('#3A3632');
    const colorCharcoalLight = new THREE.Color('#78716A');
    const colorOrangeVibrant = new THREE.Color('#FF5722');
    const colorOrangeGlow = new THREE.Color('#FF7A50');
    const colorOrangeAccent = new THREE.Color('#FFB088');

    const totalSegments = RIB_COUNT * SEGMENTS_PER_RIB;
    const positions = new Float32Array(totalSegments * 2 * 3);
    const colors = new Float32Array(totalSegments * 2 * 3);

    let ptr = 0;
    let colorPtr = 0;

    // Precalculate rib positions and colors
    for (let i = 0; i < RIB_COUNT; i++) {
      const u = (i / RIB_COUNT) * Math.PI * 2;
      const cosU = Math.cos(u);
      const sinU = Math.sin(u);

      // Torus centerline point
      const cx = MAJOR_RADIUS * cosU;
      const cz = MAJOR_RADIUS * sinU;

      // Normal and binormal vectors for the rib circle
      const nx = cosU;
      const nz = sinU;

      // Color logic:
      // Left side is Charcoal Slate, Right side is Electric Orange / Amber
      const ribColor = new THREE.Color();

      if (cosU > -0.05) {
        // Right side: Electric Orange / Coral
        const t = (cosU + 0.05) / 1.05; // 0 at transition, 1 at rightmost
        ribColor.lerpColors(colorOrangeVibrant, colorOrangeGlow, t);
        if (t > 0.5) {
          ribColor.lerp(colorOrangeAccent, (t - 0.5) * 0.6);
        }
      } else {
        // Left side: Charcoal / Slate Graphite
        const t = (-cosU - 0.05) / 0.95;
        ribColor.lerpColors(colorCharcoalLight, colorCharcoalDark, t);
      }

      for (let j = 0; j < SEGMENTS_PER_RIB; j++) {
        const v1 = (j / SEGMENTS_PER_RIB) * Math.PI * 2;
        const v2 = ((j + 1) / SEGMENTS_PER_RIB) * Math.PI * 2;

        const cosV1 = Math.cos(v1);
        const sinV1 = Math.sin(v1);
        const cosV2 = Math.cos(v2);
        const sinV2 = Math.sin(v2);

        // Point 1
        const x1 = cx + MINOR_RADIUS * cosV1 * nx;
        const y1 = MINOR_RADIUS * sinV1;
        const z1 = cz + MINOR_RADIUS * cosV1 * nz;

        // Point 2
        const x2 = cx + MINOR_RADIUS * cosV2 * nx;
        const y2 = MINOR_RADIUS * sinV2;
        const z2 = cz + MINOR_RADIUS * cosV2 * nz;

        // Write P1
        positions[ptr++] = x1;
        positions[ptr++] = y1;
        positions[ptr++] = z1;

        // Write P2
        positions[ptr++] = x2;
        positions[ptr++] = y2;
        positions[ptr++] = z2;

        // Write colors
        colors[colorPtr++] = ribColor.r;
        colors[colorPtr++] = ribColor.g;
        colors[colorPtr++] = ribColor.b;

        colors[colorPtr++] = ribColor.r;
        colors[colorPtr++] = ribColor.g;
        colors[colorPtr++] = ribColor.b;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.92,
      blending: THREE.NormalBlending,
      linewidth: 1,
    });

    const lines = new THREE.LineSegments(geometry, material);
    group.add(lines);

    // Initial orientation matching the isometric slant in the image
    // Tilted forward so the central hole is clearly visible and circular
    const BASE_ROT_X = 0.58; // Tilt forward
    const BASE_ROT_Y = 0.0;
    const BASE_ROT_Z = -0.32; // Slight diagonal slant

    group.rotation.set(BASE_ROT_X, BASE_ROT_Y, BASE_ROT_Z);

    // Animation variables
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime() * speed;

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      const hoverSpeedMultiplier = isHoveredRef.current ? 2.0 : 1.0;

      // Spin the ribs around the torus ring axis (Y in local space)
      lines.rotation.y = elapsedTime * 0.4 * hoverSpeedMultiplier;

      // Apply gyroscopic tilt to the main group based on mouse movement
      group.rotation.x = BASE_ROT_X + Math.sin(elapsedTime * 0.4) * 0.04 + mouseRef.current.y * 0.3;
      group.rotation.z = BASE_ROT_Z + Math.cos(elapsedTime * 0.3) * 0.03 + mouseRef.current.x * 0.25;

      // Subtle breathing scale
      const breath = 1.0 + Math.sin(elapsedTime * 0.6) * 0.015 + (isHoveredRef.current ? 0.04 : 0);
      group.scale.set(breath, breath, breath);

      renderer.render(scene, camera);
    };

    animate();

    // Mouse handlers for interactive tilt
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = nx;
      mouseRef.current.targetY = ny;
    };

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
    };

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || 320;
      const newHeight = container.clientHeight || 320;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [speed, interactive]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none ${className}`}
      style={{ touchAction: 'none' }}
      title="Interactive 3D Ribbon Torus — Hover or move to tilt"
    />
  );
};

export default RibbonTorus;
