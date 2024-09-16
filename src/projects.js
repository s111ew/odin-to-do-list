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

    const removeIcon = document.createElement('img');
    removeIcon.alt = 'Remove icon';
    removeIcon.src = removeIconSvg;
    removeIcon.addEventListener("click", (event) => {
        event.stopPropagation();
        removeProject(project);
    })

    const projectIconContainer = document.createElement("div");
    projectIconContainer.classList.add("project-icon-container");

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
            utility.makeSelected();
            repaintPage();
        });
    });
}

export function removeProject(project) {
    // Validate the input project and projects array
    if (!project || !Array.isArray(projects) || projects.length <= 1) return;

    const index = projects.indexOf(project);

    // Only proceed if the project exists in the list
    if (index !== -1) {
        // Remove the project from the array
        projects.splice(index, 1);
        
        localStorage.setItem("storedProjects", JSON.stringify(projects));
        
        // Repaint the page or update the UI
        repaintPage();
        
            const firstProject = document.querySelector(".project:first-child");

            // Ensure the first project exists before trying to click it
            if (firstProject) {
                firstProject.click();
            }
        }
    }