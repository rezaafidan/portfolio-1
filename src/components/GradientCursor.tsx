import React, { useEffect, useRef } from 'react';
import './GradientCursor.scss';

const GradientCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        cursorRef.current.style.background = `radial-gradient(
          circle at ${x}% ${y}%,
          rgba(0, 0, 0, 0.8) 0%,
          rgba(0, 0, 0, 0.4) 2%,
          rgba(0, 0, 0, 0) 4%
        )`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return <div ref={cursorRef} className="gradient-cursor" />;
};

export default GradientCursor; 