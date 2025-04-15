import React from "react";
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsersGear, faPenNib } from '@fortawesome/free-solid-svg-icons';
import { faWindows } from '@fortawesome/free-brands-svg-icons';
import Chip from '@mui/material/Chip';
import '../assets/styles/Expertise.scss';

const labelsFirst = [
    "Logic",
    "Critical Thinking",
    "Problem Solving",
    "Leadership",
    "Teamwork",
    "Management",
    "Professional"
];

const labelsSecond = [
    "XD",
    "Blender",
    "PremierePro",
    "After Effects",
    "Photoshop",
    "Illustrator",
    "Medibang",
    "Procreate",
];

const labelsThird = [
    "Troubleshooting",
    "Modification",
    "Optimization",
    "Installation",
    "Remote",
    "Terminal",
    "Topology",
];

function Expertise() {
    return (
    <div className="container" id="expertise">
        <div className="skills-container">
            <h1>Expertise</h1>
            <div className="skills-grid">
                <div className="skill">
                    <FontAwesomeIcon icon={faUsersGear} size="3x"/>
                    <h3>Organization & Collaboration</h3>
                    <p>Involvement in organizations at every educational level has significantly contributed to my emotional and social growth.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Gained :</span>
                        {labelsFirst.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>

                <div className="skill">
                    <FontAwesomeIcon icon={faPenNib} size="3x"/>
                    <h3>Art, Design, and Media</h3>
                    <p>Extensive immersion in the artistic realm has developed my capacity to produce digital works via graphic design software.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Fluent in :</span>
                        {labelsSecond.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>

                <div className="skill">
                    <FontAwesomeIcon icon={faWindows} size="3x"/>
                    <h3>Experienced with Windows OS</h3>
                    <p>Extensive early experience with Windows OS has enabled rapid adaptation and a high level of proficiency.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Proficient :</span>
                        {labelsThird.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Expertise;