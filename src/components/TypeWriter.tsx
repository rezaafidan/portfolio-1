import React, { useState, useEffect } from 'react';
import '../assets/styles/TypeWriter.scss';

const TypeWriter: React.FC = () => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(100);
    const [isDone, setIsDone] = useState(false);

    const textArray = [
        "Student at MAN Insan Cendekia Pekalongan",
        "UI/UX Designer",
        "Web Developer",
        "Photographer",
        "Video Editor",
        "Illustrator"
    ];
    const period = 1500;

    useEffect(() => {
        const tick = () => {
            const fullText = textArray[currentIndex];
            
            if (!isDeleting && !isDone) {
                if (text.length < fullText.length) {
                    setText(fullText.substring(0, text.length + 1));
                    setTypingSpeed(100);
                } else {
                    setIsDone(true);
                    setTimeout(() => {
                        setIsDeleting(true);
                        setIsDone(false);
                    }, period);
                }
            } else if (isDeleting) {
                if (text.length > 0) {
                    setText(fullText.substring(0, text.length - 1));
                    setTypingSpeed(50);
                } else {
                    setIsDeleting(false);
                    setCurrentIndex(prev => (prev + 1) % textArray.length);
                }
            }
        };

        const ticker = setTimeout(tick, typingSpeed);
        return () => clearTimeout(ticker);
    }, [text, isDeleting, currentIndex, isDone, textArray, typingSpeed]);

    return (
        <span className="typewriter">
            {text}
            <span className="cursor"></span>
        </span>
    );
};

export default TypeWriter; 