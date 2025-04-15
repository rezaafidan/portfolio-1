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
  const smoothFactor = 0.2; // Mempertahankan nilai terakhir yang diubah pengguna

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setTargetPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    const updatePosition = () => {
      setCurrentPos((prevPos: Position) => {
        const dx = targetPos.x - prevPos.x;
        const dy = targetPos.y - prevPos.y;
        const nextX = prevPos.x + dx * smoothFactor;
        const nextY = prevPos.y + dy * smoothFactor;

        if (cursorRef.current) {
          const xPercent = (nextX / window.innerWidth) * 100;
          const yPercent = (nextY / window.innerHeight) * 100;
          // Menggunakan putih solid untuk efek negasi maksimal dengan mix-blend-mode
          // Ukuran outline tipis (versi sebelum klik)
          cursorRef.current.style.background = `radial-gradient(
            circle at ${xPercent}% ${yPercent}%,
            rgba(0, 0, 0, 0) 0%,      /* Tengah transparan */
            rgba(0, 0, 0, 0) 1.0%,    /* Tetap transparan hingga 1.0% */
            rgba(255, 255, 255, 1) 1.1%,/* Mulai putih solid (negasi) */
            rgba(255, 255, 255, 1) 1.5%,/* Tetap putih solid */
            rgba(0, 0, 0, 0) 1.6%   /* Mulai transparan luar */
          )`;
        }
        return { x: nextX, y: nextY };
      });

      animationFrameId.current = requestAnimationFrame(updatePosition);
    };

    animationFrameId.current = requestAnimationFrame(updatePosition);

    // Hanya hapus listener mousemove
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetPos]); // Dependency array hanya targetPos

  return <div ref={cursorRef} className="gradient-cursor" />;
};

export default GradientCursor; 