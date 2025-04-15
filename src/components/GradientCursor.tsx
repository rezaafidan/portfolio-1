import React, { useEffect, useRef, useState } from 'react';
import './GradientCursor.scss';

interface Position {
  x: number;
  y: number;
}

const GradientCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [targetPos, setTargetPos] = useState<Position>({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState<Position>({ x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);

  // Faktor smoothing (semakin kecil semakin lambat/halus)
  const smoothFactor = 0.2;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Update posisi target saat mouse bergerak
      setTargetPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Fungsi untuk update animasi
    const updatePosition = () => {
      setCurrentPos((prevPos: Position) => {
        const dx = targetPos.x - prevPos.x;
        const dy = targetPos.y - prevPos.y;
        const nextX = prevPos.x + dx * smoothFactor;
        const nextY = prevPos.y + dy * smoothFactor;

        if (cursorRef.current) {
          const xPercent = (nextX / window.innerWidth) * 100;
          const yPercent = (nextY / window.innerHeight) * 100;
          // Disesuaikan untuk outline yang lebih tipis
          cursorRef.current.style.background = `radial-gradient(
            circle at ${xPercent}% ${yPercent}%,
            rgba(0, 0, 0, 0) 0%,      /* Tengah transparan */
            rgba(0, 0, 0, 0) 1.0%,    /* Perbesar area transparan tengah -> 1.0% */
            rgba(40, 0, 80, 0.95) 1.1%,/* Mulai ungu sedikit setelahnya */
            rgba(40, 0, 80, 0.95) 1.5%,/* Akhiri ungu -> ketebalan 0.4% (1.5 - 1.1) */
            rgba(40, 0, 80, 0) 1.6%   /* Mulai transparan luar */
          )`;
        }
        return { x: nextX, y: nextY };
      });

      // Minta frame animasi berikutnya
      animationFrameId.current = requestAnimationFrame(updatePosition);
    };

    // Mulai loop animasi
    animationFrameId.current = requestAnimationFrame(updatePosition);

    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetPos]); // Re-run effect if targetPos changes (needed for closure)

  return <div ref={cursorRef} className="gradient-cursor" />;
};

export default GradientCursor; 