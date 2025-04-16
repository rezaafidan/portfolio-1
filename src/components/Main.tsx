import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram, faLinkedin, faTelegram } from '@fortawesome/free-brands-svg-icons';
import '../assets/styles/Main.scss';
import TypeWriter from './TypeWriter';

function Main() {

  return (
    <div className="container">
      <div className="about-section">
        <div className="image-wrapper">
          <img src="https://imgur.com/hWCrDBs.png" alt="Avatar" />
        </div>
        <div className="content">
          <div className="social_icons">
            <a href="https://www.instagram.com/rezaafidan/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /></a>
            <a href="https://wa.me/6281238900703" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faWhatsapp} /></a>
            <a href="https://t.me/aifyzaa" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTelegram} /></a>
            <a href="https://www.linkedin.com/in/rezaafidan/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} /></a>
          </div>
          <h1>Reza Afidan</h1>
          <p><TypeWriter /></p>

          <div className="mobile_social_icons">
            <a href="https://www.instagram.com/rezaafidan/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /></a>
            <a href="https://wa.me/6281238900703" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faWhatsapp} /></a>
            <a href="https://t.me/aifyzaa" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTelegram} /></a>
            <a href="https://www.linkedin.com/in/rezaafidan/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} /></a>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;