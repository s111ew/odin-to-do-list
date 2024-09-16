import './style.css';
import defaultProjects from './projects.json' assert { type: 'json' };
import { createProjectElement } from './projects.js';
import { createToDoElement, emptyToDoNotice } from './to-do.js';
import * as utils from "./utility.js"
import * as np from "./new-project.js";
import * as ntd from "./new-to-do.js";

export let projects = defaultProjects;

export let currentProject = {
    _currentP: projects[0],

    get currentP() {
        return this._currentP
    },

    set currentP(index) {
        this._currentP = projects[index]
    }
}

function paintProjects() {
    if (!projects || !Array.isArray(projects)) {
        console.error('Invalid projects data.');
        return;
    }

    projects.forEach(createProjectElement);
}

function paintToDos(project) {
    if (project["toDo"].length === 0) {
        emptyToDoNotice();
    }
    project["toDo"].forEach(toDo => {
            createToDoElement(toDo)
        })
}

export function repaintPage() {
    const projectGrid = document.querySelector(".projects-grid");
    projectGrid.innerHTML = "";

    const toDoGrid = document.querySelector(".to-do-grid");
    toDoGrid.innerHTML = "";

    paintProjects();
    paintToDos(currentProject.currentP);
    addNewItemEventListeners();
    utils.makeSelected();
}

function addNewItemEventListeners() {
    function setupButtonEvent(buttonSelector, containerSelectors, renderFunction) {
        const button = document.querySelector(buttonSelector);
        button.addEventListener("click", () => {
            const container = containerSelectors
                .map(selector => document.querySelector(selector))
                .find(el => el !== null);
            if (!container) {
                renderFunction();
            }
            if (buttonSelector = '#new-project-button') {
                utils.deselectAll();
            }
        });
    }

    setupButtonEvent("#new-project-button", [".new-project", ".new-to-do"], np.renderNewProjectInput);
    setupButtonEvent("#new-to-do-button", [".new-to-do", ".new-project"], ntd.renderNewToDoInput);
}

window.addEventListener('load', () => {
    if (JSON.parse(localStorage.getItem("storedProjects")) !== null) {
        projects = JSON.parse(localStorage.getItem("storedProjects"));
    }
    repaintPage()
});