import './style.css';
import projects from './projects.json' assert { type: 'json' };
import { createProjectElement } from './projects.js';

function paintProjects() {
    if (!projects || !Array.isArray(projects)) {
        console.error('Invalid projects data.');
        return;
    }

    projects.forEach(createProjectElement);
}

window.addEventListener('load', paintProjects);