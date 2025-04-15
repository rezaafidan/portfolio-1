import React, { useEffect, useRef, useState } from 'react';
import '../assets/styles/GradientBackground.scss';

const GradientBackground = () => {
    const gradientRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 50, y: 50 });
    const [targetPosition, setTargetPosition] = useState({ x: 50, y: 50 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const x = (clientX / innerWidth) * 100;
            const y = (clientY / innerHeight) * 100;
            
            setTargetPosition({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const interpolatePosition = () => {
            setPosition(prev => ({
                x: prev.x + (targetPosition.x - prev.x) * 0.05,
                y: prev.y + (targetPosition.y - prev.y) * 0.05
            }));
        };

        const animationFrame = requestAnimationFrame(function animate() {
            interpolatePosition();
            requestAnimationFrame(animate);
        });

        return () => cancelAnimationFrame(animationFrame);
    }, [targetPosition]);

    useEffect(() => {
        if (!gradientRef.current) return;
        
        gradientRef.current.style.background = `radial-gradient(circle at ${position.x}% ${position.y}%, rgba(80, 0, 202, 0.25), transparent 60%)`;
    }, [position]);

    return <div ref={gradientRef} className="gradient-background" />;
};

export default GradientBackground; 