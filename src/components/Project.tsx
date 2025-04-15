import React from "react";
import mock01 from '../assets/images/mock01.png';
import mock02 from '../assets/images/mock02.png';
import mock03 from '../assets/images/mock03.png';
import mock04 from '../assets/images/mock04.png';
import mock05 from '../assets/images/mock05.png';
import mock06 from '../assets/images/mock06.png';
import mock07 from '../assets/images/mock07.png';
import mock08 from '../assets/images/mock08.png';
import mock09 from '../assets/images/mock09.png';
import mock10 from '../assets/images/mock10.png';
import '../assets/styles/Project.scss';

function Project() {
    const handleCvDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Tampilkan loading state di tab
        document.title = "Downloading CV...";
        
        // Setelah download selesai, kembalikan title
        setTimeout(() => {
            document.title = "Reza's Personal Portfolio Website";
        }, 2000);
    };

    return(
    <div className="projects-container" id="projects">
        <h1>Projects</h1>
        <div className="projects-grid">
            <div className="project">
                <a href="https://www.youtube.com/watch?v=3ZEnKTi-zDM" target="_blank" rel="noopener noreferrer"><img src={mock10} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://www.youtube.com/watch?v=3ZEnKTi-zDM" target="_blank" rel="noopener noreferrer"><h2>Trailer Inception</h2></a>
                <p>Promotional video for the MAN Insan Cendekia Pekalongan Anniversary Event.</p>
            </div>
            <div className="project">
                <a href="https://www.deviantart.com/rezaafidan/art/1183054605" target="_blank" rel="noopener noreferrer"><img src={mock09} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://www.deviantart.com/rezaafidan/art/1183054605" target="_blank" rel="noopener noreferrer"><h2>Abstergo Launcher</h2></a>
                <p>Modern and minimalist UI design concept for the Abstergo Game Launcher, an integrated launcher for the Assassin's Creed series.</p>
            </div>
            <div className="project">
                <a href="https://archive.org/details/laporan-penelitian-faris-reza-augmented-reality-efektivitas-ar-sebagai-media-pembelajaran/page/n13/mode/2up" target="_blank" rel="noopener noreferrer"><img src={mock08} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://archive.org/details/laporan-penelitian-faris-reza-augmented-reality-efektivitas-ar-sebagai-media-pembelajaran/page/n13/mode/2up" target="_blank" rel="noopener noreferrer"><h2>AR Research Paper</h2></a>
                <p>Evaluating the effectiveness of augmented reality technology in student learning methods.</p>
            </div>
            <div className="project">
                <a href="https://fliphtml5.com/dgyjq/lzzs/" target="_blank" rel="noopener noreferrer"><img src={mock07} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://fliphtml5.com/dgyjq/lzzs/" target="_blank" rel="noopener noreferrer"><h2>OZON Magazine</h2></a>
                <p>OZON Journalism Magazine Vol. 3, created by the OZON Journalism Media Organization team of MAN Insan Cendekia Pekalongan.</p>
            </div>
            <div className="project">
                <a href="https://www.deviantart.com/rezaafidan/art/1183063645/" target="_blank" rel="noopener noreferrer"><img src={mock06} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://www.deviantart.com/rezaafidan/art/1183063645/" target="_blank" rel="noopener noreferrer"><h2>Eindeloos Keychain</h2></a>
                <p>Cinema-themed keychain design for the 2nd anniversary of the 8th Batch's merchandise. Key design elements include a film reel, film projector, and clapperboard.</p>
            </div>
            <div className="project">
                <a href="https://www.deviantart.com/rezaafidan/art/1183069268" target="_blank" rel="noopener noreferrer"><img src={mock05} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://www.deviantart.com/rezaafidan/art/1183069268" target="_blank" rel="noopener noreferrer"><h2>Digital Comic</h2></a>
                <p>The story of Kiranti, a talented young woman whose exceptional batik skills have reached international recognition.</p>
            </div>
            <div className="project">
                <a href="https://www.deviantart.com/rezaafidan/art/Barong-Gembira-1183074079" target="_blank" rel="noopener noreferrer"><img src={mock04} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://www.deviantart.com/rezaafidan/art/Barong-Gembira-1183074079" target="_blank" rel="noopener noreferrer"><h2>Barong Gembira</h2></a>
                <p>A design for a t-shirt that integrates the Barong and a temple as symbols of Bali, alongside botanical elements in pots to convey the message of environmental sustainability.</p>
            </div>
            <div className="project">
                <a href="https://www.deviantart.com/rezaafidan/art/1183083896" target="_blank" rel="noopener noreferrer"><img src={mock01} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://www.deviantart.com/rezaafidan/art/1183083896" target="_blank" rel="noopener noreferrer"><h2>Astro Digital Imaging</h2></a>
                <p>A digital imaging piece adapted from a traditional painting, portraying an astronaut seated on a precipice, viewing Earth distantly from their present world.</p>
            </div>
            <div className="project">
                <a href="https://www.deviantart.com/rezaafidan/art/1183078463" target="_blank" rel="noopener noreferrer"><img src={mock02} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://www.deviantart.com/rezaafidan/art/1183078463" target="_blank" rel="noopener noreferrer"><h2>Between Space and Earth </h2></a>
                <p>A digital illustration presenting hot air balloons, satellites, unidentified flying objects, and spaceships. The scene is set with a cloudy sky directly adjacent to outer space, offering a glimpse of an Earth-like planet's surface.</p>
            </div>
            <div className="project">
                <a href="/CV_REZA_FAHRI_AFIDAN.pdf" download="CV_REZA_FAHRI_AFIDAN.pdf" onClick={handleCvDownload}><img src={mock03} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="/CV_REZA_FAHRI_AFIDAN.pdf" download="CV_REZA_FAHRI_AFIDAN.pdf" onClick={handleCvDownload}><h2>My Curriculum Vitae</h2></a>
                <p>Contained herein is a comprehensive record of my personal background, educational trajectory, and significant experiences and accomplishments, provided as relevant information for professional evaluation</p>
            </div>
        </div>
    </div>
    );
}

export default Project;