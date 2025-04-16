import React, { useState, useEffect } from 'react';
import '../assets/styles/TypeWriter.scss';

const TypeWriter: React.FC = () => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    const textArray = [
        "Student at MAN Insan Cendekia Pekalongan",
        "UI/UX Designer",
        "Web Developer",
        "Photographer",
        "Video Editor",
        "Illustrator",
    ];
    const period = 2000;

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, typingSpeed);

        return () => { clearInterval(ticker) };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text, isDeleting]);

    const tick = () => {
        let i = loopNum % textArray.length;
        let fullText = textArray[i];
        let updatedText = isDeleting 
            ? fullText.substring(0, text.length - 1) 
            : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setTypingSpeed(prevSpeed => prevSpeed / 2);
        }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setTypingSpeed(period);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setTypingSpeed(150);
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