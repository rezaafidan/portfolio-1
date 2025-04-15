import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../assets/styles/Footer.scss'

function Footer() {
  return (
    <footer>
      <div>
        <a href="https://github.com/rezaafidan" target="_blank" rel="noreferrer"><GitHubIcon/></a>
        <a href="https://www.linkedin.com/in/rezaafidan/" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
      </div>
      <p>A <a href="https://linktr.ee/rezaafidan" target="_blank" rel="noreferrer">Reza Afidan</a>'s' Portfolio Website</p>
    </footer>
  );
}

export default Footer;