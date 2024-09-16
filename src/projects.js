import editIconSvg from './images/edit.svg';
import removeIconSvg from './images/cancel_button.svg';
import { repaintPage } from './index.js';
import { currentProject } from './index.js';
import { projects } from './index.js';
import * as utility from './utility.js'

export function createProjectElement(project) {
    const projectsGrid = document.querySelector('.projects-grid');

    const projectContainer = document.createElement('div');
    projectContainer.classList.add('project');
    
    const projectHeader = document.createElement('div');
    projectHeader.classList.add('project-header');

    const projectNameElement = document.createElement('h3');
    projectNameElement.textContent = project.projectName;

    const editIcon = document.createElement('img');
    editIcon.alt = 'Edit icon';
    editIcon.src = editIconSvg;

    const removeIcon = document.createElement('img');
    removeIcon.alt = 'Remove icon';
    removeIcon.src = removeIconSvg;
    removeIcon.addEventListener("click", () => {
        removeProject(project);
    })

    const projectIconContainer = document.createElement("div");
    projectIconContainer.classList.add("project-icon-container");

    projectIconContainer.appendChild(editIcon);
    projectIconContainer.appendChild(removeIcon);

    projectHeader.appendChild(projectNameElement);
    projectHeader.appendChild(projectIconContainer);
    projectContainer.appendChild(projectHeader);

    const numOfToDos = project.toDo.length;
    const numOfUrgents = utility.countUrgentTasks(project.toDo);
    const nextDueDate = project.toDo.length > 0 ? project.toDo[0].due : 'No due date';

    const projectDetails = document.createElement('span');
    projectDetails.textContent = `Contains ${numOfToDos} to-dos (${numOfUrgents} Urgent)`;

    const projectDueDate = document.createElement('span');
    projectDueDate.textContent = `Next due date: ${nextDueDate}`;

    projectContainer.appendChild(projectDetails);
    projectContainer.appendChild(projectDueDate);

    projectsGrid.appendChild(projectContainer);

    addProjectEventListeners();
}

export function addProjectEventListeners() {
    const projects = document.querySelectorAll(".project:not(.new-project)");
    projects.forEach((project, index) => {
        project.addEventListener("click", () => {
            currentProject.currentP = index; 
            repaintPage();
            utility.makeSelected();
        });
    });
}

export function removeProject(project) {
    const index = projects.indexOf(project);
    projects.splice(index, 1);
    repaintPage();
}