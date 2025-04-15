import React, { useEffect, useState, useRef } from 'react';
import '../assets/styles/Cursor.scss';

const Cursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [outerPosition, setOuterPosition] = useState({ x: 0, y: 0 });
    const [largePosition, setLargePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(true);
    const previousPositions = useRef<{x: number, y: number}[]>([]);
    const maxPositions = 5; // Jumlah posisi sebelumnya yang disimpan

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setIsVisible(true);
            requestAnimationFrame(() => {
                setPosition({ x: e.pageX, y: e.pageY });
                
                // Simpan posisi sebelumnya
                previousPositions.current.push({ x: e.pageX, y: e.pageY });
                if (previousPositions.current.length > maxPositions) {
                    previousPositions.current.shift();
                }
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
        const lerp = (start: number, end: number, factor: number) => {
            return start + (end - start) * factor;
        };

        const smoothFactor = 0.15; // Untuk cursor outer
        const largeSmoothFactor = 0.05; // Untuk cursor besar (lebih lambat)
        const momentumFactor = 0.3; // Faktor momentum

        const animate = () => {
            // Hitung rata-rata posisi sebelumnya untuk momentum
            let momentumX = 0;
            let momentumY = 0;
            if (previousPositions.current.length > 0) {
                const total = previousPositions.current.reduce((acc, pos) => {
                    return {
                        x: acc.x + pos.x,
                        y: acc.y + pos.y
                    };
                }, { x: 0, y: 0 });
                momentumX = total.x / previousPositions.current.length;
                momentumY = total.y / previousPositions.current.length;
            }

            // Animasi cursor outer
            const nextX = lerp(outerPosition.x, position.x, smoothFactor);
            const nextY = lerp(outerPosition.y, position.y, smoothFactor);
            setOuterPosition({ x: nextX, y: nextY });

            // Animasi cursor besar dengan momentum
            const targetX = position.x + (momentumX - position.x) * momentumFactor;
            const targetY = position.y + (momentumY - position.y) * momentumFactor;
            
            const nextLargeX = lerp(largePosition.x, targetX, largeSmoothFactor);
            const nextLargeY = lerp(largePosition.y, targetY, largeSmoothFactor);
            setLargePosition({ x: nextLargeX, y: nextLargeY });

            requestAnimationFrame(animate);
        };

        const animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [position, outerPosition, largePosition]);

    const innerStyle = {
        transform: `translate(${position.x}px, ${position.y}px)`
    };

    const outerStyle = {
        transform: `translate(${outerPosition.x}px, ${outerPosition.y}px)`
    };

    const largeStyle = {
        transform: `translate(${largePosition.x}px, ${largePosition.y}px)`
    };

    return (
        <div className={`cursor-container ${isVisible ? 'visible' : 'hidden'}`}>
            <div 
                className="cursor-large"
                style={largeStyle}
            />
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