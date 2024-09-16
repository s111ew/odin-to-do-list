import { projects } from "./index.js";
import { repaintPage } from "./index.js";
import * as utils from "./utility.js"
import { currentProject } from "./index.js";

export function renderNewProjectInput() {

    const npContainer = document.createElement("div");
    npContainer.classList.add("project");
    npContainer.classList.add("new-project");

    const npInput = document.createElement("input");
    npInput.type = "text";
    npInput.placeholder = "New Project Title";
    npInput.maxLength = "19";

    npContainer.appendChild(npInput);

    const npButtonContainer = document.createElement("div");
    npButtonContainer.classList.add("new-project-buttons");

    const npCancelButton = document.createElement("div");
    npCancelButton.classList.add("pill");
    npCancelButton.classList.add("cancel-button");
    npCancelButton.textContent = "Cancel";
    npCancelButton.addEventListener("click", () => {
        removeNewProjectInput();
        utils.makeSelected();
});

    const npAddButton = document.createElement("div");
    npAddButton.classList.add("pill");
    npAddButton.classList.add("add-button");
    npAddButton.textContent = "Add";
    npAddButton.addEventListener("click", () => {
        const npInput = document.querySelector(".new-project > input");
        if (npInput.value) {
            pushNewProject();
            removeNewProjectInput();
            currentProject._currentP = projects[0]
            repaintPage();
            utils.makeSelected();
        }
    }
    );

    npButtonContainer.appendChild(npCancelButton);
    npButtonContainer.appendChild(npAddButton);

    npContainer.appendChild(npButtonContainer);

    const projectsGrid = document.querySelector(".projects-grid");

    projectsGrid.insertBefore(npContainer, projectsGrid.firstChild);
}

export function removeNewProjectInput() {
    let npInput = document.querySelector(".new-project");

    if (npInput) {
        npInput.remove();
    }
}

export function pushNewProject() {
    const npInput = document.querySelector(".new-project > input");
    const npObject = createProject(npInput.value);
    projects.unshift(npObject);
}

export function createProject(name) {
    return {
        projectName: name,
        toDo: [],
    }
}