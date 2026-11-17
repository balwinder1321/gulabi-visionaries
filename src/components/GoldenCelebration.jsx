import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

export const GoldenCelebration = ({ duration = 2500, onComplete }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // 1. Trigger Canvas-Confetti Golden Celebration Shower (Top & Sides)
    const goldPalette = ['#ffd700', '#ffea79', '#d4af37', '#f59e0b', '#fbbf24', '#ffffff', '#eab308', '#b45309'];

    // Initial burst from center-top
    confetti({
      particleCount: 60,
      spread: 120,
      origin: { x: 0.5, y: 0.1 },
      colors: goldPalette,
      shapes: ['square', 'circle'],
      scalar: 1.15,
      gravity: 0.95,
      ticks: 200
    });

    // Cascade intervals over the 2-second celebration
    const confettiInterval = setInterval(() => {
      // Left golden spray
      confetti({
        particleCount: 25,
        angle: 60,
        spread: 60,
        origin: { x: 0.05, y: 0.15 },
        colors: goldPalette,
        gravity: 1.1,
        scalar: 1.1,
        ticks: 180
      });

      // Right golden spray
      confetti({
        particleCount: 25,
        angle: 120,
        spread: 60,
        origin: { x: 0.95, y: 0.15 },
        colors: goldPalette,
        gravity: 1.1,
        scalar: 1.1,
        ticks: 180
      });
    }, 400);

    const stopConfettiTimeout = setTimeout(() => {
      clearInterval(confettiInterval);
    }, Math.max(500, duration - 600));

    // 2. Custom Canvas for 3D Twisting Serpentine Golden Streamers & Bokeh Flakes (Matching Image)
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // 3D Corkscrew / Serpentine Golden Ribbon Class
    class CorkscrewRibbon {
      constructor(initial = true) {
        this.reset(initial);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height * 0.4 - 150 : -250 - Math.random() * 150;
        this.speedY = Math.random() * 3 + 2.5;
        this.wind = (Math.random() - 0.5) * 0.8;
        this.radius = Math.random() * 10 + 16; // Coil radius (16px - 26px)
        this.pitch = Math.random() * 6 + 22;   // Spacing per loop turn (22px - 28px)
        this.turns = Math.floor(Math.random() * 3 + 4); // 4 to 6 full coils
        this.ribbonWidth = Math.random() * 3 + 6; // 6px - 9px ribbon thickness
        this.spin = Math.random() * Math.PI * 2;
        this.spinSpeed = (Math.random() * 0.05 + 0.03) * (Math.random() < 0.5 ? 1 : -1);
      }

      update() {
        this.y += this.speedY;
        this.x += this.wind;
        this.spin += this.spinSpeed;
      }

      draw(c) {
        const totalAngle = this.turns * Math.PI * 2;
        const steps = this.turns * 20;
        const stepAngle = totalAngle / steps;
        const dyPerStep = (this.pitch * this.turns) / steps;

        let lastP1 = null;
        let lastP2 = null;

        for (let i = 0; i <= steps; i++) {
          const angle = i * stepAngle;
          const curY = this.y + i * dyPerStep;
          const cosA = Math.cos(angle + this.spin);
          const sinA = Math.sin(angle + this.spin);

          const curX = this.x + cosA * this.radius;

          // Perpendicular ribbon width offset
          const w = this.ribbonWidth * (0.8 + 0.2 * Math.abs(cosA));
          const p1x = curX - w / 2;
          const p1y = curY;
          const p2x = curX + w / 2;
          const p2y = curY;

          if (i > 0 && lastP1 && lastP2) {
            c.beginPath();
            c.moveTo(lastP1.x, lastP1.y);
            c.lineTo(p1x, p1y);
            c.lineTo(p2x, p2y);
            c.lineTo(lastP2.x, lastP2.y);
            c.closePath();

            // 3D Light Shading depending on face normal
            if (sinA > 0.4) {
              c.fillStyle = '#fff08a'; // Bright specular gold sheen
            } else if (sinA > -0.2) {
              c.fillStyle = '#eab308'; // Rich 24k gold
            } else {
              c.fillStyle = '#a16207'; // Deep golden shadow side
            }

            c.shadowColor = '#fef08a';
            c.shadowBlur = 4;
            c.fill();
          }

          lastP1 = { x: p1x, y: p1y };
          lastP2 = { x: p2x, y: p2y };
        }
      }
    }

    // 3D Golden Confetti Flake Class (Metallic squares fluttering in space)
    class GoldFlake {
      constructor(initial = true) {
        this.reset(initial);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height * 0.6 : Math.random() * -100;
        this.size = Math.random() * 9 + 6;
        this.speedY = Math.random() * 3.5 + 2.2;
        this.speedX = (Math.random() - 0.5) * 1.8;
        this.rotX = Math.random() * Math.PI;
        this.rotY = Math.random() * Math.PI;
        this.rotSpeedX = Math.random() * 0.08 + 0.04;
        this.rotSpeedY = Math.random() * 0.08 + 0.04;
        this.color = goldPalette[Math.floor(Math.random() * goldPalette.length)];
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotX += this.rotSpeedX;
        this.rotY += this.rotSpeedY;
      }

      draw(c) {
        c.save();
        c.translate(this.x, this.y);
        c.scale(Math.cos(this.rotX), Math.sin(this.rotY));
        c.fillStyle = this.color;
        c.shadowColor = '#fde047';
        c.shadowBlur = 3;
        c.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.85);
        c.restore();
      }
    }

    // Soft Blurred Golden Bokeh Orbs (Background depth-of-field)
    class GoldenBokeh {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height * 0.7;
        this.radius = Math.random() * 20 + 12;
        this.speedY = Math.random() * 1.5 + 1.0;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.alpha = Math.random() * 0.35 + 0.15;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;
      }

      draw(c) {
        c.save();
        c.globalAlpha = this.alpha;
        const grad = c.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        grad.addColorStop(0, '#fde047');
        grad.addColorStop(0.6, '#eab308');
        grad.addColorStop(1, 'rgba(234, 179, 8, 0)');
        c.fillStyle = grad;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
    }

    // Create particles
    const ribbons = Array.from({ length: 12 }, () => new CorkscrewRibbon(true));
    const flakes = Array.from({ length: 45 }, () => new GoldFlake(true));
    const bokeh = Array.from({ length: 14 }, () => new GoldenBokeh());

    const startTime = Date.now();

    const loop = () => {
      const elapsed = Date.now() - startTime;
      ctx.clearRect(0, 0, width, height);

      let fadeAlpha = 1;
      const fadeDuration = 600;
      if (elapsed > duration - fadeDuration) {
        fadeAlpha = Math.max(0, 1 - (elapsed - (duration - fadeDuration)) / fadeDuration);
      }

      ctx.save();
      ctx.globalAlpha = fadeAlpha;

      // 1. Draw bokeh orbs first (deep background)
      bokeh.forEach(b => {
        b.update();
        b.draw(ctx);
      });

      // 2. Draw 3D gold flakes
      flakes.forEach(f => {
        f.update();
        f.draw(ctx);
      });

      // 3. Draw 3D spiral ribbons
      ribbons.forEach(r => {
        r.update();
        r.draw(ctx);
      });

      ctx.restore();

      if (elapsed < duration) {
        animId = requestAnimationFrame(loop);
      } else {
        ctx.clearRect(0, 0, width, height);
        if (onComplete) onComplete();
      }
    };

    loop();

    return () => {
      clearTimeout(stopConfettiTimeout);
      clearInterval(confettiInterval);
      window.removeEventListener('resize', handleResize);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [duration, onComplete]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999] w-full h-full"
    />
  );
};
