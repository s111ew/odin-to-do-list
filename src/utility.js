import { projects } from "./index.js";

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
            break;
        case 2:
            return "Moderate"
            break;
        case 3:
            return "Urgent"
            break;
     }
}

export function removeAllSelected() {
    const projects = document.querySelectorAll(".project:not(.new-project)");
    projects.forEach(project => {
        if (project.classList.contains("selected")) {
            project.classList.remove("selected");
        }
    })
}

export function makeSelected(element) {
    const projects = document.querySelectorAll(".project:not(.new-project)");
    projects.forEach(project => {
        if (project.classList.contains("selected")) {
            project.classList.remove("selected");
        }
    })
    element.classList.add("selected");
}