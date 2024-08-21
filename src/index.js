import "./style.css"

import projects from './projects.json' assert { type: 'json' };

import editIconSvg from './images/edit.svg'

function paintProjects() {
    projects.forEach((project) => {
        let numOfUrgentToDos = 0;
        project["toDo"].forEach(toDo => {
            if (toDo.priority === 3) {
                numOfUrgentToDos++
            }
        })
        createProjectElement(project.projectName, project["toDo"].length, numOfUrgentToDos, project["toDo"][0]["due"]);
    })
}

function createProjectElement(projName, numOfToDos, numOfUrgents, nextDueDate) {
    const projectsGrid = document.querySelector(".projects-grid");

    const projectContainer = document.createElement("div");
    projectContainer.classList.add("project");

    const projectHeader = document.createElement("div");
    projectHeader.classList.add("project-header");

    const projectName = document.createElement("h3");
    projectName.textContent = projName;

    const editIcon = document.createElement("img");
    editIcon.alt = "edit icon";
    editIcon.src = editIconSvg;
    
    projectHeader.appendChild(projectName);
    projectHeader.appendChild(editIcon);

    projectContainer.appendChild(projectHeader);

    const projectContains = document.createElement("span");
    projectContains.textContent = `Contains ${numOfToDos} to-dos (${numOfUrgents} Urgent)`;

    const projectDueDate = document.createElement("span");
    projectDueDate.textContent = `Next due date ${nextDueDate}`;

    projectContainer.appendChild(projectContains);
    projectContainer.appendChild(projectDueDate);

    projectsGrid.appendChild(projectContainer);
}

window.onload = paintProjects();