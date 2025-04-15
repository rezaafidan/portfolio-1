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

        // Fungsi untuk menyembunyikan cursor saat mouse keluar window
        const handleMouseLeave = () => {
            setIsVisible(false);
        };
        
        // Fungsi untuk menampilkan cursor saat mouse masuk window
        const handleMouseEnter = () => {
            setIsVisible(true);
        };

        // Listener untuk pergerakan mouse di window
        window.addEventListener('mousemove', handleMouseMove);
        // Listener untuk mouse meninggalkan document element
        document.documentElement.addEventListener('mouseleave', handleMouseLeave);
        // Listener untuk mouse memasuki document element
        document.documentElement.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
            document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, []);

    useEffect(() => {
        // Fungsi sederhana untuk interpolasi linear
        const lerp = (start: number, end: number, factor: number) => {
            return start + (end - start) * factor;
        };

        // Faktor kecepatan untuk lingkaran luar
        const outerSpeed = 0.3; // Sedikit lebih cepat dari 0.15

        const animate = () => {
            // Interpolasi linear sederhana untuk membuat delay
            const nextX = lerp(outerPosition.x, position.x, outerSpeed);
            const nextY = lerp(outerPosition.y, position.y, outerSpeed);
            
            // Langsung set posisi baru
            setOuterPosition({ x: nextX, y: nextY });

            requestAnimationFrame(animate);
        };

        const animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [position, outerPosition]);

    const innerStyle = {
        transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`
    };

    const outerStyle = {
        transform: `translate(${outerPosition.x}px, ${outerPosition.y}px) translate(-50%, -50%)`
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