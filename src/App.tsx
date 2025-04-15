import React, {useState, useEffect} from "react";
import {
  Main,
  Timeline,
  Expertise,
  Project,
  Contact,
  Navigation,
  Footer,
} from "./components";
import FadeIn from './components/FadeIn';
import GradientBackground from './components/GradientBackground';
import Cursor from './components/Cursor';
import './index.scss';
import './assets/styles/Cursor.scss';

function App() {
    const [mode, setMode] = useState<string>('dark');

    const handleModeChange = () => {
        if (mode === 'dark') {
            setMode('light');
        } else {
            setMode('dark');
        }
    }

    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      }, []);

    return (
    <div className={`main-container ${mode === 'dark' ? 'dark-mode' : 'light-mode'}`}>
        <Cursor />
        <GradientBackground />
        <Navigation parentToChild={{mode}} modeChange={handleModeChange}/>
        {/* <FadeIn transitionDuration={700}> */ /* Dibungkus komentar sementara */}
            <Main/>
            <Expertise/>
            <Timeline/>
            <Project/>
            <Contact/>
        {/* </FadeIn> */ /* Dibungkus komentar sementara */}
        <Footer />
    </div>
    );
}

export default App;