import { projects } from "./index.js";
import { currentProject } from "./index.js";

const PRIORITY_URGENT = 3;

export function countUrgentTasks(toDos) {
    return toDos.reduce((count, toDo) => {
        return count + (toDo.priority === PRIORITY_URGENT ? 1 : 0);
    }, 0);
}

export function parsePriority(toDo) {
    switch (toDo["priority"]) {
        case 1:
            return "Low"
        case 2:
            return "Moderate"
        case 3:
            return "Urgent"
     }
}

export function makeSelected() {
    const projectNodeList = document.querySelectorAll(".project:not(.new-project)");
    projectNodeList.forEach(project => {
        if (project.classList.contains("selected")) {
            project.classList.remove("selected");
        }
    })

    const selectedProject = projectNodeList[projects.indexOf(currentProject.currentP)];
    selectedProject.classList.add("selected");

    const projectTitle = document.querySelector(".project-title");
    projectTitle.textContent = currentProject.currentP.projectName
}

export function deselectAll() {
    const projectNodeList = document.querySelectorAll(".project:not(.new-project)");
    projectNodeList.forEach(project => {
        if (project.classList.contains("selected")) {
            project.classList.remove("selected");
        }
    }) 
}