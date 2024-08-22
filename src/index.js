import './style.css';
import projects from './projects.json' assert { type: 'json' };
import { createProjectElement } from './projects.js';
import { createToDoElement } from './to-do.js';

function paintProjects() {
    if (!projects || !Array.isArray(projects)) {
        console.error('Invalid projects data.');
        return;
    }

    projects.forEach(createProjectElement);
}

function paintToDos() {
    
}

function getCurrentProject() {
    let currentProject = projects[0];

    return currentProject
}

window.addEventListener('load', paintProjects, paintToDos);