import React, { useEffect, useState, useRef } from 'react';
import '../assets/styles/Cursor.scss';

const Cursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [outerPosition, setOuterPosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(true);
    const velocityRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setIsVisible(true);
            requestAnimationFrame(() => {
                setPosition({ x: e.pageX, y: e.pageY });
            });
        };

        const handleMouseLeave = (e: MouseEvent) => {
            if (!e.relatedTarget || 
                !(e.relatedTarget instanceof Element) || 
                !e.relatedTarget.closest('.expertise-section, .project-section, .timeline-section, .contact-section, .about-section')) {
                setIsVisible(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    useEffect(() => {
        const springStrength = 0.15; // Kekuatan spring
        const friction = 0.8; // Gesekan/perlambatan
        const speed = 1.2; // Kecepatan pergerakan

        const animate = () => {
            // Hitung jarak ke target
            const dx = position.x - outerPosition.x;
            const dy = position.y - outerPosition.y;

            // Update velocity dengan spring force
            velocityRef.current.x = (velocityRef.current.x + dx * springStrength) * friction * speed;
            velocityRef.current.y = (velocityRef.current.y + dy * springStrength) * friction * speed;

            // Update posisi dengan velocity
            setOuterPosition(prev => ({
                x: prev.x + velocityRef.current.x,
                y: prev.y + velocityRef.current.y
            }));

            requestAnimationFrame(animate);
        };

        const animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [position]);

    const innerStyle = {
        transform: `translate(${position.x}px, ${position.y}px)`
    };

    const outerStyle = {
        transform: `translate(${outerPosition.x}px, ${outerPosition.y}px)`
    };

    return (
        <div className={`cursor-container ${isVisible ? 'visible' : 'hidden'}`}>
            <div 
                className="cursor-outer"
                style={outerStyle}
            />
            <div 
                className="cursor-inner"
                style={innerStyle}
            />
        </div>
    );
};

export default Cursor; 