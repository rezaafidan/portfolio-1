import React, { useEffect, useRef, useState } from 'react';
import './GradientCursor.scss';

interface Position {
  x: number;
  y: number;
}

// Definisikan parameter gradient untuk kedua state
const normalGradient = {
  transparentEnd: '1.0%',
  outlineStart: '1.1%',
  outlineEnd: '1.5%',
  transparentOuterStart: '1.6%',
};

const clickedGradient = {
  transparentEnd: '1.7%', // Lebih besar
  outlineStart: '1.8%',   // Mulai setelahnya
  outlineEnd: '2.1%',     // Akhir outline (sedikit lebih tebal: 0.3%)
  transparentOuterStart: '2.2%', // Mulai transparan luar
};

const GradientCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [targetPos, setTargetPos] = useState<Position>({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState<Position>({ x: 0, y: 0 });
  const [isMouseDown, setIsMouseDown] = useState(false); // State untuk klik mouse
  const animationFrameId = useRef<number | null>(null);

  // Faktor smoothing (semakin kecil semakin lambat/halus)
  const smoothFactor = 0.2;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Update posisi target saat mouse bergerak
      setTargetPos({ x: e.clientX, y: e.clientY });
    };
    const handleMouseDown = () => {
      setIsMouseDown(true);
    };
    const handleMouseUp = () => {
      setIsMouseDown(false);
    };

    // Tambahkan listener untuk mousedown dan mouseup
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

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

          // Pilih parameter gradient berdasarkan state isMouseDown
          const gradientParams = isMouseDown ? clickedGradient : normalGradient;

          cursorRef.current.style.background = `radial-gradient(
            circle at ${xPercent}% ${yPercent}%,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0) ${gradientParams.transparentEnd},
            rgba(255, 255, 255, 1) ${gradientParams.outlineStart},
            rgba(255, 255, 255, 1) ${gradientParams.outlineEnd},
            rgba(0, 0, 0, 0) ${gradientParams.transparentOuterStart}
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
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetPos]); // Re-run effect if targetPos changes (needed for closure)

  return <div ref={cursorRef} className="gradient-cursor" />;
};

export default GradientCursor; 