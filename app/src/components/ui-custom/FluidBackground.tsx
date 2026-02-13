import { useEffect, useRef } from 'react';

export default function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const orbs = [
      { x: 0.3, y: 0.3, radius: 0.4, color: 'rgba(122, 69, 255, 0.15)', speed: 0.0003 },
      { x: 0.7, y: 0.6, radius: 0.35, color: 'rgba(164, 66, 255, 0.12)', speed: 0.0004 },
      { x: 0.5, y: 0.8, radius: 0.3, color: 'rgba(122, 69, 255, 0.1)', speed: -0.0002 },
    ];

    const animate = () => {
      time += 1;
      
      ctx.fillStyle = '#0d0d0d';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      orbs.forEach((orb, i) => {
        const centerX = canvas.width * (orb.x + Math.sin(time * orb.speed + i) * 0.1);
        const centerY = canvas.height * (orb.y + Math.cos(time * orb.speed * 0.7 + i) * 0.1);
        const radius = Math.min(canvas.width, canvas.height) * orb.radius;

        const gradient = ctx.createRadialGradient(
          centerX, centerY, 0,
          centerX, centerY, radius
        );
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ 
        pointerEvents: 'none',
        background: '#0d0d0d'
      }}
    />
  );
}
