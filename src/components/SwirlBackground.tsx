// fondo animado con particulas en movimiento usando simplex noise y canvas
import { useEffect, useRef } from 'react';
import { createNoise3D } from 'simplex-noise';

const { PI, cos, sin, abs, random } = Math;
const TAU = 2 * PI;
const rand = (n: number) => n * random();
const randRange = (n: number) => n - rand(2 * n);
const fadeInOut = (t: number, m: number) => {
  const hm = 0.5 * m;
  return abs((t + hm) % m - hm) / hm;
};
const lerp = (n1: number, n2: number, speed: number) => (1 - speed) * n1 + speed * n2;

const particleCount = 400;
const particlePropCount = 9;
const particlePropsLength = particleCount * particlePropCount;
const rangeY = 350;
const baseTTL = 30;
const rangeTTL = 80;
const baseSpeed = 0.05;
const rangeSpeed = 1;
const baseRadius = 0.5;
const rangeRadius = 1.5;
const baseHue = 160;
const rangeHue = 200;
const noiseSteps = 25;
const xOff = 0.00125;
const yOff = 0.00125;
const zOff = 0.0005;
const backgroundColor = 'hsla(260,40%,5%,1)';

const SwirlBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = {
      a: document.createElement('canvas'),
      b: canvasRef.current,
    };

    const ctx = {
      a: canvas.a.getContext('2d')!,
      b: canvas.b.getContext('2d')!,
    };

    const center: [number, number] = [0, 0];
    let tick = 0;
    const simplex = createNoise3D();
    const particleProps = new Float32Array(particlePropsLength);
    let animationId: number;

    const initParticle = (i: number) => {
      const x = rand(canvas.a.width);
      const y = center[1] + randRange(rangeY);
      const vx = 0;
      const vy = 0;
      const life = 0;
      const ttl = baseTTL + rand(rangeTTL);
      const speed = baseSpeed + rand(rangeSpeed);
      const radius = baseRadius + rand(rangeRadius);
      const hue = baseHue + rand(rangeHue);

      particleProps.set([x, y, vx, vy, life, ttl, speed, radius, hue], i);
    };

    const initParticles = () => {
      for (let i = 0; i < particlePropsLength; i += particlePropCount) {
        initParticle(i);
      }
    };

    const checkBounds = (x: number, y: number) => {
      return x > canvas.a.width || x < 0 || y > canvas.a.height || y < 0;
    };

    const updateParticle = (i: number) => {
      const i2 = 1 + i;
      const i3 = 2 + i;
      const i4 = 3 + i;
      const i5 = 4 + i;
      const i6 = 5 + i;
      const i7 = 6 + i;
      const i8 = 7 + i;
      const i9 = 8 + i;

      const x = particleProps[i];
      const y = particleProps[i2];
      const n = simplex(x * xOff, y * yOff, tick * zOff) * noiseSteps * TAU;
      const vx = lerp(particleProps[i3], cos(n), 0.5);
      const vy = lerp(particleProps[i4], sin(n), 0.5);
      const life = particleProps[i5];
      const ttl = particleProps[i6];
      const speed = particleProps[i7];
      const x2 = x + vx * speed;
      const y2 = y + vy * speed;
      const radius = particleProps[i8];
      const hue = particleProps[i9];

      drawParticle(x, y, x2, y2, life, ttl, radius, hue);

      particleProps[i] = x2;
      particleProps[i2] = y2;
      particleProps[i3] = vx;
      particleProps[i4] = vy;
      particleProps[i5] = life + 1;

      if (checkBounds(x, y) || life > ttl) {
        initParticle(i);
      }
    };

    const drawParticle = (
      x: number,
      y: number,
      x2: number,
      y2: number,
      life: number,
      ttl: number,
      radius: number,
      hue: number
    ) => {
      ctx.a.save();
      ctx.a.lineCap = 'round';
      ctx.a.lineWidth = radius;
      ctx.a.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`;
      ctx.a.beginPath();
      ctx.a.moveTo(x, y);
      ctx.a.lineTo(x2, y2);
      ctx.a.stroke();
      ctx.a.closePath();
      ctx.a.restore();
    };

    const drawParticles = () => {
      for (let i = 0; i < particlePropsLength; i += particlePropCount) {
        updateParticle(i);
      }
    };

    const renderGlow = () => {
      ctx.b.save();
      ctx.b.filter = 'blur(8px) brightness(200%)';
      ctx.b.globalCompositeOperation = 'lighter';
      ctx.b.drawImage(canvas.a, 0, 0);
      ctx.b.restore();

      ctx.b.save();
      ctx.b.filter = 'blur(4px) brightness(200%)';
      ctx.b.globalCompositeOperation = 'lighter';
      ctx.b.drawImage(canvas.a, 0, 0);
      ctx.b.restore();
    };

    const renderToScreen = () => {
      ctx.b.save();
      ctx.b.globalCompositeOperation = 'lighter';
      ctx.b.drawImage(canvas.a, 0, 0);
      ctx.b.restore();
    };

    const resize = () => {
      const { innerWidth, innerHeight } = window;

      canvas.a.width = innerWidth;
      canvas.a.height = innerHeight;
      ctx.a.drawImage(canvas.b, 0, 0);

      canvas.b.width = innerWidth;
      canvas.b.height = innerHeight;
      ctx.b.drawImage(canvas.a, 0, 0);

      center[0] = 0.5 * canvas.a.width;
      center[1] = 0.5 * canvas.a.height;
    };

    const draw = () => {
      tick++;

      ctx.a.clearRect(0, 0, canvas.a.width, canvas.a.height);
      ctx.b.fillStyle = backgroundColor;
      ctx.b.fillRect(0, 0, canvas.a.width, canvas.a.height);

      drawParticles();
      renderGlow();
      renderToScreen();

      animationId = requestAnimationFrame(draw);
    };

    resize();
    initParticles();
    draw();

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        minHeight: '100vh',
        maxHeight: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          minHeight: '100vh',
        }}
      />
    </div>
  );
};

export default SwirlBackground;
