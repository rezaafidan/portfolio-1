import React, { useEffect, useState } from 'react';
import '../assets/styles/Cursor.scss';

const Cursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [outerPosition, setOuterPosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setIsVisible(true);
            // Inner cursor langsung mengikuti posisi mouse
            setPosition({ x: e.pageX, y: e.pageY });
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
        // Fungsi sederhana untuk interpolasi linear
        const lerp = (start: number, end: number, factor: number) => {
            return start + (end - start) * factor;
        };

        // Faktor kecepatan untuk lingkaran luar (0.1 = 10% jarak per frame)
        const outerSpeed = 0.1;
        const stopThreshold = 0.1; // Ambang batas jarak untuk berhenti

        const animate = () => {
            // Hitung jarak ke target
            const dx = position.x - outerPosition.x;
            const dy = position.y - outerPosition.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Jika jarak lebih kecil dari threshold, langsung snap ke posisi target
            if (distance < stopThreshold) {
                setOuterPosition(position);
            } else {
                // Interpolasi linear sederhana
                const nextX = lerp(outerPosition.x, position.x, outerSpeed);
                const nextY = lerp(outerPosition.y, position.y, outerSpeed);
                
                setOuterPosition({
                    x: nextX,
                    y: nextY
                });
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