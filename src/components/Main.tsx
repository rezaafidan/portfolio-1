import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../assets/styles/Main.scss';

function Main() {

  return (
    <div className="container">
      <div className="about-section">
        <div className="image-wrapper">
          <img src="https://imgur.com/hWCrDBs.png" alt="Avatar" />
        </div>
        <div className="content">
          <div className="social_icons">
            <a href="wa.me/6281238900703" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faWhatsapp} /></a>
            <a href="https://www.linkedin.com/in/rezaafidan/" target="_blank" rel="noopener noreferrer"><LinkedInIcon/></a>
          </div>
          <h1>Reza Afidan</h1>
          <p>Student at MAN Insan Cendekia Pekalongan</p>

          <div className="mobile_social_icons">
            <a href="https://github.com/rezaafidan" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faWhatsapp} /></a>
            <a href="https://www.linkedin.com/in/rezaafidan/" target="_blank" rel="noopener noreferrer"><LinkedInIcon/></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;