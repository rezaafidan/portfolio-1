import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSpotify, 
  faDeviantart, 
  faInstagram, 
  faWhatsapp, 
  faXbox, 
  faSteam, 
  faDiscord,
  faGithub,
  faLinkedin
} from '@fortawesome/free-brands-svg-icons';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/Footer.scss'

function Footer() {
  return (
    <footer>
      <div className="footer-icons">
        <a href="https://github.com/rezaafidan" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGithub} /></a>
        <a href="https://www.linkedin.com/in/rezaafidan/" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faLinkedin} /></a>
        <a href="https://open.spotify.com/user/w5h27pldzen825c0l2cm4mldw" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faSpotify} /></a>
        <a href="https://www.deviantart.com/rezaafidan" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faDeviantart} /></a>
        <a href="https://www.instagram.com/rezaafidan/" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faInstagram} /></a>
        <a href="https://wa.me/6281238900703" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faWhatsapp} /></a>
        <a href="https://account.xbox.com/en-us/profile?gamertag=RpMEzaR" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faXbox} /></a>
        <a href="https://osu.ppy.sh/users/9364311" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faCircleExclamation} /></a>
        <a href="https://steamcommunity.com/id/76561199789985658" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faSteam} /></a>
        <a href="https://discordapp.com/users/805926838257057812" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faDiscord} /></a>
      </div>
      <p>A <a href="https://linktr.ee/rezaafidan" target="_blank" rel="noreferrer">Reza Afidan</a>'s Portfolio Website</p>
    </footer>
  );
}

export default Footer;