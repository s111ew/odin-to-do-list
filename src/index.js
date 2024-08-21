import './style.css';
import projects from './projects.json' assert { type: 'json' };
import editIconSvg from './images/edit.svg';

const PRIORITY_URGENT = 3;

function countUrgentTasks(toDos) {
    return toDos.reduce((count, toDo) => {
        return count + (toDo.priority === PRIORITY_URGENT ? 1 : 0);
    }, 0);
}

function createProjectElement({ projectName, toDo }) {
    const projectsGrid = document.querySelector('.projects-grid');

    const projectContainer = document.createElement('div');
    projectContainer.classList.add('project');

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
    const numOfUrgents = countUrgentTasks(toDo);
    const nextDueDate = toDo.length > 0 ? toDo[0].due : 'No due date';

    const projectDetails = document.createElement('span');
    projectDetails.textContent = `Contains ${numOfToDos} to-dos (${numOfUrgents} Urgent)`;

    const projectDueDate = document.createElement('span');
    projectDueDate.textContent = `Next due date: ${nextDueDate}`;

    projectContainer.appendChild(projectDetails);
    projectContainer.appendChild(projectDueDate);

    projectsGrid.appendChild(projectContainer);
}

function paintProjects() {
    if (!projects || !Array.isArray(projects)) {
        console.error('Invalid projects data.');
        return;
    }

    projects.forEach(createProjectElement);
}

window.addEventListener('load', paintProjects);