"use client";

import { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";

export const SparklesCore = ({
  background = "transparent",
  minSize = 0.4,
  maxSize = 1.4,
  speed = 1,
  particleColor = "#FFF",
  particleDensity = 100,
  className = "",
}: {
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
  className?: string;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [noise, setNoise] =
    useState<(x: number, y: number, z: number) => number>();
  const [particles, setParticles] = useState<
    Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      life: number;
      maxLife: number;
    }>
  >([]);

  useEffect(() => {
    if (!canvasRef.current) return;
    setContext(canvasRef.current.getContext("2d"));
    setNoise(createNoise3D());

    return () => {
      setContext(null);
    };
  }, []);

  useEffect(() => {
    if (!context || !noise) return;

    const canvas = canvasRef.current!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const getParticleDensity = () => {
      const area = canvas.width * canvas.height;
      return Math.floor((area / 1000) * (particleDensity / 100));
    };

    const newParticles = Array.from({ length: getParticleDensity() }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: 0,
      vy: 0,
      radius: Math.random() * (maxSize - minSize) + minSize,
      life: 0,
      maxLife: Math.random() * 100 + 200,
    }));

    setParticles(newParticles);

    const animationFrameId = requestAnimationFrame(animate);

    function animate(time: number) {
      if (!context || !noise) return;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = background;
      context.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        particle.life += 1;

        if (particle.life > particle.maxLife) {
          particle.life = 0;
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
        }

        const n = noise(
          particle.x * 0.001,
          particle.y * 0.001,
          time * 0.0001 * speed
        );

        const angle = n * Math.PI * 2;
        particle.vx = Math.cos(angle) * 0.5;
        particle.vy = Math.sin(angle) * 0.5;

        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        const fade = particle.life / particle.maxLife;
        const fadeInverse = 1 - fade;

        context.globalAlpha = fadeInverse;
        context.fillStyle = particleColor;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      }

      requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [
    context,
    noise,
    background,
    minSize,
    maxSize,
    speed,
    particleColor,
    particleDensity,
  ]);

  return <canvas ref={canvasRef} className={className} />;
};
