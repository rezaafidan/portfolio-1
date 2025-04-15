import React, { useEffect, useRef, useState } from 'react';
import './FastSolidCursor.scss'; // Impor SCSS baru

interface Position {
  x: number;
  y: number;
}

// Gradient stops untuk solid circle
const solidGradientStops = {
  solidEnd: '0.4%',
  transparentStart: '0.5%',
};

const FastSolidCursor: React.FC = () => { // Nama komponen baru
  const cursorRef = useRef<HTMLDivElement>(null);
  const [targetPos, setTargetPos] = useState<Position>({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState<Position>({ x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);

  // Faktor smoothing lebih cepat
  const smoothFactor = 0.5;

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

          // Style gradient solid (selalu sama)
          cursorRef.current.style.background = `radial-gradient(
            circle at ${xPercent}% ${yPercent}%,
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 255, 255, 1) ${solidGradientStops.solidEnd},
            rgba(0, 0, 0, 0) ${solidGradientStops.transparentStart}
          )`;
        }
        return { x: nextX, y: nextY };
      });

      animationFrameId.current = requestAnimationFrame(updatePosition);
    };

    animationFrameId.current = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetPos]);

  // Nama class baru
  return <div ref={cursorRef} className="fast-solid-cursor" />;
};

export default FastSolidCursor; // Export komponen baru 