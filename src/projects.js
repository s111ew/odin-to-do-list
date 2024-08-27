import editIconSvg from './images/edit.svg';

import * as utility from './utility.js'

export function createProjectElement({ projectName, toDo, selected }) {
    const projectsGrid = document.querySelector('.projects-grid');

    const projectContainer = document.createElement('div');
    projectContainer.classList.add('project');
    if (selected === true) {
        projectContainer.classList.add('selected');
    }

    const projectHeader = document.createElement('div');
    projectHeader.classList.add('project-header');

    const projectNameElement = document.createElement('h3');
    projectNameElement.textContent = projectName;

    const editIcon = document.createElement('img');
    editIcon.alt = 'Edit icon';
    editIcon.src = editIconSvg;

    projectHeader.appendChild(projectNameElement);
    projectHeader.appendChild(editIcon);
    projectContainer.appendChild(projectHeader);

    const numOfToDos = toDo.length;
    const numOfUrgents = utility.countUrgentTasks(toDo);
    const nextDueDate = toDo.length > 0 ? toDo[0].due : 'No due date';

    const projectDetails = document.createElement('span');
    projectDetails.textContent = `Contains ${numOfToDos} to-dos (${numOfUrgents} Urgent)`;

    const projectDueDate = document.createElement('span');
    projectDueDate.textContent = `Next due date: ${nextDueDate}`;

    projectContainer.appendChild(projectDetails);
    projectContainer.appendChild(projectDueDate);

    projectsGrid.appendChild(projectContainer);
}