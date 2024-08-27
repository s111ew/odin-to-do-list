import './style.css';
import defaultProjects from './projects.json' assert { type: 'json' };
import { createProjectElement } from './projects.js';
import { createToDoElement } from './to-do.js';

let projects = defaultProjects;

function paintProjects() {
    if (!projects || !Array.isArray(projects)) {
        console.error('Invalid projects data.');
        return;
    }

    projects.forEach(createProjectElement);
}

function paintToDos() {
    projects[0]["toDo"].forEach(toDo => {
            createToDoElement(toDo)
        }
    )
}

function paintPageOnLoad() {
    paintProjects();
    paintToDos();
}

window.addEventListener('load', paintPageOnLoad);