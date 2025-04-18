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
import GradientCursor from './components/GradientCursor';
import FastSolidCursor from './components/FastSolidCursor';
// import Cursor from './components/Cursor'; // Sudah dihapus sebelumnya, pastikan tidak ada lagi
import './index.scss';
// import './assets/styles/Cursor.scss'; // Sudah dihapus sebelumnya, pastikan tidak ada lagi

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
        <GradientCursor />
        <FastSolidCursor />
        <GradientBackground />
        <Navigation parentToChild={{mode}} modeChange={handleModeChange}/>
        {/* <FadeIn transitionDuration={700}> */} {/* Kembalikan jika diinginkan */}
            <Main/>
            <Expertise/>
            <Timeline/>
            <Project/>
            <Contact/>
        {/* </FadeIn> */} {/* Kembalikan jika diinginkan */}
        <Footer />
    </div>
    );
}

export default App;