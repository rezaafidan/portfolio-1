import React, { useEffect, useState } from 'react';
import '../assets/styles/Cursor.scss';

const Cursor = () => {
    const [position, setPosition] = useState({ x: -100, y: -100 }); // Mulai di luar layar
    const [outerPosition, setOuterPosition] = useState({ x: -100, y: -100 }); // Mulai di luar layar
    const [isVisible, setIsVisible] = useState(false); // Mulai tidak terlihat

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

        // Set posisi awal saat komponen mount
        setOuterPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 }); 

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
            document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, []);

    useEffect(() => {
        // Fungsi sederhana untuk interpolasi linear (lerp)
        const lerp = (start: number, end: number, factor: number) => {
            return start + (end - start) * factor;
        };

        // Faktor kecepatan untuk lingkaran luar (delay)
        const outerSpeed = 0.2; // Sesuaikan nilai ini (0.1 = lambat, 0.9 = cepat)

        const animate = () => {
            // Interpolasi linear sederhana untuk membuat delay
            const nextX = lerp(outerPosition.x, position.x, outerSpeed);
            const nextY = lerp(outerPosition.y, position.y, outerSpeed);
            
            // Update posisi lingkaran luar
            // Hanya update jika ada perubahan signifikan untuk efisiensi
            if (Math.abs(outerPosition.x - nextX) > 0.1 || Math.abs(outerPosition.y - nextY) > 0.1) {
                setOuterPosition({ x: nextX, y: nextY });
            } else if (outerPosition.x !== position.x || outerPosition.y !== position.y) {
                 // Snap ke posisi akhir jika sudah sangat dekat
                setOuterPosition(position);
            }


            requestAnimationFrame(animate);
        };

        const animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [position, outerPosition]);

    // Style untuk posisi lingkaran
    const innerStyle = {
        transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`
    };

    const outerStyle = {
        transform: `translate(${outerPosition.x}px, ${outerPosition.y}px) translate(-50%, -50%)`
    };

    return (
        <div className={`cursor-container ${isVisible ? 'visible' : ''}`}> 
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