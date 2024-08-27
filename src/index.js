import './style.css';
import defaultProjects from './projects.json' assert { type: 'json' };
import { createProjectElement } from './projects.js';
import { createToDoElement } from './to-do.js';
import * as utils from "./utility.js"
import * as np from "./new-project.js";

export let projects = defaultProjects;

let currentProject = projects[0];

function paintProjects() {
    if (!projects || !Array.isArray(projects)) {
        console.error('Invalid projects data.');
        return;
    }

    projects.forEach(createProjectElement);
}

function paintToDos(project) {
    project["toDo"].forEach(toDo => {
            createToDoElement(toDo)
        }
    )
}

export function repaintPage() {
    const projectGrid = document.querySelector(".projects-grid");
    projectGrid.innerHTML = "";

    const toDoGrid = document.querySelector(".to-do-grid");
    toDoGrid.innerHTML = "";

    paintProjects();
    paintToDos(currentProject);
    addNewItemEventListeners();
}

function addNewItemEventListeners() {
    const npButton = document.querySelector("#new-project-button");
    npButton.addEventListener("click", () => {
        const container = document.querySelector(".new-project");
        if (!container) {
            np.renderNewProjectInput();
        }
        utils.removeAllSelected();
    })
}



window.addEventListener('load', repaintPage);