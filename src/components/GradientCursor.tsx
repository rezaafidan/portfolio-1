import React, { useEffect, useRef, useState } from 'react';
import './GradientCursor.scss';

interface Position {
  x: number;
  y: number;
}

// Definisikan parameter gradient untuk kedua state
const normalGradientStops = {
  transparentEnd: '1.0%',
  outlineStart: '1.1%',
  outlineEnd: '1.5%',
  transparentOuterStart: '1.6%',
};

const hoverLinkGradientStops = {
  transparentEnd: '0%',     // Mulai solid dari tengah
  outlineStart: '0%',     // Mulai solid dari tengah
  outlineEnd: '1.5%',     // Akhir outline tetap (ukuran luar sama)
  transparentOuterStart: '1.6%', // Mulai transparan luar tetap
};

const GradientCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [targetPos, setTargetPos] = useState<Position>({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState<Position>({ x: 0, y: 0 });
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false); // Ganti nama state
  const animationFrameId = useRef<number | null>(null);

  // Faktor smoothing (semakin kecil semakin lambat/halus)
  const smoothFactor = 0.2; // Mempertahankan nilai terakhir yang diubah pengguna

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setTargetPos({ x: e.clientX, y: e.clientY });

      // Deteksi hover link, button, atau elemen dengan role="button"
      let isHover = false;
      if (e.target instanceof Element) {
        // Cari elemen interaktif terdekat (link, button, atau role="button")
        const closestInteractive = e.target.closest('a[href], button, [role="button"]');
        isHover = closestInteractive !== null;
      }
      // Update state jika berubah (Fix linter error dengan tipe eksplisit)
      setIsHoveringInteractive((prev: boolean) => (prev !== isHover ? isHover : prev));
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

          // Pilih parameter gradient berdasarkan state isHoveringInteractive
          const gradientParams = isHoveringInteractive ? hoverLinkGradientStops : normalGradientStops;

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