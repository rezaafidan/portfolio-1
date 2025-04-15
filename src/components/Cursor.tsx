import React, { useEffect, useState, useRef } from 'react';
import '../assets/styles/Cursor.scss';

const Cursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [outerPosition, setOuterPosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(true);
    const velocityRef = useRef({ x: 0, y: 0 });
    const lastMousePos = useRef({ x: 0, y: 0 });
    const isMovingRef = useRef(false);
    const movementTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setIsVisible(true);
            // Inner cursor langsung mengikuti posisi mouse
            setPosition({ x: e.pageX, y: e.pageY });
            
            // Deteksi pergerakan mouse
            const hasMoved = e.pageX !== lastMousePos.current.x || e.pageY !== lastMousePos.current.y;
            lastMousePos.current = { x: e.pageX, y: e.pageY };
            
            if (hasMoved) {
                isMovingRef.current = true;
                
                // Reset timeout setiap kali mouse bergerak
                if (movementTimeout.current) {
                    clearTimeout(movementTimeout.current);
                }
                
                // Set timeout untuk mendeteksi ketika mouse berhenti bergerak
                movementTimeout.current = setTimeout(() => {
                    isMovingRef.current = false;
                }, 100); // Waktu 100ms untuk mendeteksi mouse berhenti
            }
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
            if (movementTimeout.current) {
                clearTimeout(movementTimeout.current);
            }
        };
    }, []);

    useEffect(() => {
        // Animasi hanya untuk lingkaran luar
        const springStrength = 0.1; // Kekuatan spring
        const friction = 0.75; // Gesekan/perlambatan
        const speed = 1.5; // Kecepatan pergerakan
        const threshold = 0.1; // Ambang batas untuk berhenti

        const animate = () => {
            // Hitung jarak ke target
            const dx = position.x - outerPosition.x;
            const dy = position.y - outerPosition.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Jika mouse bergerak atau jarak masih cukup jauh, terapkan spring motion
            if (isMovingRef.current || distance > threshold) {
                // Update velocity dengan spring force
                let springX = dx * springStrength;
                let springY = dy * springStrength;
                
                // Terapkan friction hanya saat mouse bergerak
                const currentFriction = isMovingRef.current ? friction : 0.5;
                
                velocityRef.current.x = (velocityRef.current.x + springX) * currentFriction * speed;
                velocityRef.current.y = (velocityRef.current.y + springY) * currentFriction * speed;
                
                // Update posisi dengan velocity
                setOuterPosition(prev => ({
                    x: prev.x + velocityRef.current.x,
                    y: prev.y + velocityRef.current.y
                }));
            } else {
                // Jika sudah sangat dekat dengan target dan mouse tidak bergerak, 
                // langsung tempatkan di posisi target
                if (distance < threshold) {
                    setOuterPosition(position);
                    velocityRef.current = { x: 0, y: 0 };
                }
            }

            requestAnimationFrame(animate);
        };

        const animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [position, outerPosition]);

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