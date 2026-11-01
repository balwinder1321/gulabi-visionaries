import React, { useEffect, useRef, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Flame, Volume2, VolumeX } from 'lucide-react';
import { DiwaliDiya } from './DiwaliDiya';

export const DiwaliCrackers = () => {
  const canvasRef = useRef(null);
  const [ambientActive, setAmbientActive] = useState(true);
  const [burstCount, setBurstCount] = useState(0);
  const [isWidgetMinimized, setIsWidgetMinimized] = useState(false);
  const particlesRef = useRef([]);
  const rocketsRef = useRef([]);
  const animFrameRef = useRef(null);

  // Festive Colors: Gold, Saffron, Emerald, Crimson, Magenta, Royal Cyan
  const FIREWORK_COLORS = [
    '#fbbf24', '#f59e0b', '#ef4444', '#ec4899', 
    '#10b981', '#06b6d4', '#a855f7', '#ffffff', '#fde047'
  ];

  // Particle Class for Firecracker Spark Burst
  class Particle {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 1.5;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.alpha = 1;
      this.decay = Math.random() * 0.02 + 0.015;
      this.gravity = 0.08;
      this.size = Math.random() * 2.8 + 1.2;
      this.sparkle = Math.random() > 0.4;
    }

    update() {
      this.vx *= 0.98;
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
    }

    draw(ctx) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Rocket Class for Sky Launchers
  class Rocket {
    constructor(startX, startY, targetX, targetY, color) {
      this.x = startX;
      this.y = startY;
      this.targetX = targetX;
      this.targetY = targetY;
      this.color = color;
      const dx = targetX - startX;
      const dy = targetY - startY;
      const distance = Math.hypot(dx, dy);
      const speed = Math.random() * 3 + 8;
      this.vx = (dx / distance) * speed;
      this.vy = (dy / distance) * speed;
      this.exploded = false;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.y <= this.targetY || (this.vy > 0 && this.y >= this.targetY)) {
        this.exploded = true;
      }
    }

    draw(ctx) {
      ctx.save();
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Trailing sparks
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(this.x - this.vx * 1.5, this.y - this.vy * 1.5, 1.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Explode a firecracker at coordinates
  const explodeAt = useCallback((x, y, count = 45) => {
    const color = FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)];
    const color2 = FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)];
    for (let i = 0; i < count; i++) {
      const chosenColor = i % 2 === 0 ? color : color2;
      particlesRef.current.push(new Particle(x, y, chosenColor));
    }
  }, []);

  // Launch a sky rocket
  const launchRocket = useCallback(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const startX = Math.random() * (canvas.width * 0.8) + canvas.width * 0.1;
    const startY = canvas.height;
    const targetX = startX + (Math.random() - 0.5) * 200;
    const targetY = Math.random() * (canvas.height * 0.45) + 60;
    const color = FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)];

    rocketsRef.current.push(new Rocket(startX, startY, targetX, targetY, color));
  }, []);

  // Grand Diwali Fireworks Show Trigger
  const triggerGrandShow = () => {
    setBurstCount(prev => prev + 1);

    // Canvas Rockets
    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        launchRocket();
      }, i * 220);
    }

    // Canvas Confetti Golden & Multicolored Stars
    confetti({
      particleCount: 70,
      angle: 60,
      spread: 70,
      origin: { x: 0.1, y: 0.7 },
      colors: ['#fbbf24', '#f59e0b', '#ec4899', '#ffffff', '#10b981'],
      shapes: ['circle', 'star']
    });

    confetti({
      particleCount: 70,
      angle: 120,
      spread: 70,
      origin: { x: 0.9, y: 0.7 },
      colors: ['#ef4444', '#fbbf24', '#a855f7', '#06b6d4', '#ffffff'],
      shapes: ['circle', 'star']
    });
  };

  // Canvas resize and render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    let lastRocketTime = Date.now();

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Launch occasional ambient rockets if active (every 4-6 seconds)
      const now = Date.now();
      if (ambientActive && now - lastRocketTime > 4500) {
        launchRocket();
        lastRocketTime = now + (Math.random() * 2000 - 1000);
      }

      // Update & Draw Rockets
      for (let i = rocketsRef.current.length - 1; i >= 0; i--) {
        const r = rocketsRef.current[i];
        r.update();
        r.draw(ctx);
        if (r.exploded) {
          explodeAt(r.x, r.y, 50);
          rocketsRef.current.splice(i, 1);
        }
      }

      // Update & Draw Particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.update();
        p.draw(ctx);
        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
        }
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [ambientActive, launchRocket, explodeAt]);

  // Click-to-burst anywhere on document
  useEffect(() => {
    const handleDocumentClick = (e) => {
      // Ignore clicks on buttons/inputs/links to avoid interfering with normal interactions
      const target = e.target;
      const isInteractive = target.closest('button, a, input, select, textarea, [role="button"]');
      if (!isInteractive) {
        explodeAt(e.clientX, e.clientY, 35);
        setBurstCount(prev => prev + 1);
      }
    };

    window.addEventListener('click', handleDocumentClick);
    return () => window.removeEventListener('click', handleDocumentClick);
  }, [explodeAt]);

  return (
    <>
      {/* Non-intrusive Full-Screen Fireworks Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-40 w-full h-full"
      />

      {/* Floating Interactive Diwali Crackers & Diya Controller */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2 select-none">
        {!isWidgetMinimized ? (
          <div className="bg-gradient-to-br from-amber-950/95 via-rose-950/95 to-slate-950/95 backdrop-blur-xl border border-amber-400/40 p-3.5 sm:p-4 rounded-3xl shadow-[0_10px_35px_rgba(245,158,11,0.35)] text-amber-50 flex flex-col gap-2.5 max-w-[270px] animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header with Diya and Minimize */}
            <div className="flex items-center justify-between gap-3 border-b border-amber-500/20 pb-2">
              <div className="flex items-center gap-2">
                <DiwaliDiya size="sm" />
                <div>
                  <h4 className="text-xs font-serif font-black text-amber-300 tracking-wide">SHUBH DIWALI</h4>
                  <span className="text-[10px] text-amber-200/80 block leading-tight">Festival of Lights 🪔</span>
                </div>
              </div>

              <button
                onClick={() => setIsWidgetMinimized(true)}
                className="text-amber-400/70 hover:text-amber-200 text-xs px-1.5 py-0.5 rounded-lg hover:bg-amber-900/40"
                title="Minimize Diwali controls"
              >
                ✕
              </button>
            </div>

            {/* Quick Burst Crackers Button */}
            <button
              onClick={triggerGrandShow}
              className="w-full py-2.5 px-3 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 hover:from-amber-400 hover:to-rose-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition flex items-center justify-center gap-2 active:scale-95 group"
            >
              <Sparkles className="w-4 h-4 text-amber-200 group-hover:rotate-45 transition duration-300 animate-pulse" />
              <span>Burst Crackers 🎆</span>
            </button>

            {/* Stats & Ambient Toggle */}
            <div className="flex items-center justify-between text-[10px] text-amber-300/80 pt-0.5 px-1">
              <span>{burstCount > 0 ? `🎆 ${burstCount} Burst!` : '✨ Tap anywhere to burst!'}</span>
              <button
                onClick={() => setAmbientActive(!ambientActive)}
                className="underline hover:text-amber-200 transition"
              >
                {ambientActive ? 'Fireworks: ON' : 'Fireworks: OFF'}
              </button>
            </div>
          </div>
        ) : (
          /* Minimized Floating Diya Orb */
          <button
            onClick={() => {
              setIsWidgetMinimized(false);
              triggerGrandShow();
            }}
            className="p-3 bg-gradient-to-br from-amber-900/90 to-rose-950/90 border border-amber-400/60 rounded-full shadow-[0_4px_25px_rgba(245,158,11,0.5)] flex items-center gap-2 text-xs font-bold text-amber-200 hover:scale-105 active:scale-95 transition"
            title="Open Diwali Greetings & Burst Crackers"
          >
            <DiwaliDiya size="sm" />
            <span className="hidden sm:inline pr-1">🪔 Shubh Diwali! 🎆</span>
          </button>
        )}
      </div>
    </>
  );
};
