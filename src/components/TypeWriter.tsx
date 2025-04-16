import React, { useState, useEffect } from 'react';
import '../assets/styles/TypeWriter.scss';

const TypeWriter: React.FC = () => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(100);

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
        let ticker = setInterval(() => {
            tick();
        }, typingSpeed);

        return () => { clearInterval(ticker) };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text, isDeleting]);

    const tick = () => {
        const fullText = textArray[currentIndex];
        const updatedText = isDeleting 
            ? fullText.substring(0, text.length - 1) 
            : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setTypingSpeed(50);
        } else {
            setTypingSpeed(100);
        }

        if (!isDeleting && updatedText === fullText) {
            setTimeout(() => {
                setIsDeleting(true);
            }, period);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setCurrentIndex((current) => {
                return current === textArray.length - 1 ? 0 : current + 1;
            });
        }
    };

    return (
        <span className="typewriter">
            {text}
            <span className="cursor"></span>
        </span>
    );
};

export default TypeWriter; 