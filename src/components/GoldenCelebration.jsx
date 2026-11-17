import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

export const GoldenCelebration = ({ duration = 2000, onComplete }) => {
  useEffect(() => {
    // Rich golden & champagne foil palette (exactly matching screenshot 2)
    const goldPalette = [
      '#ffd700', // 24k bright gold
      '#f59e0b', // amber gold
      '#fbbf24', // warm yellow gold
      '#fde047', // champagne highlight
      '#eab308', // pure gold
      '#d97706', // deep gold
      '#f472b6', // subtle rose gold accent
      '#ffffff'  // sparkle white
    ];

    // 1. Initial crisp opening shower from top
    confetti({
      particleCount: 60,
      spread: 100,
      origin: { x: 0.5, y: 0.05 },
      colors: goldPalette,
      shapes: ['square'],
      scalar: 0.85,
      gravity: 0.8,
      ticks: 200
    });

    // 2. Continuous raining golden flakes from random points across the top for 2 seconds
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      if (elapsed >= duration) {
        clearInterval(interval);
        if (onComplete) onComplete();
        return;
      }

      // Drop golden confetti evenly across the screen width
      confetti({
        particleCount: 8,
        spread: 70,
        origin: { x: Math.random() * 0.9 + 0.05, y: -0.05 },
        colors: goldPalette,
        shapes: ['square'],
        gravity: 0.85,
        scalar: 0.8,
        startVelocity: 12,
        ticks: 180
      });

      // Left corner cascade
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 50,
        origin: { x: 0, y: 0.1 },
        colors: goldPalette,
        shapes: ['square'],
        gravity: 0.9,
        scalar: 0.8,
        startVelocity: 15,
        ticks: 180
      });

      // Right corner cascade
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 50,
        origin: { x: 1, y: 0.1 },
        colors: goldPalette,
        shapes: ['square'],
        gravity: 0.9,
        scalar: 0.8,
        startVelocity: 15,
        ticks: 180
      });
    }, 250);

    const endTimeout = setTimeout(() => {
      clearInterval(interval);
      if (onComplete) onComplete();
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(endTimeout);
    };
  }, [duration, onComplete]);

  return null;
};
